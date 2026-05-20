import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Hero from "./components/home/Hero";
import FoodShowcase from "./components/home/FoodShowcase";
import HowItWorks from "./components/home/HowItWorks";
import MenuSection from "./components/home/MenuSection";
import PricingSection from "./components/home/PricingSection";
import Testimonials from "./components/home/Testimonials";
import SplineShowcase from "./components/home/SplineShowcase";
import AskSection from "./components/home/AskSection";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden antialiased transition-colors duration-300">
      <Navbar />
      <Hero />
      <FoodShowcase />
      <HowItWorks />
      <MenuSection />
      <PricingSection />
      <Testimonials />
      <SplineShowcase />
      <AskSection />
      <Footer />
    </div>
  );
}
