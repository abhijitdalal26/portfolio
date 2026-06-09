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
      "Deep RL agents trained using PPO in Gymnasium CarRacing-v3 and Unity ML-Agents. The agent learns to navigate a racing track from raw pixels — no hand-crafted rules.",
    tags: ["Python", "PyTorch", "PPO", "Unity", "Gymnasium"],
    href: "https://github.com/abhijitdalal26/autonomous-racing-using-rl",
    status: null,
  },
  {
    title: "HarryPotterGPT — nanoGPT from Scratch",
    description:
      "Built a character-level transformer language model from scratch following Karpathy's Zero to Hero lecture series. Trained on the Harry Potter corpus.",
    tags: ["Python", "PyTorch", "Transformers"],
    href: "https://github.com/abhijitdalal26",
    status: null,
  },
  {
    title: "Play Store App Analysis",
    description:
      "Data analysis on the Indian Android app market — exploring categories, ratings, pricing models, and installs. Built with pandas and Matplotlib.",
    tags: ["Python", "Jupyter", "pandas", "Matplotlib"],
    href: "https://github.com/abhijitdalal26/play-store-app-analysis",
    status: null,
  },
  {
    title: "Android App",
    description: "Coming soon — building for the Indian market.",
    tags: ["Kotlin", "Android"],
    href: null,
    status: "In progress",
  },
];

export default function Projects() {
  return (
    <div className="mx-auto px-7 pt-16 pb-20" style={{ maxWidth: "660px" }}>
      {/* Page heading */}
      <div className="mb-14">
        <h1
          className="font-semibold mb-3"
          style={{
            fontSize: "clamp(28px, 5vw, 38px)",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: "var(--text)",
          }}
        >
          Projects
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "17px" }}>
          Things I build to learn. Everything here started with curiosity.
        </p>
      </div>

      {/* Project list */}
      <div>
        {projects.map((project, i) => (
          <div key={project.title}>
            {i > 0 && (
              <div style={{ height: "1px", background: "var(--subtle)" }} />
            )}
            <div className="py-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-2">
                    <p
                      className="font-[500]"
                      style={{
                        fontSize: "15px",
                        color: "var(--text)",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {project.title}
                    </p>
                    {project.status && (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-[500]"
                        style={{
                          background: "#fef3c7",
                          color: "#92400e",
                          border: "1px solid #fde68a",
                        }}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>
                  <p
                    className="mb-3 text-[14px] leading-[1.6]"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
