import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { isEstimatorService } from "@/lib/estimate";

type EventPayload = {
  eventName?: string;
  service?: string | null;
  meta?: Record<string, unknown> | null;
};

const ALLOWED_EVENTS = new Set([
  "service_click",
  "estimate_start",
  "estimate_submit",
  "lead_submit",
]);

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();

  try {
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
        { ok: false, requestId, error: "Database insert failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, requestId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error({ requestId, error: err });
    return NextResponse.json(
      { ok: false, requestId, error: message },
      { status: 500 }
    );
  }
}
