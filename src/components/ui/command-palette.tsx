"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, UtensilsCrossed, CreditCard, Info, HelpCircle, User, Sparkles, SunMoon, CornerDownLeft } from "lucide-react";

/**
 * CommandPalette — ⌘K / Ctrl+K quick-nav & actions overlay.
 * Also opens on a `open-command-palette` window event (fired by the navbar button).
 * Full keyboard support: type to filter, ↑/↓ to move, Enter to run, Esc to close.
 */
export default function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(
    () => [
      { id: "home", label: "Home", hint: "Go to the homepage", icon: Home, keywords: "home landing start", run: () => navigate("/") },
      { id: "menu", label: "Menu", hint: "Browse the full menu", icon: UtensilsCrossed, keywords: "menu food dishes meals thali bowl", run: () => navigate("/menu") },
      { id: "bowl", label: "Build Your Own Bowl", hint: "Customize a meal & see macros", icon: Sparkles, keywords: "build bowl custom create macros nutrition", run: () => navigate("/menu") },
      { id: "pricing", label: "Pricing", hint: "See plans & subscribe", icon: CreditCard, keywords: "pricing plans cost subscribe weekly monthly enterprise", run: () => navigate("/pricing") },
      { id: "about", label: "About", hint: "Our story & founders", icon: Info, keywords: "about story team founders", run: () => navigate("/about") },
      { id: "faqs", label: "FAQs", hint: "Questions & AI concierge", icon: HelpCircle, keywords: "faq help support questions ai concierge", run: () => navigate("/faqs") },
      { id: "profile", label: "Profile", hint: "Your account & plan", icon: User, keywords: "profile account plan settings addresses", run: () => navigate("/profile") },
      { id: "theme", label: "Toggle theme", hint: "Switch light / dark mode", icon: SunMoon, keywords: "theme dark light mode toggle appearance", run: () => window.dispatchEvent(new Event("kbk-toggle-theme")) },
    ],
    [navigate]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + " " + c.keywords).toLowerCase().includes(q));
  }, [query, commands]);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-command-palette", onOpen); };
  }, []);

  // Reset + focus + scroll-lock while open
  useEffect(() => {
    if (open) {
      setQuery(""); setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { clearTimeout(t); document.body.style.overflow = prev; };
    }
  }, [open]);

  useEffect(() => { setActive(0); }, [query]);

  const run = (cmd) => { setOpen(false); cmd.run(); };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (filtered[active]) run(filtered[active]); }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-start justify-center bg-black/50 p-4 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or jump to…"
                aria-label="Search commands"
                className="w-full bg-transparent py-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
              />
              <kbd className="hidden rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:bg-slate-800 sm:block">ESC</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-slate-400">No results for “{query}”.</p>
              ) : (
                filtered.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.id}
                      onClick={() => run(c)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        i === active ? "bg-saffron/10" : ""
                      }`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${i === active ? "bg-saffron/15 text-saffron" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[14px] font-semibold ${i === active ? "text-saffron" : "text-slate-700 dark:text-slate-200"}`}>{c.label}</span>
                        <span className="block truncate text-[12px] text-slate-400">{c.hint}</span>
                      </span>
                      {i === active && <CornerDownLeft size={14} className="shrink-0 text-saffron" />}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
