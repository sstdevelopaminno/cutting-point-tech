import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import StructuredData from "@/components/StructuredData";
import { getRequestedLocale } from "@/lib/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointtech.vercel.app";

const showcaseImage = {
  src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/templates-services.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL3RlbXBsYXRlcy1zZXJ2aWNlcy5wbmciLCJpYXQiOjE3Njk3MDgwODcsImV4cCI6MTgwMTI0NDA4N30.IH0Fv04urunMfZgheF9TydLiVIEvYYtdYaUlIhdMoYg",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const baseUrl = SITE_URL.replace(/\/+$/, "");

  const title =
    locale === "th"
      ? "เทมเพลตร้านค้าออนไลน์ (Ecommerce) | CUTTING POINT TECH"
      : "Ecommerce Website Templates | CUTTING POINT TECH";

  const description =
    locale === "th"
      ? "ตัวอย่างรูปแบบเว็บไซต์ร้านค้าออนไลน์ เพื่อช่วยให้คุณเลือกแนวทางดีไซน์และโครงสร้างที่เหมาะกับสินค้าและแบรนด์ของคุณ"
      : "Modern ecommerce website template direction with a clean, mobile-first structure.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: title },
    description,
    keywords:
      locale === "th"
        ? ["เทมเพลตร้านค้าออนไลน์", "เว็บไซต์ร้านค้าออนไลน์", "Ecommerce", "ออกแบบเว็บไซต์", "รับทำเว็บไซต์"]
        : ["ecommerce website templates", "online store website", "ecommerce design"],
    alternates: { canonical: "/templates/ecommerce" },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/templates/ecommerce`,
      type: "website",
    },
  };
}

export default async function EcommerceTemplatesPage() {
  const locale = await getRequestedLocale();
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/templates/ecommerce`;

  const content =
    locale === "th"
      ? {
          eyebrow: "เทมเพลต",
          title: "เว็บไซต์ร้านค้าออนไลน์ (Ecommerce)",
          subtitle:
            "ตัวอย่างรูปแบบเว็บไซต์ร้านค้าออนไลน์ เพื่อช่วยให้คุณเลือกแนวทางดีไซน์และโครงสร้างที่เหมาะกับสินค้า แบรนด์ และกลุ่มลูกค้าของคุณ",
          bullets: [
            "หน้าแคตตาล็อกสินค้า + หมวดหมู่ชัดเจน",
            "โครงสร้างพร้อมต่อระบบตะกร้า/ชำระเงิน/ขนส่ง",
            "รองรับมือถือ 100% และปรับเพื่อ SEO ได้",
          ],
          ctaPrimary: "ปรึกษาฟรี",
          ctaSecondary: "ขอใบเสนอราคา",
          crumbs: [{ label: "หน้าแรก", href: "/" }, { label: "ร้านค้าออนไลน์" }],
          showcaseTitle: "ตัวอย่างรูปแบบส่วนล่าง (Ecommerce showcase)",
          showcaseDesc:
            "ภาพตัวอย่างการจัดวางส่วนบริการ/โปรโมชัน/จุดเด่น สำหรับเว็บไซต์ร้านค้าออนไลน์ เพื่อใช้อ้างอิงก่อนเริ่มออกแบบจริง",
          alt: "ตัวอย่างรูปแบบเว็บไซต์ร้านค้าออนไลน์",
          bestForTitle: "เหมาะสำหรับ:",
          bestFor: [
            "ร้านค้าออนไลน์ที่ต้องการความน่าเชื่อถือ",
            "สินค้าแบรนด์/ธุรกิจที่ต้องการดีไซน์พรีเมียม",
            "ทีมที่ต้องการต่อยอดระบบหลังบ้านในอนาคต",
          ],
        }
      : {
          eyebrow: "Templates",
          title: "Ecommerce Websites",
          subtitle:
            "A modern ecommerce template direction to help you choose a design and structure that fits your products, brand, and customers.",
          bullets: [
            "Clear product catalog and categories",
            "Ready to integrate cart, payments, and delivery",
            "Mobile-first and SEO-friendly structure",
          ],
          ctaPrimary: "Free consultation",
          ctaSecondary: "Request a quote",
          crumbs: [{ label: "Home", href: "/" }, { label: "Ecommerce" }],
          showcaseTitle: "Lower-section layout example",
          showcaseDesc:
            "A sample layout for service highlights / promotions / key selling points to use as a reference before design starts.",
          alt: "Ecommerce website layout example",
          bestForTitle: "Best for:",
          bestFor: [
            "Stores that need strong credibility",
            "Brands that want a premium look",
            "Teams planning future admin/system upgrades",
          ],
        };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: content.crumbs[0].label, item: `${baseUrl}/` },
          { name: content.crumbs[1].label, item: url },
        ]}
      />

      <section className="border-b border-slate-200 bg-mist py-10">
        <div className="mx-auto w-full max-w-6xl space-y-4 px-6">
          <Breadcrumbs items={content.crumbs} variant="pills" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            {content.eyebrow}
          </p>
          <h1 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {content.title}
          </h1>
          <p className="max-w-3xl text-base text-slate-600">{content.subtitle}</p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            {content.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              {content.ctaPrimary}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="space-y-4">
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                {content.showcaseTitle}
              </h2>
              <p className="text-base text-slate-600">{content.showcaseDesc}</p>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card-soft">
                <p className="text-sm font-semibold text-slate-900">
                  {content.bestForTitle}
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  {content.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_22px_70px_-45px_rgba(15,23,42,0.55)]">
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-4">
                <Image
                  src={showcaseImage.src}
                  alt={content.alt}
                  width={1400}
                  height={900}
                  className="block h-auto w-full rounded-2xl object-contain"
                  unoptimized
                  loading="lazy"
                  fetchPriority="low"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
