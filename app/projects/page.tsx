import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectsByStatus } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

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

export default function Projects() {
  const current = getProjectsByStatus("current");
  const done = getProjectsByStatus("done");

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="page-wrap" style={{ paddingTop: 60, paddingBottom: 88 }}>
        <div style={{ maxWidth: 780, marginBottom: 48 }}>
          <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(34px, 5.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.02, fontWeight: 700, marginBottom: 12 }}>Projects</h1>
          <p style={{ fontSize: 16, color: "var(--ink)", maxWidth: 480, lineHeight: 1.65, margin: 0 }}>Things I build to learn. Every project starts with curiosity.</p>
        </div>

        {current.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 16 }}>
              Currently Working On
            </div>
            <div className="grid-2">
              {current.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </div>
        )}

        <div>
          {current.length > 0 && (
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 16 }}>
              Past Work
            </div>
          )}
          <div className="grid-2">
            {done.map((p) => <ProjectCard key={p.slug} project={p} />)}
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
