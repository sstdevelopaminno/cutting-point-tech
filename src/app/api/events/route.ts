import { NextResponse } from "next/server";
import { enforcePublicApiRateLimit, getClientIp, internalServerError, logRouteError } from "@/lib/apiSecurity";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { isEstimatorService } from "@/lib/estimate";

type EventPayload = {
  eventName?: string;
  service?: string | null;
  meta?: Record<string, unknown> | null;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 60;
const ALLOWED_EVENTS = new Set([
  "service_click",
  "estimate_start",
  "estimate_submit",
  "lead_submit",
]);

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const ip = getClientIp(req);

  try {
    const rateLimitResponse = await enforcePublicApiRateLimit({
      route: "api/events",
      ip,
      limit: RATE_LIMIT_MAX,
      windowMs: RATE_LIMIT_WINDOW_MS,
      requestId,
    });
    if (rateLimitResponse) return rateLimitResponse;

    const body = (await req.json().catch(() => null)) as EventPayload | null;
    const eventName = String(body?.eventName ?? "");
    const service = body?.service ?? null;
    const meta = body?.meta ?? null;

    if (!ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json(
        { ok: false, requestId, error: "Unsupported event" },
        { status: 400 }
      );
    }

    const normalizedService = isEstimatorService(service)
      ? service
      : service
      ? String(service)
      : null;

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from("events").insert([
      {
        event_name: eventName,
        service: normalizedService,
        meta,
      },
    ]);

    if (error) {
      if (error.code === "PGRST205") {
        return NextResponse.json({ ok: true, requestId, skipped: true });
      }
      console.error({ requestId, error });
      return NextResponse.json(
        { ok: false, requestId, error: "Unable to save event" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, requestId });
  } catch (err) {
    logRouteError("api/events", requestId, err);
    return internalServerError(requestId);
  }
}