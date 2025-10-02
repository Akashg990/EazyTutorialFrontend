import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- ADD THIS SERVER CONFIGURATION ---
  server: {
    proxy: {
      // Any request starting with '/api' will be forwarded to the backend
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL
        changeOrigin: true,
      },
    },
  },
})