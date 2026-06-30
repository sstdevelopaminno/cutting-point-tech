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
      title: "รับทำเว็บไซต์ระดับมืออาชีพ | CUTTING POINT TECH",
      description:
        "รับทำเว็บไซต์องค์กรที่เน้นผลลัพธ์ รองรับ SEO และขยายต่อได้ง่าย โดยทีม CUTTING POINT TECH ดูแลครบวงจรตั้งแต่กลยุทธ์ ออกแบบ พัฒนา ไปจนถึงดูแลหลังส่งมอบ",
    },
    hero: {
      title: "บริการรับทำเว็บไซต์ระดับมืออาชีพสำหรับองค์กรที่ต้องการความน่าเชื่อถือ",
      subtitle:
        "ออกแบบเว็บไซต์ที่สื่อสารแบรนด์ชัดเจน เน้นผลลัพธ์เชิงธุรกิจ และพร้อมขยายต่อในอนาคต",
    },
    benefits: [
      "วางโครงสร้างข้อมูลและ UX เพื่อเพิ่มโอกาสปิดการขาย",
      "รองรับ SEO และความเร็วโหลดเพื่อประสบการณ์ที่ดี",
      "ออกแบบภาพลักษณ์ให้พรีเมียม สอดคล้องกับแบรนด์",
      "ดูแลหลังส่งมอบ พร้อมคำปรึกษาเชิงกลยุทธ์",
    ],
    sections: [
      {
        h2: "ทำไมการรับทำเว็บไซต์ต้องเริ่มที่กลยุทธ์",
        paragraphs: [
          "การ รับทำเว็บไซต์ ไม่ใช่แค่การสร้างหน้าเว็บสวย ๆ แต่เป็นกระบวนการวางโครงสร้างธุรกิจบนโลกดิจิทัลอย่างเป็นระบบ ที่ CUTTING POINT TECH เราเริ่มจากการวิเคราะห์เป้าหมายทางธุรกิจ กลุ่มเป้าหมาย และพฤติกรรมผู้ใช้ เพื่อกำหนดตำแหน่งของแบรนด์ให้ชัดเจน เว็บไซต์ที่ดีต้องตอบโจทย์ทั้งภาพลักษณ์และการสร้างผลลัพธ์ เช่น การสร้างลีด การติดต่อ และการปิดการขาย",
          "จากกลยุทธ์ เราออกแบบโครงสร้างข้อมูลและการเดินทางของผู้ใช้ (User Journey) ให้ครบ ตั้งแต่การสร้างความสนใจ ไปจนถึงการตัดสินใจติดต่อ ทีมของเราวางระบบการสื่อสารด้วยคำและภาพอย่างสอดคล้องกัน เพื่อให้ผู้เข้าชมรับรู้คุณค่าแบรนด์ได้รวดเร็ว พร้อมวาง Call-to-Action ที่เหมาะสมในทุกจุดสำคัญ",
          "เมื่อโครงสร้างชัดเจน การออกแบบและพัฒนาจะมีทิศทางที่แม่นยำมากขึ้น ลดการแก้ไขซ้ำซ้อนและทำให้เว็บไซต์พร้อมขยายในอนาคต ไม่ว่าจะเพิ่มบริการ เพิ่มภาษา หรือเชื่อมต่อระบบอื่น ๆ ทั้งหมดถูกคิดไว้ตั้งแต่ต้น เพื่อให้เว็บไซต์เป็นสินทรัพย์ที่เติบโตไปพร้อมธุรกิจของคุณ",
          "เรายังวางแผนคอนเทนต์เชิงกลยุทธ์ เช่น หน้าแนะนำบริการ หน้าเคสตัวอย่าง และหน้า FAQ เพื่อช่วยให้เว็บไซต์ตอบโจทย์ทั้งผู้ใช้และเครื่องมือค้นหาอย่างสมดุล การทำงานเชิงระบบนี้ช่วยเพิ่มโอกาสในการถูกค้นพบในคำค้นที่สำคัญ โดยไม่ต้องพึ่งการโฆษณาตลอดเวลา",
        ],
        subsections: [
          {
            title: "เว็บไซต์บริษัท / เว็บไซต์ธุรกิจ",
            paragraphs: [
              "โครงสร้างหน้าเว็บที่ชัดเจนช่วยให้ลูกค้าเข้าใจบริการของคุณเร็วขึ้น ลดความสับสน และเพิ่มโอกาสในการติดต่อ การจัดลำดับข้อมูลอย่างเป็นระบบยังช่วยให้ทีมขายและการตลาดมีเครื่องมือที่พร้อมใช้งาน",
            ],
          },
          {
            title: "ทีมงานมืออาชีพและการดูแลหลังการขาย",
            paragraphs: [
              "เราไม่เพียงส่งมอบเว็บไซต์ แต่ยังให้คำแนะนำต่อเนื่องและตรวจสอบผลลัพธ์เพื่อให้เว็บไซต์ทำงานได้เต็มศักยภาพในระยะยาว",
            ],
          },
        ],
      },
      {
        h2: "เหมาะกับใคร",
        paragraphs: [
          "บริการรับทำเว็บไซต์ของเราเหมาะกับองค์กรที่ต้องการภาพลักษณ์ระดับมืออาชีพ ผู้บริหารที่ต้องการเว็บไซต์ที่สื่อสารคุณค่าแบรนด์อย่างชัดเจน และธุรกิจที่ต้องการสร้างลีดและยอดขายผ่านช่องทางดิจิทัล ไม่ว่าจะเป็นบริษัทที่ต้องการรีแบรนด์ เว็บไซต์ธุรกิจที่ต้องการเพิ่มความน่าเชื่อถือ หรือองค์กรที่ต้องการระบบเว็บไซต์รองรับการขยายหลายสาขา",
          "เรายังเหมาะกับธุรกิจที่ต้องการเว็บไซต์รองรับ SEO อย่างจริงจัง และมีแผนทำการตลาดออนไลน์ต่อเนื่อง เพราะเราวางโครงสร้างเพื่อรองรับคอนเทนต์และการเติบโตในระยะยาว ช่วยให้ทุกบทความและทุกหน้าเว็บมีโอกาสติดอันดับค้นหาได้ดีขึ้นอย่างเป็นธรรมชาติ",
          "สำหรับธุรกิจที่ต้องการปรับภาพลักษณ์ใหม่หรือเปิดตัวบริการใหม่ เว็บไซต์ที่ออกแบบอย่างมืออาชีพจะช่วยยกระดับความเชื่อมั่นของลูกค้า และทำให้การสื่อสารทางการตลาดสอดคล้องกับทิศทางขององค์กร",
        ],
        subsections: [
          {
            title: "เว็บไซต์หลายภาษาและหลายสาขา",
            paragraphs: [
              "เราออกแบบโครงสร้างที่รองรับการเพิ่มภาษาและสาขาในอนาคต ช่วยให้การขยายธุรกิจทำได้อย่างต่อเนื่องโดยไม่ต้องเริ่มใหม่",
            ],
          },
        ],
      },
      {
        h2: "ขั้นตอนทำงานที่เป็นระบบ",
        paragraphs: [
          "ขั้นตอนของเราเริ่มจากการเก็บความต้องการอย่างละเอียด วิเคราะห์เป้าหมายธุรกิจ คู่แข่ง และกลุ่มลูกค้าหลัก จากนั้นจึงจัดทำโครงร่างเว็บไซต์และสถาปัตยกรรมข้อมูล พร้อมออกแบบ UX/UI ให้สอดคล้องกับแบรนด์ เมื่อการออกแบบได้รับการยืนยัน ทีมพัฒนาจะเริ่มสร้างเว็บไซต์ด้วยมาตรฐานโค้ดที่รองรับความเร็วและ SEO",
          "หลังจากพัฒนาเสร็จ เราทดสอบการใช้งานจริงในหลายอุปกรณ์ ตรวจสอบความเร็ว ความปลอดภัย และความครบถ้วนของเนื้อหา ก่อนส่งมอบและสอนการใช้งานที่จำเป็น พร้อมแนะนำแนวทางการดูแลคอนเทนต์และการปรับปรุงในอนาคต",
          "กระบวนการทั้งหมดถูกออกแบบให้ตรวจสอบได้เป็นขั้นตอน ลูกค้ารับรู้ความคืบหน้าชัดเจนและสามารถให้ข้อเสนอแนะได้อย่างมีระบบ ซึ่งช่วยลดความเสี่ยงของการตีความผิดพลาดและทำให้การส่งมอบเป็นไปตามแผนงาน",
        ],
      },
      {
        h2: "สิ่งที่ลูกค้าจะได้รับ",
        paragraphs: [
          "คุณจะได้รับเว็บไซต์ที่พร้อมใช้งานเชิงธุรกิจ โครงสร้างเนื้อหาที่ชัดเจน ดีไซน์ที่สื่อสารแบรนด์อย่างมีระดับ และระบบที่รองรับการขยายต่อ เราช่วยวางระบบพื้นฐานของ SEO เช่นโครงสร้างหัวข้อที่ถูกต้อง การจัดลำดับเนื้อหา และความเร็วในการโหลด เพื่อให้เว็บไซต์มีโอกาสติดอันดับค้นหาที่ดีขึ้น",
          "นอกจากนี้ยังได้รับการดูแลหลังส่งมอบ เช่น การตรวจสอบประสิทธิภาพ การปรับปรุงตามข้อเสนอแนะ และคำปรึกษาเชิงกลยุทธ์ เพื่อให้เว็บไซต์ทำงานได้เต็มประสิทธิภาพและสอดคล้องกับเป้าหมายธุรกิจในระยะยาว",
          "หากคุณต้องการเชื่อมต่อระบบภายใน เช่น CRM หรือระบบรายงาน ทีมของเราสามารถวางแผนการต่อยอดได้ตั้งแต่ต้น เพื่อให้เว็บไซต์กลายเป็นศูนย์กลางข้อมูลและการสื่อสารขององค์กรอย่างแท้จริง",
        ],
      },
    ],
    faq: [
      {
        q: "ระยะเวลาในการทำเว็บไซต์ใช้เวลานานเท่าไหร่",
        a: "โดยทั่วไปใช้เวลา 4-8 สัปดาห์ขึ้นอยู่กับขนาดและความซับซ้อนของเว็บไซต์ รวมถึงความพร้อมของเนื้อหาและการอนุมัติในแต่ละขั้นตอน",
      },
      {
        q: "สามารถปรับแต่งเว็บไซต์ต่อในอนาคตได้หรือไม่",
        a: "ได้ เราออกแบบโครงสร้างให้รองรับการขยาย เช่น เพิ่มหน้า เพิ่มภาษา หรือเชื่อมต่อระบบอื่น ๆ ได้ตามแผนธุรกิจ",
      },
      {
        q: "บริการครอบคลุม SEO ด้วยหรือไม่",
        a: "ครอบคลุมโครงสร้าง SEO พื้นฐานและคำแนะนำการจัดเนื้อหา เพื่อให้เว็บไซต์พร้อมต่อยอดการทำอันดับค้นหาในระยะยาว",
      },
      {
        q: "หลังส่งมอบมีการดูแลต่อหรือไม่",
        a: "มีบริการดูแลหลังส่งมอบ เช่น ตรวจสอบประสิทธิภาพและให้คำปรึกษา พร้อมแพ็กเกจดูแลรายเดือนตามความต้องการ",
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
      { label: "รับทำเว็บไซต์" },
    ],
  },
  en: {
    meta: {
      title: "Professional Website Development | CUTTING POINT TECH",
      description:
        "Professional website development for organizations that need credibility, SEO readiness, and scalable architecture, delivered end-to-end by CUTTING POINT TECH.",
    },
    hero: {
      title: "Professional website development for brands that demand credibility",
      subtitle:
        "Strategic, premium websites designed to build trust, generate leads, and scale with your business.",
    },
    benefits: [
      "Strategic UX and content flow designed to increase conversions",
      "SEO-ready architecture and high-performance delivery",
      "Premium design aligned with brand positioning",
      "Post-launch support with business guidance",
    ],
    sections: [
      {
        h2: "Why professional website development starts with strategy",
        paragraphs: [
          "Website development is not just design. It is the digital foundation of your business. At CUTTING POINT TECH, we begin with strategy: business goals, customer expectations, and competitive positioning. This ensures your website communicates value clearly and supports measurable outcomes such as inquiries, qualified leads, and conversions.",
          "We translate strategy into user journeys and information architecture, mapping how visitors discover your brand and make decisions. Clear messaging, persuasive structure, and focused calls to action help your site perform as a true growth channel rather than a static brochure.",
          "With a strong foundation, design and development become more precise. The result is a scalable platform that can grow with new services, languages, and integrations without rework, saving time and cost over the long term.",
          "We also align content planning with SEO priorities, ensuring each page supports search visibility while still communicating real business value. This balance helps you build long-term organic growth without relying solely on ads.",
        ],
        subsections: [
          {
            title: "Corporate websites / business websites",
            paragraphs: [
              "Clear navigation and structured content help prospects understand your value quickly and guide them to the next step, whether it is an inquiry or a meeting request.",
            ],
          },
          {
            title: "Professional team and post-launch care",
            paragraphs: [
              "Ongoing guidance and performance reviews ensure your website keeps delivering results as your business evolves.",
            ],
          },
        ],
      },
      {
        h2: "Who this service is for",
        paragraphs: [
          "Our website development service is ideal for organizations that require a premium brand presence, executives who need clear positioning and credibility, and businesses that want measurable results from digital channels. Whether you are rebranding, launching a new business site, or expanding to multiple locations, we build with growth in mind.",
          "It also fits companies that take SEO seriously and plan long-term content marketing. We structure content to scale, making future pages and articles easier to rank and manage while maintaining a consistent brand story.",
          "If your team needs a clear process and an accountable partner, our approach provides transparency, predictable timelines, and documentation that supports future updates and internal alignment.",
        ],
        subsections: [
          {
            title: "Multilingual and multi-branch readiness",
            paragraphs: [
              "We build structures that are ready for future expansion to additional languages and locations without rebuilding the foundation.",
            ],
          },
        ],
      },
      {
        h2: "A structured workflow you can rely on",
        paragraphs: [
          "We start with discovery and requirement analysis, followed by content architecture and UX/UI design that aligns with your brand. After approval, we develop with performance and SEO best practices, then test across devices and browsers before launch.",
          "Post-launch, we provide guidance and support, including performance checks, content advice, and improvements to keep the website effective as your business evolves.",
          "You remain involved at key checkpoints, ensuring the outcome reflects your business priorities while keeping the process efficient and structured.",
        ],
      },
      {
        h2: "What you will receive",
        paragraphs: [
          "You receive a website that is ready for real business use: clear messaging, premium design, strong technical foundations, and SEO-friendly structure. Our delivery includes readiness for future expansion and guidance on content priorities.",
          "We also provide post-launch support options so your site remains secure, fast, and aligned with your business objectives over time.",
          "If you need integration planning or future feature additions, we help prepare a roadmap so your website continues to deliver value beyond launch.",
        ],
      },
    ],
    faq: [
      {
        q: "How long does a website project typically take?",
        a: "Most projects take 4-8 weeks depending on scope, content readiness, and approval cycles.",
      },
      {
        q: "Can the website be expanded in the future?",
        a: "Yes. We design flexible architecture to support new pages, languages, and integrations.",
      },
      {
        q: "Is SEO included?",
        a: "We deliver SEO-ready structure and content guidance so the site is ready for long-term ranking growth.",
      },
      {
        q: "Do you provide post-launch support?",
        a: "Yes. We offer ongoing support, performance reviews, and optional monthly care packages.",
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
      { label: "Website Development" },
    ],
  },
} satisfies Record<"th" | "en", ContentLocale>;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const localeKey = locale === "lo" ? "en" : locale;
  const data = content[localeKey].meta;
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/services/website`;

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: data.title },
    description: data.description,
    alternates: { canonical: "/services/website" },
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

export default async function WebsiteServicePage() {
  const locale = await getRequestedLocale();
  const localeKey = locale === "lo" ? "en" : locale;
  const data = content[localeKey];
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/services/website`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <StructuredData
        locale={locale}
        service={{
          name: data.meta.title,
          description: data.meta.description,
          serviceType:
            localeKey === "th" ? "รับทำเว็บไซต์ระดับมืออาชีพ" : "Website Development",
          url,
        }}
        faqs={data.faq.map((item) => ({ question: item.q, answer: item.a }))}
        breadcrumbs={[
          { name: data.crumbs[0].label, item: `${baseUrl}/` },
          { name: data.crumbs[1].label, item: `${baseUrl}/services` },
          { name: data.crumbs[2].label, item: `${baseUrl}/services/website` },
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
                href="/estimate?service=website"
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
              ? "คำถามที่ลูกค้าสอบถามบ่อยเกี่ยวกับบริการรับทำเว็บไซต์"
              : "Common questions about professional website development."}
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
                  ? "สำรวจบริการอื่นที่ช่วยเสริมศักยภาพธุรกิจของคุณ"
                  : "Explore other services that complement your growth."}
              </p>
            </div>
            <Link href="/" className="text-sm font-semibold text-blue-700">
              {localeKey === "th" ? "กลับหน้าแรก" : "Back to home"}
            </Link>
          </div>
          <div className="mt-8">
            <ServiceLinks locale={locale} current="website" />
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


