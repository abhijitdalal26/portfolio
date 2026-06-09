"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.215, 0.61, 0.355, 1] as const;

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.1 },
  },
};

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#09090b" }}
    >
      {/* Background glow blobs */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(ellipse at 15% 55%, rgba(59,130,246,0.09) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(139,92,246,0.07) 0%, transparent 50%), radial-gradient(ellipse at 70% 85%, rgba(16,185,129,0.05) 0%, transparent 45%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Hero content */}
      <div
        className="relative flex-1 flex items-center"
        style={{ paddingTop: "80px" }}
      >
        <div className="mx-auto px-8 w-full py-20" style={{ maxWidth: "1000px" }}>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Availability badge */}
            <motion.div
              variants={item}
              transition={{ duration: 0.65, ease }}
              className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full text-[12.5px]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <span className="pulse-dot" />
              Open to work · Building in public · Mumbai, India
            </motion.div>

            {/* Photo + greeting row */}
            <motion.div
              variants={item}
              transition={{ duration: 0.65, ease }}
              className="flex items-center gap-4 mb-5"
            >
              <div
                className="rounded-full overflow-hidden shrink-0"
                style={{
                  width: 56,
                  height: 56,
                  border: "2px solid rgba(255,255,255,0.15)",
                  background: "#1a1a1d",
                }}
              >
                <Image
                  src="/abhijit.jpg"
                  alt="Abhijit Dalal"
                  width={56}
                  height={56}
                  priority
                  style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }}
                />
              </div>
              <p
                className="text-[15px]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Hey, I&apos;m
              </p>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              transition={{ duration: 0.75, ease }}
              className="font-bold mb-5 text-white"
              style={{
                fontSize: "clamp(62px, 9.5vw, 112px)",
                letterSpacing: "-0.045em",
                lineHeight: 0.93,
              }}
            >
              Abhijit
              <br />
              <span className="gradient-text">Dalal</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={item}
              transition={{ duration: 0.65, ease }}
              className="font-medium mb-6 text-[17px]"
              style={{
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "-0.01em",
              }}
            >
              Electronics Student{" "}
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>{" "}
              Deep Learning Enthusiast{" "}
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>{" "}
              Indie Developer
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={item}
              transition={{ duration: 0.65, ease }}
              className="mb-10"
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.35)",
                maxWidth: "480px",
                letterSpacing: "-0.01em",
              }}
            >
              I study how intelligence works and build apps people actually
              use — from training RL agents to shipping Android apps for India.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              transition={{ duration: 0.65, ease }}
              className="flex items-center gap-3 flex-wrap"
            >
              <Link href="/projects" className="btn-primary">
                View projects
                <span style={{ opacity: 0.5 }}>→</span>
              </Link>
              <Link href="/blog" className="btn-ghost">
                Read the blog
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative flex justify-center pb-10">
        <div
          className="bounce text-[13px]"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          ↓ scroll
        </div>
      </div>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "80px",
          background: "linear-gradient(to bottom, transparent, #fafaf9)",
        }}
      />
    </section>
  );
}
