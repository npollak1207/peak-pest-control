import type { ReactNode } from "react";

type IconProps = { className?: string };

const base = {
  // fixed size so the icons don't blow up when the css gets stripped out;
  // the tailwind h-*/w-* classes still win on the live site
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const Peak = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M3 19h18L14.5 6l-3 5-2-3z" />
  </svg>
);

export const Phone = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z" />
  </svg>
);

export const Check = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="m4 12 5 5L20 6" />
  </svg>
);

export const Arrow = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Shield = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Leaf = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M20 4C9 4 4 9 4 18c8 0 15-3 16-14z" />
    <path d="M4 20C7 13 12 9 18 7" />
  </svg>
);

export const Clock = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const Ruler = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M3.5 15.5 15.5 3.5l5 5-12 12z" />
    <path d="m7.5 11.5 1.7 1.7M10.5 8.5l1.7 1.7M13.5 5.5l1.7 1.7" />
  </svg>
);

export const Spray = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M8.5 9.5h5.5l.5 10h-6.5z" />
    <path d="M9.5 9.5v-3h3v3" />
    <path d="M16.5 4.5h2M16.5 7h1.2M18.5 6.2l1.3-1" />
  </svg>
);

export const Pin = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </svg>
);

export const Star = ({ className }: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="m12 2 2.9 6 6.6.6-5 4.3 1.5 6.5L12 16.9 5.9 19.4 7.4 13l-5-4.3L9 8z" />
  </svg>
);

export const User = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
  </svg>
);

export const Calendar = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="4" y="5.5" width="16" height="15" rx="2" />
    <path d="M4 10h16M8 3.5v4M16 3.5v4" />
  </svg>
);

export const Mail = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Tag = ({ className }: IconProps) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M4 4h7l9 9-7 7-9-9z" />
    <circle cx="8.5" cy="8.5" r="1.4" />
  </svg>
);

// Brand logos (full color) for social & review links
export const Instagram = ({ className }: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" className={className} aria-hidden>
    <defs>
      <linearGradient id="ig-gradient" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#feda75" />
        <stop offset="0.3" stopColor="#fa7e1e" />
        <stop offset="0.55" stopColor="#d62976" />
        <stop offset="0.8" stopColor="#962fbf" />
        <stop offset="1" stopColor="#4f5bd5" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-gradient)" d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.75.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.2 8.5 3.2 8.85 3.2 12s0 3.5.07 4.75c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.25.06 1.6.07 4.75.07s3.5-.01 4.75-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.07-1.25.07-1.6.07-4.75s0-3.5-.07-4.75c-.04-.9-.19-1.38-.32-1.7a2.9 2.9 0 0 0-.68-1.06 2.9 2.9 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.5 4.01 15.15 4 12 4zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.1-.94a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
  </svg>
);

export const Facebook = ({ className }: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" className={className} aria-hidden>
    <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
  </svg>
);

export const Google = ({ className }: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 48 48" className={className} aria-hidden>
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

// Service & pest glyphs
const glyphs: Record<string, ReactNode> = {
  home: <path d="M4 11l8-6 8 6M6 10v9h12v-9" />,
  building: (
    <>
      <path d="M5 20V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v15M15 20V9h4v11" />
      <path d="M8 8h3M8 12h3M8 16h3" />
    </>
  ),
  weed: (
    <>
      <path d="M12 21V9" />
      <path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5zM12 11c3 0 5-2 5-5-3 0-5 2-5 5z" />
    </>
  ),

  ant: (
    <>
      <circle cx="12" cy="5.2" r="1.7" />
      <ellipse cx="12" cy="10.2" rx="1.9" ry="2.1" />
      <ellipse cx="12" cy="16" rx="2.5" ry="2.7" />
      <path d="M10.8 4.1 9 2.4M13.2 4.1 15 2.4" />
      <path d="M10.2 9.2 6.5 7M10.2 10.6 6 11M10.4 12 7.5 14.4" />
      <path d="M13.8 9.2 17.5 7M13.8 10.6 18 11M13.6 12 16.5 14.4" />
    </>
  ),

  spider: (
    <>
      <circle cx="12" cy="9" r="1.5" />
      <ellipse cx="12" cy="13.5" rx="2.8" ry="3.2" />
      <path d="M9.3 11.5 5.5 9 3.5 9.6M9 13 5 12.5 3 13.4M9 14.8 5 15.6 3.4 17M9.6 16.4 6.6 18 5.6 20" />
      <path d="M14.7 11.5 18.5 9 20.5 9.6M15 13 19 12.5 21 13.4M15 14.8 19 15.6 20.6 17M14.4 16.4 17.4 18 18.4 20" />
    </>
  ),

  widow: (
    <>
      <circle cx="12" cy="8.4" r="1.4" />
      <ellipse cx="12" cy="13" rx="3" ry="3.4" />
      <path d="M10.8 11.6 13.2 11.6 10.8 14.8 13.2 14.8Z" />
      <path d="M9.2 11 5.5 8.8 3.6 9.4M9 12.8 5 12.4 3.2 13.2M9 14.6 5.2 15.4 3.8 17M9.6 16 6.8 17.6 5.8 19.4" />
      <path d="M14.8 11 18.5 8.8 20.4 9.4M15 12.8 19 12.4 20.8 13.2M15 14.6 18.8 15.4 20.2 17M14.4 16 17.2 17.6 18.2 19.4" />
    </>
  ),

  roach: (
    <>
      <path d="M12 7.2 C15.4 7.2 17 10 17 13 C17 16.2 15 18.4 12 18.4 C9 18.4 7 16.2 7 13 C7 10 8.6 7.2 12 7.2 Z" />
      <path d="M9 10.4 Q12 11.6 15 10.4" />
      <path d="M10.4 7.6 7 3.6M13.6 7.6 17 3.6" />
      <path d="M7.4 11.4 4 10.4M7.2 13.6 3.8 14M8 15.8 5.4 17.8M16.6 11.4 20 10.4M16.8 13.6 20.2 14M16 15.8 18.6 17.8" />
    </>
  ),

  cricket: (
    <>
      <path d="M8.6 9.6 C10.1 6.9 14 6.9 15.5 9.3 C16.4 10.9 16 13.6 14.5 15.3 C12.8 17.1 9.9 16.9 8.6 14.9 C7.7 13.5 7.8 11.1 8.6 9.6 Z" />
      <path d="M15.2 8.6 19.4 4.3M15.7 9.9 20 6.2" />
      <path d="M9 13.6 4.9 11 4.1 15.6" />
      <path d="M10 15.6 8.6 18.6M12 16.1 11.5 19.1" />
    </>
  ),

  silverfish: (
    <>
      <path d="M15.6 12 C15.6 9.6 11 8.2 7 9.7 C4.6 10.6 4.6 13.4 7 14.3 C11 15.8 15.6 14.4 15.6 12 Z" />
      <path d="M15.6 12 19.2 10.1M15.6 12 19.8 12M15.6 12 19.2 13.9" />
      <path d="M6.4 10.3 3.1 8.3M6.4 13.7 3.1 15.7" />
      <path d="M9.4 10.5 Q10.4 12 9.4 13.5M12 10.3 Q13 12 12 13.7" />
    </>
  ),

  earwig: (
    <>
      <path d="M5 10.2 H14 Q16.8 10.2 16.8 12 Q16.8 13.8 14 13.8 H5 Q2.8 13.8 2.8 12 Q2.8 10.2 5 10.2 Z" />
      <path d="M16.4 11 C19 10.4 20.2 11 20.2 12.2M16.4 13 C19 13.6 20.2 13 20.2 12.2" />
      <path d="M4.4 10.5 1.7 8.9M4.4 13.5 1.7 15.1" />
      <path d="M7 13.8 6 16.4M10 13.8 10 16.9M13 13.8 14 16.4" />
    </>
  ),

  scorpion: (
    <>
      <ellipse cx="12" cy="12" rx="2.2" ry="3" />
      <path d="M10 9.6 7 7.3M7 7.3 5.2 5.7M7 7.3 5.4 8.7" />
      <path d="M14 9.6 17 7.3M17 7.3 18.8 5.7M17 7.3 18.6 8.7" />
      <path d="M10.2 11 7.7 11M10.2 12.6 7.7 13M10.4 14 8 15.4" />
      <path d="M13.8 11 15.8 10.5M13.8 12.5 15.6 12.3" />
      <path d="M12 14.8 C12 17.6 13.8 19.2 16 18.7 C18.2 18.2 18.6 16 17.4 15.2M17.4 15.2 16.1 13.9" />
    </>
  ),

  beetle: (
    <>
      <circle cx="12" cy="6.2" r="1.6" />
      <path d="M12 7.8 C15 7.8 16.6 10.3 16.6 13.4 C16.6 16.6 14.6 18.4 12 18.4 C9.4 18.4 7.4 16.6 7.4 13.4 C7.4 10.3 9 7.8 12 7.8 Z" />
      <path d="M12 8.2 V18" />
      <path d="M10 11 12 13 14 11" />
      <path d="M10.8 5 8.6 3M13.2 5 15.4 3" />
      <path d="M7.6 11 4.8 10M7.4 14 4.6 15M16.4 11 19.2 10M16.6 14 19.4 15" />
    </>
  ),

  rodent: (
    <>
      <circle cx="10" cy="14" r="4" />
      <circle cx="7.5" cy="9.6" r="1.8" />
      <path d="M14 14 C16.5 13.2 17 11 19 11" />
      <path d="M13.6 15.6 16 15.1M13.6 16.4 16 16.9" />
      <circle cx="12.2" cy="12.8" r="0.55" fill="currentColor" stroke="none" />
    </>
  ),

  wasp: (
    <>
      <circle cx="12" cy="5.2" r="1.5" />
      <path d="M11 4 9.6 2.6M13 4 14.4 2.6" />
      <ellipse cx="12" cy="8.4" rx="1.8" ry="1.6" />
      <path d="M12 10 C13.9 10 15 12 15 14.4 C15 16.8 13.6 18.6 12 18.6 C10.4 18.6 9 16.8 9 14.4 C9 12 10.1 10 12 10 Z" />
      <path d="M9.6 13 14.4 13M9.4 15.6 14.6 15.6" />
      <path d="M12 18.6 12 20.6" />
      <path d="M13.4 9 C16.5 7.2 17.6 9.4 16.2 11 C15 12 13.6 11 13.4 10" />
      <path d="M10.6 9 C7.5 7.2 6.4 9.4 7.8 11 C9 12 10.4 11 10.6 10" />
    </>
  ),

  bug: (
    <>
      <ellipse cx="12" cy="13" rx="4" ry="5" />
      <path d="M12 8V18M8.2 11H4M20 11h-3.8M8 14H4M20 14h-4M8.4 17 5 19M15.6 17 19 19" />
      <circle cx="12" cy="6.5" r="1.7" />
      <path d="M10.9 5.2 9 3.4M13.1 5.2 15 3.4" />
    </>
  ),
};

export const ServiceIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => (
  <svg {...base} className={className} aria-hidden>
    {glyphs[name] ?? glyphs.bug}
  </svg>
);
