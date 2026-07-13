import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero, { HeroPanel } from "@/components/PageHero";
import QuoteButton from "@/components/QuoteButton";
import SectionHeading from "@/components/SectionHeading";
import PestLinks from "@/components/PestLinks";
import PestSeasonality from "@/components/PestSeasonality";
import TrustBar from "@/components/home/TrustBar";
import Guarantee from "@/components/home/Guarantee";
import Reviews from "@/components/home/Reviews";
import FAQ from "@/components/home/FAQ";
import QuoteCTA from "@/components/home/QuoteCTA";
import { ServiceIcon, Check, Arrow, Clock, Shield, Ruler, Spray, Pin } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { pestFaqs } from "@/lib/detailFaqs";
import { pests, services, plans, site, pestControlName } from "@/lib/site";

type Params = { pest: string };

export function generateStaticParams() {
  return pests.map((p) => ({ pest: p.slug }));
}

function getPest(slug: string) {
  return pests.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pest } = await params;
  const p = getPest(pest);
  if (!p) return {};
  const control = pestControlName(p);
  const title = `${control} Control in Reno & Sparks, NV`;
  const path = `/pests/${p.slug}`;
  return {
    title,
    description: `${control} control across Reno, Sparks, and northern Nevada. Free inspections and a re-treatment guarantee. Call ${site.phone}.`,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Peak Pest Control`, url: path },
  };
}

const RISK_STEPS = { Low: 1, Moderate: 2, High: 3 } as const;

export default async function PestPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { pest } = await params;
  const p = getPest(pest);
  if (!p) notFound();

  const control = pestControlName(p);
  const jsonLd = serviceSchema({
    name: `${control} Control`,
    serviceType: `${control} pest control`,
    description: p.about,
    path: `/pests/${p.slug}`,
  });

  const riskSteps = RISK_STEPS[p.risk];
  const fix = services.find((sv) => sv.slug === p.service);
  const planFrom = Math.min(...plans.map((pl) => pl.price));
  const idx = pests.indexOf(p);
  const prev = pests[(idx - 1 + pests.length) % pests.length];
  const next = pests[(idx + 1) % pests.length];

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        eyebrow="Pest Control"
        title={
          <>
            <span className="text-peak">{control}</span> control in Reno &amp;
            Sparks
          </>
        }
        subtitle={p.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pests", href: "/pests" },
          { label: p.name },
        ]}
        panel={
          <HeroPanel title="Field notes">
            <div className="flex items-center gap-4 border-b border-white/10 pb-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-peak/15 text-peak">
                <ServiceIcon name={p.icon} className="h-7 w-7" />
              </span>
              <p className="font-display text-xl font-bold text-white">
                {p.name}
              </p>
            </div>
            <dl className="mt-5 grid gap-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Clock className="h-4 w-4 text-peak" />
                  Most active
                </dt>
                <dd className="text-right font-semibold text-white">
                  {p.season}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Shield className="h-4 w-4 text-peak" />
                  Concern level
                </dt>
                <dd className="flex items-center gap-2.5 font-semibold text-white">
                  <span className="flex gap-1" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-5 rounded-full ${
                          i < riskSteps ? "bg-peak" : "bg-white/15"
                        }`}
                      />
                    ))}
                  </span>
                  {p.risk}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Ruler className="h-4 w-4 text-peak" />
                  Typical size
                </dt>
                <dd className="text-right font-semibold text-white">
                  {p.size}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Pin className="h-4 w-4 text-peak" />
                  Where they hide
                </dt>
                <dd className="text-right font-semibold text-white">
                  {p.hideout}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Spray className="h-4 w-4 text-peak" />
                  Why DIY fails
                </dt>
                <dd className="text-right font-semibold text-white">
                  {p.diy}
                </dd>
              </div>
            </dl>
          </HeroPanel>
        }
      />

      <TrustBar />

      {/* About + signs */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
          <div className="js-reveal">
            <span className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-050 text-mint-600">
                <ServiceIcon name={p.icon} className="h-7 w-7" />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-bold text-slate">
                <Clock className="h-4 w-4 text-mint-600" />
                Active: {p.season}
              </span>
            </span>

            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {p.name} in northern Nevada
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">{p.about}</p>

            {/* Why it matters */}
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-line bg-cream p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-mint-600 shadow-soft">
                <Shield className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">
                  Why it matters
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate">
                  {p.risks}
                </p>
              </div>
            </div>

            {/* The matching service + plan cross-link */}
            {fix && (
              <div className="mt-6 rounded-2xl border-2 border-mint bg-mint-050 p-6">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mint-600">
                  <ServiceIcon name={fix.icon} className="h-4 w-4" />
                  The fix
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">
                  {fix.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {p.name} are covered by our {fix.title.toLowerCase()} service.{" "}
                  {fix.desc}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Link
                    href={`/services/${fix.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-mint hover:text-ink"
                  >
                    See how it works
                    <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/services#plans"
                    className="text-sm font-bold text-mint-600 transition hover:text-ink"
                  >
                    Plans from ${planFrom}/mo
                  </Link>
                </div>
              </div>
            )}

            <QuoteButton className="group mt-8 inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white">
              Get a free inspection
              <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
            </QuoteButton>
          </div>

          {/* Signs card */}
          <div className="js-reveal rounded-3xl border border-line bg-cream p-8 lg:sticky lg:top-28">
            <h3 className="font-display text-xl font-bold text-ink">
              Signs you have {p.name.toLowerCase()}
            </h3>
            <p className="mt-2 text-sm text-slate">
              Notice any of these around your Reno or Sparks home? It&rsquo;s
              time for an inspection.
            </p>
            <ul className="mt-6 grid gap-3">
              {p.signs.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-mint-600" />
                  <span className="text-sm font-medium text-ink/80">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How we treat, dark band */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-[380px] w-[380px] rounded-full bg-peak/10 blur-[120px]" />
          <div className="hero-grain absolute inset-0" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            invert
            eyebrow="Our approach"
            title={`How we treat ${p.name.toLowerCase()}`}
            intro="Licensed, eco-conscious, and built for the high desert, every visit is backed by our re-treatment guarantee."
          />

          <div className="js-reveal mt-14">
            <PestSeasonality
              name={p.name}
              season={p.season}
              activeMonths={p.activeMonths}
            />
          </div>

          <div className="js-stagger mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {p.treatment.map((t, i) => (
              <div
                key={t}
                className="relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-base font-bold text-ink shadow-mint">
                  {i + 1}
                </span>
                <p className="mt-5 text-sm font-medium leading-relaxed text-white/80">
                  {t}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Guarantee variant="banner" />
      <Reviews
        variant="compact"
        offset={idx * 3}
        topics={[p.slug, p.service]}
      />

      {/* Related pests */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="More pests"
            title="Other pests we handle nearby"
          />
          <div className="mt-14">
            <PestLinks exclude={p.slug} limit={8} withBlurb className="js-stagger" />
          </div>

          {/* Field-guide pager */}
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            <Link
              href={`/pests/${prev.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-cream p-5 transition hover:-translate-y-0.5 hover:border-mint hover:shadow-soft"
            >
              <Arrow className="h-5 w-5 shrink-0 rotate-180 text-mint-600 transition group-hover:-translate-x-1" />
              <span>
                <span className="block text-xs font-bold uppercase tracking-widest text-slate">
                  Previous pest
                </span>
                <span className="mt-1 block font-display text-lg font-bold text-ink">
                  {prev.name}
                </span>
              </span>
            </Link>
            <Link
              href={`/pests/${next.slug}`}
              className="group flex items-center justify-end gap-4 rounded-2xl border border-line bg-cream p-5 text-right transition hover:-translate-y-0.5 hover:border-mint hover:shadow-soft"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-widest text-slate">
                  Next pest
                </span>
                <span className="mt-1 block font-display text-lg font-bold text-ink">
                  {next.name}
                </span>
              </span>
              <Arrow className="h-5 w-5 shrink-0 text-mint-600 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={pestFaqs(p)} title={`${p.name} questions, answered`} />
      <QuoteCTA />
    </>
  );
}
