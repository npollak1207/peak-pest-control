import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero, { HeroPanel } from "@/components/PageHero";
import QuoteButton from "@/components/QuoteButton";
import SectionHeading from "@/components/SectionHeading";
import ServiceLinks from "@/components/ServiceLinks";
import TrustBar from "@/components/home/TrustBar";
import Process from "@/components/home/Process";
import Guarantee from "@/components/home/Guarantee";
import Reviews from "@/components/home/Reviews";
import FAQ from "@/components/home/FAQ";
import QuoteCTA from "@/components/home/QuoteCTA";
import { ServiceIcon, Check, Arrow, Clock, Shield, Leaf } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { serviceFaqs } from "@/lib/detailFaqs";
import { pests, services, site, weedSteps } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const title = `${s.title} in Reno & Sparks, NV`;
  const path = `/services/${s.slug}`;
  return {
    title,
    description: `${s.title} across Reno, Sparks & northern Nevada, backed by our re-treatment guarantee. Free inspections and honest pricing. Call ${site.phone}.`,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Peak Pest Control`, url: path },
  };
}

// photos for the treatment walkthrough, fall back to the spray shot
const serviceImages: Record<string, { src: string; alt: string }> = {
  residential: {
    src: "/images/residential-service.jpg",
    alt: "Peak Pest Control technician servicing a Reno-area home",
  },
  commercial: {
    src: "/images/commercial-service.jpg",
    alt: "Peak Pest Control technician preparing rodent bait stations for a commercial property",
  },
};

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const jsonLd = serviceSchema({
    name: s.title,
    serviceType: s.title,
    description: s.about,
    path: `/services/${s.slug}`,
  });

  const photo = serviceImages[s.slug] ?? {
    src: "/images/pest_img.jpg",
    alt: `Peak Pest Control technician providing ${s.title.toLowerCase()} in northern Nevada`,
  };
  const coveredPests = pests.filter((p) => p.service === s.slug);
  const isWeed = s.slug === "weed-control";

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        eyebrow="Our Services"
        title={s.title}
        subtitle={s.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: s.title },
        ]}
        panel={
          <HeroPanel title="Service at a glance">
            <div className="flex items-center gap-4 border-b border-white/10 pb-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-peak/15 text-peak">
                <ServiceIcon name={s.icon} className="h-7 w-7" />
              </span>
              <p className="font-display text-xl font-bold leading-tight text-white">
                {s.title}
              </p>
            </div>
            <dl className="mt-5 grid gap-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Check className="h-4 w-4 text-peak" />
                  Coverage
                </dt>
                <dd className="text-right font-semibold text-white">
                  {s.includes.length}-part visit
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Leaf className="h-4 w-4 text-peak" />
                  Products
                </dt>
                <dd className="text-right font-semibold text-white">
                  EPA-registered, per label
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Clock className="h-4 w-4 text-peak" />
                  {isWeed ? "Timing" : "Response"}
                </dt>
                <dd className="text-right font-semibold text-white">
                  {isWeed ? "Seasonally timed" : "Same-day available"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Shield className="h-4 w-4 text-peak" />
                  Guarantee
                </dt>
                <dd className="text-right font-semibold text-white">
                  Free re-treats
                </dd>
              </div>
            </dl>
          </HeroPanel>
        }
      />

      <TrustBar />

      {/* About + who it's for */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
          <div className="js-reveal">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-050 text-mint-600">
              <ServiceIcon name={s.icon} className="h-7 w-7" />
            </span>

            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {s.title} in northern Nevada
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">{s.about}</p>

            {/* Field guides for the pests this service handles */}
            {coveredPests.length > 0 && (
              <div className="mt-7">
                <p className="text-xs font-bold uppercase tracking-widest text-slate">
                  Pests this covers
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {coveredPests.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/pests/${p.slug}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-sm font-bold text-ink/80 transition hover:border-mint hover:text-mint-600"
                    >
                      <ServiceIcon name={p.icon} className="h-4 w-4 text-mint-600" />
                      {p.name}
                      <Arrow className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <QuoteButton className="group mt-8 inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white">
              Get a free inspection
              <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
            </QuoteButton>
          </div>

          {/* Good-for card */}
          <div className="js-reveal rounded-3xl border border-line bg-cream p-8 lg:sticky lg:top-28">
            <h3 className="font-display text-xl font-bold text-ink">
              Is this service right for you?
            </h3>
            <p className="mt-2 text-sm text-slate">
              {s.title} is a great fit if any of these sound familiar.
            </p>
            <ul className="mt-6 grid gap-3">
              {s.goodFor.map((g) => (
                <li
                  key={g}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-mint-600" />
                  <span className="text-sm font-medium text-ink/80">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What's included, dark band with real photo */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-peak/10 blur-[120px]" />
          <div className="hero-grain absolute inset-0" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="js-reveal relative">
            <div className="overflow-hidden rounded-[28px] border border-white/10 shadow-lift">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1600}
                height={1067}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink/90 px-5 py-3.5 shadow-lift backdrop-blur">
              <Shield className="h-5 w-5 text-peak" />
              <p className="text-sm font-bold text-white">
                Backed by free re-treats
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              invert
              eyebrow="What's included"
              title={`What our ${s.title.toLowerCase()} covers`}
              intro="Licensed, eco-conscious, and built for the high desert, every visit is backed by our re-treatment guarantee."
            />
            <div className="js-stagger mt-10 grid gap-5 sm:grid-cols-2">
              {s.includes.map((item, i) => (
                <div
                  key={item}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-base font-bold text-ink shadow-mint">
                    {i + 1}
                  </span>
                  <p className="mt-5 text-sm font-medium leading-relaxed text-white/80">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isWeed ? (
        <Process
          steps={weedSteps}
          title="A weed-free yard in four simple steps"
          intro="No pushy sales, no jargon. Here's exactly what to expect, from your first call to a clean, weed-free landscape."
        />
      ) : (
        <Process />
      )}
      <Guarantee variant="banner" subject={isWeed ? "weeds" : "pests"} />
      <Reviews
        variant="compact"
        offset={services.indexOf(s) * 3}
        topics={[s.slug]}
      />

      {/* Other services */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="More services"
            title="Other ways we protect your property"
          />
          <div className="mt-14">
            <ServiceLinks exclude={s.slug} limit={8} withBlurb className="js-stagger" />
          </div>
        </div>
      </section>

      <FAQ items={serviceFaqs(s)} title={`${s.title} questions, answered`} />
      <QuoteCTA
        heading={isWeed ? "Ready for a cleaner, weed-free yard?" : undefined}
      />
    </>
  );
}
