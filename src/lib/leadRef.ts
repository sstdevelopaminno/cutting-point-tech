export function formatLeadRef(leadId: string | null | undefined): string | null {
  if (!leadId) return null;
  const compact = String(leadId).replace(/-/g, "").toUpperCase();
  const short = compact.slice(0, 8);
  if (short.length < 8) return null;
  return `LD-${short.slice(0, 4)}-${short.slice(4, 8)}`;
}

