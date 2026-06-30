import type { Metadata } from "next";
import Link from "next/link";
import { getRequestedLocale } from "@/lib/locale";
import { estimatorConfig } from "@/lib/estimateConfig";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cutting-point-tech.vercel.app";

type PackageItem = {
  id: "pos" | "website" | "dormitory" | "company";
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: { href: string; label: string };
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const title =
    locale === "th" ? "แพ็กเกจบริการ | CUTTING POINT TECH" : "Packages | CUTTING POINT TECH";
  const description =
    locale === "th"
      ? "แพ็กเกจสำหรับเว็บไซต์ ระบบหอพัก/รีสอร์ท และบริการจดทะเบียนบริษัท พร้อมทีมงานดูแลครบวงจร"
      : "Packages for websites, dormitory/resort systems, and company registration with full-service support.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: title },
    description,
    alternates: { canonical: "/packages" },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/packages`,
      type: "website",
    },
  };
}

export default async function PackagesPage() {
  const locale = await getRequestedLocale();
  const data: PackageItem[] =
    locale === "th"
      ? [
          {
            id: "pos",
            name: "แพ็คเกจ ระบบ POS",
            price: "เริ่มต้น 25,000 บาท",
            description:
              "ระบบขายหน้าร้านสำหรับร้านค้า/คาเฟ่/ธุรกิจบริการ พร้อมสต็อก รายงาน และรองรับการขยายสาขา",
            features: [
              "ขายหน้าร้าน + บิล/ใบเสร็จ",
              "จัดการสินค้า/สต็อก + แจ้งเตือนสินค้าใกล้หมด",
              "รายงานยอดขาย/กำไร/สรุปรายวัน",
              "กำหนดสิทธิ์พนักงาน + ประวัติการทำรายการ",
              "ออกแบบให้ใช้งานง่าย และปรับตามรูปแบบร้าน",
            ],
            cta: { href: "/contact", label: "ขอใบเสนอราคา" },
          },
          {
            id: "website",
            name: "แพ็กเกจสร้างเว็บไซต์",
            price: "เริ่มต้น 10,000 บาท",
            description: "เว็บไซต์องค์กร/ธุรกิจ พร้อมโครงสร้างรองรับ SEO และขยายระบบได้",
            features: [
              "ออกแบบตามแบรนด์ และจัดวาง UX/UI",
              "รองรับมือถือ และความเร็วโหลดสูง",
              "ระบบ CMS (ตามความเหมาะสมของโปรเจกต์)",
              "ติดตั้ง Analytics และตั้งค่าพื้นฐาน",
              "ดูแลหลังส่งมอบ พร้อมคำปรึกษา",
            ],
            cta: { href: "/estimate?service=website", label: "ประเมินราคา" },
          },
          {
            id: "dormitory",
            name: "แพ็กเกจระบบหอพัก/รีสอร์ท",
            price: `เริ่มต้น ${new Intl.NumberFormat("th-TH").format(
              estimatorConfig.dormitory.base
            )} บาท`,
            description:
              "ระบบบริหารหอพัก/รีสอร์ท จัดการห้อง สัญญา บิล และรายงานแบบเป็นระบบ",
            features: [
              "จัดการห้องพัก + สัญญา + ประวัติลูกค้า",
              "วางบิล/ใบแจ้งหนี้ และติดตามยอดค้าง",
              "รายงานผู้บริหาร และข้อมูลภาพรวม",
              "กำหนดสิทธิ์ผู้ใช้งาน + ตรวจสอบย้อนหลัง",
              "ปรับแต่งตามรูปแบบธุรกิจของคุณ",
            ],
            cta: { href: "/estimate?service=dormitory", label: "ประเมินราคา" },
          },
          {
            id: "company",
            name: "แพ็กเกจจดทะเบียนบริษัทครบวงจร",
            price: "สอบถามราคา",
            description:
              "ดูแลเอกสาร ให้คำปรึกษา และติดตามผล เพื่อเริ่มต้นธุรกิจอย่างถูกต้องและมั่นใจ",
            features: [
              "ให้คำปรึกษาโครงสร้างและวัตถุประสงค์",
              "จัดเตรียมเอกสารครบถ้วน ลดความผิดพลาด",
              "ติดตามสถานะ และประสานงานอย่างเป็นระบบ",
              "คำแนะนำหลังจดทะเบียน (เอกสาร/ภาษีเบื้องต้น)",
              "เหมาะสำหรับผู้เริ่มต้นธุรกิจและองค์กร",
            ],
            cta: { href: "/services/company-registration", label: "ดูรายละเอียด" },
          },
        ]
      : [
          {
            id: "pos",
            name: "POS system package",
            price: "Starting from ฿25,000",
            description:
              "A point-of-sale system for retail/cafés/services with inventory, reports, and scalable setup.",
            features: [
              "Point of sale + receipts",
              "Products/inventory + low-stock alerts",
              "Sales/profit reports + daily summaries",
              "Staff permissions + transaction history",
              "Simple UX with business-specific customization",
            ],
            cta: { href: "/contact", label: "Request a quote" },
          },
          {
            id: "website",
            name: "Website package",
            price: "Starting from ฿10,000",
            description:
              "A professional website foundation built for speed, SEO, and future scalability.",
            features: [
              "Brand-aligned UI/UX structure",
              "Mobile-ready + fast performance",
              "CMS setup (based on project fit)",
              "Analytics setup and essentials",
              "Post-launch support and guidance",
            ],
            cta: { href: "/estimate?service=website", label: "Estimate pricing" },
          },
          {
            id: "dormitory",
            name: "Dormitory & resort system package",
            price: `Starting from ฿${new Intl.NumberFormat("en-US").format(
              estimatorConfig.dormitory.base
            )}`,
            description:
              "An operational system for rooms, contracts, billing, and reporting with clear workflows.",
            features: [
              "Rooms + contracts + customer records",
              "Billing/invoices + outstanding tracking",
              "Management reports and overview",
              "Role-based access + audit-friendly",
              "Configurable for your business model",
            ],
            cta: { href: "/estimate?service=dormitory", label: "Estimate pricing" },
          },
          {
            id: "company",
            name: "Company registration package",
            price: "Contact for pricing",
            description:
              "Guided company registration service with document preparation and structured follow-up.",
            features: [
              "Advisory on structure and objectives",
              "Complete document preparation",
              "Status tracking and coordination",
              "Post-registration guidance (basics)",
              "Ideal for founders and growing teams",
            ],
            cta: { href: "/services/company-registration", label: "View details" },
          },
        ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-mist py-10">
        <div className="mx-auto w-full max-w-6xl space-y-4 px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            CUTTING POINT TECH
          </p>
          <h1 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {locale === "th" ? "แพ็กเกจบริการ" : "Service packages"}
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            {locale === "th"
              ? "เลือกแพ็กเกจที่เหมาะกับธุรกิจของคุณ แล้วให้ทีมงานช่วยปรับรายละเอียดให้แม่นยำ"
              : "Pick a package that fits your needs, then we’ll refine the scope with you."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white"
            >
              {locale === "th" ? "ปรึกษาฟรี" : "Free consultation"}
            </Link>
            <Link
              href="/estimate"
              className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700"
            >
              {locale === "th" ? "ไปหน้าประเมินราคา" : "Go to estimator"}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {data.map((pkg) => (
              <div
                key={pkg.id}
                id={pkg.id}
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft"
              >
                <h2 className="font-[var(--font-heading)] text-xl font-semibold text-slate-900">
                  {pkg.name}
                </h2>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{pkg.price}</p>
                <p className="mt-3 text-sm text-slate-600">{pkg.description}</p>
                <ul className="mt-5 space-y-3 text-sm text-slate-600">
                  {pkg.features.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href={pkg.cta.href}
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-xs font-semibold text-white transition hover:bg-slate-800"
                  >
                    {pkg.cta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
