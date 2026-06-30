"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import SubmitStatusModal from "@/components/SubmitStatusModal";
import { useLang } from "@/components/LangContext";
import { trackGaEvent } from "@/lib/ga";
import { getCopy } from "@/lib/i18n";
import { formatLeadRef } from "@/lib/leadRef";

export default function ContactPageClient() {
  const { lang } = useLang();
  const copy = getCopy(lang);
  const REQUEST_TIMEOUT_MS = 15_000;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [debugRequestId, setDebugRequestId] = useState<string | null>(null);
  const [leadRef, setLeadRef] = useState<string | null>(null);
  const [submitModal, setSubmitModal] = useState<
    | { open: false }
    | {
        open: true;
        variant: "sending" | "success" | "error";
        title: string;
        message?: string;
      }
  >({ open: false });
  const submitModalTimerRef = useRef<number | null>(null);
  const submitInFlightRef = useRef(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    company: "",
    startedAt: null as number | null,
  });

  const isDev =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const formLabelClass =
    lang === "th"
      ? "text-xs font-semibold text-slate-500"
      : "text-xs uppercase tracking-[0.2em] text-slate-500";
  const submitClass =
    lang === "th"
      ? "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      : "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400";
  const submitModalVariant = submitModal.open ? submitModal.variant : null;
  const getNotificationWarning = (notifications: {
    email?: "sent" | "skipped" | "failed";
    line?: "sent" | "skipped" | "failed";
  } | null) => {
    if (!notifications) return null;
    const issues: string[] = [];
    if (notifications.email && notifications.email !== "sent") {
      issues.push(`Email: ${notifications.email}`);
    }
    if (notifications.line && notifications.line !== "sent") {
      issues.push(`LINE: ${notifications.line}`);
    }
    if (!issues.length) return null;
    return lang === "th"
      ? `หมายเหตุ: การแจ้งเตือนบางช่องทางยังไม่สำเร็จ (${issues.join(", ")})`
      : `Note: some notifications were not delivered (${issues.join(", ")})`;
  };
  const setStartedAtIfMissing = () => {
    setFormData((prev) => (prev.startedAt ? prev : { ...prev, startedAt: Date.now() }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitInFlightRef.current || status === "loading") {
      return;
    }
    submitInFlightRef.current = true;
    trackGaEvent("contact_submit_attempt", { locale: lang });
    setStatus("loading");
    setErrorMessage(null);
    setDebugRequestId(null);
    setLeadRef(null);
    setSubmitModal({
      open: true,
      variant: "sending",
      title: copy.contact.sending,
      message: undefined,
    });

    const controller = new AbortController();
    let timeoutId: number | null = null;
    try {
      timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale: lang }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        const err = data?.error || "Submission failed";
        setDebugRequestId(data?.requestId ?? null);
        throw new Error(err);
      }
      const notificationWarning = getNotificationWarning(data?.notifications ?? null);

      setStatus("success");
      setLeadRef(formatLeadRef(data?.leadId ?? null));
      trackGaEvent("contact_submit_success", { locale: lang });
      setSubmitModal({
        open: true,
        variant: "success",
        title:
          lang === "th"
            ? "ส่งสำเร็จ"
            : lang === "lo"
              ? "ສົ່ງສຳເລັດ"
              : "Sent successfully",
        message: notificationWarning
          ? `${copy.contact.success}\n${notificationWarning}`
          : copy.contact.success,
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        company: "",
        startedAt: null,
      });
    } catch (error) {
      const isAbort = error instanceof DOMException && error.name === "AbortError";
      const message = isAbort
        ? lang === "th"
          ? "การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง"
          : "Request timed out. Please try again."
        : error instanceof Error
          ? error.message
          : "Submission failed. Please try again.";
      trackGaEvent("contact_submit_error", { locale: lang });
      setErrorMessage(message);
      setStatus("error");
      setSubmitModal({
        open: true,
        variant: "error",
        title:
          lang === "th"
            ? "ส่งไม่สำเร็จ"
            : lang === "lo"
              ? "ສົ່ງບໍ່ສຳເລັດ"
              : "Failed to send",
        message,
      });
    } finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      submitInFlightRef.current = false;
    }
  };

  useEffect(() => {
    if (submitModalTimerRef.current) {
      window.clearTimeout(submitModalTimerRef.current);
      submitModalTimerRef.current = null;
    }

    if (!submitModal.open) {
      return;
    }

    if (submitModalVariant === "success") {
      submitModalTimerRef.current = window.setTimeout(() => {
        setSubmitModal({ open: false });
        setStatus("idle");
        setErrorMessage(null);
        setDebugRequestId(null);
        setLeadRef(null);
        submitModalTimerRef.current = null;
      }, 3500);
      return;
    }

    if (submitModalVariant === "error") {
      submitModalTimerRef.current = window.setTimeout(() => {
        setSubmitModal({ open: false });
        submitModalTimerRef.current = null;
      }, 6000);
    }
  }, [submitModal.open, submitModalVariant]);

  useEffect(() => {
    return () => {
      if (submitModalTimerRef.current) {
        window.clearTimeout(submitModalTimerRef.current);
        submitModalTimerRef.current = null;
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-mist text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-mist py-10">
        <div className="mx-auto w-full max-w-6xl space-y-4 px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            CUTTING POINT TECH
          </p>
          <h1 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {copy.contact.title}
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">{copy.contact.subtitle}</p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
              <form className="space-y-4" onSubmit={handleSubmit} onFocusCapture={setStartedAtIfMissing}>
                <div>
                  <label className={formLabelClass} htmlFor="contact-name">
                    {copy.contact.name}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    maxLength={120}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        name: event.target.value,
                        startedAt: formData.startedAt ?? Date.now(),
                      })
                    }
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={formLabelClass} htmlFor="contact-phone">
                      {copy.contact.phone}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      maxLength={50}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                      value={formData.phone}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          phone: event.target.value,
                          startedAt: formData.startedAt ?? Date.now(),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={formLabelClass} htmlFor="contact-email">
                      {copy.contact.email}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      maxLength={120}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          email: event.target.value,
                          startedAt: formData.startedAt ?? Date.now(),
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className={formLabelClass} htmlFor="contact-message">
                    {copy.contact.message}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    maxLength={2000}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                    value={formData.message}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        message: event.target.value,
                        startedAt: formData.startedAt ?? Date.now(),
                      })
                    }
                  />
                </div>
                <input
                  type="text"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden"
                  value={formData.company}
                  onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                />

                <button
                  type="submit"
                  className={submitClass}
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                >
                  {status === "loading" ? copy.contact.sending : copy.contact.submit}
                </button>

                {status === "error" ? (
                  <p className="text-sm text-rose-600">
                    {errorMessage ||
                      (lang === "th"
                        ? "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
                        : "Submission failed. Please try again.")}
                    {isDev && debugRequestId ? ` (requestId: ${debugRequestId})` : ""}
                  </p>
                ) : null}
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
                <h2 className="font-[var(--font-heading)] text-xl font-semibold text-slate-900">
                  {copy.contact.detailsTitle}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{copy.contact.detailsSubtitle}</p>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p>{copy.footer.company}</p>
                  <p>{copy.footer.address}</p>
                  <p>{copy.footer.phone}</p>
                  <p>{copy.footer.email}</p>
                  <p>{copy.footer.line}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
                <h2 className="font-[var(--font-heading)] text-xl font-semibold text-slate-900">
                  {lang === "th" ? "การดูแลหลังส่งมอบ" : "Post-launch care"}
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  {lang === "th"
                    ? "แพ็กเกจดูแลรายเดือน พร้อมทีมงานดูแลความปลอดภัยและอัปเดตระบบให้ต่อเนื่อง"
                    : "Monthly care plans with security monitoring and continuous updates."}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  <li>SLA ระดับองค์กร</li>
                  <li>รายงานวิเคราะห์รายเดือน</li>
                  <li>อัปเดตฟีเจอร์แบบยืดหยุ่น</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubmitStatusModal
        open={submitModal.open}
        variant={submitModal.open ? submitModal.variant : "sending"}
        title={submitModal.open ? submitModal.title : ""}
        message={submitModal.open ? submitModal.message : undefined}
        reference={submitModal.open && submitModal.variant === "success" ? leadRef : null}
        closeLabel={lang === "th" ? "ตกลง" : lang === "lo" ? "ຕົກລົງ" : "OK"}
        onClose={() => setSubmitModal({ open: false })}
      />
    </main>
  );
}
