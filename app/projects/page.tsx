import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = { title: "Projects" };

const W = { maxWidth: 1240, margin: "0 auto", padding: "0 48px" } as const;

const projects = [
  {
    title: "Graphify Code",
    year: "2026", kind: "Developer tool",
    description: "Turn any codebase into an interactive knowledge graph you can explore — built as a VS Code extension. Parses TypeScript/JS projects and renders a live dependency graph.",
    tags: ["TypeScript", "VS Code", "Node.js", "SaaS"],
    href: "https://github.com/abhijitdalal26",
    status: null,
  },
  {
    title: "Autonomous Racing with Reinforcement Learning",
    year: "2026", kind: "Research",
    description: "Deep RL agents trained using PPO in Gymnasium CarRacing-v3 and Unity ML-Agents. The agent learns to navigate a racing track from raw pixels — no hand-crafted rules, no explicit physics model.",
    tags: ["Python", "PyTorch", "PPO", "Unity", "Gymnasium"],
    href: "https://github.com/abhijitdalal26/autonomous-racing-using-rl",
    status: null,
  },
  {
    title: "HarryPotterGPT — nanoGPT from Scratch",
    year: "2025", kind: "Learning in public",
    description: "Built a character-level transformer language model from scratch following Karpathy's Zero to Hero series. Every component — self-attention, FFN, positional encodings — implemented manually in PyTorch.",
    tags: ["Python", "PyTorch", "Transformers"],
    href: "https://github.com/abhijitdalal26",
    status: null,
  },
  {
    title: "Play Store App Analysis",
    year: "2024", kind: "Data · Analysis",
    description: "Data analysis on the Indian Android market — exploring categories, ratings, pricing, and install patterns across 11,176 apps in 10 countries.",
    tags: ["Python", "Jupyter", "pandas", "Matplotlib"],
    href: "https://github.com/abhijitdalal26/play-store-app-analysis",
    status: null,
  },
  {
    title: "Android App",
    year: "2026", kind: "Product",
    description: "Building a consumer Android app targeting the Indian market. Early stage — finding the right problem before shipping.",
    tags: ["Kotlin", "Android"],
    href: null,
    status: "In progress",
  },
];

export default function Projects() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="page-wrap" style={{ paddingTop: 60, paddingBottom: 88 }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>

          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--faint)", marginBottom: 10 }}>All Work</div>
          <h1 style={{ fontFamily: "var(--disp)", fontSize: "clamp(34px, 5.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.02, fontWeight: 700, marginBottom: 12 }}>Projects</h1>
          <p style={{ fontSize: 16, color: "var(--sub)", maxWidth: 480, lineHeight: 1.65, marginBottom: 48 }}>Things I build to learn. Every project starts with curiosity.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
