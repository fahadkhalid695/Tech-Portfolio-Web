import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Raise warning threshold — three.js is expected to be large
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split Three.js (the large part) into its own chunk
          if (id.includes('node_modules/three/')) {
            return 'three-vendor';
          }
          // R3F + drei go into a separate 3d-utils chunk
          if (
            id.includes('node_modules/@react-three/') ||
            id.includes('node_modules/three-mesh-bvh') ||
            id.includes('node_modules/@monogrid/') ||
            id.includes('node_modules/suspend-react')
          ) {
            return '3d-utils';
          }
          // Main vendor bundle (react, framer-motion)
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
