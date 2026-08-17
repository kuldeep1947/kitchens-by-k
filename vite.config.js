import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo-icon.svg', 'apple-touch-icon.png', 'app-icon.png'],
      manifest: {
        name: 'Kitchens by K',
        short_name: 'Kitchens by K',
        description: 'Premium Meals Delivered in Mumbai.',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'logo-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    // Keep a single React copy (good hygiene, avoids duplicate-React issues).
    dedupe: ['react', 'react-dom'],
  },
  server: {
    historyApiFallback: true,
  },
})
