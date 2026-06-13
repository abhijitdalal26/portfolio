export function AuroraBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Blob 1: blue — top-left */}
      <div
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.18) 0%, transparent 68%)",
          filter: "blur(52px)",
          top: "-18%",
          left: "-12%",
          animation: "aurora-1 15s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />

      {/* Blob 2: violet — top-right */}
      <div
        style={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(124,58,237,0.13) 0%, transparent 68%)",
          filter: "blur(60px)",
          top: "8%",
          right: "-14%",
          animation: "aurora-2 19s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />

      {/* Blob 3: cyan — bottom-center */}
      <div
        style={{
          position: "absolute",
          width: "44vw",
          height: "44vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(6,182,212,0.12) 0%, transparent 68%)",
          filter: "blur(68px)",
          bottom: "-8%",
          left: "22%",
          animation: "aurora-3 12s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />

      {/* Blob 4: indigo — center-right */}
      <div
        style={{
          position: "absolute",
          width: "36vw",
          height: "36vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.10) 0%, transparent 68%)",
          filter: "blur(56px)",
          top: "35%",
          right: "12%",
          animation: "aurora-4 22s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />

      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Vignette — fades edges into bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}
