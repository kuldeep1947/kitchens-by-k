/**
 * Adaptive performance guard — fully automatic, no user input.
 *
 * Continuously samples the real frame rate (per second) during the first ~14s
 * of use, INCLUDING while scrolling. If the device sustains a low frame rate it
 * switches to a `lite` class on <html> and remembers it (localStorage) so future
 * visits apply it synchronously before paint (see the inline script in index.html).
 *
 * CSS + a few components react to `.lite` by dropping the heaviest effects
 * (backdrop blur, aurora animation, particle canvas, cursor glow, blur orbs).
 * Capable machines / ProMotion phones keep the full experience.
 *
 * It only ever downgrades (never re-enables heavy effects mid-session) to avoid
 * flicker/flapping. A device remembered as "fine" still re-measures each visit.
 */
export function initPerfGuard() {
  if (typeof window === "undefined") return;

  // Reduced-motion users are handled globally; treat as lite too.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("lite");
    return;
  }
  // Already lite (remembered from a previous visit) — nothing to measure.
  if (document.documentElement.classList.contains("lite")) return;

  const GRACE_MS = 1000;          // ignore initial mount/route-transition cost
  const MAX_MS = 14000;           // stop watching after this; assume the device is fine
  const MIN_FPS = 55;             // a 60Hz display dropping below this = visibly not smooth
  const BAD_SECONDS_TRIGGER = 3;  // consecutive low-FPS seconds → switch to lite

  let raf = 0;
  let started = 0;
  let secStart = 0;
  let secFrames = 0;
  let badSeconds = 0;

  const stop = () => cancelAnimationFrame(raf);

  const goLite = () => {
    document.documentElement.classList.add("lite");
    try { localStorage.setItem("kbk_lite", "1"); } catch { /* ignore */ }
    stop();
  };
  const markFine = () => {
    try { localStorage.setItem("kbk_lite", "0"); } catch { /* ignore */ }
    stop();
  };

  const tick = (now) => {
    if (!started) { started = secStart = now; raf = requestAnimationFrame(tick); return; }

    const total = now - started;
    if (total < GRACE_MS) { secStart = now; secFrames = 0; raf = requestAnimationFrame(tick); return; }

    secFrames++;
    const secElapsed = now - secStart;
    if (secElapsed >= 1000) {
      const fps = (secFrames / secElapsed) * 1000;
      if (fps < MIN_FPS) {
        badSeconds++;
        if (badSeconds >= BAD_SECONDS_TRIGGER) { goLite(); return; }
      } else {
        badSeconds = 0; // require *consecutive* bad seconds, so a one-off hiccup is ignored
      }
      secStart = now;
      secFrames = 0;
    }

    if (total >= MAX_MS) { markFine(); return; }
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  window.addEventListener("pagehide", stop, { once: true });
}

export function isLite() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("lite");
}
