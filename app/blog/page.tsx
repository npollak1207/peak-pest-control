import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import QuoteCTA from "@/components/home/QuoteCTA";
import JsonLd from "@/components/JsonLd";
import BlogFeed from "@/components/blog/BlogFeed";
import { Arrow } from "@/components/Icons";
import { blogSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { posts, categories, formatDate, readingTime } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Pest Control Blog: Tips & Insights for Reno & Sparks",
  description:
    "Expert pest control tips, seasonal guides, and prevention advice for homes and businesses across Reno, Sparks, and northern Nevada.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Pest Control Blog | Peak Pest Control",
    description:
      "Seasonal pest control tips and prevention guides for Reno, Sparks, and northern Nevada.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  const feedItems = rest.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    dateLabel: formatDate(p.date),
    category: p.category,
    image: p.image,
    imageAlt: p.imageAlt,
    readMinutes: readingTime(p.body),
  }));

  return (
    <>
      <JsonLd
        data={blogSchema(
          posts.map((p) => ({ slug: p.slug, title: p.title, date: p.date })),
        )}
      />

      <PageHero
        eyebrow="Peak Pest Control Blog"
        title="Pest control tips for high-desert living"
        subtitle={`Seasonal guides, prevention advice, and straight answers on the ants, spiders, rodents, and wasps that come with life in Reno, Sparks, and northern Nevada. Questions? Call ${site.phone}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      {/* Featured latest post */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mint-600">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            Latest article
          </p>
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-6 grid overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition hover:border-mint hover:shadow-lift lg:grid-cols-2"
          >
            <div className="relative h-64 overflow-hidden lg:h-full lg:min-h-[22rem]">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-5 top-5 rounded-full bg-ink/85 px-3 py-1 text-xs font-bold uppercase tracking-widest text-peak backdrop-blur">
                {featured.category}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate">
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span className="text-line">•</span>
                <span>{readingTime(featured.body)} min read</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-slate">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-mint-600 transition group-hover:text-ink">
                Read the full article
                <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* All articles + topic filter */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="The full library"
            title="Browse every article"
            intro="Filter by the pest or topic you're dealing with, then dig into local signs, prevention, and how we treat it."
          />
          <div className="mt-12">
            <BlogFeed
              posts={feedItems}
              categories={categories.map((c) => ({
                name: c.name,
                count: c.count,
              }))}
            />
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
