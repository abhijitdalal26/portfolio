export function ProjectVideo({ src, poster, portrait }: { src: string; poster?: string; portrait?: boolean }) {
  const webm = src.replace(/\.mp4$/, ".webm");
  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={poster}
      style={{
        width: "100%",
        display: "block",
        aspectRatio: portrait ? "392 / 850" : undefined,
        objectFit: portrait ? "contain" : undefined,
        background: portrait ? "#0b0e14" : undefined,
        maxHeight: portrait ? "min(68vh, 560px)" : undefined,
      }}
    >
      <source src={webm} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  );
}