"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="w-7 h-7 inline-block" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-7 h-7 flex items-center justify-center text-[15px] transition-opacity opacity-50 hover:opacity-100 cursor-pointer"
      style={{ color: "var(--text)" }}
    >
      {resolvedTheme === "dark" ? "☀︎" : "☽"}
    </button>
  );
}
