import { ImageResponse } from "next/og";

export const alt = "Peak Pest Control, Reno & Sparks, NV pest control";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a141f 0%, #0e1b2a 60%, #10233a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 48 48">
          <path d="M6 42 L22 20 L28 27 L36 6 L44 42 Z" fill="#1fe0a0" />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            marginTop: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Peak Pest Control
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#1fe0a0",
            marginTop: 8,
            fontWeight: 600,
          }}
        >
          Modern pest control for the high desert
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.6)",
            marginTop: 28,
          }}
        >
          Reno · Sparks · Northern Nevada · (775) 446-6199
        </div>
      </div>
    ),
    { ...size },
  );
}
