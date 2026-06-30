type EventPayload = {
  eventName: string;
  service?: string | null;
  meta?: Record<string, unknown> | null;
};

export function logEvent(payload: EventPayload) {
  if (typeof window === "undefined") {
    return;
  }
  const body = JSON.stringify(payload);
  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/events", blob);
    return;
  }
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
