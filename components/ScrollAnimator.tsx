"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Reveals .js-reveal elements as they scroll in. Keyed on pathname so it
// re-runs per page (layout stays mounted across client nav). Reduced-motion
// just shows everything.
export default function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".js-reveal, .js-stagger"),
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            // stagger the direct children
            if (target.classList.contains("js-stagger")) {
              Array.from(target.children).forEach((child, i) => {
                (child as HTMLElement).style.transitionDelay = `${i * 80}ms`;
              });
            }
            target.classList.add("is-visible");
            io.unobserve(target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    els.forEach((el) => {
      // skip anything already revealed (revisited pages)
      if (!el.classList.contains("is-visible")) io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
