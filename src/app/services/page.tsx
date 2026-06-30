import { Briefcase, Globe2, MessageSquare, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceLinks from "@/components/ServiceLinks";
import StructuredData from "@/components/StructuredData";
import type { Lang } from "@/lib/i18n";
import { getCopy } from "@/lib/i18n";
import { getRequestedLocale } from "@/lib/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cutting-point-tech.vercel.app";

const content = {
  th: {
    meta: {
      title: "บริการของเรา | CUTTING POINT TECH",
      description:
        "บริการหลักของ CUTTING POINT TECH ครอบคลุมรับทำเว็บไซต์ ระบบหอพัก/รีสอร์ท และจดทะเบียนบริษัทครบวงจร พร้อมทีมงานดูแลต่อเนื่องและการทำ SEO/การตลาด.",
    },
    hero: {
      title: "บริการหลักของ CUTTING POINT TECH",
      subtitle:
        "เลือกบริการที่ตอบโจทย์ธุรกิจของคุณ พร้อมรายละเอียดครบถ้วนและช่องทางติดต่อทีมงาน",
    },
    crumbs: [
      { label: "หน้าแรก", href: "/" },
      { label: "บริการ" },
    ],
    paths: {
      eyebrow: "บริการของเรา",
      title: "เส้นทางบริการเฉพาะทางสำหรับธุรกิจของคุณ",
      subtitle:
        "เลือกบริการที่ตรงกับเป้าหมายของคุณ พร้อมลิงก์ไปยังรายละเอียดแบบเต็มและช่องทางติดต่อ",
      ctaQuote: "ขอใบเสนอราคา",
      ctaSeoAi: "ดู SEO AI",
    },
    core: {
      ctaTalk: "คุยกับผู้เชี่ยวชาญ",
      ctaArticles: "อ่านบทความ SEO/การตลาด",
      ctaSeoAi: "ดูหน้า SEO AI",
      backHome: "กลับหน้าแรก",
    },
  },
  en: {
    meta: {
      title: "Our Services | CUTTING POINT TECH",
      description:
        "Explore CUTTING POINT TECH services: professional website development, dormitory/resort systems, and company registration, plus ongoing support and SEO/marketing.",
    },
    hero: {
      title: "Core services by CUTTING POINT TECH",
      subtitle: "Choose the service that best fits your business goals.",
    },
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services" },
    ],
    paths: {
      eyebrow: "Our services",
      title: "Specialized service paths for your business",
      subtitle: "Explore each service with full details and direct contact paths.",
      ctaQuote: "Request a quote",
      ctaSeoAi: "See SEO AI",
    },
    core: {
      ctaTalk: "Talk to specialists",
      ctaArticles: "Read SEO/marketing articles",
      ctaSeoAi: "Visit SEO AI page",
      backHome: "Back to home",
    },
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const localeKey = locale === "lo" ? "en" : locale;
  const data = content[localeKey].meta;
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/services`;

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: data.title },
    description: data.description,
    alternates: { canonical: "/services" },
    openGraph: {
      title: data.title,
      description: data.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}

export default async function ServicesIndexPage() {
  const locale = await getRequestedLocale();
  const localeKey = locale === "lo" ? "en" : locale;
  const data = content[localeKey];
  const copy = getCopy(locale as Lang);
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const serviceIcons = [Briefcase, Globe2, Star, MessageSquare];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: data.crumbs[0].label, item: `${baseUrl}/` },
          { name: data.crumbs[1].label, item: `${baseUrl}/services` },
        ]}
        service={{
          name: localeKey === "th" ? "บริการของเรา" : "Our Services",
          description: data.meta.description,
          serviceType: "Digital services",
          url: `${baseUrl}/services`,
        }}
      />

      <section className="border-b border-slate-200 bg-mist py-10">
        <div className="mx-auto w-full max-w-6xl space-y-4 px-6">
          <Breadcrumbs items={data.crumbs} />
          <h1 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {data.hero.title}
          </h1>
          <p className="max-w-2xl text-base text-slate-600">{data.hero.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white"
            >
              {localeKey === "th" ? "ขอใบเสนอราคา" : "Request a quote"}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700"
            >
              {localeKey === "th" ? "ปรึกษาฟรี" : "Free consultation"}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600">{data.paths.eyebrow}</p>
              <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                {data.paths.title}
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">{data.paths.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white"
              >
                {data.paths.ctaQuote}
              </Link>
              <Link
                href="/seo-ai"
                className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700"
              >
                {data.paths.ctaSeoAi}
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <ServiceLinks locale={locale} />
          </div>
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600">{copy.nav.services}</p>
              <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                {copy.services.title}
              </h2>
              <p className="mt-3 max-w-xl text-slate-600">{copy.services.subtitle}</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
              {data.core.ctaTalk}
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {copy.services.items.map((item, index) => {
              const Icon = serviceIcons[index % serviceIcons.length] ?? Briefcase;
              return (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <Link href="/articles" className="font-semibold text-blue-700">
              {data.core.ctaArticles}
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/seo-ai" className="font-semibold text-blue-700">
              {data.core.ctaSeoAi}
            </Link>
          </div>

          <div className="mt-10">
            <Link href="/" className="text-sm font-semibold text-blue-700">
              {data.core.backHome}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


