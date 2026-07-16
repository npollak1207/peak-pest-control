import type { Metadata } from "next";
import Link from "next/link";
import OwnerVideo from "@/components/OwnerVideo";
import { Phone, Check } from "@/components/Icons";
import { site } from "@/lib/site";

// Using the owner/about video for now. Swap to a dedicated welcome clip by
// dropping it in at public/videos/welcome.mp4 and updating this path.
const WELCOME_VIDEO_SRC = "/videos/owner-aspen.mp4";

// Hidden onboarding page — link-only, kept out of search and the sitemap.
export const metadata: Metadata = {
  title: "Welcome to Peak Pest Control",
  description: "A quick welcome video for new members of the Peak sales team.",
  robots: { index: false, follow: false, nocache: true },
};

const nextSteps = [
  "Watch the welcome video from start to finish.",
  "Save our main line so you can reach the office anytime.",
  "Reply to your onboarding email once you're ready to get started.",
];

export default function WelcomePage() {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-mint-600">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          Welcome aboard
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-[2.75rem] sm:leading-[1.1]">
          Welcome to the Peak team
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          We&rsquo;re glad you&rsquo;re here. Press play below for a quick
          welcome from the team, then follow the steps underneath to get
          started with {site.name}.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl px-5 sm:px-8">
        <OwnerVideo
          src={WELCOME_VIDEO_SRC}
          poster="/videos/owner-poster.jpg"
          posterAlt="Aspen from Peak Pest Control"
          label="Welcome to Peak"
          playLabel="Play the welcome video"
          comingSoonLabel="Welcome video coming soon"
        />
      </div>

      <div className="mx-auto mt-14 max-w-2xl px-5 sm:px-8">
        <ul className="grid gap-4 text-left">
          {nextSteps.map((step) => (
            <li key={step} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-050 text-mint-600">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="leading-relaxed text-white/80">{step}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 text-lg font-bold text-white transition hover:text-mint"
          >
            <Phone className="h-5 w-5 text-mint" />
            {site.phone}
          </a>
          <Link href="/" className="text-sm text-white/50 transition hover:text-mint">
            Explore peakpestreno.com
          </Link>
        </div>
      </div>
    </section>
  );
}
