import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/shared/Layout.jsx'
import App from './App.jsx'

const About = lazy(() => import('./About.jsx'));
const Demos = lazy(() => import('./Demos.jsx'));
const SignInPage = lazy(() => import('./SignIn.jsx'));
const SignUpPage = lazy(() => import('./SignUp.jsx'));
const Profile = lazy(() => import('./Profile.jsx'));
const MenuPage = lazy(() => import('./Menu.jsx'));
const Faqs = lazy(() => import('./Faqs.jsx'));
const Pricing = lazy(() => import('./Pricing.jsx'));

// Hoisted to module scope so PageWrapper is a stable component type across
// renders (avoids remounting the page subtree on unrelated re-renders).
const pageVariants = {
  initial: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.97 },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 0, y: -30, filter: "blur(10px)", scale: 0.97 },
};

const transitionData = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transitionData}
      className="will-change-[opacity,transform,filter]"
    >
      {children}
    </motion.div>
  );
}

function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 overflow-hidden">
      <div className="aurora-mesh absolute -inset-[20%] opacity-50" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-aurora font-extrabold mb-4" style={{ fontSize: "var(--text-display)" }}>404</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">This dish isn’t on the menu.</p>
        <Link to="/" className="glass rounded-2xl px-6 py-3 text-sm font-semibold text-saffron glow-ring transition-transform hover:-translate-y-0.5">← Back to Home</Link>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-saffron/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-saffron animate-spin glow-saffron" />
      </div>
    </div>
  );
}

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<PageWrapper><App /></PageWrapper>} />
          <Route path="/about" element={<Suspense fallback={<Loading />}><PageWrapper><About /></PageWrapper></Suspense>} />
          <Route path="/demos" element={<Suspense fallback={<Loading />}><PageWrapper><Demos /></PageWrapper></Suspense>} />
          <Route path="/profile" element={<Suspense fallback={<Loading />}><PageWrapper><Profile /></PageWrapper></Suspense>} />
          <Route path="/menu" element={<Suspense fallback={<Loading />}><PageWrapper><MenuPage /></PageWrapper></Suspense>} />
          <Route path="/faqs" element={<Suspense fallback={<Loading />}><PageWrapper><Faqs /></PageWrapper></Suspense>} />
          <Route path="/pricing" element={<Suspense fallback={<Loading />}><PageWrapper><Pricing /></PageWrapper></Suspense>} />
        </Route>
        <Route path="/signin" element={<Suspense fallback={<Loading />}><PageWrapper><SignInPage /></PageWrapper></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={<Loading />}><PageWrapper><SignUpPage /></PageWrapper></Suspense>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}
