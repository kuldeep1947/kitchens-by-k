import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SpotlightCursor from "../ui/spotlight-cursor";
import PWAManager from "../ui/pwa-manager";
import CommandPalette from "../ui/command-palette";

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
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="glass-strong fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full text-saffron dark:text-emerald-400"
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
    <div className="overflow-x-clip">
      <SpotlightCursor />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <PWAManager />
      <CommandPalette />
    </div>
  );
}
