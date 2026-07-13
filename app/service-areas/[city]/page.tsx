import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero, { HeroPanel } from "@/components/PageHero";
import QuoteButton from "@/components/QuoteButton";
import SectionHeading from "@/components/SectionHeading";
import AreaLinks from "@/components/AreaLinks";
import ServiceMap from "@/components/ServiceMap";
import TrustBar from "@/components/home/TrustBar";
import Services from "@/components/home/Services";
import PestsWeTreat from "@/components/home/PestsWeTreat";
import Guarantee from "@/components/home/Guarantee";
import Reviews from "@/components/home/Reviews";
import FAQ from "@/components/home/FAQ";
import QuoteCTA from "@/components/home/QuoteCTA";
import { Check, Arrow, Pin, Clock } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { serviceAreas, site } from "@/lib/site";
import { heroImages } from "@/lib/heroImages";

type Params = { city: string };

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ city: a.slug }));
}

function getArea(slug: string) {
  return serviceAreas.find((a) => a.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = getArea(city);
  if (!area) return {};
  const title = `Pest Control in ${area.name}, NV`;
  const path = `/service-areas/${area.slug}`;
  return {
    title,
    description: `Eco-friendly pest control in ${area.name}, NV. Same-day service, honest pricing, and a re-treatment guarantee. Call ${site.phone}.`,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Peak Pest Control`, url: path },
  };
}

const localPoints = [
  "Same-day service available across the area",
  "EPA-registered products, applied precisely per label",
  "Free inspections and honest, upfront quotes",
  "Backed by our re-treatment guarantee",
];

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city } = await params;
  const area = getArea(city);
  if (!area) notFound();

  const jsonLd = serviceSchema({
    name: `Pest Control in ${area.name}, NV`,
    serviceType: "Pest control",
    description: area.about,
    path: `/service-areas/${area.slug}`,
    areaNames: [area.name],
  });

  const localStats = [
    { value: "Same-day", label: "Service when you call early" },
    { value: `${area.zips.length}`, label: `ZIP code${area.zips.length > 1 ? "s" : ""} covered in ${area.name}` },
    { value: "Sparks, NV", label: "Our home base, minutes away" },
    { value: "100%", label: "Satisfaction guaranteed" },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        eyebrow={`${area.name}, NV`}
        title={
          <>
            Pest control in <span className="text-peak">{area.name}</span>
          </>
        }
        subtitle={area.blurb}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: area.name },
        ]}
        image={{
          src: heroImages.fleet,
          alt: "The Peak Pest Control fleet, ready to roll out across northern Nevada",
        }}
        panel={
          <HeroPanel title={`Where we serve in ${area.name}`}>
            <dl className="grid gap-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Pin className="h-4 w-4 text-peak" />
                  County
                </dt>
                <dd className="text-right font-semibold text-white">
                  {area.county}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Clock className="h-4 w-4 text-peak" />
                  Response
                </dt>
                <dd className="text-right font-semibold text-white">
                  Same-day available
                </dd>
              </div>
            </dl>
            <p className="mt-5 border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-widest text-white/60">
              ZIP codes served
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {area.zips.map((z) => (
                <span
                  key={z}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/85"
                >
                  {z}
                </span>
              ))}
            </div>
          </HeroPanel>
        }
      />

      <TrustBar />

      {/* Localized intro + map */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="js-reveal">
            <SectionHeading
              eyebrow="Local & trusted"
              title={`Your ${area.name} pest control team`}
            />
            <p className="mt-4 text-lg leading-relaxed text-slate">{area.about}</p>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Peak is local and family-run. Whether it&rsquo;s a one-time
              problem or year-round protection for your {area.name} home or
              business, we show up on time, treat it right, and tell you exactly
              what we did, all backed by our re-treatment guarantee.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {localPoints.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-mint-600" />
                  <span className="text-sm font-medium text-ink/80">{p}</span>
                </li>
              ))}
            </ul>

            <QuoteButton className="group mt-8 inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white">
              Get a free {area.name} estimate
              <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
            </QuoteButton>
          </div>

          <div className="js-reveal">
            <ServiceMap
              query={`${area.name}, ${area.county}, Nevada`}
              title={`Map of ${area.name}, NV`}
              zoom={12}
              className="shadow-lift"
            />
            <p className="mt-3 flex items-center gap-2 text-sm text-slate">
              <Pin className="h-4 w-4 shrink-0 text-mint-600" />
              Serving all of {area.name} from our Sparks headquarters.
            </p>
          </div>
        </div>
      </section>

      {/* Local response, dark band */}
      <section className="relative overflow-hidden bg-ink py-16 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-0 h-[320px] w-[320px] rounded-full bg-peak/10 blur-[120px]" />
          <div className="hero-grain absolute inset-0" />
        </div>
        <dl className="js-stagger relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 text-center sm:px-8 lg:grid-cols-4">
          {localStats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-3xl font-bold text-peak sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mx-auto mt-2 max-w-[16rem] text-sm font-medium text-white/65">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <Services />
      <PestsWeTreat />
      <Guarantee variant="banner" />
      <Reviews variant="compact" offset={serviceAreas.indexOf(area) * 3} />

      {/* Nearby areas */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Nearby"
            title="We also serve these communities"
          />
          <div className="mt-14">
            <AreaLinks exclude={area.slug} className="js-stagger" />
          </div>
        </div>
      </section>

      <FAQ />
      <QuoteCTA />
    </>
  );
}
