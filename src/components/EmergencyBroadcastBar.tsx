"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";

type Broadcast = {
  id: string;
  severity: "info" | "warning" | "danger" | "emergency";
  title_th: string;
  title_en: string;
  message_th: string;
  message_en: string;
  action_label_th: string;
  action_label_en: string;
  action_url: string | null;
  bar_color: string;
  text_color: string;
  button_color: string;
  button_text_color: string;
  dismissible: boolean;
  starts_at: string | null;
  ends_at: string | null;
  updated_at: string;
};

const REFRESH_MS = 120_000;

export default function EmergencyBroadcastBar({ lang }: { lang: Lang }) {
  const [broadcast, setBroadcast] = useState<Broadcast | null>(null);
  const [dismissedVersion, setDismissedVersion] = useState("");

  const load = useCallback(async () => {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") return;

    try {
      const response = await fetch("/api/public/emergency-broadcast", {
        cache: "no-store",
        credentials: "same-origin",
      });
      if (!response.ok) return;
      const payload = await response.json();
      const next = (payload?.data?.broadcast ?? null) as Broadcast | null;
      setBroadcast(next);
      if (next?.updated_at) {
        try {
          setDismissedVersion(
            window.localStorage.getItem(`cpi:emergency-broadcast:dismissed:${next.updated_at}`) ?? ""
          );
        } catch {
          setDismissedVersion("");
        }
      } else {
        setDismissedVersion("");
      }
    } catch {
      // Public alert failures must never block the company website.
    }
  }, []);

  useEffect(() => {
    const initialId = window.setTimeout(() => void load(), 0);
    const intervalId = window.setInterval(() => void load(), REFRESH_MS);
    const onFocus = () => void load();
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") void load();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearTimeout(initialId);
      window.clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [load]);

  const text = useMemo(() => {
    if (!broadcast) return null;
    const useThai = lang === "th";
    return {
      title: (useThai ? broadcast.title_th : broadcast.title_en) || broadcast.title_th || broadcast.title_en,
      message: (useThai ? broadcast.message_th : broadcast.message_en) || broadcast.message_th || broadcast.message_en,
      action:
        (useThai ? broadcast.action_label_th : broadcast.action_label_en) ||
        broadcast.action_label_th ||
        broadcast.action_label_en,
    };
  }, [broadcast, lang]);

  if (!broadcast || !text || dismissedVersion === broadcast.updated_at) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(
        `cpi:emergency-broadcast:dismissed:${broadcast.updated_at}`,
        broadcast.updated_at
      );
    } catch {
      // Keep dismissal for this render even when storage is unavailable.
    }
    setDismissedVersion(broadcast.updated_at);
  };

  return (
    <div
      className="sticky top-[72px] z-40 border-b border-black/10 shadow-[0_5px_16px_rgba(15,23,42,.14)] sm:top-[80px]"
      style={{ backgroundColor: broadcast.bar_color, color: broadcast.text_color }}
      role="alert"
      aria-live={broadcast.severity === "emergency" ? "assertive" : "polite"}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-start gap-3 px-4 py-2.5 sm:items-center sm:px-6 lg:px-10">
        <span
          aria-hidden="true"
          className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-current text-sm font-black sm:mt-0"
        >
          !
        </span>

        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
          <strong className="block text-sm font-black sm:whitespace-nowrap">
            {text.title || (lang === "th" ? "แจ้งเตือนฉุกเฉิน" : "Emergency alert")}
          </strong>
          <span className="mt-0.5 block text-xs font-semibold leading-5 sm:mt-0 sm:text-sm">
            {text.message}
          </span>
        </div>

        {broadcast.action_url && text.action ? (
          <a
            href={broadcast.action_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg px-3 py-2 text-xs font-black shadow-sm transition hover:brightness-95 sm:text-sm"
            style={{
              backgroundColor: broadcast.button_color,
              color: broadcast.button_text_color,
            }}
          >
            {text.action}
          </a>
        ) : null}

        <button
          type="button"
          onClick={dismiss}
          aria-label={lang === "th" ? "ปิดข้อความแจ้งเตือน" : "Close alert"}
          className="shrink-0 rounded-lg px-2 py-1 text-xl font-black leading-none transition hover:bg-black/10"
        >
          ×
        </button>
      </div>
    </div>
  );
}
