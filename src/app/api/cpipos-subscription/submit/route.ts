import { NextResponse } from "next/server";
import { enforcePublicApiRateLimit, getClientIp, internalServerError, logRouteError } from "@/lib/apiSecurity";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CONTROL_PLANE = (process.env.CPIPOS_CONTROL_PLANE_URL || "https://cp-ipos-web.vercel.app").replace(/\/+$/, "");
const MAX_BODY = 4 * 1024 * 1024 + 24_000;

export async function POST(req: Request) {
  const id = crypto.randomUUID();
  const ip = getClientIp(req);
  const length = Number(req.headers.get("content-length") || 0);
  if (length > MAX_BODY) {
    return NextResponse.json({ ok: false, requestId: id, error: "ไฟล์สลิปต้องมีขนาดไม่เกิน 4 MB" }, { status: 413 });
  }

  const limited = await enforcePublicApiRateLimit({
    route: "cpipos_package_submit",
    ip,
    limit: 12,
    windowMs: 10 * 60_000,
    requestId: id,
  });
  if (limited) return limited;

  try {
    const form = await req.formData();
    const response = await fetch(CONTROL_PLANE + "/api/public/subscription-checkout/submit", {
      method: "POST",
      headers: { "x-forwarded-for": ip, "x-request-id": id },
      body: form,
      cache: "no-store",
    });
    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") || "application/json",
        "cache-control": "private, no-store",
      },
    });
  } catch (error) {
    logRouteError("cpipos_package_submit_proxy", id, error);
    return internalServerError(id);
  }
}
