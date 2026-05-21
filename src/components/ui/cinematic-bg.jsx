import { motion } from "framer-motion";

export default function CinematicBackground({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Mesh Glow 1 - Deep Orange */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#F27D21] rounded-full blur-[150px] pointer-events-none"
      />
      {/* Mesh Glow 2 - Deep Navy */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900 rounded-full blur-[150px] pointer-events-none"
      />
      {/* Film Grain Overlay */}
      <div className="absolute inset-0 z-0 bg-grain mix-blend-overlay" />
      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
