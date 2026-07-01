"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback } from "react";
import type { Project } from "@/lib/projects";

function ArrowUpRight() {
  return (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12L12 4M5 4h7v7" />
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--gx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--gy", `${e.clientY - r.top}px`);
  }, []);

  const thumb = project.screenshots?.[0] ?? project.heroImage;

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        ref={ref}
        className="glow-card"
        onMouseMove={onMouseMove}
        style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
      >
        {project.cardPreview ? (
          <div style={{ padding: "12px 12px 0" }}>
            <div style={{ display: "flex", height: 190, borderRadius: 8, overflow: "hidden", position: "relative" }}>
              {project.cardPreview.images.map((src, i) => (
                <div key={src} style={{ flex: 1, position: "relative", borderRight: i === 0 ? "1px solid var(--line)" : "none" }}>
                  <Image src={src} alt="" fill style={{ objectFit: "cover" }} sizes="(max-width: 720px) 50vw, 280px" />
                </div>
              ))}
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--faint)", textAlign: "center", padding: "8px 0 0" }}>
              {project.cardPreview.caption}
            </div>
          </div>
        ) : thumb && (
          <div style={{ height: 190, padding: "12px 12px 0", position: "relative" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 8, overflow: "hidden", position: "relative" }}>
              <Image src={thumb} alt={project.title} fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="(max-width: 720px) 100vw, 560px" />
            </div>
          </div>
        )}

        <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1, position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--ink)" }}>{project.title}</div>
            {project.status === "current" && (
              <span style={{ fontSize: 10.5, fontWeight: 500, padding: "2px 8px", borderRadius: 999, background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)", fontFamily: "var(--mono)", whiteSpace: "nowrap" }}>
                In Progress
              </span>
            )}
          </div>
          <div style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.6, marginBottom: 18, flex: 1 }}>{project.blurb}</div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--accent)", fontWeight: 600 }}>
            View project <ArrowUpRight />
          </span>
        </div>
      </div>
    </Link>
  );
}
