"use client";

import { useEffect, useRef } from "react";

/**
 * HeroParticles — GPU-cheap drifting "spice ember" field that repels from the
 * cursor. Performance-tuned:
 *  - uses a pre-rendered radial-gradient sprite instead of per-particle
 *    `shadowBlur` (the expensive part) — glow for free via drawImage
 *  - pauses the rAF loop when scrolled off-screen (IntersectionObserver)
 *    and when the tab is hidden (visibilitychange)
 *  - caps particle count and devicePixelRatio
 * Disables itself under prefers-reduced-motion.
 */
export default function HeroParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let onScreen = true;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const mouse = { x: -9999, y: -9999 };

    const colorFor = () => (document.documentElement.classList.contains("dark") ? "16,185,129" : "242,125,33");
    let spriteColor = colorFor();

    function makeSprite(rgb: string) {
      const s = document.createElement("canvas");
      const size = 48;
      s.width = s.height = size;
      const sc = s.getContext("2d")!;
      const g = sc.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, `rgba(${rgb},0.85)`);
      g.addColorStop(0.4, `rgba(${rgb},0.32)`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      sc.fillStyle = g;
      sc.fillRect(0, 0, size, size);
      return s;
    }
    let sprite = makeSprite(spriteColor);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(55, (w * h) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.35,
        r: 2 + Math.random() * 6,
        a: 0.12 + Math.random() * 0.45,
      }));
    }

    function tick() {
      // refresh sprite if theme flipped
      const c = colorFor();
      if (c !== spriteColor) { spriteColor = c; sprite = makeSprite(c); }

      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 14000) {
          const f = (14000 - dist2) / 14000;
          const d = Math.sqrt(dist2) || 1;
          p.vx += (dx / d) * f * 0.6;
          p.vy += (dy / d) * f * 0.6;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy = p.vy * 0.99 - 0.004;

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx!.globalAlpha = p.a;
        ctx!.drawImage(sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (running || !onScreen || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(tick);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999; }
    function onVisibility() { if (document.hidden) stop(); else start(); }

    // Pause when the hero scrolls out of view
    const io = new IntersectionObserver(
      ([entry]) => { onScreen = entry.isIntersecting; if (onScreen) start(); else stop(); },
      { threshold: 0 }
    );
    io.observe(canvas);

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
