"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type BusinessPartnerSectionProps = {
  title?: string;
  subtitle?: string;
  companyLogoSrc: string;
  partnerLogoSrc?: string;
  partnerName?: string;
};

type LogoPanelProps = {
  label: string;
  logoSrc?: string;
  placeholder?: string;
  side: "left" | "right";
  isVisible: boolean;
};

function LogoPanel({ label, logoSrc, placeholder, side, isVisible }: LogoPanelProps) {
  const startClass = side === "left" ? "-translate-x-10" : "translate-x-10";

  return (
    <div
      className={`relative z-10 flex min-h-[148px] w-full flex-col items-center justify-center rounded-[24px] bg-white/56 px-4 py-5 text-center shadow-[0_24px_80px_rgba(15,23,42,0.075)] ring-1 ring-white/85 backdrop-blur-md transition duration-[600ms] ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 md:min-h-[196px] ${
        isVisible ? "translate-x-0 opacity-100" : `${startClass} opacity-0`
      }`}
      style={{ transitionDelay: "620ms" }}
    >
      <div className="absolute inset-0 -z-10 rounded-[24px] bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.96),rgba(239,248,255,0.32)_58%,rgba(255,255,255,0.62))]" />
      {logoSrc ? (
        <div
          className={`business-partner-logo-spin relative h-24 w-full md:h-32 ${isVisible ? "is-visible" : ""}`}
          style={{ animationDelay: "880ms" }}
        >
          <Image
            src={logoSrc}
            alt={label}
            fill
            className="object-contain mix-blend-multiply"
            sizes="(max-width: 768px) 72vw, 360px"
            priority={false}
          />
        </div>
      ) : (
        <div
          className={`business-partner-logo-spin flex h-36 w-full items-center justify-center rounded-[24px] border border-dashed border-blue-200/80 bg-white/20 text-sm font-semibold tracking-[0.24em] text-blue-400 md:h-48 ${
            isVisible ? "is-visible" : ""
          }`}
          style={{ animationDelay: "880ms" }}
        >
          {placeholder ?? "PARTNER LOGO"}
        </div>
      )}
      <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-slate-600">{label}</p>
    </div>
  );
}

function HandshakeMark({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`relative z-20 flex items-center justify-center transition duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{ transitionDelay: "320ms" }}
    >
      <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-blue-400/18 blur-2xl" />
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/92 shadow-[0_18px_60px_rgba(37,99,235,0.22)] ring-1 ring-blue-100 md:h-20 md:w-20">
        <svg viewBox="0 0 64 64" className="h-9 w-9 text-blue-600" aria-hidden="true">
          <path d="M18 36l-5-5 9-9 8 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M46 36l5-5-9-9-12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M24 34l11 11a5 5 0 0 0 7-7l-9-9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M22 42l4 4m3-1l3 3m3-1l2 2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
        </svg>
      </div>
    </div>
  );
}

export default function BusinessPartnerSection({
  title = "พันธมิตรทางธุรกิจ",
  companyLogoSrc,
  partnerLogoSrc,
  partnerName = "PARTNER",
}: BusinessPartnerSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.28 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="business-partner"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FBFF_16%,#EEF6FF_52%,#F7FBFF_84%,#FFFFFF_100%)] py-12 md:py-16"
    >
      <div className="pointer-events-none absolute inset-x-[8%] top-16 -z-10 h-56 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="mx-auto w-full max-w-5xl px-6">
        <div
          className={`mx-auto max-w-3xl text-center transition duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold text-blue-600">PARTNERSHIP</p>
          <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="relative mt-8 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-7">
          <svg className="pointer-events-none absolute inset-x-0 top-1/2 z-[5] hidden h-36 -translate-y-1/2 overflow-visible text-blue-400 md:block" viewBox="0 0 1120 180" fill="none" aria-hidden="true">
            <path className={`business-partner-connector top left ${isVisible ? "is-visible" : ""}`} d="M424 76 C464 54 500 60 528 86" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path className={`business-partner-connector bottom left ${isVisible ? "is-visible" : ""}`} d="M424 104 C464 126 500 120 528 94" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path className={`business-partner-connector top right ${isVisible ? "is-visible" : ""}`} d="M696 76 C656 54 620 60 592 86" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path className={`business-partner-connector bottom right ${isVisible ? "is-visible" : ""}`} d="M696 104 C656 126 620 120 592 94" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>

          <LogoPanel label="CUTTING POINT TECH" logoSrc={companyLogoSrc} side="left" isVisible={isVisible} />
          <HandshakeMark isVisible={isVisible} />
          <LogoPanel label={partnerName} logoSrc={partnerLogoSrc} placeholder={`${partnerName} LOGO`} side="right" isVisible={isVisible} />
        </div>
      </div>

      <style>{`
        .business-partner-logo-spin {
          transform-style: preserve-3d;
          transform: rotateY(0deg) scale(1);
        }

        .business-partner-logo-spin.is-visible {
          animation: business-partner-logo-spin 820ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .business-partner-connector {
          opacity: 0;
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          transform-box: fill-box;
          transform-origin: center;
        }

        .business-partner-connector.is-visible {
          animation: business-partner-line-throw 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .business-partner-connector.top.is-visible {
          animation-delay: 340ms;
        }

        .business-partner-connector.bottom.is-visible {
          animation-delay: 400ms;
        }

        @keyframes business-partner-logo-spin {
          0% {
            transform: rotateY(0deg) scale(0.94);
          }
          72% {
            transform: rotateY(360deg) scale(1.04);
          }
          100% {
            transform: rotateY(360deg) scale(1);
          }
        }

        @keyframes business-partner-line-throw {
          0% {
            opacity: 0;
            stroke-dashoffset: 260;
            transform: scaleX(0.7);
            filter: drop-shadow(0 0 0 rgba(37, 99, 235, 0));
          }
          58% {
            opacity: 1;
            stroke-dashoffset: 30;
            transform: scaleX(1.03);
            filter: drop-shadow(0 10px 14px rgba(37, 99, 235, 0.26));
          }
          100% {
            opacity: 0.95;
            stroke-dashoffset: 0;
            transform: scaleX(1);
            filter: drop-shadow(0 2px 5px rgba(37, 99, 235, 0.12));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .business-partner-logo-spin.is-visible,
          .business-partner-connector.is-visible {
            animation: none;
          }

          .business-partner-connector.is-visible {
            opacity: 0.95;
            stroke-dashoffset: 0;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}