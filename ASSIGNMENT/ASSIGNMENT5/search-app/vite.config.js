import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Notes and notes.json are served by the Express server (server.js).
    proxy: {
      '/files': 'http://localhost:5001',
    },
  },
})
