import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { getSubstackPosts, formatSubstackDate } from "@/lib/substack";
import { JuliaHero } from "@/components/JuliaHero";

export const metadata: Metadata = { title: "Blog" };

export default async function Blog() {
  const posts = getAllPosts();
  const substackPosts = await getSubstackPosts();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div
        className="blog-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <JuliaHero />

        <div className="page-wrap blog-hero-inner" style={{ position: "relative", zIndex: 1, width: "100%" }}>
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

          {substackPosts.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, borderTop: "1px solid var(--line)", paddingTop: 24, marginBottom: 8, flexWrap: "wrap" }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--ink)" }}>
                  Writing on Substack
                </h2>
                <a
                  href="https://abhijitdalal.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: "var(--sub)", fontWeight: 500 }}
                >
                  Subscribe ↗
                </a>
              </div>

              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--faint)", marginBottom: 12 }}>
                I also write about history, science and AI over on Substack. Every post lives there — click through to read.
              </p>

              <div>
                {substackPosts.map((post, i) => (
                  <div key={post.link}>
                    {i > 0 && <div style={{ height: 1, background: "var(--line)" }} />}
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-row blog-row"
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: 6 }}>{post.title}</p>
                        {post.description && (
                          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--faint)" }}>{post.description}</p>
                        )}
                      </div>
                      <div className="blog-row-meta" style={{ flexShrink: 0, paddingTop: 2, textAlign: "right" }}>
                        <p style={{ fontSize: 12, color: "var(--faint)", fontFamily: "var(--mono)", marginBottom: 6, whiteSpace: "nowrap" }}>{formatSubstackDate(post.date)}</p>
                        <span style={{ fontSize: 13, color: "var(--sub)", fontWeight: 500 }}>Read on Substack ↗</span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
