import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things I build to learn. Deep RL, transformers, Android apps, and data analysis.",
};

const projects = [
  {
    title: "Autonomous Racing with Reinforcement Learning",
    description:
      "Deep RL agents trained using PPO in Gymnasium CarRacing-v3 and Unity ML-Agents. The agent learns to navigate a racing track from raw pixels — no hand-crafted rules, no explicit physics.",
    tags: ["Python", "PyTorch", "PPO", "Unity", "Gymnasium"],
    href: "https://github.com/abhijitdalal26/autonomous-racing-using-rl",
    status: null,
  },
  {
    title: "HarryPotterGPT — nanoGPT from Scratch",
    description:
      "Built a character-level transformer language model from scratch following Karpathy's Zero to Hero lecture series. Every part — attention, feedforward blocks, positional encodings — built manually in PyTorch.",
    tags: ["Python", "PyTorch", "Transformers"],
    href: "https://github.com/abhijitdalal26",
    status: null,
  },
  {
    title: "Play Store App Analysis",
    description:
      "Data analysis on the Indian Android app market — exploring categories, ratings, pricing models, and install patterns. Surfaced non-obvious insights about what actually drives installs.",
    tags: ["Python", "Jupyter", "pandas", "Matplotlib"],
    href: "https://github.com/abhijitdalal26/play-store-app-analysis",
    status: null,
  },
  {
    title: "Android App",
    description:
      "Building a consumer Android app targeting the Indian market. Early stage — focused on finding the right problem before writing much code.",
    tags: ["Kotlin", "Android"],
    href: null,
    status: "In progress",
  },
];

export default function Projects() {
  return (
    <div className="mx-auto px-7 pt-14 pb-20" style={{ maxWidth: "660px" }}>
      {/* Heading */}
      <div className="mb-12">
        <h1
          className="font-semibold mb-3"
          style={{
            fontSize: "clamp(30px, 5vw, 42px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            color: "var(--text)",
          }}
        >
          Projects
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "17px", lineHeight: 1.6 }}>
          Things I build to learn. Everything here started with curiosity.
        </p>
      </div>

      {/* Project cards */}
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <div key={project.title} className="project-card">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <p
                  className="font-[500]"
                  style={{
                    fontSize: "15px",
                    color: "var(--text)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.35,
                  }}
                >
                  {project.title}
                </p>
                {project.status && (
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-[500] shrink-0"
                    style={{
                      background: "var(--subtle)",
                      color: "var(--muted)",
                      border: "1px solid var(--subtle)",
                    }}
                  >
                    {project.status}
                  </span>
                )}
              </div>
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] shrink-0 mt-0.5 transition-opacity hover:opacity-60"
                  style={{ color: "var(--muted)" }}
                >
                  GitHub ↗
                </a>
              )}
            </div>

            <p
              className="text-[14px] leading-[1.65] mb-4"
              style={{ color: "var(--muted)" }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
