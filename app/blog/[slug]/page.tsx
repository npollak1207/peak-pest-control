import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero, { HeroPanel } from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import QuoteButton from "@/components/QuoteButton";
import QuoteCTA from "@/components/home/QuoteCTA";
import JsonLd from "@/components/JsonLd";
import ArticleBody from "@/components/blog/ArticleBody";
import PostCard from "@/components/blog/PostCard";
import { Arrow, Clock, User, Calendar, Tag } from "@/components/Icons";
import { blogPostSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import {
  posts,
  getPost,
  relatedPosts,
  readingTime,
  formatDate,
  BLOG_AUTHOR,
} from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: BLOG_AUTHOR.name }],
    alternates: { canonical: path },
    openGraph: {
      title: `${post.title} | Peak Pest Control`,
      description: post.description,
      url: path,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [BLOG_AUTHOR.name],
      section: post.category,
      tags: post.keywords,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const minutes = readingTime(post.body);
  const related = relatedPosts(post, 3);

  return (
    <>
      <JsonLd
        data={blogPostSchema({
          slug: post.slug,
          title: post.title,
          description: post.description,
          image: post.image,
          imageAlt: post.imageAlt,
          date: post.date,
          category: post.category,
          keywords: post.keywords,
          authorName: BLOG_AUTHOR.name,
        })}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        panel={
          <HeroPanel title="Article details">
            <dl className="grid gap-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <User className="h-4 w-4 text-peak" />
                  Author
                </dt>
                <dd className="text-right font-semibold text-white">
                  {BLOG_AUTHOR.name}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Calendar className="h-4 w-4 text-peak" />
                  Published
                </dt>
                <dd className="text-right font-semibold text-white">
                  {formatDate(post.date)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Clock className="h-4 w-4 text-peak" />
                  Read time
                </dt>
                <dd className="text-right font-semibold text-white">
                  {minutes} min
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Tag className="h-4 w-4 text-peak" />
                  Topic
                </dt>
                <dd className="text-right font-semibold text-white">
                  {post.category}
                </dd>
              </div>
            </dl>
          </HeroPanel>
        }
      />

      <article className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {/* Featured image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line shadow-soft">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          {/* Byline */}
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line pb-8 text-sm text-slate">
            <span className="flex items-center gap-2 font-semibold text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-050 text-mint-600">
                <User className="h-4 w-4" />
              </span>
              {BLOG_AUTHOR.name}
            </span>
            <span className="text-line">•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-line">•</span>
            <span>{minutes} min read</span>
          </div>

          {/* Body */}
          <div className="mt-8">
            <ArticleBody markdown={post.body} />
          </div>

          {/* Inline CTA */}
          <div className="mt-12 rounded-3xl border-2 border-mint bg-mint-050 p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-ink">
              Dealing with this pest at your place?
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate">
              Peak serves Reno, Sparks, and northern Nevada with free
              inspections and a re-treatment guarantee. Get an honest quote,
              no pressure.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <QuoteButton className="group inline-flex items-center justify-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white">
                Get a free estimate
                <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
              </QuoteButton>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-7 py-4 text-base font-bold text-ink transition hover:border-mint hover:text-mint-600"
              >
                Call {site.phone}
              </a>
            </div>
          </div>

          {/* Author bio */}
          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-line bg-cream p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-peak">
              <User className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-base font-bold text-ink">
                {BLOG_AUTHOR.name}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate">
                {BLOG_AUTHOR.bio}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-bold text-mint-600 transition hover:text-ink"
            >
              <Arrow className="h-4 w-4 rotate-180 transition group-hover:-translate-x-1" />
              Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              align="center"
              eyebrow="Keep reading"
              title="More pest control insights"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <QuoteCTA />
    </>
  );
}
