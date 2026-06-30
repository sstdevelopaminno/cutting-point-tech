import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-card-soft">
        <p className="text-xs uppercase tracking-[0.4em] text-blue-600">CUTTING POINT TECH</p>
        <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold text-slate-900">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          The page you are looking for may have been moved or is no longer available.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md transition hover:bg-slate-800"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
