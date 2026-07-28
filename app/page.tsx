import Image from "next/image";
import Link from "next/link";
import { WaveBg } from "@/components/WaveBg";
import { FadeUp } from "@/components/FadeUp";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectsByStatus } from "@/lib/projects";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const current = getProjectsByStatus("current");
  const done = getProjectsByStatus("done");
  const posts = getAllPosts().slice(0, 4);

  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", fontFamily: "var(--sans)" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="hero-wrap" style={{ position: "relative", overflow: "hidden", minHeight: "100vh", marginTop: -72, paddingTop: 72, display: "flex", flexDirection: "column" }}>
        <WaveBg />

        <div className="hero-content">
          <div className="hero-avatar">
            <Image src="/abhijit.jpg" alt="Abhijit Dalal" width={112} height={112} priority
              style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }} />
          </div>

          <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(38px, 9vw, 88px)", lineHeight: 1.0, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 24px", color: "var(--ink)" }}>
            Abhijit Dalal
          </h1>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 48, fontSize: 15, fontWeight: 500, color: "var(--sub)", flexWrap: "wrap" }}>
            {["Student", "Builder", "Engineer"].map((r, i) => (
              <span key={r} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {i > 0 && <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--faint)", display: "inline-block" }} />}
                {r}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://github.com/abhijitdalal26" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a href="https://x.com/abhijitdalal_" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-icon">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.instagram.com/abhijitdalal.26/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=agdalal_b23@el.vjti.ac.in" target="_blank" rel="noopener noreferrer" aria-label="College Email" className="social-icon">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 7 10-7"/></svg>
            </a>
            <a href="/projects/resume/Abhijit-Dalal-CV.pdf" target="_blank" rel="noopener noreferrer" aria-label="CV" className="social-icon">
              <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, letterSpacing: "0.2px" }}>CV</span>
            </a>
          </div>
        </div>

        {/* Fade wave into the page background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 160,
            pointerEvents: "none",
            background: "linear-gradient(to bottom, transparent, var(--bg))",
            zIndex: 1,
          }}
        />
      </div>

      {/* ── Projects ─────────────────────────────────────── */}
      <div className="page-wrap s-pt-80 s-pb-20">

        <FadeUp>
          <div style={{ marginBottom: 72, maxWidth: 600, position: "relative", paddingLeft: 28, borderLeft: "3px solid var(--accent)" }}>
            <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(19px, 2.2vw, 24px)", lineHeight: 1.65, color: "var(--ink)", margin: 0, position: "relative" }}>
              A final year student at VJTI, Mumbai. I love working with neural
              networks, training models, and picking apart how AI actually works.
            </p>
          </div>
        </FadeUp>

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

        <FadeUp>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 8 }}>
              Timeline
            </div>
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

      {/* ── Writing ──────────────────────────────────────── */}
      {posts.length > 0 && (
        <div className="page-wrap s-pt-64 s-pb-88">
          <FadeUp>
            <div style={{ marginBottom: 28, borderTop: "1px solid var(--line)", paddingTop: 28 }}>
              <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
                Blog
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {posts.map((post, i) => (
              <FadeUp key={post.slug} delay={(i % 2) * 90}>
                {i > 0 && <div style={{ height: 1, background: "var(--line)" }} />}
                <Link href={`/blog/${post.slug}`} className="blog-row" style={{ textUnderlineOffset: 3 }}>
                  <span style={{ fontSize: 17, fontWeight: 400, color: "var(--ink)", textDecoration: "underline", letterSpacing: "-0.02em" }}>{post.title}</span>
                  <span style={{ fontSize: 12, color: "var(--faint)", fontFamily: "var(--mono)", flexShrink: 0, whiteSpace: "nowrap" }}>{formatDate(post.date)}</span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
