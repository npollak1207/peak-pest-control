"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Arrow } from "./Icons";

export type Season = {
  name: string;
  monthsLabel: string;
  months: number[]; // 1-12
  desc: string;
  pests: { slug: string; name: string }[];
};

// "pressure by season" cards on the pests hub (dark sections). Current
// season is highlighted after mount so static pages don't bake in a stale "now".
export default function SeasonPressure({ seasons }: { seasons: Season[] }) {
  const [month, setMonth] = useState<number | null>(null);
  useEffect(() => setMonth(new Date().getMonth() + 1), []);

  return (
    <div className="js-stagger mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {seasons.map((s) => {
        const isNow = month !== null && s.months.includes(month);
        return (
          <div
            key={s.name}
            className={`flex flex-col rounded-3xl border p-6 transition ${
              isNow
                ? "border-peak/60 bg-peak/[0.08] shadow-mint"
                : "border-white/10 bg-white/[0.05]"
            }`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl font-bold text-white">
                {s.name}
              </h3>
              <span className="text-xs font-bold uppercase tracking-widest text-peak">
                {s.monthsLabel}
              </span>
            </div>
            {isNow && (
              <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-peak px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
                </span>
                Happening now
              </span>
            )}
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
              {s.desc}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-5">
              {s.pests.map((p) => (
                <Link
                  key={p.slug}
                  href={`/pests/${p.slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/85 transition hover:border-peak hover:text-peak"
                >
                  {p.name}
                  <Arrow className="h-3 w-3 transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
