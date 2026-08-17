"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TiltCard — pointer-reactive 3D tilt with a moving glare highlight.
 * Reduced-motion safe (renders flat). Used for the bento menu grid.
 */
export default function TiltCard({
  children,
  className = "",
  max = 10,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  // Hoisted to top level so the hook runs on every render (Rules of Hooks).
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) => `radial-gradient(220px circle at ${gx} ${gy}, rgb(var(--glow) / 0.18), transparent 60%)`
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  if (reduce) {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
      className={cn("group/tilt relative [transform-style:preserve-3d]", className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [transform:translateZ(1px)] group-hover/tilt:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
