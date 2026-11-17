import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { getSubstackPosts, formatSubstackDate } from "@/lib/substack";
import { JuliaHero } from "@/components/JuliaHero";

export const metadata: Metadata = { title: "Blog", alternates: { canonical: "/blog" } };

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

          {substackPosts.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--ink)" }}>
                  Writing on Substack
                </h2>
                <a
                  href="https://abhijitdalal.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe on Substack"
                  title="Subscribe on Substack"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
                      fill="#FF6719"
                    />
                  </svg>
                </a>
              </div>

              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink)", marginBottom: 12 }}>
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
                          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink)" }}>{post.description}</p>
                        )}
                        <p style={{ fontSize: 12.5, color: "var(--sub)", fontFamily: "var(--mono)", marginTop: 6 }}>{formatSubstackDate(post.date)}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 ? (
            substackPosts.length === 0 && <p style={{ color: "var(--faint)" }}>No posts yet.</p>
          ) : (
            <div style={{ marginTop: substackPosts.length > 0 ? 64 : 0 }}>
              {substackPosts.length > 0 && (
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 24, marginBottom: 8 }}>
                  <h2 style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--ink)" }}>
                    From the blog
                  </h2>
                </div>
              )}
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
                        <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink)" }}>{post.description}</p>
                      </div>
                      <div className="blog-row-meta" style={{ flexShrink: 0, paddingTop: 2 }}>
                        <p style={{ fontSize: 12.5, color: "var(--sub)", fontFamily: "var(--mono)", marginBottom: 6, whiteSpace: "nowrap" }}>{formatDate(post.date)}</p>
                        <span style={{ fontSize: 13, color: "var(--sub)", fontWeight: 500 }}>Read →</span>
                      </div>
                    </Link>
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
