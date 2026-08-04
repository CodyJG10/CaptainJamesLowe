/**
 * Static checks over the built dist/ — run after `npm run build`.
 *
 *   npm run build && node scripts/check-build.mjs
 *
 * Catches the things that compile happily and are still wrong: structured data
 * that will not parse, images with no alt attribute, internal links pointing at
 * pages that do not exist, missing or over-long titles.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
/** Google truncates titles around here; longer ones get cut in results. */
const TITLE_MAX = 65;
const ASSET_RE = /\.(png|jpe?g|svg|ico|css|js|woff2?|webmanifest|xml|txt|pdf|mp4|webp|avif)$/i;

const pages = [];
(function walk(dir) {
	for (const entry of readdirSync(dir)) {
		const p = path.join(dir, entry);
		if (statSync(p).isDirectory()) walk(p);
		else if (entry.endsWith('.html')) pages.push(p);
	}
})(DIST);

const routeOf = (f) =>
	('/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\.html$/, '')).replace(
		/\/$/,
		'',
	) || '/';

const routes = new Set(pages.map(routeOf));
const problems = [];

let badSchema = 0;
let missingAlt = 0;
const longTitles = [];
const noTitle = [];
const noDesc = [];
const brokenLinks = new Set();

for (const file of pages) {
	const html = readFileSync(file, 'utf8');
	const route = routeOf(file);

	for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
		try {
			JSON.parse(m[1]);
		} catch (e) {
			badSchema++;
			problems.push(`invalid JSON-LD on ${route}: ${e.message}`);
		}
	}

	const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
	const desc = html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '';
	if (!title) noTitle.push(route);
	if (!desc) noDesc.push(route);
	if (title.length > TITLE_MAX) longTitles.push(`${route} (${title.length})`);

	// alt="" is a valid "decorative" marker and renders as a bare `alt`.
	for (const m of html.matchAll(/<img\b[^>]*>/g)) {
		if (!/\balt\b/.test(m[0])) {
			missingAlt++;
			problems.push(`img without alt on ${route}: ${m[0].slice(0, 80)}`);
		}
	}

	for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
		const href = m[1].replace(/\/$/, '') || '/';
		if (ASSET_RE.test(href)) {
			if (!existsSync(path.join(DIST, href))) brokenLinks.add(`${route} -> ${href} (asset)`);
			continue;
		}
		if (!routes.has(href)) brokenLinks.add(`${route} -> ${href}`);
	}
}

const line = (label, value, bad) =>
	console.log(`  ${bad ? 'FAIL' : 'ok  '}  ${label.padEnd(26)} ${value}`);

console.log(`\nchecked ${pages.length} pages in ${DIST}/\n`);
line('invalid JSON-LD', badSchema, badSchema > 0);
line('images without alt', missingAlt, missingAlt > 0);
line('missing <title>', noTitle.length || 0, noTitle.length > 0);
line('missing meta description', noDesc.length || 0, noDesc.length > 0);
line(`titles over ${TITLE_MAX} chars`, longTitles.length || 0, longTitles.length > 0);
line('broken internal links', brokenLinks.size, brokenLinks.size > 0);

for (const t of longTitles) console.log(`        ${t}`);
for (const b of brokenLinks) console.log(`        ${b}`);
for (const p of problems.slice(0, 20)) console.log(`        ${p}`);

const failed =
	badSchema || missingAlt || noTitle.length || noDesc.length || longTitles.length || brokenLinks.size;
console.log(failed ? '\nbuild checks FAILED' : '\nbuild checks passed');
process.exit(failed ? 1 : 0);
