/**
 * Guard against invisible text.
 *
 * Written after shipping exactly that bug: `.band-ink` set
 * `color: var(--color-bg)` while the same rule redefined `--color-bg` to the
 * ink colour, so every element that inherited its colour rendered at precisely
 * the background colour. It is invisible to a build, to TypeScript and to a
 * link checker — only looking catches it, and only if you look at the right
 * section.
 *
 * Walks every text-bearing element on every page, resolves the nearest opaque
 * background, and computes the WCAG contrast ratio.
 *
 *   node scripts/check-contrast.mjs                  # needs the dev server up
 *   MIN_CONTRAST=4.5 node scripts/check-contrast.mjs # audit the small-text bar
 *
 * The default threshold is 3.0 because that is the floor below which something
 * is *broken* rather than merely tight, and this is a regression guard rather
 * than a full audit.
 *
 * On the stricter 4.5 pass, the only elements that report are `.stat-value` at
 * 3.62:1. Those render at 28–40px, which is WCAG "large text" — the bar for
 * large text is 3:1, so they pass. Everything set at body size clears 4.5:1
 * via --color-accent-text. If a new small-text element shows up on that pass,
 * it is a real failure: point it at --color-accent-text, not --color-accent.
 */
import { spawn } from 'node:child_process';
import net from 'node:net';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.BASE || 'http://localhost:4321';
/** Below this ratio, text is effectively unreadable rather than merely low. */
const FAIL_BELOW = Number(process.env.MIN_CONTRAST || 3.0);

const PAGES = [
	'/', '/yacht-delivery', '/services', '/services/hands-on-training',
	'/passages/great-loop', '/passages/bahamas-crossing', '/rates', '/faq',
	'/deliveries', '/service-area', '/delivery-vs-transport', '/captain',
	'/quote', '/success', '/payments', '/privacy', '/disclaimer',
];

const freePort = () => new Promise((r) => { const s = net.createServer(); s.listen(0, () => { const p = s.address().port; s.close(() => r(p)); }); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const port = await freePort();
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, '--disable-gpu',
	'--window-size=1440,900', '--no-first-run', '--user-data-dir=/tmp/cjl-contrast'], { stdio: 'ignore' });

let wsUrl;
for (let i = 0; i < 60; i++) {
	try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl; if (wsUrl) break; } catch {}
	await sleep(250);
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } };
const send = (method, params = {}, sessionId) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);

const PROBE = `(() => {
  const parse = (c) => {
    const m = c.match(/rgba?\\(([^)]+)\\)/); if (!m) return null;
    const [r,g,b,a] = m[1].split(',').map(Number);
    return { r, g, b, a: a === undefined ? 1 : a };
  };
  const lum = ({r,g,b}) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
    return 0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b);
  };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]; return (hi + 0.05) / (lo + 0.05); };

  // Walk up until an opaque background is found — that is what the text sits on.
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a >= 0.95) return c;
      n = n.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };

  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    // Only elements that render their own text.
    const text = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
    if (!text) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    // Skip the visually-hidden helpers.
    if (el.classList.contains('sr-only') || el.classList.contains('gotcha')) continue;

    // The overlay header is the one case this method cannot judge: it is
    // absolutely positioned over the hero video, so walking DOM ancestors
    // finds the page ground rather than the dark footage actually behind it.
    // Its palette is checked against the hero scrim by eye instead.
    if (el.closest('.site-header.transparent')) continue;

    const fg = parse(cs.color); if (!fg || fg.a < 0.1) continue;
    const bg = bgOf(el);
    // Flatten any translucency of the text colour onto its background.
    const flat = { r: fg.r*fg.a + bg.r*(1-fg.a), g: fg.g*fg.a + bg.g*(1-fg.a), b: fg.b*fg.a + bg.b*(1-fg.a) };
    const cr = ratio(flat, bg);
    if (cr < ${FAIL_BELOW}) {
      out.push({ cr: Math.round(cr*100)/100, tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 48),
        color: cs.color, bg: 'rgb(' + [bg.r,bg.g,bg.b].join(',') + ')',
        text: text.slice(0, 46) });
    }
  }
  return JSON.stringify(out);
})()`;

let failures = 0;
for (const p of PAGES) {
	await send('Page.navigate', { url: BASE + p }, sessionId);
	await sleep(900);
	const res = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true }, sessionId);
	const bad = JSON.parse(res.result.value || '[]');
	if (bad.length) {
		failures += bad.length;
		console.log(`\n${p}`);
		for (const b of bad) console.log(`  ${String(b.cr).padStart(5)}:1  <${b.tag} class="${b.cls}">  ${b.color} on ${b.bg}  "${b.text}"`);
	}
}

console.log(
	failures === 0
		? `\nOK — no text below ${FAIL_BELOW}:1 across ${PAGES.length} pages`
		: `\n${failures} low-contrast element(s) found`,
);
ws.close(); chrome.kill();
process.exit(failures ? 1 : 0);
