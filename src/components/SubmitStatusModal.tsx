"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";

type SubmitStatusModalProps = {
  open: boolean;
  variant: "sending" | "success" | "error";
  title: string;
  message?: string;
  reference?: string | null;
  onClose?: () => void;
  closeLabel?: string;
};

export default function SubmitStatusModal({
  open,
  variant,
  title,
  message,
  reference,
  onClose,
  closeLabel = "OK",
}: SubmitStatusModalProps) {
  if (!open) return null;

  const isSending = variant === "sending";
  const Icon =
    variant === "sending" ? Loader2 : variant === "success" ? CheckCircle2 : XCircle;

  const iconClass =
    variant === "sending"
      ? "text-blue-600"
      : variant === "success"
        ? "text-emerald-600"
        : "text-rose-600";

  const ringClass =
    variant === "sending"
      ? "bg-blue-50 ring-blue-100"
      : variant === "success"
        ? "bg-emerald-50 ring-emerald-100"
        : "bg-rose-50 ring-rose-100";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-live={isSending ? "polite" : "assertive"}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={() => {
          if (!isSending) onClose?.();
        }}
      />

      <div className="relative w-[22rem] max-w-[92vw] overflow-hidden rounded-3xl border border-white/20 bg-white shadow-[0_28px_90px_rgba(2,6,23,0.22)]">
        <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900" />

        <div className="p-5 text-center">
          <div className="mx-auto flex w-fit items-center justify-center">
            <div className={`rounded-2xl p-3 ring-1 ${ringClass}`}>
              <Icon className={`h-6 w-6 ${iconClass} ${isSending ? "animate-spin" : ""}`} />
            </div>
          </div>

          <p className="mt-3 text-base font-semibold leading-snug text-slate-900">{title}</p>
          {message ? (
            <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {message}
            </p>
          ) : null}

          {reference && !isSending ? (
            <div className="mt-3 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                <span className="text-slate-500">Ref</span>
                <span className="font-mono tracking-[0.1em]">{reference}</span>
              </div>
            </div>
          ) : null}

          {!isSending ? (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-w-28 items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-slate-800"
              >
                {closeLabel}
              </button>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-900/70" />
              </div>
              <p className="text-[11px] text-slate-500">{message ?? "Please wait..."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
