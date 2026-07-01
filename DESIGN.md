# 🎬 DESIGN.md — Kitchens by K: Cinematic Design System

## Philosophy

> "Luxury is in each detail." — Hubert de Givenchy

This design system transforms Kitchens by K from a clean SaaS product into a **cinematic, editorial experience** befitting the boardrooms of DXC, EY, McKinsey, and Deloitte. Every pixel communicates exclusivity, precision, and trust.

---

## 🎨 Color System

### Dark Mode (Primary Experience)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-void` | `#030712` (gray-950) | Page background — near-black |
| `--bg-surface` | `#0f172a` (slate-900) | Card/panel base |
| `--bg-glass` | `rgba(15, 23, 42, 0.6)` | Glassmorphic panels |
| `--border-glass` | `rgba(148, 163, 184, 0.08)` | Subtle glass borders |
| `--border-glow-saffron` | `rgba(242, 125, 33, 0.3)` | Saffron glow borders |
| `--border-glow-emerald` | `rgba(16, 185, 129, 0.3)` | Emerald glow borders |
| `--accent-saffron` | `#F27D21` | Primary CTA, highlights |
| `--accent-emerald` | `#10B981` | Secondary accent, dark mode swap |
| `--text-primary` | `#F8FAFC` (slate-50) | Headlines |
| `--text-secondary` | `#94A3B8` (slate-400) | Body text |
| `--text-muted` | `#475569` (slate-600) | Captions, labels |

### Light Mode (Fallback)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-void` | `#FAFAFA` | Page background |
| `--bg-surface` | `#FFFFFF` | Card base |
| `--bg-glass` | `rgba(255, 255, 255, 0.7)` | Glassmorphic panels |
| `--accent-saffron` | `#F27D21` | Primary accent |

---

## 🔤 Typography

| Element | Font | Weight | Size | Tracking |
|---------|------|--------|------|----------|
| Hero Display | Inter | 900 (Black) | `clamp(4rem, 12vw, 10rem)` | `-0.04em` |
| Section Title | Inter | 800 (ExtraBold) | `clamp(2.5rem, 5vw, 4.5rem)` | `-0.03em` |
| Card Title | Inter | 700 (Bold) | `1.25rem` | `-0.02em` |
| Body | Inter | 400 | `1rem` | `0` |
| Label/Caption | Inter | 600 (SemiBold) | `0.6875rem` | `0.15em` |
| Mono/Data | JetBrains Mono | 500 | `0.875rem` | `0` |

### Spacing Scale

- Section padding: `py-32` to `py-40` (generous vertical breathing room)
- Card padding: `p-8` to `p-10`
- Content max-width: `max-w-7xl` (1280px)
- Gap between sections: `space-y-0` (full-bleed, scroll-driven)

---

## 🪟 Glassmorphism Spec

```css
/* Standard Glass Panel */
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px) saturate(1.5);
  border: 1px solid rgba(148, 163, 184, 0.08);
  border-radius: 1.5rem;
}

/* Elevated Glass (hover/active) */
.glass-elevated {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(24px) saturate(1.8);
  border: 1px solid rgba(242, 125, 33, 0.15);
  box-shadow: 0 0 40px rgba(242, 125, 33, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Light mode glass */
.glass-panel-light {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.05);
}
```

---

## 🎞 Motion System

### Principles
1. **Spring-based** — All transitions use spring physics (no linear easing)
2. **Scroll-triggered** — Elements reveal as they enter viewport
3. **Staggered** — Lists animate with 0.05–0.1s stagger
4. **Micro-interactions** — Hover states have subtle scale/glow shifts

### Spring Presets

| Name | Config | Usage |
|------|--------|-------|
| `snappy` | `{ type: "spring", stiffness: 300, damping: 30 }` | Buttons, toggles |
| `smooth` | `{ type: "spring", stiffness: 100, damping: 20 }` | Page transitions |
| `gentle` | `{ type: "spring", stiffness: 60, damping: 15 }` | Scroll reveals |
| `bouncy` | `{ type: "spring", stiffness: 400, damping: 25 }` | Micro-interactions |

### Scroll Animations

- **Hero**: Scroll-locked parallax with opacity/scale keyframes tied to scroll progress
- **Cards**: `fadeUp` with 30px Y offset, 0.6s duration, staggered
- **Text**: Character-level or word-level stagger for headlines

---

## 🧩 Component Patterns

### Hero (Scrollytelling)
- Full viewport height (`100vh`) scroll-locked section
- Massive typography fades in/out based on scroll position
- Background: Subtle radial gradient + animated grain texture
- No traditional "hero image" — typography IS the visual

### Menu (Focus Mode)
- Apple-style segmented toggle: "Standard" | "High-Focus"
- Floating glassmorphic tiles with hover glow
- Nutrition data as minimal, elegant bars
- High-Focus mode shows curated low-cal, brain-food items

### Pricing (Enterprise B2B)
- Toggle: "Individual" | "Corporate Team"
- Cards as glass panels with subtle border glow on hover
- Enterprise card has a "Client Concierge" VIP link generator
- Pricing feels like enterprise SaaS (Stripe/Linear aesthetic)

---

## 🌟 Signature Effects

1. **Glow borders**: `box-shadow: 0 0 30px rgba(accent, 0.1)` on hover
2. **Grain overlay**: SVG noise texture at 3-5% opacity over backgrounds
3. **Frosted dividers**: `backdrop-blur` on section separators
4. **Ambient orbs**: Large, blurred gradient circles floating in background

---

## 📐 Layout Grid

- 12-column grid on desktop, 4-column on mobile
- Gutter: `1.5rem` (24px)
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- All sections are full-bleed with inner `max-w-7xl mx-auto`

---

## ✅ Accessibility

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- All glassmorphic panels have sufficient contrast against `--bg-void`
- Focus rings: `ring-2 ring-offset-2 ring-saffron/50`
- Reduced motion: Respect `prefers-reduced-motion` — disable parallax, use simple fades
- Semantic HTML: Proper heading hierarchy, landmark regions

---

## 🎯 Target Aesthetic References

- **Linear.app** — Dark, minimal, spring animations
- **Stripe.com** — Editorial typography, gradient accents
- **Apple.com** — Scroll-driven storytelling, massive type
- **Vercel.com** — Glassmorphism, dark backgrounds, glow effects

---
---

# 🛠 Implementation Reference (as-built)

> The sections above are the original design *vision*. This section documents the
> system **as actually implemented in code** — the real token names, utilities and
> components. Where they differ, this section is the source of truth.

## Real design tokens — `src/index.css`

Tokens live in the Tailwind v4 `@theme` block plus `:root` / `.dark` overrides.

**Brand color reskins by mode** (intentional): `--color-saffron` is orange `#F27D21`
in light mode and emerald `#059669` in dark mode. Use `text-saffron` / `bg-saffron` —
they switch automatically.

- Aurora pair: `--color-aurora-from / via / to` (drives `.text-aurora` + meshes)
- Glow rgb (for shadows): `--glow`
- Glass: `--glass-bg`, `--glass-border`, `--glass-blur`
- Elevation: `--shadow-elev-1 / 2 / 3`
- Fluid type: `--text-display` (page heroes), `--text-display-lg` (home hero, capped 5.5rem)
- Motion: `--ease-out-expo`, `--ease-out-quint`, `--ease-in-out-soft`; `--dur-fast/base/slow/slower`. Canonical Framer easing: `[0.22, 1, 0.36, 1]`.

## Real utility classes

`.glass` / `.glass-strong` (decorative panels only — text menus use opaque
`bg-white/95 dark:bg-slate-900/95`) · `.glow-saffron` / `.glow-ring` / `.text-glow` ·
`.text-aurora` (animated gradient text, with `padding-bottom` so descenders aren't
clipped) · `.aurora-mesh` · `.bg-grain` · `.skeleton` · `.elev-1/2/3` · `.animate-float`.

## Reusable primitives — `src/components/ui/`

`AuroraBackground`, `HeroParticles` (sprite-based, auto-pausing canvas),
`Magnetic`, `TiltCard`, `NutritionRing`, `SmartImage` (blur-up +
🍱 fallback — use instead of `<img>`), `Parallax`, `CountUp`, `ScrollGallery`
(pinned horizontal scroll), `IntroSplash`, `PWAManager`, `confetti.ts` (`fireConfetti()`).
Shared entrance variants (`fadeUp`/`scaleIn`/`blurUp`/`slideIn`/`stagger`) +
`<Reveal>` live in [`Reveal.jsx`](src/components/shared/Reveal.jsx).

## Conventions & gotchas

- `cn()` ([`src/lib/utils.ts`](src/lib/utils.ts)) is the canonical class merger.
- **Reduced motion** is honored globally + per-effect; continuous canvas/RAF effects
  pause off-screen and when the tab is hidden.
- **`overflow-x: clip` (not `hidden`)** on the [`Layout`](src/components/shared/Layout.jsx)
  wrapper — `overflow: hidden` would break `position: sticky` (the `ScrollGallery` pin).
- Menu data is hardcoded in **three** synced places: [`Menu.jsx`](src/Menu.jsx),
  [`MenuSection.jsx`](src/components/home/MenuSection.jsx),
  [`pricing-1.tsx`](src/components/ui/pricing-1.tsx).
- `localStorage` is the persistence layer (`kbk_`-prefixed keys); auth/checkout are
  client-side/mocked — demo-grade, not production security.
- SEO/Open-Graph/JSON-LD live in [`index.html`](index.html).
- Build gate is `vite build` (`.ts/.tsx` aren't type-checked; ESLint has a pre-existing baseline).
