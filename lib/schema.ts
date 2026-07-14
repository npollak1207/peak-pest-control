// JSON-LD builders. All the schema lives here so every page points at one
// canonical LocalBusiness (@id) instead of redefining it.
import { site, areas, reviews, faqs } from "@/lib/site";
import type { Rating } from "@/lib/rating";

export const BUSINESS_ID = `${site.url}/#business`;
export const WEBSITE_ID = `${site.url}/#website`;

// site-relative path -> absolute URL for schema url/item fields
const abs = (path: string) =>
  path.startsWith("http") ? path : `${site.url}${path}`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.street,
  addressLocality: site.city,
  addressRegion: site.state,
  postalCode: site.zip,
  addressCountry: "US",
};

// the canonical business node everything else references by @id
function businessNode(rating: Rating = site.rating) {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    legalName: site.name,
    url: site.url,
    image: abs(site.image),
    logo: abs(site.logo),
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    priceRange: site.priceRange,
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`,
    areaServed: areas.map((a) => ({ "@type": "City", name: `${a}, NV` })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: site.sameAs,
    // live GBP rating, see lib/rating.ts
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.count,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.quote,
    })),
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };
}

// rendered once in the root layout, so it's on every page
export function siteGraph(rating: Rating = site.rating) {
  return {
    "@context": "https://schema.org",
    "@graph": [businessNode(rating), websiteNode()],
  };
}

export function breadcrumbSchema(crumbs: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: abs(c.href) } : {}),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// a single blog post (BlogPosting), authored by the blog byline and published
// by the canonical business node.
export function blogPostSchema(post: {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  date: string;
  category: string;
  keywords?: string[];
  authorName: string;
}) {
  const url = abs(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    image: abs(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.authorName },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: post.category,
    inLanguage: "en-US",
    ...(post.keywords?.length ? { keywords: post.keywords.join(", ") } : {}),
  };
}

// the blog index as a Blog node listing its posts
export function blogSchema(items: { slug: string; title: string; date: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    name: `${site.name} Blog`,
    url: abs("/blog"),
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
    blogPost: items.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: abs(`/blog/${p.slug}`),
      datePublished: p.date,
    })),
  };
}

// one service/pest offering, linked back to the business by @id
export function serviceSchema({
  name,
  serviceType,
  description,
  path,
  areaNames = ["Reno", "Sparks", "Carson City"],
}: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  areaNames?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: abs(path),
    provider: { "@id": BUSINESS_ID },
    areaServed: areaNames.map((n) => ({ "@type": "City", name: `${n}, NV` })),
  };
}
