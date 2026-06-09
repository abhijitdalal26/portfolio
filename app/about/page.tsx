import type { Metadata } from "next";
import Image from "next/image";
import { FadeUp } from "@/components/FadeUp";

export const metadata: Metadata = { title: "About" };

const stack = ["Python", "PyTorch", "Kotlin", "Android Studio", "Next.js", "Git"];

const W = { maxWidth: 1240, margin: "0 auto", padding: "0 64px" };

export default function About() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ ...W, paddingTop: 80, paddingBottom: 96 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 72, alignItems: "start" }}>

            {/* Left */}
            <div>
              <FadeUp>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--faint)" }}>
                  About
                </span>
                <h1
                  style={{
                    fontFamily: "var(--disp)",
                    fontSize: "clamp(36px, 6vw, 58px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.05,
                    color: "var(--ink)",
                    fontWeight: 600,
                    marginTop: 16,
                    marginBottom: 36,
                  }}
                >
                  Electronics student,<br />
                  <span style={{ color: "#ff7849" }}>indie developer</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div style={{ fontSize: 17, lineHeight: 1.78, color: "var(--sub)", display: "flex", flexDirection: "column", gap: 20 }}>
                  <p>
                    Electronics &amp; Telecom student from Mumbai. Fascinated by machine
                    intelligence — not just using AI but understanding how it actually
                    works from the math up.
                  </p>
                  <p>
                    I follow Karpathy&apos;s philosophy: learn by building. Built nanoGPT
                    from scratch, trained RL agents in simulated environments, analyzed
                    the Android market with data. Every project starts with{" "}
                    <em style={{ color: "var(--ink)" }}>
                      &ldquo;I want to understand this.&rdquo;
                    </em>
                  </p>
                  <p>
                    Right now I&apos;m building Android apps targeting India. The blog is
                    where I think out loud — AI history, things I&apos;m learning, what
                    I&apos;m shipping.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div style={{ marginTop: 40 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--faint)" }}>
                    Currently Building
                  </span>
                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "Android app for the Indian market",
                      "Studying transformer architectures beyond attention",
                    ].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div style={{ width: 6, height: 6, borderRadius: 999, background: "#3b82f6", marginTop: 7, flexShrink: 0 }} />
                        <p style={{ fontSize: 15, color: "var(--sub)" }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right */}
            <FadeUp delay={0.15}>
              <div>
                <div
                  style={{ borderRadius: 20, overflow: "hidden", marginBottom: 28, border: "1px solid var(--line)", aspectRatio: "1/1" }}
                >
                  <Image
                    src="/abhijit.jpg"
                    alt="Abhijit Dalal"
                    width={280}
                    height={280}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--faint)" }}>
                    Stack
                  </span>
                  <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {stack.map((tech) => (
                      <span key={tech} className="chip">{tech}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--faint)" }}>
                    Links
                  </span>
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      { label: "GitHub", href: "https://github.com/abhijitdalal26", sub: "abhijitdalal26" },
                      { label: "Twitter / X", href: "https://x.com/abhijitdalal_", sub: "@abhijitdalal_" },
                      { label: "Email", href: "mailto:abhijitdalal7462@gmail.com", sub: "abhijitdalal7462" },
                    ].map(({ label, href, sub }) => (
                      <div key={label}>
                        <a
                          href={href}
                          target={href.startsWith("mailto") ? undefined : "_blank"}
                          rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                          style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", textDecoration: "none" }}
                        >
                          {label} ↗
                        </a>
                        <p style={{ fontSize: 12, color: "var(--faint)", marginTop: 2 }}>{sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
