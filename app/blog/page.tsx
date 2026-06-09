import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { FadeUp } from "@/components/FadeUp";

export const metadata: Metadata = { title: "Blog" };

const W = { maxWidth: 1240, margin: "0 auto", padding: "0 64px" };

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ ...W, paddingTop: 80, paddingBottom: 96 }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>

          <FadeUp>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--faint)" }}>
              Writing
            </span>
            <h1
              style={{
                fontFamily: "var(--disp)",
                fontSize: "clamp(36px, 6vw, 58px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                color: "var(--ink)",
                fontWeight: 600,
                marginTop: 16,
                marginBottom: 16,
              }}
            >
              Things I find<br />fascinating
            </h1>
            <p style={{ fontSize: 17, color: "var(--sub)", lineHeight: 1.65, marginBottom: 56, maxWidth: 460 }}>
              Mostly AI, deep learning, and building. Written to think out loud.
            </p>
          </FadeUp>

          {posts.length === 0 ? (
            <p style={{ color: "var(--faint)" }}>No posts yet.</p>
          ) : (
            <div>
              {posts.map((post, i) => (
                <FadeUp key={post.slug} delay={i * 0.07}>
                  {i > 0 && <div style={{ height: 1, background: "var(--line)" }} />}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ textDecoration: "none", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, padding: "28px 0" }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 8 }}
                      >
                        {post.title}
                      </p>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--faint)" }}>
                        {post.description}
                      </p>
                    </div>
                    <div style={{ flexShrink: 0, paddingTop: 2, textAlign: "right" }}>
                      <p style={{ fontSize: 13, color: "var(--faint)", marginBottom: 6 }}>{formatDate(post.date)}</p>
                      <p style={{ fontSize: 13, color: "#3b82f6" }}>Read →</p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
