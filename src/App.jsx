import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Hero from "./components/home/Hero";
import FoodShowcase from "./components/home/FoodShowcase";
import HowItWorks from "./components/home/HowItWorks";
import MenuSection from "./components/home/MenuSection";
import Testimonials from "./components/home/Testimonials";
import SplineShowcase from "./components/home/SplineShowcase";

// Ambient aurora orbs that drift on scroll — adds depth behind the whole page.
function AmbientDepth() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ y: reduce ? 0 : y1, willChange: "transform" }}
        className="absolute left-[-10%] top-[30%] h-[520px] w-[520px] rounded-full bg-saffron/[0.07] blur-[90px] dark:bg-emerald-500/[0.07]"
      />
      <motion.div
        style={{ y: reduce ? 0 : y2, willChange: "transform" }}
        className="absolute right-[-8%] top-[60%] h-[460px] w-[460px] rounded-full bg-amber-300/[0.08] blur-[90px] dark:bg-teal-500/[0.06]"
      />
    </div>
  );
}

export default function App() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.replace("#", ""));
    if (el) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setTimeout(() => el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }), 100);
    }
  }, [hash]);

  return (
    <>
      <AmbientDepth />
      <Hero />
      <FoodShowcase />
      <HowItWorks />
      <MenuSection />
      <Testimonials />
      <SplineShowcase />
    </>
  );
}
