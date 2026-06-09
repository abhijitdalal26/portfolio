import type { Metadata } from "next";
import Image from "next/image";
import { FadeUp } from "@/components/FadeUp";

export const metadata: Metadata = { title: "About" };

const stack = ["Python", "PyTorch", "Kotlin", "Android Studio", "Next.js", "Git"];

export default function About() {
  return (
    <div style={{ background: "#fafaf9", minHeight: "100vh" }}>
      <div className="mx-auto px-8 pt-28 pb-24" style={{ maxWidth: "1000px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 lg:gap-20">

          {/* Left */}
          <div>
            <FadeUp>
              <p className="section-label mb-3">About</p>
              <h1
                className="font-bold mb-10"
                style={{ fontSize: "clamp(36px, 6vw, 60px)", letterSpacing: "-0.04em", lineHeight: 1.05, color: "#09090b" }}
              >
                Electronics student,<br />
                <span className="gradient-text">indie developer</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-5" style={{ fontSize: "17px", lineHeight: 1.78, color: "#3f3f46" }}>
                <p>
                  Electronics &amp; Telecom student from Mumbai. Fascinated by machine
                  intelligence — not just using AI but understanding how it actually
                  works from the math up.
                </p>
                <p>
                  I follow Karpathy&apos;s philosophy: learn by building. Built nanoGPT
                  from scratch, trained RL agents in simulated environments, analyzed
                  the Android market with data. Every project starts with{" "}
                  <em style={{ color: "#09090b", fontStyle: "italic" }}>
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
              <div className="mt-12">
                <p className="section-label mb-5">Currently Building</p>
                <div className="space-y-3">
                  {[
                    "Android app for the Indian market",
                    "Studying transformer architectures beyond attention",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div
                        className="shrink-0 rounded-full mt-[7px]"
                        style={{ width: 6, height: 6, background: "#3b82f6" }}
                      />
                      <p style={{ fontSize: "15px", color: "#52525b" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right */}
          <FadeUp delay={0.15}>
            <div>
              {/* Photo */}
              <div
                className="rounded-2xl overflow-hidden mb-8"
                style={{ border: "1px solid #e4e4e7", aspectRatio: "1/1" }}
              >
                <Image
                  src="/abhijit.jpg"
                  alt="Abhijit Dalal"
                  width={280}
                  height={280}
                  className="w-full h-full"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>

              {/* Stack */}
              <div className="mb-8">
                <p className="section-label mb-4">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <p className="section-label mb-4">Links</p>
                <div className="flex flex-col gap-3.5">
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
                        className="text-[14px] font-[500] transition-opacity hover:opacity-60"
                        style={{ color: "#09090b" }}
                      >
                        {label} ↗
                      </a>
                      <p className="text-[12px] mt-0.5" style={{ color: "#a1a1aa" }}>{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
