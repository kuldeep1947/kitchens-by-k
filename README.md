# 🍱 Kitchens by K

**Premium corporate meal delivery service for Mumbai's busiest professionals.**

Chef-crafted, nutrition-balanced lunches delivered daily to your office. Built as a modern, high-performance Progressive Web App.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=pwa&logoColor=white)

---

## ✨ Features

### Core Experience
- **Scroll-expanding hero** with animated SVG background paths and dark/light mode imagery
- **Interactive menu** with nutrition bars, tag-based filters, and expandable accordion cards
- **Pricing plans** with multi-step modal flow (meal selection → customization → payment)
- **AI Concierge** quick-response chat section for instant queries
- **Testimonials** with animated auto-scrolling columns
- **How It Works** journey path with step-by-step visual timeline
- **3D Showcase** section with spotlight effects

### User Experience
- **Dark mode** — class-based toggle (saffron orange → emerald green accent swap)
- **Auth flow** — sign in/sign up with localStorage persistence
- **Profile page** — avatar/emoji picker, address management, password updates
- **Route-level code splitting** with React.lazy for fast initial loads
- **Page transitions** — blur/scale/fade animations between routes via AnimatePresence
- **Back-to-top button** with subtle bobbing animation

### Mobile & PWA
- **Responsive design** — mobile hamburger menu, touch-optimized interactions
- **Progressive Web App** — installable on home screen, standalone mode (no URL bar)
- **iOS optimized** — apple-touch-icon, status bar theming, web app title
- **Offline-ready** — service worker with auto-update via vite-plugin-pwa

### Accessibility & Performance
- Keyboard navigation on interactive cards
- `aria-hidden` on decorative elements
- `aria-label` on icon-only buttons
- Passive scroll listeners
- Lazy-loaded images with `loading="lazy"`
- Code-split routes for minimal initial bundle

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Routing | React Router v7 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| UI Primitives | Radix UI (Slot) |
| Class Utils | clsx, tailwind-merge, class-variance-authority |
| Type Safety | TypeScript (UI components) |
| PWA | vite-plugin-pwa |
| Linting | ESLint 10 |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/your-username/kitchens-by-k.git
cd kitchens-by-k
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build (generates PWA assets) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
kitchens-by-k/
├── public/
│   ├── images/              # Static images (food, profiles, etc.)
│   ├── app-icon.png         # PWA home screen icon (512x512)
│   ├── favicon.svg          # Browser tab icon
│   └── icons.svg            # Sprite icons
├── src/
│   ├── components/
│   │   ├── home/            # Homepage sections
│   │   │   ├── Hero.jsx             # Animated hero with background paths
│   │   │   ├── FoodShowcase.jsx     # Scroll-expanding food imagery
│   │   │   ├── HowItWorks.jsx      # Journey path timeline
│   │   │   ├── MenuSection.jsx     # Featured menu preview
│   │   │   ├── PricingSection.jsx  # Pricing cards with modal
│   │   │   ├── Testimonials.jsx    # Auto-scrolling testimonial columns
│   │   │   ├── SplineShowcase.jsx  # 3D spotlight section
│   │   │   └── AskSection.jsx     # AI chat concierge
│   │   ├── shared/          # Layout & reusable components
│   │   │   ├── Layout.jsx          # App shell (Navbar + Outlet + Footer + BackToTop)
│   │   │   ├── Navbar.jsx          # Responsive nav with auth menu
│   │   │   ├── Footer.jsx          # Full footer with links & app store buttons
│   │   │   ├── Logo.jsx            # Brand logo component
│   │   │   └── Reveal.jsx          # Scroll-triggered reveal animations
│   │   └── ui/              # UI primitives & complex components
│   │       ├── ai-chat-input.tsx
│   │       ├── animated-theme-toggler.tsx
│   │       ├── background-paths.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── clean-minimal-sign-in.tsx
│   │       ├── journey-path.tsx
│   │       ├── pricing-1.tsx
│   │       ├── radial-orbital-timeline.tsx
│   │       ├── scroll-expansion-hero.tsx
│   │       ├── spotlight-card.jsx
│   │       ├── spotlight.tsx
│   │       └── testimonials-columns-1.tsx
│   ├── context/
│   │   └── AuthContext.jsx   # Auth state management (localStorage)
│   ├── lib/
│   │   └── utils.ts          # cn() utility for class merging
│   ├── App.jsx               # Homepage (assembles home sections)
│   ├── About.jsx             # About page with founder profile
│   ├── Menu.jsx              # Full menu with categories & nutrition
│   ├── Profile.jsx           # User profile management
│   ├── Demos.jsx             # Component demos/playground
│   ├── SignIn.jsx            # Sign in page
│   ├── SignUp.jsx            # Sign up page
│   ├── main.jsx             # Router, lazy loading, page transitions
│   └── index.css            # Tailwind v4 theme + custom animations
├── index.html               # Entry HTML with PWA meta tags
├── vite.config.js           # Vite + Tailwind + PWA plugin config
├── vercel.json              # Vercel SPA rewrites
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
└── package.json             # Dependencies & scripts
```

---

## 🎨 Theming & Dark Mode

Toggle via the animated sun/moon button in the navbar.

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Primary accent | Saffron orange (`#F27D21`) | Emerald green (`#059669`) |
| Background | Slate 50 | Slate 950 |
| Cards | White/70 with backdrop blur | Slate 800/70 with backdrop blur |
| Footer | Always dark (Slate 900) | Always dark (Slate 900) |

Theme preference is persisted in `localStorage` and applied before first paint via an inline script in `index.html` to prevent flash.

---

## 📱 Progressive Web App (PWA)

The app is fully installable as a PWA:

- **Manifest** auto-generated by `vite-plugin-pwa` at build time
- **Service Worker** with `autoUpdate` strategy
- **Standalone display** — no browser chrome when installed
- **iOS support** — apple-touch-icon, status bar styling, web app title

### Install on Mobile
1. Visit the deployed site
2. **Android**: Tap browser menu → "Install app"
3. **iOS**: Tap Share → "Add to Home Screen"

---

## 🌐 Deployment

Deployed on **Vercel** with SPA fallback configured in `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Deploy Your Own

```bash
npm run build
npx vercel --prod
```

---

## 🗺 Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | App.jsx | Homepage with all sections |
| `/about` | About.jsx | Founder profile & company ethos |
| `/menu` | Menu.jsx | Full menu with filters & nutrition |
| `/profile` | Profile.jsx | User profile (protected) |
| `/demos` | Demos.jsx | Component playground |
| `/signin` | SignIn.jsx | Authentication |
| `/signup` | SignUp.jsx | Registration |
| `*` | NotFound | 404 page |

---

## 🔐 Authentication

- Simple auth flow using React Context + localStorage
- Sign in / Sign up pages with form validation
- Protected routes redirect to sign in
- Session persists across browser refreshes
- Sign out clears auth state

---

## ⚡ Performance Optimizations

- **Route-level code splitting** — lazy-loaded pages reduce initial bundle
- **Passive event listeners** — scroll handlers don't block main thread
- **Image lazy loading** — below-fold images load on demand
- **CSS-first Tailwind** — no JS runtime for styles
- **Tree-shaking** — Vite eliminates unused code
- **PWA caching** — service worker caches assets for repeat visits

---

## 🧩 Key Components

### Reveal (`src/components/shared/Reveal.jsx`)
Scroll-triggered animation wrapper using Intersection Observer + Framer Motion. Supports `fadeUp`, `scaleIn`, and custom variants.

### BackToTop (`src/components/shared/Layout.jsx`)
Fixed-position button with a subtle bobbing animation. Appears after scrolling 400px, smoothly scrolls to top on click.

### Pricing Modal (`src/components/ui/pricing-1.tsx`)
Multi-step flow: plan selection → meal customization → payment method. Includes spotlight card effects and responsive snap-scroll on mobile.

### Background Paths (`src/components/ui/background-paths.tsx`)
Animated SVG paths in the hero section with configurable text, button, and color props.

---

## 📄 License

Private project — all rights reserved.

---

## 👩‍💼 About

**Kitchens by K** is co-founded by CA Kanak Maheshwari, bringing Big Four precision to corporate meal delivery in Mumbai. Serving 50+ corporate clients with chef-crafted, nutrition-balanced meals daily.
