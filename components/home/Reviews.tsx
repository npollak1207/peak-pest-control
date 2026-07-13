import SectionHeading from "@/components/SectionHeading";
import { reviews, site } from "@/lib/site";
import { getRating, type Rating } from "@/lib/rating";
import { Star, Arrow } from "@/components/Icons";

function ReviewCard({
  quote,
  name,
  place,
  className = "mr-6 w-[320px] shrink-0 sm:w-[380px]",
}: {
  quote: string;
  name: string;
  place: string;
  className?: string;
}) {
  return (
    <figure
      className={`flex flex-col rounded-2xl border border-line bg-white p-6 shadow-soft ${className}`}
    >
      <div className="flex text-mint">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-050 text-sm font-bold text-mint-600">
          {name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p className="text-sm font-bold text-ink">{name}</p>
          <p className="text-xs text-slate">{place}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function GoogleBadge({ rating }: { rating: Rating }) {
  return (
    <a
      href={site.googleReviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-full border border-line bg-white px-5 py-2.5 shadow-soft transition hover:border-mint hover:shadow-lift"
    >
      <div className="flex text-mint">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4" />
        ))}
      </div>
      <span className="text-sm font-bold text-ink/80">
        {rating.value} on Google · {rating.count} reviews
      </span>
      <Arrow className="h-4 w-4 text-mint-600 transition group-hover:translate-x-1" />
    </a>
  );
}

export default async function Reviews({
  variant = "marquee",
  offset = 0,
  topics = [],
}: {
  // "compact" is a static 3-card grid for detail pages
  variant?: "marquee" | "compact";
  // where the compact grid starts, so sibling pages differ
  offset?: number;
  // slugs for this page, matching reviews show first
  topics?: string[];
}) {
  const rating = await getRating();
  if (variant === "compact") {
    const start = offset % reviews.length;
    const rotated = [...reviews.slice(start), ...reviews.slice(0, start)];
    const matched = topics.length
      ? rotated.filter((r) => r.topics?.some((t) => topics.includes(t)))
      : [];
    const rest = rotated.filter((r) => !matched.includes(r));
    const picks = [...matched, ...rest].slice(0, 3);
    return (
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Neighbors love us"
              title="Trusted across northern Nevada"
            />
            <GoogleBadge rating={rating} />
          </div>
          <div className="js-stagger mt-12 grid gap-6 md:grid-cols-3">
            {picks.map((r) => (
              <ReviewCard key={r.name} {...r} className="" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Neighbors love us"
            title="Trusted across northern Nevada"
          />
          <GoogleBadge rating={rating} />
        </div>
      </div>

      {/* Auto-scrolling marquee */}
      <div
        className="group relative mt-14 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="review-marquee py-2">
          {[...reviews, ...reviews].map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
