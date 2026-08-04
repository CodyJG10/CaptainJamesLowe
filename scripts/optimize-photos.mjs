/**
 * Normalize the harvested photography into src/assets/cjl/.
 *
 * Astro's <Image> handles format conversion and srcset at build time, so this
 * script only does what Astro can't: apply EXIF orientation (several of the
 * captain's phone photos are stored rotated), cap the pixel dimensions, and
 * recompress. Nothing is upscaled — the 400px delivery thumbnails stay 400px
 * and the /deliveries grid is sized to suit them.
 *
 *   node scripts/optimize-photos.mjs
 */
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HARVEST = path.join(root, 'scripts/.harvest');
const OUT = path.join(root, 'src/assets/cjl');

/** Widest we ever render a photo. Anything above this is wasted bytes. */
const MAX_W = 1800;
/** The delivery portfolio renders as a card grid; these are 400px originals. */
const MAX_W_DELIVERIES = 800;

const jobs = [
	{ from: 'site', to: 'site', maxWidth: MAX_W },
	{ from: 'stock', to: 'stock', maxWidth: MAX_W },
	{ from: 'deliveries', to: 'deliveries', maxWidth: MAX_W_DELIVERIES },
];

const kb = (n) => `${Math.round(n / 1024)}kB`;

let totalBefore = 0;
let totalAfter = 0;
let upscaleSkipped = 0;

for (const job of jobs) {
	const srcDir = path.join(HARVEST, job.from);
	const dstDir = path.join(OUT, job.to);
	await mkdir(dstDir, { recursive: true });

	const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
	console.log(`\n── ${job.from} (${files.length} files) ───────────────`);

	for (const file of files) {
		const src = path.join(srcDir, file);
		const before = (await stat(src)).size;

		// .rotate() with no argument reads EXIF Orientation and bakes it in —
		// without this, several of the captain's photos render on their side.
		const pipeline = sharp(src).rotate();
		const meta = await pipeline.metadata();

		// autoOrient reports post-rotation dimensions; fall back for PNGs.
		const width = meta.autoOrient?.width ?? meta.width ?? 0;
		if (width > job.maxWidth) {
			pipeline.resize({ width: job.maxWidth, withoutEnlargement: true });
		} else {
			upscaleSkipped++;
		}

		const isPng = /\.png$/i.test(file);
		const outName = isPng ? file : file.replace(/\.jpe?g$/i, '.jpg');
		const dst = path.join(dstDir, outName);

		if (isPng) {
			// The PNGs here are maps, diagrams and the logo — keep the alpha.
			await pipeline.png({ compressionLevel: 9, palette: true }).toFile(dst);
		} else {
			await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(dst);
		}

		const after = (await stat(dst)).size;
		totalBefore += before;
		totalAfter += after;

		const flag = after > 400 * 1024 ? '  ⚠ over 400kB' : '';
		console.log(
			`  ${outName.padEnd(34)} ${String(width).padStart(4)}px  ${kb(before).padStart(7)} → ${kb(after).padStart(7)}${flag}`,
		);
	}
}

console.log(
	`\ntotal ${kb(totalBefore)} → ${kb(totalAfter)} ` +
		`(${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller); ` +
		`${upscaleSkipped} already at or under target width`,
);
