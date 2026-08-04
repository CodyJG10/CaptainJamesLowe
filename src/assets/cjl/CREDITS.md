# Image and video provenance

Recorded so the client can prove licensing for every asset on the site, and so
a future maintainer knows which photographs are the captain's own (keep) and
which are stock (swap out as real photography becomes available).

## Captain James Lowe's own photography — `site/` and `deliveries/`

Harvested from the previous site at `captainjameslowe.com` via
`scripts/harvest-photos.sh`, then EXIF-rotated, resized and recompressed by
`scripts/optimize-photos.mjs`. Copyright Captain James Lowe; used with the
client's authority as the site owner.

**Known limitation:** every photo in `deliveries/` is a **400px thumbnail** —
the old site never published larger versions. The `/deliveries` grid is sized
around that ceiling. Ask James for the original camera files; they would let
the portfolio run at full width. Several `site/` photos are similarly small
(`captain-james-lowe-portrait.jpg` is 370px, `offshore-wake-calm-day.jpg` is
363px) and are only used at thumbnail scale for that reason.

The genuinely high-resolution originals worth building around:

| File | Source px | What it shows |
| --- | --- | --- |
| `site/captain-james-lowe-florida.jpg` | 2944×2208 | Close portrait of Capt. James aboard a sailboat — the best real photo of him |
| `site/helm-view-offshore.jpg` | 4032×3024 | The view forward from a flybridge helm offshore, compass in frame |
| `site/sunset-georgetown.jpg` | 4032×3024 | Sunset over a marina from a boat's deck, shot on a delivery |
| `site/no-land-in-sight.jpg` | 921×824 | Looking forward over the bow, open water, distant markers |
| `site/ships-at-anchor.jpg` | 960×540 | Commercial ships at anchor in haze |

## Stock — `stock/`

All from **Pexels** under the [Pexels License](https://www.pexels.com/license/):
free for commercial use, no attribution required, modification permitted.
Attribution is recorded here as good practice, not obligation.

| File | Pexels ID | Used for |
| --- | --- | --- |
| `hero-passage-poster.jpg` | [7649033](https://www.pexels.com/video/7649033/) | Homepage hero poster — the LCP image; frame from the hero video |
| `motor-yacht-underway-haze.jpg` | [24238719](https://www.pexels.com/photo/24238719/) | Flybridge motor yacht underway in haze |
| `motor-yacht-underway-wake.jpg` | [20748288](https://www.pexels.com/photo/20748288/) | Pilothouse cruiser underway, throwing a wake |
| `yacht-dawn-distance.jpg` | [14011948](https://www.pexels.com/photo/14011948/) | Distant yacht at dawn — muted, for dark bands |
| `foredeck-coastal.jpg` | [13914191](https://www.pexels.com/photo/13914191/) | Foredeck looking toward a green coastline |
| `helm-compass-twilight.jpg` | [12514724](https://www.pexels.com/photo/12514724/) | Sailboat helm and binnacle compass at twilight |
| `nautical-chart-plot.jpg` | [2678374](https://www.pexels.com/photo/2678374/) | Mercator chart with plotted course lines |
| `passage-planning-chart.jpg` | [5302805](https://www.pexels.com/photo/5302805/) | Route planning — chart, dividers, magnifier, coffee |

**Selection note:** stock was deliberately chosen to show *trawlers, cruisers
and flybridge motor yachts* rather than 200-foot superyachts. James moves
32–75ft owner boats; superyacht imagery would misrepresent the clientele and
scare off the people who actually hire him.

## Video — `public/video/`

| File | Source | Notes |
| --- | --- | --- |
| `hero-passage.mp4` | Pexels [7649033](https://www.pexels.com/video/7649033/) | Aerial of a ketch under sail. Trimmed to an 18s loop (12–30s), scaled to 1280px, H.264 CRF 33 → 2.1 MB. A VP9/WebM encode was tested and came out *larger* than the H.264, so only the MP4 ships. |

The captain's own three clips on the old site (`BikeOnICW.mp4`,
`Machinery_spaces.mp4`, `Andy_oil.mp4`) were downloaded but **not used**: they
are 12 MB, 144 MB and 28 MB of unedited engine-room and dockside footage, not
hero material. They remain in `scripts/.harvest/` (git-ignored) if wanted.
