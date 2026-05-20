# Kitchens by K

Premium corporate meal delivery service for Mumbai's busiest professionals. Chef-crafted, nutrition-balanced lunches delivered daily.

Built with React 19 + Vite 8 + Tailwind CSS v4 + Framer Motion.

## Features

- **Scroll-expanding hero** with dark/light mode images
- **Interactive menu** with nutrition info, filters, and expandable cards
- **Pricing plans** with multi-step modal (meal selection → customization → payment)
- **AI Concierge** quick-response chat section
- **Testimonials** with animated scrolling columns
- **Dark mode** — class-based toggle (saffron orange → emerald green)
- **Auth flow** — sign in/sign up with localStorage persistence
- **Profile page** — avatar, addresses, password management
- **Route-level code splitting** with React.lazy
- **Responsive** — mobile hamburger menu, snap-scroll pricing cards
- **Accessibility** — keyboard navigation on interactive cards, aria-hidden decorative elements

## Tech Stack

- **React 19** + React Router v7
- **Vite 8** with @vitejs/plugin-react
- **Tailwind CSS v4** (CSS-first config, custom theme)
- **Framer Motion** for animations
- **Lucide React** for icons
- **TypeScript** for UI components

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── App.jsx              # Home page (Navbar, Hero, FoodShowcase, Menu, Pricing, etc.)
├── About.jsx            # About page with founder profile
├── Menu.jsx             # Full menu with categories and nutrition bars
├── Profile.jsx          # User profile, addresses, password
├── SignIn.jsx            # Sign in page
├── SignUp.jsx            # Sign up page
├── main.jsx             # Router + lazy loading
├── index.css            # Tailwind v4 theme + custom animations
├── components/
│   ├── shared/          # Reusable components (Logo, Reveal, CompactFooter)
│   └── ui/              # UI components (pricing modal, testimonials, etc.)
└── App.css
```

## Dark Mode

Toggle via the animated theme button in the navbar. In dark mode:
- Saffron orange (`#F27D21`) becomes emerald green (`#059669`)
- Footer stays dark regardless of theme

## License

Private project — all rights reserved.
