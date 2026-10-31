import Link from "next/link";
import { PortraitRing } from "@/components/PortraitRing";
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

      {/* ── Hero: name + intro + links on the left, portrait ring on the right ── */}
      <section className="page-wrap hero">
        <div className="hero-text">
          <h1 className="hero-name">Abhijit Dalal</h1>
          <p className="hero-intro">
            Hello, I&apos;m a final year engineer student at VJTI, Mumbai. I love
            working with neural networks, training models, and solving
            real world problems.
          </p>
          <nav className="hero-links" aria-label="Social links">
            <a href="https://github.com/abhijitdalal26" target="_blank" rel="noopener noreferrer" className="hero-link">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
            <a href="https://x.com/abhijitdalal26" target="_blank" rel="noopener noreferrer" className="hero-link">
              <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X
            </a>
            <a href="https://abhijitdalal.substack.com/" target="_blank" rel="noopener noreferrer" className="hero-link">
              <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
              Substack
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=agdalal_b23@el.vjti.ac.in" target="_blank" rel="noopener noreferrer" className="hero-link">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 7 10-7"/></svg>
              Email
            </a>
          </nav>
        </div>

        <div className="hero-portrait">
          <PortraitRing />
        </div>
      </section>

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
