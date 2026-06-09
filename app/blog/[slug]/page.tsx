import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto px-7 pt-14 pb-24" style={{ maxWidth: "660px" }}>
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-[13px] mb-10 transition-opacity hover:opacity-60"
        style={{ color: "var(--muted)" }}
      >
        ← All posts
      </Link>

      {/* Post header */}
      <header className="mb-12">
        <p className="section-label mb-4">{formatDate(post.date)}</p>
        <h1
          className="font-semibold"
          style={{
            fontSize: "clamp(26px, 5vw, 36px)",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: "var(--text)",
          }}
        >
          {post.title}
        </h1>
        {post.description && (
          <p
            className="mt-4 text-[16px] leading-[1.65]"
            style={{ color: "var(--muted)" }}
          >
            {post.description}
          </p>
        )}
      </header>

      {/* Divider */}
      <div
        className="mb-10"
        style={{ height: "1px", background: "var(--subtle)" }}
      />

      {/* Post content */}
      <article
        className="prose"
        style={{ maxWidth: "640px" }}
      >
        <MDXRemote source={post.content} />
      </article>
    </div>
  );
}
