"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { OPEN_QUOTE_EVENT, type QuotePrefill } from "./QuoteButton";
import { site } from "@/lib/site";
import { Phone } from "./Icons";

// only load the form once the modal opens, keeps it out of the main bundle
const QuoteForm = dynamic(() => import("./QuoteForm"), { ssr: false });

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<QuotePrefill | undefined>();

  useEffect(() => {
    const onOpen = (e: Event) => {
      setPrefill((e as CustomEvent<QuotePrefill | undefined>).detail);
      setOpen(true);
    };
    window.addEventListener(OPEN_QUOTE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_QUOTE_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request a free estimate"
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative my-8 w-full max-w-lg rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:bg-cream"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-mint-600">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          Free Estimate
        </span>

        <div className="mt-5">
          <QuoteForm initial={prefill} />
        </div>

        <a
          href={site.phoneHref}
          className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-ink transition hover:text-mint-600"
        >
          <Phone className="h-4 w-4 text-mint-600" />
          Prefer to call? {site.phone}
        </a>
      </div>
    </div>
  );
}
