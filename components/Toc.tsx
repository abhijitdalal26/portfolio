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

function CloseIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function Toc({ items }: { items: TocItem[] }) {
  // Starts closed so the post is visible immediately on every screen size.
  // On desktop/tablet (where the panel floats in the gutter without
  // covering the article) we open it automatically once mounted; on mobile
  // it stays closed until the user taps the toggle, since there the panel
  // overlays the content.
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(min-width: 721px)").matches) setOpen(true);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    // A fast scroll can cross several headings' intersection band in a single
    // callback batch, and entries arrive in change order, not document order —
    // naively taking "the last entry in this batch" can leave activeId stuck
    // on a heading that isn't actually the topmost one in view. Track every
    // currently-intersecting heading and always resolve to the first one in
    // document order instead.
    const visibleIds = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleIds.add(entry.target.id);
          else visibleIds.delete(entry.target.id);
        });
        const topVisible = items.find((item) => visibleIds.has(item.id));
        if (topVisible) setActiveId(topVisible.id);
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

  // The toggle is fixed to the viewport, so without this it floats on top of
  // the footer's own social icons once they scroll into view at the end of
  // the post. Hide it before it ever reaches that space.
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      (entries) => setNearFooter(entries[0].isIntersecting),
      { rootMargin: "0px 0px -20px 0px" }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // On small screens the panel becomes a full-screen drawer — lock body
  // scroll while it's open so the post content behind it doesn't scroll.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(max-width: 720px)");
    if (!mq.matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (items.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contents" : "Open contents"}
        className={`toc-toggle${open ? " toc-toggle-open" : ""}${nearFooter ? " toc-toggle-hidden" : ""}`}
      >
        <HamburgerIcon progress={scrollProgress} />
      </button>

      {open && (
        <>
          <div className="toc-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="toc-panel">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close contents"
              className="toc-close"
            >
              <CloseIcon />
            </button>

            <div className="toc-panel-inner">
              <div className="toc-eyebrow">Contents</div>

              <ul className="toc-list">
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
                          setOpen((v) => (window.matchMedia("(max-width: 720px)").matches ? false : v));
                        }}
                        className={`toc-link${isActive ? " toc-link-active" : ""}`}
                      >
                        {i + 1}. {item.short}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
