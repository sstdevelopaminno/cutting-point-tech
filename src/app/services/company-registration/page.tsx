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
      title: "บริการจดทะเบียนบริษัทครบวงจร | CUTTING POINT TECH",
      description:
        "บริการจดทะเบียนบริษัทครบวงจร ดูแลเอกสาร ให้คำปรึกษา และติดตามผลอย่างเป็นระบบ เพื่อให้ธุรกิจเริ่มต้นอย่างถูกต้องและมั่นใจ",
    },
    hero: {
      title: "จดทะเบียนบริษัทอย่างมืออาชีพ พร้อมคำปรึกษาที่ถูกต้อง",
      subtitle:
        "ลดความยุ่งยากในการเริ่มต้นธุรกิจ ด้วยทีมที่ดูแลครบทุกขั้นตอนและเอกสารถูกต้อง",
    },
    benefits: [
      "ให้คำปรึกษาโครงสร้างธุรกิจและวัตถุประสงค์ที่เหมาะสม",
      "จัดเตรียมเอกสารครบถ้วน ลดความผิดพลาดในการยื่น",
      "ติดตามผลและช่วยประสานงานอย่างเป็นระบบ",
      "คำแนะนำต่อยอดการดำเนินธุรกิจหลังจดทะเบียน",
    ],
    sections: [
      {
        h2: "จดทะเบียนบริษัทอย่างถูกต้องตั้งแต่ครั้งแรก",
        paragraphs: [
          "การจดทะเบียนบริษัทเป็นขั้นตอนสำคัญที่จะกำหนดโครงสร้างและความน่าเชื่อถือของธุรกิจ หากเริ่มต้นผิดพลาดอาจทำให้ต้องแก้ไขภายหลังและเสียเวลา CUTTING POINT TECH ให้บริการ จดทะเบียนบริษัท แบบครบวงจร ตั้งแต่การให้คำปรึกษา การเตรียมเอกสาร ไปจนถึงการยื่นคำขออย่างถูกต้อง",
          "เราช่วยวางโครงสร้างผู้ถือหุ้น กำหนดทุนจดทะเบียน วัตถุประสงค์ทางธุรกิจ และรูปแบบเอกสารให้เหมาะสมกับกิจการของคุณ เพื่อให้ขั้นตอนผ่านได้อย่างราบรื่น พร้อมคำแนะนำที่เข้าใจง่ายสำหรับผู้ประกอบการที่เพิ่งเริ่มต้น",
          "นอกจากเอกสาร เราให้ความสำคัญกับการอธิบายข้อกำหนดทางกฎหมายและผลกระทบทางธุรกิจ เพื่อให้คุณตัดสินใจได้อย่างมั่นใจและวางแผนได้ถูกต้องตั้งแต่วันแรกของการดำเนินงาน",
          "การเริ่มต้นอย่างเป็นระบบยังช่วยให้คุณสร้างความเชื่อมั่นกับคู่ค้าและลูกค้าได้เร็วขึ้น เพราะเอกสารและโครงสร้างองค์กรพร้อมใช้งานสำหรับการทำสัญญาและการเปิดบัญชีธุรกิจ",
        ],
        subsections: [
          {
            title: "ที่ปรึกษาด้านการจดทะเบียนบริษัท",
            paragraphs: [
              "ทีมของเราช่วยประเมินความเหมาะสมของรูปแบบธุรกิจและให้คำแนะนำเชิงกฎหมาย เพื่อให้การจดทะเบียนเป็นไปอย่างถูกต้องและตรงตามความต้องการขององค์กร",
            ],
          },
        ],
      },
      {
        h2: "เหมาะกับใคร",
        paragraphs: [
          "เหมาะสำหรับผู้ประกอบการที่ต้องการเริ่มต้นธุรกิจอย่างถูกต้องและรวดเร็ว ทั้งผู้ที่เริ่มต้นกิจการครั้งแรก เจ้าของธุรกิจที่ต้องการปรับโครงสร้างเป็นนิติบุคคล หรือผู้ที่ต้องการแยกกิจการให้ชัดเจนเพื่อความน่าเชื่อถือ",
          "บริการของเรายังเหมาะกับธุรกิจที่ต้องการคำแนะนำด้านการจัดโครงสร้างบริษัท เช่น การกำหนดผู้ถือหุ้น การวางทุนจดทะเบียน และการเตรียมเอกสารให้พร้อมสำหรับการเปิดบัญชีธนาคารหรือการดำเนินงานกับคู่ค้า",
          "หากคุณต้องการให้ทีมมืออาชีพดูแลเอกสารและลดความเสี่ยงจากข้อผิดพลาดด้านเอกสาร บริการนี้จะช่วยให้คุณประหยัดเวลาและเริ่มต้นได้อย่างมั่นใจ",
        ],
      },
      {
        h2: "ขั้นตอนทำงานที่ชัดเจน",
        paragraphs: [
          "เราเริ่มจากการให้คำปรึกษาเพื่อเข้าใจรูปแบบธุรกิจและเป้าหมาย จากนั้นจัดทำรายการเอกสารที่จำเป็นและช่วยเตรียมข้อมูลให้ครบถ้วน เมื่อเอกสารพร้อมจึงยื่นคำขอตามขั้นตอน พร้อมติดตามสถานะจนเสร็จสิ้น",
          "หลังจดทะเบียน เราให้คำแนะนำเบื้องต้นเรื่องการดำเนินงาน เช่น การจัดเก็บเอกสาร การจัดการภาษี และแนวทางการวางระบบเพื่อให้ธุรกิจพร้อมเติบโต",
          "ขั้นตอนการทำงานถูกออกแบบให้คุณตรวจสอบได้ทุกจุด ลดความกังวลเรื่องความล่าช้า และทำให้เห็นภาพรวมของกระบวนการอย่างชัดเจน",
        ],
      },
      {
        h2: "สิ่งที่ลูกค้าจะได้รับ",
        paragraphs: [
          "คุณจะได้รับเอกสารครบถ้วนที่ผ่านการตรวจสอบความถูกต้อง ลดความเสี่ยงในการยื่นผิดและต้องแก้ไขซ้ำ พร้อมแนวทางการดำเนินการหลังการจดทะเบียน เช่น การเปิดบัญชีบริษัท การวางระบบเอกสาร และการเริ่มต้นจัดการภาษีอย่างเหมาะสม",
          "เรายังให้คำแนะนำต่อยอดในเชิงธุรกิจ เพื่อให้บริษัทของคุณพร้อมสำหรับการขยายตัวและสร้างความเชื่อถือกับคู่ค้าและลูกค้า",
          "การดูแลหลังจดทะเบียนช่วยให้คุณไม่สะดุดเรื่องขั้นตอนทางธุรการที่จำเป็นในช่วงเริ่มต้น และสามารถโฟกัสกับการพัฒนาธุรกิจได้เต็มที่",
        ],
        subsections: [
          {
            title: "การดูแลหลังจดทะเบียน",
            paragraphs: [
              "เราช่วยวางแนวทางการจัดเก็บเอกสารและการเริ่มต้นระบบภายใน เพื่อให้บริษัททำงานได้อย่างมืออาชีพตั้งแต่วันแรก",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "ต้องเตรียมเอกสารอะไรบ้าง",
        a: "เอกสารหลักประกอบด้วยข้อมูลผู้ถือหุ้น ชื่อบริษัท วัตถุประสงค์ และรายละเอียดทุนจดทะเบียน ทีมของเราจะสรุปรายการที่ต้องใช้ให้ครบถ้วน",
      },
      {
        q: "ใช้เวลาจดทะเบียนนานแค่ไหน",
        a: "โดยทั่วไปใช้เวลา 1-2 สัปดาห์ขึ้นอยู่กับความพร้อมของเอกสารและการยื่นคำขอ",
      },
      {
        q: "สามารถให้คำปรึกษาเรื่องวัตถุประสงค์ได้หรือไม่",
        a: "ได้ เราช่วยแนะนำวัตถุประสงค์ที่เหมาะสมและสอดคล้องกับกิจการของคุณเพื่อให้ผ่านการอนุมัติได้ง่ายขึ้น",
      },
      {
        q: "หลังจดทะเบียนมีการดูแลต่อหรือไม่",
        a: "มีคำแนะนำเบื้องต้นเรื่องการจัดการเอกสาร ภาษี และการเริ่มต้นดำเนินงานอย่างถูกต้อง",
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
      { label: "จดทะเบียนบริษัท" },
    ],
  },
  en: {
    meta: {
      title: "Company Registration Service | CUTTING POINT TECH",
      description:
        "End-to-end company registration service with structured guidance, documentation support, and compliance-ready setup by CUTTING POINT TECH.",
    },
    hero: {
      title: "Company registration with professional guidance and clarity",
      subtitle:
        "Start your business with correct documentation, clear structure, and expert support.",
    },
    benefits: [
      "Guidance on business structure and objectives",
      "Complete document preparation to reduce errors",
      "Clear process tracking and coordination",
      "Practical advice after registration",
    ],
    sections: [
      {
        h2: "Register your company correctly from the start",
        paragraphs: [
          "Company registration is a foundational step that shapes your legal structure and credibility. Mistakes can lead to delays and extra costs. CUTTING POINT TECH provides an end-to-end company registration service, covering consultation, documentation, and submission in a structured process.",
          "We help define shareholder structure, registered capital, and business objectives that align with your operations. This ensures a smoother approval process and a clear foundation for future growth.",
          "Beyond paperwork, we explain the legal and business implications so you can make confident decisions and start your company with clarity.",
          "Starting with a well-structured setup also builds trust with partners and clients, as your documentation is ready for contracts, banking, and formal engagements.",
        ],
        subsections: [
          {
            title: "Company registration advisory",
            paragraphs: [
              "We review your business model and advise on the right structure, objectives, and documentation to improve approval readiness.",
            ],
          },
        ],
      },
      {
        h2: "Who this service is for",
        paragraphs: [
          "Ideal for first-time founders who want a smooth start, businesses transitioning to a legal entity, or companies that need clear separation of operations for credibility.",
          "We also support businesses that need guidance on shareholder setup, capital structure, and documentation readiness for banking and partner onboarding.",
          "If you prefer a guided, low-risk process handled by professionals, this service provides clarity and saves time.",
        ],
      },
      {
        h2: "A clear, structured process",
        paragraphs: [
          "We begin with consultation to understand your business model, then prepare the required documents and data. Once everything is ready, we submit and track the registration process until completion.",
          "After registration, we provide practical guidance on documentation management, tax readiness, and operational setup.",
          "The workflow is transparent and structured so you can follow each step and stay confident throughout the process.",
        ],
      },
      {
        h2: "What you will receive",
        paragraphs: [
          "You will receive complete, verified documents that reduce the risk of rejection or rework. We also provide guidance for post-registration steps such as corporate bank accounts and compliance basics.",
          "Our advisory support helps your company start professionally and build trust with partners and clients.",
          "Ongoing guidance helps you avoid common administrative pitfalls during the first months of operation.",
        ],
        subsections: [
          {
            title: "Post-registration guidance",
            paragraphs: [
              "We provide practical recommendations on document management and compliance basics so you can focus on growth.",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "What documents are required?",
        a: "We prepare a checklist based on shareholder details, company name, objectives, and registered capital.",
      },
      {
        q: "How long does registration take?",
        a: "Typically 1-2 weeks depending on document readiness and submission timeline.",
      },
      {
        q: "Can you help with business objectives wording?",
        a: "Yes. We guide objective wording to fit your business model and approval requirements.",
      },
      {
        q: "Do you provide support after registration?",
        a: "Yes. We provide initial guidance on documentation, tax readiness, and operational setup.",
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
      { label: "Company Registration" },
    ],
  },
} satisfies Record<"th" | "en", ContentLocale>;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const localeKey = locale === "lo" ? "en" : locale;
  const data = content[localeKey].meta;
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/services/company-registration`;

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: data.title },
    description: data.description,
    alternates: { canonical: "/services/company-registration" },
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

export default async function CompanyRegistrationPage() {
  const locale = await getRequestedLocale();
  const localeKey = locale === "lo" ? "en" : locale;
  const data = content[localeKey];
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/services/company-registration`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <StructuredData
        locale={locale}
        service={{
          name: data.meta.title,
          description: data.meta.description,
          serviceType:
            localeKey === "th" ? "บริการจดทะเบียนบริษัท" : "Company Registration",
          url,
        }}
        faqs={data.faq.map((item) => ({ question: item.q, answer: item.a }))}
        breadcrumbs={[
          { name: data.crumbs[0].label, item: `${baseUrl}/` },
          { name: data.crumbs[1].label, item: `${baseUrl}/services` },
          {
            name: data.crumbs[2].label,
            item: `${baseUrl}/services/company-registration`,
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
              ? "คำถามที่ลูกค้าสอบถามบ่อยเกี่ยวกับบริการจดทะเบียนบริษัท"
              : "Common questions about company registration."}
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
                  ? "ลิงก์ไปยังบริการอื่นเพื่อการตัดสินใจที่ครบถ้วน"
                  : "Explore other services to complete your decision."}
              </p>
            </div>
            <Link href="/" className="text-sm font-semibold text-blue-700">
              {localeKey === "th" ? "กลับหน้าแรก" : "Back to home"}
            </Link>
          </div>
          <div className="mt-8">
            <ServiceLinks locale={locale} current="company-registration" />
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


