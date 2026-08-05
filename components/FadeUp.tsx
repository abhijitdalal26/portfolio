"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper. Children fade + rise into view once, when they
 * enter the viewport. Honors prefers-reduced-motion (renders instantly),
 * and is SSR-safe — the initial markup is visible if JS never runs.
 */
export function FadeUp({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    // Safety net: on long pages, late-loading web fonts and images can shift
    // layout after the observer's initial measurement, and Chrome sometimes
    // never re-fires it for elements that were already past the viewport at
    // that point — content stays stuck at opacity:0 until something (e.g. a
    // window resize) forces a recompute. Manually re-check geometry shortly
    // after mount and again after fonts settle, so nothing depends on the
    // observer alone.
    const manualCheck = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        setShown(true);
        io.disconnect();
      }
    };
    const t = window.setTimeout(manualCheck, 400);
    document.fonts?.ready?.then(manualCheck).catch(() => {});

    // Absolute fallback: never leave content permanently invisible even if
    // every geometry check above is somehow wrong.
    const forceTimer = window.setTimeout(() => setShown(true), 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
      window.clearTimeout(forceTimer);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? " reveal-in" : ""}${className ? " " + className : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
