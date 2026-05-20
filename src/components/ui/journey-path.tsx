"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface JourneyPathProps {
  steps: Step[];
}

function StepCard({
  step,
  index,
  total,
}: {
  step: Step;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const Icon = step.icon;
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-6 md:gap-10 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-1 md:max-w-[280px] order-2 md:order-none"
      >
        <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-orange-200 dark:hover:border-emerald-700/50 transition-all duration-300 group">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-600 dark:text-emerald-400">
            Step {index + 1}
          </span>
          <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-emerald-300 transition-colors">
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Center node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
        className="relative z-10 shrink-0 order-1 md:order-none"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-orange-400/20 dark:bg-emerald-400/20 blur-xl scale-150 pointer-events-none" />
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 dark:from-emerald-500 dark:to-emerald-700 flex items-center justify-center shadow-lg shadow-orange-500/30 dark:shadow-emerald-500/30 ring-4 ring-white dark:ring-slate-900 relative">
          <Icon size={20} className="text-white" />
        </div>
        {/* Ping on appear */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={isInView ? { scale: 2, opacity: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="absolute inset-0 rounded-full bg-orange-400/30 dark:bg-emerald-400/30"
        />
      </motion.div>

      {/* Spacer for alternating layout on desktop */}
      <div className="hidden md:block flex-1 md:max-w-[280px]" />
    </div>
  );
}

export default function JourneyPath({ steps }: JourneyPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll to path draw progress
  const pathProgress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);
  // Dot position along the path
  const dotY = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);
  const dotOpacity = useTransform(scrollYProgress, [0.08, 0.15, 0.8, 0.88], [0, 1, 1, 0]);

  return (
    <section
      id="how"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] bg-orange-100/40 dark:bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[250px] h-[250px] bg-orange-100/30 dark:bg-emerald-800/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 md:mb-20 px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-emerald-400 mb-3"
        >
          How It Works
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
        >
          From signup to your desk
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-slate-500 dark:text-slate-400 max-w-md mx-auto"
        >
          Five simple steps to daily restaurant-quality meals at your office
        </motion.p>
      </div>

      {/* Journey content */}
      <div className="relative max-w-2xl mx-auto px-6">
        {/* Vertical path line (background) */}
        <div className="absolute left-[48px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700/50" />

        {/* Animated drawn path */}
        <motion.div
          ref={pathRef}
          style={{ scaleY: pathProgress, transformOrigin: "top" }}
          className="absolute left-[48px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 dark:from-emerald-400 dark:via-emerald-500 dark:to-emerald-600"
        />

        {/* Traveling dot */}
        <motion.div
          style={{ top: dotY, opacity: dotOpacity }}
          className="absolute left-[42px] md:left-1/2 md:-translate-x-[7px] w-[14px] h-[14px] rounded-full bg-orange-500 dark:bg-emerald-500 shadow-lg shadow-orange-500/40 dark:shadow-emerald-500/40 z-20 border-2 border-white dark:border-slate-900"
        />

        {/* Steps */}
        <div className="relative flex flex-col gap-3 md:gap-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              total={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
