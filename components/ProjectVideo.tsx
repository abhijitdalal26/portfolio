export function ProjectVideo({ src, poster }: { src: string; poster?: string }) {
  const webm = src.replace(/\.mp4$/, ".webm");
  return (
    <video controls playsInline preload="none" poster={poster} style={{ width: "100%", display: "block" }}>
      <source src={webm} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  );
}