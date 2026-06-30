"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ClipboardCopy,
  ExternalLink,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/relativeTime";

export type LeadNotificationData = {
  title: string;
  org: string;
  refId: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  source: string;
  locale: string;
  requestId: string;
  message: string;
  leadId: string;
  createdAt: string;
};

export type LeadNotificationCardProps = {
  data: LeadNotificationData;
  onOpenLead?: (leadId: string) => void;
  className?: string;
  renderLeadUrl?: (leadId: string) => string;
};

type CopyState = { status: "copied" | "failed"; at: number } | null;

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function safeTel(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

async function copyToClipboard(text: string) {
  if (!text) return;
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "true");
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

function FieldRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-2 text-xs">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span
        className={cx(
          "text-slate-900 dark:text-slate-100",
          mono && "font-mono tracking-[0.12em]"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function LabeledField({
  icon,
  label,
  value,
  mono = false,
}: {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:ring-slate-800">
      <div className="inline-flex min-w-0 items-center gap-1 text-slate-500 dark:text-slate-400">
        {icon}
        <span className="truncate text-xs">{label}</span>
      </div>
      <div
        className={cx(
          "min-w-0 truncate text-xs font-medium text-slate-800 dark:text-slate-100",
          mono && "font-mono text-[11px] font-semibold tracking-[0.12em]"
        )}
      >
        {value}
      </div>
    </div>
  );
}

export function LeadNotificationCard({
  data,
  onOpenLead,
  className,
  renderLeadUrl,
}: LeadNotificationCardProps) {
  const [copyState, setCopyState] = useState<CopyState>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!copyState) return;
    const id = window.setTimeout(() => setCopyState(null), 1600);
    return () => window.clearTimeout(id);
  }, [copyState]);

  const createdLabel = useMemo(
    () => formatRelativeTime(data.createdAt, { now }),
    [data.createdAt, now]
  );

  const sourceLabel = useMemo(() => {
    const raw = String(data.source || "").trim();
    if (!raw) return "unknown";
    return raw.length > 18 ? `${raw.slice(0, 18)}\u2026` : raw;
  }, [data.source]);

  const telHref = data.phone ? `tel:${safeTel(data.phone)}` : null;
  const mailHref = data.email ? `mailto:${data.email}` : null;

  const leadUrl =
    typeof renderLeadUrl === "function" ? renderLeadUrl(data.leadId) : null;

  const copyText = useMemo(() => {
    const lines: string[] = [];
    if (data.refId) lines.push(`Ref: ${data.refId}`);
    if (data.phone) lines.push(`Phone: ${data.phone}`);
    if (data.email) lines.push(`Email: ${data.email}`);
    return lines.join("\n");
  }, [data.refId, data.phone, data.email]);

  const localeLabel = useMemo(() => {
    const raw = String(data.locale || "").trim();
    return raw ? raw.toUpperCase() : "\u2014";
  }, [data.locale]);

  const payload = useMemo(() => JSON.stringify(data, null, 2), [data]);

  return (
    <section
      className={cx(
        "w-full max-w-[44rem] rounded-2xl border border-slate-200/70 bg-white shadow-sm",
        "dark:border-slate-800/70 dark:bg-slate-950 dark:shadow-[0_0_0_1px_rgba(148,163,184,0.06),0_18px_60px_rgba(0,0,0,0.45)]",
        className
      )}
      aria-label="New lead notification"
    >
      <header className="flex items-start justify-between gap-3 p-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-2xl bg-blue-50 ring-1 ring-blue-100 dark:bg-blue-950/40 dark:ring-blue-900">
            <Sparkles
              className="h-[18px] w-[18px] text-blue-600 dark:text-blue-300"
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">
                {data.title}
              </h3>

              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                {sourceLabel}
              </span>
            </div>

            <div className="mt-0.5 flex flex-wrap items-center gap-2">
              <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                {data.org}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                <span className="text-slate-400 dark:text-slate-500">Ref</span>
                <span className="font-mono tracking-[0.08em]">{data.refId}</span>
              </span>
            </div>
          </div>
        </div>

        <time
          className="shrink-0 text-[11px] font-medium text-slate-500 dark:text-slate-400"
          dateTime={data.createdAt}
        >
          {createdLabel}
        </time>
      </header>

      <div className="border-t border-slate-200/70 p-4 dark:border-slate-800/70">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug text-slate-900 dark:text-slate-50">
              {data.name}
            </p>

            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <LabeledField
                icon={<Phone className="h-3.5 w-3.5" aria-hidden="true" />}
                label="Phone"
                value={
                  data.phone ? (
                    <a
                      href={telHref ?? "#"}
                      onClick={(e) => {
                        if (!telHref) e.preventDefault();
                      }}
                      className={cx(
                        "truncate underline-offset-2 hover:underline",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:rounded",
                        !telHref && "pointer-events-none no-underline"
                      )}
                      aria-label="Phone number"
                    >
                      {data.phone}
                    </a>
                  ) : (
                    "\u2014"
                  )
                }
              />

              <LabeledField
                icon={<Mail className="h-3.5 w-3.5" aria-hidden="true" />}
                label="Email"
                value={
                  data.email ? (
                    <a
                      href={mailHref ?? "#"}
                      onClick={(e) => {
                        if (!mailHref) e.preventDefault();
                      }}
                      className={cx(
                        "truncate underline-offset-2 hover:underline",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:rounded",
                        !mailHref && "pointer-events-none no-underline"
                      )}
                      aria-label="Email address"
                    >
                      {data.email}
                    </a>
                  ) : (
                    "\u2014"
                  )
                }
              />

              <LabeledField label="Locale" value={localeLabel} mono />
            </div>

            <p
              className={cx(
                "mt-2 text-sm text-slate-600 dark:text-slate-300",
                "overflow-hidden text-ellipsis",
                "[display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
              )}
            >
              {data.message}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:w-[15rem]">
            <a
              href={telHref ?? "#"}
              onClick={(e) => {
                if (!telHref) e.preventDefault();
              }}
              aria-disabled={!telHref}
              tabIndex={telHref ? 0 : -1}
              className={cx(
                "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition",
                "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900",
                !telHref && "pointer-events-none opacity-50"
              )}
              aria-label="Call lead"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>

            <a
              href={mailHref ?? "#"}
              onClick={(e) => {
                if (!mailHref) e.preventDefault();
              }}
              aria-disabled={!mailHref}
              tabIndex={mailHref ? 0 : -1}
              className={cx(
                "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition",
                "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900",
                !mailHref && "pointer-events-none opacity-50"
              )}
              aria-label="Email lead"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </a>

            <button
              type="button"
              className={cx(
                "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition",
                "hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                "dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
              )}
              onClick={async () => {
                try {
                  await copyToClipboard(copyText);
                  setCopyState({ status: "copied", at: Date.now() });
                } catch {
                  setCopyState({ status: "failed", at: Date.now() });
                }
              }}
              aria-label="Copy lead phone, email, and reference ID"
            >
              <ClipboardCopy className="h-4 w-4" aria-hidden="true" />
              {copyState?.status === "copied" ? "Copied" : "Copy"}
            </button>

            {onOpenLead ? (
              <button
                type="button"
                className={cx(
                  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition",
                  "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                  "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900"
                )}
                onClick={() => onOpenLead(data.leadId)}
                aria-label="Open lead"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sm:hidden">Open</span>
                <span className="hidden sm:inline">Open lead</span>
              </button>
            ) : (
              <a
                href={leadUrl ?? "#"}
                onClick={(e) => {
                  if (!leadUrl) e.preventDefault();
                }}
                aria-disabled={!leadUrl}
                tabIndex={leadUrl ? 0 : -1}
                className={cx(
                  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition",
                  "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                  "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900",
                  !leadUrl && "pointer-events-none opacity-50"
                )}
                aria-label="Open lead"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sm:hidden">Open</span>
                <span className="hidden sm:inline">Open lead</span>
              </a>
            )}

            <div className="col-span-2">
              <div className="sr-only" aria-live="polite" role="status">
                {copyState?.status === "copied"
                  ? "Copied to clipboard"
                  : copyState?.status === "failed"
                    ? "Failed to copy"
                    : ""}
              </div>

              {copyState?.status ? (
                <div
                  className={cx(
                    "mt-1 text-center text-[11px] font-medium",
                    copyState.status === "copied"
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-rose-700 dark:text-rose-300"
                  )}
                >
                  {copyState.status === "copied"
                    ? "Copied"
                    : "Copy failed"}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/30">
          <summary
            className={cx(
              "flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-slate-700",
              "rounded-lg px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
              "dark:text-slate-200"
            )}
          >
            <span className="inline-flex items-center gap-2">Details</span>
            <ChevronDown
              className="h-4 w-4 text-slate-400 dark:text-slate-500"
              aria-hidden="true"
            />
          </summary>

          <div className="mt-3 space-y-2">
            <FieldRow label="Request ID" value={data.requestId} mono />

            <pre className="mt-3 max-h-56 overflow-auto rounded-lg border border-slate-200 bg-white p-3 text-[11px] leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              {payload}
            </pre>
          </div>
        </details>
      </div>
    </section>
  );
}

export default LeadNotificationCard;

// Example usage:
// const mockData: LeadNotificationData = {
//   title: "New lead",
//   org: "CUTTING POINT TECH",
//   refId: "LD-6916-93FA",
//   name: "\u0e1e\u0e34\u0e0a\u0e0d\u0e4c\u0e1e\u0e25\u0020\u0e28\u0e34\u0e23\u0e34\u0e1b\u0e23\u0e30\u0e40\u0e2a\u0e23\u0e34\u0e10",
//   phone: "0843374982",
//   email: "sstaminno@gmail.com",
//   source: "website",
//   locale: "th",
//   requestId: "05d544cd-2462-4eaa-87b5-af33f9f2ab14",
//   message: "2222222222222",
//   leadId: "691693fa-c652-45f7-8431-f2e6591fc3a0",
//   createdAt: new Date().toISOString(),
// };
//
// <LeadNotificationCard
//   data={mockData}
//   onOpenLead={(leadId) => console.log("open lead", leadId)}
// />;
