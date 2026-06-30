import { Mail, MapPin, Phone } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.6c0-.8.2-1.3 1.4-1.3h1.4V5.9c-.2 0-1.1-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.7v1.8H8.1V14h2.4v7H13.5z" />
    </svg>
  );
}

function LineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19.2 10.5c0-3.5-3.2-6.4-7.2-6.4S4.8 7 4.8 10.5c0 3.2 2.7 5.9 6.3 6.3.2 0 .5.2.6.4l.2.8c.1.2.2.5.6.3 1.6-.8 3.1-1.9 4.3-3.2 1.5-1.1 2.4-2.7 2.4-4.6zm-10 1.3c0 .2-.2.4-.4.4H7.4c-.2 0-.4-.2-.4-.4V9.2c0-.2.2-.4.4-.4s.4.2.4.4v2.2h1c.2 0 .4.2.4.4zm2.3 0c0 .2-.2.4-.4.4s-.4-.2-.4-.4V9.2c0-.2.2-.4.4-.4s.4.2.4.4v2.6zm3 0c0 .2-.2.4-.4.4h-1.7c-.2 0-.4-.2-.4-.4V9.2c0-.2.2-.4.4-.4H14c.2 0 .4.2.4.4s-.2.4-.4.4h-1.3v.6H14c.2 0 .4.2.4.4s-.2.4-.4.4h-1.3v.6h1.3c.2 0 .4.2.4.4zm2.9 0c0 .2-.2.4-.4.4-.1 0-.2 0-.3-.1l-1.5-2v1.7c0 .2-.2.4-.4.4s-.4-.2-.4-.4V9.2c0-.2.2-.4.4-.4.1 0 .2 0 .3.1l1.5 2V9.2c0-.2.2-.4.4-.4s.4.2.4.4v2.6z" />
    </svg>
  );
}

type FooterProps = {
  company: string;
  address: string;
  phone: string;
  email: string;
  line: string;
  note: string;
};

export default function Footer({
  company,
  address,
  phone,
  email,
  line,
  note,
}: FooterProps) {
  const lineId = /@[\w.-]+/.exec(line)?.[0] ?? null;
  const lineHref = lineId ? `https://line.me/R/ti/p/${lineId}` : null;
  const facebookHref = process.env.NEXT_PUBLIC_FACEBOOK_URL || undefined;
  const iconTileBaseClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-[6px] text-white transition-transform hover:scale-105";

  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-[var(--font-heading)] text-2xl font-semibold text-white">
            {company}
          </p>
          <p className="mt-3 max-w-md text-sm text-slate-400">{note}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {facebookHref ? (
              <a
                href={facebookHref}
                aria-label="Facebook"
                className={`${iconTileBaseClass} bg-[#5a73b9]`}
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            ) : (
              <div
                aria-label="Facebook"
                className={`${iconTileBaseClass} bg-[#5a73b9] opacity-60`}
                title="Set NEXT_PUBLIC_FACEBOOK_URL to enable"
              >
                <FacebookIcon className="h-5 w-5" />
              </div>
            )}
            <a
              href={`tel:${phone.replace(/\\s+/g, "")}`}
              aria-label="Call"
              className={`${iconTileBaseClass} bg-[#43aed5]`}
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${email}`}
              aria-label="Email"
              className={`${iconTileBaseClass} bg-[#ef3f3c]`}
            >
              <Mail className="h-5 w-5" />
            </a>
            {lineHref ? (
              <a
                href={lineHref}
                aria-label="LINE"
                className={`${iconTileBaseClass} bg-[#36d80f]`}
              >
                <LineIcon className="h-5 w-5" />
              </a>
            ) : (
              <div
                aria-label="LINE"
                className={`${iconTileBaseClass} bg-[#36d80f] opacity-60`}
                title="LINE ID not found"
              >
                <LineIcon className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-slate-400" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-slate-400" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-3">
            <LineIcon className="h-4 w-4 text-slate-400" />
            <span>{line}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        2026 CUTTING POINT TECH COMPANY LIMITED. All rights reserved.
      </div>
    </footer>
  );
}
