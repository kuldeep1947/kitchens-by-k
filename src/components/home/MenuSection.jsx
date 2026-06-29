import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal, { scaleIn } from "../shared/Reveal";
import SmartImage from "../ui/smart-image";

function MenuCard({ item, i, expanded, setExpanded, featured = false, flipLayout = false }) {
  return (
    <Reveal variants={scaleIn} custom={i}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded === i}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(expanded === i ? null : i); } }}
        className={`group glass rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer hover:glow-ring ${
          featured ? `flex flex-col md:h-[280px] ${flipLayout ? "md:flex-row-reverse" : "md:flex-row"}` : ""
        }`}
        onClick={() => setExpanded(expanded === i ? null : i)}
      >
        <div className={`overflow-hidden relative ${ featured ? "md:w-1/2 h-56 md:h-full" : "h-56" }`}>
          <SmartImage src={item.img} alt={item.name} className="absolute inset-0 w-full h-full" imgClassName="transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">{item.category}</span>
          </div>
          <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-[11px] font-medium text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full">
            <span className="hidden md:inline">Click</span><span className="md:hidden">Tap</span> to see contents
          </div>
        </div>
        <div className={`p-6 ${ featured ? "md:w-1/2 flex flex-col justify-center overflow-y-auto" : "" }`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.name}</h3>
            <span className="text-[12px] font-semibold text-saffron bg-saffron/5 px-2.5 py-1 rounded-full">{item.cal}</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[14px]">{item.desc}</p>
          <AnimatePresence>
            {expanded === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-saffron mb-3">What's inside</p>
                  <div className="grid grid-cols-2 gap-2">
                    {item.contents.map((c) => (
                      <div key={c} className="flex items-center gap-2 text-[13px] text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-emerald-500 shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}

const items = [
  { name: "Executive Thali", desc: "Dal, sabzi, roti, rice, raita & dessert", cal: "650 kcal", category: "Veg", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=500&fit=crop&q=80", contents: ["Toor Dal Tadka", "Seasonal Sabzi", "Tandoori Roti (3)", "Steamed Basmati Rice", "Fresh Boondi Raita", "Gulab Jamun"] },
  { name: "High-Protein Bowl", desc: "Grilled paneer, quinoa, greens & hummus", cal: "580 kcal", category: "High-Protein", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop&q=80", contents: ["Grilled Paneer Tikka", "Quinoa Pilaf", "Sautéed Greens", "Beetroot Hummus", "Roasted Chickpeas", "Lemon Tahini Drizzle"] },
  { name: "Regional Special", desc: "Rotating weekly menu from across India", cal: "600 kcal", category: "Veg", img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&h=500&fit=crop&q=80", contents: ["This Week: Hyderabadi Biryani", "Mirchi Ka Salan", "Raita", "Papad", "Gutti Vankaya", "Phirni"] },
  { name: "Light & Green", desc: "Seasonal salad, soup & multigrain bread", cal: "420 kcal", category: "Light", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&q=80", contents: ["Roasted Pumpkin Soup", "Mediterranean Grain Bowl", "Multigrain Sourdough", "Avocado Spread", "Seasonal Fruit", "Green Detox Juice"] },
];

const filters = ["All", "Veg", "High-Protein", "Light"];

export default function MenuSection() {
  const [expanded, setExpanded] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter);

  return (
    <section id="menu" className="py-32 md:py-40 px-6 relative">
      <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-saffron/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal><p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-saffron mb-4">The Menu</p></Reveal>
        <Reveal custom={1}>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
              Today&apos;s specials.<br /><span className="text-aurora">Always fresh.</span>
            </h2>
            <Link to="/menu">
              <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="hidden md:inline-flex items-center gap-2 text-[13px] font-semibold text-saffron hover:text-amber-600 transition-colors cursor-pointer">
                View Full Menu <ArrowRight size={15} />
              </motion.span>
            </Link>
          </div>
        </Reveal>

        <Reveal custom={2}>
          <div className="flex gap-2 mb-6 flex-wrap">
            {filters.map((f) => {
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => { setActiveFilter(f); setExpanded(null); }}
                  className={`relative px-5 py-2 rounded-full text-[13px] font-semibold border transition-colors ${
                    active
                      ? "border-transparent text-white"
                      : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-saffron hover:text-saffron"
                  }`}
                >
                  {active && (
                    <motion.span layoutId="homeMenuFilterPill" transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-saffron shadow-lg shadow-saffron/30" />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              );
            })}
          </div>
          <div className="md:hidden mb-8">
            <Link to="/menu" className="inline-flex items-center gap-2 text-[13px] font-semibold text-saffron hover:text-amber-600 transition-colors">
              View Full Menu <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length === 0 ? (
              <p className="text-slate-400 text-center py-16">No items in this category.</p>
            ) : filtered.length === 1 ? (
              <MenuCard item={filtered[0]} i={0} expanded={expanded} setExpanded={setExpanded} featured />
            ) : (
              <div className="grid gap-5">
                <MenuCard item={filtered[0]} i={0} expanded={expanded} setExpanded={setExpanded} featured />
                <div className={`grid gap-5 ${ filtered.length - 1 === 1 ? "grid-cols-1" : filtered.length - 1 === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3" }`}>
                  {filtered.slice(1).map((item, i) => (
                    <MenuCard key={item.name} item={item} i={i + 1} expanded={expanded} setExpanded={setExpanded} featured={filtered.length - 1 === 1} flipLayout={filtered.length - 1 === 1} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
