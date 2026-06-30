import "server-only";

import { formatLeadRef } from "@/lib/leadRef";

export type LeadNotifyStatus = "sent" | "skipped" | "failed";

export type LeadNotificationPayload = {
  leadId: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  message: string;
  locale: string;
  source: string;
  requestId: string;
  createdAt?: string;
  service?: string | null;
  quoteRef?: string | null;
  quoteSubtotal?: number | null;
  quoteLines?: Array<{ label: string; amount: number }>;
  priceMin?: number | null;
  priceMax?: number | null;
};

const WEBHOOK_TOTAL_TIMEOUT_MS = 7_000;
const WEBHOOK_ATTEMPT_TIMEOUT_MS = 2_500;
const WEBHOOK_RETRY_DELAY_MS = 200;

function readEnv(name: string): string | null {
  const raw = process.env[name];
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const unquoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1).trim()
      : trimmed;
  return unquoted || null;
}

function formatMoney(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatText(payload: LeadNotificationPayload, leadRef: string | null) {
  const isEstimate = payload.source.startsWith("estimate");
  const hasQuoteValues =
    typeof payload.quoteSubtotal === "number" &&
    typeof payload.priceMin === "number" &&
    typeof payload.priceMax === "number";
  const quoteLines =
    isEstimate && payload.quoteLines?.length
      ? payload.quoteLines
          .filter((line) => line.label && Number.isFinite(Number(line.amount)))
          .slice(0, 12)
      : [];

  const lines = [
    isEstimate ? "NEW QUOTE REQUEST | CUTTING POINT TECH" : "NEW LEAD | CUTTING POINT TECH",
    "--------------------",
    leadRef ? `Ref: ${leadRef}` : null,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone || "-"}`,
    `Email: ${payload.email || "-"}`,
    `Source: ${payload.source}`,
    isEstimate ? `Service: ${payload.service || "-"}` : null,
    isEstimate ? `Quote Ref: ${payload.quoteRef || "-"}` : null,
    hasQuoteValues ? `Subtotal: ${formatMoney(payload.quoteSubtotal!, payload.locale)}` : null,
    hasQuoteValues
      ? `Range: ${formatMoney(payload.priceMin!, payload.locale)} - ${formatMoney(payload.priceMax!, payload.locale)}`
      : null,
    quoteLines.length ? "" : null,
    quoteLines.length ? "Items:" : null,
    ...quoteLines.map(
      (line) =>
        `- ${line.label}: ${formatMoney(Number(line.amount || 0), payload.locale)}`
    ),
    "",
    "Message",
    payload.message,
  ];
  return lines.filter(Boolean).join("\n");
}

function buildWebhookCandidates(rawUrl: string): string[] {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return [];
  }

  if (!/^https?:$/.test(parsed.protocol) || !parsed.host) {
    return [];
  }

  const base = parsed.toString().replace(/\/+$/, "");
  const candidates = new Set<string>([base]);

  // Some setups use a single Worker for both LINE platform webhooks and server-to-worker notifications.
  // Prefer /webhook when we can infer it, but keep compatibility with /line-callback.
  if (base.endsWith("/line-callback")) {
    candidates.add(base.replace(/\/line-callback$/, "/webhook"));
  } else if (base.endsWith("/webhook")) {
    candidates.add(base.replace(/\/webhook$/, "/line-callback"));
  }

  return Array.from(candidates);
}

export async function notifyLineViaCloudflare(
  payload: LeadNotificationPayload
): Promise<LeadNotifyStatus> {
  const webhookUrl = readEnv("CLOUDFLARE_LINE_WEBHOOK_URL");
  if (!webhookUrl) return "skipped";

  const secret = readEnv("CLOUDFLARE_LINE_WEBHOOK_SECRET");
  const leadRef = formatLeadRef(payload.leadId);

  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (secret) headers["x-webhook-secret"] = secret;

  const body = JSON.stringify({
    type: "lead",
    text: formatText(payload, leadRef),
  });

  const attempt = async (targetUrl: string, timeoutMs: number) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(targetUrl, {
        method: "POST",
        headers,
        body,
        signal: controller.signal,
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Cloudflare webhook failed: ${res.status} ${text}`.trim());
      }
    } finally {
      clearTimeout(timeout);
    }
  };

  const targets = buildWebhookCandidates(webhookUrl);
  if (!targets.length) {
    return "failed";
  }
  const errors: unknown[] = [];
  const startedAt = Date.now();

  for (const target of targets) {
    const elapsed = Date.now() - startedAt;
    const remaining = WEBHOOK_TOTAL_TIMEOUT_MS - elapsed;
    if (remaining <= 0) {
      break;
    }

    try {
      await attempt(target, Math.min(WEBHOOK_ATTEMPT_TIMEOUT_MS, remaining));
      return "sent";
    } catch (error) {
      errors.push(error);
    }

    // One retry (worker cold start / transient network)
    await new Promise((r) => setTimeout(r, WEBHOOK_RETRY_DELAY_MS));

    const retryElapsed = Date.now() - startedAt;
    const retryRemaining = WEBHOOK_TOTAL_TIMEOUT_MS - retryElapsed;
    if (retryRemaining <= 0) {
      break;
    }
    try {
      await attempt(target, Math.min(WEBHOOK_ATTEMPT_TIMEOUT_MS, retryRemaining));
      return "sent";
    } catch (error) {
      errors.push(error);
    }
  }

  if (errors.length) {
    return "failed";
  }

  return "failed";
}
