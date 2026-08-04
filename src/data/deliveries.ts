/**
 * The delivery log — completed jobs, as published on the old site.
 *
 * This is the single best proof asset the business has and it was buried on a
 * page called `recent_captain.yacht_delivery_jobs.php`. Every entry is real
 * work; nothing here is invented.
 *
 * The old page noted the list is not exhaustive and is not in chronological
 * order, so no dates are shown — claiming an order that does not exist would
 * be worse than showing none.
 *
 * IMAGE CEILING: every photograph is a 400px thumbnail, the only size ever
 * published. The /deliveries grid is built around that. See CREDITS.md.
 */
import type { ImageMetadata } from 'astro';

import imgSeaRay56 from '../assets/cjl/deliveries/sea-ray-56.jpg';
import imgChrisCraft50 from '../assets/cjl/deliveries/chris-craft-50.jpg';
import imgLagoon620 from '../assets/cjl/deliveries/lagoon-620.jpg';
import imgTayana55 from '../assets/cjl/deliveries/tayana-55.jpg';
import imgSilverton42 from '../assets/cjl/deliveries/silverton-42.jpg';
import imgBeneteau41 from '../assets/cjl/deliveries/beneteau-oceanis-41.jpg';
import imgNorthernBay38 from '../assets/cjl/deliveries/northern-bay-38.jpg';
import imgPrincess75 from '../assets/cjl/deliveries/princess-75.jpg';
import imgGrafton47 from '../assets/cjl/deliveries/grafton-steel-trawler-47.jpg';
import imgMaxim380 from '../assets/cjl/deliveries/maxim-380-catamaran.jpg';
import imgBali54 from '../assets/cjl/deliveries/bali-54.jpg';
import imgBertram36 from '../assets/cjl/deliveries/bertram-36.jpg';
import imgHatteras53 from '../assets/cjl/deliveries/hatteras-53.jpg';
import imgFairmont70 from '../assets/cjl/deliveries/fairmont-trawler-70.jpg';
import imgStaysailKetch from '../assets/cjl/deliveries/staysail-ketch-60.jpg';
import imgGasparilla from '../assets/cjl/deliveries/gasparilla-designated-captain.jpg';
import imgSeaRay500 from '../assets/cjl/deliveries/sea-ray-500.jpg';
import imgWatkins36 from '../assets/cjl/deliveries/watkins-36.jpg';
import imgPresident41 from '../assets/cjl/deliveries/president-trawler-41.jpg';
import imgPacificSeacraft from '../assets/cjl/deliveries/pacific-seacraft-34.jpg';
import imgCarver325 from '../assets/cjl/deliveries/carver-325.jpg';
import imgLagoon38 from '../assets/cjl/deliveries/lagoon-38.jpg';
import imgLagoon57 from '../assets/cjl/deliveries/lagoon-57.jpg';
import imgCaboRico38 from '../assets/cjl/deliveries/cabo-rico-38.jpg';
import imgHouseboat75 from '../assets/cjl/deliveries/lakeside-houseboat-75.jpg';
import imgF41Ferrier from '../assets/cjl/deliveries/f-41-ferrier.jpg';
import imgEdgewater38 from '../assets/cjl/deliveries/edgewater-38.jpg';
import imgTrophy26 from '../assets/cjl/deliveries/trophy-26.jpg';

export type DeliveryKind = 'delivery' | 'sea-trial' | 'captain-for-hire';

export interface Delivery {
	vessel: string;
	/** Short route line, e.g. 'Clearwater FL → Chicago IL'. */
	route: string;
	/** What made this job what it was. */
	note: string;
	kind: DeliveryKind;
	image?: ImageMetadata;
	/** Describes the photograph, not the job. */
	imageAlt?: string;
}

export const deliveries: Delivery[] = [
	{
		vessel: '56 ft Sea Ray',
		route: 'Clearwater, FL → Chicago, IL',
		note: 'Up the inland rivers against the current — a Great Loop leg run the hard way.',
		kind: 'delivery',
		image: imgSeaRay56,
		imageAlt: 'A 56-foot Sea Ray motor yacht',
	},
	{
		vessel: '50 ft Chris Craft',
		route: 'St. Paul / Minneapolis, MN → Guntersville, AL',
		note: 'Upper Mississippi, Ohio, Cumberland and Tennessee rivers, end to end.',
		kind: 'delivery',
		image: imgChrisCraft50,
		imageAlt: 'A 50-foot Chris Craft motor yacht',
	},
	{
		vessel: 'Lagoon 620',
		route: 'Private residence, FL → Port of Palm Beach',
		note: 'A 62-foot catamaran moved for a point-of-sale handover.',
		kind: 'delivery',
		image: imgLagoon620,
		imageAlt: 'A Lagoon 620 sailing catamaran',
	},
	{
		vessel: 'Tayana 55',
		route: 'Annapolis, MD → Port Canaveral, FL',
		note: 'Down the Chesapeake and offshore in the Atlantic.',
		kind: 'delivery',
		image: imgTayana55,
		imageAlt: 'A Tayana 55 cruising sailboat',
	},
	{
		vessel: 'Silverton 42',
		route: 'Seabrook, TX → Riviera Beach, FL',
		note: 'Across the Gulf in the aftermath of a hurricane season.',
		kind: 'delivery',
		image: imgSilverton42,
		imageAlt: 'A Silverton 42 motor yacht',
	},
	{
		vessel: 'Beneteau Oceanis 41',
		route: 'Jacksonville, FL → Treasure Cay, Bahamas',
		note: 'An offshore crossing to the Abacos.',
		kind: 'delivery',
		image: imgBeneteau41,
		imageAlt: 'A Beneteau Oceanis 41 sailing yacht',
	},
	{
		vessel: 'Northern Bay 38',
		route: 'Marsh Harbour, Bahamas → Beaufort, SC',
		note: 'Single-engine trawler, back across the Stream and up the coast.',
		kind: 'delivery',
		image: imgNorthernBay38,
		imageAlt: 'A Northern Bay 38 single-engine trawler',
	},
	{
		vessel: 'Princess 75',
		route: 'St. Augustine, FL → New Bern, NC',
		note: 'A 75-footer worked up the ICW and the Atlantic.',
		kind: 'delivery',
		image: imgPrincess75,
		imageAlt: 'A Princess 75 motor yacht',
	},
	{
		vessel: 'Grafton Steel Trawler 47',
		route: 'City Island, Bronx, NY → Fort Lauderdale, FL',
		note: 'ICW, the Chesapeake and offshore — the full length of the East Coast.',
		kind: 'delivery',
		image: imgGrafton47,
		imageAlt: 'A 47-foot Grafton steel-hulled trawler',
	},
	{
		vessel: 'Maxim 380 Catamaran',
		route: 'Apalachicola, FL → St. Petersburg, FL',
		note: 'Twin diesels with auxiliary sail, across the Big Bend.',
		kind: 'delivery',
		image: imgMaxim380,
		imageAlt: 'A Maxim 380 power catamaran',
	},
	{
		vessel: 'Bali 5.4',
		route: 'Fort Lauderdale, FL → Savannah, GA',
		note: '28-foot beam, with owner training included along the way.',
		kind: 'delivery',
		image: imgBali54,
		imageAlt: 'A Bali 5.4 sailing catamaran',
	},
	{
		vessel: 'Bayliner 37 Command Bridge',
		route: 'Stuart, FL → Fort Myers, FL',
		note: 'About 154 miles straight across the state on the Okeechobee Waterway.',
		kind: 'delivery',
	},
	{
		vessel: 'Bertram 36 Sportfish',
		route: 'Pompano Beach, FL → Carrabelle, FL',
		note: 'Roughly 400 nautical miles around the peninsula and up the Gulf coast.',
		kind: 'delivery',
		image: imgBertram36,
		imageAlt: 'A Bertram 36 sportfishing boat',
	},
	{
		vessel: 'Hatteras 53 Sportfish',
		route: 'Wrightsville Beach, NC → Jacksonville, FL',
		note: 'Down the ICW with the owner aboard, training as we went.',
		kind: 'delivery',
		image: imgHatteras53,
		imageAlt: 'A Hatteras 53 sportfishing yacht',
	},
	{
		vessel: '70 ft Fairmont Trawler',
		route: 'Georgia, South Carolina and North Carolina, Atlantic ICW',
		note: 'A ballast problem developed en route and was managed to the destination.',
		kind: 'delivery',
		image: imgFairmont70,
		imageAlt: 'A 70-foot Fairmont trawler',
	},
	{
		vessel: 'Cecil Norris Staysail Ketch, 60 ft',
		route: 'St. Petersburg, FL → Fort Myers, FL',
		note: 'Relief captain work for a repeat customer.',
		kind: 'captain-for-hire',
		image: imgStaysailKetch,
		imageAlt: 'A 60-foot staysail ketch',
	},
	{
		vessel: 'Designated captain',
		route: 'Tampa, FL',
		note: 'Designated-driver captain service for the Gasparilla Pirate Festival.',
		kind: 'captain-for-hire',
		image: imgGasparilla,
		imageAlt: 'Boats gathered on the water for the Gasparilla Pirate Festival',
	},
	{
		vessel: 'Sea Ray 500 Sundeck',
		route: 'Long Island, NY → Fort Lauderdale, FL',
		note: 'About 1,400 miles on twin 650 HP Detroit Diesels.',
		kind: 'delivery',
		image: imgSeaRay500,
		imageAlt: 'A Sea Ray 500 Sundeck motor yacht',
	},
	{
		vessel: 'Watkins 36',
		route: 'Apollo Beach, FL',
		note: 'Sea trial run on behalf of a yacht broker.',
		kind: 'sea-trial',
		image: imgWatkins36,
		imageAlt: 'A Watkins 36 sailboat',
	},
	{
		vessel: 'President Trawler 41',
		route: 'Burlington, NJ → Fort Myers, FL, then on to Deltona, FL',
		note: 'Two legs: down the coast, then back across on the Okeechobee and up the St. Johns.',
		kind: 'delivery',
		image: imgPresident41,
		imageAlt: 'A President 41 trawler',
	},
	{
		vessel: 'Pacific Seacraft 34',
		route: 'St. Johns Island, SC → Annapolis, MD',
		note: '600 miles of Atlantic, ICW and Chesapeake.',
		kind: 'delivery',
		image: imgPacificSeacraft,
		imageAlt: 'A Pacific Seacraft 34 cruising sailboat',
	},
	{
		vessel: 'Carver 325',
		route: 'Charlotte Harbor, FL → Placida Harbor, FL',
		note: 'A 32-foot twin-gas cabin cruiser, moved locally.',
		kind: 'delivery',
		image: imgCarver325,
		imageAlt: 'A Carver 325 cabin cruiser',
	},
	{
		vessel: 'Lagoon 38',
		route: 'Brunswick, GA → Portsmouth, VA',
		note: 'About 700 miles in a twin-diesel sailing catamaran.',
		kind: 'delivery',
		image: imgLagoon38,
		imageAlt: 'A Lagoon 38 sailing catamaran',
	},
	{
		vessel: 'Lagoon 57',
		route: 'Fort Lauderdale, FL → Tarpon Springs, FL',
		note: '57 feet on a 30-foot beam, routed south through the Florida Straits.',
		kind: 'delivery',
		image: imgLagoon57,
		imageAlt: 'A Lagoon 57 sailing catamaran',
	},
	{
		vessel: 'Cabo Rico 38',
		route: 'Okeechobee Waterway → St. Johns River',
		note: '316 miles, cutter-rigged, on a 45 hp Westerbeke.',
		kind: 'delivery',
		image: imgCaboRico38,
		imageAlt: 'A Cabo Rico 38 cutter-rigged sailboat',
	},
	{
		vessel: '75 ft Lakeside Houseboat',
		route: 'North Suwannee River, FL → Old Port Tampa, FL',
		note: 'Twin Volvo Penta I/O, taken out into the Gulf — not what a houseboat is built for.',
		kind: 'delivery',
		image: imgHouseboat75,
		imageAlt: 'A 75-foot Lakeside houseboat',
	},
	{
		vessel: 'F-41 Ferrier',
		route: 'St. Augustine, FL → Newport News, VA',
		note: 'A sailing catamaran on twin Nanni diesels.',
		kind: 'delivery',
		image: imgF41Ferrier,
		imageAlt: 'An F-41 Ferrier sailing catamaran',
	},
	{
		vessel: '38 ft Edgewater Center Console',
		route: 'St. Maarten, Dutch Caribbean',
		note: 'Captain-for-hire work on triple 300 hp Yamaha outboards.',
		kind: 'captain-for-hire',
		image: imgEdgewater38,
		imageAlt: 'A 38-foot Edgewater center console boat',
	},
	{
		vessel: '26 ft Trophy',
		route: 'Tampa area, FL',
		note: 'Sea trial on a single MerCruiser I/O.',
		kind: 'sea-trial',
		image: imgTrophy26,
		imageAlt: 'A 26-foot Trophy powerboat',
	},
];

export const deliveryCount = deliveries.length;

/** Distinct US states and countries named across the delivery log. */
export const deliveryPlaces = [
	'FL', 'IL', 'MN', 'AL', 'MD', 'TX', 'SC', 'NC', 'NY', 'NJ', 'GA', 'VA',
	'Bahamas', 'St. Maarten',
] as const;
