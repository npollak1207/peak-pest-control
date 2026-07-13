import SectionHeading from "@/components/SectionHeading";
import QuoteButton from "@/components/QuoteButton";
import { Check, Arrow } from "@/components/Icons";
import { plans, site } from "@/lib/site";

export default function Plans() {
  return (
    <section id="plans" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Simple, honest pricing"
          title="Choose the plan that fits your home"
          intro="Straightforward monthly pricing, no contracts, and the same Peak Promise on every plan. Not sure which one you need? We'll help you pick."
        />

        <div className="js-stagger mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex h-full flex-col rounded-3xl p-8 transition hover:-translate-y-1 ${
                p.featured
                  ? "bg-ink text-white shadow-lift ring-2 ring-mint"
                  : "border border-line bg-white text-ink shadow-soft hover:border-mint hover:shadow-lift"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mint px-4 py-1 text-xs font-bold uppercase tracking-widest text-ink">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-bold">{p.name}</h3>
              <p
                className={`mt-2 min-h-[3rem] text-sm leading-relaxed ${
                  p.featured ? "text-white/75" : "text-slate"
                }`}
              >
                {p.tagline}
              </p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-5xl font-bold tracking-tight">
                  ${p.price}
                </span>
                <span
                  className={`mb-1.5 text-sm font-semibold ${
                    p.featured ? "text-white/70" : "text-slate"
                  }`}
                >
                  /month
                </span>
              </div>
              <p
                className={`mt-1 text-sm font-semibold ${
                  p.featured ? "text-mint" : "text-mint-600"
                }`}
              >
                {p.cadence}
              </p>

              <ul className="mt-7 flex flex-1 flex-col gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        p.featured ? "bg-mint text-ink" : "bg-mint-050 text-mint-600"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span
                      className={
                        p.featured ? "text-white/85" : "leading-relaxed text-slate"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <QuoteButton
                className={`group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition ${
                  p.featured
                    ? "bg-mint text-ink hover:bg-white"
                    : "bg-ink text-white hover:bg-mint hover:text-ink"
                }`}
              >
                {p.cta}
                <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
              </QuoteButton>
            </div>
          ))}
        </div>

        <p className="js-reveal mt-10 text-center text-sm text-slate">
          Prices are for standard residential properties. Larger homes or heavy
          infestations may vary, we&rsquo;ll always quote you up front.{" "}
          <a href={site.phoneHref} className="font-semibold text-mint-600 hover:underline">
            Call {site.phone}
          </a>{" "}
          for a free estimate.
        </p>
      </div>
    </section>
  );
}
