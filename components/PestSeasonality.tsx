"use client";

import { useEffect, useState } from "react";
import { Clock } from "./Icons";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// 12-month activity strip for a pest (dark sections). Months are typical
// peak activity for Reno-Sparks. Current month is marked after mount so
// static pages don't bake in a stale "now".
export default function PestSeasonality({
  name,
  season,
  activeMonths,
}: {
  name: string;
  season: string;
  activeMonths: number[];
}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(new Date().getMonth() + 1), []);

  const activeNow = now !== null && activeMonths.includes(now);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-white">
            When {name.toLowerCase()} are active here
          </h3>
          <p className="mt-1 text-sm text-white/60">
            Typical activity around Reno, Sparks &amp; Carson City
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {activeNow && (
            <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-peak px-4 py-1.5 text-xs font-bold text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
              </span>
              In season now
            </span>
          )}
          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold text-peak">
            <Clock className="h-4 w-4" />
            {season}
          </span>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-6 gap-x-2 gap-y-5 sm:grid-cols-12">
        {MONTHS.map((m, i) => {
          const active = activeMonths.includes(i + 1);
          const isNow = now === i + 1;
          return (
            <div key={m} className="flex flex-col items-center gap-2.5">
              <span
                className={`h-2.5 w-full rounded-full ${
                  active ? "bg-peak shadow-mint" : "bg-white/10"
                } ${isNow ? "ring-2 ring-white/60 ring-offset-2 ring-offset-ink" : ""}`}
              />
              <span
                className={`text-[11px] font-bold uppercase tracking-wide ${
                  isNow ? "text-white" : active ? "text-white/85" : "text-white/35"
                }`}
              >
                {m}
              </span>
              <span
                className={`-mt-1.5 h-3 text-[9px] font-bold uppercase tracking-widest ${
                  isNow ? "text-peak" : "text-transparent"
                }`}
                aria-hidden={!isNow}
              >
                {isNow ? "Now" : ""}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-white/45">
        Highlighted months are when {name.toLowerCase()} are most active around
        Reno and Sparks, an unusually warm or wet season can shift things a few
        weeks either way.
      </p>
    </div>
  );
}
