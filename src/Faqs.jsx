import { useEffect } from "react";
import FAQ from "./components/home/FAQ";
import AskSection from "./components/home/AskSection";

export default function Faqs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 antialiased transition-colors duration-300 dark:bg-slate-950">
      <FAQ />
      <AskSection />
    </div>
  );
}
