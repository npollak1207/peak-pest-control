import Link from "next/link";
import { services } from "@/lib/site";
import { ServiceIcon, Arrow } from "./Icons";

export default function ServiceLinks({
  exclude,
  withBlurb = false,
  limit,
  className = "",
}: {
  exclude?: string;
  withBlurb?: boolean;
  limit?: number;
  className?: string;
}) {
  let list = services.filter((s) => s.slug !== exclude);
  if (limit) list = list.slice(0, limit);

  return (
    <div
      className={`grid gap-4 ${
        withBlurb
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      } ${className}`}
    >
      {list.map((s) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}`}
          className="group flex flex-col rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-mint hover:shadow-lift"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint-050 text-mint-600 transition group-hover:bg-mint group-hover:text-ink">
              <ServiceIcon name={s.icon} className="h-6 w-6" />
            </span>
            <span className="flex-1 font-display text-base font-bold leading-tight text-ink">
              {s.title}
            </span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint-050 text-mint-600 transition group-hover:bg-mint group-hover:text-ink">
              <Arrow className="h-4 w-4" />
            </span>
          </span>
          {withBlurb && (
            <span className="mt-3 text-sm leading-relaxed text-slate">
              {s.desc}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
