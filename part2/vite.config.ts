import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { ViteUserConfig } from 'vitest/config';

// Define the Vite configuration
export default defineConfig({
  plugins: [react()], // React plugin for Vite
  test: {
    environment: 'jsdom', // Use jsdom for testing environment
    globals: true, // Enable global variables for testing
    setupFiles: './testSetup.ts', // Path to setup file for tests
  } as ViteUserConfig['test'], // Add type support for test configuration
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Proxy target for API requests
        changeOrigin: true, // Change the origin of the host header to the target URL
        secure: false, // Disable SSL verification (useful for local development)
      },
    },
  },
});