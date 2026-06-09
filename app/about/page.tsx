import type { Metadata } from "next";
import Image from "next/image";

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
    <div className="mx-auto px-7 pt-14 pb-20" style={{ maxWidth: "660px" }}>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-14">
        {/* ── Left: Bio ─────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <h1
            className="font-semibold mb-10"
            style={{
              fontSize: "clamp(30px, 5vw, 42px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
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
              <em>&ldquo;I want to understand this.&rdquo;</em>
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
            <ul className="space-y-2.5">
              {building.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px]"
                  style={{ color: "var(--muted)" }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      display: "inline-block",
                      marginTop: "9px",
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right: Photo + Stack + Links ──────────────── */}
        <div className="lg:w-[180px] shrink-0">
          {/* Photo */}
          <div
            className="rounded-xl overflow-hidden mb-8"
            style={{
              width: "100%",
              maxWidth: "180px",
              aspectRatio: "1/1",
              border: "1px solid var(--subtle)",
            }}
          >
            <Image
              src="/abhijit.jpg"
              alt="Abhijit Dalal"
              width={180}
              height={180}
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>

          {/* Stack */}
          <div className="mb-8">
            <p className="section-label mb-3.5">Stack</p>
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
            <p className="section-label mb-3.5">Links</p>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/abhijitdalal26",
                  sub: "abhijitdalal26",
                },
                {
                  label: "Twitter / X",
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
                    className="text-[14px] font-[450] transition-opacity hover:opacity-60"
                    style={{ color: "var(--text)" }}
                  >
                    {label} ↗
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
