import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Pastikan ini sama dengan yang dipakai di docker run
    host: true, // Supaya bisa diakses dari luar container
  },
})
