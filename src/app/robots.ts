import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointtech.vercel.app";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL.replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
