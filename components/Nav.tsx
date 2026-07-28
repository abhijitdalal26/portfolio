"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedSignature } from "./AnimatedSignature";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blog",     label: "Blog"     },
  // About hidden for now — bio still being reworked
];

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <div style={{ position: "relative", zIndex: 10 }}>
      <nav style={{
        background: isHome ? "transparent" : "var(--bg)",
        borderBottom: isHome ? "none" : "1px solid var(--line)",
      }}>
        <div className="nav-bar">
          <Link href="/" style={{ textDecoration: "none", color: "var(--ink)", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <AnimatedSignature />
          </Link>

          {/* Desktop */}
          <div className="nav-links">
            {links.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link key={href} href={href} className={`nav-link${isActive ? " nav-link-active" : ""}`}>
                  {label}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile */}
          <div className="nav-hamburger">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="nav-icon-btn"
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="nav-mobile-menu">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={href} href={href} className={`nav-mobile-link${isActive ? " nav-link-active" : ""}`}>
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
