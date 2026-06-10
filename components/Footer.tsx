"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)" }}>
      <div
        className="page-wrap"
        style={{
          paddingTop: 24,
          paddingBottom: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <Link
            href="/"
            style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", textDecoration: "none", display: "block", marginBottom: 3 }}
          >
            Abhijit Dalal
          </Link>
          <span style={{ fontSize: 13, color: "var(--faint)", fontFamily: "var(--mono)" }}>
            © 2026 · Built with Next.js
          </span>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {[
            { label: "GitHub",    href: "https://github.com/abhijitdalal26" },
            { label: "Twitter",   href: "https://x.com/abhijitdalal_" },
            { label: "Email",     href: "mailto:abhijitdalal7462@gmail.com" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              style={{
                fontSize: 13.5,
                color: "var(--sub)",
                textDecoration: "none",
                padding: "6px 12px",
                borderRadius: 6,
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--ink)";
                e.currentTarget.style.background = "var(--panel)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--sub)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
