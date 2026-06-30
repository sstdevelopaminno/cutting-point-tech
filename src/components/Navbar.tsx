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
  { href: "/packages", key: "packages" },
  // Keep key as "portfolio" to avoid changing the i18n schema elsewhere; label becomes "Website Templates".
  { href: "/templates", key: "portfolio" },
  { href: "/articles", key: "articles" },
  { href: "/contact", key: "contact" },
] as const;

type NavKey = (typeof navItems)[number]["key"];

type NavbarProps = {
  lang: Lang;
  onToggleLang: () => void;
  labels: Record<NavKey, string>;
  cta: string;
};

export default function Navbar({ lang, onToggleLang, labels, cta }: NavbarProps) {
  const langCode = lang === "th" ? "TH" : lang === "en" ? "EN" : "LO";
  const langFlagSrc =
    lang === "th"
      ? "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/pngtree-spherical-thailand-flag-png-image_3510746.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL3BuZ3RyZWUtc3BoZXJpY2FsLXRoYWlsYW5kLWZsYWctcG5nLWltYWdlXzM1MTA3NDYuanBnIiwiaWF0IjoxNzcwNzQ2NTA2LCJleHAiOjE4MDIyODI1MDZ9.qt45pLITCBp9F2YaRCrcPF2bKnq6JplnXBuXaJR-nDM"
      : "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/depositphotos_490775414-stock-illustration-britain-british-flag-icon-flat.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL2RlcG9zaXRwaG90b3NfNDkwNzc1NDE0LXN0b2NrLWlsbHVzdHJhdGlvbi1icml0YWluLWJyaXRpc2gtZmxhZy1pY29uLWZsYXQuanBnIiwiaWF0IjoxNzcwNzQ2NDYyLCJleHAiOjE4MDIyODI0NjJ9.qBpNdHVUH7t1X0oGgjGF6ZsSUovgwZPtTVIGIPW_khc";
  const langFlagSrcResolved =
    lang === "lo"
      ? "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/flag-laos-with-red-blue-stripes-white-circle-vector-icon-design_877269-3713.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL2ZsYWctbGFvcy13aXRoLXJlZC1ibHVlLXN0cmlwZXMtd2hpdGUtY2lyY2xlLXZlY3Rvci1pY29uLWRlc2lnbl84NzcyNjktMzcxMy5qcGciLCJpYXQiOjE3NzA3OTgwOTYsImV4cCI6MTgwMjMzNDA5Nn0.jN6soZsQ12XHB27BFZC1zW5pGyXJlDeo45AF2miok0I"
      : langFlagSrc;
  const langFlagAlt = lang === "th" ? "Thailand flag" : lang === "en" ? "UK flag" : "Laos flag";
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
          packagesPos: "แพ็คเกจ ระบบ POS",
          packagesWebsite: "แพ็กเกจรับทำเว็บไซต์",
          packagesDorm: "แพ็กเกจระบบหอพัก",
          packagesCompany: "แพ็กเกจจดทะเบียนบริษัท",
          templatesCorporate: "เว็บไซต์องค์กร",
          templatesEcommerce: "ร้านค้าออนไลน์",
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
            packagesPos: "ແພັກເກດ ລະບົບ POS",
            packagesWebsite: "ແພັກເກດ ເວັບໄຊ",
            packagesDorm: "ແພັກເກດ ຫໍພັກ",
            packagesCompany: "ແພັກເກດ ຈົດທະບຽນບໍລິສັດ",
            templatesCorporate: "ເວັບໄຊອົງກອນ",
            templatesEcommerce: "ຮ້ານຄ້າອອນລາຍ",
            menu: "ເມນູ",
            close: "ປິດ",
            language: "ພາສາ",
          }
      : {
          servicesOverview: "Services overview",
          servicesWebsite: "Website Development",
          servicesDorm: "Dormitory/Resort System",
          servicesCompany: "Company Registration",
          packagesPos: "POS system package",
          packagesWebsite: "Website package",
          packagesDorm: "Dormitory package",
          packagesCompany: "Company registration package",
          templatesCorporate: "Corporate",
          templatesEcommerce: "Ecommerce",
          menu: "Menu",
          close: "Close",
          language: "Language",
        };

  const ctaClass =
    isEnglishStyle
      ? "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300 md:border-0 md:bg-slate-900 md:px-4 md:py-2 md:text-xs md:font-semibold md:text-white md:shadow-md md:hover:bg-slate-800 md:uppercase md:tracking-[0.18em]"
      : "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300 md:border-0 md:bg-slate-900 md:px-4 md:py-2 md:text-xs md:font-semibold md:text-white md:shadow-md md:hover:bg-slate-800";

  const onNavClick = (key: NavKey) => {
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
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const featuresMenuDesktopRef = useRef<HTMLDivElement | null>(null);
  const servicesMenuDesktopRef = useRef<HTMLDivElement | null>(null);
  const packagesMenuDesktopRef = useRef<HTMLDivElement | null>(null);
  const templatesMenuDesktopRef = useRef<HTMLDivElement | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const [mobileTemplatesOpen, setMobileTemplatesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!featuresOpen && !servicesOpen && !packagesOpen && !templatesOpen && !mobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFeaturesOpen(false);
        setServicesOpen(false);
        setPackagesOpen(false);
        setTemplatesOpen(false);
        setMobileMenuOpen(false);
        setMobileFeaturesOpen(false);
        setMobileServicesOpen(false);
        setMobilePackagesOpen(false);
        setMobileTemplatesOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const containers = [
        featuresMenuDesktopRef.current,
        servicesMenuDesktopRef.current,
        packagesMenuDesktopRef.current,
        templatesMenuDesktopRef.current,
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
        setPackagesOpen(false);
        setTemplatesOpen(false);
        setMobileMenuOpen(false);
        setMobileFeaturesOpen(false);
        setMobileServicesOpen(false);
        setMobilePackagesOpen(false);
        setMobileTemplatesOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [featuresOpen, servicesOpen, packagesOpen, templatesOpen, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/#top" className="flex min-w-0 items-center">
          <Image
            src="/brand/logo-navbar.png"
            alt="บริษัท คัตติ้งพอยท์ เทค จำกัด - CUTTING POINT TECH COMPANY LIMITED"
            width={360}
            height={110}
            className="h-11 w-auto max-w-[220px] object-contain sm:h-12 sm:max-w-[280px]"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {navItems.map((item) => {
            if (
              item.key !== "features" &&
              item.key !== "services" &&
              item.key !== "packages" &&
              item.key !== "portfolio"
            ) {
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => onNavClick(item.key)}
                  className="transition-colors hover:text-slate-900"
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
                      setPackagesOpen(false);
                      setTemplatesOpen(false);
                    }}
                    className="inline-flex items-center gap-1 transition-colors hover:text-slate-900"
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

            if (item.key === "packages") {
              return (
                <div key={item.key} ref={packagesMenuDesktopRef} className="relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={packagesOpen}
                    onClick={() => {
                      setPackagesOpen((prev) => !prev);
                      setFeaturesOpen(false);
                      setServicesOpen(false);
                      setTemplatesOpen(false);
                    }}
                    className="inline-flex items-center gap-1 transition-colors hover:text-slate-900"
                  >
                    {labels[item.key]}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {packagesOpen ? (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
                    >
                      <Link
                        role="menuitem"
                        href="/packages#pos"
                        onClick={() => setPackagesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.packagesPos}
                      </Link>
                      <Link
                        role="menuitem"
                        href="/packages#website"
                        onClick={() => setPackagesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.packagesWebsite}
                      </Link>
                      <Link
                        role="menuitem"
                        href="/packages#dormitory"
                        onClick={() => setPackagesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.packagesDorm}
                      </Link>
                      <Link
                        role="menuitem"
                        href="/packages#company"
                        onClick={() => setPackagesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.packagesCompany}
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            }

            if (item.key === "portfolio") {
              return (
                <div key={item.key} ref={templatesMenuDesktopRef} className="relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={templatesOpen}
                    onClick={() => {
                      setTemplatesOpen((prev) => !prev);
                      setFeaturesOpen(false);
                      setServicesOpen(false);
                    }}
                    className="inline-flex items-center gap-1 transition-colors hover:text-slate-900"
                  >
                    {labels[item.key]}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {templatesOpen ? (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
                    >
                      <Link
                        role="menuitem"
                        href="/templates/corporate"
                        onClick={() => setTemplatesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.templatesCorporate}
                      </Link>
                      <Link
                        role="menuitem"
                        href="/templates/ecommerce"
                        onClick={() => setTemplatesOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {t.templatesEcommerce}
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
                    setTemplatesOpen(false);
                    setPackagesOpen(false);
                  }}
                  className="inline-flex items-center gap-1 transition-colors hover:text-slate-900"
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
              className="flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300"
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
                    setMobilePackagesOpen(false);
                    setMobileTemplatesOpen(false);
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
                        setMobilePackagesOpen(false);
                        setMobileTemplatesOpen(false);
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
                          setMobilePackagesOpen(false);
                          setMobileTemplatesOpen(false);
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
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
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
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
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
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
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
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
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
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
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
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.servicesCompany}
                          </Link>
                        </div>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => setMobilePackagesOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        <span>{labels.packages}</span>
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      {mobilePackagesOpen ? (
                        <div className="space-y-1 px-3 pb-2">
                          <Link
                            href="/packages#pos"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.packagesPos}
                          </Link>
                          <Link
                            href="/packages#website"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.packagesWebsite}
                          </Link>
                          <Link
                            href="/packages#dormitory"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.packagesDorm}
                          </Link>
                          <Link
                            href="/packages#company"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.packagesCompany}
                          </Link>
                        </div>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => setMobileTemplatesOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        <span>{labels.portfolio}</span>
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      {mobileTemplatesOpen ? (
                        <div className="space-y-1 px-3 pb-2">
                          <Link
                            href="/templates/corporate"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.templatesCorporate}
                          </Link>
                          <Link
                            href="/templates/ecommerce"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileFeaturesOpen(false);
                              setMobileServicesOpen(false);
                              setMobilePackagesOpen(false);
                              setMobileTemplatesOpen(false);
                            }}
                            className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {t.templatesEcommerce}
                          </Link>
                        </div>
                      ) : null}

                      <Link
                        href="/articles"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileFeaturesOpen(false);
                          setMobileServicesOpen(false);
                          setMobilePackagesOpen(false);
                          setMobileTemplatesOpen(false);
                        }}
                        className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        {labels.articles}
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

                      <Link
                        href="/contact"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileFeaturesOpen(false);
                          setMobileServicesOpen(false);
                          setMobilePackagesOpen(false);
                          setMobileTemplatesOpen(false);
                        }}
                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
                      >
                        <Phone className="h-4 w-4" />
                        {labels.contact}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
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
          <Link href="/contact" className={ctaClass} aria-label={cta}>
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">{cta}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

