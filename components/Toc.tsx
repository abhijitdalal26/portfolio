"use client";

import { useState } from "react";
import type { TocItem } from "@/lib/toc";

function HamburgerIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
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
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "transparent", border: "1px solid var(--line)", borderRadius: 999,
          padding: "9px 16px", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1,
          textTransform: "uppercase", color: "var(--sub)", cursor: "pointer", marginBottom: 32,
        }}
      >
        <HamburgerIcon /> Contents
      </button>

      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "var(--bg)", overflowY: "auto",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 32px 64px" }}>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close contents"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)", padding: 0, marginBottom: 56 }}
            >
              <CloseIcon />
            </button>

            <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 24 }}>
              Contents
            </div>

            <ul style={{ display: "flex", flexDirection: "column", gap: 24, listStyle: "none" }}>
              {items.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    style={{ fontSize: 24, fontWeight: 500, color: "var(--ink)", textDecoration: "none", lineHeight: 1.4, letterSpacing: "-0.01em" }}
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
