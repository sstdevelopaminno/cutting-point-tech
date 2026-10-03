"use client";

import {
  Box,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Crown,
  Database,
  Loader2,
  Monitor,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Store,
  Upload,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

function packageTone(code: string) {
  if (code === "growth") return "border-emerald-300 bg-gradient-to-b from-emerald-50 to-white ring-2 ring-emerald-100";
  if (code === "business") return "border-blue-300 bg-gradient-to-b from-blue-50 to-white ring-2 ring-blue-100";
  return "border-slate-200 bg-white";
}

function PackageIcon({ code }: { code: string }) {
  if (code === "starter") return <Store className="h-6 w-6" />;
  if (code === "growth") return <Sparkles className="h-6 w-6" />;
  if (code === "business") return <Building2 className="h-6 w-6" />;
  return <Crown className="h-6 w-6" />;
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

  const packageMap = useMemo(() => new Map(packages.map((item) => [item.code, item])), [packages]);

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
    { label: "สาขา", icon: Store, value: (p: PackageRow) => number(p.max_branches) },
    { label: "เครื่อง POS", icon: Monitor, value: (p: PackageRow) => number(p.max_devices) },
    { label: "ผู้ใช้งาน", icon: Users, value: (p: PackageRow) => number(p.max_users) },
    { label: "สินค้า", icon: Box, value: (p: PackageRow) => number(p.max_products) },
    { label: "บิล / เดือน", icon: ReceiptText, value: (p: PackageRow) => number(p.monthly_bill_limit) },
    { label: "Storage", icon: Database, value: (p: PackageRow) => p.storage_limit_gb == null ? "ตามสัญญา" : p.storage_limit_gb + " GB" },
    { label: "เก็บข้อมูลยอดขาย", icon: Clock3, value: (p: PackageRow) => number(p.retention_months, " เดือน") },
    { label: "โหมดการขาย", icon: Sparkles, value: (p: PackageRow) => p.sales_mode_limit == null ? "กำหนดตามสัญญา" : "สูงสุด " + p.sales_mode_limit + " โหมด" },
    { label: "CpiPOS AI", icon: Crown, value: (p: PackageRow) => p.contact_sales ? "กำหนดตามสัญญา" : p.ai_included ? "รวม " + number(p.ai_monthly_requests, " ครั้ง/เดือน") : "ไม่รวม" },
  ];

  return (
    <>
      <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_#eef5ff,_#ffffff_48%,_#f4f0ff)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-700 shadow-sm">
              <Crown className="h-4 w-4" />
              CpiPOS PACKAGE
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              เลือกแพ็กเกจ CpiPOS ที่เหมาะกับร้านคุณ
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              เปรียบเทียบราคาและสิทธิ์จากระบบ CpiPOS โดยตรง เลือกแพ็กเกจ ยืนยันรหัสร้านด้วย PIN ของ Owner/Manager แล้วชำระได้จากหน้านี้โดยไม่ต้องล็อกอินเข้า POS
            </p>
          </div>

          {catalogError ? (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-700">
              {catalogError}
            </div>
          ) : null}

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-[440px] animate-pulse rounded-3xl border border-slate-200 bg-white/80" />
                ))
              : packages.map((pkg) => (
                  <article key={pkg.id} className={"relative flex min-h-[440px] flex-col rounded-3xl border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] " + packageTone(pkg.code)}>
                    {pkg.code === "growth" ? (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-black text-white shadow-lg">
                        แนะนำ
                      </span>
                    ) : pkg.code === "business" ? (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-black text-white shadow-lg">
                        สำหรับธุรกิจ
                      </span>
                    ) : null}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                      <PackageIcon code={pkg.code} />
                    </div>
                    <h2 className="mt-5 text-2xl font-black text-slate-950">{pkg.name}</h2>
                    <div className="mt-3">
                      <div className="text-3xl font-black text-blue-700">
                        {pkg.contact_sales ? "ตามสัญญา" : money(pkg.monthly_price)}
                        {!pkg.contact_sales ? <span className="text-sm font-bold text-slate-500">/เดือน</span> : null}
                      </div>
                      {pkg.yearly_price ? (
                        <p className="mt-1 text-sm font-semibold text-slate-500">{money(pkg.yearly_price)}/ปี</p>
                      ) : null}
                    </div>

                    <div className="mt-6 space-y-2 text-sm text-slate-700">
                      {compareRows.slice(0, 6).map((row) => (
                        <div key={row.label} className="flex items-center justify-between gap-3 border-b border-slate-100 py-2">
                          <span className="flex items-center gap-2 text-slate-500"><row.icon className="h-4 w-4" />{row.label}</span>
                          <strong className="text-right text-slate-800">{row.value(pkg)}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6">
                      {pkg.contact_sales ? (
                        <Link href="/contact" className="flex w-full items-center justify-center rounded-2xl border-2 border-violet-300 bg-white px-4 py-3 text-sm font-black text-violet-700 transition hover:bg-violet-50">
                          ขอใบเสนอราคา
                        </Link>
                      ) : (
                        <button type="button" onClick={() => openCheckout(pkg)}
                          className={"w-full rounded-2xl px-4 py-3 text-sm font-black text-white shadow-lg transition " +
                            (pkg.code === "growth" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-blue-600 hover:bg-blue-700")}>
                          เลือกแพ็กเกจ
                        </button>
                      )}
                    </div>
                  </article>
                ))}
          </div>
        </div>
      </section>

      {!loading && packages.length ? (
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-950">เปรียบเทียบแพ็กเกจแบบละเอียด</h2>
              <p className="mt-2 text-sm text-slate-500">ข้อมูลราคาและสิทธิ์ดึงจาก CpiPOS-001 เพื่อให้ตรงกับแพ็กเกจที่ใช้งานจริง</p>
            </div>
            <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
              <table className="min-w-[920px] w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left font-black text-slate-600">สิทธิ์ / แพ็กเกจ</th>
                    {packages.map((pkg) => (
                      <th key={pkg.id} className={"px-5 py-4 text-center text-lg font-black " + (pkg.code === "business" ? "bg-blue-50 text-blue-950" : "text-slate-950")}>
                        {pkg.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {compareRows.map((row) => (
                    <tr key={row.label}>
                      <td className="px-5 py-4 font-bold text-slate-600">
                        <span className="flex items-center gap-2"><row.icon className="h-4 w-4 text-blue-600" />{row.label}</span>
                      </td>
                      {packages.map((pkg) => (
                        <td key={pkg.id} className={"px-5 py-4 text-center font-semibold text-slate-700 " + (pkg.code === "business" ? "bg-blue-50/40" : "")}>
                          {row.value(pkg)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-5 py-4 font-bold text-slate-600">เลือกแพ็กเกจ</td>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className={"px-5 py-4 text-center " + (pkg.code === "business" ? "bg-blue-50/40" : "")}>
                        {pkg.contact_sales ? (
                          <Link href="/contact" className="inline-flex rounded-xl border border-violet-300 px-4 py-2 text-xs font-black text-violet-700">ขอใบเสนอราคา</Link>
                        ) : (
                          <button type="button" onClick={() => openCheckout(pkg)} className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white">เลือกแพ็กเกจ</button>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      {selected ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeCheckout();
        }}>
          <section role="dialog" aria-modal="true" aria-label="ซื้อแพ็กเกจ CpiPOS"
            className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-3xl border border-white/30 bg-white shadow-2xl">
            <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">CpiPOS Secure Checkout</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">{selected.name}</h2>
              </div>
              <button type="button" onClick={closeCheckout} disabled={busy}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="p-5 sm:p-6">
              {step === "verify" ? (
                <div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"><ShieldCheck className="h-5 w-5" /></div>
                      <div>
                        <p className="font-black text-blue-950">ยืนยันสิทธิ์ Owner / Manager</p>
                        <p className="text-xs leading-5 text-blue-700">ไม่ต้องล็อกอินเข้า POS ใช้รหัสร้านและ PIN ของเจ้าของร้านหรือผู้จัดการเท่านั้น</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <button type="button" onClick={() => setInterval("monthly")}
                      className={"rounded-2xl border p-4 text-left " + (interval === "monthly" ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100" : "border-slate-200")}>
                      <p className="text-xs font-bold text-slate-500">รายเดือน</p>
                      <p className="mt-1 text-xl font-black text-slate-950">{money(selected.monthly_price)}</p>
                    </button>
                    <button type="button" disabled={!selected.yearly_price} onClick={() => setInterval("yearly")}
                      className={"rounded-2xl border p-4 text-left disabled:cursor-not-allowed disabled:opacity-40 " + (interval === "yearly" ? "border-violet-500 bg-violet-50 ring-2 ring-violet-100" : "border-slate-200")}>
                      <p className="text-xs font-bold text-slate-500">รายปี</p>
                      <p className="mt-1 text-xl font-black text-slate-950">{selected.yearly_price ? money(selected.yearly_price) : "ยังไม่เปิด"}</p>
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4">
                    <label className="grid gap-1.5 text-sm font-bold text-slate-700">
                      รหัสร้าน
                      <input value={storeCode} onChange={(e) => setStoreCode(e.target.value)} maxLength={32}
                        autoComplete="off" placeholder="เช่น 123456"
                        className="rounded-2xl border border-slate-300 px-4 py-3 text-base font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                    </label>
                    <label className="grid gap-1.5 text-sm font-bold text-slate-700">
                      PIN Owner / Manager
                      <input value={pin} onChange={(e) => setPin(e.target.value)} maxLength={32}
                        type="password" inputMode="numeric" autoComplete="one-time-code" placeholder="••••"
                        className="rounded-2xl border border-slate-300 px-4 py-3 text-base font-semibold tracking-[0.35em] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                    </label>
                  </div>

                  {dialogError ? <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{dialogError}</p> : null}
                  <button type="button" onClick={() => void verifyStore()} disabled={busy}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white shadow-lg hover:bg-blue-700 disabled:opacity-50">
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                    {busy ? "กำลังยืนยัน..." : "ยืนยันและไปหน้าชำระเงิน"}
                  </button>
                </div>
              ) : step === "pay" && session ? (
                <div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 text-emerald-600" />
                      <div>
                        <p className="font-black text-emerald-950">ยืนยันร้านสำเร็จ · {session.store.name}</p>
                        <p className="mt-1 text-xs text-emerald-700">รหัสร้าน {session.store.code} · {session.package.name} · {session.package.billing_interval === "yearly" ? "รายปี" : "รายเดือน"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-blue-700">บัญชีรับชำระของบริษัท</p>
                        <p className="mt-2 text-sm font-bold text-slate-700">{session.issuer.bank_name || "บัญชีบริษัท"}</p>
                        <p className="mt-1 text-base font-black text-slate-950">{session.issuer.account_name}</p>
                        <p className="mt-2 text-2xl font-black tracking-wide text-blue-700">{session.issuer.account_number || session.issuer.promptpay_id}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-5 py-4 text-right shadow-sm">
                        <p className="text-xs font-bold text-slate-500">ยอดตามแพ็กเกจ</p>
                        <p className="mt-1 text-3xl font-black text-blue-700">{money(session.package.amount)}</p>
                      </div>
                    </div>
                  </div>

                  <label className="mt-5 block rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50/60 p-6 text-center transition hover:bg-blue-50">
                    <Upload className="mx-auto h-9 w-9 text-blue-600" />
                    <span className="mt-3 block text-sm font-black text-slate-800">{slip ? slip.name : "แนบรูปสลิปการโอนเงิน"}</span>
                    <span className="mt-1 block text-xs text-slate-500">JPG, PNG, WebP · สูงสุด 4 MB</span>
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only"
                      onChange={(event) => setSlip(event.target.files?.[0] ?? null)} />
                  </label>

                  <label className="mt-4 grid gap-1.5 text-sm font-bold text-slate-700">
                    หมายเหตุ (ถ้ามี)
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={500}
                      placeholder="เช่น ชื่อสาขา หรือข้อมูลเพิ่มเติมสำหรับฝ่าย IT"
                      className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                  </label>

                  {dialogError ? <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{dialogError}</p> : null}
                  <div className="mt-5 flex gap-3">
                    <button type="button" onClick={() => { setStep("verify"); setSession(null); setSlip(null); setDialogError(""); }}
                      disabled={busy} className="rounded-2xl border border-slate-300 px-5 py-3.5 text-sm font-black text-slate-700 disabled:opacity-50">
                      ย้อนกลับ
                    </button>
                    <button type="button" onClick={() => void submitPayment()} disabled={busy || !slip}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-black text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50">
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      {busy ? "กำลังส่ง..." : "ส่งหลักฐานให้ฝ่าย IT ตรวจสอบ"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-slate-950">ส่งคำขอสำเร็จ</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                    ระบบส่งแพ็กเกจและสลิปไปยังฝ่าย IT แล้ว เมื่อเจ้าหน้าที่ตรวจสอบเงินเข้าบัญชีบริษัทและอนุมัติ ระบบจะอัปเดตแพ็กเกจของร้านตามขั้นตอนเดิม
                  </p>
                  <div className="mx-auto mt-5 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                    <span className="text-slate-500">เลขที่คำขอ</span>
                    <strong className="mt-1 block break-all text-slate-900">{requestId}</strong>
                  </div>
                  <button type="button" onClick={closeCheckout}
                    className="mt-6 rounded-2xl bg-slate-950 px-8 py-3 text-sm font-black text-white">
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
