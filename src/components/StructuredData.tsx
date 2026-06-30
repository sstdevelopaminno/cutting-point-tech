import type { Locale } from "@/lib/locale";

type BreadcrumbItem = {
  name: string;
  item: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type ServiceSchema = {
  name: string;
  description: string;
  serviceType: string;
  url: string;
};

type StructuredDataProps = {
  locale: Locale;
  includeGlobal?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  service?: ServiceSchema;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointtech.vercel.app";

const CONTACT = {
  email: "cuttingpointtech@gmail.com",
  phoneLocal: "0843374982",
  phoneE164: "+66843374982",
  line: "https://line.me/R/ti/p/@974qhtym",
} as const;

const companyInfo = {
  th: {
    name: "บริษัท คัตติ้งพอยท์ เทค จำกัด",
    alternateName: "CUTTING POINT TECH COMPANY LIMITED",
    description:
      "บริษัท คัตติ้งพอยท์ เทค จำกัด ให้บริการพัฒนาเว็บไซต์ ระบบธุรกิจ และโซลูชันดิจิทัลสำหรับองค์กรที่ต้องการความน่าเชื่อถือ ประสิทธิภาพ และการเติบโตระยะยาว",
  },
  en: {
    name: "CUTTING POINT TECH COMPANY LIMITED",
    alternateName: "บริษัท คัตติ้งพอยท์ เทค จำกัด",
    description:
      "CUTTING POINT TECH COMPANY LIMITED builds professional websites, business systems, and digital solutions for organizations that need credibility, performance, and long-term growth.",
  },
  lo: {
    name: "CUTTING POINT TECH COMPANY LIMITED",
    alternateName: "บริษัท คัตติ้งพอยท์ เทค จำกัด",
    description:
      "CUTTING POINT TECH COMPANY LIMITED provides professional website development and business system solutions for growing organizations.",
  },
};
function uniqueGraphId(id: string) {
  return id.replace(/\/+$/, "");
}

export default function StructuredData({
  locale,
  includeGlobal = false,
  breadcrumbs,
  faqs,
  service,
}: StructuredDataProps) {
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const info = companyInfo[locale];
  const graph: Record<string, unknown>[] = [];

  const organizationId = `${baseUrl}/#organization`;
  const websiteId = `${baseUrl}/#website`;

  const ensureOrganization = (mode: "minimal" | "full") => {
    const exists = graph.some(
      (node) => typeof node["@id"] === "string" && node["@id"] === organizationId
    );
    if (exists) {
      return;
    }

    const baseOrg = {
      "@type": "Organization",
      "@id": organizationId,
      name: info.name,
      alternateName: info.alternateName,
      url: `${baseUrl}/`,
      description: info.description,
      email: CONTACT.email,
      telephone: CONTACT.phoneE164,
      sameAs: [CONTACT.line],
    };

    graph.push(
      mode === "full"
        ? {
            ...baseOrg,
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: CONTACT.phoneE164,
                contactType: "customer support",
                email: CONTACT.email,
                availableLanguage: ["th", "en", "lo"],
              },
            ],
          }
        : baseOrg
    );
  };

  if (includeGlobal) {
    ensureOrganization("full");
    graph.push({
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#localbusiness`,
      name: info.name,
      alternateName: info.alternateName,
      url: `${baseUrl}/`,
      description: info.description,
      telephone: CONTACT.phoneE164,
      email: CONTACT.email,
      sameAs: [CONTACT.line],
      areaServed: {
        "@type": "Country",
        name: "Thailand",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "บ้านเลขที่ 66/497 หมู่บ้านคันทรีพาร์ค 14 หมู่ 5 ซอย 2 ถนนปทุมธานีลาดหลุมแก้ว ตำบลบางเตย อำเภอสามโคก",
        addressLocality: "สามโคก",
        addressRegion: "ปทุมธานี",
        postalCode: "12160",
        addressCountry: "TH",
      },
    });
    graph.push({
      "@type": "WebSite",
      "@id": websiteId,
      url: `${baseUrl}/`,
      name: "CUTTING POINT TECH COMPANY LIMITED",
      publisher: { "@id": organizationId },
      inLanguage: locale,
    });
  }

  if (service) {
    ensureOrganization(includeGlobal ? "full" : "minimal");

    const serviceUrl = uniqueGraphId(service.url);
    graph.push({
      "@type": "Service",
      "@id": `${serviceUrl}#service`,
      name: service.name,
      description: service.description,
      serviceType: service.serviceType,
      provider: { "@id": organizationId },
      areaServed: {
        "@type": "Country",
        name: "Thailand",
      },
      url: serviceUrl,
    });
  }

  const pageUrl =
    uniqueGraphId(service?.url ?? breadcrumbs?.[breadcrumbs.length - 1]?.item ?? `${baseUrl}/`) ||
    `${baseUrl}/`;

  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faqpage`,
      url: pageUrl,
      name:
        service?.name ??
        (locale === "th" ? "คำถามที่พบบ่อย | CUTTING POINT TECH" : "FAQ | CUTTING POINT TECH COMPANY LIMITED"),
      isPartOf: { "@id": websiteId },
      inLanguage: locale,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  if (breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    });
  }

  if (service || breadcrumbs?.length || faqs?.length) {
    ensureOrganization(includeGlobal ? "full" : "minimal");

    if (includeGlobal) {
      // `WebSite` is already included above.
    } else {
      graph.push({
        "@type": "WebSite",
        "@id": websiteId,
        url: `${baseUrl}/`,
        name: "CUTTING POINT TECH COMPANY LIMITED",
        publisher: { "@id": organizationId },
        inLanguage: locale,
      });
    }

    graph.push({
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: service?.name ?? info.name,
      isPartOf: { "@id": websiteId },
      about: service ? { "@id": `${uniqueGraphId(service.url)}#service` } : undefined,
      breadcrumb: breadcrumbs?.length ? { "@id": `${pageUrl}#breadcrumb` } : undefined,
      inLanguage: locale,
    });
  }

  if (!graph.length) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
