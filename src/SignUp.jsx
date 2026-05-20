import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SignUp } from "./components/ui/clean-minimal-sign-in";

const emojis = [
  { emoji: "🥘", x: "5%", y: "10%", duration: 7, delay: 0 },
  { emoji: "🥙", x: "88%", y: "15%", duration: 6, delay: 1 },
  { emoji: "🍛", x: "8%", y: "75%", duration: 8, delay: 0.5 },
  { emoji: "🥗", x: "85%", y: "70%", duration: 6.5, delay: 1.5 },
];

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
        {/* Ambient blurs */}
        <div className="absolute top-[5%] right-[10%] w-[400px] h-[400px] bg-emerald-200/[0.1] dark:bg-emerald-500/[0.07] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[5%] left-[10%] w-[350px] h-[350px] bg-saffron/[0.06] dark:bg-saffron/[0.08] rounded-full blur-[120px] pointer-events-none" />

        {/* Floating emojis */}
        {emojis.map((e, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl select-none pointer-events-none"
            style={{ left: e.x, top: e.y }}
            animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0], opacity: [0.12, 0.2, 0.12] }}
            transition={{ duration: e.duration, delay: e.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {e.emoji}
          </motion.span>
        ))}

        {/* Back to Home */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <SignUp />
      </div>
  );
}
