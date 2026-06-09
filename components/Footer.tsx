export function Footer() {
  return (
    <footer
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "30px 64px 48px",
        marginTop: 84,
        borderTop: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 14, color: "var(--faint)", whiteSpace: "nowrap" }}>
        © 2026 Abhijit Dalal · Next.js
      </span>
      <div style={{ display: "flex", gap: 24, fontSize: 14, color: "var(--sub)" }}>
        {[
          { label: "GitHub", href: "https://github.com/abhijitdalal26" },
          { label: "X / Twitter", href: "https://x.com/abhijitdalal_" },
          { label: "Email", href: "mailto:abhijitdalal7462@gmail.com" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              color: "var(--sub)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
          >
            {label}{" "}
            <svg width={13} height={13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12L12 4M5 4h7v7" />
            </svg>
          </a>
        ))}
      </div>
    </footer>
  );
}
