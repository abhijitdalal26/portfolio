import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

const W = { maxWidth: 1240, margin: "0 auto", padding: "0 64px" };

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
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ ...W, paddingTop: 80, paddingBottom: 96 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          <Link
            href="/blog"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, marginBottom: 48, color: "var(--faint)", textDecoration: "none" }}
          >
            ← All posts
          </Link>

          <header style={{ marginBottom: 48 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--faint)" }}>
              {formatDate(post.date)}
            </span>
            <h1
              style={{
                fontFamily: "var(--disp)",
                fontSize: "clamp(28px, 5vw, 44px)",
                letterSpacing: "-0.035em",
                lineHeight: 1.08,
                color: "var(--ink)",
                fontWeight: 600,
                marginTop: 16,
                marginBottom: 16,
              }}
            >
              {post.title}
            </h1>
            {post.description && (
              <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--sub)" }}>
                {post.description}
              </p>
            )}
          </header>

          <div style={{ height: 1, background: "var(--line)", marginBottom: 40 }} />

          <article className="prose">
            <MDXRemote source={post.content} />
          </article>
        </div>
      </div>
    </div>
  );
}
