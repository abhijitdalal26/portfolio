export function ProjectVideo({ src, poster, portrait, fill }: { src: string; poster?: string; portrait?: boolean; fill?: boolean }) {
  const webm = src.replace(/\.mp4$/, ".webm");
  if (fill) {
    return (
      <video
        controls
        playsInline
        preload="metadata"
        poster={poster}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          background: "#0b0e14",
        }}
      >
        <source src={webm} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
    );
  }
  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={poster}
      style={{
        width: "100%",
        height: portrait ? "auto" : undefined,
        display: "block",
        verticalAlign: "top",
        aspectRatio: portrait ? "392 / 850" : undefined,
        objectFit: portrait ? "cover" : undefined,
        background: portrait ? "#0b0e14" : undefined,
      }}
    >
      <source src={webm} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  );
}