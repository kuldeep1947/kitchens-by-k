import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollRevealText({ text }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end center"],
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="flex flex-wrap gap-x-3 gap-y-2 text-4xl md:text-6xl font-black tracking-tight leading-tight">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        const color = useTransform(scrollYProgress, [start, end], ["#64748b", "#F27D21"]);
        return (
          <motion.span key={i} style={{ opacity, color }} className="will-change-[opacity,color]">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}
