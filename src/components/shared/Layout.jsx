import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 text-saffron dark:text-emerald-500 hover:text-saffron-dark dark:hover:text-emerald-400 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Layout() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
