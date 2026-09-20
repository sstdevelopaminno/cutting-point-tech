import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ORIGIN = "https://cp-ipos-it-web.vercel.app";
const endpoint = `${ORIGIN}/api/store-registration`;
const respond = (payload: unknown, status: number) =>
  NextResponse.json(payload, { status, headers: { "cache-control": "private, no-store" } });

async function relay(request: Request, method: "GET" | "POST") {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    try {
      const headers = new Headers({ accept: "application/json" });
      let body: string | undefined;
      if (method === "POST") {
        const requestOrigin = request.headers.get("origin");
        if (requestOrigin && new URL(requestOrigin).host !== new URL(request.url).host) {
          return respond({ error: "Cross-origin submission is not allowed" }, 403);
        }
        if (!request.headers.get("content-type")?.includes("application/json")) {
          return respond({ error: "ข้อมูลคำขอต้องเป็น JSON" }, 415);
        }
        body = await request.text();
        if (body.length > 12_000) return respond({ error: "ข้อมูลคำขอมีขนาดใหญ่เกินไป" }, 413);
        headers.set("content-type", "application/json");
        // Pass the edge-resolved IP for the CpIPOS-IT public rate limiter.
        const clientIp = request.headers.get("x-real-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
        if (clientIp) headers.set("x-forwarded-for", clientIp);
      }
      const upstream = await fetch(endpoint, {
        method, headers, body, signal: controller.signal,
        cache: "no-store", redirect: "error",
      });
      const data = await upstream.json().catch(() => null) as unknown;
      if (!data || typeof data !== "object") {
        return respond({ error: "ระบบสมัครแพ็กเกจไม่พร้อมใช้งาน กรุณาลองใหม่ภายหลัง" }, 503);
      }
      return respond(data, upstream.status);
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error("[company-store-registration] upstream unavailable", error instanceof Error ? error.message : String(error));
    return respond({ error: "ระบบสมัครแพ็กเกจไม่พร้อมใช้งาน กรุณาลองใหม่ภายหลัง" }, 503);
  }
}

export async function GET(request: Request) {
  return relay(request, "GET");
}

export async function POST(request: Request) {
  return relay(request, "POST");
}
