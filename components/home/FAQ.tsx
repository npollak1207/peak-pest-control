import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { faqs, site } from "@/lib/site";

type FaqItem = { q: string; a: string };

export default function FAQ({
  items = faqs,
  title = "Questions? We've got answers",
}: {
  // page-specific Q&As, defaults to the general list
  items?: FaqItem[];
  title?: string;
}) {
  return (
    <section id="faq" className="bg-white py-24">
      <JsonLd data={faqSchema(items)} />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Good to know"
            title={title}
            intro="Still curious about something? Call us any time, we're happy to talk it through, no pressure."
          />
          <a
            href={site.phoneHref}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-cream px-6 py-3 text-sm font-bold text-ink transition hover:border-mint hover:text-mint-600"
          >
            Call {site.phone}
          </a>
        </div>

        <div className="js-reveal divide-y divide-line rounded-3xl border border-line bg-cream/60">
          {items.map((f) => (
            <details key={f.q} className="group px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-white text-mint-600 transition group-open:rotate-45 group-open:border-mint group-open:bg-mint group-open:text-ink">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 pr-10 text-sm leading-relaxed text-slate">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
