import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces de red
    port: 5173,       // Puerto de desarrollo del frontend
    proxy: {
      '/api': 'http://localhost:5000', // Redirigir todas las solicitudes /api al backend en el puerto 5000
    },
  },
});
