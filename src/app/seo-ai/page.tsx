import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Bot,
  Gauge,
  LineChart,
  MousePointerClick,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import StructuredData from "@/components/StructuredData";
import { getRequestedLocale } from "@/lib/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cutting-point-tech.vercel.app";

type LocaleContent = {
  meta: { title: string; description: string };
  crumbs: { label: string; href?: string }[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctas: { primary: string; secondary: string };
  };
  highlightsTitle: string;
  highlightsLead: string;
  highlights: {
    title: string;
    description: string;
    icon: "search" | "speed" | "content" | "cro" | "genai" | "insight";
  }[];
  split: {
    onpageTitle: string;
    onpagePercent: string;
    offpageTitle: string;
    offpagePercent: string;
    body: string;
  };
  principles: {
    leftTitle: string;
    leftBody: string;
    rightTitle: string;
    rightBody: string;
  };
  advanced: {
    leftTitle: string;
    leftBody: string;
    rightTitle: string;
    rightBody: string;
  };
  problemsTitle: string;
  problems: {
    title: string;
    subtitle: string;
    icon:
      | "rank"
      | "content"
      | "speed"
      | "error"
      | "social"
      | "genai"
      | "tools"
      | "report";
  }[];
  learn: {
    title: string;
    body: string;
    ctaArticles: string;
    ctaContact: string;
  };
};

const content: Record<"th" | "en", LocaleContent> = {
  th: {
    meta: {
      title: "AI SEO | CUTTING POINT TECH",
      description:
        "บริการ AI SEO สำหรับเว็บไซต์องค์กร: On-page SEO, CRO, Generative AI Optimization และรายงานเชิงลึก เพื่อเพิ่มโอกาสติดหน้าแรก Google อย่างยั่งยืน",
    },
    crumbs: [
      { label: "หน้าแรก", href: "/" },
      { label: "จุดเด่น", href: "/#features" },
      { label: "SEO AI" },
    ],
    hero: {
      eyebrow: "SEO คืออะไร?",
      title: "อยากให้เว็บไซต์ติดหน้าแรก Google ต้องรู้!",
      subtitle:
        "SEO (Search Engine Optimization) คือการทำให้เว็บไซต์ของคุณมีคุณภาพและประสิทธิภาพในระยะยาว เพื่อให้ติดอันดับได้ดีขึ้นบน Google เมื่อมีคนค้นหาด้วยคีย์เวิร์ดที่เกี่ยวข้องกับสินค้าหรือบริการของคุณ ช่วยเพิ่ม Traffic ที่เป็นกลุ่มเป้าหมาย และเปลี่ยนเป็นโอกาสทางธุรกิจได้มากขึ้น",
      ctas: { primary: "ปรึกษา SEO ฟรี", secondary: "อ่านบทความ SEO" },
    },
    highlightsTitle: "จุดเด่นของ AI SEO",
    highlightsLead:
      "เราโฟกัส On-page เป็นหลักเพื่อให้เว็บแข็งแรงจากภายใน และเสริมด้วยกลยุทธ์ภายนอกอย่างเป็นธรรมชาติ พร้อมเครื่องมือและรายงานที่ช่วยตัดสินใจได้เร็วขึ้น",
    highlights: [
      {
        title: "เพิ่มคุณภาพเว็บไซต์ (On-Page SEO)",
        description:
          "ปรับโครงสร้าง เนื้อหา ความเร็ว และ UX ให้ Google เข้าใจง่ายและผู้ใช้ใช้งานดี",
        icon: "search",
      },
      {
        title: "เสริมความน่าเชื่อถือ (Off-Page SEO)",
        description:
          "สร้างสัญญาณความน่าเชื่อถือจากภายนอกอย่างเป็นธรรมชาติ ลดความเสี่ยงสายเทา",
        icon: "content",
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description:
          "ปรับหน้าและจุดกดเพื่อเพิ่มโอกาสเปลี่ยนผู้ชมเป็นลูกค้า โดยไม่พึ่งโฆษณาเพิ่ม",
        icon: "cro",
      },
      {
        title: "Generative AI Optimization",
        description:
          "ทำคอนเทนต์ให้ตอบโจทย์ AI Search และสร้างโครงสร้างข้อมูลให้สรุปได้ง่าย",
        icon: "genai",
      },
      {
        title: "วิเคราะห์เชิงลึก + Insight",
        description:
          "ติดตาม Keyword/Traffic/Behavior ผ่าน Dashboard และสรุปสิ่งที่ควรทำต่อทันที",
        icon: "insight",
      },
      {
        title: "ความเร็วและมาตรฐาน",
        description:
          "โฟกัส Core Web Vitals, HTTPS, และโครงสร้างที่รองรับการเติบโตระยะยาว",
        icon: "speed",
      },
    ],
    split: {
      onpageTitle: "On-Page SEO",
      onpagePercent: "90%",
      offpageTitle: "Off-Page SEO",
      offpagePercent: "10%",
      body:
        "เราให้ความสำคัญกับ On-page 90% เพื่อพัฒนาเว็บไซต์ให้แข็งแรงทั้งด้านเนื้อหา โครงสร้าง และการใช้งาน แล้วค่อยเสริม Off-page 10% เพื่อเพิ่มความน่าเชื่อถืออย่างเป็นธรรมชาติ",
    },
    principles: {
      leftTitle: "เราทำ SEO ตามหลักการ Google (White Hat SEO)",
      leftBody:
        "SEO สายขาวคือการทำการตลาดบนเว็บไซต์ที่ถูกต้องตามแนวทางของ Google เน้นคุณค่าต่อผู้ใช้งานจริง ปรับโครงสร้าง/เนื้อหา/ความเร็ว และใช้คีย์เวิร์ดอย่างเป็นธรรมชาติ เพื่อการเติบโตอย่างยั่งยืน",
      rightTitle: "เน้นการเปลี่ยนผู้ชมเป็นผู้ซื้อ (CRO)",
      rightBody:
        "เราไม่ทำ SEO เพื่อดึงคนเข้าเว็บอย่างเดียว แต่ปรับ CRO เพื่อให้อัตราเปลี่ยนผู้ชมเป็นลูกค้าเพิ่มขึ้น ผ่านการออกแบบหน้า การวาง CTA และ UX ที่ชัดเจน",
    },
    advanced: {
      leftTitle:
        "ช่วยให้เว็บไซต์เป็นคำตอบของ Generative AI (GenAI Optimization)",
      leftBody:
        "ปรับโครงสร้างเนื้อหาให้ตอบคำถามตรงจุด ทำหัวข้อ/สรุป/FAQ และข้อมูลแบบมีบริบท เพื่อให้ AI Search เข้าใจและนำไปสรุปได้ดีขึ้น",
      rightTitle: "เน้นการวิเคราะห์ข้อมูลเชิงลึกพร้อม Insight ที่มีคุณค่า",
      rightBody:
        "รายงานความสำเร็จของเว็บไซต์ผ่าน Dashboard ที่สรุปข้อมูลสำคัญ เช่น ผู้เข้าชม แหล่งที่มา Traffic และพฤติกรรมการใช้งาน เพื่อให้คุณตัดสินใจได้เร็ว ไม่ต้องรอรายงานรายเดือน",
    },
    problemsTitle: "เว็บไซต์ของคุณเจอปัญหาเหล่านี้หรือไม่?",
    problems: [
      {
        title: "Keyword Ranking ไม่อยู่หน้า Top 10",
        subtitle: "คีย์เวิร์ดหลักไม่ติดอันดับ",
        icon: "rank",
      },
      {
        title: "เว็บไซต์สวย แต่ไม่มีเนื้อหา",
        subtitle: "ขาดคอนเทนต์ที่ตอบโจทย์ค้นหา",
        icon: "content",
      },
      {
        title: "หน้าเว็บโหลดช้า",
        subtitle: "Core Web Vitals ไม่ผ่าน",
        icon: "speed",
      },
      {
        title: "มีหน้า Error 404",
        subtitle: "ลิงก์เสีย กระทบ SEO",
        icon: "error",
      },
      {
        title: "Social Media ไม่แข็งแรง",
        subtitle: "สัญญาณแบรนด์ไม่ชัด",
        icon: "social",
      },
      {
        title: "GenAI ยังไม่รู้จักเว็บไซต์",
        subtitle: "โครงสร้างข้อมูลไม่ชัด",
        icon: "genai",
      },
      {
        title: "ขาดเครื่องมือวัดผล SEO",
        subtitle: "ไม่รู้ว่าอะไรทำงานอยู่",
        icon: "tools",
      },
      {
        title: "ไม่มี Report ต่อเนื่อง",
        subtitle: "ปรับปรุงไม่ทันเกม",
        icon: "report",
      },
    ],
    learn: {
      title: "อยากเริ่มทำ SEO ให้ถูกทาง?",
      body:
        "เริ่มจากบทความของเราเพื่อทำความเข้าใจแนวคิด SEO/Content/CRO และแนวทางการตลาดที่เหมาะกับธุรกิจของคุณ แล้วค่อยนัดคุยเพื่อวางแผนแบบเป็นระบบ",
      ctaArticles: "ไปที่บทความ",
      ctaContact: "ขอคำปรึกษา",
    },
  },
  en: {
    meta: {
      title: "AI SEO | CUTTING POINT TECH",
      description:
        "AI SEO for corporate websites: on-page SEO, CRO, Generative AI Optimization, and actionable analytics to improve Google visibility sustainably.",
    },
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Highlights", href: "/#features" },
      { label: "SEO AI" },
    ],
    hero: {
      eyebrow: "What is SEO?",
      title: "Want to rank on Google’s first page? Here’s what matters.",
      subtitle:
        "SEO (Search Engine Optimization) improves your website’s quality and long-term performance so it can rank higher on Google for keywords related to your products or services. The result: more qualified traffic and more business opportunities—not just page views.",
      ctas: { primary: "Free SEO consultation", secondary: "Read SEO articles" },
    },
    highlightsTitle: "AI SEO highlights",
    highlightsLead:
      "We prioritize on-page strength first, then reinforce with safe off-page signals—combined with reporting and insights that help you decide faster.",
    highlights: [
      {
        title: "On-page SEO quality upgrades",
        description:
          "Structure, content, speed, and UX tuned for both Google and real users.",
        icon: "search",
      },
      {
        title: "Off-page trust signals",
        description: "Natural credibility growth—no risky gray-hat tactics.",
        icon: "content",
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description:
          "Turn visits into inquiries with clearer UX and higher-intent journeys.",
        icon: "cro",
      },
      {
        title: "Generative AI Optimization",
        description:
          "Content and information structure built for AI search summaries and answers.",
        icon: "genai",
      },
      {
        title: "Deep analytics + insights",
        description:
          "Dashboard-style reporting for keywords, traffic, and behavior—with next steps.",
        icon: "insight",
      },
      {
        title: "Speed & standards",
        description:
          "Core Web Vitals, HTTPS, and scalable architecture for long-term growth.",
        icon: "speed",
      },
    ],
    split: {
      onpageTitle: "On-Page SEO",
      onpagePercent: "90%",
      offpageTitle: "Off-Page SEO",
      offpagePercent: "10%",
      body:
        "We focus 90% on strengthening your website from the inside—content, structure, and usability—then add 10% off-page to improve credibility naturally.",
    },
    principles: {
      leftTitle: "White-hat SEO aligned with Google guidelines",
      leftBody:
        "We follow best practices: real user value, clear structure, helpful content, and natural keyword usage. This builds sustainable rankings instead of short-term spikes.",
      rightTitle: "Conversion-focused (CRO)",
      rightBody:
        "SEO is not only about traffic. We optimize your pages and CTAs so visitors become leads—without increasing ad spend.",
    },
    advanced: {
      leftTitle: "Be the best answer for Generative AI (GenAI Optimization)",
      leftBody:
        "We restructure content for clarity: headings, summaries, FAQs, and contextual information so AI search can understand and cite your pages more effectively.",
      rightTitle: "Actionable insights through analytics",
      rightBody:
        "Track performance with a dashboard mindset—traffic sources, behavior, and keyword movement—so decisions happen weekly, not once per month.",
    },
    problemsTitle: "Is your website facing these issues?",
    problems: [
      { title: "Keywords not in Top 10", subtitle: "Core keywords don’t rank", icon: "rank" },
      { title: "Beautiful site, weak content", subtitle: "Not answering search intent", icon: "content" },
      { title: "Slow pages", subtitle: "Core Web Vitals fail", icon: "speed" },
      { title: "404 errors", subtitle: "Broken links hurt SEO", icon: "error" },
      { title: "Weak social signals", subtitle: "Brand signals unclear", icon: "social" },
      { title: "GenAI doesn’t recognize you", subtitle: "Information structure unclear", icon: "genai" },
      { title: "No measurement tools", subtitle: "Hard to know what works", icon: "tools" },
      { title: "No continuous reporting", subtitle: "Improvements lag behind", icon: "report" },
    ],
    learn: {
      title: "Ready to do SEO the right way?",
      body:
        "Start with our articles to understand SEO, content, and CRO. Then book a call to build a structured plan tailored to your business.",
      ctaArticles: "Go to articles",
      ctaContact: "Contact us",
    },
  },
};

function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.8)] backdrop-blur">
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
          <div className="h-8 w-8 rounded-xl bg-white/15" />
          <div className="h-3 w-40 rounded bg-white/15" />
          <div className="ml-auto h-8 w-8 rounded-xl bg-white/15" />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-100">
              <Search className="h-4 w-4" />
              Keywords
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-3 w-4/5 rounded bg-white/15" />
              <div className="h-3 w-3/5 rounded bg-white/15" />
              <div className="h-3 w-2/3 rounded bg-white/15" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-100">
              <LineChart className="h-4 w-4" />
              Growth
            </div>
            <div className="mt-4 flex items-end gap-2">
              <div className="h-8 w-3 rounded bg-white/15" />
              <div className="h-12 w-3 rounded bg-white/15" />
              <div className="h-6 w-3 rounded bg-white/15" />
              <div className="h-14 w-3 rounded bg-white/15" />
              <div className="h-10 w-3 rounded bg-white/15" />
              <div className="h-16 w-3 rounded bg-white/20" />
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-xs text-blue-100">
            <span className="uppercase tracking-[0.3em]">AI Summary</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em]">
              Ready
            </span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-3 w-11/12 rounded bg-white/15" />
            <div className="h-3 w-10/12 rounded bg-white/15" />
            <div className="h-3 w-8/12 rounded bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}

function iconForHighlight(key: LocaleContent["highlights"][number]["icon"]) {
  switch (key) {
    case "search":
      return Search;
    case "speed":
      return Gauge;
    case "content":
      return ShieldCheck;
    case "cro":
      return MousePointerClick;
    case "genai":
      return Bot;
    case "insight":
      return BarChart3;
    default:
      return Sparkles;
  }
}

function iconForProblem(key: LocaleContent["problems"][number]["icon"]) {
  switch (key) {
    case "rank":
      return Search;
    case "content":
      return Sparkles;
    case "speed":
      return Gauge;
    case "error":
      return ShieldCheck;
    case "social":
      return MousePointerClick;
    case "genai":
      return Bot;
    case "tools":
      return BarChart3;
    case "report":
      return LineChart;
    default:
      return Sparkles;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const contentLocale = locale === "lo" ? "en" : locale;
  const data = content[contentLocale];

  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: `${SITE_URL.replace(/\/+$/, "")}/seo-ai` },
  };
}

export default async function SeoAiPage() {
  const locale = await getRequestedLocale();
  const contentLocale = locale === "lo" ? "en" : locale;
  const data = content[contentLocale];
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/seo-ai`;

  return (
    <main className="bg-white">
      <StructuredData
        locale={locale}
        breadcrumbs={[
          { name: locale === "th" ? "หน้าแรก" : "Home", item: `${baseUrl}/` },
          { name: "SEO AI", item: url },
        ]}
        service={{
          name: locale === "th" ? "SEO AI" : "AI SEO",
          description: data.meta.description,
          serviceType: "SEO",
          url,
        }}
      />

      <section className="border-b border-slate-200 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Breadcrumbs items={data.crumbs} />
            <p className="text-sm font-semibold text-blue-100">{data.hero.eyebrow}</p>
            <h1 className="font-[var(--font-heading)] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {data.hero.title}
            </h1>
            <p className="max-w-xl text-base text-blue-100 md:text-lg">{data.hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold text-slate-900 shadow-lg"
              >
                {data.hero.ctas.primary}
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold text-white"
              >
                {data.hero.ctas.secondary}
              </Link>
            </div>
          </div>
          <HeroIllustration />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl space-y-10 px-6">
          <div className="text-center">
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
              {data.highlightsTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-600">{data.highlightsLead}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8 shadow-card-soft">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                  {data.split.onpageTitle}
                </p>
                <p className="mt-2 text-4xl font-semibold text-slate-900">
                  {data.split.onpagePercent}{" "}
                  <span className="text-xl font-semibold text-slate-500">
                    + {data.split.offpageTitle} {data.split.offpagePercent}
                  </span>
                </p>
                <p className="mt-4 text-slate-600">{data.split.body}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>Google</span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                    AI SEO
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-3 w-11/12 rounded bg-slate-100" />
                  <div className="h-3 w-10/12 rounded bg-slate-100" />
                  <div className="h-3 w-9/12 rounded bg-slate-100" />
                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Organic CTR</span>
                      <span className="font-semibold text-emerald-700">+10%</span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded bg-slate-200">
                      <div className="h-2 w-2/3 rounded bg-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {data.highlights.map((item) => {
              const Icon = iconForHighlight(item.icon);
              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card-soft">
            <h3 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
              {data.principles.leftTitle}
            </h3>
            <p className="mt-4 text-slate-600">{data.principles.leftBody}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card-soft">
            <h3 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
              {data.principles.rightTitle}
            </h3>
            <p className="mt-4 text-slate-600">{data.principles.rightBody}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-8 shadow-card-soft">
            <h3 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
              {data.advanced.leftTitle}
            </h3>
            <p className="mt-4 text-slate-600">{data.advanced.leftBody}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-card-soft">
            <h3 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
              {data.advanced.rightTitle}
            </h3>
            <p className="mt-4 text-slate-600">{data.advanced.rightBody}</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-semibold tracking-tight">
            {data.problemsTitle}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.problems.map((item) => {
              const Icon = iconForProblem(item.icon);
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/30 text-blue-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-base font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-200">{item.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-10 shadow-card-soft">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {data.learn.title}
                </h2>
                <p className="mt-4 text-slate-600">{data.learn.body}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/articles"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold text-white"
                  >
                    {data.learn.ctaArticles}
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-semibold text-slate-900"
                  >
                    {data.learn.ctaContact}
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  SEO + Marketing
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  {locale === "th"
                    ? "อ่านบทความเพื่อเริ่มลงมือ แล้วค่อยนัดคุยเพื่อวางแผนให้เหมาะกับธุรกิจ"
                    : "Start with articles, then book a call for a structured plan."}
                </p>
                <div className="mt-4 grid gap-3">
                  <Link
                    href="/articles"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900"
                  >
                    {locale === "th" ? "บทความ SEO" : "SEO articles"}
                  </Link>
                  <Link
                    href="/services/website"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900"
                  >
                    {locale === "th"
                      ? "บริการรับทำเว็บไซต์ (พร้อม SEO)"
                      : "Website development (SEO-ready)"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
