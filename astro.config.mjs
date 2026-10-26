// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Astro 7 defaults to "jsx", which drops whitespace between inline elements
  compressHTML: true,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});