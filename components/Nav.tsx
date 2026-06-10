"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blog",     label: "Blog"     },
  { href: "/about",    label: "About"    },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        background: "rgba(250,250,249,0.88)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="page-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--sans)",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: -0.3,
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          Abhijit Dalal
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {links.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--accent)" : "var(--sub)",
                  textDecoration: "none",
                  background: isActive ? "rgba(37,99,235,0.07)" : "transparent",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
