import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { ServiceIcon, Arrow } from "@/components/Icons";
import QuoteButton from "@/components/QuoteButton";
import { pests } from "@/lib/site";

export default function PestsWeTreat() {
  return (
    <section id="pests" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Know your enemy"
          title="The pests we knock out"
          intro="From high-desert spiders and scorpions to the ants and rodents that sneak indoors, our treatments are built for the bugs that actually live in northern Nevada."
        />

        <div className="js-stagger mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {pests.map((p) => (
            <Link
              key={p.name}
              href={`/pests/${p.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-soft transition hover:-translate-y-1 hover:border-mint hover:shadow-lift"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint-050 text-mint-600 transition group-hover:bg-mint group-hover:text-ink">
                <ServiceIcon name={p.icon} className="h-6 w-6" />
              </span>
              <span className="flex-1 text-sm font-bold text-ink">{p.name}</span>
              <Arrow className="h-4 w-4 shrink-0 text-mint-600 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl border border-line bg-white px-6 py-8 text-center shadow-soft sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-xl text-base font-medium text-ink/80">
            Don&rsquo;t see what&rsquo;s bugging you? If it creeps, crawls, or
            flies around northern Nevada, we can handle it.
          </p>
          <QuoteButton className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white">
            Get a free estimate
            <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
