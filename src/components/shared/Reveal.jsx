import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp } from "./reveal-variants";

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
