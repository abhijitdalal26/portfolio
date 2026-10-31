import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { FadeUp } from "@/components/FadeUp";
import { ProjectCard } from "@/components/ProjectCard";
import { StackMarquees } from "@/components/StackMarquees";
import { getProjectsByStatus } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";
import { getSubstackPosts, formatSubstackDate } from "@/lib/substack";

export default async function Home() {
  const current = getProjectsByStatus("current");
  const done = getProjectsByStatus("done");

  const localPosts = getAllPosts();
  const substackPosts = await getSubstackPosts();

  // One writing list: local posts + Substack, newest first.
  const writing = [
    ...localPosts.map((p) => ({
      key: `local-${p.slug}`,
      title: p.title,
      date: p.date,
      href: `/blog/${p.slug}`,
      external: false,
    })),
    ...substackPosts.map((p) => ({
      key: `substack-${p.link}`,
      title: p.title,
      date: p.date,
      href: p.link,
      external: true,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", fontFamily: "var(--sans)" }}>

      <HomeHero />

      {/* ── Projects ─────────────────────────────────────── */}
      <div className="page-wrap s-pb-20 home-intro-wrap">

        {current.length > 0 && (
          <>
            <FadeUp>
              <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 14 }}>
                <span className="pulse-dot" />
                <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
                  Currently Working On
                </h2>
              </div>
            </FadeUp>

            <div className="grid-2" style={{ marginBottom: 72 }}>
              {current.map((p, i) => (
                <FadeUp key={p.slug} delay={(i % 2) * 90} className="h-full">
                  <ProjectCard project={p} />
                </FadeUp>
              ))}
            </div>
          </>
        )}

        <div id="projects">
          <FadeUp>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
                Projects
              </h2>
            </div>
          </FadeUp>

          <div className="grid-2">
            {done.map((p, i) => (
              <FadeUp key={p.slug} delay={(i % 2) * 90} className="h-full">
                <ProjectCard project={p} />
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── Writing ──────────────────────────────────────── */}
      {writing.length > 0 && (
        <div className="page-wrap s-pt-64 s-pb-88">
          <FadeUp>
            <div style={{ marginBottom: 28, borderTop: "1px solid var(--line)", paddingTop: 28 }}>
              <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
                Blog
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {writing.map((post, i) => (
              <FadeUp key={post.key} delay={(i % 2) * 90}>
                {post.external ? (
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-row"
                    style={{ textUnderlineOffset: 3 }}
                  >
                    <span style={{ fontSize: 17, fontWeight: 400, color: "var(--ink)", letterSpacing: "-0.02em" }}>{post.title}</span>
                    <span style={{ fontSize: 12, color: "var(--faint)", fontFamily: "var(--mono)", flexShrink: 0, whiteSpace: "nowrap" }}>{formatSubstackDate(post.date)} ↗</span>
                  </a>
                ) : (
                  <Link href={post.href} className="blog-row" style={{ textUnderlineOffset: 3 }}>
                    <span style={{ fontSize: 17, fontWeight: 400, color: "var(--ink)", letterSpacing: "-0.02em" }}>{post.title}</span>
                    <span style={{ fontSize: 12, color: "var(--faint)", fontFamily: "var(--mono)", flexShrink: 0, whiteSpace: "nowrap" }}>{formatSubstackDate(post.date)}</span>
                  </Link>
                )}
              </FadeUp>
            ))}
          </div>

          <Link href="/blog" style={{ display: "inline-block", marginTop: 18, fontSize: 13, color: "var(--sub)", fontWeight: 500 }}>
            All writing →
          </Link>
        </div>
      )}

      {/* ── Stack ────────────────────────────────────────── */}
      <StackMarquees />

    </div>
  );
}
