import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Electronics student from Mumbai, obsessed with understanding intelligence from the ground up.",
};

const stack = [
  "Python",
  "PyTorch",
  "Kotlin",
  "Android Studio",
  "Next.js",
  "Git",
];

const building = [
  "Android app for the Indian market",
  "Studying transformer architectures beyond attention",
];

export default function About() {
  return (
    <div className="mx-auto px-7 pt-16 pb-20" style={{ maxWidth: "660px" }}>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* ── Left: Bio ─────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <h1
            className="font-semibold mb-10"
            style={{
              fontSize: "clamp(28px, 5vw, 38px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            About
          </h1>

          <div
            className="space-y-5"
            style={{ color: "var(--text)", fontSize: "17px", lineHeight: 1.75 }}
          >
            <p>
              Electronics &amp; Telecom student from Mumbai. Fascinated by
              machine intelligence — not just using AI but understanding how
              it actually works from the math up.
            </p>
            <p>
              I follow Karpathy&apos;s philosophy of learning by building. Built
              nanoGPT from scratch, trained RL agents in simulated environments,
              analyzed the Android market with data. Every project starts with{" "}
              <em style={{ fontStyle: "italic" }}>
                &ldquo;I want to understand this.&rdquo;
              </em>
            </p>
            <p>
              Right now I&apos;m building Android apps targeting India. The blog
              is where I think out loud — about AI history, things I&apos;m
              learning, and what I&apos;m shipping.
            </p>
          </div>

          {/* Currently building */}
          <div className="mt-10">
            <p className="section-label mb-4">Currently Building</p>
            <ul className="space-y-2">
              {building.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px]"
                  style={{ color: "var(--muted)" }}
                >
                  <span
                    className="mt-[7px] shrink-0"
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--muted)",
                      display: "inline-block",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right: Stack & Links ───────────────────────── */}
        <div className="lg:w-48 shrink-0">
          {/* Stack */}
          <div className="mb-8">
            <p className="section-label mb-4">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {stack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="section-label mb-4">Links</p>
            <div className="flex flex-col gap-2.5">
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/abhijitdalal26",
                  sub: "abhijitdalal26",
                },
                {
                  label: "Twitter",
                  href: "https://x.com/abhijitdalal_",
                  sub: "@abhijitdalal_",
                },
                {
                  label: "Email",
                  href: "mailto:abhijitdalal7462@gmail.com",
                  sub: "abhijitdalal7462",
                },
              ].map(({ label, href, sub }) => (
                <div key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="text-[14px] transition-opacity hover:opacity-60"
                    style={{ color: "var(--text)" }}
                  >
                    {label}
                  </a>
                  <p
                    className="text-[12px] mt-0.5"
                    style={{ color: "var(--muted)" }}
                  >
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
