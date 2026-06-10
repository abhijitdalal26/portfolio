"use client";

import { useRef, useCallback } from "react";

function ArrowUpRight() {
  return (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12L12 4M5 4h7v7" />
    </svg>
  );
}

export function ProjectCard({ title, year, kind, description, tags, href, status }: {
  title: string;
  year: string;
  kind: string;
  description: string;
  tags: string[];
  href: string | null;
  status: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--gx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--gy", `${e.clientY - r.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      className="glow-card"
      onMouseMove={onMouseMove}
      style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 16, padding: "24px 28px" }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 10, position: "relative", zIndex: 2 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em", margin: 0 }}>{title}</h2>
            {status && (
              <span style={{ fontSize: 10.5, fontWeight: 500, padding: "2px 8px", borderRadius: 999, background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)", fontFamily: "var(--mono)" }}>
                {status}
              </span>
            )}
          </div>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--faint)" }}>{kind} · {year}</span>
        </div>
        {href && (
          <a
            href={href} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 500, color: "var(--sub)", textDecoration: "none", padding: "5px 12px", borderRadius: 999, border: "1px solid var(--line)", flexShrink: 0, transition: "color 0.15s, border-color 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.22)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--sub)"; e.currentTarget.style.borderColor = "var(--line)"; }}
          >
            GitHub <ArrowUpRight />
          </a>
        )}
      </div>

      <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--sub)", marginBottom: 14, position: "relative", zIndex: 2 }}>{description}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, position: "relative", zIndex: 2 }}>
        {tags.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
    </div>
  );
}
