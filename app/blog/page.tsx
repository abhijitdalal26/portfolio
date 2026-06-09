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
    <div className="mx-auto px-7 pt-14 pb-20" style={{ maxWidth: "660px" }}>
      {/* Heading */}
      <div className="mb-12">
        <h1
          className="font-semibold mb-3"
          style={{
            fontSize: "clamp(30px, 5vw, 42px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            color: "var(--text)",
          }}
        >
          Writing
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "17px", lineHeight: 1.6 }}>
          Things I find fascinating. Mostly AI, deep learning, and building.
        </p>
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <p style={{ color: "var(--muted)", fontSize: "15px" }}>
          No posts yet.
        </p>
      ) : (
        <div className="flex flex-col">
          {posts.map((post, i) => (
            <div key={post.slug}>
              {i > 0 && (
                <div
                  style={{ height: "1px", background: "var(--subtle)" }}
                />
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="hover-row group block py-5 px-4 -mx-4"
              >
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <span
                    className="font-[450] text-[15.5px] transition-opacity group-hover:opacity-60"
                    style={{ color: "var(--text)", letterSpacing: "-0.015em" }}
                  >
                    {post.title}
                  </span>
                  <span
                    className="text-[12.5px] shrink-0"
                    style={{ color: "var(--muted)" }}
                  >
                    {formatDate(post.date)}
                  </span>
                </div>
                <p
                  className="text-[14px] leading-[1.55]"
                  style={{ color: "var(--muted)" }}
                >
                  {post.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
