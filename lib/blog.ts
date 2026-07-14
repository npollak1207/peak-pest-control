// blog posts carried over from the old WordPress site and cleaned up for the
// rebuild. they're split across blogContent1–4 so no single file gets unwieldy;
// here we stitch them back into one newest-first feed and hang the helpers the
// pages need off it. every post is bylined Aspen Chournos.
import { postsA } from "./blogContent1";
import { postsB } from "./blogContent2";
import { postsC } from "./blogContent3";
import { postsD } from "./blogContent4";

export type BlogPost = {
  slug: string;
  title: string;
  // SEO <meta name="description"> / OG description. ~150 chars, keyword-rich.
  description: string;
  // one-to-two sentence summary shown on cards and the index hero
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  category: string; // display label, e.g. "Spiders"
  image: string; // /images/blog/<slug>.(jpg|webp)
  imageAlt: string;
  keywords: string[];
  body: string; // Markdown (## / ### headings, - or * lists, **bold**)
};

// one byline for the whole blog
export const BLOG_AUTHOR = {
  name: "Aspen Chournos",
  role: "Peak Pest Control",
  bio: "Aspen Chournos writes about high-desert pest pressure and prevention for homes and businesses across Reno, Sparks, and northern Nevada.",
};

// order the topic chips show in; anything not listed falls to the end
const CATEGORY_ORDER = [
  "Pest Control",
  "Ants",
  "Spiders",
  "Rodents",
  "Insects",
  "Cockroaches",
  "Wasps & Hornets",
  "Commercial",
];

export const categorySlug = (category: string) =>
  category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// newest first
export const posts: BlogPost[] = [...postsA, ...postsB, ...postsC, ...postsD].sort(
  (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0),
);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

// topic + post count for the filter chips, ordered by CATEGORY_ORDER
export const categories = (() => {
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: categorySlug(name), count }))
    .sort((a, b) => {
      const ai = CATEGORY_ORDER.indexOf(a.name);
      const bi = CATEGORY_ORDER.indexOf(b.name);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
})();

// same-category posts first, then fill from the rest, so even a one-off
// category still gets three "keep reading" links under it
export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCat = posts.filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  );
  const others = posts.filter(
    (p) => p.slug !== post.slug && p.category !== post.category,
  );
  return [...sameCat, ...others].slice(0, limit);
}

// rough read time at ~200 wpm, never less than a minute
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
