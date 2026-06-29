import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PromptInput } from "../ui/ai-chat-input";
import Reveal from "../shared/Reveal";

const quickResponses = {
  "View this week's menu": "This week we're serving: Mon — Punjabi Thali, Tue — Grilled Paneer Bowl, Wed — Hyderabadi Biryani Special, Thu — Mediterranean Bowl, Fri — South Indian Thali. All freshly prepared every morning! 🍱",
  "Pricing for 50+ employees": "For teams of 50+, our Enterprise plan offers custom pricing, dedicated chef allocation, and a free on-site tasting session before launch. Drop us an email at hello@kitchensbyk.com and we'll get back within 24 hours with a tailored quote! 📋",
  "Delivery areas": "We currently deliver across Mumbai — BKC, Andheri, Powai, Lower Parel, Nariman Point, Goregaon, Malad, and more. If your area isn't listed, reach out and we'll check feasibility! 🚚",
  "Share feedback": "We'd love to hear from you! You can reach us at hello@kitchensbyk.com or WhatsApp us at +91 98765 43210. Your feedback helps us serve you better every day. 💬",
};

const FALLBACK = "Thanks for your question! Our team will get back to you shortly at hello@kitchensbyk.com 😊";

export default function AskSection() {
  const [inputValue, setInputValue] = useState("");
  const [asked, setAsked] = useState("");
  const [full, setFull] = useState("");
  const [shown, setShown] = useState("");
  const [thinking, setThinking] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const ask = (value) => {
    clearTimers();
    setAsked(value);
    setShown("");
    setFull("");
    setThinking(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const answer = quickResponses[value] || FALLBACK;
    timers.current.push(setTimeout(() => {
      setThinking(false);
      setFull(reduce ? answer : "");
      if (reduce) setShown(answer);
      else setFull(answer);
    }, 700));
  };

  // Stream the answer in character-by-character
  useEffect(() => {
    if (!full) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(full); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setShown(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [full]);

  useEffect(() => () => clearTimers(), []);

  const handleSubmit = (value) => { setInputValue(""); ask(value); };
  const handleQuickAction = (q) => ask(q);

  return (
    <section className="py-20 md:py-28 px-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="aurora-mesh absolute left-1/2 top-[10%] h-[420px] w-[680px] -translate-x-1/2 opacity-30" aria-hidden="true" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <Reveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-saffron mb-4">
            <Sparkles size={13} /> AI Concierge
          </span>
        </Reveal>
        <Reveal custom={1}>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-4">
            Have a <span className="text-aurora">question?</span>
          </h2>
        </Reveal>
        <Reveal custom={2}>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg mx-auto">
            Ask about our menus, pricing, delivery areas, or anything else. Our assistant is here to help.
          </p>
        </Reveal>
        <Reveal custom={3}>
          <PromptInput
            placeholder="Ask about menus, pricing, delivery..."
            onSubmit={handleSubmit}
            externalValue={inputValue}
          />
        </Reveal>

        <AnimatePresence mode="wait">
          {(thinking || shown) && (
            <motion.div
              key={asked}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="glass-strong mt-4 max-w-2xl mx-auto rounded-2xl px-5 py-4 text-left glow-ring"
            >
              {asked && <p className="mb-3 text-[13px] font-medium text-slate-400">You asked: “{asked}”</p>}
              <p className="text-[11px] font-semibold uppercase tracking-wider text-saffron mb-2 flex items-center gap-1.5">
                <Sparkles size={12} /> Kitchens by K
              </p>
              {thinking ? (
                <div className="flex items-center gap-1.5 py-1" aria-label="Thinking">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-saffron"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {shown}
                  {shown.length < full.length && <span className="ml-0.5 inline-block h-4 w-[2px] -mb-0.5 animate-pulse bg-saffron" />}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal custom={4}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-slate-400 dark:text-slate-500">Quick actions:</span>
            {Object.keys(quickResponses).map((q) => (
              <button
                key={q}
                onClick={() => handleQuickAction(q)}
                className="glass text-xs px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-saffron hover:glow-ring transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
