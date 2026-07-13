import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Reno & Sparks Pest Control`,
    short_name: "Peak Pest",
    description:
      "Eco-friendly pest control in Reno, Sparks, and northern Nevada. Same-day service and a re-treatment guarantee.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1b2a",
    theme_color: "#0e1b2a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
