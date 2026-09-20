type Tone = "windows" | "android";

type DownloadPlatformCardProps = {
  id: string;
  tone: Tone;
  icon: "windows" | "android";
  eyebrow: string;
  title: string;
  description: string;
  version: string;
  fileName: string;
  buttonLabel: string;
  noLinkLabel: string;
  href: string | null;
};

const toneStyles: Record<
  Tone,
  {
    shell: string;
    glow: string;
    badge: string;
    icon: string;
    button: string;
  }
> = {
  windows: {
    shell: "border-sky-300/30 bg-sky-950/35",
    glow: "from-sky-300/20 via-cyan-300/5 to-transparent",
    badge: "border-sky-200/35 bg-sky-300/12 text-sky-100",
    icon: "border-sky-200/35 bg-sky-300/14 text-sky-100 shadow-sky-900/20",
    button: "bg-gradient-to-r from-sky-300 to-cyan-300 text-slate-950 shadow-sky-950/20 hover:brightness-110",
  },
  android: {
    shell: "border-emerald-300/30 bg-emerald-950/30",
    glow: "from-emerald-300/20 via-teal-300/5 to-transparent",
    badge: "border-emerald-200/35 bg-emerald-300/12 text-emerald-100",
    icon: "border-emerald-200/35 bg-emerald-300/14 text-emerald-100 shadow-emerald-950/20",
    button: "bg-gradient-to-r from-emerald-300 to-teal-300 text-slate-950 shadow-emerald-950/20 hover:brightness-110",
  },
};

function PlatformIcon({ type }: { type: "windows" | "android" }) {
  if (type === "windows") {
    return (
      <span aria-hidden="true" className="grid h-8 w-8 grid-cols-2 gap-1">
        <span className="rounded-[3px] bg-current" />
        <span className="rounded-[3px] bg-current" />
        <span className="rounded-[3px] bg-current" />
        <span className="rounded-[3px] bg-current" />
      </span>
    );
  }

  return (
    <span aria-hidden="true" className="relative h-9 w-8 rounded-b-[10px] rounded-t-2xl border-2 border-current">
      <span className="absolute -left-1.5 top-3 h-4 w-1 rounded-full bg-current" />
      <span className="absolute -right-1.5 top-3 h-4 w-1 rounded-full bg-current" />
      <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-current" />
      <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-current" />
    </span>
  );
}

export function DownloadPlatformCard({
  id,
  tone,
  icon,
  eyebrow,
  title,
  description,
  version,
  fileName,
  buttonLabel,
  noLinkLabel,
  href,
}: DownloadPlatformCardProps) {
  const styles = toneStyles[tone];

  return (
    <article
      id={id}
      className={`group relative scroll-mt-32 overflow-hidden rounded-[28px] border p-6 shadow-2xl shadow-black/20 ${styles.shell} sm:p-8`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b ${styles.glow}`}
      />
      <div className="relative flex min-h-[360px] flex-col">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className={`grid h-16 w-16 place-items-center rounded-3xl border shadow-lg ${styles.icon}`}>
            <PlatformIcon type={icon} />
          </div>
          <span className={`rounded-full border px-4 py-2 text-xs font-extrabold ${styles.badge}`}>
            {version}
          </span>
        </div>

        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-400">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-300 sm:text-base">{description}</p>

        <div className="my-8 flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3">
          <span aria-hidden="true" className="shrink-0 text-lg text-slate-400">▤</span>
          <span className="break-all text-xs font-semibold text-slate-200 sm:text-sm">{fileName}</span>
        </div>

        {href ? (
          <a
            href={href}
            className={`mt-auto inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl px-5 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base ${styles.button}`}
            rel="noopener noreferrer"
          >
            <span aria-hidden="true" className="text-lg">↓</span>
            {buttonLabel}
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="mt-auto inline-flex min-h-14 w-full cursor-not-allowed items-center justify-center gap-3 rounded-2xl border border-white/12 bg-white/[0.08] px-5 text-sm font-extrabold text-slate-300 sm:text-base"
          >
            {noLinkLabel}
          </span>
        )}
      </div>
    </article>
  );
}