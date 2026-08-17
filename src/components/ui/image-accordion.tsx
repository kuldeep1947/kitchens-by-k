"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import SmartImage from "./smart-image";

export interface AccordionItem {
  title: string;
  caption: string;
  label: string;
  img: string;
  icon?: React.ReactNode;
}

interface ImageAccordionProps {
  items: AccordionItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

// "First part|Accent part" — the part after the pipe gets the aurora gradient.
function Header({ eyebrow, title, subtitle }: { eyebrow?: string; title?: string; subtitle?: string }) {
  const [head, accent] = (title ?? "").split("|");
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-saffron">{eyebrow}</span>
      )}
      {title && (
        <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tighter text-slate-900 dark:text-white md:text-5xl">
          <span className="block">{head.trim()}</span>
          {accent && <span className="block text-aurora">{accent.trim()}</span>}
        </h2>
      )}
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}

// Shared scrim + faint step number used by both the accordion and the
// reduced-motion grid.
function Scrim({ index }: { index: number }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
      <span className="pointer-events-none absolute right-4 top-2 select-none text-[3.5rem] font-black leading-none text-white/10">
        {String(index + 1).padStart(2, "0")}
      </span>
    </>
  );
}

export default function ImageAccordion({ items, eyebrow, title, subtitle }: ImageAccordionProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  // Reduced-motion: no expand-on-interaction (content would be hidden behind a
  // hover). Show every panel's caption in a plain, motion-free grid instead.
  if (reduce) {
    return (
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {items.map((item, i) => (
              <div key={item.label} className="relative h-72 overflow-hidden rounded-[1.75rem]">
                <SmartImage src={item.img} alt={item.title.replace(/\n/g, " ")} className="absolute inset-0 h-full w-full" imgClassName="h-full w-full object-cover" />
                <Scrim index={i} />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                    {item.icon}<span>{item.label}</span>
                  </span>
                  <h3 className="whitespace-pre-line text-2xl font-extrabold leading-[1.05] tracking-tight text-white">{item.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/75">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <div className="md:w-[30%] md:shrink-0">
          <Header eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <p className="mt-6 text-[13px] text-slate-400 dark:text-slate-500">Hover or tap a panel to explore.</p>
        </div>

        <div
          className="flex h-[60svh] max-h-[560px] min-h-[420px] w-full min-w-0 gap-2.5 md:flex-1 md:gap-3"
          onMouseLeave={() => setActive(0)}
        >
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.label}
                type="button"
                aria-label={item.title.replace(/\n/g, " ")}
                aria-expanded={isActive}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group relative h-full min-w-[3rem] overflow-hidden rounded-[1.75rem] outline-none ring-saffron/70 ring-inset focus-visible:ring-2"
                style={{ flexGrow: isActive ? 6 : 1, flexBasis: 0, transition: "flex-grow 700ms cubic-bezier(0.22,1,0.36,1)" }}
              >
                <SmartImage
                  src={item.img}
                  alt={item.title.replace(/\n/g, " ")}
                  className="absolute inset-0 h-full w-full"
                  imgClassName={`h-full w-full object-cover transition-transform duration-[1200ms] ease-out ${isActive ? "scale-100" : "scale-[1.12]"}`}
                />
                <Scrim index={i} />

                {/* Collapsed state: centered vertical label + icon chip */}
                <span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.25em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "opacity-0" : "opacity-100"}`}
                >
                  {item.label}
                </span>
                <span
                  className={`absolute bottom-5 left-1/2 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full glass text-white transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "opacity-0" : "opacity-100"}`}
                >
                  {item.icon}
                </span>

                {/* Expanded state: label pill + title + caption */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-7 text-left transition-[opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)] md:p-8 ${isActive ? "translate-y-0 opacity-100 delay-300 duration-400" : "pointer-events-none translate-y-3 opacity-0 duration-200"}`}
                >
                  <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                    {item.icon}<span>{item.label}</span>
                  </span>
                  <h3 className="whitespace-pre-line text-2xl font-extrabold leading-[1.05] tracking-tight text-white md:text-4xl">{item.title}</h3>
                  <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/75 md:text-[15px]">{item.caption}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
