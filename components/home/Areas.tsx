import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceMap from "@/components/ServiceMap";
import { serviceAreas, site } from "@/lib/site";
import { Peak, Arrow } from "@/components/Icons";

export default function Areas() {
  return (
    <section id="areas" className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute right-[-6%] top-1/2 -translate-y-1/2 opacity-[0.05]">
        <Peak className="h-[520px] w-[520px] text-mint" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Service area"
            title="Proudly serving the Reno-Tahoe region"
            intro={`Based in Sparks and covering communities across northern Nevada. Not sure if you're in our zone? Give us a call at ${site.phone}.`}
          />
          <Link
            href="/service-areas"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-mint hover:text-ink"
          >
            View all service areas
            <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="js-stagger grid grid-cols-2 gap-3 sm:grid-cols-3">
          {serviceAreas.map((a) => (
            <Link
              key={a.slug}
              href={`/service-areas/${a.slug}`}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-cream px-4 py-3 text-sm font-semibold text-ink/80 transition hover:border-mint hover:bg-mint-050 hover:text-mint-600"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
              {a.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <ServiceMap />
      </div>
    </section>
  );
}
