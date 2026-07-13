import Image from "next/image";
import { site } from "@/lib/site";
import { Check, Phone } from "@/components/Icons";
import QuoteForm from "@/components/QuoteForm";

const perks = [
  "Free, no-obligation inspection",
  "Same-day service when you call before noon",
  "EPA-registered products applied per label",
  "Backed by the Peak re-treatment guarantee",
];

export default function QuoteCTA({
  heading = "Ready to reach peak pest-free living?",
}: {
  heading?: string;
}) {
  return (
    <section id="quote" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-lift lg:grid-cols-2">
          {/* Left: pitch (dark panel over real service photo) */}
          <div className="relative flex flex-col justify-between gap-8 overflow-hidden bg-ink p-8 text-white sm:p-10">
            <Image
              src="/images/pest_img.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-25"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/85 to-ink/95" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-mint/20 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Free Estimate
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {heading}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70">
                Tell us what&rsquo;s bugging you and we&rsquo;ll get back to you
                fast with a free quote, usually the same day.
              </p>

              <ul className="mt-8 space-y-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-white/85">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
                    <span className="text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={site.phoneHref}
              className="relative inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 transition hover:border-mint/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/15">
                <Phone className="h-5 w-5 text-mint" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-white/50">
                  Prefer to call?
                </span>
                <span className="block text-lg font-bold text-white">
                  {site.phone}
                </span>
              </span>
            </a>
          </div>

          {/* Right: form */}
          <div className="p-8 sm:p-10">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
