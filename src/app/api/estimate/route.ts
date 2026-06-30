import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { calculateEstimate, isEstimatorService } from "@/lib/estimate";
import { estimatorConfig } from "@/lib/estimateConfig";

type EstimatePayload = {
  service?: string;
  inputs?: Record<string, unknown>;
};

const pickKeys = (value: unknown) => (Array.isArray(value) ? value : []);

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();

  try {
    const body = (await req.json().catch(() => null)) as EstimatePayload | null;
    const service = typeof body?.service === "string" ? body?.service : null;
    const inputs = body?.inputs ?? {};

    if (!isEstimatorService(service)) {
      return NextResponse.json(
        { ok: false, requestId, error: "Unsupported service" },
        { status: 400 }
      );
    }

    let estimateInputs: Parameters<typeof calculateEstimate>[0];
    if (service === "website") {
      const config = estimatorConfig.website;
      const pages = Number(inputs.pages ?? config.minPages);
      const features = pickKeys(inputs.features).filter((item) =>
        Object.keys(config.features).includes(String(item))
      );
      estimateInputs = {
        service,
        data: {
          pages,
          features,
        },
      } as const;
    } else if (service === "dormitory") {
      const config = estimatorConfig.dormitory;
      const rooms = Number(inputs.rooms ?? 1);
      const modules = pickKeys(inputs.modules).filter((item) =>
        Object.keys(config.modules).includes(String(item))
      );
      estimateInputs = {
        service,
        data: {
          rooms,
          modules,
        },
      } as const;
    } else if (service === "company") {
      const config = estimatorConfig.company;
      const addons = pickKeys(inputs.addons).filter((item) =>
        Object.keys(config.addons).includes(String(item))
      );
      estimateInputs = {
        service,
        data: {
          addons,
        },
      } as const;
    } else {
      const config = estimatorConfig.analytics;
      const channels = Number(inputs.channels ?? config.minChannels);
      const reportingRaw = String(inputs.reporting ?? "monthly");
      const dashboardRaw = String(inputs.dashboard ?? "none");
      const reporting = Object.keys(config.reportingFrequency).includes(reportingRaw)
        ? (reportingRaw as keyof typeof config.reportingFrequency)
        : "monthly";
      const dashboard = Object.keys(config.dashboards).includes(dashboardRaw)
        ? (dashboardRaw as keyof typeof config.dashboards)
        : "none";
      estimateInputs = {
        service,
        data: {
          channels,
          reporting,
          dashboard,
        },
      } as const;
    }

    const result = calculateEstimate(estimateInputs);
    const supabaseAdmin = getSupabaseAdmin();

    const { data: estimateRow, error } = await supabaseAdmin
      .from("estimates")
      .insert([
        {
          service,
          inputs: result.normalizedInputs,
          price_min: result.priceMin,
          price_max: result.priceMax,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error({ requestId, error });
      return NextResponse.json(
        { ok: false, requestId, error: "Database insert failed" },
        { status: 500 }
      );
    }

    await supabaseAdmin.from("events").insert([
      {
        event_name: "estimate_submit",
        service,
        meta: {
          estimate_id: estimateRow?.id ?? null,
          price_min: result.priceMin,
          price_max: result.priceMax,
        },
      },
    ]);

    return NextResponse.json({
      ok: true,
      requestId,
      estimateId: estimateRow?.id ?? null,
      priceMin: result.priceMin,
      priceMax: result.priceMax,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error({ requestId, error: err });
    return NextResponse.json(
      { ok: false, requestId, error: message },
      { status: 500 }
    );
  }
}
