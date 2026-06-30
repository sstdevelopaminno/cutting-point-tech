import { estimatorConfig, type EstimatorService } from "@/lib/estimateConfig";

export type WebsiteEstimateInputs = {
  pages: number;
  features: string[];
};

export type DormitoryEstimateInputs = {
  rooms: number;
  modules: string[];
};

export type CompanyEstimateInputs = {
  addons: string[];
};

export type AnalyticsEstimateInputs = {
  channels: number;
  reporting: keyof typeof estimatorConfig.analytics.reportingFrequency;
  dashboard: keyof typeof estimatorConfig.analytics.dashboards;
};

export type EstimateInputs =
  | { service: "website"; data: WebsiteEstimateInputs }
  | { service: "dormitory"; data: DormitoryEstimateInputs }
  | { service: "company"; data: CompanyEstimateInputs }
  | { service: "analytics"; data: AnalyticsEstimateInputs };

export type EstimateResult = {
  priceMin: number;
  priceMax: number;
  normalizedInputs: Record<string, unknown>;
};

const roundTo = (value: number, step: number) =>
  Math.round(value / step) * step;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getMaxFromBuffer = (base: number, pct: number) =>
  Math.max(base, Math.round(base * (1 + pct)));

export function calculateEstimate(input: EstimateInputs): EstimateResult {
  if (input.service === "website") {
    const config = estimatorConfig.website;
    const pages = clamp(
      Math.round(input.data.pages || config.minPages),
      config.minPages,
      config.maxPages
    );
    const selected = input.data.features || [];
    const addOnTotal = selected.reduce((sum, key) => {
      const feature = config.features[key as keyof typeof config.features];
      return sum + (feature?.price ?? 0);
    }, 0);
    const baseTotal = config.base + pages * config.perPage + addOnTotal;
    const priceMin = roundTo(baseTotal, 500);
    const priceMax = roundTo(getMaxFromBuffer(priceMin, config.priceBufferPct), 500);
    return {
      priceMin,
      priceMax,
      normalizedInputs: {
        pages,
        features: selected,
      },
    };
  }

  if (input.service === "dormitory") {
    const config = estimatorConfig.dormitory;
    const rooms = clamp(Math.round(input.data.rooms || 1), 1, 1000);
    const selected = input.data.modules || [];
    const tier = config.roomTiers.find((entry) => rooms <= entry.upTo);
    const tierAdd = tier ? tier.add : config.roomTiers[config.roomTiers.length - 1].add;
    const moduleTotal = selected.reduce((sum, key) => {
      const moduleConfig = config.modules[key as keyof typeof config.modules];
      return sum + (moduleConfig?.price ?? 0);
    }, 0);
    const baseTotal = config.base + tierAdd + moduleTotal;
    const priceMin = roundTo(baseTotal, 500);
    const priceMax = roundTo(getMaxFromBuffer(priceMin, config.priceBufferPct), 500);
    return {
      priceMin,
      priceMax,
      normalizedInputs: {
        rooms,
        modules: selected,
        tier: tier?.upTo ?? config.roomTiers[config.roomTiers.length - 1].upTo,
      },
    };
  }

  if (input.service === "company") {
    const config = estimatorConfig.company;
    const selected = input.data.addons || [];
    const addOnTotal = selected.reduce((sum, key) => {
      const addOn = config.addons[key as keyof typeof config.addons];
      return sum + (addOn?.price ?? 0);
    }, 0);
    const baseTotal = config.base + addOnTotal;
    const priceMin = roundTo(baseTotal, 500);
    const priceMax = roundTo(getMaxFromBuffer(priceMin, config.priceBufferPct), 500);
    return {
      priceMin,
      priceMax,
      normalizedInputs: {
        addons: selected,
      },
    };
  }

  const config = estimatorConfig.analytics;
  const channels = clamp(
    Math.round(input.data.channels || config.minChannels),
    config.minChannels,
    config.maxChannels
  );
  const reporting =
    input.data.reporting in config.reportingFrequency
      ? input.data.reporting
      : "monthly";
  const dashboard =
    input.data.dashboard in config.dashboards ? input.data.dashboard : "none";
  const baseTotal =
    config.base +
    channels * config.perChannel +
    config.reportingFrequency[reporting].price +
    config.dashboards[dashboard].price;
  const priceMin = roundTo(baseTotal, 500);
  const priceMax = roundTo(getMaxFromBuffer(priceMin, config.priceBufferPct), 500);
  return {
    priceMin,
    priceMax,
    normalizedInputs: {
      channels,
      reporting,
      dashboard,
    },
  };
}

export const isEstimatorService = (value: string | null | undefined): value is EstimatorService =>
  value === "website" || value === "dormitory" || value === "company" || value === "analytics";
