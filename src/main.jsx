import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import About from './About.jsx'
import Demos from './Demos.jsx'
import SignInPage from './SignIn.jsx'
import SignUpPage from './SignUp.jsx'
import Profile from './Profile.jsx'
import MenuPage from './Menu.jsx'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
      <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white mb-4">404</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Page not found.</p>
      <a href="/" className="text-sm font-semibold text-saffron hover:text-amber-600 transition-colors">← Back to Home</a>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/demos" element={<Demos />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
