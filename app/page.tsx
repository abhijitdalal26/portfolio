"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback } from "react";
import { AuroraBg } from "@/components/AuroraBg";
import { FadeUp } from "@/components/FadeUp";

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

const PROJECTS = [
  {
    n: "01", title: "Graphify Code",
    blurb: "Turn any codebase into an interactive knowledge graph you can actually explore — built as a VS Code extension.",
    tags: ["TypeScript", "VS Code", "SaaS"],
    kind: "Developer tool", year: "2026",
    img: "/projects/graphify.png",
    href: "https://github.com/abhijitdalal26",
  },
  {
    n: "02", title: "Autonomous Racing · RL",
    blurb: "Deep RL agents that learn to race — 2D (Gymnasium) and 3D (Unity ML-Agents) with PPO. Best agent completes a full lap.",
    tags: ["Python", "PyTorch", "PPO", "Unity"],
    kind: "Research", year: "2026",
    img: "/projects/racing.jpg",
    href: "https://github.com/abhijitdalal26/autonomous-racing-using-rl",
  },
  {
    n: "03", title: "HarryPotterGPT",
    blurb: "A GPT built from scratch, character by character — following Karpathy's nanoGPT, end to end. Trained on the full HP corpus.",
    tags: ["Python", "PyTorch", "nanoGPT"],
    kind: "Learning in public", year: "2025",
    img: "/projects/transformer.png",
    href: "https://github.com/abhijitdalal26",
  },
  {
    n: "04", title: "Play Store Analysis",
    blurb: "Deep data analysis on the Android market — scraped 11,176 apps across 10 countries. Published on Kaggle.",
    tags: ["Python", "Jupyter", "pandas", "PostgreSQL"],
    kind: "Data · Analysis", year: "2024",
    img: "/projects/playstore.png",
    href: "https://github.com/abhijitdalal26/play-store-app-analysis",
  },
];

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
  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", fontFamily: "var(--sans)" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "100vh", marginTop: -72, paddingTop: 72, display: "flex", flexDirection: "column" }}>
        <AuroraBg />

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

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/projects" className="btn-primary">
              See my work <ArrowRight size={14} />
            </Link>
            <Link href="/blog" className="btn-ghost">
              Read the blog
            </Link>
          </div>
        </div>
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

        <FadeUp>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 8 }}>
              Featured Work
            </div>
            <h2 style={{ fontFamily: "var(--disp)", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }}>
              My Top Projects
            </h2>
          </div>
        </FadeUp>

        <div className="grid-2">
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.n} delay={(i % 2) * 90} className="h-full">
            <GlowCard
              style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
            >
              <div style={{ height: 190, padding: "12px 12px 0", position: "relative" }}>
                <div style={{ width: "100%", height: "100%", borderRadius: 8, overflow: "hidden", position: "relative" }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="(max-width: 720px) 100vw, 560px" />
                </div>
              </div>

              <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1, position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--faint)" }}>{p.kind}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--faint)" }}>{p.year}</span>
                </div>
                <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.2 }}>{p.title}</div>
                <div style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.6, marginBottom: 18, flex: 1 }}>{p.blurb}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                  {p.href && (
                    <a href={p.href} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--sub)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sub)")}
                    >
                      GitHub <ArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </GlowCard>
            </FadeUp>
          ))}
        </div>

        <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
          <Link href="/projects"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "var(--sub)", textDecoration: "none", padding: "11px 26px", borderRadius: 999, border: "1px solid var(--line)", transition: "color 0.15s, border-color 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--sub)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--line)"; }}
          >
            View all projects <ArrowRight size={14} />
          </Link>
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
