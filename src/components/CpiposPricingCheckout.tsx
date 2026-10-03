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

  const compareRows = [
    { label: "สาขา", value: (p: PackageRow) => displayForCustom(p, number(p.max_branches)) },
    { label: "เครื่อง POS", value: (p: PackageRow) => displayForCustom(p, number(p.max_devices)) },
    { label: "ผู้ใช้งาน", value: (p: PackageRow) => displayForCustom(p, number(p.max_users)) },
    { label: "สินค้า", value: (p: PackageRow) => displayForCustom(p, number(p.max_products)) },
    { label: "บิล / เดือน", value: (p: PackageRow) => displayForCustom(p, number(p.monthly_bill_limit)) },
    { label: "Storage", value: (p: PackageRow) => displayForCustom(p, p.storage_limit_gb == null ? "ตามสัญญา" : p.storage_limit_gb + " GB") },
    { label: "เก็บข้อมูลยอดขาย", value: (p: PackageRow) => displayForCustom(p, number(p.retention_months, " เดือน")) },
    { label: "โหมดการขาย", value: (p: PackageRow) => displayForCustom(p, p.sales_mode_limit == null ? "กำหนดตามสัญญา" : "สูงสุด " + p.sales_mode_limit + " โหมด") },
    { label: "CpiPOS AI", value: (p: PackageRow) => p.contact_sales ? "กำหนดตามสัญญา" : p.ai_included ? "รวม " + number(p.ai_monthly_requests, " ครั้ง/เดือน") : "ไม่รวม" },
  ];

  return (
    <>
      <section className="bg-[#f6f8fc]">
        <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-14 sm:px-8 lg:pb-20 lg:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-black tracking-[-0.025em] text-[#08182f] sm:text-5xl">
              เลือกแพ็กเกจ CpiPOS ที่เหมาะกับร้านคุณ
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5f6f87]">
              ราคาและสิทธิ์อ้างอิงจากระบบ CpiPOS โดยตรง เลือกแพ็กเกจและชำระได้จากเว็บไซต์
              โดยยืนยันรหัสร้านและ PIN ของ Owner/Manager
            </p>
          </div>

          {catalogError ? (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-700">
              {catalogError}
            </div>
          ) : null}

          <div className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-[510px] animate-pulse rounded-[26px] border border-[#dce3ee] bg-white" />
                ))
              : packages.map((pkg) => {
                  const featured = pkg.code === "growth";
                  const business = pkg.code === "business";
                  return (
                    <article
                      key={pkg.id}
                      className={
                        "relative flex min-h-[510px] flex-col rounded-[26px] border p-6 transition " +
                        (featured
                          ? "border-[#0c4edb] bg-[#071a33] text-white shadow-[0_24px_70px_rgba(7,26,51,0.2)]"
                          : business
                            ? "border-[#b9d0ff] bg-[#f0f5ff] text-[#08182f] shadow-[0_18px_45px_rgba(13,74,180,0.08)]"
                            : "border-[#dce3ee] bg-white text-[#08182f] shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
                      }
                    >
                      {featured ? (
                        <span className="absolute right-5 top-5 rounded-full bg-white/12 px-3 py-1 text-[11px] font-bold tracking-wide text-white ring-1 ring-white/15">
                          แนะนำ
                        </span>
                      ) : business ? (
                        <span className="absolute right-5 top-5 rounded-full bg-[#155eef] px-3 py-1 text-[11px] font-bold text-white">
                          สำหรับธุรกิจ
                        </span>
                      ) : null}

                      <div className="min-h-[124px]">
                        <p className={"text-[11px] font-bold uppercase tracking-[0.16em] " + (featured ? "text-[#73a6ff]" : "text-[#6e7e96]")}>
                          {pkg.code === "custom" ? "Tailored plan" : "CpiPOS plan"}
                        </p>
                        <h2 className="mt-3 text-2xl font-black tracking-tight">{pkg.name}</h2>
                        <p className={"mt-2 min-h-[44px] text-sm leading-6 " + (featured ? "text-[#b9c7db]" : "text-[#69788f]")}>
                          {packageDescription(pkg.code)}
                        </p>
                      </div>

                      <div className="mt-4">
                        <div className={"text-4xl font-black tracking-tight " + (featured ? "text-white" : "text-[#08182f]")}>
                          {pkg.contact_sales ? "Custom" : money(pkg.monthly_price)}
                          {!pkg.contact_sales ? <span className={"ml-1 text-sm font-semibold " + (featured ? "text-[#a8b8cf]" : "text-[#6b7890]")}>/ เดือน</span> : null}
                        </div>
                        {pkg.yearly_price ? (
                          <p className={"mt-2 text-sm font-semibold " + (featured ? "text-[#9fb0c9]" : "text-[#6b7890]")}>
                            {money(pkg.yearly_price)} / ปี
                          </p>
                        ) : pkg.contact_sales ? (
                          <p className={"mt-2 text-sm font-semibold " + (featured ? "text-[#9fb0c9]" : "text-[#6b7890]")}>ออกแบบตามสัญญา</p>
                        ) : null}
                      </div>

                      <div className={"my-6 h-px " + (featured ? "bg-white/12" : "bg-[#e4e9f1]")} />

                      <div className="space-y-3 text-sm">
                        {compareRows.slice(0, 6).map((row) => (
                          <div key={row.label} className="flex items-center justify-between gap-3">
                            <span className={featured ? "text-[#b9c7db]" : "text-[#66758c]"}>{row.label}</span>
                            <strong className={featured ? "text-white" : "text-[#17253b]"}>{row.value(pkg)}</strong>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto pt-7">
                        {pkg.contact_sales ? (
                          <Link
                            href="/contact"
                            className="flex w-full items-center justify-center rounded-full border border-[#b7c4d7] bg-white px-4 py-3 text-sm font-black text-[#08182f] transition hover:border-[#155eef] hover:text-[#155eef]"
                          >
                            ขอใบเสนอราคา
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openCheckout(pkg)}
                            className={
                              "w-full rounded-full px-4 py-3 text-sm font-black transition " +
                              (featured
                                ? "bg-white text-[#071a33] hover:bg-[#edf3ff]"
                                : "bg-[#08182f] text-white hover:bg-[#155eef]")
                            }
                          >
                            เลือกแพ็กเกจ
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
          </div>
        </div>
      </section>

      {!loading && packages.length ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-[#08182f]">เปรียบเทียบแพ็กเกจ</h2>
                <p className="mt-3 text-sm leading-6 text-[#6a7890]">
                  ดูสิทธิ์สำคัญของแต่ละแพ็กเกจในตารางเดียว
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-[860px] w-full border-separate border-spacing-0 text-sm">
                  <thead>
                    <tr>
                      <th className="w-[220px] pb-4 text-left text-xs font-bold uppercase tracking-wide text-[#7b8799]">สิทธิ์</th>
                      {packages.map((pkg) => (
                        <th key={pkg.id} className="px-3 pb-4 text-center align-bottom">
                          <p className="text-base font-black text-[#08182f]">{pkg.name}</p>
                          <button
                            type="button"
                            disabled={pkg.contact_sales}
                            onClick={() => openCheckout(pkg)}
                            className={
                              "mt-3 w-full rounded-full px-4 py-2 text-xs font-black transition " +
                              (pkg.code === "growth"
                                ? "bg-[#08182f] text-white"
                                : "bg-[#eef2f7] text-[#17253b] hover:bg-[#e2e8f0]") +
                              (pkg.contact_sales ? " cursor-not-allowed opacity-50" : "")
                            }
                          >
                            {pkg.contact_sales ? "ติดต่อฝ่ายขาย" : "เลือก"}
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-dashed border-[#d8dee8]">
                      <td className="border-t border-dashed border-[#d8dee8] py-4 font-semibold text-[#68768b]">ราคาเริ่มต้น</td>
                      {packages.map((pkg) => (
                        <td key={pkg.id} className="border-t border-dashed border-[#d8dee8] px-3 py-4 text-center font-semibold text-[#17253b]">
                          {pkg.contact_sales ? "Custom" : money(pkg.monthly_price) + " / เดือน"}
                        </td>
                      ))}
                    </tr>
                    {compareRows.map((row) => (
                      <tr key={row.label}>
                        <td className="border-t border-dashed border-[#d8dee8] py-4 font-semibold text-[#68768b]">{row.label}</td>
                        {packages.map((pkg) => (
                          <td key={pkg.id} className="border-t border-dashed border-[#d8dee8] px-3 py-4 text-center font-semibold text-[#17253b]">
                            {row.value(pkg)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : null}

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
