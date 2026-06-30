import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { sendLeadNotification } from "@/lib/email";
import { notifyLineViaCloudflare } from "@/lib/lineWebhook";

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
};

const MAX_NAME_LENGTH = 120;
const MAX_PHONE_LENGTH = 50;
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_MAX_ENTRIES = 2_000;
const RATE_LIMIT_CLEANUP_INTERVAL = 50;
const SPAM_ERROR = "Spam detected";

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const rateLimitByIp = new Map<string, RateLimitEntry>();
let rateLimitCheckCount = 0;

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

function cleanupRateLimitMap(now: number) {
  rateLimitCheckCount += 1;
  const shouldSweepByInterval = rateLimitCheckCount % RATE_LIMIT_CLEANUP_INTERVAL === 0;
  const shouldSweepBySize = rateLimitByIp.size > RATE_LIMIT_MAX_ENTRIES;

  if (!shouldSweepByInterval && !shouldSweepBySize) {
    return;
  }

  for (const [ip, entry] of rateLimitByIp.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitByIp.delete(ip);
    }
  }

  if (rateLimitByIp.size <= RATE_LIMIT_MAX_ENTRIES) {
    return;
  }

  const staleFirst = Array.from(rateLimitByIp.entries()).sort(
    (a, b) => a[1].windowStart - b[1].windowStart
  );
  const overflow = rateLimitByIp.size - RATE_LIMIT_MAX_ENTRIES;
  for (let index = 0; index < overflow; index += 1) {
    const stale = staleFirst[index];
    if (!stale) {
      break;
    }
    rateLimitByIp.delete(stale[0]);
  }
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
  cleanupRateLimitMap(now);

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

    const supabase = getSupabaseAdmin();
    const { data: lead, error: insertError } = await supabase
      .from("leads")
      .insert({
        name,
        phone: phone || null,
        email: email || null,
        message,
        locale,
        source: "website",
      })
      .select("id")
      .single();

    if (insertError || !lead?.id) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Lead insert failed", { requestId, insertError });
      }
      return NextResponse.json(
        { ok: false, requestId, error: "Database insert failed" },
        { status: 500 }
      );
    }

    let emailStatus: "sent" | "skipped" | "failed" = "skipped";
    let lineStatus: "sent" | "skipped" | "failed" = "skipped";

    const [emailResult, lineResult] = await Promise.allSettled([
      sendLeadNotification({
        name,
        phone: phone || null,
        email: email || null,
        message,
        locale,
        source: "website",
      }),
      notifyLineViaCloudflare({
        leadId: lead.id,
        name,
        phone: phone || null,
        email: email || null,
        message,
        locale,
        source: "website",
        requestId,
      }),
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

    // Record notification status in events table (if present)
    try {
      await supabase.from("events").insert([
        {
          event_name: "lead_notify",
          meta: {
            lead_id: lead.id,
            source: "website",
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
      leadId: lead.id,
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
