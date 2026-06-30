export type GaEventParams = Record<string, string | number | boolean | null | undefined>;

export function trackGaEvent(eventName: string, params?: GaEventParams) {
  if (typeof window === "undefined") {
    return;
  }
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (!gtag) {
    return;
  }
  gtag("event", eventName, params ?? {});
}
