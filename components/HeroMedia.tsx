"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";

// full-bleed hero photo with scroll parallax. assumes the hero is at the top
// (scrollY = scroll progress). slightly overscaled so the edge never shows.
export default function HeroMedia({
  src,
  alt,
  position = "center",
}: {
  src: string | StaticImageData;
  alt: string;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.transform = `translate3d(0, ${window.scrollY * 0.2}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 scale-[1.08] will-change-transform">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        placeholder={typeof src === "string" ? undefined : "blur"}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
