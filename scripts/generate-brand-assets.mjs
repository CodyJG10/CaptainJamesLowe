/**
 * Generate the favicon set, the web manifest icons and the default OG card.
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * Everything derives from two things — the line-art logo and the brand ink —
 * declared once in CONFIG. Re-run after either changes.
 */
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const CONFIG = {
	logo: path.join(root, 'src/assets/cjl/site/logo-transparent.png'),
	ogBase: path.join(root, 'src/assets/cjl/stock/hero-passage-poster.jpg'),
	out: path.join(root, 'public'),
	/** --ink-deep from src/styles/global.css */
	ink: { r: 0x1b, g: 0x1a, b: 0x18, alpha: 1 },
	/** --color-accent-300, the step that holds up on a dark ground */
	gold: '#facb8d',
	paper: '#f3f2f2',
	padding: 0.14,
};

mkdirSync(CONFIG.out, { recursive: true });

/* ─────────────────────────  favicons  ───────────────────────── */

// The mark is black line art on transparency. Inverting gives white-on-dark,
// which is what reads at 16px against the ink tile.
const markWhite = await sharp(CONFIG.logo)
	.trim({ threshold: 10 })
	.negate({ alpha: false })
	.png()
	.toBuffer();

async function tile(size) {
	const inner = Math.round(size * (1 - CONFIG.padding * 2));
	const mark = await sharp(markWhite)
		.resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
		.toBuffer();
	return sharp({
		create: { width: size, height: size, channels: 4, background: CONFIG.ink },
	})
		.composite([{ input: mark, gravity: 'center' }])
		.png()
		.toBuffer();
}

const pngTargets = [
	['favicon-16.png', 16],
	['favicon-32.png', 32],
	['apple-touch-icon.png', 180],
	['icon-192.png', 192],
	['icon-512.png', 512],
];

for (const [file, size] of pngTargets) {
	writeFileSync(path.join(CONFIG.out, file), await tile(size));
	console.log(`  ${file.padEnd(24)} ${size}×${size}`);
}

/* Multi-size .ico wrapping PNG payloads — supported since Windows Vista. */
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(icoSizes.map(tile));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(icoSizes.length, 4);

let offset = 6 + icoSizes.length * 16;
const entries = icoSizes.map((size, i) => {
	const e = Buffer.alloc(16);
	e.writeUInt8(size === 256 ? 0 : size, 0); // width
	e.writeUInt8(size === 256 ? 0 : size, 1); // height
	e.writeUInt8(0, 2); // palette
	e.writeUInt8(0, 3); // reserved
	e.writeUInt16LE(1, 4); // color planes
	e.writeUInt16LE(32, 6); // bits per pixel
	e.writeUInt32LE(icoPngs[i].length, 8);
	e.writeUInt32LE(offset, 12);
	offset += icoPngs[i].length;
	return e;
});
writeFileSync(path.join(CONFIG.out, 'favicon.ico'), Buffer.concat([header, ...entries, ...icoPngs]));
console.log('  favicon.ico              16/32/48');

/* An SVG favicon for browsers that prefer one — a monogram, since the line-art
   mark does not survive being redrawn as vectors at this size. */
writeFileSync(
	path.join(CONFIG.out, 'favicon.svg'),
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="8" fill="#1b1a18"/>
  <text x="32" y="44" font-family="Georgia, 'Times New Roman', serif" font-size="30"
        text-anchor="middle" fill="${CONFIG.gold}">CJL</text>
</svg>
`,
);
console.log('  favicon.svg');

/* ─────────────────────────  web manifest  ───────────────────────── */

writeFileSync(
	path.join(CONFIG.out, 'site.webmanifest'),
	JSON.stringify(
		{
			name: 'Captain James Lowe Yacht Delivery',
			short_name: 'CJL Yacht Delivery',
			description:
				'Year-round yacht delivery, relief captain work and hands-on training by a USCG 200-ton licensed master.',
			start_url: '/',
			display: 'standalone',
			background_color: '#f3f2f2',
			theme_color: '#1b1a18',
			icons: [
				{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
				{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
				{ src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
			],
		},
		null,
		2,
	) + '\n',
);
console.log('  site.webmanifest');

/* ─────────────────────────  OG card  ───────────────────────── */

// Same archival grade as .plate, pushed dark so the type holds.
const ogPhoto = await sharp(CONFIG.ogBase)
	.resize(1200, 630, { fit: 'cover', position: 'centre' })
	.modulate({ saturation: 0.72, brightness: 0.62 })
	.tint({ r: 255, g: 246, b: 232 })
	.toBuffer();

const scrim = Buffer.from(
	`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"  stop-color="#141311" stop-opacity="0.94"/>
      <stop offset="55%" stop-color="#141311" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#141311" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="26" y="26" width="1148" height="578" fill="none"
        stroke="${CONFIG.gold}" stroke-opacity="0.42" stroke-width="1.5"/>
  <text x="76" y="404" font-family="Georgia, 'Times New Roman', serif" font-size="27"
        letter-spacing="5" fill="${CONFIG.gold}">USCG 200-TON LICENSED MASTER</text>
  <text x="72" y="484" font-family="Georgia, 'Times New Roman', serif" font-size="76"
        fill="${CONFIG.paper}">Captain James Lowe</text>
  <text x="76" y="536" font-family="Georgia, 'Times New Roman', serif" font-size="31"
        fill="${CONFIG.paper}" fill-opacity="0.82">Yacht delivery · We move your boat on its own bottom</text>
</svg>`,
);

await sharp(ogPhoto)
	.composite([{ input: scrim, top: 0, left: 0 }])
	.jpeg({ quality: 86, mozjpeg: true })
	.toFile(path.join(CONFIG.out, 'og-default.jpg'));
console.log('  og-default.jpg           1200×630');

console.log('\nbrand assets written to public/');
