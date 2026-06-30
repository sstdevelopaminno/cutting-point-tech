type PlatformCardProps = {
  platform: string;
  years: string;
  users: string;
  websites: string;
  awards: string;
  clients: string;
  suitable: string;
};

export default function PlatformCard({
  platform,
  years,
  users,
  websites,
  awards,
  clients,
  suitable,
}: PlatformCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-[var(--font-heading)] text-xl font-semibold tracking-tight text-slate-900">
          {platform}
        </h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Platform
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-600">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Years</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{years}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Users</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{users}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Websites</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{websites}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Awards</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{awards}</p>
        </div>
        <div className="col-span-2 rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
            Clients
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{clients}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600">{suitable}</p>
    </div>
  );
}
