"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Phone, Arrow } from "./Icons";
import QuoteButton from "./QuoteButton";

export default function MobileCallBar() {
  // hidden over the hero, slides up once you scroll past it
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShown(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-3 pb-[env(safe-area-inset-bottom)] pt-3 shadow-[0_-8px_30px_-12px_rgba(14,27,42,0.25)] backdrop-blur transition-transform duration-300 ease-out lg:hidden ${
        shown
          ? "translate-y-0"
          : "pointer-events-none translate-y-[calc(100%+2rem)]"
      }`}
    >
      <div className="flex gap-3">
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink bg-white py-3 text-sm font-bold text-ink"
        >
          <Phone className="h-4 w-4 text-mint-600" />
          Call Now
        </a>
        <QuoteButton className="flex flex-1 items-center justify-center gap-2 rounded-full bg-mint py-3 text-sm font-bold text-ink shadow-mint">
          Free Estimate
          <Arrow className="h-4 w-4" />
        </QuoteButton>
      </div>
    </div>
  );
}
