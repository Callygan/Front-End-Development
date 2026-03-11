import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Vite configuration.
 * Uses the React plugin for JSX/Fast Refresh and Tailwind CSS v4 plugin.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
});