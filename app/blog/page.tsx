import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { FadeUp } from "@/components/FadeUp";

export const metadata: Metadata = { title: "Blog" };

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div style={{ background: "#fafaf9", minHeight: "100vh" }}>
      <div className="mx-auto px-8 pt-28 pb-24" style={{ maxWidth: "1000px" }}>
        <FadeUp>
          <p className="section-label mb-3">Writing</p>
          <h1
            className="font-bold mb-4"
            style={{ fontSize: "clamp(36px, 6vw, 60px)", letterSpacing: "-0.04em", lineHeight: 1.05, color: "#09090b" }}
          >
            Things I find<br />fascinating
          </h1>
          <p className="mb-16 text-[17px]" style={{ color: "#71717a", maxWidth: "460px", lineHeight: 1.65 }}>
            Mostly AI, deep learning, and building. Written to think out loud.
          </p>
        </FadeUp>

        {posts.length === 0 ? (
          <p style={{ color: "#a1a1aa" }}>No posts yet.</p>
        ) : (
          <div>
            {posts.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.07}>
                {i > 0 && <div style={{ height: "1px", background: "#e4e4e7" }} />}
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-8 py-7 no-underline"
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-bold mb-2 transition-colors group-hover:opacity-60"
                      style={{ fontSize: "18px", color: "#09090b", letterSpacing: "-0.02em", lineHeight: 1.25 }}
                    >
                      {post.title}
                    </p>
                    <p className="text-[14px] leading-[1.6]" style={{ color: "#a1a1aa" }}>
                      {post.description}
                    </p>
                  </div>
                  <div className="shrink-0 pt-1 text-right">
                    <p className="text-[13px] mb-2" style={{ color: "#a1a1aa" }}>{formatDate(post.date)}</p>
                    <p className="text-[13px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#3b82f6" }}>
                      Read →
                    </p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
