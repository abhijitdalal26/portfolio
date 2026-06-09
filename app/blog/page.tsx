import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Things I find fascinating. Mostly AI, deep learning, and building.",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto px-7 pt-16 pb-20" style={{ maxWidth: "660px" }}>
      {/* Page heading */}
      <div className="mb-14">
        <h1
          className="font-semibold mb-3"
          style={{
            fontSize: "clamp(28px, 5vw, 38px)",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: "var(--text)",
          }}
        >
          Writing
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "17px" }}>
          Things I find fascinating. Mostly AI, deep learning, and building.
        </p>
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <p style={{ color: "var(--muted)", fontSize: "15px" }}>
          No posts yet.
        </p>
      ) : (
        <div>
          {posts.map((post, i) => (
            <div key={post.slug}>
              {i > 0 && (
                <div
                  style={{ height: "1px", background: "var(--subtle)" }}
                />
              )}
              <Link href={`/blog/${post.slug}`} className="group block py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    className="text-[15px] transition-opacity group-hover:opacity-60"
                    style={{
                      color: "var(--text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {post.title}
                  </span>
                  <span
                    className="text-[13px] shrink-0"
                    style={{ color: "var(--muted)" }}
                  >
                    {formatDate(post.date)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
