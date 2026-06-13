"use client";

import { useEffect, useState } from "react";

export function AnimatedSignature() {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      aria-label="Abhijit Dalal"
      style={{
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxWidth: drawn ? "160px" : "0px",
        opacity: drawn ? 1 : 0,
        transition: "max-width 1.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
        fontFamily: "'Dancing Script', cursive",
        fontSize: 22,
        fontWeight: 700,
        color: "var(--ink)",
        letterSpacing: "0.5px",
        lineHeight: 1,
        paddingBottom: 2,
      }}
    >
      Abhijit Dalal
    </span>
  );
}
