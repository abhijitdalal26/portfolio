"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.215, 0.61, 0.355, 1] as const;
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };

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
    blurb: "Deep data analysis on the Indian Android market — scraped 11,176 apps across 10 countries. Published on Kaggle.",
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
    slug: "the-history-of-deep-learning",
    excerpt: "Notes from training racing agents with PPO — reward shaping, the sim-to-real gap, and what actually moved the needle.",
  },
];

const W = { maxWidth: 1240, margin: "0 auto", padding: "0 64px" };

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", fontFamily: "var(--sans)" }}>
      <div style={W}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", paddingTop: 64, paddingBottom: 44 }}
        >
          <motion.div variants={item} transition={{ duration: 0.6, ease }}>
            <div style={{
              width: 128, height: 128, borderRadius: "50%",
              overflow: "hidden", margin: "0 auto 30px",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.10)",
            }}>
              <Image
                src="/abhijit.jpg"
                alt="Abhijit Dalal"
                width={128} height={128} priority
                style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            transition={{ duration: 0.65, ease }}
            style={{
              fontFamily: "var(--disp)", fontSize: 76, lineHeight: 1.0,
              fontWeight: 600, letterSpacing: -2, margin: 0, color: "var(--ink)",
            }}
          >
            Abhijit Dalal
          </motion.h1>

          <motion.div
            variants={item}
            transition={{ duration: 0.6, ease }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 22, fontSize: 22, fontWeight: 500, letterSpacing: -0.3 }}
          >
            {["Student", "Developer", "Writer"].map((r, i) => (
              <span key={r} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {i > 0 && <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--faint)", display: "inline-block" }} />}
                <span>{r}</span>
              </span>
            ))}
          </motion.div>

          {/* CTAs — orange primary, gray-outline secondary */}
          <motion.div
            variants={item}
            transition={{ duration: 0.6, ease }}
            style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 34 }}
          >
            <Link
              href="/projects"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 15, fontWeight: 600,
                color: "#fff", background: "#ff7849",
                borderRadius: 999, padding: "13px 22px",
                textDecoration: "none",
              }}
            >
              See my work <ArrowRight size={15} />
            </Link>
            <Link
              href="/blog"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 15, fontWeight: 600,
                color: "var(--sub)", border: "1px solid var(--line)",
                borderRadius: 999, padding: "13px 22px",
                textDecoration: "none",
              }}
            >
              Read the blog
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Bio ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.65, ease }}
          style={{ maxWidth: 620, margin: "0 auto", textAlign: "center", paddingBottom: 76 }}
        >
          <span style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--faint)" }}>
            About
          </span>
          <p style={{ fontSize: 21, lineHeight: 1.58, color: "var(--sub)", letterSpacing: -0.2, margin: "18px 0 0" }}>
            Engineer based in India. I{" "}
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>build software end-to-end</span>
            {" "}and dig into how{" "}
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>machine intelligence actually works</span>
            {" "}— from training models from scratch to{" "}
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>shipping apps people use</span>.
          </p>
        </motion.div>

        {/* ── Projects ──────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            <h2 style={{ fontFamily: "var(--disp)", fontSize: 42, fontWeight: 600, letterSpacing: -1, margin: 0 }}>
              My Top Projects
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease, delay: (i % 2) * 0.08 }}
              >
                <div
                  style={{
                    background: "var(--panel)", border: "1px solid var(--line)",
                    borderRadius: 18, overflow: "hidden", display: "flex",
                    flexDirection: "column", boxShadow: "var(--shadow)",
                    height: "100%", transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 6px rgba(0,0,0,0.04), 0 20px 48px rgba(0,0,0,0.09)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Image area */}
                  <div style={{ height: 196, padding: "14px 14px 0", overflow: "hidden" }}>
                    <div style={{ width: "100%", height: "100%", borderRadius: 12, overflow: "hidden", position: "relative" }}>
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                        sizes="(max-width: 768px) 100vw, 560px"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: "#ff7849" }}>
                        {p.kind}
                      </span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--faint)" }}>{p.year}</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, marginBottom: 8 }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: 15, color: "var(--sub)", lineHeight: 1.58, marginBottom: 18, flex: 1 }}>
                      {p.blurb}
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                      </div>
                      {p.href && (
                        <a href={p.href} target="_blank" rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--sub)", textDecoration: "none" }}>
                          GitHub <ArrowUpRight />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Writing ───────────────────────────────────────── */}
        <div style={{ marginTop: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            style={{
              display: "flex", alignItems: "baseline", justifyContent: "space-between",
              marginBottom: 22, borderTop: "1px solid var(--line)", paddingTop: 26,
            }}
          >
            <h2 style={{ fontFamily: "var(--disp)", fontSize: 34, fontWeight: 600, letterSpacing: -0.8, margin: 0 }}>
              Writing
            </h2>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 600, color: "var(--sub)", textDecoration: "none" }}>
              All posts <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {POSTS.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease, delay: (i % 2) * 0.07 }}
              >
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: "var(--panel)", border: "1px solid var(--line)",
                      borderRadius: 16, padding: "28px 28px 24px",
                      display: "flex", flexDirection: "column",
                      boxShadow: "var(--shadow)", height: "100%",
                      transition: "box-shadow 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 6px rgba(0,0,0,0.04), 0 20px 48px rgba(0,0,0,0.09)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#ff7849" }}>
                        {post.tag}
                      </span>
                      <span style={{ width: 3, height: 3, borderRadius: 999, background: "var(--faint)", display: "inline-block" }} />
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--faint)" }}>
                        {post.date} · {post.read}
                      </span>
                    </div>
                    <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: -0.4, marginBottom: 10, color: "var(--ink)", lineHeight: 1.25 }}>
                      {post.title}
                    </div>
                    <p style={{ fontSize: 15.5, color: "var(--sub)", lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>
                      {post.excerpt}
                    </p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14.5, fontWeight: 600, color: "var(--ink)" }}>
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
