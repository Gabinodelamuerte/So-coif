import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site statique : une page = un fichier HTML (/salon -> salon.html), URLs sans slash final.
export default defineConfig({
  site: 'https://www.socoif.com',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  integrations: [sitemap({ filter: (page) => !/\/(merci|404)$/.test(page) })],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
