"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { estimatorConfig, type EstimatorService } from "@/lib/estimateConfig";
import { trackGaEvent } from "@/lib/ga";
import { logEvent } from "@/lib/eventLogger";
import SubmitStatusModal from "@/components/SubmitStatusModal";
import { formatLeadRef } from "@/lib/leadRef";

type EstimateResult = {
  estimateId: string | null;
  priceMin: number;
  priceMax: number;
};

type QuoteLine = {
  label: string;
  amount: number;
};

const QUOTE_LOGO_SRC =
  "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/photo_2024-09-07_00-31-28.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL3Bob3RvXzIwMjQtMDktMDdfMDAtMzEtMjguanBnIiwiaWF0IjoxNzY5OTY5ODY4LCJleHAiOjE4MDE1MDU4Njh9.95nIZMOYTC3RjJPesKQXcHcyjuQR1cpjHvKjXLryXaA";

const serviceLabelsByLocale: Record<"th" | "en" | "lo", Record<EstimatorService, string>> = {
  th: {
    website: "พัฒนาเว็บไซต์",
    dormitory: "ระบบหอพัก/รีสอร์ท",
    company: "จดทะเบียนบริษัท",
    analytics: "วิเคราะห์ข้อมูลธุรกิจ",
  },
  en: {
    website: "Website development",
    dormitory: "Dormitory system",
    company: "Company registration",
    analytics: "Business analytics",
  },
  lo: {
    website: "ພັດທະນາເວັບໄຊ",
    dormitory: "ລະບົບຫໍພັກ/ຣີສອດ",
    company: "ຈົດທະບຽນບໍລິສັດ",
    analytics: "ວິເຄາະຂໍ້ມູນທຸລະກິດ",
  },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);

export default function EstimateClient({
  initialService,
  locale,
}: {
  initialService: EstimatorService;
  locale: "th" | "en" | "lo";
}) {
  const router = useRouter();
  const REQUEST_TIMEOUT_MS = 15_000;
  const SERVICE_CHANGE_THROTTLE_MS = 300;
  const estimateInFlightRef = useRef(false);
  const leadInFlightRef = useRef(false);
  const lastServiceChangeRef = useRef(0);
  const serviceLabels = serviceLabelsByLocale[locale];

  type WebsiteFeatureKey = keyof typeof estimatorConfig.website.features;
  type DormitoryModuleKey = keyof typeof estimatorConfig.dormitory.modules;
  type CompanyAddonKey = keyof typeof estimatorConfig.company.addons;
  type ReportingKey = keyof typeof estimatorConfig.analytics.reportingFrequency;
  type DashboardKey = keyof typeof estimatorConfig.analytics.dashboards;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const websiteFeatureLabelsTh: Record<WebsiteFeatureKey, string> = {
    seo: "ตั้งค่า SEO + แนะนำคอนเทนต์",
    ecommerce: "ระบบร้านค้าออนไลน์ (แคตตาล็อก + ชำระเงิน)",
    booking: "ระบบจอง/นัดหมาย",
    multilingual: "รองรับหลายภาษา",
    crm: "เชื่อมต่อ CRM/เก็บลีด",
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dormitoryModuleLabelsTh: Record<DormitoryModuleKey, string> = {
    billing: "วางบิลอัตโนมัติ + ใบแจ้งหนี้",
    payments: "เชื่อมต่อรับชำระเงินออนไลน์",
    maintenance: "ระบบแจ้งซ่อม/ติดตามงาน",
    access: "ควบคุมการเข้าออก + ซิงก์คีย์การ์ด",
    reporting: "รายงานผู้บริหาร",
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const companyAddonLabelsTh: Record<CompanyAddonKey, string> = {
    vat: "จด VAT + จัดเตรียมระบบภาษี",
    accounting: "เตรียมระบบบัญชี + แนะแนวการบันทึกบัญชี",
    contracts: "ชุดเทมเพลตสัญญาเริ่มต้น",
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reportingLabelsTh: Record<ReportingKey, string> = {
    monthly: "รายงานรายเดือน",
    biweekly: "รายงานทุก 2 สัปดาห์",
    weekly: "รายงานรายสัปดาห์",
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dashboardLabelsTh: Record<DashboardKey, string> = {
    none: "ไม่ต้องการแดชบอร์ด",
    basic: "แดชบอร์ดผู้บริหาร (พื้นฐาน)",
    advanced: "แดชบอร์ดเรียลไทม์ + แจ้งเตือน",
  };

  const getWebsiteFeatureLabel = (key: string, fallback: string) =>
    locale === "th"
      ? websiteFeatureLabelsTh[key as WebsiteFeatureKey] ?? fallback
      : fallback;

  const getDormitoryModuleLabel = (key: string, fallback: string) =>
    locale === "th"
      ? dormitoryModuleLabelsTh[key as DormitoryModuleKey] ?? fallback
      : fallback;

  const getCompanyAddonLabel = (key: string, fallback: string) =>
    locale === "th" ? companyAddonLabelsTh[key as CompanyAddonKey] ?? fallback : fallback;

  const getReportingLabel = (key: string, fallback: string) =>
    locale === "th" ? reportingLabelsTh[key as ReportingKey] ?? fallback : fallback;

  const getDashboardLabel = (key: string, fallback: string) =>
    locale === "th" ? dashboardLabelsTh[key as DashboardKey] ?? fallback : fallback;
  const [service, setService] = useState<EstimatorService>(initialService);
  const [estimateStatus, setEstimateStatus] = useState<"idle" | "loading" | "error">(
    "idle"
  );
  const [estimateError, setEstimateError] = useState<string | null>(null);
  const [estimateResult, setEstimateResult] = useState<EstimateResult | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [websiteInputs, setWebsiteInputs] = useState<{ pages: number; features: string[] }>({
    pages: estimatorConfig.website.minPages,
    features: [] as string[],
  });
  const [dormitoryInputs, setDormitoryInputs] = useState<{ rooms: number; modules: string[] }>({
    rooms: 40,
    modules: [] as string[],
  });
  const [companyInputs, setCompanyInputs] = useState<{ addons: string[] }>({
    addons: [] as string[],
  });
  const [analyticsInputs, setAnalyticsInputs] = useState<{
    channels: number;
    reporting: keyof typeof estimatorConfig.analytics.reportingFrequency;
    dashboard: keyof typeof estimatorConfig.analytics.dashboards;
  }>({
    channels: 3,
    reporting: "monthly",
    dashboard: "basic",
  });

  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadNotice, setLeadNotice] = useState<string | null>(null);
  const [leadRef, setLeadRef] = useState<string | null>(null);
  const [leadStartedAt, setLeadStartedAt] = useState<number | null>(null);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    company: "",
  });

  const inputPayload = useMemo(() => {
    if (service === "website") {
      return { ...websiteInputs };
    }
    if (service === "dormitory") {
      return { ...dormitoryInputs };
    }
    if (service === "company") {
      return { ...companyInputs };
    }
    return { ...analyticsInputs };
  }, [service, websiteInputs, dormitoryInputs, companyInputs, analyticsInputs]);

  const fireEstimateStart = () => {
    if (hasStarted) {
      return;
    }
    setHasStarted(true);
    trackGaEvent("estimate_start", { service });
    logEvent({ eventName: "estimate_start", service });
  };

  const getNotificationWarning = (notifications: {
    email?: "sent" | "skipped" | "failed";
    line?: "sent" | "skipped" | "failed";
  } | null) => {
    if (!notifications) return null;
    const issues: string[] = [];
    if (notifications.email && notifications.email !== "sent") {
      issues.push(`Email: ${notifications.email}`);
    }
    if (notifications.line && notifications.line !== "sent") {
      issues.push(`LINE: ${notifications.line}`);
    }
    if (!issues.length) return null;
    return locale === "th"
      ? `หมายเหตุ: การแจ้งเตือนบางช่องทางยังไม่สำเร็จ (${issues.join(", ")})`
      : `Note: some notifications were not delivered (${issues.join(", ")})`;
  };

  const onServiceChange = (value: EstimatorService) => {
    const now = Date.now();
    if (value === service) {
      return;
    }
    if (now - lastServiceChangeRef.current < SERVICE_CHANGE_THROTTLE_MS) {
      return;
    }
    lastServiceChangeRef.current = now;
    setService(value);
    setEstimateResult(null);
    setEstimateError(null);
    setHasStarted(false);
    router.replace(`/estimate?service=${value}`);
  };

  const submitEstimate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (estimateInFlightRef.current || estimateStatus === "loading") {
      return;
    }
    estimateInFlightRef.current = true;
    setEstimateStatus("loading");
    setEstimateError(null);
    setLeadStatus("idle");
    setLeadError(null);
    trackGaEvent("estimate_submit", { service });

    const controller = new AbortController();
    let timeoutId: number | null = null;
    try {
      timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          inputs: inputPayload,
        }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || (locale === "th" ? "คำนวณราคาไม่สำเร็จ" : "Estimate failed"));
      }
      setEstimateResult({
        estimateId: data?.estimateId ?? null,
        priceMin: data?.priceMin ?? 0,
        priceMax: data?.priceMax ?? 0,
      });
      setLeadStatus("idle");
      setLeadError(null);
      setLeadRef(null);
      setEstimateStatus("idle");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setEstimateError(
          locale === "th"
            ? "การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง"
            : "Request timed out. Please try again."
        );
        setEstimateStatus("error");
        return;
      }
      const message =
        error instanceof Error
          ? error.message
          : locale === "th"
            ? "คำนวณราคาไม่สำเร็จ"
            : "Estimate failed";
      setEstimateError(message);
      setEstimateStatus("error");
    } finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      estimateInFlightRef.current = false;
    }
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (leadInFlightRef.current || leadStatus === "loading") {
      return;
    }
    if (!estimateResult) {
      return;
    }
    leadInFlightRef.current = true;
    setLeadFormOpen(false);
    setLeadStatus("loading");
    setLeadError(null);
    setLeadNotice(null);
    setLeadRef(null);

    const controller = new AbortController();
    let timeoutId: number | null = null;
    try {
      timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const response = await fetch("/api/estimate/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          locale,
          service,
          estimateId: estimateResult.estimateId,
          quoteRef,
          quoteSubtotal,
          quoteLines,
          priceMin: estimateResult.priceMin,
          priceMax: estimateResult.priceMax,
          startedAt: leadStartedAt,
        }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error(
          data?.error || (locale === "th" ? "ส่งข้อมูลติดต่อไม่สำเร็จ" : "Lead submission failed")
        );
      }

      const notificationWarning = getNotificationWarning(data?.notifications ?? null);
      setLeadRef(formatLeadRef(data?.leadId ?? null));
      setLeadNotice(notificationWarning);
      // Reset lead fields immediately after a successful submission.
      setLeadForm({ name: "", phone: "", email: "", message: "", company: "" });
      setLeadStartedAt(null);

      setLeadStatus("success");
      trackGaEvent("lead_submit", { service });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setLeadError(
          locale === "th"
            ? "การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง"
            : "Request timed out. Please try again."
        );
        setLeadStatus("error");
        return;
      }
      const message =
        error instanceof Error
          ? error.message
          : locale === "th"
            ? "ส่งข้อมูลติดต่อไม่สำเร็จ"
            : "Lead submission failed";
      setLeadError(message);
      setLeadStatus("error");
    } finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      leadInFlightRef.current = false;
    }
  };

  const primaryButton = locale === "th" ? "คำนวณราคา" : "Calculate estimate";
  const leadButton = locale === "th" ? "ส่งใบเสนอราคา" : "Send quotation";
  const resultLabel = locale === "th" ? "ช่วงราคาโดยประมาณ" : "Estimated range";
  const leadSuccessMessage =
    locale === "th"
      ? "เราได้รับข้อมูลแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด"
      : "We received your details. We'll contact you soon.";

  const quoteDate = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, [locale]);

  const quoteRef = useMemo(() => {
    const id = estimateResult?.estimateId;
    if (!id) return null;
    const compact = id.replace(/-/g, "").toUpperCase();
    const short = compact.slice(0, 8);
    if (short.length < 8) return null;
    return `QT-${short.slice(0, 4)}-${short.slice(4, 8)}`;
  }, [estimateResult?.estimateId]);

  useEffect(() => {
    if (!leadFormOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLeadFormOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [leadFormOpen]);

  const quoteLines = useMemo<QuoteLine[]>(() => {
    if (!estimateResult) {
      return [];
    }

    if (service === "website") {
      const config = estimatorConfig.website;
      const pages = Math.round(websiteInputs.pages || config.minPages);
      const lines: QuoteLine[] = [
        {
          label: locale === "th" ? "ค่าเริ่มต้น (แพ็กเกจเว็บไซต์)" : "Base website package",
          amount: config.base,
        },
        {
          label: locale === "th" ? `จำนวนหน้า (${pages} หน้า)` : `Pages (${pages})`,
          amount: pages * config.perPage,
        },
      ];

      websiteInputs.features.forEach((key) => {
        const feature = config.features[key as keyof typeof config.features];
        if (!feature) {
          return;
        }
        lines.push({
          label:
            locale === "th"
              ? websiteFeatureLabelsTh[key as WebsiteFeatureKey] ?? feature.label
              : feature.label,
          amount: feature.price,
        });
      });

      return lines;
    }

    if (service === "dormitory") {
      const config = estimatorConfig.dormitory;
      const rooms = Math.round(dormitoryInputs.rooms || 1);
      const tier =
        config.roomTiers.find((entry) => rooms <= entry.upTo) ??
        config.roomTiers[config.roomTiers.length - 1];

      const lines: QuoteLine[] = [
        {
          label: locale === "th" ? "ค่าเริ่มต้น (ระบบหอพัก/รีสอร์ท)" : "Base system setup",
          amount: config.base,
        },
        {
          label:
            locale === "th"
              ? `ปรับตามจำนวนห้อง (≤ ${tier.upTo} ห้อง)`
              : `Room tier adjustment (≤ ${tier.upTo} rooms)`,
          amount: tier.add,
        },
      ];

      dormitoryInputs.modules.forEach((key) => {
        const moduleConfig = config.modules[key as keyof typeof config.modules];
        if (!moduleConfig) {
          return;
        }
        lines.push({
          label:
            locale === "th"
              ? dormitoryModuleLabelsTh[key as DormitoryModuleKey] ?? moduleConfig.label
              : moduleConfig.label,
          amount: moduleConfig.price,
        });
      });

      return lines;
    }

    if (service === "company") {
      const config = estimatorConfig.company;
      const lines: QuoteLine[] = [
        {
          label: locale === "th" ? "ค่าเริ่มต้น (จดทะเบียนบริษัท)" : "Base company registration",
          amount: config.base,
        },
      ];

      companyInputs.addons.forEach((key) => {
        const addOn = config.addons[key as keyof typeof config.addons];
        if (!addOn) {
          return;
        }
        lines.push({
          label:
            locale === "th"
              ? companyAddonLabelsTh[key as CompanyAddonKey] ?? addOn.label
              : addOn.label,
          amount: addOn.price,
        });
      });

      return lines;
    }

    const config = estimatorConfig.analytics;
    const channels = Math.round(analyticsInputs.channels || config.minChannels);
    const reporting = analyticsInputs.reporting;
    const dashboard = analyticsInputs.dashboard;

    return [
      {
        label: locale === "th" ? "ค่าเริ่มต้น (Analytics)" : "Base analytics setup",
        amount: config.base,
      },
      {
        label: locale === "th" ? `ช่องทางข้อมูล (${channels} ช่อง)` : `Data channels (${channels})`,
        amount: channels * config.perChannel,
      },
      {
        label:
          locale === "th"
            ? reportingLabelsTh[reporting as ReportingKey] ??
              config.reportingFrequency[reporting].label
            : config.reportingFrequency[reporting].label,
        amount: config.reportingFrequency[reporting].price,
      },
      {
        label:
          locale === "th"
            ? dashboardLabelsTh[dashboard as DashboardKey] ?? config.dashboards[dashboard].label
            : config.dashboards[dashboard].label,
        amount: config.dashboards[dashboard].price,
      },
    ];
  }, [
    analyticsInputs.channels,
    analyticsInputs.dashboard,
    analyticsInputs.reporting,
    dormitoryInputs.modules,
    dormitoryInputs.rooms,
    companyInputs.addons,
    companyAddonLabelsTh,
    dashboardLabelsTh,
    dormitoryModuleLabelsTh,
    estimateResult,
    locale,
    reportingLabelsTh,
    service,
    websiteFeatureLabelsTh,
    websiteInputs.features,
    websiteInputs.pages,
  ]);

  const quoteSubtotal = useMemo(
    () => quoteLines.reduce((sum, line) => sum + line.amount, 0),
    [quoteLines]
  );

  const quoteBufferPct = useMemo(() => {
    if (service === "website") {
      return estimatorConfig.website.priceBufferPct;
    }
    if (service === "dormitory") {
      return estimatorConfig.dormitory.priceBufferPct;
    }
    if (service === "company") {
      return estimatorConfig.company.priceBufferPct;
    }
    return estimatorConfig.analytics.priceBufferPct;
  }, [service]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-8">
        <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft" onSubmit={submitEstimate}>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500" htmlFor="service">
              {locale === "th" ? "เลือกบริการ" : "Select service"}
            </label>
            <select
              id="service"
              value={service}
              onChange={(event) => onServiceChange(event.target.value as EstimatorService)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              {Object.entries(serviceLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {service === "website" ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500" htmlFor="pages">
                  {locale === "th" ? "จำนวนหน้า" : "Number of pages"}
                </label>
                <input
                  id="pages"
                  type="number"
                  min={estimatorConfig.website.minPages}
                  max={estimatorConfig.website.maxPages}
                  value={websiteInputs.pages}
                  onChange={(event) => {
                    fireEstimateStart();
                    setWebsiteInputs({
                      ...websiteInputs,
                      pages: Number(event.target.value || estimatorConfig.website.minPages),
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                />
                <p className="mt-2 text-xs text-slate-500">
                  {locale === "th"
                    ? "ขั้นต่ำตามแพ็กเกจเริ่มต้น"
                    : "Minimum is based on the starter package."}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {locale === "th" ? "ฟีเจอร์เสริม" : "Feature add-ons"}
                </p>
                <div className="mt-3 grid gap-3">
                  {Object.entries(estimatorConfig.website.features).map(([key, item]) => (
                    <label key={key} className="flex items-start gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={websiteInputs.features.includes(key)}
                        onChange={(event) => {
                          fireEstimateStart();
                          setWebsiteInputs((prev) => ({
                            ...prev,
                            features: event.target.checked
                              ? [...prev.features, key]
                              : prev.features.filter((feature) => feature !== key),
                          }));
                        }}
                        className="mt-1"
                      />
                      <span>
                        {getWebsiteFeatureLabel(key, item.label)} (+{formatCurrency(item.price)})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {service === "dormitory" ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500" htmlFor="rooms">
                  {locale === "th" ? "จำนวนห้อง" : "Number of rooms"}
                </label>
                <input
                  id="rooms"
                  type="number"
                  min={1}
                  max={1000}
                  value={dormitoryInputs.rooms}
                  onChange={(event) => {
                    fireEstimateStart();
                    setDormitoryInputs({
                      ...dormitoryInputs,
                      rooms: Number(event.target.value || 1),
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {locale === "th" ? "โมดูลเสริม" : "Module add-ons"}
                </p>
                <div className="mt-3 grid gap-3">
                  {Object.entries(estimatorConfig.dormitory.modules).map(([key, item]) => (
                    <label key={key} className="flex items-start gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={dormitoryInputs.modules.includes(key)}
                        onChange={(event) => {
                          fireEstimateStart();
                          setDormitoryInputs((prev) => ({
                            ...prev,
                            modules: event.target.checked
                              ? [...prev.modules, key]
                              : prev.modules.filter((module) => module !== key),
                          }));
                        }}
                        className="mt-1"
                      />
                      <span>
                        {getDormitoryModuleLabel(key, item.label)} (+{formatCurrency(item.price)})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {service === "analytics" ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500" htmlFor="channels">
                  {locale === "th" ? "จำนวนช่องทางข้อมูล" : "Data channels"}
                </label>
                <input
                  id="channels"
                  type="number"
                  min={estimatorConfig.analytics.minChannels}
                  max={estimatorConfig.analytics.maxChannels}
                  value={analyticsInputs.channels}
                  onChange={(event) => {
                    fireEstimateStart();
                    setAnalyticsInputs({
                      ...analyticsInputs,
                      channels: Number(event.target.value || estimatorConfig.analytics.minChannels),
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500" htmlFor="reporting">
                  {locale === "th" ? "รอบการรายงาน" : "Reporting frequency"}
                </label>
                <select
                  id="reporting"
                  value={analyticsInputs.reporting}
                  onChange={(event) => {
                    fireEstimateStart();
                    const reporting =
                      event.target.value as keyof typeof estimatorConfig.analytics.reportingFrequency;
                    setAnalyticsInputs({
                      ...analyticsInputs,
                      reporting,
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  {Object.entries(estimatorConfig.analytics.reportingFrequency).map(
                    ([key, item]) => (
                      <option key={key} value={key}>
                        {getReportingLabel(key, item.label)}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500" htmlFor="dashboard">
                  {locale === "th" ? "แดชบอร์ด" : "Dashboard"}
                </label>
                <select
                  id="dashboard"
                  value={analyticsInputs.dashboard}
                  onChange={(event) => {
                    fireEstimateStart();
                    const dashboard =
                      event.target.value as keyof typeof estimatorConfig.analytics.dashboards;
                    setAnalyticsInputs({
                      ...analyticsInputs,
                      dashboard,
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  {Object.entries(estimatorConfig.analytics.dashboards).map(
                    ([key, item]) => (
                      <option key={key} value={key}>
                        {getDashboardLabel(key, item.label)}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          ) : null}

          {service === "company" ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {locale === "th" ? "ตัวเลือกเสริม" : "Add-ons"}
                </p>
                <div className="mt-3 grid gap-3">
                  {Object.entries(estimatorConfig.company.addons).map(([key, item]) => (
                    <label key={key} className="flex items-start gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={companyInputs.addons.includes(key)}
                        onChange={(event) => {
                          fireEstimateStart();
                          setCompanyInputs((prev) => ({
                            ...prev,
                            addons: event.target.checked
                              ? [...prev.addons, key]
                              : prev.addons.filter((addOn) => addOn !== key),
                          }));
                        }}
                        className="mt-1"
                      />
                      <span>
                        {getCompanyAddonLabel(key, item.label)} (+{formatCurrency(item.price)})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={estimateStatus === "loading"}
              aria-busy={estimateStatus === "loading"}
              className="inline-flex min-h-11 w-full flex-1 items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {estimateStatus === "loading"
                ? locale === "th"
                  ? "กำลังคำนวณ..."
                  : "Calculating..."
                : primaryButton}
            </button>
            {estimateResult ? (
              <button
                type="button"
                disabled={estimateStatus === "loading" || leadStatus === "loading"}
                onClick={() => {
                  setLeadStartedAt(Date.now());
                  setLeadFormOpen(true);
                }}
                className="inline-flex min-h-11 w-full flex-1 items-center justify-center rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-3 text-sm font-semibold text-blue-900 shadow-sm transition hover:from-blue-100 hover:to-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {locale === "th"
                  ? "กรอกข้อมูลรับใบเสนอราคา"
                  : "Fill details for quotation"}
              </button>
            ) : null}
          </div>
          {estimateResult ? (
            <p className="text-xs text-slate-500">
              {locale === "th"
                ? "เมื่อกรอกข้อมูลและส่งแล้ว ระบบจะส่งคำขอใบเสนอราคาไปยังทีมงานผ่านอีเมลและ LINE OA อัตโนมัติ"
                : "After submitting your details, your quote request will be sent to our team via email and LINE OA."}
            </p>
          ) : null}
          {estimateError ? <p className="text-sm text-rose-600">{estimateError}</p> : null}
        </form>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card-soft">
          <div className="border-b border-slate-200 bg-white p-5 sm:p-7">
            <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-sm text-slate-700 shadow-[0_18px_55px_rgba(2,6,23,0.10)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-14 sm:w-14">
                    <Image
                      src={QUOTE_LOGO_SRC}
                      alt="CUTTING POINT TECH"
                      width={56}
                      height={56}
                      className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                      unoptimized
                      loading="lazy"
                      fetchPriority="low"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      CUTTING POINT TECH
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <div className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    {locale === "th" ? "ใบเสนอราคา" : "Quote"}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-slate-500">{locale === "th" ? "บริการ" : "Service"}</div>
                  <div className="min-w-0 truncate text-right font-semibold text-slate-900">
                    {serviceLabels[service]}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-slate-500">{locale === "th" ? "วันที่" : "Date"}</div>
                  <div className="text-right font-medium text-slate-900">{quoteDate}</div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-slate-500">{locale === "th" ? "เลขที่" : "Ref"}</div>
                  <div className="text-right font-mono text-[12px] font-semibold text-slate-900">
                    <span className="inline-flex rounded-md bg-slate-900/5 px-2 py-1">
                      {quoteRef ?? "\u2014"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7">
            {estimateResult ? (
              <div className="mx-auto max-w-3xl space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white">
                  <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-slate-200 px-5 py-3 text-xs font-semibold text-slate-500">
                    <div>{locale === "th" ? "รายการ" : "Item"}</div>
                    <div className="text-right">{locale === "th" ? "ราคา" : "Amount"}</div>
                  </div>
                  <div className="divide-y divide-slate-200">
                    {quoteLines.map((line) => (
                      <div
                        key={`${line.label}-${line.amount}`}
                        className="grid grid-cols-[1fr_auto] gap-3 px-5 py-3 text-sm text-slate-700"
                      >
                        <div className="pr-4">{line.label}</div>
                        <div className="text-right font-medium text-slate-900">
                          {formatCurrency(line.amount)}
                        </div>
                      </div>
                    ))}
                    <div className="grid grid-cols-[1fr_auto] gap-3 px-5 py-3 text-sm text-slate-700">
                      <div className="font-semibold">{locale === "th" ? "รวม" : "Subtotal"}</div>
                      <div className="text-right font-semibold text-slate-900">
                        {formatCurrency(quoteSubtotal)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-mist p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {serviceLabels[service]}
                      </p>
                      <p className="mt-2 font-[var(--font-heading)] text-lg font-semibold text-slate-900">
                        {resultLabel}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-slate-900">
                        {formatCurrency(estimateResult.priceMin)} - {formatCurrency(estimateResult.priceMax)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {locale === "th"
                          ? `ช่วงราคาเผื่อความซับซ้อน ~ ${(quoteBufferPct * 100).toFixed(0)}%`
                          : `Range includes complexity buffer ~ ${(quoteBufferPct * 100).toFixed(0)}%`}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {locale === "th"
                      ? "ใบเสนอราคาเบื้องต้นนี้อิงจากข้อมูลที่เลือก และอาจเปลี่ยนแปลงได้หลังคุยรายละเอียด"
                      : "This quote preview may change after a quick scoping call."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-600">
                {locale === "th"
                  ? "กรอกข้อมูลและกด “คำนวณราคา” เพื่อสร้างใบเสนอราคาเบื้องต้น"
                  : "Fill in the form and click “Calculate estimate” to generate a quote preview."}
              </div>
            )}
          </div>
        </div>

        {estimateResult && leadFormOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
              type="button"
              className="absolute inset-0 cursor-default bg-slate-900/30 backdrop-blur-sm"
              aria-label={locale === "th" ? "ปิดหน้าต่าง" : "Close modal"}
              onClick={() => setLeadFormOpen(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/40 bg-white shadow-[0_30px_90px_rgba(2,6,23,0.25)]"
            >
              <div className="border-b border-slate-200 bg-gradient-to-b from-white to-mist px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                      CUTTING POINT TECH
                    </p>
                    <h3 className="mt-2 font-[var(--font-heading)] text-xl font-semibold text-slate-900">
                      {locale === "th" ? "ส่งข้อมูลเพื่อรับใบเสนอราคา" : "Send details for quotation"}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {locale === "th"
                        ? "ทีมงานจะติดต่อกลับเพื่อปรับช่วงราคาให้แม่นยำขึ้น"
                        : "Our team will contact you to refine the range."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLeadFormOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                    aria-label={locale === "th" ? "ปิด" : "Close"}
                  >
                    ×
                  </button>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-semibold text-slate-900">{serviceLabels[service]}</div>
                    <div className="text-xs text-slate-500">
                      {locale === "th" ? "เลขที่" : "Ref"}:{" "}
                      <span className="font-mono font-semibold text-slate-900">
                        {quoteRef ?? "\u2014"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">
                    {formatCurrency(estimateResult.priceMin)} - {formatCurrency(estimateResult.priceMax)}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                      {locale === "th" ? "อีเมล" : "Email"}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                      LINE OA
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6">
                <form className="space-y-4" onSubmit={submitLead}>
                  <div>
                    <label className="text-xs font-semibold text-slate-500" htmlFor="lead-name">
                      {locale === "th" ? "ชื่อผู้ติดต่อ" : "Full name"}
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      maxLength={120}
                      value={leadForm.name}
                      onChange={(event) => {
                        setLeadStartedAt((prev) => prev ?? Date.now());
                        setLeadForm({ ...leadForm, name: event.target.value });
                      }}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-500" htmlFor="lead-phone">
                        {locale === "th" ? "เบอร์โทร" : "Phone"}
                      </label>
                      <input
                        id="lead-phone"
                        type="tel"
                        required
                        maxLength={50}
                        value={leadForm.phone}
                        onChange={(event) => {
                          setLeadStartedAt((prev) => prev ?? Date.now());
                          setLeadForm({ ...leadForm, phone: event.target.value });
                        }}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500" htmlFor="lead-email">
                        {locale === "th" ? "อีเมล" : "Email"}
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        maxLength={120}
                        value={leadForm.email}
                        onChange={(event) => {
                          setLeadStartedAt((prev) => prev ?? Date.now());
                          setLeadForm({ ...leadForm, email: event.target.value });
                        }}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500" htmlFor="lead-message">
                      {locale === "th" ? "รายละเอียดเพิ่มเติม" : "Project notes"}
                    </label>
                    <textarea
                      id="lead-message"
                      rows={4}
                      required
                      maxLength={2000}
                      value={leadForm.message}
                      onChange={(event) => {
                        setLeadStartedAt((prev) => prev ?? Date.now());
                        setLeadForm({ ...leadForm, message: event.target.value });
                      }}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                    />
                  </div>

                  <input
                    type="text"
                    name="company"
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden"
                    value={leadForm.company}
                    onChange={(event) => setLeadForm({ ...leadForm, company: event.target.value })}
                  />

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setLeadFormOpen(false)}
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:w-auto"
                    >
                      {locale === "th" ? "ยกเลิก" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      disabled={leadStatus === "loading"}
                      aria-busy={leadStatus === "loading"}
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
                    >
                      {leadStatus === "loading"
                        ? locale === "th"
                          ? "กำลังส่ง..."
                          : "Sending..."
                        : leadButton}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : null}

        <SubmitStatusModal
          open={leadStatus !== "idle"}
          variant={
            leadStatus === "loading" ? "sending" : leadStatus === "success" ? "success" : "error"
          }
          title={
            leadStatus === "loading"
              ? locale === "th"
                ? "กำลังส่งใบเสนอราคา..."
                : "Sending quotation..."
              : leadStatus === "success"
                ? locale === "th"
                  ? "ส่งสำเร็จ"
                  : "Sent successfully"
                : locale === "th"
                  ? "ส่งไม่สำเร็จ"
                  : "Failed to send"
          }
          message={
            leadStatus === "loading"
              ? locale === "th"
                ? "กรุณารอสักครู่..."
                : "Please wait..."
              : leadStatus === "success"
                ? `${leadSuccessMessage}${leadNotice ? `\n${leadNotice}` : ""}`
                : leadError ?? undefined
          }
          reference={leadStatus === "success" ? leadRef : null}
          closeLabel={locale === "th" ? "ตกลง" : "OK"}
          onClose={() => {
            if (leadStatus === "success") {
              setLeadForm({ name: "", phone: "", email: "", message: "", company: "" });
              setLeadStartedAt(null);
              setEstimateResult(null);
              setEstimateStatus("idle");
              setEstimateError(null);
            }
            setLeadStatus("idle");
            setLeadError(null);
            setLeadNotice(null);
            setLeadRef(null);
          }}
        />

        <div className="rounded-3xl border border-slate-200 bg-mist p-6 text-sm text-slate-600">
          <p>
            {locale === "th"
              ? "ช่วงราคาเป็นเพียงการประเมินเบื้องต้น ทีมงานจะยืนยันอีกครั้งก่อนเริ่มงานจริง"
              : "Final pricing is confirmed after a short discovery call."}
          </p>
        </div>
      </div>
    </div>
  );
}
