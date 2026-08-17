import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Spotlight } from "../ui/spotlight";
import SmartImage from "../ui/smart-image";
import CountUp from "../ui/count-up";
import { Magnetic } from "../ui/magnetic";

function FloatingEmojis() {
  const emojis = [
    { emoji: "🍱", x: "10%", duration: 4, delay: 0 },
    { emoji: "🥗", x: "25%", duration: 5, delay: 0.5 },
    { emoji: "🍛", x: "45%", duration: 4.5, delay: 0.2 },
    { emoji: "🥘", x: "65%", duration: 5.5, delay: 0.8 },
    { emoji: "🍜", x: "80%", duration: 4, delay: 0.3 },
    { emoji: "🥙", x: "90%", duration: 5, delay: 0.1 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {emojis.map((e, i) => (
        <motion.span
          key={i}
          className="absolute text-4xl select-none"
          style={{ left: e.x, bottom: "-10%" }}
          animate={{ y: ["-10%", "-110%"], rotate: [0, 15, -15, 0], opacity: [0, 0.4, 0.4, 0] }}
          transition={{ duration: e.duration, delay: e.delay, repeat: Infinity, ease: "linear" }}
        >
          {e.emoji}
        </motion.span>
      ))}
    </div>
  );
}

export default function SplineShowcase() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="w-full rounded-3xl relative overflow-hidden border border-slate-800/50 bg-slate-900 glow-ring">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(5, 150, 105, 0.25)" />
          <FloatingEmojis />
          <div className="flex flex-col md:flex-row min-h-[420px]">
            <div className="flex-1 p-10 md:p-14 relative z-10 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-saffron mb-6 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                Limited Spots Available
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Your Team Deserves<br /><span className="text-aurora">Better Lunch.</span>
              </h2>
              <p className="mt-5 text-slate-400 max-w-md leading-relaxed text-[15px]">
                Join Mumbai&apos;s top companies — from startups to MNCs — who&apos;ve made the switch to chef-crafted daily meals. No more sad desk lunches.
              </p>
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-extrabold text-white"><CountUp value={50} suffix="+" /></p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">Companies served</p>
                </div>
                <div className="h-8 w-px bg-slate-700" />
                <div>
                  <p className="text-2xl font-extrabold text-white"><CountUp value={12000} suffix="+" /></p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">Meals / week</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Magnetic strength={0.3}>
                  <motion.a href="mailto:hello@kitchensbyk.com" whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-dark text-white font-semibold px-7 py-3.5 rounded-2xl text-[14px] shadow-lg shadow-saffron/20 transition-colors w-fit">
                    Book a Tasting <ArrowRight size={16} />
                  </motion.a>
                </Magnetic>
                <a href="tel:+919876543210" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium px-4 py-3.5 text-[14px] transition-colors">
                  <Phone size={15} /> Or call us
                </a>
              </div>
            </div>
            <div className="flex-1 relative min-h-[280px] md:min-h-0">
              <SmartImage
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&q=80"
                alt="Fresh gourmet food spread"
                className="absolute inset-0 w-full h-full"
                imgClassName="opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
