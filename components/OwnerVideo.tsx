"use client";

import { useState } from "react";
import Image from "next/image";

// Click-to-play video: poster + play button, the <video> only mounts on
// click. When no poster is given, a branded gradient stands in. An empty src
// shows the "coming soon" label instead of a playable button. When webmSrc is
// given it's offered first: capable browsers pull the smaller WebM and Safari
// falls back to the MP4.
export default function OwnerVideo({
  src,
  webmSrc,
  poster,
  posterAlt,
  label = "Meet the owner",
  comingSoonLabel = "Owner video coming soon",
  playLabel = "Play the owner's video",
}: {
  src?: string;
  webmSrc?: string;
  poster?: string;
  posterAlt?: string;
  label?: string;
  comingSoonLabel?: string;
  playLabel?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(src);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[28px] border border-line bg-ink shadow-lift">
      {playing && hasVideo ? (
        <video
          controls
          autoPlay
          playsInline
          className="h-full w-full bg-ink object-cover"
        >
          {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <>
          {poster ? (
            <Image
              src={poster}
              alt={posterAlt ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-night via-ink to-night" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => hasVideo && setPlaying(true)}
              disabled={!hasVideo}
              aria-label={hasVideo ? playLabel : comingSoonLabel}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-lift transition hover:scale-105 hover:bg-white disabled:cursor-default disabled:hover:scale-100"
            >
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-8 w-8 text-ink"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/75 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
            {hasVideo ? label : comingSoonLabel}
          </span>
        </>
      )}
    </div>
  );
}
