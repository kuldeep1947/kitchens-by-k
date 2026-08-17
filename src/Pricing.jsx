import { useEffect } from "react";
import { Pricing1 } from "./components/ui/pricing-1";

export default function Pricing() {
  useEffect(() => {
    // Don't override the resume-from-signin flow that auto-opens the modal.
    if (!localStorage.getItem("kbk_pending_plan")) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 antialiased transition-colors duration-300 dark:bg-slate-950">
      <Pricing1 />
    </div>
  );
}
