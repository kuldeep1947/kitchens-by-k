import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import IntroSplash from './components/ui/intro-splash'
import { AnimatedRoutes } from './AppRoutes.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <IntroSplash />
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
