"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

// Each line represents a stretch of the page (top / middle / bottom). The
// one matching the current scroll third is dark, the rest stay faint — a
// lightweight reading-progress indicator, switched instantly, not blended.
function HamburgerIcon({ progress }: { progress: number }) {
  const ys = [2, 12, 22];
  const activeIndex = progress < 1 / 3 ? 0 : progress < 2 / 3 ? 1 : 2;

  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" strokeWidth="3.2" strokeLinecap="round">
      {ys.map((y, i) => (
        <line
          key={y}
          x1="3" y1={y} x2="21" y2={y}
          stroke="var(--ink)"
          strokeOpacity={i === activeIndex ? 1 : 0.32}
        />
      ))}
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
            position: "fixed", top: 88, left: 56, bottom: 0, zIndex: 200,
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
                      onClick={(e) => {
                        const el = document.getElementById(item.id);
                        if (!el) return;
                        e.preventDefault();
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                        history.pushState(null, "", `#${item.id}`);
                      }}
                      style={{
                        fontSize: 13.5,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "var(--ink)" : "var(--sub)",
                        textDecoration: "none",
                        lineHeight: 1.35,
                        letterSpacing: "-0.005em",
                        display: "block",
                        width: "100%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {i + 1}. {item.short}
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
