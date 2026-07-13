import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import PestLinks from "@/components/PestLinks";
import PestFinder from "@/components/PestFinder";
import SeasonPressure from "@/components/SeasonPressure";
import TrustBar from "@/components/home/TrustBar";
import Process from "@/components/home/Process";
import Guarantee from "@/components/home/Guarantee";
import QuoteCTA from "@/components/home/QuoteCTA";
import { pests, site } from "@/lib/site";
import { heroImages } from "@/lib/heroImages";

export const metadata: Metadata = {
  title: "Pests We Treat | Reno & Sparks Pest Library",
  description:
    "Ants, spiders, black widows, roaches, rodents, wasps, scorpions and more, see how Peak treats the pests common to Reno, Sparks & northern Nevada.",
  alternates: { canonical: "/pests" },
  openGraph: {
    title: "Pests We Treat | Reno & Sparks Pest Library | Peak Pest Control",
    url: "/pests",
  },
};

// what spikes each season around Reno-Sparks
const seasonData = [
  {
    name: "Spring",
    monthsLabel: "Mar – May",
    months: [3, 4, 5],
    desc: "The high desert wakes up. Ant trails hit kitchens, earwigs follow the irrigation, and wasps start scouting eaves.",
    slugs: ["ants", "earwigs", "wasps-and-hornets", "black-widows"],
  },
  {
    name: "Summer",
    monthsLabel: "Jun – Aug",
    months: [6, 7, 8],
    desc: "Peak stinging and crawling season, especially around patios, sheds, block walls, and rock landscaping.",
    slugs: ["wasps-and-hornets", "black-widows", "scorpions", "ants"],
  },
  {
    name: "Fall",
    monthsLabel: "Sep – Nov",
    months: [9, 10, 11],
    desc: "Cooling nights push pests indoors in waves, crickets and spiders first, then rodents looking for warmth.",
    slugs: ["mice-and-rats", "crickets", "spiders", "box-elder-bugs", "wolf-spiders"],
  },
  {
    name: "Winter",
    monthsLabel: "Dec – Feb",
    months: [12, 1, 2],
    desc: "The pressure moves inside. Warmth, water, and stored food keep rodents and indoor insects active all winter.",
    slugs: ["mice-and-rats", "cockroaches", "silverfish"],
  },
];

const seasons = seasonData.map(({ slugs, ...s }) => ({
  ...s,
  pests: slugs.map((slug) => ({
    slug,
    name: pests.find((p) => p.slug === slug)?.name ?? slug,
  })),
}));

export default function PestsPage() {
  return (
    <>
      <PageHero
        eyebrow="Pest Library"
        title="The pests we knock out in northern Nevada"
        subtitle={`From high-desert spiders and scorpions to the ants and rodents that sneak into Reno and Sparks homes, pick a pest to see the signs, the risks, and exactly how we treat it, or just call ${site.phone}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Pests" }]}
        image={{
          src: heroImages.baitStations,
          alt: "Peak Pest Control technician preparing rodent bait stations",
        }}
      />

      <TrustBar />

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Know your enemy"
            title="Choose a pest to learn more"
            intro="Every treatment we use is built for the bugs that actually live in the Reno-Sparks high desert. Tap any pest for local details."
          />
          <div className="mt-14">
            <PestLinks withBlurb className="js-stagger" />
          </div>
        </div>
      </section>

      {/* Pest finder quiz */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Pest finder"
            title="Not sure what you've got?"
            intro="Answer three quick questions and we'll point you at the likely culprit, and exactly how we treat it."
          />
          <div className="js-reveal mt-12">
            <PestFinder />
          </div>
        </div>
      </section>

      {/* Pest pressure by season, dark band */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 bottom-0 h-[380px] w-[380px] rounded-full bg-peak/10 blur-[120px]" />
          <div className="hero-grain absolute inset-0" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            invert
            eyebrow="The high-desert calendar"
            title="Pest pressure, season by season"
            intro="Northern Nevada pests run on the weather. Here's what tends to show up at your door as the year turns."
          />
          <SeasonPressure seasons={seasons} />
        </div>
      </section>

      <Process />
      <Guarantee />
      <QuoteCTA />
    </>
  );
}
