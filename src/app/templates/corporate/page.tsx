import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import StructuredData from "@/components/StructuredData";
import { getRequestedLocale } from "@/lib/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointtech.vercel.app";

const showcase = [
  {
    key: "altamax",
    src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/max.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL21heC5qcGciLCJpYXQiOjE3Njk2MjM3NjMsImV4cCI6MTgwMTE1OTc2M30.dgxvefHeG2LMP_aoE1oQqMFGN1xKIfNRt0OOjcWiEYU",
  },
  {
    key: "voltatech",
    src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/voltatechth%20(1).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL3ZvbHRhdGVjaHRoICgxKS5qcGciLCJpYXQiOjE3Njk2MjM3ODMsImV4cCI6MTgwMTE1OTc4M30.aSqNovr6u16wL8en6tk3AD4s3itFMWzOd_LihnfXFOQ",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const title =
    locale === "th"
      ? "เว็บไซต์องค์กร | CUTTING POINT TECH"
      : "Corporate Website Templates | CUTTING POINT TECH";
  const description =
    locale === "th"
      ? "ตัวอย่างเว็บไซต์องค์กร 2 รูปแบบ เพื่อช่วยเลือกแนวทางดีไซน์และโครงสร้างก่อนเริ่มทำเว็บไซต์จริง"
      : "Two corporate website examples to help you choose a clean, premium direction.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: title },
    description,
    alternates: { canonical: "/templates/corporate" },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/templates/corporate`,
      type: "website",
    },
  };
}

export default async function CorporateTemplatesPage() {
  const locale = await getRequestedLocale();
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/templates/corporate`;

  const content =
    locale === "th"
      ? {
          eyebrow: "เทมเพลต",
          title: "เว็บไซต์องค์กร",
          subtitle:
            "ตัวอย่างเว็บไซต์องค์กร 2 รูปแบบ เพื่อช่วยให้คุณเลือกสไตล์และโครงสร้างที่เหมาะกับธุรกิจของคุณ (เรียบหรู น่าเชื่อถือ และพร้อมใช้งานบนมือถือ)",
          bullets: [
            "ภาพลักษณ์มืออาชีพและความน่าเชื่อถือ",
            "โครงสร้างชัดเจนสำหรับองค์กร/บริษัท",
            "รองรับทุกอุปกรณ์ และปรับเพื่อ SEO ได้",
          ],
          items: {
            altamax: {
              name: "ตัวอย่างเว็บไซต์องค์กร #1",
              desc: "โทนแข็งแรง เหมาะกับธุรกิจอุตสาหกรรม/บริการ B2B เน้นความน่าเชื่อถือและความชัดเจน",
            },
            voltatech: {
              name: "ตัวอย่างเว็บไซต์องค์กร #2",
              desc: "โทนทันสมัย ครบส่วนบริการ/ผลงาน/ติดต่อ เหมาะกับองค์กรที่ต้องการภาพลักษณ์พรีเมียม",
            },
          },
          ctaPrimary: "ปรึกษาฟรี",
          ctaSecondary: "ขอใบเสนอราคา",
          crumbs: [{ label: "หน้าแรก", href: "/" }, { label: "เว็บไซต์องค์กร" }],
        }
      : {
          eyebrow: "Templates",
          title: "Corporate Websites",
          subtitle:
            "Two corporate website examples to help you choose a style direction (clean, premium, and mobile-ready).",
          bullets: [
            "Professional and trustworthy look",
            "Clear structure for companies and organizations",
            "Responsive across all devices",
          ],
          items: {
            altamax: {
              name: "Corporate example #1",
              desc: "A strong, industrial-focused layout built for credibility and clarity.",
            },
            voltatech: {
              name: "Corporate example #2",
              desc: "A modern homepage with complete sections for services, work, and contact.",
            },
          },
          ctaPrimary: "Free consultation",
          ctaSecondary: "Request a quote",
          crumbs: [{ label: "Home", href: "/" }, { label: "Corporate websites" }],
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
          <div className="grid gap-6 md:grid-cols-2">
            {showcase.map((item) => {
              const meta =
                item.key === "altamax" ? content.items.altamax : content.items.voltatech;
              return (
                <article
                  key={item.key}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card-soft"
                >
                  <Image
                    src={item.src}
                    alt={meta.name}
                    width={1200}
                    height={720}
                    className="block h-64 w-full bg-white object-contain"
                    unoptimized
                    loading="lazy"
                    fetchPriority="low"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-slate-900">{meta.name}</h2>
                    <p className="mt-2 text-sm text-slate-600">{meta.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
