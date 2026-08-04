// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The old site's canonical tag pointed at the www host, and ten years of links
// and rankings sit there — so we keep www and let the apex redirect to it.
// https://astro.build/config
export default defineConfig({
	site: 'https://www.captainjameslowe.com',
	integrations: [sitemap()],
});
