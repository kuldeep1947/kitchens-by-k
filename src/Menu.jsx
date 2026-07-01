import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Reveal from "./components/shared/Reveal";
import AuroraBackground from "./components/ui/aurora-background";
import TiltCard from "./components/ui/tilt-card";
import NutritionRing from "./components/ui/nutrition-ring";
import SmartImage from "./components/ui/smart-image";
import BuildYourBowl from "./components/home/BuildYourBowl";

const TAGS = {
  veg: { label: "Veg", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400" },
  "high-protein": { label: "High Protein", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400" },
  "gluten-free": { label: "Gluten Free", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400" },
  vegan: { label: "Vegan", color: "text-teal-600 bg-teal-50 dark:bg-teal-900/20 dark:text-teal-400" },
  light: { label: "Light", color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400" },
  spicy: { label: "Spicy", color: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400" },
};

const categories = [
  {
    id: "thali",
    name: "Executive Thali",
    desc: "A complete balanced meal — dal, sabzi, roti, rice, raita & dessert. Comfort food, elevated.",
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50 dark:bg-orange-900/10",
    border: "border-orange-200 dark:border-orange-800/30",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=500&fit=crop&q=80",
    items: [
      { name: "Punjabi Thali", desc: "Dal makhani, paneer butter masala, tandoori roti, jeera rice, raita & gulab jamun", cal: 720, protein: 28, carbs: 85, fat: 22, tags: ["veg", "spicy"] },
      { name: "South Indian Thali", desc: "Sambar, rasam, kootu, rice, papad, pickle & payasam", cal: 650, protein: 18, carbs: 90, fat: 14, tags: ["veg", "gluten-free"] },
      { name: "Gujarati Thali", desc: "Dal, kadhi, sabzi, roti, rice, farsan & shrikhand", cal: 680, protein: 20, carbs: 88, fat: 18, tags: ["veg"] },
      { name: "Rajasthani Thali", desc: "Dal baati churma, gatte ki sabzi, bajra roti & lassi", cal: 750, protein: 22, carbs: 92, fat: 24, tags: ["veg", "spicy"] },
    ],
  },
  {
    id: "protein",
    name: "High-Protein Bowl",
    desc: "Fuel your afternoon. Packed with plant protein, whole grains and fresh greens.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-900/10",
    border: "border-blue-200 dark:border-blue-800/30",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop&q=80",
    items: [
      { name: "Grilled Paneer Bowl", desc: "Grilled paneer tikka, quinoa pilaf, sautéed greens, beetroot hummus & tahini", cal: 580, protein: 38, carbs: 45, fat: 18, tags: ["veg", "high-protein", "gluten-free"] },
      { name: "Tofu & Tempeh Bowl", desc: "Marinated tofu, tempeh, brown rice, edamame, miso dressing", cal: 520, protein: 34, carbs: 48, fat: 14, tags: ["vegan", "high-protein", "gluten-free"] },
      { name: "Egg White & Chickpea Bowl", desc: "Egg white bhurji, roasted chickpeas, multigrain base, avocado & greens", cal: 490, protein: 42, carbs: 38, fat: 12, tags: ["high-protein", "gluten-free"] },
      { name: "Soya Chunks & Sprouts Bowl", desc: "Soya chunks curry, mixed sprouts, millet base, cucumber raita", cal: 510, protein: 36, carbs: 52, fat: 10, tags: ["veg", "high-protein", "vegan"] },
    ],
  },
  {
    id: "regional",
    name: "Regional Special",
    desc: "A culinary tour of India — rotating weekly menus celebrating regional cuisines.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/10",
    border: "border-emerald-200 dark:border-emerald-800/30",
    img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&h=500&fit=crop&q=80",
    items: [
      { name: "Hyderabadi Special", desc: "Dum biryani, mirchi ka salan, raita, papad & phirni", cal: 720, protein: 24, carbs: 95, fat: 20, tags: ["veg", "spicy"] },
      { name: "Bengali Special", desc: "Shorshe begun, cholar dal, luchi, mishti doi & sandesh", cal: 660, protein: 18, carbs: 88, fat: 16, tags: ["veg"] },
      { name: "Maharashtrian Special", desc: "Puran poli, varan bhaat, bharli vangi, koshimbir & sol kadhi", cal: 640, protein: 16, carbs: 90, fat: 14, tags: ["veg", "gluten-free"] },
      { name: "Kerala Special", desc: "Kerala sadya — avial, olan, thoran, sambar, rice & payasam", cal: 680, protein: 20, carbs: 92, fat: 16, tags: ["veg", "gluten-free"] },
    ],
  },
  {
    id: "light",
    name: "Light & Green",
    desc: "For when you want to eat clean. Fresh, seasonal and under 500 calories.",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-900/10",
    border: "border-purple-200 dark:border-purple-800/30",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop&q=80",
    items: [
      { name: "Mediterranean Bowl", desc: "Roasted pumpkin soup, grain bowl, multigrain sourdough, avocado & seasonal fruit", cal: 420, protein: 14, carbs: 52, fat: 16, tags: ["veg", "light", "vegan"] },
      { name: "Soup & Sandwich Combo", desc: "Tomato basil soup, whole wheat veggie sandwich & green detox juice", cal: 380, protein: 12, carbs: 48, fat: 10, tags: ["veg", "light"] },
      { name: "Veggie Poke Bowl", desc: "Sushi rice, edamame, cucumber, avocado, pickled ginger & ponzu", cal: 440, protein: 16, carbs: 58, fat: 12, tags: ["vegan", "light", "gluten-free"] },
      { name: "Smoothie Bowl & Granola", desc: "Acai smoothie base, seasonal fruits, granola, chia seeds & honey", cal: 390, protein: 10, carbs: 62, fat: 8, tags: ["veg", "light"] },
    ],
  },
];

function MealCard({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard max={5} className="h-full">
        <div className="glass-strong group h-full overflow-hidden rounded-2xl transition-shadow duration-300 hover:glow-ring">
          <button className="w-full text-left p-5" onClick={() => setOpen(!open)} aria-expanded={open}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span key={t} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${TAGS[t].color}`}>{TAGS[t].label}</span>
                  ))}
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 dark:text-white">{item.name}</h4>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="rounded-full bg-saffron/10 px-2.5 py-1 text-[12px] font-bold text-saffron">{item.cal} kcal</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} className="text-slate-400" />
                </motion.div>
              </div>
            </div>
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border-t border-slate-200/50 px-5 pb-6 pt-5 dark:border-slate-700/40">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Macros per serving</p>
                  <div className="flex items-center justify-around gap-2 text-blue-500 dark:text-emerald-400">
                    <span className="text-blue-500"><NutritionRing value={item.protein} max={50} sublabel={`${item.protein}g`} label="Protein" color="#3b82f6" /></span>
                    <NutritionRing value={item.carbs} max={120} sublabel={`${item.carbs}g`} label="Carbs" color="#f59e0b" />
                    <NutritionRing value={item.fat} max={40} sublabel={`${item.fat}g`} label="Fat" color="#f43f5e" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function CategorySection({ cat, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <Reveal custom={index} variants={undefined}>
      <div className={`overflow-hidden rounded-3xl border ${cat.border} glass`}>
        <button className="w-full text-left" onClick={() => setOpen(!open)} aria-expanded={open}>
          <div className="flex flex-col gap-0 md:flex-row md:items-stretch">
            <div className="group relative h-48 shrink-0 overflow-hidden md:h-auto md:w-72 md:min-h-[200px]">
              <SmartImage src={cat.img} alt={cat.name} className="absolute inset-0 h-full w-full" imgClassName="transition-transform duration-700 group-hover:scale-110" />
              <div className={`absolute inset-0 bg-gradient-to-tr ${cat.color} opacity-20 mix-blend-overlay`} />
            </div>
            <div className="flex flex-1 items-start justify-between gap-4 p-6 md:p-8">
              <div>
                <span className={`mb-2 inline-block bg-gradient-to-r bg-clip-text text-[11px] font-bold uppercase tracking-[0.2em] text-transparent ${cat.color}`}>
                  Category
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-3xl">{cat.name}</h3>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">{cat.desc}</p>
                <p className="mt-3 text-[12px] text-slate-400">{cat.items.length} variations available</p>
              </div>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="mt-1 shrink-0">
                <ChevronDown size={22} className="text-slate-400" />
              </motion.div>
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="grid gap-4 border-t border-slate-200/40 px-6 pb-8 pt-4 dark:border-slate-700/30 sm:grid-cols-2 md:px-8">
                {cat.items.map((item, i) => (
                  <MealCard key={item.name} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function MenuPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Veg", "Vegan", "High Protein", "Gluten Free", "Light", "Spicy"];
  const filterMap = { "Veg": "veg", "Vegan": "vegan", "High Protein": "high-protein", "Gluten Free": "gluten-free", "Light": "light", "Spicy": "spicy" };

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    items: activeFilter === "All" ? cat.items : cat.items.filter((item) => item.tags.includes(filterMap[activeFilter])),
  })).filter((cat) => cat.items.length > 0);

  const totalVariations = categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 antialiased transition-colors duration-300 dark:bg-slate-950">
      <section className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <AuroraBackground intensity="subtle" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link to="/" className="mb-8 inline-flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-saffron">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="glass mx-auto mb-6 w-fit rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-saffron glow-ring">
            Our Menu
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="font-extrabold leading-[0.95] tracking-tighter text-slate-900 dark:text-white" style={{ fontSize: "var(--text-display)" }}>
            Every meal, a
            <br />
            <span className="text-aurora">masterpiece.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">
            {categories.length} categories, {totalVariations} variations — all freshly prepared every morning.
          </motion.p>
        </div>
      </section>

      {/* Filter bar with sliding active indicator */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = activeFilter === f;
              return (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`relative rounded-full border px-5 py-2 text-[13px] font-semibold transition-colors ${
                    active ? "border-transparent text-white" : "border-slate-200 bg-white/60 text-slate-500 hover:text-saffron dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400"
                  }`}>
                  {active && (
                    <motion.span layoutId="menuFilterPill" transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-saffron shadow-lg shadow-saffron/30" />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-5xl space-y-6">
          {filteredCategories.length === 0 ? (
            <p className="py-20 text-center text-slate-400">No meals match this filter.</p>
          ) : (
            filteredCategories.map((cat, i) => <CategorySection key={cat.id} cat={cat} index={i} />)
          )}
        </div>
      </section>

      {/* Build Your Own */}
      <BuildYourBowl />
    </div>
  );
}
