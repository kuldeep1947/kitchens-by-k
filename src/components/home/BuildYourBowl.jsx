import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import Reveal from "../shared/Reveal";
import NutritionRing from "../ui/nutrition-ring";

// Each ingredient: macros are per-serving (cal, protein p, carbs c, fat f).
const BASES = [
  { id: "quinoa", name: "Quinoa Pilaf", emoji: "🌾", cal: 220, p: 8, c: 39, f: 4 },
  { id: "rice", name: "Brown Rice", emoji: "🍚", cal: 215, p: 5, c: 45, f: 2 },
  { id: "millet", name: "Millet Khichdi", emoji: "🥣", cal: 200, p: 6, c: 38, f: 3 },
  { id: "greens", name: "Mixed Greens", emoji: "🥬", cal: 60, p: 3, c: 8, f: 1 },
];
const PROTEINS = [
  { id: "paneer", name: "Grilled Paneer", emoji: "🧀", cal: 260, p: 18, c: 6, f: 18 },
  { id: "tofu", name: "Tofu", emoji: "⬜", cal: 180, p: 15, c: 5, f: 11 },
  { id: "egg", name: "Egg White Bhurji", emoji: "🥚", cal: 120, p: 20, c: 3, f: 2 },
  { id: "soya", name: "Soya Chunks", emoji: "🫘", cal: 170, p: 25, c: 12, f: 2 },
  { id: "chickpea", name: "Roasted Chickpeas", emoji: "🟤", cal: 190, p: 11, c: 30, f: 4 },
];
const VEGGIES = [
  { id: "roast", name: "Roasted Veg", emoji: "🥕", cal: 70, p: 3, c: 12, f: 2 },
  { id: "broccoli", name: "Sautéed Greens", emoji: "🥦", cal: 45, p: 3, c: 6, f: 1 },
  { id: "beet", name: "Beetroot", emoji: "🍠", cal: 50, p: 2, c: 11, f: 0 },
  { id: "avocado", name: "Avocado", emoji: "🥑", cal: 120, p: 2, c: 6, f: 11 },
  { id: "corn", name: "Sweet Corn", emoji: "🌽", cal: 90, p: 3, c: 19, f: 1 },
];
const SAUCES = [
  { id: "tahini", name: "Lemon Tahini", emoji: "🥣", cal: 90, p: 3, c: 3, f: 8 },
  { id: "mint", name: "Mint Yogurt", emoji: "🥛", cal: 40, p: 3, c: 5, f: 1 },
  { id: "peanut", name: "Peanut Drizzle", emoji: "🥜", cal: 110, p: 5, c: 5, f: 9 },
  { id: "none", name: "No Sauce", emoji: "🚫", cal: 0, p: 0, c: 0, f: 0 },
];

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`relative rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
        active
          ? "border-transparent text-white"
          : "border-slate-200 bg-white/60 text-slate-600 hover:text-saffron dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
      }`}
    >
      {active && (
        <motion.span
          layoutId={`pill-${children}`}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          className="absolute inset-0 rounded-full bg-saffron shadow-lg shadow-saffron/30"
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function Group({ label, options, selected, onSelect, multi = false }) {
  const isSel = (id) => (multi ? selected.includes(id) : selected === id);
  return (
    <div>
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <Pill key={o.id} active={isSel(o.id)} onClick={() => onSelect(o.id)}>
            <span className="mr-1.5">{o.emoji}</span>{o.name}
          </Pill>
        ))}
      </div>
    </div>
  );
}

const DEFAULTS = { base: "quinoa", protein: "paneer", veggies: ["roast", "avocado"], sauce: "tahini" };

export default function BuildYourBowl() {
  const [base, setBase] = useState(DEFAULTS.base);
  const [protein, setProtein] = useState(DEFAULTS.protein);
  const [veggies, setVeggies] = useState(DEFAULTS.veggies);
  const [sauce, setSauce] = useState(DEFAULTS.sauce);

  const toggleVeg = (id) =>
    setVeggies((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

  // Resolve selected ingredient objects and total the macros.
  const picked = [
    BASES.find((b) => b.id === base),
    PROTEINS.find((p) => p.id === protein),
    ...VEGGIES.filter((v) => veggies.includes(v.id)),
    SAUCES.find((s) => s.id === sauce),
  ].filter(Boolean);

  const totals = picked.reduce(
    (acc, i) => ({ cal: acc.cal + i.cal, p: acc.p + i.p, c: acc.c + i.c, f: acc.f + i.f }),
    { cal: 0, p: 0, c: 0, f: 0 }
  );

  const bowlItems = picked.filter((i) => i.id !== "none");

  const reset = () => { setBase(DEFAULTS.base); setProtein(DEFAULTS.protein); setVeggies(DEFAULTS.veggies); setSauce(DEFAULTS.sauce); };

  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-saffron">Make It Yours</p>
        </Reveal>
        <Reveal custom={1}>
          <h2 className="mx-auto mt-4 mb-3 max-w-2xl text-center text-3xl font-extrabold tracking-tighter text-slate-900 dark:text-white md:text-5xl">
            Build your <span className="text-aurora">perfect bowl.</span>
          </h2>
        </Reveal>
        <Reveal custom={2}>
          <p className="mx-auto mb-12 max-w-lg text-center text-slate-500 dark:text-slate-400">
            Mix, match and watch the macros update live — every meal can be exactly what your body needs.
          </p>
        </Reveal>

        <Reveal custom={3}>
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Builder */}
            <div className="glass-strong rounded-3xl p-6 md:p-8 lg:col-span-3">
              <div className="space-y-6">
                <Group label="Base" options={BASES} selected={base} onSelect={setBase} />
                <Group label="Protein" options={PROTEINS} selected={protein} onSelect={setProtein} />
                <Group label="Veggies (add as many as you like)" options={VEGGIES} selected={veggies} onSelect={toggleVeg} multi />
                <Group label="Finish" options={SAUCES} selected={sauce} onSelect={setSauce} />
              </div>
              <button onClick={reset} className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-400 transition-colors hover:text-saffron">
                <RotateCcw size={13} /> Reset bowl
              </button>
            </div>

            {/* Live preview */}
            <div className="glass-strong flex flex-col items-center rounded-3xl p-6 md:p-8 lg:col-span-2 glow-ring">
              {/* Bowl */}
              <div className="relative mb-6 flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-saffron/15 to-emerald-400/15 ring-4 ring-white/40 dark:ring-white/5">
                <div className="flex max-w-[8rem] flex-wrap items-center justify-center gap-1">
                  <AnimatePresence mode="popLayout">
                    {bowlItems.map((i) => (
                      <motion.span
                        key={i.id}
                        layout
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 24 }}
                        className="text-3xl"
                      >
                        {i.emoji}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Calories */}
              <div className="text-center">
                <motion.p
                  key={totals.cal}
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-4xl font-extrabold text-slate-900 dark:text-white"
                >
                  {totals.cal}
                  <span className="ml-1 text-base font-semibold text-slate-400">kcal</span>
                </motion.p>
              </div>

              {/* Macro rings */}
              <div className="mt-5 flex items-center justify-center gap-5">
                <NutritionRing value={totals.p} max={60} sublabel={`${totals.p}g`} label="Protein" color="#3b82f6" size={64} />
                <NutritionRing value={totals.c} max={120} sublabel={`${totals.c}g`} label="Carbs" color="#f59e0b" size={64} />
                <NutritionRing value={totals.f} max={50} sublabel={`${totals.f}g`} label="Fat" color="#f43f5e" size={64} />
              </div>

              <Link
                to="/pricing"
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
              >
                <Sparkles size={15} /> Choose your plan
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
