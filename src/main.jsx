import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './context/AuthContext.jsx'
import Layout from './components/shared/Layout.jsx'
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
    <Routes location={location}>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <AnimatePresence mode="wait">
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, ease: "easeInOut" }}>
                <App />
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route path="/about" element={
          <Suspense fallback={<Loading />}>
            <AnimatePresence mode="wait">
              <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, ease: "easeInOut" }}>
                <About />
              </motion.div>
            </AnimatePresence>
          </Suspense>
        } />
        <Route path="/demos" element={<Suspense fallback={<Loading />}><Demos /></Suspense>} />
        <Route path="/signin" element={<Suspense fallback={<Loading />}><SignInPage /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={<Loading />}><SignUpPage /></Suspense>} />
        <Route path="/profile" element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />
        <Route path="/menu" element={
          <Suspense fallback={<Loading />}>
            <AnimatePresence mode="wait">
              <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, ease: "easeInOut" }}>
                <MenuPage />
              </motion.div>
            </AnimatePresence>
          </Suspense>
        } />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
