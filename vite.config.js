import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // additional SCSS configuration options
      },
    },
  },

  build: {
    rollupOptions: {
      external: ['react-dom/client'],
    },
  },
  plugins: [react()],


})
