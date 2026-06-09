import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div style={{ background: "#fafaf9", minHeight: "100vh" }}>
      <div className="mx-auto px-8 pt-28 pb-24" style={{ maxWidth: "720px" }}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[13px] mb-12 transition-opacity hover:opacity-60"
          style={{ color: "#a1a1aa" }}
        >
          ← All posts
        </Link>

        <header className="mb-12">
          <p className="section-label mb-4">{formatDate(post.date)}</p>
          <h1
            className="font-bold mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", letterSpacing: "-0.035em", lineHeight: 1.08, color: "#09090b" }}
          >
            {post.title}
          </h1>
          {post.description && (
            <p style={{ fontSize: "17px", lineHeight: 1.65, color: "#71717a" }}>
              {post.description}
            </p>
          )}
        </header>

        <div style={{ height: "1px", background: "#e4e4e7", marginBottom: "2.5rem" }} />

        <article className="prose">
          <MDXRemote source={post.content} />
        </article>
      </div>
    </div>
  );
}
