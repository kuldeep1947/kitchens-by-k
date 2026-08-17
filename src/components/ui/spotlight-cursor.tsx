"use client";

import { useEffect, useRef } from "react";

/**
 * SpotlightCursor — an additive, GPU-cheap glow that trails the pointer.
 * Does NOT replace the native cursor (accessibility-safe). Only activates on
 * fine pointers (mouse) and disables itself under prefers-reduced-motion.
 * Mount once near the app root.
 */
export default function SpotlightCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = document.documentElement.classList.contains("lite");
    if (!finePointer || reduce || lite) return;

    const el = dotRef.current;
    if (!el) return;

    let raf = 0;
    let running = false;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;

    function loop() {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el!.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      // Keep animating only while there's meaningful movement left, then idle.
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    }
    function kick() {
      if (!running && !document.hidden) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    }
    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      el!.style.opacity = "1";
      kick();
    }
    function onLeave() {
      el!.style.opacity = "0";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-500 mix-blend-soft-light dark:mix-blend-screen"
      style={{
        background:
          "radial-gradient(closest-side, rgb(var(--glow) / 0.16), transparent)",
      }}
    />
  );
}
