import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import App from './App.jsx'

const About = lazy(() => import('./About.jsx'));
const Demos = lazy(() => import('./Demos.jsx'));
const SignInPage = lazy(() => import('./SignIn.jsx'));
const SignUpPage = lazy(() => import('./SignUp.jsx'));
const Profile = lazy(() => import('./Profile.jsx'));
const MenuPage = lazy(() => import('./Menu.jsx'));

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
      <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white mb-4">404</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Page not found.</p>
      <a href="/" className="text-sm font-semibold text-saffron hover:text-amber-600 transition-colors">← Back to Home</a>
    </div>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="w-8 h-8 border-3 border-saffron/30 border-t-saffron rounded-full animate-spin" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
      >
        <Suspense fallback={<Loading />}>
          <Routes location={location}>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>,
)
