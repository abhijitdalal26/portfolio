"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [mounted, setMounted] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Fast dot
  const dotX = useSpring(mx, { stiffness: 650, damping: 38 });
  const dotY = useSpring(my, { stiffness: 650, damping: 38 });

  // Slower trailing ring
  const ringX = useSpring(mx, { stiffness: 130, damping: 22 });
  const ringY = useSpring(my, { stiffness: 130, damping: 22 });

  useEffect(() => {
    setMounted(true);
    const handler = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  // Only render on fine-pointer (non-touch) devices after mount
  if (!mounted) return null;

  return (
    <>
      {/* Small precise dot */}
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Trailing ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
