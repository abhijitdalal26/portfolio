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

export function StackMarquees() {
  return (
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
  );
}
