import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
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
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          <div className="blog-layout">
            <div className="blog-toc">
              <Toc items={headings} />
            </div>

            <div style={{ maxWidth: 680 }}>
              <header style={{ marginBottom: 48 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--faint)" }}>
                  {formatDate(post.date)}
                </span>
                <h1
                  style={{
                    fontFamily: "var(--sans)",
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
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      rehypePlugins: [
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: "wrap" }],
                      ],
                    },
                  }}
                />
              </article>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
