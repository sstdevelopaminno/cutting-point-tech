import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { sendLeadNotification } from "@/lib/email";
import { notifyLineViaCloudflare } from "@/lib/lineWebhook";
import { isEstimatorService } from "@/lib/estimate";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  locale?: string;
  company?: string;
  startedAt?: string | number;
  service?: string;
  estimateId?: string | null;
  quoteRef?: string;
  quoteSubtotal?: number;
  quoteLines?: Array<{ label?: string; amount?: number }>;
  priceMin?: number;
  priceMax?: number;
};

const MAX_NAME_LENGTH = 120;
const MAX_PHONE_LENGTH = 50;
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const SPAM_ERROR = "Spam detected";

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const rateLimitByIp = new Map<string, RateLimitEntry>();

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string, now: number): boolean {
  const entry = rateLimitByIp.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitByIp.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function isTooFast(startedAt: string | number | undefined, now: number): boolean {
  if (startedAt === undefined || startedAt === null || startedAt === "") {
    return true;
  }
  const startedMs =
    typeof startedAt === "number" ? startedAt : Number.parseInt(String(startedAt), 10);
  if (!Number.isFinite(startedMs)) {
    return true;
  }
  return now - startedMs < 2000;
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const now = Date.now();
  const ip = getClientIp(req);

  try {
    const body = (await req.json().catch(() => null)) as LeadPayload | null;

    if (isRateLimited(ip, now)) {
      return NextResponse.json(
        { ok: false, requestId, error: SPAM_ERROR },
        { status: 429 }
      );
    }

    const name = String(body?.name ?? "")
      .trim()
      .slice(0, MAX_NAME_LENGTH);
    const phone = String(body?.phone ?? "")
      .trim()
      .slice(0, MAX_PHONE_LENGTH);
    const email = String(body?.email ?? "")
      .trim()
      .slice(0, MAX_EMAIL_LENGTH);
    const message = String(body?.message ?? "")
      .trim()
      .slice(0, MAX_MESSAGE_LENGTH);
    const locale = String(body?.locale ?? "th").trim();
    const company = String(body?.company ?? "").trim();
    const startedAt = body?.startedAt;
    const service = isEstimatorService(body?.service) ? body?.service : null;
    const estimateId = body?.estimateId ?? null;
    const quoteRef =
      String(body?.quoteRef ?? "")
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9-]/g, "")
        .slice(0, 32) || null;
    const quoteSubtotal = Number(body?.quoteSubtotal ?? 0) || null;
    const rawQuoteLines = body && Array.isArray(body.quoteLines) ? body.quoteLines : [];
    const quoteLines = rawQuoteLines
      .map((line) => ({
        label: String(line?.label ?? "").trim().slice(0, 200),
        amount: Number(line?.amount ?? 0),
      }))
      .filter((line) => line.label && Number.isFinite(line.amount) && line.amount > 0)
      .slice(0, 30);
    const priceMin = Number(body?.priceMin ?? 0) || null;
    const priceMax = Number(body?.priceMax ?? 0) || null;

    const estimateLines: string[] = [
      "---- Estimate ----",
      `Service: ${service ?? "-"}`,
      `Estimate ID: ${estimateId ?? "-"}`,
      `Quote Ref: ${quoteRef ?? "-"}`,
      `Subtotal: ${quoteSubtotal ?? "-"}`,
      `Price range: ${priceMin ?? "-"} - ${priceMax ?? "-"}`,
    ];

    if (quoteLines.length) {
      estimateLines.push("", "Items:");
      for (const line of quoteLines) {
        estimateLines.push(`- ${line.label}: ${line.amount}`);
      }
    }

    const messageWithEstimate = `${message}\n\n${estimateLines.join("\n")}`.slice(
      0,
      MAX_MESSAGE_LENGTH
    );

    if (company || isTooFast(startedAt, now)) {
      return NextResponse.json(
        { ok: false, requestId, error: SPAM_ERROR },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { ok: false, requestId, error: "Name is required" },
        { status: 400 }
      );
    }

    if (message.length < 5) {
      return NextResponse.json(
        { ok: false, requestId, error: "Message is too short" },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, requestId, error: "Invalid email" },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert([
        {
          name,
          phone: phone || null,
          email: email || null,
          message: messageWithEstimate,
          locale,
          source: "estimate",
          service,
          estimate_id: estimateId,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error({ requestId, error });
      return NextResponse.json(
        { ok: false, requestId, error: "Database insert failed" },
        { status: 500 }
      );
    }

    // Notifications are awaited so they reliably run in Vercel serverless (background tasks may be cut off).
    let emailStatus: "sent" | "skipped" | "failed" = "skipped";
    let lineStatus: "sent" | "skipped" | "failed" = "skipped";

    const [emailResult, lineResult] = await Promise.allSettled([
      sendLeadNotification({
        name,
        phone: phone || null,
        email: email || null,
        message: messageWithEstimate,
        locale,
        source: `estimate:${service ?? "unknown"}`,
        service,
        quoteRef,
        quoteSubtotal,
        quoteLines,
        priceMin,
        priceMax,
      }),
      lead?.id
        ? notifyLineViaCloudflare({
            leadId: lead.id,
            name,
            phone: phone || null,
            email: email || null,
            message: messageWithEstimate,
            locale,
            source: `estimate:${service ?? "unknown"}`,
            requestId,
            service,
            quoteRef,
            quoteSubtotal,
            quoteLines,
            priceMin,
            priceMax,
          })
        : Promise.resolve("skipped" as const),
    ]);

    if (emailResult.status === "fulfilled") {
      emailStatus = emailResult.value;
      if (emailStatus === "skipped") {
        console.warn("Lead email notification skipped (missing SMTP env)", { requestId });
      }
    } else {
      emailStatus = "failed";
      console.error("Lead email notification failed", {
        requestId,
        error: emailResult.reason,
      });
    }

    if (lineResult.status === "fulfilled") {
      lineStatus = lineResult.value;
      if (lineStatus === "skipped") {
        console.warn("Line webhook notification skipped (missing env)", { requestId });
      }
    } else {
      lineStatus = "failed";
      console.error("Line webhook notification failed", {
        requestId,
        error: lineResult.reason,
      });
    }

    // Record event/notification status (best-effort)
    try {
      await supabaseAdmin.from("events").insert([
        {
          event_name: "lead_submit",
          service,
          meta: {
            estimate_id: estimateId,
            quote_ref: quoteRef,
            quote_subtotal: quoteSubtotal,
            price_min: priceMin,
            price_max: priceMax,
            lead_id: lead?.id ?? null,
          },
        },
        {
          event_name: "lead_notify",
          meta: {
            lead_id: lead?.id ?? null,
            source: `estimate:${service ?? "unknown"}`,
            email_status: emailStatus,
            line_status: lineStatus,
          },
        },
      ]);
    } catch {
      // ignore
    }

    return NextResponse.json({
      ok: true,
      requestId,
      leadId: lead?.id ?? null,
      notifications: { email: emailStatus, line: lineStatus },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error({ requestId, error: err });
    return NextResponse.json(
      { ok: false, requestId, error: message },
      { status: 500 }
    );
  }
}
