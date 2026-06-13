"use client";

import { useEffect, useState } from "react";

export function AnimatedSignature() {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 250);
    return () => clearTimeout(t);
  }, []);

  const seg = (delay: number, duration = 0.8) => ({
    strokeDasharray: "1",
    strokeDashoffset: drawn ? 0 : 1,
    transition: drawn
      ? `stroke-dashoffset ${duration}s cubic-bezier(0.4,0,0.2,1) ${delay}s`
      : "none",
  });

  const base = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 80 50"
      width="70"
      height="44"
      aria-label="Abhijit Dalal"
      style={{ display: "block", overflow: "visible", color: "var(--ink)" }}
    >
      {/* Cursive A */}
      <path
        {...base}
        pathLength={1}
        strokeWidth={2}
        d="M 12,40 C 20,20 25,10 30,10 C 35,10 32,20 25,40 C 20,50 12,40 16,32 C 20,25 25,25 35,25 C 45,25 48,22 50,22"
        style={seg(0, 0.9)}
      />
      {/* Cursive d */}
      <path
        {...base}
        pathLength={1}
        strokeWidth={2}
        d="M 50,22 C 42,20 38,25 38,32 C 38,40 45,42 50,38 C 52,35 54,20 55,5 C 55,5 52,30 52,40 C 52,45 57,45 60,38"
        style={seg(0.8, 0.8)}
      />
      {/* Flourish */}
      <path
        {...base}
        pathLength={1}
        strokeWidth={1.5}
        d="M 8,46 C 30,48 50,48 72,44"
        style={{ ...seg(1.5, 0.5), opacity: 0.42 }}
      />
    </svg>
  );
}
