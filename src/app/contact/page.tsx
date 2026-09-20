import type { Metadata } from "next";
import ContactPageClient from "@/app/contact/ContactPageClient";
import { getRequestedLocale } from "@/lib/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointinnovation.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const baseUrl = SITE_URL.replace(/\/+$/, "");

  const title = locale === "th" ? "ติดต่อ | CUTTING POINT INNOVATION" : "Contact | CUTTING POINT INNOVATION";
  const description =
    locale === "th"
      ? "ติดต่อ CUTTING POINT INNOVATION เพื่อรับคำปรึกษาและใบเสนอราคา ทีมงานพร้อมตอบกลับโดยเร็ว"
      : "Contact CUTTING POINT INNOVATION for consultation and a tailored quote.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: title },
    description,
    alternates: { canonical: "/contact" },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/contact`,
      type: "website",
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}

