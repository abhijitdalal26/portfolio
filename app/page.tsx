"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback } from "react";
import { WaveBg } from "@/components/WaveBg";
import { FadeUp } from "@/components/FadeUp";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectsByStatus } from "@/lib/projects";

function ArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
function ArrowUpRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12L12 4M5 4h7v7" />
    </svg>
  );
}

function GlowCard({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--gx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--gy", `${e.clientY - r.top}px`);
  }, []);
  return (
    <div ref={ref} className={`glow-card${className ? " " + className : ""}`} onMouseMove={onMouseMove} style={style}>
      {children}
    </div>
  );
}

const POSTS = [
  {
    title: "The History of Deep Learning, Era by Era",
    date: "May 2026", read: "12 min", tag: "Essay",
    slug: "the-history-of-deep-learning",
    excerpt: "From the perceptron in 1958 to foundation models today — the ideas, winters, and breakthroughs that shaped modern AI.",
  },
  {
    title: "Building nanoGPT from Scratch",
    date: "May 2026", read: "9 min", tag: "Notes",
    slug: "building-nanogpt-from-scratch",
    excerpt: "What I learned re-implementing a GPT character by character — tokenization, attention, and the training loop, demystified.",
  },
  {
    title: "How Transformers Changed Everything",
    date: "Jun 2026", read: "7 min", tag: "Essay",
    slug: "how-transformers-changed-everything",
    excerpt: "Attention is all you need — but why? A plain-language look at the architecture behind today's language models.",
  },
  {
    title: "Deep RL for Autonomous Systems",
    date: "Jun 2026", read: "10 min", tag: "Notes",
    slug: "deep-rl-autonomous-systems",
    excerpt: "Notes from training racing agents with PPO — reward shaping, the sim-to-real gap, and what actually moved the needle.",
  },
];

export default function Home() {
  const current = getProjectsByStatus("current");
  const done = getProjectsByStatus("done");

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

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href="https://github.com/abhijitdalal26" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a href="https://x.com/abhijitdalal_" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-icon">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.instagram.com/abhijitdalal.26/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="mailto:abhijitdalal7462@gmail.com" aria-label="Email" className="social-icon">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 7 10-7"/></svg>
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
            <p style={{ fontFamily: "var(--disp)", fontStyle: "italic", fontSize: "clamp(19px, 2.2vw, 24px)", lineHeight: 1.65, color: "var(--ink)", margin: 0, position: "relative" }}>
              I love working on new tech and building products people actually use —
              from RL agents to large language models.
            </p>
          </div>
        </FadeUp>

        {current.length > 0 && (
          <>
            <FadeUp>
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span className="pulse-dot" />
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)" }}>
                    Currently Working On
                  </div>
                </div>
                <h2 style={{ fontFamily: "var(--disp)", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
                  In the Lab
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
            <h2 style={{ fontFamily: "var(--disp)", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
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
      <div className="page-wrap s-pt-64 s-pb-88">
        <FadeUp>
          <div style={{ marginBottom: 28, borderTop: "1px solid var(--line)", paddingTop: 28 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 8 }}>
              Latest Writing
            </div>
            <h2 style={{ fontFamily: "var(--disp)", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
              Writing
            </h2>
          </div>
        </FadeUp>

        <div className="grid-2-wide">
          {POSTS.map((post, i) => (
            <FadeUp key={post.title} delay={(i % 2) * 90} className="h-full">
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
              <GlowCard style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 14, padding: "24px 26px 20px", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, position: "relative", zIndex: 2 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--sub)" }}>{post.tag}</span>
                  <span style={{ width: 3, height: 3, borderRadius: 999, background: "var(--faint)", display: "inline-block" }} />
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--faint)" }}>{post.date} · {post.read}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: 10, color: "var(--ink)", position: "relative", zIndex: 2 }}>
                  {post.title}
                </div>
                <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.65, margin: "0 0 18px", flex: 1, position: "relative", zIndex: 2 }}>
                  {post.excerpt}
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--accent)", position: "relative", zIndex: 2 }}>
                  Read more <ArrowRight size={12} />
                </span>
              </GlowCard>
            </Link>
            </FadeUp>
          ))}
        </div>

        <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
          <Link href="/blog"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "var(--sub)", textDecoration: "none", padding: "11px 26px", borderRadius: 999, border: "1px solid var(--line)", transition: "color 0.15s, border-color 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--sub)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--line)"; }}
          >
            Read all posts <ArrowRight size={14} />
          </Link>
        </div>
      </div>

    </div>
  );
}
