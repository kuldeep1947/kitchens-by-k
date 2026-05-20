import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Phone, Mail } from "lucide-react";
import { AnimatedThemeToggler } from "./components/ui/animated-theme-toggler";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, custom = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} custom={custom} className={className}>
      {children}
    </motion.div>
  );
}

function Logo({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoBg2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#064E3B"/><stop offset="100%" stopColor="#1E293B"/>
        </linearGradient>
        <linearGradient id="leafGrad2" x1="24" y1="6" x2="32" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399"/><stop offset="100%" stopColor="#059669"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#logoBg2)"/>
      <path d="M12 29V11h3.2v7.4l7.2-7.4h4l-7.4 7.6L26.6 29h-4l-5.2-7.6-2.2 2.3V29H12z" fill="white" opacity="0.95"/>
      <path d="M28 7c3.5 2 5 5.5 4 9-1.5-1-3.5-1.5-5.5-.8 0-3.2 0.5-5.8 1.5-8.2z" fill="url(#leafGrad2)" opacity="0.9"/>
      <path d="M28.5 7.5c0 0 1 3.5 0.5 6.5" stroke="#6EE7B7" strokeWidth="0.6" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

function MenuNavbar() {
  return (
    <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-lg rounded-2xl px-6 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo className="w-8 h-8" />
          <span className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">Kitchens by K</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
          <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
          <Link to="/menu" className="text-slate-900 dark:text-white font-semibold">Menu</Link>
          <Link to="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-3">
          <AnimatedThemeToggler />
          <Link to="/#pricing">
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              className="bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors dark:bg-white dark:text-slate-900 cursor-pointer block">
              Get Started
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

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

function NutritionBar({ label, value, max, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-slate-400 w-14 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((value / max) * 100, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 w-8 text-right">{value}g</span>
    </div>
  );
}

function MealCard({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <button className="w-full text-left p-5" onClick={() => setOpen(!open)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {item.tags.map((t) => (
                <span key={t} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TAGS[t].color}`}>{TAGS[t].label}</span>
              ))}
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-[15px]">{item.name}</h4>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-[13px] font-bold text-saffron">{item.cal} kcal</span>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} className="text-slate-400" />
            </motion.div>
          </div>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700/50 pt-4 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Nutrition per serving</p>
              <NutritionBar label="Protein" value={item.protein} max={50} color="bg-blue-400" />
              <NutritionBar label="Carbs" value={item.carbs} max={120} color="bg-amber-400" />
              <NutritionBar label="Fat" value={item.fat} max={40} color="bg-rose-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CategorySection({ cat, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <Reveal custom={index}>
      <div className={`rounded-3xl border ${cat.border} ${cat.bg} overflow-hidden`}>
        {/* Category header */}
        <button className="w-full text-left" onClick={() => setOpen(!open)}>
          <div className="flex flex-col md:flex-row md:items-center gap-0">
            <div className="md:w-72 h-48 md:h-auto overflow-hidden shrink-0">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-6 md:p-8 flex items-start justify-between gap-4">
              <div>
                <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${cat.color} text-[11px] font-bold uppercase tracking-[0.2em] mb-2`}>
                  Category
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{cat.name}</h3>
                <p className="text-[14px] text-slate-500 dark:text-slate-400 mt-2 max-w-md leading-relaxed">{cat.desc}</p>
                <p className="text-[12px] text-slate-400 mt-3">{cat.items.length} variations available</p>
              </div>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 mt-1">
                <ChevronDown size={22} className="text-slate-400" />
              </motion.div>
            </div>
          </div>
        </button>

        {/* Sub items */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 pt-2 grid sm:grid-cols-2 gap-4 border-t border-slate-200/50 dark:border-slate-700/30">
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden antialiased transition-colors duration-300">
      <MenuNavbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-[10%] w-[600px] h-[500px] bg-saffron/[0.06] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-[5%] w-[400px] h-[400px] bg-emerald-200/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-[13px] text-slate-400 hover:text-slate-600 transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[12px] font-semibold tracking-[0.15em] uppercase text-saffron mb-6">
            Our Menu
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-[4.5rem] font-extrabold leading-[0.95] tracking-tighter text-slate-900 dark:text-white">
            Every meal, a
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-amber-500 to-emerald-500">masterpiece.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            4 categories, 16 variations — all freshly prepared every morning.
          </motion.p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold border transition-all ${
                  activeFilter === f
                    ? "bg-saffron text-white border-saffron shadow-lg shadow-saffron/20"
                    : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-saffron hover:text-saffron bg-white dark:bg-slate-800/50"
                }`}>
                {f}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto space-y-6">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-slate-400 py-20">No meals match this filter.</p>
          ) : (
            filteredCategories.map((cat, i) => <CategorySection key={cat.id} cat={cat} index={i} />)
          )}
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-8 px-6 rounded-t-[2rem]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="w-7 h-7" />
            <span className="font-bold text-[14px]">Kitchens by K</span>
          </Link>
          <div className="flex flex-col sm:flex-row gap-4 text-[13px] text-slate-400">
            <span className="flex items-center gap-2"><Phone size={13} className="text-saffron/50" /> +91 98765 43210</span>
            <span className="flex items-center gap-2"><Mail size={13} className="text-saffron/50" /> hello@kitchensbyk.com</span>
          </div>
          <p className="text-[12px] text-slate-600">2026 &copy; Kitchens by K&trade;. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
