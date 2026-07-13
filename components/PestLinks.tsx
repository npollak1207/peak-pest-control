import Link from "next/link";
import { pests } from "@/lib/site";
import { ServiceIcon, Arrow } from "./Icons";

export default function PestLinks({
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
  let list = pests.filter((p) => p.slug !== exclude);
  // rotate the window by the current pest's index so each page shows a
  // different set and the ones at the end of the list still get linked
  if (limit && list.length > limit) {
    const start =
      exclude != null
        ? ((pests.findIndex((p) => p.slug === exclude) + 1) % list.length +
            list.length) %
          list.length
        : 0;
    list = [...list.slice(start), ...list.slice(0, start)].slice(0, limit);
  }

  return (
    <div
      className={`grid gap-4 ${
        withBlurb
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      } ${className}`}
    >
      {list.map((p) => (
        <Link
          key={p.slug}
          href={`/pests/${p.slug}`}
          className="group flex flex-col rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-mint hover:shadow-lift"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint-050 text-mint-600 transition group-hover:bg-mint group-hover:text-ink">
              <ServiceIcon name={p.icon} className="h-6 w-6" />
            </span>
            <span className="flex-1 font-display text-lg font-bold text-ink">
              {p.name}
            </span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint-050 text-mint-600 transition group-hover:bg-mint group-hover:text-ink">
              <Arrow className="h-4 w-4" />
            </span>
          </span>
          {withBlurb && (
            <span className="mt-3 text-sm leading-relaxed text-slate">
              {p.blurb}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
