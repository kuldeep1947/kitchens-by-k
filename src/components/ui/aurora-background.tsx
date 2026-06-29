"use client";

import { cn } from "@/lib/utils";

/**
 * AuroraBackground — reusable animated mesh-gradient backdrop with grain.
 * Pure CSS (see .aurora-mesh in index.css), so it's GPU-cheap and respects
 * prefers-reduced-motion automatically. Drop behind any section.
 */
export default function AuroraBackground({
  className = "",
  intensity = "normal",
  grain = true,
}: {
  className?: string;
  intensity?: "subtle" | "normal" | "vivid";
  grain?: boolean;
}) {
  const opacity =
    intensity === "subtle" ? "opacity-40" : intensity === "vivid" ? "opacity-90" : "opacity-70";
  return (
    <div aria-hidden="true" className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className={cn("aurora-mesh absolute -inset-[20%]", opacity)} />
      {grain && <div className="bg-grain absolute inset-0 opacity-60" />}
    </div>
  );
}
