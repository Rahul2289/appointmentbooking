import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// import { fileURLToPath } from "url";
// https://vitejs.dev/config/
// import reactRefresh from "@vitejs/plugin-react-refresh";

// const root = resolve(__dirname, 'src');
// const outDir = resolve(__dirname, 'dist');
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    // outDir,
    // emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        thanku: resolve(__dirname, 'thankYou.html'),
      },
    },
  },
});
