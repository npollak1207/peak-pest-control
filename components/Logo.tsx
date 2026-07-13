import Link from "next/link";

// SVG wordmark so it stays crisp on light or dark
export default function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const text = tone === "light" ? "#ffffff" : "#0e1b2a";
  const sub = tone === "light" ? "rgba(255,255,255,0.65)" : "#5c6b7a";

  return (
    <Link
      href="/"
      aria-label="Peak Pest Control, home"
      className={`group flex items-center gap-2.5 ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 shrink-0"
        aria-hidden
      >
        <path
          d="M6 42 L22 20 L28 27 L36 6 L44 42 Z"
          fill="#1fe0a0"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-xl font-bold tracking-tight"
          style={{ color: text }}
        >
          Peak
        </span>
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: sub }}
        >
          Pest Control
        </span>
      </span>
    </Link>
  );
}
