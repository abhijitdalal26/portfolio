const ITEMS = [
  "Python",
  "PyTorch",
  "Next.js",
  "TypeScript",
  "Kotlin",
  "Android",
  "Deep Learning",
  "Reinforcement Learning",
  "Transformers",
  "React",
  "PostgreSQL",
  "Unity ML-Agents",
  "Node.js",
  "Git",
];

// Doubled for seamless CSS loop
const doubled = [...ITEMS, ...ITEMS];

export function Marquee() {
  return (
    <div
      className="marquee-wrap"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "18px 0",
        margin: "0",
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 13,
                color: "var(--faint)",
                letterSpacing: "0.3px",
                padding: "0 28px",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
            <span
              style={{
                display: "inline-block",
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "var(--line)",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
