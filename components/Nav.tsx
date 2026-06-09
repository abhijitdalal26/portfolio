"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="w-full sticky top-0 z-50 border-b"
      style={{
        borderColor: "var(--subtle)",
        background: "var(--nav-bg)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div
        className="mx-auto px-7 h-14 flex items-center justify-between"
        style={{ maxWidth: "660px" }}
      >
        <Link
          href="/"
          className="text-[13.5px] font-semibold tracking-tight transition-opacity hover:opacity-60"
          style={{ color: "var(--text)" }}
        >
          Abhijit Dalal
        </Link>

        <div className="flex items-center gap-5">
          {links.map(({ href, label }) => {
            const active =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className="text-[13.5px] transition-opacity relative"
                style={{ color: active ? "var(--text)" : "var(--muted)" }}
              >
                {label}
                {active && (
                  <span
                    className="absolute -bottom-[17px] left-0 right-0 h-px"
                    style={{ background: "var(--text)" }}
                  />
                )}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
