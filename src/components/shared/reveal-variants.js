// Framer Motion variants shared by <Reveal> and consumers that pass a specific
// variant (e.g. `variants={scaleIn}`). Kept in their own module so Reveal.jsx
// exports only a component (react-refresh/only-export-components).

// Shared easing — mirrors the --ease-out-quint token in index.css
const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: EASE },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.7, ease: EASE },
  }),
};

export const blurUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.9, ease: EASE },
  }),
};

export const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: EASE },
  }),
};

// Stagger container — pair with the `child` variants on each item
export const stagger = {
  hidden: {},
  visible: (i = 0) => ({
    transition: { delayChildren: i * 0.1, staggerChildren: 0.08 },
  }),
};
