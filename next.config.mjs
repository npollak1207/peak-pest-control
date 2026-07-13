import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pin the workspace root so Next ignores the parent lockfile
  outputFileTracingRoot: __dirname,
  images: {
    // custom quality values used in the hero
    qualities: [75, 90, 95],
    // AVIF first, WebP fallback
    formats: ["image/avif", "image/webp"],
    // optimized images are content-hashed, cache them hard
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
