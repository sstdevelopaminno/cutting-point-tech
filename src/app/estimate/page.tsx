import type { Metadata } from "next";
import Link from "next/link";
import EstimateClient from "@/app/estimate/EstimateClient";
import { getRequestedLocale } from "@/lib/locale";
import { isEstimatorService } from "@/lib/estimate";
import type { EstimatorService } from "@/lib/estimateConfig";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cutting-point-tech.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const title =
    locale === "th"
      ? "คำนวณช่วงราคาเบื้องต้น | CUTTING POINT TECH"
      : locale === "lo" ? "ຄຳນວນຊ່ວງລາຄາເບື້ອງຕົ້ນ | CUTTING POINT TECH" : "Service Estimator | CUTTING POINT TECH";
  const description =
    locale === "th"
      ? "คำนวณช่วงราคาเบื้องต้นแบบ rule-based สำหรับเว็บไซต์ ระบบหอพัก/รีสอร์ท และ analytics"
      : locale === "lo"
        ? "ຄຳນວນຊ່ວງລາຄາເບື້ອງຕົ້ນແບບ rule-based ສຳລັບເວັບໄຊທ໌, ລະບົບຫໍພັກ/ຣີສອດ ແລະ analytics"
        : "Rule-based estimator for websites, dormitory systems, and analytics.";
  const baseUrl = SITE_URL.replace(/\/+$/, "");

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: title },
    description,
    alternates: { canonical: "/estimate" },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/estimate`,
      type: "website",
    },
  };
}

export default async function EstimatePage({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string }>;
}) {
  const locale = await getRequestedLocale();
  const resolvedSearchParams = (await searchParams) ?? {};
  const serviceParam = resolvedSearchParams.service ?? "website";
  const initialService: EstimatorService = isEstimatorService(serviceParam)
    ? serviceParam
    : "website";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-mist py-10">
        <div className="mx-auto w-full max-w-6xl space-y-4 px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            CUTTING POINT TECH
          </p>
          <h1 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {locale === "th" ? "คำนวณช่วงราคาเบื้องต้น" : locale === "lo" ? "ຄຳນວນຊ່ວງລາຄາເບື້ອງຕົ້ນ" : "Service Estimator"}
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            {locale === "th"
              ? "ประเมินช่วงราคาแบบรวดเร็ว และส่งข้อมูลเพื่อรับใบเสนอราคา"
              : locale === "lo"
                ? "ປະເມີນຊ່ວງລາຄາແບບຮວດໄວ ແລະ ສົ່ງຂໍ້ມູນເພື່ອຮັບໃບສະເໜີລາຄາ"
                : "Get a quick ballpark range and request a tailored quote."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700"
            >
              {locale === "th" ? "ดูบริการทั้งหมด" : locale === "lo" ? "ເບິ່ງບໍລິການທັງໝົດ" : "View services"}
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white"
            >
              {locale === "th" ? "ปรึกษาฟรี" : locale === "lo" ? "ປຶກສາຟຣີ" : "Free consultation"}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <EstimateClient initialService={initialService} locale={locale} />
        </div>
      </section>
    </main>
  );
}

