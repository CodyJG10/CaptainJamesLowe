// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The old site's canonical tag pointed at the www host, and ten years of links
// and rankings sit there — so we keep www and let the apex redirect to it.
// https://astro.build/config
export default defineConfig({
	site: 'https://www.captainjameslowe.com',
	integrations: [
		sitemap({
			// /success is noindex — listing it in the sitemap would ask Google to
			// crawl a page the page itself tells it to ignore. Keep the two signals
			// saying the same thing.
			filter: (page) => !page.includes('/success'),
		}),
	],
	// The floating dev toolbar sits over the page and lands in the middle of
	// every screenshot taken during review. Nothing here needs it.
	devToolbar: { enabled: false },
});
