"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ width: 32, height: 32 }} />;

  const isDark = resolvedTheme === "dark";

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    // Use the button's own center rather than the click/tap coordinates —
    // on mobile, synthesized touch clicks and keyboard activation can report
    // clientX/clientY as 0,0, which made the circle appear to expand from
    // the top-left/top-center of the screen instead of the toggle button.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(next);
      return;
    }

    // Pythagorean radius to the farthest corner — ensures the circle fully covers the screen.
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Tell CSS which layer goes on top before the transition captures.
    document.documentElement.dataset.themeDirection = isDark ? "to-light" : "to-dark";

    const vt = document as Document & {
      startViewTransition: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };

    const transition = vt.startViewTransition(() => {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(next);
      document.documentElement.style.colorScheme = next;
    });

    transition.ready.then(() => {
      if (isDark) {
        // dark → light: new (light) layer expands outward from the button
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
          { duration: 400, easing: "ease-out", pseudoElement: "::view-transition-new(root)", fill: "forwards" }
        );
      } else {
        // light → dark: old (light) layer shrinks back to the button, revealing dark below
        document.documentElement.animate(
          { clipPath: [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`] },
          { duration: 400, easing: "ease-in", pseudoElement: "::view-transition-old(root)", fill: "forwards" }
        );
      }
    }).catch(() => {
      // `ready` rejects if the browser aborts the transition (e.g. content
      // mutating during capture, such as the blog page's animated canvas
      // hero) — the circle-wipe animation just gets skipped; `finished`
      // below still resolves/rejects independently and applies the theme.
    });

    // Sync next-themes and clean up the direction attribute after animation completes.
    const cleanup = () => {
      delete document.documentElement.dataset.themeDirection;
      setTheme(next);
    };
    transition.finished.then(cleanup).catch(cleanup);
  };

  return (
    <button onClick={handleToggle} aria-label="Toggle theme" className="nav-icon-btn">
      {isDark ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}
