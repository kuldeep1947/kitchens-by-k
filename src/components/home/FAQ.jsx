import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "../shared/Reveal";

const faqs = [
  {
    q: "Which areas in Mumbai do you deliver to?",
    a: "We currently deliver across BKC, Andheri, Powai, Lower Parel, Nariman Point, Goregaon and Malad — with more areas added every month. If your office isn't on the list, reach out and we'll check feasibility for your team.",
  },
  {
    q: "How does the subscription work?",
    a: "Pick a Weekly (5 meals) or Monthly (22 meals) plan, choose your dishes and any customizations, and we deliver hot to your desk before lunch. You can pause or cancel anytime — no lock-in.",
  },
  {
    q: "Can I customize meals for dietary needs?",
    a: "Absolutely. Every plan supports vegetarian, vegan, gluten-free, low-spice, no onion/garlic and extra-protein options. Macros are balanced by our nutritionists, so you get the right meal without the guesswork.",
  },
  {
    q: "Do you offer a tasting before we commit?",
    a: "Yes — for teams of 50+, our Enterprise plan includes a free on-site tasting session before launch, plus dedicated chef allocation and custom pricing. Just drop us a note and we'll set it up.",
  },
  {
    q: "How do you keep the food fresh?",
    a: "Everything is sourced from local farms each morning and cooked the same day — never reheated. Meals are sealed and moved through a cold-chain so they arrive hot, fresh and on time.",
  },
  {
    q: "How is billing handled for companies?",
    a: "We support per-employee billing with GST invoicing, and HR/admin teams get a single monthly statement. Enterprise plans can be tailored to your headcount and delivery schedule.",
  },
];

function FaqItem({ item, index, open, setOpen }) {
  const isOpen = open === index;
  return (
    <Reveal custom={index}>
      <div className="glass overflow-hidden rounded-2xl transition-shadow duration-300 hover:glow-ring">
        <button
          onClick={() => setOpen(isOpen ? null : index)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
        >
          <span className="text-[15px] font-semibold text-slate-900 dark:text-white md:text-base">{item.q}</span>
          <motion.span
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-saffron/10 text-saffron"
          >
            <Plus size={16} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-6 text-[14px] leading-relaxed text-slate-500 dark:text-slate-400 md:px-6">
                {item.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <p className="text-center text-[12px] font-semibold tracking-[0.2em] text-saffron">FAQs</p>
        </Reveal>
        <Reveal custom={1}>
          <h2 className="mt-4 mb-12 text-center text-3xl font-extrabold tracking-tighter text-slate-900 dark:text-white md:text-5xl">
            Questions? <span className="text-aurora">Answered.</span>
          </h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} open={open} setOpen={setOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
