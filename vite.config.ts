import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    passWithNoTests: true,
    env: {
      VITE_TMDB_API_KEY: 'test-api-key',
      VITE_TMDB_BASE_URL: 'https://api.themoviedb.org/3',
      VITE_TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    },
  },
})
