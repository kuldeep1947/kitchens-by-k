"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Logo from "../shared/Logo";

/**
 * IntroSplash — a brief branded reveal on first visit of a session.
 * Shows once (sessionStorage), respects reduced-motion (instant skip).
 */
export default function IntroSplash() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("kbk_intro_seen")) return;
    sessionStorage.setItem("kbk_intro_seen", "1");
    if (reduce) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-50 dark:bg-slate-950"
        >
          <div className="aurora-mesh absolute -inset-[20%] opacity-60" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="glow-saffron rounded-3xl"
            >
              <Logo className="h-20 w-20" />
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 h-[3px] rounded-full bg-gradient-to-r from-saffron via-amber-400 to-emerald-400 dark:from-emerald-400 dark:to-teal-300"
            />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-slate-400"
            >
              Kitchens by K
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
