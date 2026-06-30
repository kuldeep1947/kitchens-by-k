"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import AuroraBackground from "./aurora-background";
import HeroParticles from "./hero-particles";
import { Magnetic } from "./magnetic";

function AromaWisps({ position }: { position: number }) {
    // Curved paths that read as rising steam / aroma from food
    const paths = Array.from({ length: 22 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.04,
        dur: 25 + i * 0.8,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
                <title>Aroma Wisps</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={path.id % 3 === 0 ? "var(--color-aurora-to)" : path.id % 3 === 1 ? "var(--color-aurora-via)" : "var(--color-aurora-from)"}
                        strokeWidth={path.width}
                        strokeOpacity={0.16 + path.id * 0.035}
                        initial={{ pathLength: 0.3, opacity: 0.5 }}
                        animate={{ pathLength: 1, opacity: [0.4, 0.85, 0.4], pathOffset: [0, 1, 0] }}
                        transition={{ duration: path.dur, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
    buttonText = "Discover Excellence",
    buttonHref = "#",
    subtitle,
    badge,
}: {
    title?: string;
    buttonText?: string;
    buttonHref?: string;
    subtitle?: string;
    badge?: string;
}) {
    const reduce = useReducedMotion();
    const words = title.split(" ");
    // On low-power devices, skip the per-frame particle canvas + animated wisps.
    const lite = typeof document !== "undefined" && document.documentElement.classList.contains("lite");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16 bg-gradient-to-b from-slate-50 via-white to-cream dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Layered backdrop: animated aurora mesh + drifting ember particles + aroma wisps */}
            <AuroraBackground intensity="normal" />
            {!lite && <HeroParticles className="absolute inset-0 h-full w-full pointer-events-none" />}
            {!lite && (
                <div className="absolute inset-0">
                    <AromaWisps position={1} />
                    <AromaWisps position={-1} />
                </div>
            )}

            {/* soft vignette so text stays legible over the mesh */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent dark:from-slate-950/70 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center py-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4 }}
                    className="max-w-4xl mx-auto"
                >
                    {badge && (
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="glass inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] uppercase text-saffron mb-6 rounded-full px-4 py-1.5 glow-ring"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                            {badge}
                        </motion.span>
                    )}

                    <h1 className="font-extrabold mb-6 tracking-tighter leading-[0.95]" style={{ fontSize: "var(--text-display-lg)" }}>
                        {words.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                                {wordIndex === 1 ? (
                                    <motion.span
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: wordIndex * 0.1, type: "spring", stiffness: 150, damping: 25 }}
                                        className="inline-block text-aurora text-glow pr-2"
                                    >
                                        {word}
                                    </motion.span>
                                ) : (
                                    word.split("").map((letter, letterIndex) => (
                                        <motion.span
                                            key={`${wordIndex}-${letterIndex}`}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: wordIndex * 0.1 + letterIndex * 0.03, type: "spring", stiffness: 150, damping: 25 }}
                                            className="inline-block text-slate-900 dark:text-white"
                                        >
                                            {letter}
                                        </motion.span>
                                    ))
                                )}
                            </span>
                        ))}
                    </h1>

                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-9 max-w-xl mx-auto leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                    >
                        <Magnetic strength={reduce ? 0 : 0.4}>
                            <Link
                                to={buttonHref}
                                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-slate-900 dark:bg-white px-8 py-4 text-[15px] font-semibold text-white dark:text-slate-900 elev-2 transition-transform"
                            >
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-saffron via-amber-400 to-emerald-400 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-500" />
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-slate-900">{buttonText}</span>
                                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white dark:group-hover:text-slate-900">→</span>
                            </Link>
                        </Magnetic>
                        <Magnetic strength={reduce ? 0 : 0.3}>
                            <a
                                href="#how"
                                className="glass inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-[15px] font-medium text-slate-700 dark:text-slate-200 transition-colors hover:text-slate-900 dark:hover:text-white"
                            >
                                See How It Works
                            </a>
                        </Magnetic>
                    </motion.div>

                </motion.div>
            </div>

            {/* Scroll cue — pinned to the bottom of the hero so it shows without scrolling */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
            >
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-widest uppercase">Scroll</span>
                <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-slate-400 dark:text-slate-500 text-sm"
                >
                    ↓
                </motion.span>
            </motion.div>
        </div>
    );
}
