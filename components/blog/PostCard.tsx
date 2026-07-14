import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { formatDate, readingTime, type BlogPost } from "@/lib/blog";

export default function PostCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
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
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-line">•</span>
          <span>{readingTime(post.body)} min read</span>
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
