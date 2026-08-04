/**
 * Full-page screenshots via headless Chrome + the DevTools protocol.
 *
 * Used during the build to actually look at pages rather than trusting that
 * markup which compiles also renders. Not part of the site build.
 *
 *   node scripts/shoot.mjs <path> [outName] [width] [full|fold]
 */
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import net from 'node:net';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [, , path = '/', outName = 'shot', widthArg = '1440', mode = 'full'] = process.argv;
const width = Number(widthArg);
const height = mode === 'full' ? 1000 : Math.round((width * 9) / 16);
const OUT = 'scripts/.shots';
mkdirSync(OUT, { recursive: true });

const freePort = () =>
	new Promise((res) => {
		const s = net.createServer();
		s.listen(0, () => { const p = s.address().port; s.close(() => res(p)); });
	});

const port = await freePort();
const chrome = spawn(CHROME, [
	'--headless=new', `--remote-debugging-port=${port}`, '--disable-gpu',
	'--hide-scrollbars', `--force-device-scale-factor=${process.env.DSF || 2}`,
	`--window-size=${width},${height}`, '--no-first-run', '--no-default-browser-check',
	'--user-data-dir=/tmp/cjl-chrome-profile', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let wsUrl;
for (let i = 0; i < 60; i++) {
	try {
		const r = await fetch(`http://127.0.0.1:${port}/json/version`);
		wsUrl = (await r.json()).webSocketDebuggerUrl;
		if (wsUrl) break;
	} catch {}
	await sleep(250);
}
if (!wsUrl) { chrome.kill(); throw new Error('Chrome did not start'); }

const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
	const m = JSON.parse(e.data);
	if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
};
const send = (method, params = {}, sessionId) =>
	new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

await send('Page.enable', {}, sessionId);
await send('Emulation.setDeviceMetricsOverride',
	{ width, height, deviceScaleFactor: Number(process.env.DSF || 2), mobile: width < 700 }, sessionId);
await send('Page.navigate', { url: `http://localhost:4321${path}` }, sessionId);
await sleep(2800);

// Settle lazy images and any scroll-triggered work, then return to the top.
await send('Runtime.evaluate', {
	expression: `(async () => {
		document.documentElement.style.scrollBehavior = 'auto';
		const step = innerHeight;
		for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
		scrollTo(0, 0);
		await new Promise(r => setTimeout(r, 400));
	})()`,
	awaitPromise: true,
}, sessionId);

const { data } = await send('Page.captureScreenshot',
	{ format: 'png', captureBeyondViewport: mode === 'full', ...(mode === 'full' ? { fromSurface: true } : {}) }, sessionId);

writeFileSync(`${OUT}/${outName}.png`, Buffer.from(data, 'base64'));
console.log(`${OUT}/${outName}.png`);

ws.close();
chrome.kill();
process.exit(0);
