import SectionHeading from "@/components/SectionHeading";
import { steps as defaultSteps, type Step } from "@/lib/site";

export default function Process({
  steps = defaultSteps,
  title = "Pest-free in four simple steps",
  intro = "No pushy sales, no jargon. Here's exactly what to expect from your first call to lasting protection.",
}: {
  steps?: Step[];
  title?: string;
  intro?: string;
}) {
  return (
    <section id="process" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title={title}
          intro={intro}
        />

        <div className="js-stagger relative mt-16 grid gap-8 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-transparent via-line to-transparent md:block" />
          {steps.map((s) => (
            <div key={s.n} className="relative text-center">
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mint font-display text-xl font-bold text-ink shadow-mint">
                {s.n}
              </div>
              <h3 className="mt-6 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
