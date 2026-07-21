"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

// Each line represents a stretch of the page (top / middle / bottom) and
// darkens as scroll position approaches that stretch, doubling the icon as
// a lightweight reading-progress indicator.
function HamburgerIcon({ progress }: { progress: number }) {
  const targets = [0, 0.5, 1];
  const ys = [4, 12, 20];

  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
      {ys.map((y, i) => {
        const intensity = Math.max(0, 1 - Math.abs(progress - targets[i]) * 2.2);
        const opacity = 0.32 + intensity * 0.68;
        return (
          <line
            key={y}
            x1="3" y1={y} x2="21" y2={y}
            stroke="var(--ink)"
            strokeOpacity={opacity}
            style={{ transition: "stroke-opacity 150ms ease" }}
          />
        );
      })}
    </svg>
  );
}

export function Toc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-160px 0px -70% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contents" : "Open contents"}
        style={{
          position: "fixed", top: "50%", left: 24, zIndex: 210,
          transform: "translateY(-50%)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, padding: 0,
          background: "none", border: "none", color: "var(--ink)",
          cursor: "pointer",
        }}
      >
        <HamburgerIcon progress={scrollProgress} />
      </button>

      {open && (
        <div
          style={{
            position: "fixed", top: 0, left: 56, bottom: 0, zIndex: 200,
            width: "min(360px, 88vw)",
            display: "flex", flexDirection: "column", justifyContent: "center",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "48px 32px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--faint)", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>
              Contents
            </div>

            <ul style={{ display: "flex", flexDirection: "column", gap: 13, listStyle: "none" }}>
              {items.map((item, i) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      style={{
                        fontSize: 13.5,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "var(--ink)" : "var(--sub)",
                        textDecoration: "none",
                        lineHeight: 1.35,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {i + 1}. {item.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
