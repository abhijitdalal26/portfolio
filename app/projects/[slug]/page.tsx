import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import { FadeUp } from "@/components/FadeUp";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";

function ArrowUpRight() {
  return (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12L12 4M5 4h7v7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
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
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              {project.logo && (
                <div style={{ width: 44, height: 44, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: "1px solid var(--line)" }}>
                  <Image src={project.logo} alt="" width={44} height={44} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                </div>
              )}
              <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(34px, 5.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.02, fontWeight: 700, margin: 0 }}>
                {project.title}
              </h1>
              {project.status === "current" && (
                <span style={{ fontSize: 10.5, fontWeight: 500, padding: "2px 8px", borderRadius: 999, background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)", fontFamily: "var(--mono)", whiteSpace: "nowrap" }}>
                  {project.stageLabel ?? "In Progress"}
                </span>
              )}
            </div>
            <p style={{ fontSize: 16, color: "var(--ink)", maxWidth: 560, lineHeight: 1.65, marginBottom: 24 }}>{project.blurb}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
              {project.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          </FadeUp>

          {project.heroVideo ? (
            project.heroVideoPortrait ? (
              <FadeUp>
                <div className="hero-video-portrait" style={{ display: "flex", gap: 32, marginBottom: 40, alignItems: "flex-start" }}>
                  <div style={{ flex: "0 0 240px", maxWidth: 240, borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "var(--panel)" }}>
                    <video src={project.heroVideo} controls autoPlay loop muted playsInline style={{ width: "100%", display: "block" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1, minWidth: 0 }}>
                    {project.story.map((p, i) => (
                      <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: "var(--ink)" }}>{p}</p>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ) : (
              <>
                <FadeUp>
                  <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "var(--panel)", marginBottom: 40 }}>
                    <video src={project.heroVideo} controls autoPlay loop muted playsInline style={{ width: "100%", display: "block" }} />
                  </div>
                </FadeUp>

                <FadeUp>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 40 }}>
                    {project.story.map((p, i) => (
                      <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: "var(--ink)" }}>{p}</p>
                    ))}
                  </div>
                </FadeUp>
              </>
            )
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
                    <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: "var(--ink)" }}>{p}</p>
                  ))}
                </div>
              </FadeUp>
            </>
          )}

          {project.howItWorks && (
            <FadeUp>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 600, marginBottom: 16 }}>How it works</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {project.howItWorks.map((s, i) => (
                    <p key={i} style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--ink)" }}>{s}</p>
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          {project.diagrams && project.diagrams.length > 0 && (
            <FadeUp>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Technical Breakdown</h2>
                <p style={{ fontSize: 15.5, color: "var(--ink)", lineHeight: 1.65, marginBottom: 20 }}>
                  {project.diagramsIntro ?? "How it was built and trained, in pictures. Full code is on GitHub."}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {project.diagrams.map((d) => (
                    <div key={d.title}>
                      <h3 style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>{d.title}</h3>
                      <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--line)", background: "var(--panel)", marginBottom: 18, position: "relative", maxWidth: d.imageMaxWidth ?? "none", marginInline: d.imageMaxWidth ? "auto" : undefined }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={d.image} alt={d.title} style={{ width: "100%", display: "block" }} />
                      </div>
                      <p style={{ fontSize: 15.5, color: "var(--ink)", lineHeight: 1.65, margin: 0 }}>{d.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <FadeUp>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Website Screenshots</h2>
                <ScreenshotCarousel images={project.screenshots} />
              </div>
            </FadeUp>
          )}

          {project.openclaw && (
            <FadeUp>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 600, marginBottom: 16 }}>{project.openclaw.title}</h2>
                <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--line)", background: "var(--panel)", flexShrink: 0, width: project.openclaw.imageMaxWidth ?? 280, maxWidth: "100%" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.openclaw.image} alt={project.openclaw.title} style={{ width: "100%", display: "block" }} />
                  </div>
                  <p style={{ flex: "1 1 260px", fontSize: 15.5, color: "var(--ink)", lineHeight: 1.65, margin: 0 }}>{project.openclaw.caption}</p>
                </div>
              </div>
            </FadeUp>
          )}

          {project.architectureSteps && project.architectureSteps.length > 0 && (
            <FadeUp>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 600, marginBottom: 16 }}>My Architecture</h2>
                <div style={{ display: "flex", flexDirection: "column", background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 10, overflow: "hidden" }}>
                  {project.architectureSteps.map((step, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "baseline", gap: 10,
                      padding: "9px 14px",
                      borderTop: i > 0 ? "1px solid var(--line)" : "none",
                    }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--faint)", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink)", lineHeight: 1.5 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          <FadeUp>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 28 }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: project.papers?.length ? 20 : 0 }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <GitHubIcon /> GitHub
                  </a>
                )}
                {project.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    {l.label} <ArrowUpRight />
                  </a>
                ))}
              </div>
              {project.papers && project.papers.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
                  {project.papers.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 14, color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: 3 }}
                    >
                      {p.label} <ArrowUpRight />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </FadeUp>

        </div>
      </div>
    </div>
  );
}
