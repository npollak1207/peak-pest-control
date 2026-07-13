import Link from "next/link";
import type { StaticImageData } from "next/image";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";
import HeroMedia from "./HeroMedia";
import { Arrow, Phone } from "./Icons";
import QuoteButton from "./QuoteButton";

type Crumb = { label: string; href?: string };
type HeroImage = {
  src: string | StaticImageData;
  alt: string;
  position?: string;
};

// glass card shell for the hero's right-side spec panel
export function HeroPanel({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-6 shadow-lift backdrop-blur-md sm:p-7">
      {title && (
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-peak">
          <span className="h-1.5 w-1.5 rounded-full bg-peak" />
          {title}
        </p>
      )}
      <div className={title ? "mt-5" : ""}>{children}</div>
    </div>
  );
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  image,
  panel,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  crumbs?: Crumb[];
  // full-bleed photo background, dark-scrimmed
  image?: HeroImage;
  // right-side content, usually a <HeroPanel>
  panel?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {crumbs.length > 0 && <JsonLd data={breadcrumbSchema(crumbs)} />}

      <div className="pointer-events-none absolute inset-0">
        {image ? (
          <>
            <HeroMedia {...image} />
            <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-ink/80 to-ink/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
            <div className="hero-grain absolute inset-0" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-night via-ink to-ink" />
            <div className="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-peak/12 blur-[130px]" />
            <svg
              viewBox="0 0 1200 500"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full text-peak/[0.07]"
              aria-hidden
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <path
                  key={i}
                  d={`M-60 ${420 - i * 44} L360 ${180 - i * 44} L540 ${280 - i * 44} L800 ${60 - i * 44} L1260 ${340 - i * 44}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </>
        )}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-16 sm:px-8 lg:pt-40 lg:pb-20">
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="reveal mb-6 flex flex-wrap items-center gap-2 text-sm text-white/50"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="transition hover:text-peak">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-white/25">/</span>}
              </span>
            ))}
          </nav>
        )}

        <div
          className={
            panel
              ? "grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
              : undefined
          }
        >
          <div>
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-peak backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-peak" />
              {eyebrow}
            </span>

            <h1 className="reveal reveal-1 mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              {title}
            </h1>

            {subtitle && (
              <p className="reveal reveal-2 mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                {subtitle}
              </p>
            )}

            <div className="reveal reveal-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteButton className="group inline-flex items-center justify-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-peak">
                Get a Free Estimate
                <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
              </QuoteButton>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:border-peak hover:text-peak"
              >
                <Phone className="h-5 w-5 text-peak" />
                {site.phone}
              </a>
            </div>
          </div>

          {panel && <div className="reveal reveal-4">{panel}</div>}
        </div>
      </div>
    </section>
  );
}
