"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SmartImage from "./smart-image";

export interface Dish {
  title: string;
  caption: string;
  label: string;
  img: string;
}

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <div className="group relative h-[80vh] w-[80vw] shrink-0 overflow-hidden rounded-[2rem] sm:w-[58vw] lg:w-[42vw]">
      <SmartImage src={dish.img} alt={dish.title} className="absolute inset-0 h-full w-full" imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      {/* big ghost index */}
      <span className="absolute right-5 top-3 text-[6rem] font-black leading-none text-white/10 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
        <span className="glass mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          {dish.label}
        </span>
        <h3 className="whitespace-pre-line text-2xl font-extrabold leading-[1.05] tracking-tight text-white md:text-4xl">{dish.title}</h3>
        <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/70 md:text-[15px]">{dish.caption}</p>
      </div>
    </div>
  );
}

function IntroPanel({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="flex h-[80vh] w-[80vw] shrink-0 flex-col justify-center sm:w-[52vw] lg:w-[36vw]">
      <span className="glass mb-5 w-fit rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-saffron glow-ring">
        {eyebrow}
      </span>
      <h2 className="text-4xl font-extrabold leading-[0.95] tracking-tighter text-slate-900 dark:text-white md:text-6xl">
        {title.split("|").map((t, i) => (
          <span key={i} className={i === 1 ? "text-aurora text-glow block" : "block"}>{t.trim()}</span>
        ))}
      </h2>
      <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-500 dark:text-slate-400">{subtitle}</p>
      <div className="mt-7 flex items-center gap-2 text-[13px] font-semibold text-saffron">
        Scroll to explore <ArrowRight size={15} className="animate-pulse" />
      </div>
    </div>
  );
}

function CtaPanel() {
  return (
    <div className="flex h-[80vh] w-[78vw] shrink-0 items-center justify-center sm:w-[44vw] lg:w-[32vw]">
      <div className="glass-strong flex h-full w-full flex-col items-center justify-center gap-5 rounded-[2rem] p-8 text-center glow-ring">
        <span className="text-5xl">🍱</span>
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-3xl">Sixteen dishes.<br />Zero compromises.</h3>
        <p className="max-w-xs text-[14px] text-slate-500 dark:text-slate-400">A new menu every week, crafted fresh each morning.</p>
        <a href="#menu" className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-900">
          See the full menu <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}

export default function ScrollGallery({
  dishes,
  eyebrow = "Fresh Every Day",
  title = "Restaurant quality.|Office delivered.",
  subtitle = "Prepared fresh each morning by our chefs. No reheating, no compromises — just real food, on time.",
}: {
  dishes: Dish[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // Bind progress exactly to the pinned range so the horizontal travel starts
  // when the section pins and ends when it un-pins — no dead scroll afterwards.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(xRaw, { stiffness: 110, damping: 30, mass: 0.5 });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30 });

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    calc();
    const t = setTimeout(calc, 500); // re-measure after layout/images settle
    window.addEventListener("resize", calc);
    return () => { window.removeEventListener("resize", calc); clearTimeout(t); };
  }, [dishes]);

  // Reduced-motion / no-pin fallback: a clean horizontal snap scroller.
  if (reduce) {
    return (
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-saffron">{eyebrow}</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tighter text-slate-900 dark:text-white md:text-5xl">
            {title.replace("|", " ")}
          </h2>
          <div className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {dishes.map((d, i) => (
              <div key={d.title} className="snap-center">
                <DishCard dish={d} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Pinned horizontal-scroll. Section height controls scroll speed; kept tight
  // so there's no empty scroll once the track reaches its end.
  const sectionVh = 90 + dishes.length * 38;

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${sectionVh}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ scaleX: progress }} className="absolute left-0 right-0 top-0 z-20 h-1 origin-left bg-gradient-to-r from-saffron via-amber-400 to-emerald-400 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-500" />
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-7 pl-[8vw] pr-[8vw] will-change-transform">
          <IntroPanel eyebrow={eyebrow} title={title} subtitle={subtitle} />
          {dishes.map((d, i) => (
            <DishCard key={d.title} dish={d} index={i} />
          ))}
          <CtaPanel />
        </motion.div>
      </div>
    </section>
  );
}
