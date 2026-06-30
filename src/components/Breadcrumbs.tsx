import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: readonly BreadcrumbItem[];
  variant?: "default" | "pills";
  className?: string;
};

export default function Breadcrumbs({
  items,
  variant = "default",
  className,
}: BreadcrumbsProps) {
  const isPills = variant === "pills";
  return (
    <nav
      aria-label="Breadcrumb"
      className={`${isPills ? "text-xs" : "text-sm"} text-slate-500 ${className ?? ""}`}
    >
      <ol className={`flex flex-wrap items-center ${isPills ? "gap-2" : "gap-2"}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const pillClass = isPills
            ? `inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur transition ${
                isLast ? "text-slate-900" : "hover:bg-white hover:text-slate-900"
              }`
            : "";
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className={isPills ? pillClass : "hover:text-slate-900"}>
                  {item.label}
                </Link>
              ) : (
                <span className={isPills ? pillClass : "text-slate-700"}>{item.label}</span>
              )}
              {!isLast && !isPills ? <span className="text-slate-400">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
