import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";
import QuoteCTA from "@/components/home/QuoteCTA";

// shared shell for privacy/terms pages. content comes in as HTML and gets
// styled here via child selectors so the pages themselves stay plain.
export default function LegalPage({
  eyebrow,
  title,
  updated,
  crumbLabel,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  crumbLabel: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={intro}
        crumbs={[{ label: "Home", href: "/" }, { label: crumbLabel }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-sm font-medium text-slate">
            Last updated: {updated}
          </p>

          <div
            className="mt-8 space-y-5 text-[15px] leading-relaxed text-slate
              [&_a:hover]:underline [&_a]:font-semibold [&_a]:text-mint-600
              [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink
              [&_li]:leading-relaxed
              [&_strong]:font-semibold [&_strong]:text-ink
              [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
          >
            {children}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
