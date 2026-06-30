import "server-only";

import nodemailer from "nodemailer";

type LeadEmailPayload = {
  name: string;
  phone?: string | null;
  email?: string | null;
  message: string;
  locale: string;
  source: string;
  service?: string | null;
  quoteRef?: string | null;
  quoteSubtotal?: number | null;
  quoteLines?: Array<{ label: string; amount: number }>;
  priceMin?: number | null;
  priceMax?: number | null;
};

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
  requireTls: boolean;
};

const readEnv = (name: string): string | null => {
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
};

const getMailConfig = (): MailConfig | null => {
  const host = readEnv("SMTP_HOST");
  const portRaw = readEnv("SMTP_PORT") ?? "587";
  if (!/^\d+$/.test(portRaw)) {
    return null;
  }
  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    return null;
  }
  const user = readEnv("SMTP_USER");
  const pass = readEnv("SMTP_PASS");
  const from = readEnv("MAIL_FROM");
  const to = readEnv("ADMIN_NOTIFY_EMAIL");

  if (!host || !user || !pass || !from || !to) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
    from,
    to,
    requireTls: port !== 465,
  };
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");

const formatMoney = (amount: number, locale: string) =>
  new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);

export type LeadNotifyStatus = "sent" | "skipped" | "failed";

export const sendLeadNotification = async (
  payload: LeadEmailPayload
): Promise<LeadNotifyStatus> => {
  const config = getMailConfig();
  if (!config) return "skipped";
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: config.requireTls,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });

  const subject = `New lead: ${payload.name}`;
  const hasQuote =
    payload.source.startsWith("estimate") &&
    Number.isFinite(payload.quoteSubtotal ?? NaN) &&
    Number.isFinite(payload.priceMin ?? NaN) &&
    Number.isFinite(payload.priceMax ?? NaN);
  const messageText = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone || "-"}`,
    `Email: ${payload.email || "-"}`,
    `Locale: ${payload.locale}`,
    `Source: ${payload.source}`,
    hasQuote ? `Service: ${payload.service || "-"}` : null,
    hasQuote ? `Quote Ref: ${payload.quoteRef || "-"}` : null,
    hasQuote && typeof payload.quoteSubtotal === "number"
      ? `Subtotal: ${formatMoney(payload.quoteSubtotal, payload.locale)}`
      : null,
    hasQuote &&
    typeof payload.priceMin === "number" &&
    typeof payload.priceMax === "number"
      ? `Price Range: ${formatMoney(payload.priceMin, payload.locale)} - ${formatMoney(payload.priceMax, payload.locale)}`
      : null,
    hasQuote && payload.quoteLines?.length ? "Quote Items:" : null,
    ...(hasQuote && payload.quoteLines?.length
      ? payload.quoteLines.map(
          (line) =>
            `- ${line.label}: ${formatMoney(
              Number(line.amount || 0),
              payload.locale
            )}`
        )
      : []),
    `Message: ${payload.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const quoteRowsHtml =
    hasQuote && payload.quoteLines?.length
      ? payload.quoteLines
          .map(
            (line) => `
          <tr>
            <td style="padding:10px 12px; border-bottom:1px solid #e2e8f0;">${escapeHtml(line.label)}</td>
            <td style="padding:10px 12px; border-bottom:1px solid #e2e8f0; text-align:right; white-space:nowrap;">${escapeHtml(formatMoney(Number(line.amount || 0), payload.locale))}</td>
          </tr>
        `
          )
          .join("")
      : "";

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background:#f4f6fb; padding:32px;">
      <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:16px; padding:28px; box-shadow:0 14px 40px rgba(15,23,42,0.12);">
        <p style="font-size:12px; text-transform:uppercase; letter-spacing:0.2em; color:#1d4ed8; margin:0 0 8px;">
          CUTTING POINT TECH
        </p>
        <h2 style="margin:0 0 16px; font-size:24px; color:#0f172a;">New Web Lead</h2>
        <p style="margin:0 0 20px; color:#475569; font-size:14px;">
          A new contact form submission has been received.
        </p>
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#0f172a;">
          <tr>
            <td style="padding:10px 12px; background:#f8fafc; font-weight:600; width:140px;">Name</td>
            <td style="padding:10px 12px;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px; background:#f8fafc; font-weight:600;">Phone</td>
            <td style="padding:10px 12px;">${escapeHtml(payload.phone || "-")}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px; background:#f8fafc; font-weight:600;">Email</td>
            <td style="padding:10px 12px;">${escapeHtml(payload.email || "-")}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px; background:#f8fafc; font-weight:600;">Locale</td>
            <td style="padding:10px 12px;">${escapeHtml(payload.locale)}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px; background:#f8fafc; font-weight:600;">Source</td>
            <td style="padding:10px 12px;">${escapeHtml(payload.source)}</td>
          </tr>
          ${
            hasQuote
              ? `
          <tr>
            <td style="padding:10px 12px; background:#f8fafc; font-weight:600;">Service</td>
            <td style="padding:10px 12px;">${escapeHtml(payload.service || "-")}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px; background:#f8fafc; font-weight:600;">Quote Ref</td>
            <td style="padding:10px 12px;">${escapeHtml(payload.quoteRef || "-")}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px; background:#f8fafc; font-weight:600;">Subtotal</td>
            <td style="padding:10px 12px;">${escapeHtml(
              typeof payload.quoteSubtotal === "number"
                ? formatMoney(payload.quoteSubtotal, payload.locale)
                : "-"
            )}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px; background:#f8fafc; font-weight:600;">Estimated Range</td>
            <td style="padding:10px 12px;">${escapeHtml(
              typeof payload.priceMin === "number" &&
                typeof payload.priceMax === "number"
                ? `${formatMoney(payload.priceMin, payload.locale)} - ${formatMoney(payload.priceMax, payload.locale)}`
                : "-"
            )}</td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="padding:10px 12px; background:#f8fafc; font-weight:600;">Message</td>
            <td style="padding:10px 12px;">${escapeHtml(payload.message)}</td>
          </tr>
        </table>
        ${
          quoteRowsHtml
            ? `
        <div style="margin-top:16px; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;">
          <div style="padding:10px 12px; background:#f8fafc; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#334155;">
            Quote Items
          </div>
          <table style="width:100%; border-collapse:collapse; font-size:14px; color:#0f172a;">
            ${quoteRowsHtml}
          </table>
        </div>
        `
            : ""
        }
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject,
    text: messageText,
    html,
  });

  return "sent";
};
