import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src' // <-- simple browser-friendly alias
    }
  },
  server: {
    port: 5173,
     proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
