import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ background: "#fafaf9" }}
    >
      <h1
        className="font-bold mb-4"
        style={{ fontSize: "64px", letterSpacing: "-0.04em", color: "#09090b" }}
      >
        404
      </h1>
      <p style={{ color: "#71717a", marginBottom: "24px" }}>Page not found.</p>
      <Link
        href="/"
        style={{ color: "#3b82f6", fontSize: "14px" }}
        className="hover:opacity-70 transition-opacity"
      >
        ← Go home
      </Link>
    </div>
  );
}
