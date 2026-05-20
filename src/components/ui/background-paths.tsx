"use client";

import { motion } from "framer-motion";

function AromaWisps({ position }: { position: number }) {
    // Generate curved paths that look like rising steam/aroma from food
    const paths = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.4 + i * 0.04,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Aroma Wisps</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={path.id % 3 === 0 ? "#059669" : path.id % 3 === 1 ? "#10B981" : "#6EE7B7"}
                        strokeWidth={path.width}
                        strokeOpacity={0.06 + path.id * 0.012}
                        initial={{ pathLength: 0.3, opacity: 0.4 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.2, 0.5, 0.2],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 25 + Math.random() * 15,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
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
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-cream dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Warm ambient blurs */}
            <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-saffron/[0.06] dark:bg-saffron/[0.1] rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-emerald-200/[0.1] dark:bg-emerald-500/[0.08] rounded-full blur-[140px] pointer-events-none" />
            
            <div className="absolute inset-0">
                <AromaWisps position={1} />
                <AromaWisps position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center pt-24 pb-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    {badge && (
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] uppercase text-saffron mb-6 bg-saffron/[0.06] border border-saffron/10 rounded-full px-4 py-1.5"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                            {badge}
                        </motion.span>
                    )}

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold mb-6 tracking-tighter">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {wordIndex === 1 ? (
                                    <motion.span
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: wordIndex * 0.1,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-saffron via-amber-400 to-emerald-400 dark:from-emerald-400 dark:via-emerald-400 dark:to-emerald-400 animate-gradient-text pr-2"
                                    >
                                        {word}
                                    </motion.span>
                                ) : (
                                    word.split("").map((letter, letterIndex) => (
                                        <motion.span
                                            key={`${wordIndex}-${letterIndex}`}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay:
                                                    wordIndex * 0.1 +
                                                    letterIndex * 0.03,
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 25,
                                            }}
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
                            className="text-base md:text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-3 justify-center"
                    >
                        <a
                            href={buttonHref}
                            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-2xl text-[15px] shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-0.5"
                        >
                            {buttonText}
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                        <a
                            href="#how"
                            className="inline-flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium px-8 py-4 rounded-2xl text-[15px] border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-all bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm"
                        >
                            See How It Works
                        </a>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="flex items-center justify-center gap-2 mt-8"
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
                </motion.div>
            </div>
        </div>
    );
}
