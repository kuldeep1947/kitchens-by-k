import { useState } from "react";
import { motion } from "framer-motion";
import { PromptInput } from "../ui/ai-chat-input";
import Reveal from "../shared/Reveal";

const quickResponses = {
  "View this week's menu": "This week we're serving: Mon — Punjabi Thali, Tue — Grilled Paneer Bowl, Wed — Hyderabadi Biryani Special, Thu — Mediterranean Bowl, Fri — South Indian Thali. All freshly prepared every morning! 🍱",
  "Pricing for 50+ employees": "For teams of 50+, our Enterprise plan offers custom pricing, dedicated chef allocation, and a free on-site tasting session before launch. Drop us an email at hello@kitchensbyk.com and we'll get back within 24 hours with a tailored quote! 📋",
  "Delivery areas": "We currently deliver across Mumbai — BKC, Andheri, Powai, Lower Parel, Nariman Point, Goregaon, Malad, and more. If your area isn't listed, reach out and we'll check feasibility! 🚚",
  "Share feedback": "We'd love to hear from you! You can reach us at hello@kitchensbyk.com or WhatsApp us at +91 98765 43210. Your feedback helps us serve you better every day. 💬",
};

export default function AskSection() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (value) => {
    const res = quickResponses[value];
    setResponse(res || "Thanks for your question! Our team will get back to you shortly at hello@kitchensbyk.com 😊");
    setInputValue("");
  };

  const handleQuickAction = (q) => {
    setInputValue(q);
    setResponse("");
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] bg-orange-200/[0.08] dark:bg-emerald-900/[0.1] rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-saffron mb-4">AI Concierge</p>
        </Reveal>
        <Reveal custom={1}>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-4">
            Have a question?
          </h2>
        </Reveal>
        <Reveal custom={2}>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg mx-auto">
            Ask about our menus, pricing, delivery areas, or anything else. Our AI assistant is here to help.
          </p>
        </Reveal>
        <Reveal custom={3}>
          <PromptInput
            placeholder="Ask about menus, pricing, delivery..."
            onSubmit={handleSubmit}
            externalValue={inputValue}
          />
        </Reveal>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 max-w-2xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-600 dark:text-slate-300 text-left shadow-sm"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-saffron mb-2">Kitchens by K</p>
            {response}
          </motion.div>
        )}
        <Reveal custom={4}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-slate-400 dark:text-slate-500">Quick actions:</span>
            {["View this week's menu", "Pricing for 50+ employees", "Delivery areas", "Share feedback"].map((q) => (
              <button
                key={q}
                onClick={() => handleQuickAction(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-orange-50 hover:border-orange-200 dark:hover:bg-emerald-900/20 dark:hover:border-emerald-700 transition-colors"
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
