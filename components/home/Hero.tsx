"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import type { Rating } from "@/lib/rating";
import { Arrow, Check, Phone, Star } from "@/components/Icons";
import QuoteButton from "@/components/QuoteButton";

const chips = ["Licensed & Insured", "Eco-Friendly", "Same-Day Service"];

// slow ticker along the base of the hero
const ticker = [
  "Ants",
  "Rodents",
  "Spiders",
  "Scorpions",
  "Wasps",
  "Roaches",
  "Crickets",
  "Black Widows",
  "Earwigs",
  "Silverfish",
  "Box Elder Bugs",
  "Wolf Spiders",
  "Weeds",
];

// doubled so the list is wider than any viewport, keeps the -50% loop seamless
const tickerLoop = [...ticker, ...ticker];

// short excerpts of real Google reviews for the rotating hero card
const heroReviews = [
  { quote: "The best pest control company in Northern Nevada I've found.", name: "Maria A." },
  { quote: "Everyone at Peak is amazing. No matter which technician comes out, they're all friendly and helpful.", name: "Karen M." },
  { quote: "Peak always comes out as soon as there's an issue, which isn't often given how good a job they do.", name: "Michael O." },
  { quote: "Their work is thorough and complete. We highly recommend them.", name: "Tom Z." },
  { quote: "Polite and friendly, and he explained exactly what he was using and how it worked.", name: "Steve S." },
  { quote: "They'll come back in between services if needed, which I have needed.", name: "Julie A." },
];

type Stat = {
  // number to count up to, leave off for a plain text stat
  to?: number;
  decimals?: number;
  suffix?: string;
  text?: string;
  small: string;
  href?: string;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// counts up from 0 to `to` once active
function useCountUp(to: number, decimals: number, active: boolean) {
  const [value, setValue] = useState(active ? 0 : to);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo, snappy settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, active]);

  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatValue({ stat, active }: { stat: Stat; active: boolean }) {
  const shown = useCountUp(stat.to ?? 0, stat.decimals ?? 0, active && stat.to != null);
  if (stat.text) return <>{stat.text}</>;
  return (
    <>
      {shown}
      {stat.suffix}
    </>
  );
}

// floating glass card that cycles through Google reviews
function HeroReviewCard({ ratingValue }: { ratingValue: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % heroReviews.length),
      5200,
    );
    return () => clearInterval(id);
  }, []);

  const r = heroReviews[i];

  return (
    <figure className="reveal reveal-4 absolute bottom-36 right-8 z-10 hidden w-[19rem] rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lift backdrop-blur-xl lg:block xl:right-16">
      <div className="flex items-center gap-2">
        <div className="flex text-mint">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} className="h-4 w-4" />
          ))}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-white/50">
          {ratingValue}
        </span>
      </div>

      {/* key re-triggers the fade/slide each time the review changes */}
      <div key={i} className="hero-review-in">
        <blockquote className="mt-4 flex min-h-[5.5rem] items-start font-display text-lg font-semibold leading-snug text-white">
          “{r.quote}”
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-2 text-sm text-white/60">
          <span className="font-semibold text-white/85">{r.name}</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <a
            href={site.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto underline-offset-2 transition hover:text-peak hover:underline"
          >
            Google review
          </a>
        </figcaption>
      </div>

      {/* progress dots */}
      <div className="mt-5 flex gap-1.5">
        {heroReviews.map((_, d) => (
          <span
            key={d}
            className={`h-1 rounded-full transition-all duration-500 ${
              d === i ? "w-5 bg-peak" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </figure>
  );
}

export default function Hero({ rating }: { rating: Rating }) {
  const stats: Stat[] = [
    { to: 5000, suffix: "+", small: "Homes protected" },
    {
      to: Number(rating.value),
      decimals: 1,
      small: "Google rating",
      href: site.googleReviewUrl,
    },
    { text: "Same-day", small: "Service available" },
  ];

  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [statsActive, setStatsActive] = useState(false);
  // picked on the client so phones don't download the desktop clip.
  // null = poster only (Save-Data / reduced-motion skip the video).
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  // portrait poster on phones, landscape otherwise
  const [posterSrc, setPosterSrc] = useState("/videos/hero-poster.jpg");

  // scroll parallax on the backdrop
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onScroll = () => {
      if (!imageRef.current) return;
      const y = window.scrollY;
      // backdrop drifts slower than the page, only a slight zoom
      imageRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1.05 - Math.min(y, 800) * 0.00004})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // pick the right video per device, skip it on reduced-motion / Save-Data
  // so metered connections only load the poster
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) setPosterSrc("/videos/hero-mobile-poster.jpg");
    if (prefersReducedMotion()) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    setVideoSrc(isMobile ? "/videos/hero-mobile.mp4" : "/videos/hero.mp4");
  }, []);

  // start playback once a src is attached (autoplay is flaky when set after mount)
  useEffect(() => {
    if (!videoSrc) return;
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [videoSrc]);

  // start the count-up just after the headline lands
  useEffect(() => {
    const t = setTimeout(() => setStatsActive(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] max-h-[100svh] items-center overflow-hidden bg-ink text-white sm:max-h-none">
      {/* phones cap the section to one viewport so the bottom-pinned ticker
          sits on the fold; cap lifts at sm+ */}
      {/* full-bleed hero video (parallax + slow zoom). poster paints right
          away so there's no black box while it loads */}
      <div ref={imageRef} className="absolute inset-0 z-0 will-change-transform">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={posterSrc}
          src={videoSrc ?? undefined}
          className="h-full w-full object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </div>

      {/* Overlays: readability gradients, ridge lines, vignette, film grain */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {/* phones: even vertical scrim, keeps footage + text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/65 sm:hidden" />
        {/* sm+: left-weighted gradient since text sits on the left */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/50 to-ink/10 sm:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/70 via-transparent to-ink/40 sm:block" />
        <svg
          viewBox="0 0 1200 760"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full text-peak/[0.07]"
          aria-hidden
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <path
              key={i}
              d={`M-60 ${560 - i * 46} L360 ${250 - i * 46} L540 ${360 - i * 46} L800 ${100 - i * 46} L1260 ${440 - i * 46}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          ))}
        </svg>
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-grain absolute inset-0" />
      </div>

      {/* Rotated editorial side label */}
      <div className="pointer-events-none absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-4 lg:flex">
        <span className="h-16 w-px bg-white/25" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/45">
          Locally Owned · Reno, Nevada
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-16 pb-16 sm:px-8 sm:pt-28 sm:pb-28 md:pb-40 lg:pl-24">
        <div className="max-w-3xl">
          <span className="reveal reveal-1 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-peak backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-peak" />
            Reno · Sparks · Northern Nevada
          </span>

          <h1 className="mt-4 font-display text-[clamp(2.4rem,11vw,3.4rem)] font-bold leading-[0.98] tracking-tight sm:mt-6 sm:text-[5.5rem]">
            <span className="hero-line-mask">
              <span className="hero-line" style={{ animationDelay: "0.15s" }}>
                Reach the peak
              </span>
            </span>
            <span className="hero-line-mask">
              <span className="hero-line" style={{ animationDelay: "0.3s" }}>
                of{" "}
                <span className="relative whitespace-nowrap text-peak">
                  pest-free
                  <svg
                    viewBox="0 0 300 12"
                    className="hero-underline absolute -bottom-1 left-0 h-2.5 w-full text-mint"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M2 8 Q150 0 298 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                living.
              </span>
            </span>
          </h1>

          <p className="reveal reveal-3 mt-4 max-w-xl text-base leading-snug text-white/75 sm:mt-8 sm:text-lg sm:leading-relaxed">
            Eco-friendly pest control for northern Nevada homes and businesses,
            with same-day service and a promise that means something:{" "}
            <span className="font-semibold text-white">
              if the pests come back, so do we.
            </span>
          </p>

          <div className="reveal reveal-3 mt-5 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <QuoteButton className="hero-cta group inline-flex items-center justify-center gap-2 rounded-full bg-mint px-8 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-peak">
              Get a Free Estimate
              <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
            </QuoteButton>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition hover:border-peak/60 hover:bg-white/15 hover:text-peak"
            >
              <Phone className="h-5 w-5 text-peak" />
              {site.phone}
            </a>
          </div>

          <ul className="reveal reveal-4 mt-5 flex flex-wrap gap-x-6 gap-y-2 sm:mt-9">
            {chips.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2 text-sm font-medium text-white/70"
              >
                <Check className="h-4 w-4 text-peak" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating glass review card (layered depth, rotates through reviews) */}
      <HeroReviewCard ratingValue={rating.value} />

      {/* Bottom: count-up stats + scroll cue */}
      <div className="reveal reveal-4 absolute inset-x-0 bottom-10 z-10 hidden md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8 lg:pl-24">
          <dl className="flex items-center gap-10">
            {stats.map((stat) => {
              const inner = (
                <>
                  <dt className="font-display text-3xl font-bold tabular-nums text-peak">
                    <StatValue stat={stat} active={statsActive} />
                  </dt>
                  <dd className="text-sm text-white/60">{stat.small}</dd>
                </>
              );
              return stat.href ? (
                <a
                  key={stat.small}
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline gap-2.5 transition hover:opacity-80"
                >
                  {inner}
                </a>
              ) : (
                <div key={stat.small} className="flex items-baseline gap-2.5">
                  {inner}
                </div>
              );
            })}
          </dl>
          <a
            href="#why"
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60 transition hover:text-peak"
          >
            Scroll to explore
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 group-hover:border-peak">
              <span className="animate-bounce text-peak">↓</span>
            </span>
          </a>
        </div>
      </div>

      {/* pest ticker along the base, two halves so the -50% loop is seamless */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-white/10 bg-ink/40 py-2.5 backdrop-blur-sm">
        <div className="hero-ticker flex w-max whitespace-nowrap">
          {[...tickerLoop, ...tickerLoop].map((t, i) => (
            <span
              key={i}
              className="flex items-center text-xs font-semibold uppercase tracking-[0.25em] text-white/40"
            >
              {t}
              <span className="mx-6 h-1 w-1 rounded-full bg-peak/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
