import type { Metadata } from "next";
import Image from "next/image";
import { getRequestedLocale } from "@/lib/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointinnovation.vercel.app";

const copy = {
  th: {
    title: "ดาวน์โหลด CpIPOS | CUTTING POINT INNOVATION",
    description: "ดาวน์โหลดโปรแกรม CpIPOS สำหรับ Windows และ Android จากศูนย์ดาวน์โหลดของบริษัท",
    heading: "ดาวน์โหลด", subtitle: "ไฟล์ติดตั้ง CpIPOS สำหรับ Windows และ Android",
    windowsCaption: "สำหรับ Windows 10/11 (64-bit)",
    androidCaption: "สำหรับอุปกรณ์ Android POS",
    windowsButton: "ดาวน์โหลด Windows",
    androidButton: "ดาวน์โหลด Android",
    noLink: "กำลังจัดเตรียมลิงก์ดาวน์โหลด",
    rc: "เวอร์ชันทดสอบ RC / DEBUG — ไม่ใช่แอป Release สำหรับลูกค้าทั่วไป",
    foot: "ไฟล์ติดตั้งจาก CpIPOS Download Center",
  },
  en: {
    title: "CpIPOS Downloads | CUTTING POINT INNOVATION",
    description: "Download CpIPOS software for Windows and Android from the official center.",
    heading: "Download", subtitle: "CpIPOS installers for Windows and Android",
    windowsCaption: "For Windows 10/11 (64-bit)",
    androidCaption: "For Android POS devices",
    windowsButton: "Download Windows",
    androidButton: "Download Android",
    noLink: "Download link being prepared",
    rc: "RC / DEBUG test build — not a general customer release",
    foot: "CpIPOS Download Center installation files",
  },
  lo: {
    title: "ດາວໂຫຼດ CpIPOS | CUTTING POINT INNOVATION",
    description: "ດາວໂຫຼດໂປຣແກຣມ CpIPOS ສໍາລັບ Windows ແລະ Android.",
    heading: "ດາວໂຫຼດ", subtitle: "ໄຟລ໌ຕິດຕັ້ງ CpIPOS ສໍາລັບ Windows ແລະ Android",
    windowsCaption: "ສໍາລັບ Windows 10/11 (64-bit)",
    androidCaption: "ສໍາລັບ Android POS",
    windowsButton: "ດາວໂຫຼດ Windows",
    androidButton: "ດາວໂຫຼດ Android",
    noLink: "ກໍາລັງກຽມລິ້ງດາວໂຫຼດ",
    rc: "ເວີຊັນທົດລອງ RC / DEBUG — ບໍ່ແມ່ນ Release ສໍາລັບລູກຄ້າທົ່ວໄປ",
    foot: "ໄຟລ໌ຕິດຕັ້ງຈາກ CpIPOS Download Center",
  },
} as const;

type Lang = keyof typeof copy;
function approvedHttpsUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname) && !url.username && !url.password ? url.toString() : null;
  } catch { return null; }
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const item = copy[locale as Lang];
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: item.title },
    description: item.description,
    alternates: { canonical: "/downloads" },
    openGraph: { title: item.title, description: item.description, url: `${baseUrl}/downloads`, type: "website" },
  };
}

export default async function DownloadsPage() {
  const lang = await getRequestedLocale() as Lang;
  const item = copy[lang];
  const windowsUrl = approvedHttpsUrl(process.env.CPIPOS_WINDOWS_DOWNLOAD_URL);
  const androidUrl = approvedHttpsUrl(process.env.CPIPOS_ANDROID_DOWNLOAD_URL);
  const baseButton = "mt-auto inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl px-5 text-sm font-bold transition sm:text-base";
  return (
    <main className="relative isolate min-h-[calc(100dvh-80px)] overflow-hidden bg-[#090e1c] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_8%_10%,rgba(17,120,191,.16),transparent_34%),radial-gradient(ellipse_at_94%_84%,rgba(17,130,115,.12),transparent_29%)]" />
      <section className="mx-auto w-full max-w-6xl px-5 pb-12 pt-6 sm:px-8 sm:pt-9 lg:pt-10">
        <div className="mb-9 flex items-center justify-between gap-4 sm:mb-10">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-icon.png" alt="CpIPOS" width={46} height={46} className="h-11 w-11 object-contain" priority />
            <span className="flex flex-col leading-tight">
              <strong className="text-lg tracking-tight">CpIPOS</strong>
              <span className="text-xs font-semibold text-slate-400">Download Center</span>
            </span>
          </div>
          <span className="hidden text-[10px] font-semibold tracking-[.37em] text-slate-500 sm:block">SIMPLE · STABLE</span>
        </div>
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-11">
          <span aria-hidden="true" className="mx-auto mb-5 block h-px w-20 bg-sky-300" />
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {item.heading} <span className="bg-gradient-to-r from-sky-200 to-cyan-400 bg-clip-text text-transparent">CpIPOS</span>
          </h1>
          <p className="mt-4 text-sm font-semibold text-slate-300 sm:text-lg">{item.subtitle}</p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-2">
          <article id="windows" className="scroll-mt-28 flex min-h-[375px] flex-col rounded-[32px] border border-sky-300/35 bg-gradient-to-br from-sky-900/25 via-[#0c1426] to-[#0a0f1e] p-7 sm:p-8">
            <div className="mb-8 flex items-start justify-between gap-3">
              <span className="grid h-16 w-16 place-items-center rounded-3xl border border-sky-300/30 bg-sky-500/15 text-sky-200"><span aria-hidden="true" className="text-4xl font-bold">⊞</span></span>
              <span className="rounded-full border border-sky-300/30 bg-sky-500/10 px-4 py-2 text-xs font-extrabold text-sky-100">v0.3.3</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Windows Desktop</h2>
            <p className="mt-2 text-sm font-semibold text-slate-300">{item.windowsCaption}</p>
            <p className="mb-6 mt-6 flex min-h-12 items-center gap-3 break-all rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300 sm:text-sm">
              <span aria-hidden="true" className="shrink-0 text-base">▤</span>CpIPOS.Desktop_0.3.3_x64-setup.exe
            </p>
            {windowsUrl ? (
              <a href={windowsUrl} className={`${baseButton} bg-gradient-to-r from-sky-300 to-sky-400 text-slate-950 shadow-lg shadow-sky-900/10 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300`} rel="noopener noreferrer">
                <span aria-hidden="true" className="text-xl">↓</span>{item.windowsButton}
              </a>
            ) : (
              <span aria-disabled="true" className={`${baseButton} cursor-not-allowed border border-sky-300/20 bg-sky-300/10 text-sky-200/75`}>
                <span aria-hidden="true" className="text-lg">ⓘ</span>{item.noLink}
              </span>
            )}
          </article>
          <article id="android" className="scroll-mt-28 flex min-h-[375px] flex-col rounded-[32px] border border-emerald-300/30 bg-gradient-to-br from-emerald-900/20 via-[#0c1721] to-[#0a0f1e] p-7 sm:p-8">
            <div className="mb-8 flex items-start justify-between gap-3">
              <span className="grid h-16 w-16 place-items-center rounded-3xl border border-emerald-300/30 bg-emerald-500/15 text-emerald-200"><span aria-hidden="true" className="text-3xl">▣</span></span>
              <span className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-4 py-2 text-xs font-extrabold text-emerald-100">v1.0.23 · RC</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Android POS</h2>
            <p className="mt-2 text-sm font-semibold text-slate-300">{item.androidCaption}</p>
            <p className="mt-6 flex min-h-12 items-center gap-3 break-all rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300 sm:text-sm">
              <span aria-hidden="true" className="shrink-0 text-base">▤</span>CpIPOS-Android-POS-1.0.23-MDM-RC-DEBUG.apk
            </p>
            <p className="mb-4 mt-3 text-xs leading-5 text-amber-200/90">{item.rc}</p>
            {androidUrl ? (
              <a href={androidUrl} className={`${baseButton} bg-gradient-to-r from-emerald-300 to-emerald-400 text-slate-950 shadow-lg shadow-emerald-900/10 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300`} rel="noopener noreferrer">
                <span aria-hidden="true" className="text-xl">↓</span>{item.androidButton}
              </a>
            ) : (
              <span aria-disabled="true" className={`${baseButton} cursor-not-allowed border border-emerald-300/20 bg-emerald-300/10 text-emerald-200/75`}>
                <span aria-hidden="true" className="text-lg">ⓘ</span>{item.noLink}
              </span>
            )}
          </article>
        </div>
        <p className="mt-12 text-center text-xs font-semibold text-slate-500">© CpIPOS Download Center · {item.foot}</p>
      </section>
    </main>
  );
}
