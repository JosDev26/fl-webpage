// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [sitemap()],
  site: process.env.SITE_URL || 'http://localhost:4321',
  security: {
    checkOrigin: false,
  },
});
