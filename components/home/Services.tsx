import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { ServiceIcon, Arrow } from "@/components/Icons";
import QuoteButton from "@/components/QuoteButton";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we treat"
            title="Protection for every pest problem"
            intro="From the ants on your counter to the rodents in your walls, we handle the pests that come with high-desert living."
          />
          <QuoteButton className="hidden shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-mint hover:text-ink md:inline-flex">
            Get my free quote
            <Arrow className="h-4 w-4" />
          </QuoteButton>
        </div>

        <div className="js-stagger mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-mint hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint-050 text-mint-600 transition group-hover:bg-mint group-hover:text-ink">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </div>
                <Arrow className="h-4 w-4 text-slate/40 transition group-hover:translate-x-1 group-hover:text-mint-600" />
              </div>
              <h3 className="mt-5 text-base font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {s.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
