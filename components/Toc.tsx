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
          position: "fixed", top: 116, left: 24, zIndex: 210,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 32, height: 32, padding: 0,
          background: "none", border: "none", color: "var(--ink)",
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
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "176px 32px 64px" }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: "var(--ink)", marginBottom: 28, letterSpacing: "-0.01em" }}>
              Contents
            </div>

            <ul style={{ display: "flex", flexDirection: "column", gap: 20, listStyle: "none" }}>
              {items.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    style={{ fontSize: 16, fontWeight: 500, color: "var(--sub)", textDecoration: "none", lineHeight: 1.4, letterSpacing: "-0.01em" }}
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
