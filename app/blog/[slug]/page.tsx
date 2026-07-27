import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { extractHeadings } from "@/lib/toc";
import { Toc } from "@/components/Toc";

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

  const headings = extractHeadings(post.content);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="page-wrap s-pt-80" style={{ paddingBottom: 96 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          <Toc items={headings} />

          <header style={{ marginBottom: 48 }}>
            <h1
              style={{
                fontFamily: "var(--sans)",
                fontSize: "clamp(28px, 5vw, 44px)",
                letterSpacing: "-0.035em",
                lineHeight: 1.08,
                color: "var(--ink)",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              {post.title}
            </h1>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--faint)", display: "block", marginBottom: 16 }}>
              {formatDate(post.date)}
            </span>
            {post.description && (
              <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink)" }}>
                {post.description}
              </p>
            )}
          </header>

          <div style={{ height: 1, background: "var(--line)", marginBottom: 40 }} />

          <article className="prose">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
                  ],
                },
              }}
            />
          </article>

        </div>
      </div>
    </div>
  );
}
