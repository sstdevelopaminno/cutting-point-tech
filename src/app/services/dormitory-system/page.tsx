import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceLinks from "@/components/ServiceLinks";
import StructuredData from "@/components/StructuredData";
import { getRequestedLocale } from "@/lib/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cutting-point-tech.vercel.app";

type ContentSection = {
  h2: string;
  paragraphs: string[];
  subsections?: { title: string; paragraphs: string[] }[];
};

type ContentLocale = {
  meta: { title: string; description: string };
  hero: { title: string; subtitle: string };
  benefits: string[];
  sections: ContentSection[];
  faq: { q: string; a: string }[];
  cta: { primary: string; secondary: string; line: string };
  crumbs: { label: string; href?: string }[];
};

const content = {
  th: {
    meta: {
      title: "โปรแกรมบริหารหอพัก/รีสอร์ท | CUTTING POINT TECH",
      description:
        "ระบบบริหารหอพักและรีสอร์ทแบบครบวงจร ช่วยจัดการห้องพัก สัญญา การชำระเงิน และรายงานได้อย่างเป็นระบบ โดย CUTTING POINT TECH",
    },
    hero: {
      title: "โปรแกรมบริหารหอพัก/รีสอร์ทที่ช่วยลดงานซ้ำซ้อนและเพิ่มความแม่นยำ",
      subtitle:
        "ระบบเดียวที่ช่วยให้ผู้ประกอบการเห็นภาพรวม ลดข้อผิดพลาด และตัดสินใจได้เร็วขึ้น",
    },
    benefits: [
      "จัดการห้องพัก สัญญา และการชำระเงินในที่เดียว",
      "ลดความผิดพลาดจากการบันทึกแบบเอกสาร",
      "รายงานภาพรวมรายได้และการเข้าพักแบบเรียลไทม์",
      "ปรับแต่งระบบให้เข้ากับธุรกิจของคุณได้",
    ],
    sections: [
      {
        h2: "ระบบบริหารหอพักและรีสอร์ทที่ออกแบบจากการใช้งานจริง",
        paragraphs: [
          "ผู้ประกอบการหอพักและรีสอร์ทจำนวนมากยังต้องใช้การบันทึกแบบกระดาษหรือไฟล์กระจัดกระจาย ทำให้ข้อมูลไม่ตรงกันและเกิดความผิดพลาดง่าย โปรแกรมบริหารหอพัก ของ CUTTING POINT TECH ถูกออกแบบจากกระบวนการทำงานจริง ตั้งแต่การจอง การทำสัญญา การรับชำระ ไปจนถึงรายงานที่ช่วยให้ผู้บริหารเห็นภาพรวมทันที",
          "เราเน้นระบบที่ใช้งานง่ายสำหรับทีมงานหน้างาน แต่ให้ข้อมูลเชิงลึกสำหรับผู้บริหาร ทำให้ทั้งฝ่ายต้อนรับ ฝ่ายบัญชี และผู้จัดการสามารถทำงานร่วมกันได้โดยไม่สับสน ลดงานซ้ำซ้อน และเพิ่มความโปร่งใสในการบริหาร",
          "ระบบยังรองรับการปรับแต่งตามรูปแบบธุรกิจ เช่น หอพักรายเดือน รีสอร์ทรายคืน หรือที่พักแบบผสม พร้อมรองรับการกำหนดสิทธิ์ผู้ใช้งาน การบันทึกประวัติ และการตรวจสอบย้อนหลังอย่างเป็นระบบ",
          "การมีข้อมูลที่เป็นระบบช่วยให้คุณวางแผนการตลาดได้แม่นยำขึ้น เช่น การวิเคราะห์ช่วงพีค การทำโปรโมชัน และการจัดการค่าใช้จ่ายตามฤดูกาล ซึ่งทั้งหมดช่วยเพิ่มรายได้และลดความเสี่ยงในการบริหาร",
        ],
        subsections: [
          {
            title: "ระบบจัดการหอพักออนไลน์",
            paragraphs: [
              "ติดตามสถานะห้องพัก สัญญา และการชำระเงินได้แบบเรียลไทม์ ลดข้อผิดพลาดจากการบันทึกมือและเพิ่มความโปร่งใสในการบริหาร",
            ],
          },
          {
            title: "ระบบบริหารรีสอร์ทแบบครบวงจร",
            paragraphs: [
              "รองรับการกำหนดราคาหลายรูปแบบ การบริหารโปรโมชั่น และการดูแลข้อมูลผู้เข้าพักอย่างเป็นระบบ เพื่อยกระดับบริการและเพิ่มประสิทธิภาพทีมงาน",
            ],
          },
        ],
      },
      {
        h2: "เหมาะกับใคร",
        paragraphs: [
          "เหมาะกับเจ้าของหอพักและรีสอร์ทที่ต้องการควบคุมการบริหารให้เป็นระบบ ลดปัญหาการค้างชำระ และติดตามสถานะห้องพักแบบเรียลไทม์ รวมถึงผู้ประกอบการที่มีหลายอาคารหรือหลายสาขาและต้องการศูนย์กลางข้อมูลเดียว",
          "ระบบของเราเหมาะกับธุรกิจที่กำลังเติบโตและต้องการข้อมูลที่แม่นยำเพื่อวางแผนการตลาดและการลงทุน เช่น การประเมินอัตราการเข้าพัก การวิเคราะห์รายได้รายเดือน และการวางแผนพัฒนาบริการเพิ่มเติม",
          "หากคุณกำลังเปลี่ยนจากการจัดการแบบเดิมไปสู่ระบบดิจิทัล บริการของเราจะช่วยให้การเปลี่ยนผ่านเป็นไปอย่างราบรื่น พร้อมการฝึกอบรมและคำแนะนำที่เหมาะกับทีมงาน",
        ],
        subsections: [
          {
            title: "ธุรกิจหลายสาขา",
            paragraphs: [
              "ระบบช่วยให้คุณรวมข้อมูลของหลายอาคารไว้ในที่เดียว ทำให้ตรวจสอบและวางแผนการบริหารได้สะดวกขึ้น",
            ],
          },
        ],
      },
      {
        h2: "ขั้นตอนทำงานที่ชัดเจน",
        paragraphs: [
          "เราเริ่มจากการสำรวจรูปแบบธุรกิจและขั้นตอนการทำงานปัจจุบันของคุณ จากนั้นออกแบบโครงสร้างระบบและหน้าจอการใช้งานให้เหมาะกับทีมงานจริง เมื่อตกลงร่วมกัน ทีมพัฒนาจะสร้างระบบและทดสอบกระบวนการสำคัญ เช่น การรับชำระ การออกบิล และรายงานสรุป",
          "ก่อนส่งมอบ เราทดสอบการใช้งานจริงและอบรมทีมงาน พร้อมจัดทำคู่มือการใช้งาน เพื่อให้ระบบถูกใช้งานได้ทันทีหลังเปิดใช้งาน และลดความเสี่ยงในการสื่อสารข้อมูลผิดพลาด",
          "ขั้นตอนทั้งหมดมีการทบทวนร่วมกับเจ้าของกิจการ เพื่อให้ระบบที่ได้ตรงตามความต้องการและรองรับการดำเนินงานในระยะยาว",
        ],
      },
      {
        h2: "สิ่งที่ลูกค้าจะได้รับ",
        paragraphs: [
          "คุณจะได้รับระบบบริหารหอพักหรือรีสอร์ทที่ใช้งานได้จริง พร้อมแดชบอร์ดสรุปข้อมูลสำคัญ เช่น รายได้คงค้าง อัตราการเข้าพัก และรายงานรายเดือน ระบบช่วยลดเวลาในการทำงานซ้ำซ้อนและลดข้อผิดพลาดจากการบันทึกมือ",
          "นอกจากนี้ยังได้รับคำแนะนำเชิงธุรกิจในการใช้ข้อมูลเพื่อวางแผนการตลาดหรือพัฒนาบริการ เช่น การวิเคราะห์ฤดูกาล การกำหนดราคาที่เหมาะสม และการติดตามแนวโน้มการเข้าพักในระยะยาว",
          "เมื่อข้อมูลอยู่ในระบบเดียว คุณสามารถตรวจสอบสถานะได้ตลอดเวลา ทำให้การบริหารมีความโปร่งใสและการตัดสินใจทางธุรกิจรวดเร็วขึ้น",
        ],
      },
    ],
    faq: [
      {
        q: "ระบบรองรับหอพักและรีสอร์ทพร้อมกันได้หรือไม่",
        a: "รองรับได้ ระบบสามารถปรับให้เหมาะกับรูปแบบรายเดือนและรายคืน พร้อมการตั้งค่าสิทธิ์และราคาแบบยืดหยุ่น",
      },
      {
        q: "ทีมงานต้องใช้เวลาฝึกใช้นานแค่ไหน",
        a: "โดยทั่วไปใช้เวลาไม่นาน เรามีการอบรมและคู่มือการใช้งานเพื่อให้ทีมงานเริ่มต้นได้ทันที",
      },
      {
        q: "สามารถเชื่อมต่อกับระบบการชำระเงินได้หรือไม่",
        a: "สามารถวางแผนการเชื่อมต่อได้ตามความต้องการของธุรกิจ เพื่อให้การรับชำระสะดวกและตรวจสอบได้ง่าย",
      },
      {
        q: "มีรายงานอะไรบ้างที่ระบบให้ได้",
        a: "ระบบมีรายงานรายได้ รายการค้างชำระ อัตราการเข้าพัก และรายงานสรุปแบบรายเดือนหรือรายไตรมาส",
      },
    ],
    cta: {
      primary: "ขอใบเสนอราคา",
      secondary: "ปรึกษาฟรี",
      line: "แอดไลน์",
    },
    crumbs: [
      { label: "หน้าแรก", href: "/" },
      { label: "บริการ", href: "/services" },
      { label: "โปรแกรมบริหารหอพัก/รีสอร์ท" },
    ],
  },
  en: {
    meta: {
      title: "Dormitory & Resort Management System | CUTTING POINT TECH",
      description:
        "A complete dormitory and resort management system to handle rooms, contracts, payments, and reporting with accuracy and efficiency.",
    },
    hero: {
      title: "Dormitory & resort management system that reduces manual work",
      subtitle:
        "Centralize operations, improve accuracy, and make faster decisions with real-time visibility.",
    },
    benefits: [
      "Centralized room, contract, and payment management",
      "Reduce errors caused by manual record keeping",
      "Real-time reporting on occupancy and revenue",
      "Flexible configuration for your business model",
    ],
    sections: [
      {
        h2: "Built from real operational workflows",
        paragraphs: [
          "Many property operators still rely on spreadsheets or paper records, which leads to inconsistencies and delays. The CUTTING POINT TECH dormitory and resort management system is designed around real workflows: booking, contracts, billing, and reporting, all in one place.",
          "The system is easy for front-desk staff while providing management with insights needed for decision making. This alignment reduces repeated tasks, improves transparency, and enables consistent service quality across teams.",
          "It supports monthly dormitories, nightly resorts, and mixed property types, with role-based access and audit trails that reduce risk and keep operations organized.",
          "With clean data, operators can evaluate occupancy trends and revenue performance, helping them plan pricing, promotions, and operational improvements more effectively.",
        ],
        subsections: [
          {
            title: "Online dormitory management",
            paragraphs: [
              "Track room status, contracts, and payments in real time while reducing errors from manual records.",
            ],
          },
          {
            title: "End-to-end resort management",
            paragraphs: [
              "Support flexible pricing, promotions, and guest data management to improve service quality and team efficiency.",
            ],
          },
        ],
      },
      {
        h2: "Who this system is for",
        paragraphs: [
          "Ideal for dormitory owners and resort operators who need clear visibility into occupancy and revenue. It also suits businesses with multiple buildings or locations that need a single source of truth for operational data.",
          "If your business is growing and you need accurate analytics for planning, this system provides reliable insights into trends, performance, and opportunities for improvement.",
          "Teams transitioning from manual workflows will benefit from structured onboarding and practical guidance that reduces disruption during the change.",
        ],
        subsections: [
          {
            title: "Multi-location operations",
            paragraphs: [
              "Centralize data across buildings or branches to improve visibility and strategic planning.",
            ],
          },
        ],
      },
      {
        h2: "A structured implementation process",
        paragraphs: [
          "We start by reviewing your current process, then design system flows and screens that match your daily operations. After validation, we build and test key workflows such as billing, payment tracking, and reporting.",
          "Before launch, we provide hands-on training and documentation so your team can adopt the system immediately with confidence.",
          "Each milestone is reviewed together to ensure the system aligns with your real-world needs and supports long-term growth.",
        ],
      },
      {
        h2: "What you will receive",
        paragraphs: [
          "You will get an end-to-end system with dashboards for outstanding balances, occupancy rates, and monthly summaries. This reduces manual effort and minimizes mistakes from inconsistent records.",
          "We also provide guidance on using data to improve pricing strategy, seasonal planning, and marketing efforts based on real occupancy trends.",
          "A single, reliable system improves transparency across teams and supports faster, more confident business decisions.",
        ],
      },
    ],
    faq: [
      {
        q: "Can the system support both dormitories and resorts?",
        a: "Yes. It can be configured for monthly and nightly operations with flexible pricing and permissions.",
      },
      {
        q: "How long does team onboarding take?",
        a: "Training is straightforward, and we provide clear documentation to help teams start quickly.",
      },
      {
        q: "Can it integrate with payment solutions?",
        a: "Integration can be planned based on your preferred payment methods and workflow.",
      },
      {
        q: "What reports are included?",
        a: "The system provides revenue summaries, outstanding balances, occupancy rates, and monthly reports.",
      },
    ],
    cta: {
      primary: "Request a quote",
      secondary: "Free consultation",
      line: "Add Line",
    },
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Dormitory & Resort System" },
    ],
  },
} satisfies Record<"th" | "en", ContentLocale>;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const localeKey = locale === "lo" ? "en" : locale;
  const data = content[localeKey].meta;
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/services/dormitory-system`;

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: data.title },
    description: data.description,
    alternates: { canonical: "/services/dormitory-system" },
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

export default async function DormitorySystemPage() {
  const locale = await getRequestedLocale();
  const localeKey = locale === "lo" ? "en" : locale;
  const data = content[localeKey];
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/services/dormitory-system`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <StructuredData
        locale={locale}
        service={{
          name: data.meta.title,
          description: data.meta.description,
          serviceType:
            localeKey === "th"
              ? "โปรแกรมบริหารหอพักและรีสอร์ท"
              : "Dormitory & Resort Management System",
          url,
        }}
        faqs={data.faq.map((item) => ({ question: item.q, answer: item.a }))}
        breadcrumbs={[
          { name: data.crumbs[0].label, item: `${baseUrl}/` },
          { name: data.crumbs[1].label, item: `${baseUrl}/services` },
          {
            name: data.crumbs[2].label,
            item: `${baseUrl}/services/dormitory-system`,
          },
        ]}
      />

      <section className="border-b border-slate-200 bg-mist py-10">
        <div className="mx-auto w-full max-w-6xl space-y-4 px-6">
          <Breadcrumbs items={data.crumbs} />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                {data.hero.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-600">
                {data.hero.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white"
              >
                {data.cta.primary}
              </Link>
              <Link
                href="/estimate?service=dormitory"
                className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700"
              >
                {localeKey === "th" ? "ประเมินราคา" : "Estimate price"}
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700"
              >
                {data.cta.secondary}
              </Link>
              <a
                href="https://line.me/R/ti/p/@974qhtym"
                className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700"
              >
                {data.cta.line}
              </a>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.benefits.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-5xl space-y-10 px-6">
          {data.sections.map((section) => (
            <div key={section.h2} className="space-y-4">
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-slate-900">
                {section.h2}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base text-slate-600">
                  {paragraph}
                </p>
              ))}
              {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="space-y-3 pt-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {subsection.title}
                  </h3>
                  {subsection.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-base text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-5xl space-y-6 px-6">
          <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-slate-900">
            {localeKey === "th" ? "คำถามที่พบบ่อย" : "Frequently asked questions"}
          </h2>
          <p className="text-base text-slate-600">
            {localeKey === "th"
              ? "คำถามที่ลูกค้าสอบถามบ่อยเกี่ยวกับระบบบริหารหอพักและรีสอร์ท"
              : "Common questions about dormitory and resort management systems."}
          </p>
          <div className="space-y-4">
            {data.faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-slate-900">
                {localeKey === "th" ? "บริการที่เกี่ยวข้อง" : "Related services"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {localeKey === "th"
                  ? "บริการอื่นที่ช่วยเสริมการเติบโตของธุรกิจคุณ"
                  : "Other services that complement your growth."}
              </p>
            </div>
            <Link href="/" className="text-sm font-semibold text-blue-700">
              {localeKey === "th" ? "กลับหน้าแรก" : "Back to home"}
            </Link>
          </div>
          <div className="mt-8">
            <ServiceLinks locale={locale} current="dormitory-system" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white"
            >
              {data.cta.primary}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700"
            >
              {data.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


