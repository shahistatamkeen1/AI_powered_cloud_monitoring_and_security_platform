import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/auth': {
        target: 'http://20.25.48.139:8000',
        changeOrigin: true,
        secure: false,
      },
      '/metrics': {
        target: 'http://20.25.48.139:8000',
        changeOrigin: true,
        secure: false,
      },
      '/alerts': {
        target: 'http://20.25.48.139:8000',
        changeOrigin: true,
        secure: false,
      },
      '/logs': {
        target: 'http://20.25.48.139:8000',
        changeOrigin: true,
        secure: false,
      },
      '/history': {
        target: 'http://20.25.48.139:8000',
        changeOrigin: true,
        secure: false,
      },
      '/dashboard': {
        target: 'http://20.25.48.139:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})