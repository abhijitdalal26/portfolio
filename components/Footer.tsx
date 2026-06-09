export function Footer() {
  return (
    <footer
      className="w-full border-t mt-24"
      style={{ borderColor: "var(--subtle)" }}
    >
      <div
        className="mx-auto px-7 h-14 flex items-center justify-between"
        style={{ maxWidth: "660px" }}
      >
        <span className="text-[13px]" style={{ color: "var(--muted)" }}>
          © 2026 Abhijit Dalal
        </span>
        <div className="flex items-center gap-5">
          {[
            { href: "https://github.com/abhijitdalal26", label: "GitHub" },
            { href: "https://x.com/abhijitdalal_", label: "Twitter" },
            { href: "mailto:abhijitdalal7462@gmail.com", label: "Email" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-[13px] transition-opacity hover:opacity-100 opacity-50"
              style={{ color: "var(--text)" }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
