import type { Metadata } from "next";
import Image from "next/image";
import { getRequestedLocale } from "@/lib/locale";
import { DownloadPlatformSwitcher } from "@/components/downloads/DownloadPlatformSwitcher";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointinnovation.vercel.app";
const WINDOWS_FINAL_RELEASE = {
  version: "v0.3.4",
  fileName: "CpIPOS.Desktop_0.3.4_x64-setup.exe",
  url: "https://github.com/sstdevelopaminno/cp-ipos-desktop/releases/download/v0.3.4/CpIPOS.Desktop_0.3.4_x64-setup.exe",
} as const;

const ANDROID_FINAL_RELEASE = {
  version: "v1.0.24",
  versionCode: 33,
  fileName: "CpIPOS-Android-POS-1.0.24.apk",
  url: "https://github.com/sstdevelopaminno/CpIPOS/releases/download/android-runtime-modern-1.0.24-print-stability/CpIPOS-Android-POS-1.0.24.apk",
} as const;

const copy = {
  th: {
    title: "ดาวน์โหลด CpIPOS | CUTTING POINT INNOVATION",
    description: "ดาวน์โหลดโปรแกรม CpIPOS สำหรับ Windows และ Android จากศูนย์ดาวน์โหลดของบริษัท",
    heading: "ดาวน์โหลด",
    subtitle: "ไฟล์ติดตั้ง CpIPOS สำหรับ Windows และ Android",
    choose: "เลือกไฟล์ดาวน์โหลด",
    windowsCaption: "สำหรับ Windows 10/11 (64-bit)",
    androidCaption: "สำหรับร้านออนไลน์และอุปกรณ์ Android",
    windowsEyebrow: "สำหรับ Windows",
    androidEyebrow: "ร้านออนไลน์ Android",
    windowsButton: "ดาวน์โหลด Windows",
    androidButton: "ดาวน์โหลด Android",
    noLink: "กำลังจัดเตรียมลิงก์ดาวน์โหลด",
    foot: "ไฟล์ติดตั้งจาก CpIPOS Download Center",
  },
  en: {
    title: "CpIPOS Downloads | CUTTING POINT INNOVATION",
    description: "Download CpIPOS software for Windows and Android from the official center.",
    heading: "Download",
    subtitle: "CpIPOS installers for Windows and Android",
    choose: "Choose download",
    windowsCaption: "For Windows 10/11 (64-bit)",
    androidCaption: "For online stores and Android devices",
    windowsEyebrow: "For Windows",
    androidEyebrow: "Online store Android",
    windowsButton: "Download Windows",
    androidButton: "Download Android",
    noLink: "Download link being prepared",
    foot: "CpIPOS Download Center installation files",
  },
  lo: {
    title: "ດາວໂຫຼດ CpIPOS | CUTTING POINT INNOVATION",
    description: "ດາວໂຫຼດໂປຣແກຣມ CpIPOS ສໍາລັບ Windows ແລະ Android.",
    heading: "ດາວໂຫຼດ",
    subtitle: "ໄຟລ໌ຕິດຕັ້ງ CpIPOS ສໍາລັບ Windows ແລະ Android",
    choose: "ເລືອກດາວໂຫຼດ",
    windowsCaption: "ສໍາລັບ Windows 10/11 (64-bit)",
    androidCaption: "ສໍາລັບຮ້ານອອນລາຍ ແລະ Android",
    windowsEyebrow: "ສໍາລັບ Windows",
    androidEyebrow: "ຮ້ານອອນລາຍ Android",
    windowsButton: "ດາວໂຫຼດ Windows",
    androidButton: "ດາວໂຫຼດ Android",
    noLink: "ກໍາລັງກຽມລິ້ງດາວໂຫຼດ",
    foot: "ໄຟລ໌ຕິດຕັ້ງຈາກ CpIPOS Download Center",
  },
} as const;

type Lang = keyof typeof copy;

function approvedHttpsUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname) && !url.username && !url.password ? url.toString() : null;
  } catch {
    return null;
  }
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
  const lang = (await getRequestedLocale()) as Lang;
  const item = copy[lang];
  const windowsUrl = approvedHttpsUrl(WINDOWS_FINAL_RELEASE.url);
  const androidUrl = approvedHttpsUrl(ANDROID_FINAL_RELEASE.url);
  return (
    <main className="relative isolate min-h-[calc(100dvh-80px)] overflow-hidden bg-[#090e1c] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_8%_10%,rgba(17,120,191,.16),transparent_34%),radial-gradient(ellipse_at_94%_84%,rgba(17,130,115,.12),transparent_29%)]"
      />
      <section className="mx-auto w-full max-w-6xl px-5 pb-12 pt-8 sm:px-8 sm:pt-10 lg:pt-12">
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

        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-9">
          <span aria-hidden="true" className="mx-auto mb-5 block h-px w-20 bg-sky-300" />
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {item.heading} <span className="bg-gradient-to-r from-sky-200 to-cyan-400 bg-clip-text text-transparent">CpIPOS</span>
          </h1>
          <p className="mt-4 text-sm font-semibold text-slate-300 sm:text-lg">{item.subtitle}</p>
        </div>

        <DownloadPlatformSwitcher
          chooseLabel={item.choose}
          windowsLabel={item.windowsEyebrow}
          androidLabel={item.androidEyebrow}
          windows={{
            id: "windows",
            tone: "windows",
            icon: "windows",
            eyebrow: item.windowsEyebrow,
            title: "Windows Desktop",
            description: item.windowsCaption,
            version: WINDOWS_FINAL_RELEASE.version,
            fileName: WINDOWS_FINAL_RELEASE.fileName,
            buttonLabel: item.windowsButton,
            noLinkLabel: item.noLink,
            href: windowsUrl,
          }}
          android={{
            id: "android",
            tone: "android",
            icon: "android",
            eyebrow: item.androidEyebrow,
            title: "Android",
            description: item.androidCaption,
            version: ANDROID_FINAL_RELEASE.version,
            fileName: ANDROID_FINAL_RELEASE.fileName,
            buttonLabel: item.androidButton,
            noLinkLabel: item.noLink,
            href: androidUrl,
          }}
        />

        <p className="mt-12 text-center text-xs font-semibold text-slate-500">© CpIPOS Download Center · {item.foot}</p>
      </section>
    </main>
  );
}