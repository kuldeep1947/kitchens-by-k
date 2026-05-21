import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "./components/home/Hero";
import FoodShowcase from "./components/home/FoodShowcase";
import HowItWorks from "./components/home/HowItWorks";
import MenuSection from "./components/home/MenuSection";
import PricingSection from "./components/home/PricingSection";
import Testimonials from "./components/home/Testimonials";
import SplineShowcase from "./components/home/SplineShowcase";
import AskSection from "./components/home/AskSection";

export default function App() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.replace("#", ""));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
  }, [hash]);

  return (
    <>
      <Hero />
      <FoodShowcase />
      <HowItWorks />
      <MenuSection />
      <PricingSection />
      <Testimonials />
      <SplineShowcase />
      <AskSection />
    </>
  );
}
