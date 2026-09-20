import type { Metadata } from "next";
import { Noto_Sans_Lao, Noto_Sans_Thai, Noto_Serif_Lao, Noto_Serif_Thai } from "next/font/google";
import Analytics from "@/components/Analytics";
import ImageProtection from "@/components/ImageProtection";
import SiteShell from "@/components/SiteShell";
import StructuredData from "@/components/StructuredData";
import { getRequestedLocale, type Locale } from "@/lib/locale";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-sans-thai",
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-serif-thai",
  weight: ["400", "600", "700"],
  display: "swap",
});

const notoSansLao = Noto_Sans_Lao({
  subsets: ["latin", "lao"],
  variable: "--font-sans-lao",
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoSerifLao = Noto_Serif_Lao({
  subsets: ["latin", "lao"],
  variable: "--font-serif-lao",
  weight: ["400", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointinnovation.vercel.app";

const metadataByLocale: Record<
  Locale,
  {
    title: string;
    description: string;
    ogLocale: string;
    alternateLocales: string[];
  }
> = {
  th: {
    title: "บริษัท คัตติ้ง พอยท์ อินโนเวชั่น จำกัด | เว็บไซต์และระบบบริหารธุรกิจครบวงจร",
    description:
      "บริษัท คัตติ้ง พอยท์ อินโนเวชั่น จำกัด (CUTTING POINT INNOVATION CO., LTD.) ให้บริการรับทำเว็บไซต์ ระบบ POS ระบบจองที่พัก คลาวด์ และระบบบริหารธุรกิจครบวงจร สำหรับองค์กร ร้านค้า ร้านอาหาร โรงแรม และรีสอร์ทที่ต้องการความน่าเชื่อถือ ประสิทธิภาพ และการเติบโตระยะยาว",
    ogLocale: "th_TH",
    alternateLocales: ["en_US", "lo_LA"],
  },
  en: {
    title: "CUTTING POINT INNOVATION CO., LTD. | Websites and Business Systems",
    description:
      "CUTTING POINT INNOVATION CO., LTD. builds professional websites, business systems, and digital solutions for organizations that need credibility, performance, and long-term growth.",
    ogLocale: "en_US",
    alternateLocales: ["th_TH"],
  },
  lo: {
    title: "CUTTING POINT INNOVATION CO., LTD. | Website and Business Systems",
    description:
      "CUTTING POINT INNOVATION CO., LTD. provides professional website development and business system solutions for growing organizations.",
    ogLocale: "lo_LA",
    alternateLocales: ["th_TH", "en_US"],
  },
};
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const meta = metadataByLocale[locale];
  const metadataBase = new URL(SITE_URL);

  return {
    metadataBase,
    title: {
      default: meta.title,
      template: "%s | CUTTING POINT INNOVATION",
    },
    description: meta.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: meta.ogLocale,
      alternateLocale: meta.alternateLocales,
      type: "website",
      url: "/",
      siteName: "CUTTING POINT INNOVATION CO., LTD.",
    },
    icons: {
      icon: [{ url: "/brand/logo-icon.png", type: "image/png" }],
      shortcut: "/brand/logo-icon.png",
      apple: "/brand/logo-icon.png",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestedLocale();

  return (
    <html lang={locale}>
      <body
        className={`${notoSansThai.variable} ${notoSerifThai.variable} ${notoSansLao.variable} ${notoSerifLao.variable} antialiased`}
      >
        <StructuredData locale={locale} includeGlobal />
        <Analytics />
        <ImageProtection />
        <SiteShell initialLang={locale}>{children}</SiteShell>
      </body>
    </html>
  );
}
