import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        background: "var(--bg)", minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}
    >
      <h1 style={{ fontFamily: "var(--disp)", fontSize: 64, letterSpacing: "-0.04em", color: "var(--ink)", fontWeight: 600, margin: 0 }}>
        404
      </h1>
      <p style={{ color: "var(--sub)", marginTop: 12, marginBottom: 28, fontSize: 16 }}>Page not found.</p>
      <Link href="/" style={{ color: "var(--ink)", fontSize: 14, textDecoration: "none" }}>
        ← Go home
      </Link>
    </div>
  );
}
