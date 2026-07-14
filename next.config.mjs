import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Legacy URL map -------------------------------------------------------
// The old WordPress site used a different URL scheme, so every ranked page
// gets a permanent redirect to its new home to carry the SEO equity over.
// [oldPath, newPath]. Sources are slash-free; Next matches the old trailing
// -slash form too.

const corePages = [
  ["/about-us", "/about"],
  ["/contact-us", "/contact"],
  ["/privacy-policy", "/privacy"],
  ["/terms-conditions", "/terms"],
  ["/thank-you", "/contact"],
  ["/pest-control-service", "/services"],
];

// old service slugs (all "-reno-nv" suffixed) -> /services/<slug>
const services = [
  ["/residential-pest-control-reno-nv", "/services/residential"],
  ["/commercial-pest-control-reno-nv", "/services/commercial"],
  ["/rodent-control-reno-nv", "/services/rodent-control"],
  ["/ant-control-reno-nv", "/services/ant-control"],
  ["/spider-control-reno-nv", "/services/spider-control"],
  ["/wasp-hornet-control-reno-nv", "/services/wasps-hornets"],
  ["/insect-control-reno-nv", "/services/insect-control"],
  ["/weed-control-services-reno-nv", "/services/weed-control"],
];

// old "pest-control-<city>-nv" pages -> /service-areas/<slug>
const areas = [
  ["/pest-control-reno-nv", "/service-areas/reno"],
  ["/pest-control-carson-city-nv", "/service-areas/carson-city"],
  ["/pest-control-spanish-springs-nv", "/service-areas/spanish-springs"],
  ["/pest-control-sun-valley-nv", "/service-areas/sun-valley"],
  ["/pest-control-cold-springs-nv", "/service-areas/cold-springs"],
  ["/pest-control-dayton-nv", "/service-areas/dayton"],
  ["/pest-control-fernley-nv", "/service-areas/fernley"],
  ["/pest-control-gardnerville-nv", "/service-areas/gardnerville"],
  ["/pest-control-minden-nv", "/service-areas/minden"],
  ["/pest-control-silver-springs-nv", "/service-areas/silver-springs"],
];

// blog posts we've migrated so far. old site served these at the root, the
// rebuild nests them under /blog, so keep the slug and just add the prefix.
const migratedPosts = [
  "why-professional-pest-control-beats-store-bought-sprays",
  "how-to-protect-outdoor-spaces-from-summer-pests",
  "how-seasonal-pest-control-helps-protect-property-value",
  "what-attracts-wasps-around-homes-during-summer",
  "what-attracts-cockroaches-to-kitchens-and-bathrooms",
  "how-summer-irrigation-can-attract-more-pests",
  "why-should-i-consider-a-local-pest-control-near-me",
  "insect-control-myths-debunked-what-reno-homeowners-need-to-know",
  "spiders-found-inside-what-that-usually-means-for-your-home",
  "spring-pest-problems-that-can-worsen-over-time",
  "ant-control-in-reno-methods-that-work-better-than-baits-alone",
  "spring-home-maintenance-tasks-that-help-prevent-pests",
  "how-to-keep-your-business-pest-free-during-springtime",
  "eco-friendly-spider-control-solutions-to-consider-for-your-reno-home",
  "why-seasonal-pest-control-matters-in-semi-arid-climates",
  "why-you-should-schedule-a-pest-treatment-as-spring-comes",
  "why-spiders-can-be-more-active-in-spring",
  "how-moisture-gaps-around-your-home-attract-pests",
  "why-homeowners-should-avoid-over-the-counter-pest-sprays",
  "how-to-choose-eco-friendly-pest-solutions-that-work",
  "finding-ant-trails-this-spring-why-professional-service-is-worth-it",
  "why-your-home-needs-a-year-round-pest-maintenance-plan",
  "post-winter-pest-prevention-checklist-for-reno-sparks-homeowners",
  "how-to-inspect-your-reno-area-home-for-insect-hiding-spots",
  "rodent-proofing-your-property-for-snow-and-cold-weather",
  "how-to-seal-entry-points-to-keep-pests-out-this-winter",
  "why-one-time-pest-treatments-rarely-solve-recurring-problems",
  "the-hidden-dangers-of-spiders-in-cold-climate-homes",
  "how-changing-seasons-affect-insect-activity-around-your-home",
  "diy-pest-control-mistakes-that-cost-more-later",
  "fall-ant-activity-what-homeowners-often-overlook",
  "five-signs-your-home-has-a-hidden-spider-infestation",
  "why-rodents-move-indoors-as-reno-temperatures-drop",
  "early-signs-of-rodent-activity-indoors",
  "how-to-prevent-common-insect-infestations-this-fall-season",
  "how-the-chilly-fall-season-can-influence-ant-behavior",
];

const legacyRedirects = [
  ...corePages,
  ...services,
  ...areas,
  ...migratedPosts.map((slug) => [`/${slug}`, `/blog/${slug}`]),
].map(([source, destination]) => ({ source, destination, permanent: true }));

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
  async redirects() {
    return [
      ...legacyRedirects,
      // old blog category archives fold into the single blog index
      { source: "/category/:slug*", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
