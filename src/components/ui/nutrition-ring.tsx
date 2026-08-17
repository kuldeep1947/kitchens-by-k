"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * NutritionRing — animated SVG progress ring for macro/calorie data-viz.
 * Draws on scroll into view. Pure SVG, no deps. Reduced-motion safe.
 */
export default function NutritionRing({
  value,
  max = 100,
  label,
  sublabel,
  size = 72,
  stroke = 7,
  color = "currentColor",
}: {
  value: number;
  max?: number;
  label?: string;
  sublabel?: string;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  const offset = c * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            className="stroke-slate-200/70 dark:stroke-slate-700/60"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: reduce ? offset : c }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: "drop-shadow(0 0 6px rgb(var(--glow) / 0.4))" }}
          />
        </svg>
        {sublabel && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-800 dark:text-slate-100">
            {sublabel}
          </span>
        )}
      </div>
      {label && (
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
}
