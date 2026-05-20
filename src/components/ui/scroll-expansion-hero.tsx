'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  darkMediaSrc?: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  darkMediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Media expansion: starts small, grows to full screen
  const mediaScale = useTransform(scrollYProgress, [0.2, 0.5], [0.55, 1]);
  const mediaRadius = useTransform(scrollYProgress, [0.2, 0.5], [24, 0]);
  // Title fades out as media expands
  const textY = useTransform(scrollYProgress, [0.15, 0.4], [0, -50]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0]);
  // Background fades revealing media
  const bgOpacity = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <>
      <div ref={sectionRef} className="relative h-[120vh] bg-slate-50 dark:bg-slate-950">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
          {/* Background image */}
          <motion.div className="absolute inset-0 z-0" style={{ opacity: bgOpacity }}>
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          {/* Title overlay */}
          <motion.div
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center gap-2 pointer-events-none ${
              textBlend ? 'mix-blend-difference' : ''
            }`}
            style={{ y: textY, opacity: textOpacity }}
          >
            {date && (
              <p className="text-sm font-semibold text-white/80 tracking-wide uppercase mb-2">
                {date}
              </p>
            )}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
              {firstWord}
            </h2>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
              {restOfTitle}
            </h2>
            {scrollToExpand && (
              <p className="text-white/60 text-sm mt-4 font-medium">{scrollToExpand}</p>
            )}
          </motion.div>

          {/* Expanding media */}
          <motion.div
            className="relative z-10 w-full h-full overflow-hidden"
            style={{
              scale: mediaScale,
              borderRadius: mediaRadius,
            }}
          >
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : darkMediaSrc ? (
              <>
                <img
                  src={mediaSrc}
                  alt={title || 'Media content'}
                  className="w-full h-full object-cover dark:hidden"
                />
                <img
                  src={darkMediaSrc}
                  alt={title || 'Media content'}
                  className="w-full h-full object-cover hidden dark:block"
                />
              </>
            ) : (
              <img
                src={mediaSrc}
                alt={title || 'Media content'}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Children rendered as normal flow content below */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </>
  );
};

export default ScrollExpandMedia;
