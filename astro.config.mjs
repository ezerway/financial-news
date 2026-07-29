// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    sitemap({
      changefreq: 'daily'
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  site: "https://financial-news.ezerway.com",
  base: "/"
});