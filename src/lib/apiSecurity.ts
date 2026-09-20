import "server-only";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

type RateLimitOptions = {
  route: string;
  ip: string;
  limit: number;
  windowMs: number;
  requestId: string;
};

const fallbackLimits = new Map<string, RateLimitEntry>();
const FALLBACK_MAX_ENTRIES = 5_000;
const RATE_LIMIT_ERROR = "Too many requests";
const INTERNAL_ERROR = "Internal server error";

function normalizeLimitKey(value: string): string {
  return value.replace(/[^a-zA-Z0-9:._/-]/g, "").slice(0, 160) || "unknown";
}

function cleanupFallbackLimits(now: number, windowMs: number) {
  for (const [key, entry] of fallbackLimits.entries()) {
    if (now - entry.windowStart > windowMs) {
      fallbackLimits.delete(key);
    }
  }

  if (fallbackLimits.size <= FALLBACK_MAX_ENTRIES) {
    return;
  }

  const staleFirst = Array.from(fallbackLimits.entries()).sort(
    (a, b) => a[1].windowStart - b[1].windowStart
  );
  const overflow = fallbackLimits.size - FALLBACK_MAX_ENTRIES;
  for (let index = 0; index < overflow; index += 1) {
    const stale = staleFirst[index];
    if (!stale) break;
    fallbackLimits.delete(stale[0]);
  }
}

function fallbackIsRateLimited(key: string, now: number, windowMs: number, limit: number): boolean {
  cleanupFallbackLimits(now, windowMs);

  const entry = fallbackLimits.get(key);
  if (!entry || now - entry.windowStart > windowMs) {
    fallbackLimits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > limit;
}

async function consumeDurableRateLimit(
  key: string,
  windowSeconds: number,
  limit: number
): Promise<boolean | null> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.rpc("consume_public_rate_limit", {
      p_limit_key: key,
      p_window_seconds: windowSeconds,
      p_max_requests: limit,
    });

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Durable rate limit unavailable; using in-memory fallback", {
          code: error.code,
          message: error.message,
        });
      }
      return null;
    }

    return data === true;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Durable rate limit unavailable; using in-memory fallback", error);
    }
    return null;
  }
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return normalizeLimitKey(forwardedFor.split(",")[0]?.trim() || "unknown");
  }
  return normalizeLimitKey(req.headers.get("x-real-ip") || "unknown");
}

export async function enforcePublicApiRateLimit({
  route,
  ip,
  limit,
  windowMs,
  requestId,
}: RateLimitOptions): Promise<NextResponse | null> {
  const now = Date.now();
  const key = normalizeLimitKey(`${route}:${ip}`);
  const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));
  const durableAllowed = await consumeDurableRateLimit(key, windowSeconds, limit);
  const isLimited =
    durableAllowed === null
      ? fallbackIsRateLimited(key, now, windowMs, limit)
      : !durableAllowed;

  if (!isLimited) {
    return null;
  }

  return NextResponse.json(
    { ok: false, requestId, error: RATE_LIMIT_ERROR },
    { status: 429 }
  );
}

export function logRouteError(route: string, requestId: string, error: unknown) {
  console.error(`[${route}] request failed`, { requestId, error });
}

export function internalServerError(requestId: string) {
  return NextResponse.json(
    { ok: false, requestId, error: INTERNAL_ERROR },
    { status: 500 }
  );
}