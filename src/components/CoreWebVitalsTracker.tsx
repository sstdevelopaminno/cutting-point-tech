"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackGaEvent } from "@/lib/ga";

type MetricName = "CLS" | "INP" | "LCP" | "FCP" | "TTFB";

const THRESHOLDS: Record<MetricName, { good: number; needsImprovement: number }> = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  INP: { good: 200, needsImprovement: 500 },
  LCP: { good: 2500, needsImprovement: 4000 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

function getMetricRating(name: MetricName, value: number): "good" | "needs_improvement" | "poor" {
  const threshold = THRESHOLDS[name];
  if (value <= threshold.good) return "good";
  if (value <= threshold.needsImprovement) return "needs_improvement";
  return "poor";
}

function normalizeMetricValue(name: string, value: number): number {
  if (name === "CLS") {
    return Math.round(value * 1000) / 1000;
  }
  return Math.round(value);
}

export default function CoreWebVitalsTracker() {
  useReportWebVitals((metric) => {
    const name = metric.name as MetricName;
    if (!(name in THRESHOLDS)) {
      return;
    }
    const metricDelta = (metric as { delta?: number }).delta;
    const metricLabel = (metric as { label?: string }).label;

    const normalizedValue = normalizeMetricValue(name, metric.value);
    const normalizedDelta =
      typeof metricDelta === "number" ? normalizeMetricValue(name, metricDelta) : undefined;
    const metricRating = getMetricRating(name, metric.value);
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    const title = typeof document !== "undefined" ? document.title : "";

    trackGaEvent("web_vital", {
      metric_name: name,
      metric_id: metric.id,
      metric_value: normalizedValue,
      metric_delta: normalizedDelta,
      metric_rating: metricRating,
      metric_label: metricLabel,
      value: normalizedValue,
      page_path: path,
      page_title: title,
    });

    trackGaEvent(`web_vital_${name.toLowerCase()}`, {
      metric_id: metric.id,
      metric_rating: metricRating,
      value: normalizedValue,
      page_path: path,
    });
  });

  return null;
}
