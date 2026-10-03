import { NextResponse } from "next/server";
import { enforcePublicApiRateLimit, getClientIp, internalServerError, logRouteError } from "@/lib/apiSecurity";

export const dynamic = "force-dynamic";

const CONTROL_PLANE = (process.env.CPIPOS_CONTROL_PLANE_URL || "https://cp-ipos-web.vercel.app").replace(/\/+$/, "");

function requestId() {
  return crypto.randomUUID();
}

async function forward(req: Request, method: "GET" | "POST") {
  const id = requestId();
  const ip = getClientIp(req);
  if (method === "POST") {
    const limited = await enforcePublicApiRateLimit({
      route: "cpipos_package_verify",
      ip,
      limit: 10,
      windowMs: 5 * 60_000,
      requestId: id,
    });
    if (limited) return limited;
  }

  try {
    const body = method === "POST" ? await req.text() : undefined;
    const response = await fetch(CONTROL_PLANE + "/api/public/subscription-checkout", {
      method,
      headers: method === "POST"
        ? { "content-type": "application/json", "x-forwarded-for": ip, "x-request-id": id }
        : { "x-forwarded-for": ip, "x-request-id": id },
      body,
      cache: "no-store",
    });
    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") || "application/json",
        "cache-control": method === "GET" ? "public, max-age=60, s-maxage=300" : "private, no-store",
      },
    });
  } catch (error) {
    logRouteError("cpipos_package_proxy", id, error);
    return internalServerError(id);
  }
}

export async function GET(req: Request) {
  return forward(req, "GET");
}

export async function POST(req: Request) {
  return forward(req, "POST");
}
