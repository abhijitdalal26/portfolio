import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatDate } from "@/lib/posts";

const featuredProjects = [
  {
    title: "Autonomous Racing with Reinforcement Learning",
    description:
      "Deep RL agents trained using PPO in Gymnasium CarRacing-v3 and Unity ML-Agents. The agent learns to navigate from raw pixels — no hand-crafted rules.",
    tags: ["Python", "PyTorch", "PPO", "Unity"],
    href: "https://github.com/abhijitdalal26/autonomous-racing-using-rl",
  },
  {
    title: "HarryPotterGPT — nanoGPT from Scratch",
    description:
      "Built a character-level transformer language model from scratch following Karpathy's Zero to Hero. Trained on the Harry Potter corpus.",
    tags: ["Python", "PyTorch", "Transformers"],
    href: "https://github.com/abhijitdalal26",
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto px-7" style={{ maxWidth: "660px" }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-16 pb-20">
        {/* Name + Photo row */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex-1">
            {/* Status eyebrow */}
            <div
              className="flex items-center gap-2 mb-5"
              style={{ fontSize: "12.5px", color: "var(--muted)" }}
            >
              <span className="pulse-dot" />
              <span>Open to work · Building in public · Mumbai, India</span>
            </div>

            {/* Name */}
            <h1
              className="font-semibold"
              style={{
                fontSize: "clamp(42px, 7vw, 60px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
                color: "var(--text)",
              }}
            >
              Abhijit
              <br />
              Dalal
            </h1>
          </div>

          {/* Photo */}
          <div
            className="shrink-0 rounded-xl overflow-hidden mt-1"
            style={{
              width: "clamp(88px, 14vw, 120px)",
              aspectRatio: "1/1",
              border: "1px solid var(--subtle)",
            }}
          >
            <Image
              src="/abhijit.jpg"
              alt="Abhijit Dalal"
              width={120}
              height={120}
              priority
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>

        {/* Tagline */}
        <p
          className="mb-8"
          style={{
            color: "var(--muted)",
            fontSize: "17px",
            lineHeight: 1.7,
            maxWidth: "460px",
          }}
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
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[14px] font-[500] transition-opacity hover:opacity-80"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            See my projects
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-[14px] transition-opacity hover:opacity-60 px-1"
            style={{ color: "var(--muted)" }}
          >
            Read the blog
            <span
              className="ml-0.5"
              style={{ color: "var(--accent)" }}
            >
              →
            </span>
          </Link>
        </div>
      </section>

      {/* ── Selected Work ─────────────────────────────────── */}
      <section className="pb-20">
        <p className="section-label mb-5">Selected Work</p>

        <div className="flex flex-col gap-3">
          {featuredProjects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group block no-underline"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p
                  className="font-[500] leading-snug"
                  style={{
                    fontSize: "15px",
                    color: "var(--text)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {project.title}
                </p>
                <span
                  className="text-[13px] shrink-0 mt-0.5 transition-opacity opacity-40 group-hover:opacity-80"
                  style={{ color: "var(--text)" }}
                >
                  ↗
                </span>
              </div>
              <p
                className="text-[13.5px] leading-[1.6] mb-3"
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
            </a>
          ))}
        </div>

        <div className="mt-5">
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
        <p className="section-label mb-5">Writing</p>

        <div className="flex flex-col">
          {posts.map((post, i) => (
            <div key={post.slug}>
              {i > 0 && (
                <div style={{ height: "1px", background: "var(--subtle)" }} />
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="hover-row group block py-4 px-3 -mx-3"
              >
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <span
                    className="font-[450] text-[15px] transition-opacity group-hover:opacity-60"
                    style={{ color: "var(--text)", letterSpacing: "-0.01em" }}
                  >
                    {post.title}
                  </span>
                  <span
                    className="text-[12.5px] shrink-0"
                    style={{ color: "var(--muted)" }}
                  >
                    {formatDate(post.date)}
                  </span>
                </div>
                <p
                  className="text-[13.5px] leading-[1.5]"
                  style={{ color: "var(--muted)" }}
                >
                  {post.description}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-4">
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
