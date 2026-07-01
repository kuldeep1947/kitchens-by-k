# 🍱 Kitchens by K

**Premium corporate meal delivery service for Mumbai's busiest professionals.**

Chef-crafted, nutrition-balanced lunches delivered daily to your office — built as a modern, high-performance Progressive Web App with a cohesive "Culinary Aurora" design system.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=pwa&logoColor=white)

🔗 **Live:** [kitchens-by-k.vercel.app](https://kitchens-by-k.vercel.app/)

---

## ✨ Highlights

- **⌘K command palette** — press `Cmd/Ctrl+K` (or the navbar button) to search & jump anywhere, with full keyboard nav.
- **"Culinary Aurora" design system** — token-driven glass, glow & animated aurora mesh; brand color reskins from saffron (light) to emerald (dark). See [`DESIGN.md`](DESIGN.md).
- **Cinematic horizontal-scroll gallery** — a pinned, scroll-driven "The Difference" story (sourcing → cooking → nutrition → delivery).
- **Interactive "Build Your Own Bowl"** — pick base/protein/veggies/sauce and watch calories + macro rings update live.
- **Installable PWA** — logo-based maskable icons, custom install prompt, offline indicator, service worker.

---

## 🧭 Pages & Features

### Home (`/`)
- Animated hero — aurora mesh, cursor-reactive ember particles, flowing SVG "aroma" paths, kinetic headline, magnetic CTAs
- Horizontal-scroll quality story (FoodShowcase)
- **How It Works** — scroll-drawn journey timeline (plan → customize → deliver → personalize → flex)
- Menu preview → full menu
- Testimonials — auto-scrolling social-proof columns
- Closing CTA banner

### Menu (`/menu`)
- Bento-style category cards with **3D tilt** + glass + blur-up images
- Expandable meals with **animated SVG nutrition rings**
- Sliding tag filter (Veg, Vegan, High-Protein, etc.)
- **Build Your Own Bowl** interactive builder

### Pricing (`/pricing`)
- Weekly / Monthly / Enterprise plans
- Multi-step checkout modal: plan → meals → customization → payment
- **Confetti + success screen** on completion (mocked payment)
- Resume-after-sign-in flow

### FAQs (`/faqs`)
- Animated accordion of common questions
- **AI Concierge** — keyword-intent matching with a streaming/typing response and a "thinking" state

### About (`/about`)
- Founder profile & "Why teams trust us" ethos cards

### Profile (`/profile`) — auth-gated
- Avatar upload (size-guarded) + emoji picker
- Inline profile editing with validation (syncs the navbar live)
- Active plan with price breakdown + cancel confirmation
- Saved addresses (CRUD, default) & password change

### Auth (`/signin`, `/signup`)
- Client-side auth via React Context + `localStorage`, with real `<form>` semantics + validation

---

## 🎛 Experience details

- **Dark mode** — class-based, set before paint (no FOUC); animated sun/moon toggle with a View-Transitions **circular reveal**
- **Uniform navbar** — identical links on every page (Home · Menu · Pricing · About · FAQs), active-highlighted
- **Motion** — shared entrance variants, scroll-linked parallax/springs, page transitions; everything honors `prefers-reduced-motion`
- **Intro splash** — brief branded reveal on first visit of a session
- **SEO** — meta description, Open Graph / Twitter cards, and `Restaurant` JSON-LD structured data

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Routing | React Router v7 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first, tokens in `index.css`) |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| UI Primitives | Radix UI (Slot), CVA, clsx, tailwind-merge |
| PWA | vite-plugin-pwa (Workbox) |
| Linting | ESLint 10 |
| Deployment | Vercel |

---

## 🚀 Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
```

### Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build (generates PWA assets) |
| `npm run preview` | Preview the production build (http://localhost:4173) |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
src/
├─ main.jsx                 Router, lazy routes, page transitions
├─ App.jsx                  Home '/' — composes home sections + ambient depth
├─ index.css                Tailwind v4 @theme tokens, glass/aurora utilities
├─ Menu.jsx / Pricing.jsx / Faqs.jsx / About.jsx / Profile.jsx / Demos.jsx
├─ SignIn.jsx / SignUp.jsx
├─ context/AuthContext.jsx  localStorage-backed auth
├─ lib/
│  └─ utils.ts              cn() class merger
├─ components/
│  ├─ home/                 Hero, FoodShowcase, HowItWorks, MenuSection,
│  │                        Testimonials, SplineShowcase, AskSection, FAQ, BuildYourBowl
│  ├─ shared/               Layout, Navbar, Footer, Logo, Reveal
│  └─ ui/                   Design-system primitives & effects:
│     ├─ command-palette · aurora-background · hero-particles
│     ├─ magnetic · tilt-card · parallax · count-up · smart-image · nutrition-ring
│     ├─ intro-splash · pwa-manager · confetti · animated-theme-toggler
│     ├─ background-paths · journey-path · scroll-gallery · testimonials-columns-1
│     ├─ pricing-1 · clean-minimal-sign-in · ai-chat-input · spotlight-card · spotlight
│     └─ badge · button · card   (shadcn-style, CVA)
public/  logo-icon.svg · app-icon.png · pwa-192x192.png · pwa-512x512.png · apple-touch-icon.png
DESIGN.md · index.html · vite.config.js · tsconfig.json · eslint.config.js
```

---

## 🎨 Design system

Documented in [`DESIGN.md`](DESIGN.md). Highlights:

- **Tokens** in `index.css` (`@theme` + `:root`/`.dark`): fluid type scale, motion easings/durations, elevation, glass & glow recipes.
- **Brand duality** — `--color-saffron` is orange in light mode, emerald in dark (intentional).
- **Utilities** — `.glass` / `.glass-strong`, `.glow-ring`, `.text-aurora` (animated gradient text), `.aurora-mesh`.
- **`cn()`** (`lib/utils.ts`) is the canonical class merger.

---

## ⚡ Performance

- **Route-level code splitting** via `React.lazy`
- GPU-friendly effects — translate-only animations on blurred layers, sprite-based particles, off-screen/tab-hidden pausing
- Blur-up lazy images (`SmartImage`)

---

## 📱 PWA

Installable with a logo-based **maskable** icon set, a custom in-app install prompt, an offline indicator, and a Workbox service worker (`autoUpdate`).

- **Android:** browser menu → "Install app"
- **iOS:** Share → "Add to Home Screen"

---

## 🌐 Deployment

Deployed on **Vercel** (Vite preset). Build with `npm run build` and deploy the `dist/` output (or connect the repo for automatic deploys).

---

## 🔐 Note on auth & data

This is a **frontend-only** project — authentication, profile, active plan, saved addresses and "payment" are all persisted client-side in `localStorage`; checkout is mocked. It's a design/UX showcase, not production-grade security.

---

## 📄 License

Private project — all rights reserved.

---

## 👨‍💻 Developer

Designed & developed by **Kuldeep Agrawal** — crafting high-performance, pixel-perfect web experiences with modern React, motion design, and PWA architecture.
