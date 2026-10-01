import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site statique : une page = un fichier HTML (/salon -> salon.html), URLs sans slash final.
export default defineConfig({
  // Sur GitHub Pages, le workflow définit SITE et BASE (voir .github/workflows/pages.yml).
  site: process.env.SITE || 'https://www.socoif.com',
  base: process.env.BASE || '/',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  integrations: [sitemap({ filter: (page) => !/\/(merci|404)$/.test(page) })],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
