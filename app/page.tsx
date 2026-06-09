import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

const featuredProjects = [
  {
    title: "Autonomous Racing with Reinforcement Learning",
    description:
      "Deep RL agents trained using PPO in Gymnasium CarRacing-v3 and Unity ML-Agents.",
    tags: ["Python", "PyTorch", "PPO", "Unity"],
    href: "https://github.com/abhijitdalal26/autonomous-racing-using-rl",
  },
  {
    title: "HarryPotterGPT — nanoGPT from Scratch",
    description:
      "Built a transformer language model from scratch following Karpathy's Zero to Hero lectures.",
    tags: ["Python", "PyTorch", "Transformers"],
    href: "https://github.com/abhijitdalal26",
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto px-7" style={{ maxWidth: "660px" }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-20 pb-24">
        {/* Status eyebrow */}
        <div
          className="flex items-center gap-2 mb-6"
          style={{ fontSize: "12.5px", color: "var(--muted)" }}
        >
          <span className="pulse-dot" />
          <span>Open to work · Building in public · Mumbai, India</span>
        </div>

        {/* Name */}
        <h1
          className="font-semibold mb-6"
          style={{
            fontSize: "clamp(40px, 7vw, 58px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Abhijit
          <br />
          Dalal
        </h1>

        {/* Tagline */}
        <p
          className="mb-8 max-w-[500px]"
          style={{ color: "var(--muted)", fontSize: "17px" }}
        >
          I study{" "}
          <span className="font-[500]" style={{ color: "var(--text)" }}>
            how intelligence works
          </span>{" "}
          and build apps people actually use. Electronics student by degree,{" "}
          <span className="font-[500]" style={{ color: "var(--text)" }}>
            indie developer
          </span>{" "}
          by choice — obsessed with deep learning, transformers, and shipping
          things.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-5 flex-wrap">
          <Link
            href="/projects"
            className="inline-flex items-center px-4 py-2 rounded-lg text-[14px] font-[500] transition-opacity hover:opacity-80"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            See my projects
          </Link>
          <Link
            href="/blog"
            className="text-[14px] transition-opacity hover:opacity-60"
            style={{ color: "var(--muted)" }}
          >
            Read the blog →
          </Link>
        </div>
      </section>

      {/* ── Selected Work ─────────────────────────────────── */}
      <section className="pb-20">
        <p className="section-label mb-6">Selected Work</p>

        <div>
          {featuredProjects.map((project, i) => (
            <div key={project.title}>
              {i > 0 && (
                <div style={{ height: "1px", background: "var(--subtle)" }} />
              )}
              <div className="py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-[500] mb-1.5"
                      style={{
                        fontSize: "15px",
                        color: "var(--text)",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {project.title}
                    </p>
                    <p
                      className="mb-3 text-[14px] leading-[1.55]"
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
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] shrink-0 transition-opacity hover:opacity-60 mt-0.5"
                    style={{ color: "var(--muted)" }}
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <Link
            href="/projects"
            className="text-[13.5px] transition-opacity hover:opacity-60"
            style={{ color: "var(--muted)" }}
          >
            All projects →
          </Link>
        </div>
      </section>

      {/* ── Writing ────────────────────────────────────────── */}
      <section className="pb-20">
        <p className="section-label mb-6">Writing</p>

        <div>
          {posts.map((post, i) => (
            <div key={post.slug}>
              {i > 0 && (
                <div
                  style={{ height: "1px", background: "var(--subtle)" }}
                />
              )}
              <Link href={`/blog/${post.slug}`} className="group block py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    className="text-[15px] transition-opacity group-hover:opacity-60"
                    style={{ color: "var(--text)", letterSpacing: "-0.01em" }}
                  >
                    {post.title}
                  </span>
                  <span
                    className="text-[13px] shrink-0"
                    style={{ color: "var(--muted)" }}
                  >
                    {formatDate(post.date)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <Link
            href="/blog"
            className="text-[13.5px] transition-opacity hover:opacity-60"
            style={{ color: "var(--muted)" }}
          >
            All posts →
          </Link>
        </div>
      </section>
    </div>
  );
}
