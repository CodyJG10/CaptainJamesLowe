#!/usr/bin/env bash
# One-shot harvest of Captain James Lowe's own photography from the old PHP site.
# Downloads into scripts/.harvest/ with the original names; optimize-photos.mjs
# renames, resizes and moves them into src/assets/cjl/.
set -uo pipefail

BASE="https://www.captainjameslowe.com"
OUT="$(cd "$(dirname "$0")" && pwd)/.harvest"
mkdir -p "$OUT/deliveries" "$OUT/site"

get() { # get <url-path> <dest>
  curl -fsSL --retry 2 --max-time 45 -A "Mozilla/5.0 (site-migration)" \
    "$BASE/$1" -o "$2" && echo "  ok  $1" || echo "  MISS $1"
}

echo "== delivery portfolio (imagesRD/) =="
while IFS='|' read -r remote local; do
  [ -z "$remote" ] && continue
  get "imagesRD/$remote" "$OUT/deliveries/$local"
done <<'EOF'
56Ft_Searay.jpg|sea-ray-56.jpg
68_Chris_Craft.jpg|chris-craft-50.jpg
lagoon620.jpg|lagoon-620.jpg
Tayana55.jpg|tayana-55.jpg
silverton42.jpg|silverton-42.jpg
Beneteau_Oceanis_41.JPG|beneteau-oceanis-41.jpg
northern%20bay.jpg|northern-bay-38.jpg
princess75.jpg|princess-75.jpg
Steel_King.jpg|grafton-steel-trawler-47.jpg
maxim_380_catamaran.jpg|maxim-380-catamaran.jpg
Bali54.jpg|bali-54.jpg
bertram.jpg|bertram-36.jpg
hatteras.jpg|hatteras-53.jpg
farmonttrawler.jpg|fairmont-trawler-70.jpg
Cecil_Norris_56_Staysail_Ketch.jpg|staysail-ketch-60.jpg
Gasparilla_Pirate_Festival.jpg|gasparilla-designated-captain.jpg
SEARAY500.jpg|sea-ray-500.jpg
Watkins_36.jpg|watkins-36.jpg
president_trawler.jpg|president-trawler-41.jpg
pacific_seacraft.jpg|pacific-seacraft-34.jpg
325_Carver.jpg|carver-325.jpg
38_lagoon_to_VA.jpg|lagoon-38.jpg
Lagoon_57.jpg|lagoon-57.jpg
calbo_rico38.jpg|cabo-rico-38.jpg
houseboat.jpg|lakeside-houseboat-75.jpg
F-41_Ferrier.jpg|f-41-ferrier.jpg
38_edgewater.jpg|edgewater-38.jpg
26_trophy.jpg|trophy-26.jpg
EOF

echo "== site photography (images/) =="
while IFS='|' read -r remote local; do
  [ -z "$remote" ] && continue
  get "images/$remote" "$OUT/site/$local"
done <<'EOF'
Captain_James_Lowe2023.jpg|captain-james-lowe-portrait.jpg
capt_james_lowe3.jpg|captain-james-lowe-alt.jpg
Capt_nJames.jpg|captain-james-lowe-florida.jpg
cruising.jpg|cruising-offshore.jpg
ships_at_anchor.jpg|ships-at-anchor.jpg
TwinOutboardsCruisingOffshore.jpg|twin-outboards-offshore.jpg
offshore_wake_on_calm_day.jpg|offshore-wake-calm-day.jpg
Wheel-House.jpg|sea-ray-helm-station.jpg
No_Land_In_Sight.jpg|no-land-in-sight.jpg
Big_Bend.jpg|gulf-big-bend.jpg
Bahamas_Beach.jpg|bahamas-beach.jpg
sunset%20in%20georgetown.jpg|sunset-georgetown.jpg
LogInWater.jpg|log-in-river.jpg
lock_chamber.jpg|river-lock-chamber.jpg
lock1.png|okeechobee-lock.png
Port_mayaca_RR_lift_bridge.png|port-mayaca-lift-bridge.png
Okeechobee_Waterway.jpg|okeechobee-waterway-map.jpg
The_Great_Loop.png|great-loop-route-map.png
Customs.jpg|us-customs-clearance.jpg
loading.jpg|yacht-loaded-on-ship.jpg
boat_delivery_near_me.jpg|boat-delivery-near-me.jpg
wind.png|wind-indicator.png
capt.sign.off.image.png|insurance-check-ride-form.png
Yacht_Delivery_Contract_Image1.jpg|delivery-contract.jpg
Trans_CJL_Yacht_Delivery_Logo.png|logo-transparent.png
blue_on_yellow_logo.png|logo-blue-on-yellow.png
EOF

echo "== captain's own video clips =="
for v in BikeOnICW.mp4 Machinery_spaces.mp4 Andy_oil.mp4; do
  get "videos/$v" "$OUT/site/$v"
done

echo "== PDFs =="
get "USCG_Min_Req.pdf" "$OUT/site/uscg-minimum-requirements.pdf"
get "Delivery_Contract.pdf" "$OUT/site/delivery-contract.pdf"

echo
echo "harvest complete: $(find "$OUT" -type f | wc -l | tr -d ' ') files, $(du -sh "$OUT" | cut -f1)"
