import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/bus': 'http://localhost:8080',
      '/viaje': 'http://localhost:8080',
      '/api': 'http://localhost:8080'
    }
  }
})
