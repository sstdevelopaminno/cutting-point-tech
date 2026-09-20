import type { Metadata } from "next";
import Link from "next/link";
import { getRequestedLocale } from "@/lib/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointinnovation.vercel.app";

const copy = {
  th: {
    title: "ดาวน์โหลด | CUTTING POINT INNOVATION",
    description: "ศูนย์ดาวน์โหลดเอกสารและไฟล์จาก CUTTING POINT INNOVATION",
    eyebrow: "DOWNLOADS",
    heading: "ศูนย์ดาวน์โหลด",
    body: "พื้นที่นี้กำลังเตรียมไฟล์เอกสาร แคตตาล็อก และทรัพยากรสำหรับลูกค้า",
    back: "กลับหน้าแรก",
  },
  en: {
    title: "Downloads | CUTTING POINT INNOVATION",
    description: "Download center for documents and resources from CUTTING POINT INNOVATION.",
    eyebrow: "DOWNLOADS",
    heading: "Download center",
    body: "Documents, catalogs, and customer resources will be added here soon.",
    back: "Back to home",
  },
  lo: {
    title: "ດາວໂຫຼດ | CUTTING POINT INNOVATION",
    description: "ສູນດາວໂຫຼດເອກະສານ ແລະ ຊັບພະຍາກອນຈາກ CUTTING POINT INNOVATION.",
    eyebrow: "DOWNLOADS",
    heading: "ສູນດາວໂຫຼດ",
    body: "ເອກະສານ, ແຄັດຕາລັອກ ແລະ ຊັບພະຍາກອນສຳລັບລູກຄ້າຈະຖືກເພີ່ມໃນພື້ນທີ່ນີ້ໄວໆນີ້.",
    back: "ກັບໜ້າຫຼັກ",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const item = copy[locale];
  const baseUrl = SITE_URL.replace(/\/+$/, "");

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: item.title },
    description: item.description,
    alternates: { canonical: "/downloads" },
    openGraph: {
      title: item.title,
      description: item.description,
      url: `${baseUrl}/downloads`,
      type: "website",
    },
  };
}

export default async function DownloadsPage() {
  const locale = await getRequestedLocale();
  const item = copy[locale];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-[72vh] w-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">
            {item.eyebrow}
          </p>
          <h1 className="mt-5 font-[var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl">
            {item.heading}
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            {item.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-sky-300/40 bg-sky-300/10 text-sky-200">
              <span className="text-xs font-bold" aria-hidden="true">DOC</span>
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >

              {item.back}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}