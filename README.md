# Captain James Lowe — captainjameslowe.com

Static Astro site for a **yacht delivery / boat relocation captain** — a USCG
200-ton licensed master who moves clients' vessels over the water under their
own power, plus hands-on training, insurance check rides, relief-captain work
and sea trials.

Rebuild of a hand-coded PHP site from 2015 (40 pages, keyword-stuffed footer on
every one, a 2,884px form iframe, invalid structured data). The content
underneath was genuinely good and carried ten years of search equity, so all of
it was migrated and every old URL is 301'd.

**Stack:** Astro 7, zero client frameworks, static output. Two small inline
scripts total, both progressive enhancements.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

---

## Where things live

| What | Where |
| --- | --- |
| Design tokens — the whole Classical system | `src/styles/global.css` (`:root`) |
| Layout, `<head>`, LocalBusiness schema, `jsonLd` merge | `src/layouts/Layout.astro` |
| Contact details, socials, form endpoint | `src/data/site.ts` |
| Services (6) → footer, hub, detail pages, quote form | `src/data/services.ts` |
| Passages (6) — Great Loop, Bahamas, Okeechobee… | `src/data/passages.ts` |
| Service area (31 regions) → `/service-area` | `src/data/serviceArea.ts` |
| Delivery log (29 vessels) | `src/data/deliveries.ts` |
| **Rates — all money figures derive from `RATES` here** | `src/data/rates.ts` |
| FAQs (24) + FAQPage schema helper | `src/data/faqs.ts` |
| Quote form option lists | `src/data/quoteForm.ts` |
| Photography + provenance | `src/assets/cjl/`, `CREDITS.md` |
| Hero video | `public/video/hero-passage.mp4` |
| 301s from the old PHP site | `public/_redirects` |

**Adding a service** — one entry in `services.ts` and it appears in the footer,
the `/services` hub, its own detail page, the related rail and the quote form's
job-type checkboxes. Nothing else to touch.

**Changing a rate** — edit `RATES` in `rates.ts`. The rate cards, the worked
example *and* the speed table all recompute. This is deliberate: the old site
printed current rates and then worked an example at rates three years stale,
understating a ten-day job by about 20%.

### Scripts

| Script | Does |
| --- | --- |
| `scripts/harvest-photos.sh` | Re-downloads the client's photography from the old site into `scripts/.harvest/` (git-ignored) |
| `scripts/optimize-photos.mjs` | EXIF-rotates, caps dimensions, recompresses into `src/assets/cjl/` |
| `scripts/generate-brand-assets.mjs` | Favicons, `.ico`, webmanifest and the 1200×630 OG card, all from the logo + brand ink |
| `scripts/shoot.mjs` | Full-page screenshots via headless Chrome — for review, not part of the build |
| `scripts/check-build.mjs` | `npm run check` — JSON-LD parses, no missing alt, no broken internal links, titles in budget |
| `scripts/check-contrast.mjs` | `npm run check:contrast` — walks every page for text unreadable against its background. Run after touching colour |

```bash
npm run build && npm run check      # static checks over dist/
npm run dev &  npm run check:contrast   # needs a running server
```

---

## The design system

"Classical", from the Claude Design export. **Token names are the contract** —
every component reads `var(--color-*)` / `var(--space-*)` / `var(--font-*)`, so
the whole site retints from the `:root` block alone. Never hardcode a hex, a
font name or a px value a token already carries.

Cormorant Garamond over Lora, warm gold `#b68235` on a near-white `#f3f2f2`
ground. The rules that make it cohere:

- **Color is stroke, not fill.** Buttons are outlined, cards are bordered.
  Nothing gets filled with accent.
- **Three accent tokens, and they are not interchangeable.** `--color-accent`
  is the *stroke* — borders, rules, outlines, where 3:1 is the right bar and it
  passes. Text uses `--color-accent-text` (the deep ramp step, clears 4.5:1);
  large gold figures use `--color-accent-display`. All three re-point up the
  ramp inside `.band-ink`. Reaching for `--color-accent` as a text color is the
  mistake this split exists to prevent.
- **Hairlines carry structure.** `var(--color-divider)` between sections.
- **Every content photograph goes through `.plate`** (`src/components/Plate.astro`)
  — a 6px surface mat, a hairline outline, and a warm archival grade.
- **Bold is retired.** Semibold is the interface ceiling; display type sets
  *lighter*, at the normal cut. That is why `.display-*` is `font-weight: 400`.
- **Justified body copy** at a comfortable measure (`.prose`), left-aligned
  below 640px where justification only makes rivers.

### The one deliberate departure

The homepage hero is a full-bleed dark video, which the system's "keep large
fills off the page" rule would forbid. It is made to read as intentional rather
than accidental: the video is graded to match `.plate`'s archival warmth, the
frame is a gold hairline rather than a border, and the type is Cormorant at the
display cut. Below the fold the page resolves into the light editorial ground
and stays there. The dark bands already in the design — the delivery-vs-transport
section, the footer — give it company so it does not read as a one-off.

### Motion

Quiet, like the rest of it: one easing curve, one distance, one duration.
Things arrive; nothing performs. It lives in section 5 of `global.css` plus two
inline scripts in `Layout.astro`.

- **Scroll reveal** — a 16px rise and fade as elements enter, staggered across
  grid siblings and capped at the fifth child so a 29-item log does not take a
  minute to finish arriving.
- **Hero entrance** — the heading rises in two lines, then the kicker, lede,
  buttons and note fall in behind it, and the rule under the kicker draws
  itself. The heading deliberately does **not** fade: an element at opacity 0
  has not painted, and fading the LCP element cost 390ms of LCP on throttled 3G.
- **Counting figures** — the stat rows count up when they scroll into view.
  Only plain integers are touched and the final text is restored verbatim; the
  figures are already tabular, so the width never jitters.
- **Hover** — photographs scale 3.5% inside their (unmoving) mat, nav links
  draw an underline from the left, cards warm their border.

**Two things in that CSS are load-bearing, and both have already broken once:**

1. **The gate fails open.** Everything hidden-then-revealed is scoped to
   `[data-anim='on']`, set on `<html>` by a `<head>` script only when JS runs
   *and* reduced motion is not requested. JS blocked, a script error, or a
   motion preference all mean the attribute is absent and nothing is ever
   hidden. Never write a reveal outside that gate — one that fails closed is an
   invisible website.
2. **`:where()`, not `:is()`, and order matters.** `:is()` takes the
   specificity of its most specific argument, which once lifted the hidden rule
   above the reveal rule — content hid and never came back. Separately, the
   `transition` shorthand *replaces* rather than merges, so `.card`'s
   `transition: border-color` silently wiped the opacity and transform
   transitions and every reveal snapped. The hover polish therefore comes
   *before* the reveal block, which re-states `border-color` in its own list.

---

## Performance

Measured on the built site, homepage, headless Chrome:

| | No throttling | Fast 3G + 4× CPU |
| --- | --- | --- |
| LCP | 140 ms | **564 ms** |
| FCP | 140 ms | 516 ms |
| CLS | 0 | 0 |

The LCP element is the hero **heading**, not the poster — Chrome discounts an
image that fills the viewport, treating it as a background. That is a good
outcome: LCP then depends only on CSS and the fonts.

**Fonts are self-hosted** (`public/fonts/`, `@font-face` at the top of
`global.css`, preloaded in `Layout.astro`) rather than loaded from Google. With
the third-party stylesheet the font files were only discovered after it parsed,
so the hero painted in Georgia and reflowed when Cormorant arrived — and because
the hero is flex-end aligned, that moved the whole block. It measured a 0.055
shift in roughly two runs of three and touched 0.109 at worst. Self-hosted and
preloaded, CLS is a stable 0. It also drops two third-party connections from the
critical path and stops leaking every visitor's IP to a third party. Both faces
are variable fonts: one 37 kB file each.

**The hero video never touches the critical path.** It ships with no `src`; a
script attaches one only after `load`, and only on screens over 860px with no
`prefers-reduced-motion`, no Save-Data and no 2g/3g connection. Verified: at
390px the mp4 is requested **zero** times.

It is still 2.1 MB for desktop visitors who do get it, arriving after the page
is usable. That is the trade the cinematic hero costs. If it ever needs to come
down, re-encode at a higher CRF in the ffmpeg command recorded in `CREDITS.md`.

---

## Content decisions worth knowing

**Claims were rewritten to what the source material supports.** The design
draft opened with "Thirty-odd years of getting other people's boats home" and a
"24 States" figure; the old site states neither a years-in-business number nor a
state count anywhere. The homepage now uses figures that are checkable —
200-ton license, 29 documented deliveries, 17 certifications, 365 days a year.
See the open items below to restore bigger numbers once James confirms them.

**No testimonials, deliberately.** The old site had zero published reviews and
one orphaned `aggregateRating` of 5.0/12 that appeared nowhere on the page.
Review markup without visible reviews is a structured-data violation, so it was
dropped rather than carried over. Proof comes from the delivery log instead.

**The keyword footer is gone.** 28 blocks of state-by-state text, identical on
all 40 pages, is duplicate content that was suppressing the pages it was meant
to lift. It now lives once, searchable, at `/service-area`.

**The bio's opening apology is gone** — it literally began by apologizing for
the site's own keyword stuffing. The voice, the Navy/oil-patch/crew-boat
narrative, the 17 certifications and both taglines are kept.

**Typos fixed in migrated copy:** `lenght`, `Positiing`, `intercostal`,
`sailing purest`, `Calbo Rico` → Cabo Rico, `Nannie` → Nanni, `Virgini` →
Virginia, and `CIVAL / PENEALTIES / IMPRISONMET / FORFETURE` in the customs
warning.

---

## TODO before launch

**Blocking — needs James:**

1. **Which address is authoritative?** The old site claimed four bases: a PO Box
   in Christmas FL (structured data), a check-mailing address in Bonifay FL
   (payments page), Port Canaveral (Florida page), and "central Florida" (rates).
   Christmas FL is used in `src/data/site.ts` because it matches the structured
   data and is central Florida — **confirm before launch.**
2. **Years of experience and state count.** Placeholders are in place; real
   numbers restore the stronger claims.
3. **Weddings / mobile notary** — carry it over or retire it? The old site
   advertised East Orlando on one page and said it was discontinued and moved to
   the Panhandle on another. Currently both URLs 301 to the homepage
   (`public/_redirects`).
4. **A public email address.** None was published anywhere on the old site.
   `site.email` is empty; fill it and the footer and schema pick it up.
5. **GPTBot.** The old `robots.txt` blocked it entirely. It is now allowed —
   confirm James is happy being quotable in AI search.

**Setup:**

6. **Formspree.** Create the form, put its ID in `FORMSPREE_FORM_ID`
   (`src/data/site.ts`). Formspree restricts submissions by domain and `_next`
   redirects to the production `/success`, so **the end-to-end test only works
   on the deployed domain** — not localhost.
7. **File uploads on the quote form need a paid Formspree plan.** `ALLOW_UPLOADS`
   is `false`, and the form currently asks clients to reply to the confirmation
   email with attachments. Flip it to `true` once the plan is in place.
8. **GA4.** Set `gaMeasurementId` in `site.ts` (the old site had no analytics at
   all). The tag only renders when the ID is non-empty.
9. **Google Business Profile.** Paste the URL into `googleProfileUrl` in
   `site.ts` and it joins `sameAs` in the schema.

**Photography:**

10. **Ask for the original delivery photos.** All 29 in the log are 400px
    thumbnails — the only size the old site ever published — and the grid is
    built around that ceiling. Full-resolution originals would let the portfolio
    run at full width. Same for the bio portrait (`captain-james-lowe-portrait.jpg`
    is 370px; the site uses the 2944px `captain-james-lowe-florida.jpg` instead).
11. **Eight photographs are stock** (Pexels, free for commercial use — see
    `src/assets/cjl/CREDITS.md`). Swap for real work as it becomes available.

**Post-launch, in order:**

12. Submit the real form on the production domain, confirm delivery and check
    the notification address in the Formspree dashboard.
13. Spot-check the 301s: `curl -I https://www.captainjameslowe.com/yacht_delivery.php`
14. Google Search Console — verify the domain, submit
    `https://www.captainjameslowe.com/sitemap-index.xml`, request indexing for
    the homepage, `/yacht-delivery` and `/rates`.
15. Validate the structured data in Google's Rich Results Test. (The old site's
    JSON-LD had `//` comments inside the JSON, so none of it ever parsed.)

---

## Deploy

Cloudflare Pages: build `npm run build`, output `dist`, `NODE_VERSION` ≥ 22.12
(matches `engines` in `package.json`). `public/_redirects` is consumed natively.
Add the custom domain in Pages, point DNS at it, and HTTPS is automatic.

The apex should redirect to `www` — `astro.config.mjs` sets
`site: 'https://www.captainjameslowe.com'` because that is the host the old
site's canonical tags used and where the rankings sit.
