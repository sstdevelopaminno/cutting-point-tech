export type RelativeTimeOptions = {
  now?: Date;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function formatRelativeTime(
  input: string | Date | number,
  options: RelativeTimeOptions = {}
): string {
  const now = options.now ?? new Date();
  const date =
    input instanceof Date
      ? input
      : typeof input === "number"
        ? new Date(input)
        : new Date(input);

  const ms = date.getTime();
  if (!Number.isFinite(ms)) return "";

  const diffMs = ms - now.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const absSeconds = Math.abs(diffSeconds);

  const isPast = diffSeconds < 0;
  if (absSeconds < 10) return "Just now";
  if (absSeconds < 60) return `${absSeconds}s ${isPast ? "ago" : "from now"}`;

  const minutes = Math.round(absSeconds / 60);
  if (minutes < 60) return `${minutes}m ${isPast ? "ago" : "from now"}`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ${isPast ? "ago" : "from now"}`;

  const days = clamp(Math.round(hours / 24), 1, 365);
  return `${days}d ${isPast ? "ago" : "from now"}`;
}

