"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Phone } from "./Icons";
import { openQuoteModal } from "./QuoteButton";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // solid bar once scrolled or menu open, transparent over the hero up top
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-white/10 bg-ink/90 shadow-lift backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Peak Pest Control, home" className="flex items-center">
          <Image
            src="/peak-logo.png"
            alt="Peak Pest Control"
            width={2560}
            height={930}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/80 transition hover:text-peak"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-bold text-white transition hover:text-peak"
          >
            <Phone className="h-4 w-4 text-peak" />
            {site.phone}
          </a>
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="rounded-full bg-mint px-5 py-2.5 text-sm font-bold text-ink shadow-mint transition hover:bg-peak"
          >
            Free Estimate
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 text-white lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t bg-ink lg:hidden ${
          open ? "max-h-[80vh] border-white/10" : "max-h-0 border-transparent"
        } transition-all duration-300`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-semibold text-white/85 transition hover:bg-white/5 hover:text-peak"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-3 px-1">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-base font-bold text-white"
            >
              <Phone className="h-5 w-5 text-peak" />
              {site.phone}
            </a>
            <button
              type="button"
              onClick={() => {
                openQuoteModal();
                setOpen(false);
              }}
              className="rounded-full bg-mint px-5 py-3 text-center text-base font-bold text-ink"
            >
              Get a Free Estimate
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
