import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Shared easing — mirrors the --ease-out-quint token in index.css
const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: EASE },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.7, ease: EASE },
  }),
};

export const blurUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.9, ease: EASE },
  }),
};

export const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: EASE },
  }),
};

// Stagger container — pair with the `child` variants on each item
export const stagger = {
  hidden: {},
  visible: (i = 0) => ({
    transition: { delayChildren: i * 0.1, staggerChildren: 0.08 },
  }),
};

export default function Reveal({ children, variants: v = fadeUp, custom = 0, className = "", amount = 0.15 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const reduce = useReducedMotion();

  // Under reduced-motion, render content immediately with no transform.
  if (reduce) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={v} custom={custom} className={className}>
      {children}
    </motion.div>
  );
}
