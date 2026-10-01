import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // Cloudflare Workers Builds sets WORKERS_CI; GitHub Actions passes SITE_URL explicitly.
  site: process.env.SITE_URL || (process.env.WORKERS_CI ? 'https://bisericabaden.ch' : 'http://127.0.0.1:4321'),
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  image: {
    domains: ['eus-cdn.sway.static.microsoft'],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
