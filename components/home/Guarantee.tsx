import { site } from "@/lib/site";
import { Arrow, Shield } from "@/components/Icons";

export default function Guarantee({
  variant = "full",
  subject = "pests",
}: {
  // "banner" is the slim one-liner for detail pages, "full" is the homepage section
  variant?: "full" | "banner";
  // what comes back if we miss, "pests" or "weeds"
  subject?: string;
}) {
  if (variant === "banner") {
    return (
      <section className="bg-mint">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-8 text-center sm:px-8 lg:flex-row lg:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink/10 text-ink">
              <Shield className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-xl font-bold text-ink sm:text-2xl">
                If the {subject} come back, so do we.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink/75">
                Free re-treats between scheduled visits, no questions, no extra
                invoice. That&rsquo;s the Peak Promise.
              </p>
            </div>
          </div>
          <a
            href={site.phoneHref}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition hover:bg-night"
          >
            Call {site.phone}
            <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-mint py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <svg
          viewBox="0 0 1200 300"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full text-ink"
          aria-hidden
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d={`M-50 ${260 - i * 34} L400 ${80 - i * 34} L560 ${150 - i * 34} L820 ${20 - i * 34} L1250 ${200 - i * 34}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center sm:px-8 lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-ink/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink">
            <Shield className="h-4 w-4" />
            The Peak Promise
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            If the {subject} come back, so do we.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">
            We stand behind every treatment. If {subject} return between
            scheduled visits, we&rsquo;ll re-treat your property free of charge,
            no questions, no extra invoice.
          </p>
        </div>
        <a
          href={site.phoneHref}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-bold text-white transition hover:bg-night"
        >
          Call {site.phone}
          <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
