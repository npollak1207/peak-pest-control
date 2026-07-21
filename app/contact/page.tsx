import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceMap from "@/components/ServiceMap";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { Phone, Mail, Pin, Clock, Arrow } from "@/components/Icons";
import { BUSINESS_ID, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Peak Pest Control in Sparks, NV. Call ${site.phone} or request a free estimate for pest control in Reno, Sparks, and northern Nevada.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Peak Pest Control | Reno & Sparks, NV",
    description:
      "Call, email, or request a free estimate for eco-friendly pest control across Reno, Sparks, and northern Nevada.",
    url: "/contact",
  },
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`;

// a ContactPage node pointing back at the one business record
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.name}`,
  url: `${site.url}/contact`,
  mainEntity: { "@id": BUSINESS_ID },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Contact" }];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactSchema} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      {/* Hero with the estimate form built in */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0">
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
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-16 sm:px-8 lg:pt-40 lg:pb-24">
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

          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            {/* Left: pitch + direct contact */}
            <div>
              <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-peak backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-peak" />
                Contact Us
              </span>

              <h1 className="reveal reveal-1 mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                Let&rsquo;s get your pest problem handled
              </h1>

              <p className="reveal reveal-2 mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                Fill out the form and we&rsquo;ll get right back to you, usually
                the same day. Prefer to talk it through? Reach us directly
                anytime.
              </p>

              <div className="reveal reveal-3 mt-8 grid gap-3 sm:max-w-md">
                <a
                  href={site.phoneHref}
                  className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur transition hover:border-peak/60"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-peak/15 text-peak">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-white/50">
                      Call or text
                    </span>
                    <span className="block text-lg font-bold text-white">
                      {site.phone}
                    </span>
                  </span>
                </a>
                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur transition hover:border-peak/60"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-peak/15 text-peak">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wide text-white/50">
                        Email
                      </span>
                      <span className="block truncate text-sm font-bold text-white">
                        {site.email}
                      </span>
                    </span>
                  </a>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-peak/15 text-peak">
                      <Clock className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-white/50">
                        Hours
                      </span>
                      <span className="block text-sm font-bold text-white">
                        Mon&ndash;Fri
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: the form on a light card */}
            <div className="reveal reveal-4">
              <div className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-8">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to reach us */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Get in touch"
            title="However you'd rather reach us"
            intro="Prefer to talk it through, send a quick email, or just stop by? Here's every way to get ahold of the Peak team."
          />

          <div className="js-stagger mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={site.phoneHref}
              className="group flex flex-col rounded-3xl border border-line bg-cream p-8 transition hover:-translate-y-1 hover:border-mint hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-050 text-mint-600">
                <Phone className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                Call or text
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Fastest way to reach us. Call before noon and we&rsquo;ll do our
                best to be out the same day.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-bold text-mint-600 transition group-hover:text-ink">
                {site.phone}
                <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="group flex flex-col rounded-3xl border border-line bg-cream p-8 transition hover:-translate-y-1 hover:border-mint hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-050 text-mint-600">
                <Mail className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                Email us
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Send over the details and any photos of the problem area and
                we&rsquo;ll follow up with a quote.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 break-all font-bold text-mint-600 transition group-hover:text-ink">
                {site.email}
                <Arrow className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
              </span>
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-3xl border border-line bg-cream p-8 transition hover:-translate-y-1 hover:border-mint hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-050 text-mint-600">
                <Pin className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                Visit our office
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {site.street}
                <br />
                {site.city}, {site.state} {site.zip}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-bold text-mint-600 transition group-hover:text-ink">
                Get directions
                <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          {/* Hours + license strip */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-line bg-white p-6 text-sm shadow-soft sm:flex-row sm:px-8">
            <p className="flex items-center gap-3 font-semibold text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint-050 text-mint-600">
                <Clock className="h-5 w-5" />
              </span>
              {site.hours}
            </p>
            <p className="flex items-center gap-2 text-slate">
              <span className="inline-block h-2 w-2 rounded-full bg-mint" />
              Licensed &amp; insured · {site.license}
            </p>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Find us"
                title="Serving Reno, Sparks & northern Nevada"
                intro="We're based in Sparks and cover the whole Truckee Meadows and beyond, from Carson City to Fernley. Not sure you're in our zone? Just ask."
              />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-mint hover:text-ink"
              >
                Open in Google Maps
                <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </div>
            <ServiceMap title={`${site.name} office in ${site.city}, ${site.state}`} />
          </div>
        </div>
      </section>
    </>
  );
}
