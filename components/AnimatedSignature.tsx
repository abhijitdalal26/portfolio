"use client";

import { useEffect, useState, useCallback } from "react";

export function AnimatedSignature() {
  const [version, setVersion] = useState(0);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    setDrawn(false);
    const t = setTimeout(() => setDrawn(true), version === 0 ? 300 : 60);
    return () => clearTimeout(t);
  }, [version]);

  const retrigger = useCallback(() => setVersion(v => v + 1), []);

  const seg = (delay: number, dur = 0.42) => ({
    strokeDasharray: "1",
    strokeDashoffset: drawn ? "0" : "1",
    transition: drawn
      ? `stroke-dashoffset ${dur}s cubic-bezier(0.4,0,0.2,1) ${delay}s`
      : "none",
  });

  const base = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
  };

  return (
    <svg
      viewBox="0 0 76 46"
      width="68"
      height="42"
      aria-label="Abhijit Dalal"
      onMouseEnter={retrigger}
      style={{ display: "block", overflow: "visible", color: "var(--ink)" }}
    >
      {/* A — left leg */}
      <path {...base} pathLength={1} d="M 3,42 L 17,5" style={seg(0, 0.36)} />
      {/* A — right leg */}
      <path {...base} pathLength={1} d="M 17,5 L 31,42" style={seg(0.07, 0.36)} />
      {/* A — crossbar */}
      <path {...base} pathLength={1} d="M 9.5,26 L 24.5,26" style={seg(0.24, 0.22)} />
      {/* separator dot */}
      <circle
        cx="37.5"
        cy="42"
        r="1.8"
        fill="currentColor"
        style={{
          opacity: drawn ? 0.35 : 0,
          transition: drawn ? "opacity 0.2s ease 0.62s" : "none",
        }}
      />
      {/* D — vertical stroke */}
      <path {...base} pathLength={1} d="M 44,5 L 44,42" style={seg(0.38, 0.32)} />
      {/* D — open curve */}
      <path {...base} pathLength={1} d="M 44,5 C 59,5 68,13 68,23.5 C 68,34 59,42 44,42" style={seg(0.44, 0.46)} />
    </svg>
  );
}
