import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "About" };

const stack = ["Python", "PyTorch", "Next.js", "TypeScript", "Kotlin", "Android Studio", "React", "Git", "PostgreSQL", "Jupyter"];

const areas: { label: string; color: string }[] = [
  { label: "LLMs",                  color: "#7c3aed" },
  { label: "NLP",                   color: "#2563eb" },
  { label: "Data Science",          color: "#059669" },
  { label: "App Development",       color: "#ea580c" },
  { label: "Web Development",       color: "#0891b2" },
  { label: "Deep Learning",         color: "#dc2626" },
  { label: "Reinforcement Learning",color: "#d97706" },
  { label: "Computer Vision",       color: "#7c3aed" },
  { label: "Data Analysis",         color: "#0d9488" },
  { label: "Transformers",          color: "#4f46e5" },
];

const stackBadges: { label: string; color: string }[] = [
  { label: "Python",         color: "#3776ab" },
  { label: "PyTorch",        color: "#ee4c2c" },
  { label: "Next.js",        color: "#111110" },
  { label: "TypeScript",     color: "#3178c6" },
  { label: "React",          color: "#149eca" },
  { label: "Kotlin",         color: "#7f52ff" },
  { label: "Android",        color: "#3ddc84" },
  { label: "PostgreSQL",     color: "#336791" },
  { label: "Git",            color: "#f05032" },
  { label: "Jupyter",        color: "#f37626" },
];

function Marquee({ items, reverse = false }: { items: { label: string; color: string }[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", padding: "12px 0" }}>
      <style>{`
        @keyframes mq { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `mq 32s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          gap: 10,
          paddingRight: 10,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "var(--mono)",
              color: "#fff",
              background: item.color,
              padding: "5px 14px",
              borderRadius: 6,
              letterSpacing: "0.2px",
              flexShrink: 0,
            }}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="page-wrap" style={{ paddingTop: 60, paddingBottom: 64 }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div className="about-cols">

            {/* Left */}
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 10 }}>About</div>
              <h1 style={{ fontFamily: "var(--disp)", fontSize: "clamp(34px, 5.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.02, fontWeight: 700, marginBottom: 28 }}>
                Electronics student,<br />
                <span style={{ color: "var(--sub)" }}>indie developer</span>
              </h1>

              <div style={{ fontSize: 16, lineHeight: 1.8, color: "var(--sub)", display: "flex", flexDirection: "column", gap: 18, marginBottom: 44 }}>
                <p>Electronics &amp; Telecom student from Mumbai. Fascinated by machine intelligence — not just using AI but understanding how it actually works from the math up.</p>
                <p>I follow Karpathy&apos;s philosophy: learn by building. Built nanoGPT from scratch, trained RL agents in simulated environments, analyzed the Android market with data. Every project starts with <em style={{ color: "var(--ink)", fontStyle: "normal", fontWeight: 500 }}>&ldquo;I want to understand this.&rdquo;</em></p>
                <p>Right now I&apos;m building Android apps and exploring what&apos;s possible with large language models. The blog is where I think out loud — AI history, things I&apos;m learning, what I&apos;m shipping.</p>
              </div>

              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--faint)", marginBottom: 14 }}>Currently Building</div>
                <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 12, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Android app for a new market", "Studying transformer architectures beyond attention"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 999, background: "#22c55e", marginTop: 7, flexShrink: 0 }} />
                      <p style={{ fontSize: 14, color: "var(--sub)", margin: 0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — photo, links, stack */}
            <div>
              <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 20, border: "1px solid var(--line)", aspectRatio: "1/1" }}>
                <Image src="/abhijit.jpg" alt="Abhijit Dalal" width={240} height={240} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>

              {/* Links — right below photo */}
              <div style={{ marginBottom: 24 }}>
                {[
                  { label: "GitHub",      href: "https://github.com/abhijitdalal26",   sub: "abhijitdalal26" },
                  { label: "Twitter / X", href: "https://x.com/abhijitdalal_",         sub: "@abhijitdalal_" },
                  { label: "Email",       href: "mailto:abhijitdalal7462@gmail.com",    sub: "abhijitdalal7462" },
                ].map(({ label, href, sub }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="hover-row"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", textDecoration: "none", marginBottom: 2 }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{label}</div>
                      <div style={{ fontSize: 11, color: "var(--faint)", fontFamily: "var(--mono)", marginTop: 1 }}>{sub}</div>
                    </div>
                    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="var(--faint)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12L12 4M5 4h7v7" />
                    </svg>
                  </a>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ── Scrolling strips ─────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ borderBottom: "1px solid var(--line)" }}>
          <div className="marquee-label" style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)" }}>
            Areas
          </div>
          <Marquee items={areas} />
        </div>
        <div>
          <div className="marquee-label" style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)" }}>
            Stack
          </div>
          <Marquee items={stackBadges} reverse />
        </div>
      </div>

    </div>
  );
}
