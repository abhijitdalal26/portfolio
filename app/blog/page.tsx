import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { JuliaHero } from "@/components/JuliaHero";

export const metadata: Metadata = { title: "Blog" };

const W = { maxWidth: 1240, margin: "0 auto", padding: "0 48px" } as const;

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div
        className="blog-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(360px, 52vh, 520px)",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <JuliaHero />

        <div className="page-wrap" style={{ position: "relative", zIndex: 1, width: "100%", paddingBottom: 44, paddingTop: 120 }}>
          <div
            className="blog-hero-scrim"
            style={{
              display: "inline-block",
              maxWidth: 460,
              padding: "22px 26px",
              borderRadius: 14,
              background: "var(--panel-glass)",
              backdropFilter: "blur(14px) saturate(140%)",
              border: "1px solid var(--line)",
            }}
          >
            <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(30px, 4.6vw, 46px)", letterSpacing: "-0.04em", lineHeight: 1.02, fontWeight: 700, marginBottom: 10, color: "var(--ink)" }}>
              Things I find<br />fascinating
            </h1>
            <p style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.6 }}>
              Mostly AI, deep learning, and history. Written to think out loud.
            </p>
          </div>
        </div>
      </div>

      <div className="page-wrap" style={{ paddingTop: 48, paddingBottom: 88 }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>

          {posts.length === 0 ? (
            <p style={{ color: "var(--faint)" }}>No posts yet.</p>
          ) : (
            <div>
              {posts.map((post, i) => (
                <div key={post.slug}>
                  {i > 0 && <div style={{ height: 1, background: "var(--line)" }} />}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover-row blog-row"
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: 6 }}>{post.title}</p>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--faint)" }}>{post.description}</p>
                    </div>
                    <div className="blog-row-meta" style={{ flexShrink: 0, paddingTop: 2, textAlign: "right" }}>
                      <p style={{ fontSize: 12, color: "var(--faint)", fontFamily: "var(--mono)", marginBottom: 6, whiteSpace: "nowrap" }}>{formatDate(post.date)}</p>
                      <span style={{ fontSize: 13, color: "var(--sub)", fontWeight: 500 }}>Read →</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
