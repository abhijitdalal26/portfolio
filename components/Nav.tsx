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
      className="w-full border-b"
      style={{ borderColor: "var(--subtle)" }}
    >
      <div
        className="mx-auto px-7 h-14 flex items-center justify-between"
        style={{ maxWidth: "660px" }}
      >
        <Link
          href="/"
          className="text-[13.5px] font-medium transition-opacity hover:opacity-60"
          style={{ color: "var(--text)" }}
        >
          Abhijit Dalal
        </Link>

        <div className="flex items-center gap-5">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[13.5px] transition-opacity"
              style={{
                color:
                  pathname === href || pathname.startsWith(href + "/")
                    ? "var(--text)"
                    : "var(--muted)",
              }}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
