import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import PestLinks from "@/components/PestLinks";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Plans from "@/components/home/Plans";
import Guarantee from "@/components/home/Guarantee";
import Reviews from "@/components/home/Reviews";
import QuoteCTA from "@/components/home/QuoteCTA";
import QuoteButton from "@/components/QuoteButton";
import { Arrow, Check, Shield, Leaf, Clock } from "@/components/Icons";
import { site } from "@/lib/site";
import { heroImages } from "@/lib/heroImages";

export const metadata: Metadata = {
  title: "Pest Control Services in Reno & Sparks",
  description:
    "Residential and commercial pest control, rodent control, weed control, and more across Reno, Sparks, and northern Nevada. Same-day service available.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Pest Control Services in Reno & Sparks | Peak Pest Control",
    url: "/services",
  },
};

const propertyTypes = [
  {
    title: "Residential Pest Control",
    image: "/images/residential-service.jpg",
    alt: "Peak Pest Control technician servicing a Reno-area home",
    desc: "Year-round protection that keeps your home a no-fly, no-crawl zone, with EPA-registered products applied right where pests travel.",
    points: [
      "Interior, exterior & perimeter treatment",
      "EPA-registered products, applied precisely per label",
      "Recurring plans or one-time visits",
      "Free re-treats if pests return between visits",
    ],
  },
  {
    title: "Commercial Pest Control",
    image: "/images/commercial-service.jpg",
    alt: "Peak Pest Control technician preparing rodent bait stations for a commercial property",
    desc: "Discreet, scheduled service that protects your reputation, passes inspections, and keeps customers and staff comfortable.",
    points: [
      "Restaurants, offices, warehouses & retail",
      "Documentation ready for health inspections",
      "Flexible after-hours and weekend scheduling",
      "A dedicated tech who knows your property",
    ],
  },
];

const whatsIncluded = [
  {
    icon: Leaf,
    title: "Interior treatment",
    desc: "We treat kitchens, baths, garages, and the entry points pests use, precisely where they travel, not where your family lives.",
  },
  {
    icon: Shield,
    title: "Exterior barrier",
    desc: "A protective perimeter around your foundation, eaves, and windows stops most pests before they ever get inside.",
  },
  {
    icon: Clock,
    title: "Follow-up & guarantee",
    desc: "We check back on schedule and re-treat free between visits if anything comes back. That's the Peak Promise.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Pest control built for high-desert living"
        subtitle={`From the ants on your counter to the rodents in your walls and the weeds in your rock, Peak handles the full range of pest problems across Reno, Sparks, and northern Nevada. Call ${site.phone} for a free estimate.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image={{
          src: heroImages.pestAction,
          alt: "Peak Pest Control technician applying a targeted exterior treatment",
        }}
      />

      {/* Residential vs. commercial */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Homes & businesses"
            title="Whatever you need protected, we cover it"
            intro="Whether it's the family home or the storefront your livelihood depends on, you get the same local team, honest quotes, and same-day response."
          />

          <div className="js-stagger mt-14 grid gap-6 lg:grid-cols-2">
            {propertyTypes.map((p) => (
              <div
                key={p.title}
                className="group overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition hover:-translate-y-1 hover:border-mint hover:shadow-lift"
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate">{p.desc}</p>
                  <ul className="mt-6 grid gap-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-050 text-mint-600">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="leading-relaxed text-ink/80">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <QuoteButton className="group/btn mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-mint hover:text-ink">
                    Get my free quote
                    <Arrow className="h-4 w-4 transition group-hover/btn:translate-x-1" />
                  </QuoteButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Services />

      {/* What every visit includes, dark band */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-0 h-[380px] w-[380px] rounded-full bg-peak/10 blur-[120px]" />
          <div className="hero-grain absolute inset-0" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            invert
            eyebrow="Every visit"
            title="What you get on every service"
            intro="No matter which service or plan you choose, here's the thorough, three-part approach behind every Peak visit."
          />
          <div className="js-stagger mt-14 grid gap-6 md:grid-cols-3">
            {whatsIncluded.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-peak/15 text-peak">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-white">
                    {w.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/70">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recurring vs. one-time */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="Recurring protection or a one-time fix"
            intro="Stay protected year-round, or just knock out the problem in front of you. Either way, there's no contract and no pressure."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col rounded-3xl border-2 border-mint bg-mint-050 p-8">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">
                Most popular
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">
                Recurring protection
              </h3>
              <p className="mt-3 leading-relaxed text-slate">
                Scheduled visits keep a barrier up all year and stop problems
                before they start, and you can pause or cancel anytime. Pick the
                plan that fits your home and yard.
              </p>
              <Link
                href="#plans"
                className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-mint hover:text-ink"
              >
                See plans &amp; pricing
                <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex flex-col rounded-3xl border border-line bg-cream p-8">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate">
                One &amp; done
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">
                One-time treatment
              </h3>
              <p className="mt-3 leading-relaxed text-slate">
                Dealing with a specific problem right now? We&rsquo;ll come out,
                knock it down, and give you honest advice, with no obligation to
                sign up for anything.
              </p>
              <QuoteButton className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-mint hover:text-ink">
                Get a free quote
                <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
              </QuoteButton>
            </div>
          </div>
        </div>
      </section>

      <Plans />
      <Process />
      <Guarantee />
      <Reviews />

      {/* Targeting a specific pest */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Know your pest"
            title="Dealing with a specific pest?"
            intro="Jump straight to the pest you're fighting for local signs, risks, and exactly how we treat it in the high desert."
          />
          <div className="mt-14">
            <PestLinks limit={8} className="js-stagger" />
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/pests"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-cream px-6 py-3 text-sm font-bold text-ink transition hover:border-mint hover:text-mint-600"
            >
              See all pests we treat
              <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
