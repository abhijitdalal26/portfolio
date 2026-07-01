import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import { FadeUp } from "@/components/FadeUp";

function ArrowUpRight() {
  return (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12L12 4M5 4h7v7" />
    </svg>
  );
}
function ArrowLeft() {
  return (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 8H3M7 4L3 8l4 4" />
    </svg>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.blurb };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="page-wrap" style={{ paddingTop: 48, paddingBottom: 88 }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          <FadeUp>
            <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--sub)", textDecoration: "none", marginBottom: 32 }}>
              <ArrowLeft /> All projects
            </Link>
          </FadeUp>

          <FadeUp>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              {project.logo && (
                <div style={{ width: 44, height: 44, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: "1px solid var(--line)" }}>
                  <Image src={project.logo} alt="" width={44} height={44} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                </div>
              )}
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)" }}>
                {project.kind}
              </div>
              {project.status === "current" && (
                <span style={{ fontSize: 10.5, fontWeight: 500, padding: "2px 8px", borderRadius: 999, background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)", fontFamily: "var(--mono)" }}>
                  In Progress
                </span>
              )}
            </div>
            <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(34px, 5.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.02, fontWeight: 700, marginBottom: 16 }}>
              {project.title}
            </h1>
            <p style={{ fontSize: 16, color: "var(--sub)", maxWidth: 560, lineHeight: 1.65, marginBottom: 24 }}>{project.blurb}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
              {project.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          </FadeUp>

          {project.heroVideo ? (
            <FadeUp>
              <div className="project-hero" style={{ marginBottom: 40 }}>
                <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "var(--panel)" }}>
                  <video src={project.heroVideo} controls autoPlay loop muted playsInline style={{ width: "100%", display: "block" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {project.story.map((p, i) => (
                    <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: "var(--sub)" }}>{p}</p>
                  ))}
                </div>
              </div>
            </FadeUp>
          ) : (
            <>
              {project.heroImage && (
                <FadeUp>
                  <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", marginBottom: 40, position: "relative", aspectRatio: "16/9" }}>
                    <Image src={project.heroImage} alt={project.title} fill style={{ objectFit: "cover" }} />
                  </div>
                </FadeUp>
              )}

              <FadeUp>
                <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 40 }}>
                  {project.story.map((p, i) => (
                    <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: "var(--sub)" }}>{p}</p>
                  ))}
                </div>
              </FadeUp>
            </>
          )}

          {project.howItWorks && (
            <FadeUp>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 600, marginBottom: 16 }}>How it works</h2>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 20 }}>
                  {project.howItWorks.map((s, i) => (
                    <li key={i} style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--sub)" }}>{s}</li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <FadeUp>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Screenshots</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  {project.screenshots.map((src) => (
                    <div key={src} style={{ width: 220, borderRadius: 12, overflow: "hidden", border: "1px solid var(--line)", position: "relative", aspectRatio: "9/19" }}>
                      <Image src={src} alt="" fill style={{ objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          {project.techStack && (
            <FadeUp>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Tech stack</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {project.techStack.map((group) => (
                    <div key={group.label} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--faint)", minWidth: 120 }}>{group.label}</span>
                      <span style={{ fontSize: 14.5, color: "var(--sub)" }}>{group.items.join(" · ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          {project.architecture && project.architecture.length > 0 && (
            <FadeUp>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 600, marginBottom: 8 }}>From the training notebook</h2>
                <p style={{ fontSize: 14.5, color: "var(--sub)", lineHeight: 1.6, marginBottom: 20 }}>
                  The key pieces of the model architecture and training pipeline, straight from the notebook.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {project.architecture.map((block) => (
                    <div key={block.title}>
                      <h3 style={{ fontSize: 15.5, fontWeight: 600, color: "var(--ink)", marginBottom: block.note ? 4 : 10 }}>{block.title}</h3>
                      {block.note && (
                        <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.6, marginBottom: 10 }}>{block.note}</p>
                      )}
                      <div className="prose">
                        <pre><code>{block.code}</code></pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          <FadeUp>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", borderTop: "1px solid var(--line)", paddingTop: 28 }}>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                GitHub <ArrowUpRight />
              </a>
              {project.links?.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  {l.label} <ArrowUpRight />
                </a>
              ))}
            </div>
          </FadeUp>

        </div>
      </div>
    </div>
  );
}
