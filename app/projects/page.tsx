import type { Metadata } from "next";
import { FadeUp } from "@/components/FadeUp";

export const metadata: Metadata = { title: "Projects" };

const projects = [
  {
    title: "Autonomous Racing with Reinforcement Learning",
    year: "2024",
    description: "Deep RL agents trained using PPO in Gymnasium CarRacing-v3 and Unity ML-Agents. The agent learns to navigate a racing track from raw pixels — no hand-crafted rules, no explicit physics model.",
    tags: ["Python", "PyTorch", "PPO", "Unity", "Gymnasium"],
    href: "https://github.com/abhijitdalal26/autonomous-racing-using-rl",
    status: null,
  },
  {
    title: "HarryPotterGPT — nanoGPT from Scratch",
    year: "2024",
    description: "Built a character-level transformer language model from scratch following Karpathy's Zero to Hero series. Every component — self-attention, FFN, positional encodings — implemented manually in PyTorch.",
    tags: ["Python", "PyTorch", "Transformers"],
    href: "https://github.com/abhijitdalal26",
    status: null,
  },
  {
    title: "Play Store App Analysis",
    year: "2023",
    description: "Data analysis on the Indian Android market — exploring categories, ratings, pricing, and install patterns. Surfaced non-obvious insights about what actually drives downloads.",
    tags: ["Python", "Jupyter", "pandas", "Matplotlib"],
    href: "https://github.com/abhijitdalal26/play-store-app-analysis",
    status: null,
  },
  {
    title: "Android App",
    year: "2026",
    description: "Building a consumer Android app targeting the Indian market. Early stage — finding the right problem before shipping.",
    tags: ["Kotlin", "Android"],
    href: null,
    status: "In progress",
  },
];

export default function Projects() {
  return (
    <div style={{ background: "#fafaf9", minHeight: "100vh" }}>
      <div className="mx-auto px-8 pt-28 pb-24" style={{ maxWidth: "1000px" }}>
        <FadeUp>
          <p className="section-label mb-3">All Work</p>
          <h1
            className="font-bold mb-4"
            style={{ fontSize: "clamp(36px, 6vw, 60px)", letterSpacing: "-0.04em", lineHeight: 1.05, color: "#09090b" }}
          >
            Projects
          </h1>
          <p className="mb-16 text-[17px]" style={{ color: "#71717a", maxWidth: "520px", lineHeight: 1.65 }}>
            Things I build to learn. Every project starts with curiosity.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-5">
          {projects.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.07}>
              <div className="proj-card">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2
                        className="font-bold"
                        style={{ fontSize: "17px", color: "#09090b", letterSpacing: "-0.02em" }}
                      >
                        {p.title}
                      </h2>
                      {p.status && (
                        <span className="text-[11px] font-[500] px-2 py-0.5 rounded-full"
                          style={{ background: "#fef9c3", color: "#854d0e", border: "1px solid #fef08a" }}>
                          {p.status}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px]" style={{ color: "#a1a1aa" }}>{p.year}</p>
                  </div>
                  {p.href && (
                    <a href={p.href} target="_blank" rel="noopener noreferrer"
                      className="text-[13px] shrink-0 transition-opacity hover:opacity-60 font-[500]"
                      style={{ color: "#3b82f6" }}>
                      GitHub ↗
                    </a>
                  )}
                </div>
                <p className="text-[14.5px] leading-[1.65] mb-4" style={{ color: "#71717a" }}>{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
