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

  const pageVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.97 },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, y: -30, filter: "blur(10px)", scale: 0.97 },
  };

  const transitionData = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  const PageWrapper = ({ children }) => (
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

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<PageWrapper><App /></PageWrapper>} />
          <Route path="/about" element={<Suspense fallback={<Loading />}><PageWrapper><About /></PageWrapper></Suspense>} />
          <Route path="/demos" element={<Suspense fallback={<Loading />}><PageWrapper><Demos /></PageWrapper></Suspense>} />
          <Route path="/profile" element={<Suspense fallback={<Loading />}><PageWrapper><Profile /></PageWrapper></Suspense>} />
          <Route path="/menu" element={<Suspense fallback={<Loading />}><PageWrapper><MenuPage /></PageWrapper></Suspense>} />
        </Route>
        <Route path="/signin" element={<Suspense fallback={<Loading />}><PageWrapper><SignInPage /></PageWrapper></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={<Loading />}><PageWrapper><SignUpPage /></PageWrapper></Suspense>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
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
