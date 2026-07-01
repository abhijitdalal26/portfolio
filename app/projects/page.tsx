import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectsByStatus } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  const current = getProjectsByStatus("current");
  const done = getProjectsByStatus("done");

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="page-wrap" style={{ paddingTop: 60, paddingBottom: 88 }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>

          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 10 }}>All Work</div>
          <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(34px, 5.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.02, fontWeight: 700, marginBottom: 12 }}>Projects</h1>
          <p style={{ fontSize: 16, color: "var(--sub)", maxWidth: 480, lineHeight: 1.65, marginBottom: 48 }}>Things I build to learn. Every project starts with curiosity.</p>

          {current.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 16 }}>
                Currently Working On
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {current.map((p) => <ProjectCard key={p.slug} project={p} />)}
              </div>
            </div>
          )}

          <div>
            {current.length > 0 && (
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 16 }}>
                Past Work
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {done.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
