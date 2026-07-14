"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Icons";

// slim, body-free shape so the full article text never ships to the browser
export type FeedItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  category: string;
  image: string;
  imageAlt: string;
  readMinutes: number;
};

function FeedCard({ post, priority }: { post: FeedItem; priority?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition hover:-translate-y-1 hover:border-mint hover:shadow-lift">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block h-52 overflow-hidden"
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-bold uppercase tracking-widest text-peak backdrop-blur">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate">
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span className="text-line">•</span>
          <span>{post.readMinutes} min read</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink">
          <Link
            href={`/blog/${post.slug}`}
            className="transition group-hover:text-mint-600"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-mint-600 transition hover:text-ink"
        >
          Read article
          <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default function BlogFeed({
  posts,
  categories,
}: {
  posts: FeedItem[];
  categories: { name: string; count: number }[];
}) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  const chips = [{ name: "All", count: posts.length }, ...categories];

  return (
    <>
      {/* Topic filter */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {chips.map((c) => {
          const on = active === c.name;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(c.name)}
              aria-pressed={on}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
                on
                  ? "border-mint bg-mint text-ink shadow-mint"
                  : "border-line bg-white text-slate hover:border-mint hover:text-mint-600"
              }`}
            >
              {c.name}
              <span
                className={`text-xs font-bold ${on ? "text-ink/60" : "text-slate/60"}`}
              >
                {c.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <FeedCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
