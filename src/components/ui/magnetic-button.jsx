import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children, className = "", onClick }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={`relative px-8 py-4 bg-saffron dark:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-saffron/20 dark:hover:shadow-emerald-600/20 transition-shadow ${className}`}
    >
      {children}
    </motion.button>
  );
}
