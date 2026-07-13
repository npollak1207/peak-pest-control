import Link from "next/link";
import { serviceAreas } from "@/lib/site";
import { Arrow } from "./Icons";

export default function AreaLinks({
  exclude,
  withBlurb = false,
  className = "",
}: {
  exclude?: string;
  withBlurb?: boolean;
  className?: string;
}) {
  const list = serviceAreas.filter((a) => a.slug !== exclude);

  return (
    <div
      className={`grid gap-4 ${
        withBlurb ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      } ${className}`}
    >
      {list.map((a) => (
        <Link
          key={a.slug}
          href={`/service-areas/${a.slug}`}
          className="group flex flex-col rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-mint hover:shadow-lift"
        >
          <span className="flex items-center justify-between">
            <span className="font-display text-lg font-bold text-ink">
              {a.name}
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint-050 text-mint-600 transition group-hover:bg-mint group-hover:text-ink">
              <Arrow className="h-4 w-4" />
            </span>
          </span>
          {withBlurb && (
            <>
              <span className="mt-2 text-sm leading-relaxed text-slate">
                {a.blurb}
              </span>
              <span className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-4 text-xs text-slate">
                <span className="font-bold text-ink">{a.county}</span>
                <span className="text-line">·</span>
                <span>
                  {a.zips.slice(0, 3).join(", ")}
                  {a.zips.length > 3 ? ` +${a.zips.length - 3}` : ""}
                </span>
              </span>
            </>
          )}
        </Link>
      ))}
    </div>
  );
}
