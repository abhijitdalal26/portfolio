import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "About" };

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
        @keyframes mq-left { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes mq-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${reverse ? "mq-right" : "mq-left"} 32s linear infinite`,
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
              <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(34px, 5.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.02, fontWeight: 700, marginBottom: 28 }}>
                Electronics student,<br />
                <span style={{ color: "var(--sub)" }}>indie developer</span>
              </h1>

              <div style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink)", display: "flex", flexDirection: "column", gap: 18, marginBottom: 44 }}>
                <p>I&apos;m an Electronics Engineering student at VJTI in Mumbai, though most of what actually keeps me up at night is machine learning, not circuits. Somewhere in the middle of coursework I got pulled into embeddings, transformers, and reinforcement learning, and never really stopped.</p>
                <p>I like taking an idea apart until I understand it well enough to rebuild myself, that&apos;s usually what turns into a project. It&apos;s slower than just reading about it, but it&apos;s the only way I actually trust that I understand something.</p>
                <p>Right now I&apos;m building Skrolla, a book discovery app that scrolls like a feed but recommends with embeddings instead of guesswork. The blog is where I write about whatever I&apos;m learning along the way.</p>
              </div>
            </div>

            {/* Right — photo, links, stack */}
            <div>
              <div className="about-photo" style={{ borderRadius: 16, overflow: "hidden", marginBottom: 20, border: "1px solid var(--line)", aspectRatio: "1/1" }}>
                <Image src="/abhijit.jpg" alt="Abhijit Dalal" width={240} height={240} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>

              {/* Links — right below photo, same social-icon style as the homepage */}
              <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                <a href="https://github.com/abhijitdalal26" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
                <a href="https://x.com/abhijitdalal_" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-icon">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.instagram.com/abhijitdalal.26/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="mailto:agdalal_b23@el.vjti.ac.in" aria-label="College Email" className="social-icon">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10L12 4 2 10l10 6 10-6z"/><path d="M6 12.5V17c0 1 2.5 3 6 3s6-2 6-3v-4.5"/></svg>
                </a>
                <a
                  href="/projects/resume/resume.pdf"
                  download="Abhijit_Dalal_Resume.pdf"
                  style={{ display: "inline-flex", alignItems: "center", height: 44, fontSize: 14, fontWeight: 600, color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  CV
                </a>
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
