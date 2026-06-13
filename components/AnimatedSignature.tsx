export function AnimatedSignature() {
  return (
    <div style={{ display: "flex", alignItems: "center", fontFamily: "'Ubuntu Mono', monospace", fontSize: 15, userSelect: "none", cursor: "default" }}>
      <span style={{ color: "#22c55e", fontWeight: 700 }}>~</span>
      <span style={{ color: "var(--sub)" }}> / </span>
      <span style={{ color: "var(--ink)", fontWeight: 600 }}>abhijit</span>
      <span style={{ display: "inline-block", width: 9, height: 17, background: "#22c55e", marginLeft: 2, borderRadius: 2, animation: "cursor-blink 1s step-end infinite" }} />
    </div>
  );
}
