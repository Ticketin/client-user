import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// build
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
