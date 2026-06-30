import { CheckCircle2 } from "lucide-react";

type PackageCardProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
};

export default function PackageCard({
  name,
  price,
  description,
  features,
  badge,
}: PackageCardProps) {
  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft transition hover:-translate-y-1 hover:shadow-xl">
      {badge ? (
        <span className="absolute -top-3 left-6 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
          {badge}
        </span>
      ) : null}
      <h3 className="font-[var(--font-heading)] text-xl font-semibold text-slate-900">
        {name}
      </h3>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{price}</p>
      <p className="mt-3 text-sm text-slate-600">{description}</p>
      <ul className="mt-5 space-y-3 text-sm text-slate-600">
        {features.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
