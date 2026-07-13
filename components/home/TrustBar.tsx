import Image from "next/image";
import { Leaf, Shield, Clock, Star, Check } from "@/components/Icons";
import { site } from "@/lib/site";
import { getRating } from "@/lib/rating";

const items = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Leaf, label: "Family & Pet Friendly" },
  { icon: Clock, label: "Same-Day Service" },
  { icon: Star, label: "Top-Rated Locally", href: site.googleReviewUrl },
];

const urgency = [
  "Free inspections & quotes",
  "Same-day service available",
  "Satisfaction guaranteed",
];

export default async function TrustBar() {
  const rating = await getRating();
  return (
    <section className="border-b border-line bg-white">
      {/* Urgency strip */}
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-1.5 px-5 py-2.5 sm:px-8">
          {urgency.map((u) => (
            <span
              key={u}
              className="flex items-center gap-2 text-xs font-semibold sm:text-sm"
            >
              <Check className="h-4 w-4 text-peak" />
              {u}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {items.map(({ icon: Icon, label, href }) => {
            const inner = (
              <>
                <Icon className="h-6 w-6 shrink-0 text-mint-600" />
                <span className="text-sm font-bold text-ink/80">{label}</span>
              </>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-4 py-6 text-center transition hover:bg-cream"
              >
                {inner}
              </a>
            ) : (
              <div
                key={label}
                className="flex items-center justify-center gap-3 px-4 py-6 text-center"
              >
                {inner}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-t border-line py-7">
          <span className="text-xs font-bold uppercase tracking-widest text-slate">
            Trusted Locally
          </span>
          <a
            href={site.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-cream"
          >
            <Image
              src="/images/google-image.webp"
              alt="Google Reviews"
              width={90}
              height={30}
              className="h-6 w-auto"
            />
            <span className="text-sm font-semibold text-slate">
              {rating.value} · {rating.count} reviews
            </span>
          </a>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-mint-600" />
            <span className="text-sm font-semibold text-slate">
              Licensed &amp; Insured · NV #7162
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
