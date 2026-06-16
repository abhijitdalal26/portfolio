"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AuroraBg } from "./AuroraBg";

interface StaticStar {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tailLen: number;
  opacity: number;
  width: number;
  age: number;
  lifetime: number;
}

function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const staticStars = useRef<StaticStar[]>([]);
  const shootingStars = useRef<ShootingStar[]>([]);
  const nextSpawn = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      buildStars(w, h);
    };

    const buildStars = (w: number, h: number) => {
      const count = Math.min(Math.floor((w * h) / 3200), 230);
      staticStars.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.2,
        baseOpacity: Math.random() * 0.55 + 0.12,
        twinkleSpeed: Math.random() * 0.025 + 0.006,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    const spawnShooter = (t: number) => {
      const angleDeg = 18 + Math.random() * 28;
      const angleRad = (angleDeg * Math.PI) / 180;
      const speed = 5 + Math.random() * 8;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      let x: number, y: number;
      if (Math.random() < 0.6) {
        x = Math.random() * w * 0.75;
        y = -12;
      } else {
        x = -12;
        y = Math.random() * h * 0.55;
      }

      shootingStars.current.push({
        x,
        y,
        vx: Math.cos(angleRad) * speed,
        vy: Math.sin(angleRad) * speed,
        tailLen: 55 + Math.random() * 100,
        opacity: 0.5 + Math.random() * 0.5,
        width: 0.7 + Math.random() * 1.3,
        age: 0,
        lifetime: 55 + Math.floor(Math.random() * 55),
      });

      nextSpawn.current = t + 1600 + Math.random() * 2800;
    };

    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Static twinkling stars
      for (const s of staticStars.current) {
        const twinkle = 0.65 + 0.35 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 248, 230, ${s.baseOpacity * twinkle})`;
        ctx.fill();
      }

      // Spawn
      if (t >= nextSpawn.current) spawnShooter(t);

      // Shooting stars
      shootingStars.current = shootingStars.current.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.age++;

        const lifeRatio = s.age / s.lifetime;
        const fade =
          lifeRatio < 0.25
            ? lifeRatio / 0.25
            : 1 - (lifeRatio - 0.25) / 0.75;
        const alpha = s.opacity * Math.max(0, fade);

        const spd = Math.hypot(s.vx, s.vy);
        const nx = s.vx / spd;
        const ny = s.vy / spd;
        const tx = s.x - nx * s.tailLen;
        const ty = s.y - ny * s.tailLen;

        // Trail gradient
        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(0.5, `rgba(255, 248, 230, ${alpha * 0.35})`);
        grad.addColorStop(1, `rgba(255, 252, 240, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head glow
        if (alpha > 0.05) {
          const glowR = s.width * 4.5;
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
          glow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
          glow.addColorStop(0.4, `rgba(255, 248, 220, ${alpha * 0.4})`);
          glow.addColorStop(1, `rgba(255, 255, 255, 0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        return s.age < s.lifetime && s.x < w + 160 && s.y < h + 160;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export function StarsBg() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || resolvedTheme !== "dark") {
    return <AuroraBg />;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Warm deep-space atmosphere */}
      <div
        style={{
          position: "absolute",
          width: "90vw",
          height: "65vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(70, 45, 15, 0.07) 0%, transparent 70%)",
          filter: "blur(100px)",
          top: "-15%",
          left: "5%",
        }}
      />

      {/* Subtle cool-blue nebula opposite corner */}
      <div
        style={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(30, 50, 100, 0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
          bottom: "0%",
          right: "-5%",
        }}
      />

      <StarCanvas />

      {/* Vignette — same as AuroraBg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}
