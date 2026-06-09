"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 84,
        maxWidth: 1240,
        margin: "0 auto",
        padding: "0 64px",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--sans)",
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: -0.2,
          color: "var(--ink)",
          textDecoration: "none",
        }}
      >
        Abhijit Dalal
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: "var(--sans)",
              fontSize: 15,
              fontWeight: 500,
              color: pathname === href || pathname.startsWith(href + "/")
                ? "var(--ink)"
                : "var(--sub)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
