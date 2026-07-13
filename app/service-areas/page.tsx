import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import AreaLinks from "@/components/AreaLinks";
import ServiceMap from "@/components/ServiceMap";
import TrustBar from "@/components/home/TrustBar";
import Pillars from "@/components/home/Pillars";
import QuoteCTA from "@/components/home/QuoteCTA";
import { Pin, Clock, Phone } from "@/components/Icons";
import { site } from "@/lib/site";
import { heroImages } from "@/lib/heroImages";

export const metadata: Metadata = {
  title: "Service Areas | Pest Control Across Northern Nevada",
  description:
    "Peak Pest Control serves Reno, Sparks, Carson City, and communities across northern Nevada with eco-friendly, same-day pest control.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "Service Areas | Pest Control Across Northern Nevada",
    url: "/service-areas",
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Pest control across northern Nevada"
        subtitle={`Based in Sparks and covering the greater Reno-Tahoe region. Find your city below, or just call ${site.phone} and we'll let you know if you're in our zone.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
        image={{
          src: heroImages.fleet,
          alt: "The Peak Pest Control fleet, ready to roll out across northern Nevada",
        }}
      />

      <TrustBar />

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Where we work"
            title="Communities we proudly serve"
            intro="Click your city for local pest control details, or reach out for a free estimate anywhere in the region."
          />
          <div className="mt-14">
            <AreaLinks withBlurb className="js-stagger" />
          </div>
        </div>
      </section>

      {/* Home base + regional map */}
      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="js-reveal">
            <SectionHeading
              eyebrow="Home base"
              title="Based in Sparks, minutes from everywhere we serve"
              intro="Our techs roll out from the heart of the valley every morning, which is how we can offer same-day service across the Reno-Tahoe region."
            />
            <ul className="mt-8 grid gap-4">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-mint-600 shadow-soft">
                  <Pin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{site.name}</p>
                  <p className="text-sm text-slate">{site.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-mint-600 shadow-soft">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Hours</p>
                  <p className="text-sm text-slate">{site.hours}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-mint-600 shadow-soft">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Call or text</p>
                  <a
                    href={site.phoneHref}
                    className="text-sm font-semibold text-mint-600 transition hover:text-mint"
                  >
                    {site.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="js-reveal">
            <ServiceMap zoom={9} className="shadow-lift" />
            <p className="mt-3 flex items-center gap-2 text-sm text-slate">
              <Pin className="h-4 w-4 shrink-0 text-mint-600" />
              Serving Washoe, Carson City, Lyon, Douglas &amp; Storey counties.
            </p>
          </div>
        </div>
      </section>

      <Pillars />
      <QuoteCTA />
    </>
  );
}
