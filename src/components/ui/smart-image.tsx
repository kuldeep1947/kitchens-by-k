"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * SmartImage — blur-up loading + graceful error fallback.
 * Renders a shimmering placeholder until the image decodes, then fades it in.
 * On error, shows a subtle branded gradient instead of a broken-image icon.
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded && !errored && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      {errored ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-saffron/15 to-emerald-500/15"
          aria-label={alt}
          role="img"
        >
          <span className="text-3xl opacity-50">🍱</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            "h-full w-full object-cover transition-[opacity,filter] duration-700",
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-xl scale-105",
            imgClassName
          )}
        />
      )}
    </div>
  );
}
