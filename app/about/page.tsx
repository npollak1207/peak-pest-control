import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Pillars from "@/components/home/Pillars";
import Reviews from "@/components/home/Reviews";
import Guarantee from "@/components/home/Guarantee";
import QuoteCTA from "@/components/home/QuoteCTA";
import QuoteButton from "@/components/QuoteButton";
import OwnerVideo from "@/components/OwnerVideo";
import { Arrow, Check, Shield, Leaf } from "@/components/Icons";
import { site, serviceAreas } from "@/lib/site";
import { heroImages } from "@/lib/heroImages";

// temp: using the hero clip until the owner-story video is shot.
// swap to /videos/owner-story.mp4 when it's ready.
const OWNER_VIDEO_SRC = "/videos/hero.mp4";

export const metadata: Metadata = {
  title: "About Us | Local Pest Control in Reno & Sparks",
  description:
    "Peak Pest Control is a locally owned, family-run pest control company based in Sparks, NV. Meet the team and see why northern Nevada trusts us.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Local Pest Control in Reno & Sparks | Peak Pest Control",
    url: "/about",
  },
};

const stats = [
  { value: "Local", label: "Owned & operated" },
  { value: `${serviceAreas.length}+`, label: "NV communities served" },
  { value: "Same-day", label: "Service when you call early" },
  { value: "100%", label: "Satisfaction guaranteed" },
];

const missionPoints = [
  "We show up on time, do the job right, and stand behind every visit, no gimmicks.",
  "Our team is fully licensed and insured in Nevada (license #7162), background-checked, and lives in the communities they serve.",
  "We invest in industry-leading tools and training for accurate identification and treatment.",
  "We use EPA-registered products, applied precisely per label, with clear guidance on dry times and re-entry.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Local pest control, rooted in northern Nevada"
        subtitle={`Peak Pest Control is a locally owned, family-run team based right here in Sparks. We protect homes and businesses across the Reno-Tahoe high desert, and we treat every property like it's our own.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image={{
          src: heroImages.team,
          alt: "The Peak Pest Control team in front of the company fleet",
          // faces are up top in this one, keep them framed
          position: "center 30%",
        }}
      />

      {/* Story, owner video centerpiece */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Our story"
            title="Hear it straight from the owner"
            intro="Peak Pest Control is locally owned and operated, built on a simple idea: show up on time, do the job right, and stand behind the work, no gimmicks, no pressure, no runaround. Press play to hear our story firsthand."
          />
        </div>

        <div className="js-reveal mx-auto mt-12 max-w-5xl px-5 sm:px-8">
          <OwnerVideo
            src={OWNER_VIDEO_SRC}
            poster="/videos/hero-poster.jpg"
            posterAlt="The Peak Pest Control fleet lined up and ready"
            label="Meet the owner"
          />
        </div>

        <div className="mx-auto mt-8 flex flex-col items-center gap-6 px-5 sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-sm font-semibold text-ink">
            <Shield className="h-4 w-4 text-mint-600" />
            {site.license} · Licensed &amp; insured
          </div>
          <QuoteButton className="group inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white">
            Get your free estimate
            <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
          </QuoteButton>
        </div>

      </section>

      {/* Stats, dark full-bleed band */}
      <section className="relative overflow-hidden bg-ink py-16 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-0 h-[320px] w-[320px] rounded-full bg-peak/10 blur-[120px]" />
          <div className="hero-grain absolute inset-0" />
        </div>
        <dl className="js-stagger relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 text-center sm:px-8 lg:grid-cols-4">
          {stats.map((s) => (
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

      <Pillars />

      {/* Mission */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint-050 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-mint-600">
              <Shield className="h-4 w-4" />
              Our mission
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Protecting homes across northern Nevada
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              We&rsquo;re proud to be part of something bigger than pest control.
              Peak exists to deliver exceptional service to northern Nevada
              through honest work, fair pricing, and people who take real pride
              in doing the job right.
            </p>

            <ul className="mt-8 grid gap-4">
              {missionPoints.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-050 text-mint-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-relaxed text-ink/80">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="js-reveal relative order-first lg:order-last">
            <div className="overflow-hidden rounded-[28px] border border-line shadow-lift">
              <Image
                src="/images/residential-service.jpg"
                alt="A Peak Pest Control technician servicing a Reno-area home"
                width={1600}
                height={1067}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-lift sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-050 text-mint-600">
                <Leaf className="h-5 w-5" />
              </span>
              <div className="text-left">
                <p className="text-sm font-bold text-ink">Eco-conscious</p>
                <p className="text-xs text-slate">EPA-registered products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reviews />
      <Guarantee />
      <QuoteCTA />
    </>
  );
}
