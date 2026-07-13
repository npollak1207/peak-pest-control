import SectionHeading from "@/components/SectionHeading";
import { pillars } from "@/lib/site";

export default function Pillars() {
  return (
    <section id="why" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why Peak"
          title="Pest control done the right way"
          intro="No contracts full of surprises, no products you'd worry about around your kids, just dependable, local service backed by a real guarantee."
        />

        <div className="js-stagger mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.n}
              className="group rounded-2xl border border-line bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="font-display text-4xl font-bold text-mint">
                {p.n}
              </span>
              <div className="mt-4 h-px w-10 bg-mint/40 transition group-hover:w-16" />
              <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
