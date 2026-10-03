"use client";

import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type PackageRow = {
  id: string;
  code: string;
  name: string;
  contact_sales: boolean;
  monthly_price: number | null;
  yearly_price: number | null;
  max_branches: number | null;
  max_devices: number | null;
  max_users: number | null;
  max_products: number | null;
  monthly_bill_limit: number | null;
  storage_limit_gb: number | null;
  retention_months: number | null;
  sales_mode_limit: number | null;
  ai_included: boolean;
  ai_monthly_requests: number | null;
};

type CheckoutSession = {
  token: string;
  expires_in_seconds: number;
  store: { code: string; name: string };
  package: {
    id: string;
    code: string;
    name: string;
    billing_interval: "monthly" | "yearly";
    amount: number;
    currency: string;
  };
  issuer: {
    name: string;
    bank_name: string;
    account_name: string;
    account_number: string;
    promptpay_id: string;
  };
};

type ApiEnvelope<T> = {
  data?: T;
  error?: { code?: string; message?: string };
};

type IconName = "lock" | "store" | "key" | "upload" | "arrow" | "check";

function LineIcon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  if (name === "store") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <path d="M4 10h16" />
        <path d="M5 10V6.8L7 4h10l2 2.8V10" />
        <path d="M6 10v9h12v-9" />
        <path d="M9 19v-5h6v5" />
      </svg>
    );
  }
  if (name === "key") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <circle cx="8" cy="15" r="3.5" />
        <path d="M10.7 12.3 18 5m-1 1 2 2m-4 0 2 2" />
      </svg>
    );
  }
  if (name === "upload") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <path d="M12 16V5" />
        <path d="m8 9 4-4 4 4" />
        <path d="M5 19h14" />
      </svg>
    );
  }
  if (name === "arrow") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <path d="M5 12h14" />
        <path d="m15 8 4 4-4 4" />
      </svg>
    );
  }
  if (name === "check") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <path d="m6 12 4 4 8-8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function PlanIcon({ code }: { code: string }) {
  const common = "h-7 w-7";
  if (code === "starter") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={common} aria-hidden>
        <path d="M4 10h16" />
        <path d="M5 10V7l2-3h10l2 3v3" />
        <path d="M6 10v9h12v-9" />
        <path d="M9 19v-5h6v5" />
      </svg>
    );
  }
  if (code === "growth") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={common} aria-hidden>
        <path d="M5 19V9" /><path d="M10 19V5" /><path d="M15 19v-7" /><path d="M20 19V3" />
      </svg>
    );
  }
  if (code === "business") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={common} aria-hidden>
        <path d="M5 21V5h9v16" /><path d="M14 9h5v12" /><path d="M8 8h3M8 12h3M8 16h3M17 12h1M17 16h1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={common} aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20.3h-3v-.08a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7 15a1.7 1.7 0 0 0-1.56-1.03H5.3v-3h.14A1.7 1.7 0 0 0 7 9.94a1.7 1.7 0 0 0-.34-1.88L6.6 8l2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 11.7 4.7V4.6h3v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 8l-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.14v3h-.14A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

type FeatureIconName = "branch" | "device" | "users" | "product" | "bill" | "storage" | "history" | "mode" | "ai";

function FeatureIcon({ name, className = "h-4 w-4" }: { name: FeatureIconName; className?: string }) {
  const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "branch") return <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden><path d="M6 20v-7h12v7M4 13h16M5 13V8l2-3h10l2 3v5M9 20v-4h6v4" /></svg>;
  if (name === "device") return <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>;
  if (name === "users") return <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.5a2.5 2.5 0 0 1 0 5M17 14c2.2.4 3.5 2 3.5 5" /></svg>;
  if (name === "product") return <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="m4 7 8 4 8-4M4 7v10l8 4 8-4V7M12 11v10" /></svg>;
  if (name === "bill") return <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
  if (name === "storage") return <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg>;
  if (name === "history") return <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
  if (name === "mode") return <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden><path d="M12 3 9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5L12 3Z" /></svg>;
  return <svg viewBox="0 0 24 24" {...base} className={className} aria-hidden><path d="M8 5h8l2 3v8l-2 3H8l-2-3V8l2-3Z" /><path d="M9 10h.01M15 10h.01M9 15c1 .8 2 .9 3 .9s2-.1 3-.9M12 5V2" /></svg>;
}

function money(value: number | null) {
  if (value == null) return "ตามสัญญา";
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function number(value: number | null, suffix = "") {
  return value == null ? "ตามสัญญา" : new Intl.NumberFormat("th-TH").format(value) + suffix;
}

function packageDescription(code: string) {
  if (code === "starter") return "เริ่มต้นใช้งานสำหรับร้านขนาดเล็ก";
  if (code === "growth") return "เหมาะสำหรับร้านที่กำลังเติบโต";
  if (code === "business") return "สำหรับธุรกิจที่ต้องการขยายทีมและสาขา";
  return "ปรับสิทธิ์และทรัพยากรตามความต้องการ";
}

function displayForCustom(pkg: PackageRow, value: string) {
  return pkg.contact_sales ? "ตามสัญญา" : value;
}

export default function CpiposPricingCheckout() {
  const [packages, setPackages] = useState<PackageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [catalogError, setCatalogError] = useState("");
  const [selected, setSelected] = useState<PackageRow | null>(null);
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly");
  const [step, setStep] = useState<"verify" | "pay" | "success">("verify");
  const [storeCode, setStoreCode] = useState("");
  const [pin, setPin] = useState("");
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [slip, setSlip] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [dialogError, setDialogError] = useState("");
  const [requestId, setRequestId] = useState("");
  const [mobileCompareCode, setMobileCompareCode] = useState("growth");

  useEffect(() => {
    let active = true;
    void fetch("/api/cpipos-subscription", { cache: "no-store" })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as ApiEnvelope<{ packages?: PackageRow[] }> | null;
        if (!response.ok) throw new Error(payload?.error?.message || "โหลดราคาแพ็กเกจไม่สำเร็จ");
        if (active) setPackages(payload?.data?.packages ?? []);
      })
      .catch((error) => {
        if (active) setCatalogError(error instanceof Error ? error.message : "โหลดราคาแพ็กเกจไม่สำเร็จ");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const mobileComparePackage = packages.find((pkg) => pkg.code === mobileCompareCode) ?? packages[0] ?? null;

  function openCheckout(pkg: PackageRow) {
    if (pkg.contact_sales) return;
    setSelected(pkg);
    setInterval("monthly");
    setStep("verify");
    setStoreCode("");
    setPin("");
    setSession(null);
    setSlip(null);
    setNote("");
    setDialogError("");
    setRequestId("");
  }

  function closeCheckout() {
    if (busy) return;
    setSelected(null);
    setSession(null);
    setSlip(null);
    setDialogError("");
  }

  async function verifyStore() {
    if (!selected) return;
    if (!storeCode.trim() || !pin.trim()) {
      setDialogError("กรุณากรอกรหัสร้านและ PIN ของ Owner/Manager");
      return;
    }
    setBusy(true);
    setDialogError("");
    try {
      const response = await fetch("/api/cpipos-subscription", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          store_code: storeCode.trim(),
          pin,
          package_id: selected.id,
          billing_interval: interval,
        }),
      });
      const payload = (await response.json().catch(() => null)) as ApiEnvelope<CheckoutSession> | null;
      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message || "ยืนยันร้านไม่สำเร็จ");
      }
      setSession(payload.data);
      setStep("pay");
      setPin("");
    } catch (error) {
      setDialogError(error instanceof Error ? error.message : "ยืนยันร้านไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  async function submitPayment() {
    if (!session || !slip) {
      setDialogError("กรุณาแนบรูปสลิปก่อนส่งคำขอ");
      return;
    }
    setBusy(true);
    setDialogError("");
    try {
      const form = new FormData();
      form.set("checkout_token", session.token);
      form.set("slip", slip);
      form.set("note", note);
      const response = await fetch("/api/cpipos-subscription/submit", {
        method: "POST",
        body: form,
      });
      const payload = (await response.json().catch(() => null)) as ApiEnvelope<{ id?: string }> | null;
      if (!response.ok || !payload?.data?.id) {
        throw new Error(payload?.error?.message || "ส่งหลักฐานการชำระไม่สำเร็จ");
      }
      setRequestId(payload.data.id);
      setStep("success");
    } catch (error) {
      setDialogError(error instanceof Error ? error.message : "ส่งหลักฐานการชำระไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  const compareRows: Array<{ label: string; icon: FeatureIconName; value: (p: PackageRow) => string }> = [
    { label: "สาขา", icon: "branch", value: (p) => displayForCustom(p, number(p.max_branches)) },
    { label: "เครื่อง POS", icon: "device", value: (p) => displayForCustom(p, number(p.max_devices)) },
    { label: "ผู้ใช้งาน", icon: "users", value: (p) => displayForCustom(p, number(p.max_users)) },
    { label: "สินค้า", icon: "product", value: (p) => displayForCustom(p, number(p.max_products)) },
    { label: "บิล / เดือน", icon: "bill", value: (p) => displayForCustom(p, number(p.monthly_bill_limit)) },
    { label: "Storage", icon: "storage", value: (p) => displayForCustom(p, p.storage_limit_gb == null ? "ตามสัญญา" : p.storage_limit_gb + " GB") },
    { label: "เก็บข้อมูลยอดขาย", icon: "history", value: (p) => displayForCustom(p, number(p.retention_months, " เดือน")) },
    { label: "โหมดการขาย", icon: "mode", value: (p) => displayForCustom(p, p.sales_mode_limit == null ? "กำหนดตามสัญญา" : "สูงสุด " + p.sales_mode_limit + " โหมด") },
    { label: "CpiPOS AI", icon: "ai", value: (p) => p.contact_sales ? "กำหนดตามสัญญา" : p.ai_included ? "รวม " + number(p.ai_monthly_requests, " ครั้ง/เดือน") : "ไม่รวม" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eaf5ff_0%,#f7fbff_44%,#ffffff_100%)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#6fb8ff]/20 blur-3xl" />
          <div className="absolute right-[-120px] top-16 h-80 w-80 rounded-full bg-[#2a72ff]/12 blur-3xl" />
          <div className="absolute left-1/2 top-0 h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8ec5ff]/70 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-5 pb-10 pt-12 sm:px-8 lg:pb-12 lg:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#6680a8]">แพ็กเกจและราคา</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#071a38] sm:text-5xl">
              เลือกแพ็กเกจ <span className="text-[#155eef]">CpiPOS</span> ที่เหมาะกับร้านคุณ
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-[#5e708d] sm:text-base">
              เปรียบเทียบราคาและสิทธิ์การใช้งานจากระบบ CpiPOS โดยตรง เลือกแพ็กเกจที่เหมาะกับขนาดธุรกิจของคุณ
              <br className="hidden sm:block" />
              ยืนยันรหัสร้านด้วย PIN ของ Owner/Manager แล้วชำระได้จากหน้านี้โดยไม่ต้องล็อกอินเข้า POS
            </p>
          </div>

          {catalogError ? (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-700">
              {catalogError}
            </div>
          ) : null}

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-[590px] animate-pulse rounded-[22px] border border-[#d8e5f4] bg-white/80" />
                ))
              : packages.map((pkg) => {
                  const featured = pkg.code === "growth";
                  const business = pkg.code === "business";
                  return (
                    <article
                      key={pkg.id}
                      className={
                        "relative flex min-h-[590px] flex-col overflow-visible rounded-[22px] border bg-white p-5 text-[#0b1c3d] transition duration-300 " +
                        (featured
                          ? "border-[#1885ff] shadow-[0_20px_55px_rgba(24,133,255,0.16)] ring-1 ring-[#1885ff]/20"
                          : business
                            ? "border-[#c8d9ef] shadow-[0_14px_40px_rgba(16,70,145,0.08)]"
                            : "border-[#d8e5f4] shadow-[0_14px_36px_rgba(32,76,127,0.07)]")
                      }
                    >
                      {featured ? (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[linear-gradient(90deg,#0d73ff,#2058e8)] px-4 py-1.5 text-[11px] font-black text-white shadow-[0_8px_18px_rgba(21,94,239,0.3)]">
                          แพ็กเกจสำหรับร้านส่วนใหญ่
                        </span>
                      ) : business ? (
                        <span className="absolute right-4 top-4 rounded-full bg-[#eaf2ff] px-3 py-1 text-[10px] font-black text-[#155eef]">
                          สำหรับธุรกิจ
                        </span>
                      ) : null}

                      <div className="flex min-h-[78px] items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#d8e6fb] bg-[#f3f8ff] text-[#155eef] shadow-[0_5px_14px_rgba(21,94,239,0.08)]">
                          <PlanIcon code={pkg.code} />
                        </div>
                        <div className="pt-0.5">
                          <h2 className="text-[20px] font-black tracking-tight text-[#0b1c3d]">{pkg.name}</h2>
                          <p className="mt-1 text-[12px] leading-5 text-[#6a7b95]">{packageDescription(pkg.code)}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-[34px] font-black leading-none tracking-[-0.03em] text-[#155eef]">
                          {pkg.contact_sales ? "ตามสัญญา" : money(pkg.monthly_price)}
                          {!pkg.contact_sales ? <span className="ml-1 text-[13px] font-bold text-[#667892]">/ เดือน</span> : null}
                        </div>
                        {pkg.yearly_price ? (
                          <p className="mt-2 text-[13px] font-bold text-[#55708f]">
                            {money(pkg.yearly_price)} / ปี
                          </p>
                        ) : pkg.contact_sales ? (
                          <p className="mt-2 text-[13px] font-semibold text-[#6b7d96]">ออกแบบตามความต้องการของธุรกิจ</p>
                        ) : null}
                      </div>

                      <div className="my-5 h-px bg-[#e2eaf4]" />

                      <div className="space-y-0 text-[13px]">
                        {compareRows.map((row) => (
                          <div key={row.label} className="flex min-h-[34px] items-center justify-between gap-3 border-b border-[#edf2f7] py-1.5 last:border-b-0">
                            <span className="flex items-center gap-2 text-[#60738e]">
                              <FeatureIcon name={row.icon} className="h-4 w-4 text-[#155eef]" />
                              {row.label}
                            </span>
                            <strong className="text-right font-black text-[#14294a]">{row.value(pkg)}</strong>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto pt-5">
                        {pkg.contact_sales ? (
                          <Link
                            href="/contact"
                            className="flex w-full items-center justify-center gap-2 rounded-[14px] border-2 border-[#2c78ff] bg-white px-4 py-3 text-sm font-black text-[#155eef] transition hover:bg-[#f3f7ff]"
                          >
                            ขอใบเสนอราคา
                            <LineIcon name="arrow" className="h-4 w-4" />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openCheckout(pkg)}
                            className={
                              "flex w-full items-center justify-center gap-2 rounded-[14px] px-4 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(21,94,239,0.2)] transition " +
                              (featured
                                ? "bg-[linear-gradient(90deg,#155eef,#163fc9)] hover:brightness-105"
                                : "bg-[linear-gradient(90deg,#0f79ff,#1658ef)] hover:brightness-105")
                            }
                          >
                            เลือกแพ็กเกจ
                            <LineIcon name="arrow" className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
          </div>
        </div>

        {!loading && packages.length ? (
          <div className="relative mx-auto max-w-[1320px] px-5 pb-16 sm:px-8 lg:pb-20">
            <section className="overflow-hidden rounded-[24px] border border-[#d7e3f0] bg-white/95 shadow-[0_18px_54px_rgba(23,70,120,0.08)] backdrop-blur">
              <div className="border-b border-[#e4ebf3] px-6 py-5 sm:px-7">
                <h2 className="text-2xl font-black tracking-tight text-[#0b1c3d]">เปรียบเทียบแพ็กเกจแบบละเอียด</h2>
                <p className="mt-1 text-sm text-[#677b96]">
                  ดูรายละเอียดฟีเจอร์ทั้งหมดของ CpiPOS ในแต่ละแพ็กเกจ เพื่อเลือกสิ่งที่เหมาะกับธุรกิจของคุณ
                </p>
              </div>

              <div className="px-4 pb-5 pt-4 sm:px-6">
                <div className="lg:hidden">
                  <div className="grid grid-cols-2 gap-2 rounded-[16px] bg-[#f2f6fb] p-2">
                    {packages.map((pkg) => {
                      const active = mobileComparePackage?.id === pkg.id;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setMobileCompareCode(pkg.code)}
                          className={
                            "rounded-[12px] px-3 py-3 text-sm font-black transition " +
                            (active
                              ? "bg-[#155eef] text-white shadow-[0_7px_16px_rgba(21,94,239,0.22)]"
                              : "bg-white text-[#29415f] shadow-[0_2px_8px_rgba(21,55,95,0.05)]")
                          }
                        >
                          {pkg.name}
                        </button>
                      );
                    })}
                  </div>

                  {mobileComparePackage ? (
                    <div className="mt-4 overflow-hidden rounded-[18px] border border-[#dce6f2] bg-white">
                      <div className="bg-[linear-gradient(135deg,#eef6ff,#f8fbff)] px-4 py-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#6b82a1]">แพ็กเกจที่เลือก</p>
                            <h3 className="mt-1 text-xl font-black text-[#0b1c3d]">{mobileComparePackage.name}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] font-bold text-[#72839a]">ราคาเริ่มต้น</p>
                            <p className="mt-1 text-lg font-black text-[#155eef]">
                              {mobileComparePackage.contact_sales ? "ตามสัญญา" : money(mobileComparePackage.monthly_price)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="divide-y divide-[#e8eef5]">
                        <div className="flex items-center justify-between gap-3 px-4 py-3.5 text-sm">
                          <span className="font-semibold text-[#667991]">ราคา / เดือน</span>
                          <strong className="text-right text-[#19304f]">
                            {mobileComparePackage.contact_sales ? "ตามสัญญา" : money(mobileComparePackage.monthly_price)}
                          </strong>
                        </div>
                        <div className="flex items-center justify-between gap-3 px-4 py-3.5 text-sm">
                          <span className="font-semibold text-[#667991]">ราคา / ปี</span>
                          <strong className="text-right text-[#19304f]">
                            {mobileComparePackage.contact_sales
                              ? "ตามสัญญา"
                              : mobileComparePackage.yearly_price
                                ? money(mobileComparePackage.yearly_price)
                                : "—"}
                          </strong>
                        </div>
                        {compareRows.map((row) => (
                          <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3.5 text-sm">
                            <span className="flex min-w-0 items-center gap-2 font-semibold text-[#667991]">
                              <FeatureIcon name={row.icon} className="h-4 w-4 shrink-0 text-[#155eef]" />
                              <span>{row.label}</span>
                            </span>
                            <strong className="max-w-[48%] text-right leading-5 text-[#19304f]">{row.value(mobileComparePackage)}</strong>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-[#e3ebf4] bg-[#f9fbfd] p-4">
                        {mobileComparePackage.contact_sales ? (
                          <Link
                            href="/contact"
                            className="flex w-full items-center justify-center gap-2 rounded-[13px] border-2 border-[#2c78ff] bg-white px-4 py-3 text-sm font-black text-[#155eef]"
                          >
                            ขอใบเสนอราคา
                            <LineIcon name="arrow" className="h-4 w-4" />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openCheckout(mobileComparePackage)}
                            className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-[linear-gradient(90deg,#0f79ff,#1658ef)] px-4 py-3 text-sm font-black text-white shadow-[0_8px_18px_rgba(21,94,239,0.2)]"
                          >
                            เลือกแพ็กเกจ {mobileComparePackage.name}
                            <LineIcon name="arrow" className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null}

                  <p className="mt-3 text-center text-[11px] leading-5 text-[#7b8ba1]">
                    แตะชื่อแพ็กเกจด้านบนเพื่อดูรายละเอียดทั้งหมด โดยไม่ต้องเลื่อนตารางไปทางซ้ายหรือขวา
                  </p>
                </div>

                <div className="hidden overflow-x-auto lg:block">
                  <table className="min-w-[930px] w-full border-separate border-spacing-0 text-[13px]">
                    <thead>
                      <tr>
                        <th className="rounded-l-[14px] bg-[#f3f7fc] px-4 py-3 text-left font-black text-[#253b5d]">ฟีเจอร์ / แพ็กเกจ</th>
                        {packages.map((pkg, index) => (
                          <th
                            key={pkg.id}
                            className={
                              "px-4 py-3 text-center text-[14px] font-black " +
                              (pkg.code === "growth" ? "bg-[#e9f4ff] text-[#155eef]" : "bg-[#f3f7fc] text-[#0b1c3d]") +
                              (index === packages.length - 1 ? " rounded-r-[14px]" : "")
                            }
                          >
                            {pkg.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b border-[#e6edf5] px-4 py-3 font-bold text-[#657791]">ราคา / เดือน</td>
                        {packages.map((pkg) => (
                          <td key={pkg.id} className={"border-b border-[#e6edf5] px-4 py-3 text-center font-bold " + (pkg.code === "growth" ? "bg-[#f5faff] text-[#155eef]" : "text-[#344a69]")}>
                            {pkg.contact_sales ? "ตามสัญญา" : money(pkg.monthly_price)}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border-b border-[#e6edf5] px-4 py-3 font-bold text-[#657791]">ราคา / ปี</td>
                        {packages.map((pkg) => (
                          <td key={pkg.id} className={"border-b border-[#e6edf5] px-4 py-3 text-center font-bold " + (pkg.code === "growth" ? "bg-[#f5faff] text-[#155eef]" : "text-[#344a69]")}>
                            {pkg.contact_sales ? "ตามสัญญา" : pkg.yearly_price ? money(pkg.yearly_price) : "—"}
                          </td>
                        ))}
                      </tr>
                      {compareRows.map((row) => (
                        <tr key={row.label}>
                          <td className="border-b border-[#e6edf5] px-4 py-3 font-semibold text-[#657791]">
                            <span className="flex items-center gap-2">
                              <FeatureIcon name={row.icon} className="h-4 w-4 text-[#155eef]" />
                              {row.label}
                            </span>
                          </td>
                          {packages.map((pkg) => (
                            <td
                              key={pkg.id}
                              className={
                                "border-b border-[#e6edf5] px-4 py-3 text-center font-semibold " +
                                (pkg.code === "growth" ? "bg-[#f5faff] text-[#155eef]" : "text-[#304766]")
                              }
                            >
                              {row.value(pkg)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </section>

      {selected ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071326]/65 p-4 backdrop-blur-[3px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCheckout();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="ซื้อแพ็กเกจ CpiPOS"
            className="max-h-[92vh] w-full max-w-[672px] overflow-auto rounded-[24px] border border-white/60 bg-white shadow-[0_30px_90px_rgba(2,12,27,0.28)]"
          >
            <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#e3e8f0] bg-white/98 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.19em] text-[#155eef]">CPIPOS SECURE CHECKOUT</p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#08182f]">{selected.name}</h2>
              </div>
              <button
                type="button"
                onClick={closeCheckout}
                disabled={busy}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dbe2ec] text-[#6d7b90] transition hover:bg-[#f5f7fa] disabled:opacity-40"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="p-6">
              {step === "verify" ? (
                <div>
                  <div className="rounded-[18px] border border-[#cfe0ff] bg-[#edf5ff] p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dbeaff] text-[#155eef]">
                        <LineIcon name="lock" className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-black text-[#15233b]">ยืนยันสิทธิ์ Owner / Manager</p>
                        <p className="mt-1 text-xs leading-5 text-[#155eef]">
                          ไม่ต้องล็อกอินเข้า POS ใช้รหัสร้านและ PIN ของเจ้าของร้านหรือผู้จัดการเท่านั้น
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setInterval("monthly")}
                      className={
                        "relative rounded-[16px] border p-4 text-left transition " +
                        (interval === "monthly"
                          ? "border-[#155eef] bg-[#f1f6ff] shadow-[0_0_0_2px_rgba(21,94,239,0.12)]"
                          : "border-[#dce3ed] bg-white hover:border-[#b9c9df]")
                      }
                    >
                      <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#8fa1b8]">
                        {interval === "monthly" ? <span className="h-2.5 w-2.5 rounded-full bg-[#155eef]" /> : null}
                      </span>
                      <p className="text-xs font-bold text-[#63728a]">รายเดือน</p>
                      <p className="mt-1 text-2xl font-black tracking-tight text-[#08182f]">{money(selected.monthly_price)}</p>
                    </button>

                    <button
                      type="button"
                      disabled={!selected.yearly_price}
                      onClick={() => setInterval("yearly")}
                      className={
                        "relative rounded-[16px] border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-40 " +
                        (interval === "yearly"
                          ? "border-[#155eef] bg-[#f1f6ff] shadow-[0_0_0_2px_rgba(21,94,239,0.12)]"
                          : "border-[#dce3ed] bg-white hover:border-[#b9c9df]")
                      }
                    >
                      <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#8fa1b8]">
                        {interval === "yearly" ? <span className="h-2.5 w-2.5 rounded-full bg-[#155eef]" /> : null}
                      </span>
                      <p className="text-xs font-bold text-[#63728a]">รายปี</p>
                      <p className="mt-1 text-2xl font-black tracking-tight text-[#08182f]">
                        {selected.yearly_price ? money(selected.yearly_price) : "ยังไม่เปิด"}
                      </p>
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4">
                    <label className="grid gap-2 text-sm font-bold text-[#314159]">
                      รหัสร้าน
                      <div className="flex items-center rounded-[15px] border border-[#cbd5e3] bg-white px-4 transition focus-within:border-[#155eef] focus-within:ring-4 focus-within:ring-[#dce9ff]">
                        <LineIcon name="store" className="h-5 w-5 shrink-0 text-[#71839c]" />
                        <input
                          value={storeCode}
                          onChange={(e) => setStoreCode(e.target.value)}
                          maxLength={32}
                          autoComplete="off"
                          placeholder="เช่น 123456"
                          className="w-full bg-transparent px-3 py-3.5 text-base font-semibold text-[#14233b] outline-none placeholder:text-[#9ba8ba]"
                        />
                      </div>
                    </label>

                    <label className="grid gap-2 text-sm font-bold text-[#314159]">
                      PIN Owner / Manager
                      <div className="flex items-center rounded-[15px] border border-[#cbd5e3] bg-white px-4 transition focus-within:border-[#155eef] focus-within:ring-4 focus-within:ring-[#dce9ff]">
                        <LineIcon name="key" className="h-5 w-5 shrink-0 text-[#71839c]" />
                        <input
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          maxLength={32}
                          type="password"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          placeholder="••••"
                          className="w-full bg-transparent px-3 py-3.5 text-base font-semibold tracking-[0.35em] text-[#14233b] outline-none placeholder:text-[#9ba8ba]"
                        />
                      </div>
                    </label>
                  </div>

                  {dialogError ? (
                    <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                      {dialogError}
                    </p>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => void verifyStore()}
                    disabled={busy}
                    className="mt-5 flex w-full items-center justify-center gap-3 rounded-[14px] bg-[#155eef] px-5 py-3.5 text-sm font-black text-white shadow-[0_10px_24px_rgba(21,94,239,0.24)] transition hover:bg-[#0f4fd1] disabled:opacity-50"
                  >
                    {busy ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
                    ) : (
                      <LineIcon name="lock" className="h-5 w-5" />
                    )}
                    {busy ? "กำลังยืนยัน..." : "ยืนยันและไปหน้าชำระเงิน"}
                    {!busy ? <LineIcon name="arrow" className="h-5 w-5" /> : null}
                  </button>
                </div>
              ) : step === "pay" && session ? (
                <div>
                  <div className="rounded-[18px] border border-[#c9eadf] bg-[#eefaf6] p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 text-[#0a8f66]" />
                      <div>
                        <p className="font-black text-[#123c31]">ยืนยันร้านสำเร็จ · {session.store.name}</p>
                        <p className="mt-1 text-xs text-[#4a7168]">
                          รหัสร้าน {session.store.code} · {session.package.name} · {session.package.billing_interval === "yearly" ? "รายปี" : "รายเดือน"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[20px] border border-[#d3def0] bg-[#f5f8fc] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#155eef]">บัญชีรับชำระของบริษัท</p>
                        <p className="mt-3 text-sm font-bold text-[#526176]">{session.issuer.bank_name || "บัญชีบริษัท"}</p>
                        <p className="mt-1 text-base font-black text-[#08182f]">{session.issuer.account_name}</p>
                        <p className="mt-2 text-2xl font-black tracking-wide text-[#155eef]">{session.issuer.account_number || session.issuer.promptpay_id}</p>
                      </div>
                      <div className="rounded-[16px] border border-[#e1e7ef] bg-white px-5 py-4 text-right shadow-sm">
                        <p className="text-xs font-bold text-[#6d7b90]">ยอดตามแพ็กเกจ</p>
                        <p className="mt-1 text-3xl font-black tracking-tight text-[#155eef]">{money(session.package.amount)}</p>
                      </div>
                    </div>
                  </div>

                  <label className="mt-5 block rounded-[20px] border-2 border-dashed border-[#9dbbff] bg-[#f6f9ff] p-6 text-center transition hover:bg-[#eef4ff]">
                    <LineIcon name="upload" className="mx-auto h-8 w-8 text-[#155eef]" />
                    <span className="mt-3 block text-sm font-black text-[#14233b]">{slip ? slip.name : "แนบรูปสลิปการโอนเงิน"}</span>
                    <span className="mt-1 block text-xs text-[#7b889b]">JPG, PNG, WebP · สูงสุด 4 MB</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      onChange={(event) => setSlip(event.target.files?.[0] ?? null)}
                    />
                  </label>

                  <label className="mt-4 grid gap-2 text-sm font-bold text-[#314159]">
                    หมายเหตุ (ถ้ามี)
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      maxLength={500}
                      placeholder="เช่น ชื่อสาขา หรือข้อมูลเพิ่มเติมสำหรับฝ่าย IT"
                      className="min-h-24 rounded-[15px] border border-[#cbd5e3] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#155eef] focus:ring-4 focus:ring-[#dce9ff]"
                    />
                  </label>

                  {dialogError ? (
                    <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                      {dialogError}
                    </p>
                  ) : null}

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("verify");
                        setSession(null);
                        setSlip(null);
                        setDialogError("");
                      }}
                      disabled={busy}
                      className="rounded-[14px] border border-[#cbd5e3] px-5 py-3.5 text-sm font-black text-[#40516a] transition hover:bg-[#f6f8fb] disabled:opacity-50"
                    >
                      ย้อนกลับ
                    </button>
                    <button
                      type="button"
                      onClick={() => void submitPayment()}
                      disabled={busy || !slip}
                      className="flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-[#155eef] px-5 py-3.5 text-sm font-black text-white shadow-[0_10px_24px_rgba(21,94,239,0.22)] transition hover:bg-[#0f4fd1] disabled:opacity-50"
                    >
                      {busy ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
                      ) : (
                        <LineIcon name="upload" className="h-5 w-5" />
                      )}
                      {busy ? "กำลังส่ง..." : "ส่งหลักฐานให้ฝ่าย IT ตรวจสอบ"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f7f1] text-[#0a8f66]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-[#08182f]">ส่งคำขอสำเร็จ</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#66758c]">
                    ระบบส่งแพ็กเกจและสลิปไปยังฝ่าย IT แล้ว เมื่อเจ้าหน้าที่ตรวจสอบเงินเข้าบัญชีบริษัทและอนุมัติ
                    ระบบจะอัปเดตแพ็กเกจของร้านตามขั้นตอนเดิม
                  </p>
                  <div className="mx-auto mt-5 max-w-md rounded-[16px] border border-[#dce3ed] bg-[#f7f9fc] p-4 text-sm">
                    <span className="text-[#7b889b]">เลขที่คำขอ</span>
                    <strong className="mt-1 block break-all text-[#17253b]">{requestId}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={closeCheckout}
                    className="mt-6 rounded-full bg-[#08182f] px-8 py-3 text-sm font-black text-white transition hover:bg-[#155eef]"
                  >
                    ปิด
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
