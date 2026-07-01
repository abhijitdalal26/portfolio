import type { TocItem } from "@/lib/toc";

export function Toc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav style={{ position: "sticky", top: 96 }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 14 }}>
        Contents
      </div>
      <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              style={{ fontSize: 13.5, color: "var(--sub)", textDecoration: "none", lineHeight: 1.5, display: "block" }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
