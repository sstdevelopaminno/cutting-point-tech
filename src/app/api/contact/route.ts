import { NextResponse } from "next/server";
import { enforcePublicApiRateLimit, getClientIp, internalServerError, logRouteError } from "@/lib/apiSecurity";
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
const SPAM_ERROR = "Spam detected";

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
    const rateLimitResponse = await enforcePublicApiRateLimit({
      route: "api/contact",
      ip,
      limit: RATE_LIMIT_MAX,
      windowMs: RATE_LIMIT_WINDOW_MS,
      requestId,
    });
    if (rateLimitResponse) return rateLimitResponse;

    const body = (await req.json().catch(() => null)) as LeadPayload | null;

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

    const communicationsUrl =
      process.env.COMMUNICATIONS_SUPABASE_URL?.trim() ||
      "https://wznixoeezgyhtwurcswb.supabase.co";
    const communicationsKey =
      process.env.COMMUNICATIONS_SUPABASE_PUBLISHABLE_KEY?.trim() ||
      "sb_publishable_G-lNDIwwsT7wthv4Ad4Qag_fz7R420Q";

    const communicationsController = new AbortController();
    const communicationsTimeout = setTimeout(() => communicationsController.abort(), 8_000);
    let lead: { id: string } | null = null;
    try {
      const communicationsResponse = await fetch(
        `${communicationsUrl.replace(/\/$/, "")}/functions/v1/website-contact-api`,
        {
          method: "POST",
          headers: {
            apikey: communicationsKey,
            "content-type": "application/json",
            "x-contact-source": "cutting-point-innovation-website"
          },
          body: JSON.stringify({
            action: "create",
            name,
            phone,
            email: email || null,
            message,
            locale,
            request_id: requestId
          }),
          cache: "no-store",
          signal: communicationsController.signal
        }
      );
      const communicationsBody = await communicationsResponse.json().catch(() => null) as
        | { ok?: boolean; id?: string; error?: string }
        | null;
      if (!communicationsResponse.ok || communicationsBody?.ok !== true || !communicationsBody.id) {
        console.error("Communications contact insert failed", {
          requestId,
          status: communicationsResponse.status,
          code: communicationsBody?.error ?? "unknown"
        });
        return NextResponse.json(
          { ok: false, requestId, error: "Unable to save request" },
          { status: 503 }
        );
      }
      lead = { id: communicationsBody.id };
    } finally {
      clearTimeout(communicationsTimeout);
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

    return NextResponse.json({
      ok: true,
      requestId,
      leadId: lead.id,
      notifications: { email: emailStatus, line: lineStatus },
    });
  } catch (err) {
    logRouteError("api/contact", requestId, err);
    return internalServerError(requestId);
  }
}