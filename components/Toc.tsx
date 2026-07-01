"use client";

import { useState } from "react";
import type { TocItem } from "@/lib/toc";

function HamburgerIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function Toc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contents" : "Open contents"}
        style={{
          position: "fixed", top: 88, left: 24, zIndex: 210,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 44, height: 44, borderRadius: "50%",
          background: "var(--bg)", border: "1.5px solid var(--faint)", color: "var(--ink)",
          cursor: "pointer",
        }}
      >
        {open ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {open && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 200,
            width: "min(360px, 88vw)",
            background: "var(--bg)", borderRight: "1px solid var(--line)",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "130px 32px 64px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 24 }}>
              Contents
            </div>

            <ul style={{ display: "flex", flexDirection: "column", gap: 24, listStyle: "none" }}>
              {items.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    style={{ fontSize: 20, fontWeight: 500, color: "var(--ink)", textDecoration: "none", lineHeight: 1.4, letterSpacing: "-0.01em" }}
                  >
                    {i + 1}. {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
