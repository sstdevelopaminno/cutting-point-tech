"use client";

import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { trackGaEvent } from "@/lib/ga";
import { logEvent } from "@/lib/eventLogger";

const navItems = [
  { href: "/#top", key: "home" },
  { href: "/#features", key: "features" },
  { href: "/#services", key: "services" },
  { href: "/articles", key: "articles" },
  { href: "/contact", key: "contact" },
  { href: "/register-store", key: "signup" },
  { href: "/downloads", key: "downloads" },
] as const;

type NavKey = (typeof navItems)[number]["key"];

type NavbarProps = {
  lang: Lang;
  onToggleLang: () => void;
  labels: Record<NavKey, string>;
  cta: string;
  contactPhone: string;
};

export default function Navbar({
  lang,
  onToggleLang,
  labels,
  cta,
  contactPhone,
}: NavbarProps) {
  const langCode = lang === "th" ? "TH" : lang === "en" ? "EN" : "LO";
  const contactPhoneHref = `tel:${contactPhone.replace(/[^\d+]/g, "")}`;
  const signupHref = process.env.NEXT_PUBLIC_CPIPOS_SIGNUP_URL?.trim() ||
    "https://cp-ipos-it-web.vercel.app/register-store";
  const langFlagSrc =
    lang === "th"
      ? "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/pngtree-spherical-thailand-flag-png-image_3510746.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL3BuZ3RyZWUtc3BoZXJpY2FsLXRoYWlsYW5kLWZsYWctcG5nLWltYWdlXzM1MTA3NDYuanBnIiwiaWF0IjoxNzcwNzQ2NTA2LCJleHAiOjE4MDIyODI1MDZ9.qt45pLITCBp9F2YaRCrcPF2bKnq6JplnXBuXaJR-nDM"
      : "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/depositphotos_490775414-stock-illustration-britain-british-flag-icon-flat.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL2RlcG9zaXRwaG90b3NfNDkwNzc1NDE0LXN0b2NrLWlsbHVzdHJhdGlvbi1icml0YWluLWJyaXRpc2gtZmxhZy1pY29uLWZsYXQuanBnIiwiaWF0IjoxNzcwNzQ2NDYyLCJleHAiOjE4MDIyODI0NjJ9.qBpNdHVUH7t1X0oGgjGF6ZsSUovgwZPtTVIGIPW_khc";
  const langFlagSrcResolved =
    lang === "lo"
      ? "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/flag-laos-with-red-blue-stripes-white-circle-vector-icon-design_877269-3713.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL2ZsYWctbGFvcy13aXRoLXJlZC1ibHVlLXN0cmlwZXMtd2hpdGUtY2lyY2xlLXZlY3Rvci1pY29uLWRlc2lnbl84NzcyNjktMzcxMy5qcGciLCJpYXQiOjE3NzA3OTgwOTYsImV4cCI6MTgwMjMzNDA5Nn0.jN6soZsQ12XHB27BFZC1zW5pGyXJlDeo45AF2miok0I"
      : langFlagSrc;
  const langFlagAlt = lang === "th" ? "Thailand flag" : lang === "en" ? "UK flag" : "Laos flag";
  const [isScrolled, setIsScrolled] = useState(false);
  const isEnglishStyle = lang === "en";
  const featuresOverviewLabel = isEnglishStyle ? "Highlights overview" : labels.features;
  const featuresSeoAiLabel = "SEO AI";

  const t =
    lang === "th"
      ? {
          servicesOverview: "ภาพรวมบริการ",
          servicesWebsite: "รับทำเว็บไซต์",
          servicesDorm: "ระบบหอพัก/รีสอร์ท",
          servicesCompany: "จดทะเบียนบริษัท",
          menu: "เมนู",
          close: "ปิด",
          language: "ภาษา",
        }
      : lang === "lo"
        ? {
            servicesOverview: "ພາບລວມບໍລິການ",
            servicesWebsite: "ພັດທະນາເວັບໄຊ",
            servicesDorm: "ລະບົບຫໍພັກ/ຣີສອດ",
            servicesCompany: "ຈົດທະບຽນບໍລິສັດ",
            menu: "ເມນູ",
            close: "ປິດ",
            language: "ພາສາ",
          }
      : {
          servicesOverview: "Services overview",
          servicesWebsite: "Website Development",
          servicesDorm: "Dormitory/Resort System",
          servicesCompany: "Company Registration",
          menu: "Menu",
          close: "Close",
          language: "Language",
        };

  const headerClass = `sticky top-0 z-50 w-full border-b transition-all duration-300 ${
    isScrolled
      ? "border-slate-200/80 bg-slate-50/88 text-slate-950 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      : "border-white/10 bg-transparent text-white backdrop-blur-[2px]"
  }`;
  const brandTitleClass = `block whitespace-nowrap text-[15px] font-extrabold tracking-[0.08em] transition-colors sm:text-lg ${
    isScrolled ? "text-slate-950" : "text-white"
  }`;
  const brandSubtitleClass = `hidden whitespace-nowrap text-[10px] font-semibold transition-colors sm:block sm:text-xs ${
    isScrolled ? "text-slate-500" : "text-slate-200/82"
  }`;
  const navClass = `hidden items-center gap-6 text-sm font-medium transition-colors lg:flex xl:gap-8 ${
    isScrolled ? "text-slate-700" : "text-white/86"
  }`;
  const navLinkClass = `inline-flex items-center gap-1 transition-colors ${
    isScrolled ? "hover:text-slate-950" : "hover:text-white"
  }`;
  const iconButtonClass = `flex items-center justify-center rounded-full border p-2 shadow-sm transition ${
    isScrolled
      ? "border-slate-200 bg-white/90 text-slate-800 shadow-slate-900/5 hover:border-slate-300 hover:bg-white"
      : "border-white/25 bg-white/12 text-white shadow-black/10 hover:bg-white/18"
  }`;
  const langButtonClass = `flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold shadow-sm transition ${
    isScrolled
      ? "border-slate-200 bg-white/90 text-slate-800 shadow-slate-900/5 hover:border-slate-300 hover:bg-white"
      : "border-white/25 bg-white/12 text-white shadow-black/10 hover:bg-white/18"
  }`;
  const ctaClass = `inline-flex items-center gap-2 rounded-full border p-2 shadow-sm transition md:px-4 md:py-2 md:text-xs md:font-semibold ${
    isScrolled
      ? "border-slate-200 bg-white text-slate-950 shadow-slate-900/5 hover:border-slate-300"
      : "border-white/30 bg-white/92 text-slate-950 shadow-black/10 hover:bg-white"
  }${isEnglishStyle ? " md:uppercase md:tracking-[0.18em]" : ""}`;
  const onNavClick = (key: NavKey) => {
    if (key === "signup") {
      trackGaEvent("cpipos_signup_click", { location: "navbar", destination: "cpipos_it" });
      return;
    }
    if (key !== "services") {
      return;
    }
    trackGaEvent("service_click", { service: "services_menu", location: "navbar" });
    logEvent({
      eventName: "service_click",
      service: "services_menu",
      meta: { location: "navbar" },
    });
  };

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const featuresMenuDesktopRef = useRef<HTMLDivElement | null>(null);
  const servicesMenuDesktopRef = useRef<HTMLDivElement | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!featuresOpen && !servicesOpen && !mobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFeaturesOpen(false);
        setServicesOpen(false);
        setMobileMenuOpen(false);
        setMobileFeaturesOpen(false);
        setMobileServicesOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const containers = [
        featuresMenuDesktopRef.current,
        servicesMenuDesktopRef.current,
        mobileMenuRef.current,
      ].filter((node): node is HTMLDivElement => Boolean(node));
      if (!containers.length) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (containers.every((container) => !container.contains(target))) {
        setFeaturesOpen(false);
        setServicesOpen(false);
        setMobileMenuOpen(false);
        setMobileFeaturesOpen(false);
        setMobileServicesOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [featuresOpen, servicesOpen, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 12);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header className={headerClass}>
      <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-10 xl:px-14">
        <Link href="/#top" className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/brand/logo-icon.png"
            alt="โลโก้บริษัท คัตติ้ง พอยท์ อินโนเวชั่น จำกัด"
            width={64}
            height={64}
            className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
            priority
          />
          <span className="min-w-0 leading-tight">
            <span className={brandTitleClass}>
              <span className="sm:hidden">CPInno</span>
              <span className="hidden sm:inline">CUTTING POINT INNOVATION</span>
            </span>
            <span className={brandSubtitleClass}>
              บริษัท คัตติ้ง พอยท์ อินโนเวชั่น จำกัด
            </span>
          </span>
        </Link>
        <nav className={navClass}>
          {navItems.map((item) => {
            if (item.key === "signup") {
              return (
                <a
                  key={item.key}
                  href={signupHref}
                  onClick={() => onNavClick(item.key)}
                  className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                    isScrolled
                      ? "bg-sky-100 text-blue-800 hover:bg-sky-200"
                      : "bg-sky-400/15 text-sky-100 ring-1 ring-sky-300/45 hover:bg-sky-400/25"
                  }`}
                >
                  {labels.signup}
                </a>
              );
            }
            if (item.key !== "features" && item.key !== "services") {
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => onNavClick(item.key)}
                  className={navLinkClass}
                >
                  {labels[item.key]}
                </Link>
              );
            }

            if (item.key === "features") {
              return (
                <div key={item.key} ref={featuresMenuDesktopRef} className="relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={featuresOpen}
                    onClick={() => {
                      setFeaturesOpen((prev) => !prev);
                      setServicesOpen(false);
                    }}
                    className={navLinkClass}
                  >
                    {labels[item.key]}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {featuresOpen ? (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
                    >
                      <Link
                        role="menuitem"
                        href="/#features"
                        onClick={() => setFeaturesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {featuresOverviewLabel}
                      </Link>
                      <Link
                        role="menuitem"
                        href="/seo-ai"
                        onClick={() => setFeaturesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {featuresSeoAiLabel}
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <div key={item.key} ref={servicesMenuDesktopRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  onClick={() => {
                    setServicesOpen((prev) => !prev);
                    setFeaturesOpen(false);
                  }}
                  className={navLinkClass}
                >
                  {labels[item.key]}
                  <ChevronDown className="h-4 w-4" />
                </button>

                {servicesOpen ? (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
                  >
                    <Link
                      role="menuitem"
                      href="/services"
                      onClick={() => {
                        onNavClick("services");
                        setServicesOpen(false);
                      }}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {t.servicesOverview}
                    </Link>
                    <Link
                      role="menuitem"
                      href="/services/website"
                      onClick={() => {
                        onNavClick("services");
                        setServicesOpen(false);
                      }}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {t.servicesWebsite}
                    </Link>
                    <Link
                      role="menuitem"
                      href="/services/dormitory-system"
                      onClick={() => {
                        onNavClick("services");
                        setServicesOpen(false);
                      }}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {t.servicesDorm}
                    </Link>
                    <Link
                      role="menuitem"
                      href="/services/company-registration"
                      onClick={() => {
                        onNavClick("services");
                        setServicesOpen(false);
                      }}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {t.servicesCompany}
                    </Link>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div ref={mobileMenuRef} className="relative lg:hidden">
            <button
              type="button"
              aria-label={t.menu}
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              className={iconButtonClass}
            >
              <Menu className="h-5 w-5" />
            </button>

            {mobileMenuOpen ? (
              <div role="dialog" aria-modal="true" className="fixed inset-0 z-[999]">
                <button
                  type="button"
                  aria-label={t.close}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileFeaturesOpen(false);
                    setMobileServicesOpen(false);
                  }}
                  className="fixed inset-0 bg-slate-950/55 backdrop-blur-[2px]"
                />

                <div className="fixed inset-y-0 right-0 flex h-[100dvh] w-full flex-col bg-white shadow-2xl ring-1 ring-black/10 sm:w-[20rem] sm:max-w-[85vw] sm:rounded-l-3xl">
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] backdrop-blur">
                    <p className="text-sm font-semibold text-slate-900">{t.menu}</p>
                    <button
                      type="button"
                      aria-label={t.close}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileFeaturesOpen(false);
                        setMobileServicesOpen(false);
                      }}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-4 py-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
                    <div className="space-y-1">
                      <Link
                        href="/#top"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileFeaturesOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        {labels.home}
                      </Link>

                      <button
                        type="button"
                        onClick={() => setMobileFeaturesOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        <span>{labels.features}</span>
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      {mobileFeaturesOpen ? (
                        <div className="space-y-1 px-3 pb-2">
                          <Link
                            href="/#features"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {featuresOverviewLabel}
                          </Link>
                          <Link
                            href="/seo-ai"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {featuresSeoAiLabel}
                          </Link>
                        </div>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        <span>{labels.services}</span>
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      {mobileServicesOpen ? (
                        <div className="space-y-1 px-3 pb-2">
                          <Link
                            href="/services"
                            onClick={() => {
                              onNavClick("services");
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.servicesOverview}
                          </Link>
                          <Link
                            href="/services/website"
                            onClick={() => {
                              onNavClick("services");
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.servicesWebsite}
                          </Link>
                          <Link
                            href="/services/dormitory-system"
                            onClick={() => {
                              onNavClick("services");
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.servicesDorm}
                          </Link>
                          <Link
                            href="/services/company-registration"
                            onClick={() => {
                              onNavClick("services");
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.servicesCompany}
                          </Link>
                        </div>
                      ) : null}

                      <Link
                        href="/articles"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileFeaturesOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        {labels.articles}
                      </Link>

                      <Link
                        href="/contact"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileFeaturesOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        {labels.contact}
                      </Link>

                      <a
                        href={signupHref}
                        onClick={() => {
                          onNavClick("signup");
                          setMobileMenuOpen(false);
                          setMobileFeaturesOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="my-2 flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        <span>{labels.signup}</span>
                        <span className="rounded-full bg-white/20 px-2 py-1 text-xs">{lang === "th" ? "ทดลอง 7 วัน" : lang === "lo" ? "ທົດລອງ 7 ມື້" : "7-day trial"}</span>
                      </a>

                      <Link
                        href="/downloads"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileFeaturesOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        {labels.downloads}
                      </Link>

                      <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
                        <span className="text-sm font-semibold text-slate-700">{t.language}</span>
                        <button
                          type="button"
                          onClick={onToggleLang}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                        >
                          <Image
                            src={langFlagSrcResolved}
                            alt={langFlagAlt}
                            width={16}
                            height={16}
                            className="h-4 w-4 rounded-full object-cover"
                            unoptimized
                          />
                          {langCode}
                        </button>
                      </div>

                      <a
                        href={contactPhoneHref}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileFeaturesOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
                        aria-label={`${labels.contact} ${contactPhone}`}
                      >
                        <Phone className="h-4 w-4" />
                        {labels.contact}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onToggleLang}
            className={langButtonClass}
          >
            <Image
              src={langFlagSrcResolved}
              alt={langFlagAlt}
              width={16}
              height={16}
              className="h-4 w-4 rounded-full object-cover"
              unoptimized
            />
            {langCode}
          </button>
          <a href={contactPhoneHref} className={ctaClass} aria-label={`${cta} ${contactPhone}`}>
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">{cta}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

