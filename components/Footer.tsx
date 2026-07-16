import Image from "next/image";
import Link from "next/link";
import { areas, nav, services, site } from "@/lib/site";
import { Phone, Instagram, Facebook, Google } from "./Icons";

const socialLinks = [
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { label: "Facebook", href: site.social.facebook, Icon: Facebook },
  { label: "Google reviews", href: site.googleReviewUrl, Icon: Google },
];

export default function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label="Peak Pest Control, home" className="inline-flex">
              <Image
                src="/peak-logo.png"
                alt="Peak Pest Control"
                width={2560}
                height={930}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Eco-friendly pest control serving Reno, Sparks, and the greater
              northern Nevada high desert.
            </p>
            <a
              href={site.phoneHref}
              className="mt-6 inline-flex items-center gap-2 text-lg font-bold text-white transition hover:text-mint"
            >
              <Phone className="h-5 w-5 text-mint" />
              {site.phone}
            </a>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-white/40 hover:bg-white/10"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-mint">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-mint">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-mint">
              Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="transition hover:text-mint"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-mint">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li>{site.address}</li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition hover:text-mint"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.hours}</li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-white/40">
              Serving {areas.slice(0, 6).join(", ")} &amp;{" "}
              <Link href="/service-areas" className="transition hover:text-mint">
                more
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition hover:text-mint">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-mint">
              Terms of Service
            </Link>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-mint" />
              Licensed &amp; Insured · NV License #7162
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
