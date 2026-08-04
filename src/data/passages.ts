/**
 * Waters of special expertise — the routes James is asked about by name.
 *
 * These were the strongest pages on the old site: real operational knowledge
 * (lock phone numbers, bridge clearances, cruising permit fees) that nobody
 * else publishes, which is exactly why they rank. Every hard number here comes
 * from the old site and is preserved verbatim; where a figure is the kind that
 * changes, it is labelled so it can be re-checked rather than quietly rotting.
 *
 * Drives /passages/[slug] and the cross-links on /yacht-delivery.
 */
import type { ImageMetadata } from 'astro';

import imgGreatLoopMap from '../assets/cjl/site/great-loop-route-map.png';
import imgBahamasBeach from '../assets/cjl/site/bahamas-beach.jpg';
import imgUsCustoms from '../assets/cjl/site/us-customs-clearance.jpg';
import imgOkeechobeeMap from '../assets/cjl/site/okeechobee-waterway-map.jpg';
import imgOkeechobeeLock from '../assets/cjl/site/okeechobee-lock.png';
import imgPortMayaca from '../assets/cjl/site/port-mayaca-lift-bridge.png';
import imgRiverLock from '../assets/cjl/site/river-lock-chamber.jpg';
import imgLogInRiver from '../assets/cjl/site/log-in-river.jpg';
import imgBigBendChart from '../assets/cjl/site/gulf-big-bend.jpg';
import imgShipsAtAnchor from '../assets/cjl/site/ships-at-anchor.jpg';
import imgSunsetGeorgetown from '../assets/cjl/site/sunset-georgetown.jpg';
import imgHelmView from '../assets/cjl/site/helm-view-offshore.jpg';

export interface FactRow {
	label: string;
	value: string;
}

export interface Passage {
	slug: string;
	name: string;
	/** One line for the hub grid and cross-link rails. */
	summary: string;
	cardImage: ImageMetadata;
	cardImageAlt: string;

	metaTitle: string;
	metaDescription: string;

	hero: {
		kicker: string;
		heading: string;
		lede: string;
		image: ImageMetadata;
		imageAlt: string;
	};

	body: string[];

	/** Optional hard-numbers panel — distances, clearances, fees. */
	facts?: {
		heading: string;
		note?: string;
		rows: FactRow[];
	};

	/** Optional secondary bulleted section. */
	detail?: {
		kicker: string;
		heading: string;
		intro?: string;
		items: { title: string; body: string }[];
	};

	/** Optional second photograph, placed mid-article. */
	figure?: {
		image: ImageMetadata;
		alt: string;
		caption: string;
	};

	/** Optional safety callout, rendered in the accent-ruled panel. */
	warning?: {
		heading: string;
		body: string;
	};
}

export const passages: Passage[] = [
	{
		slug: 'great-loop',
		name: 'The Great Loop',
		summary:
			'A 6,000-mile circuit of America’s eastern waterways. Wherever you are on it, we can come to you.',
		cardImage: imgGreatLoopMap,
		cardImageAlt: 'A route map of the Great Loop circuit through the eastern United States',
		metaTitle: 'Great Loop Delivery Captain | Move Your Boat Anywhere on the Loop',
		metaDescription:
			'Yacht delivery anywhere on America’s Great Loop — 6,000 miles of rivers, canals, lakes and coast. Licensed captain and crew come to your boat and move it home.',
		hero: {
			kicker: 'The Great Loop',
			heading: 'Six thousand miles, and we will meet you anywhere on it.',
			lede: 'The Great Loop is a continuous circular boating route through the eastern United States and part of Canada, made up of natural and man-made waterways. If you are anywhere along it, the captain and crew can come to you and help you move your boat home.',
			image: imgGreatLoopMap,
			imageAlt: 'A route map of the Great Loop circuit through the eastern United States',
		},
		body: [
			'Boaters typically run the circuit **counterclockwise**, which keeps the difficult river currents behind them rather than on the nose. Depending on the route chosen through each section, the full loop measures somewhere between 5,200 and 6,000 miles.',
			'Very few people run the whole thing in one season, and that is where deliveries come in. A leg gets abandoned because of weather, a season runs out, a boat is bought mid-loop, or the schedule simply stops cooperating — and the boat needs to be somewhere it is not. We pick up the leg you cannot run.',
			'Because the route strings together so many different kinds of water, the crew and the planning change from section to section: locks and commercial traffic on the rivers, open-water passages on the Gulf and the Atlantic, bridge schedules on the Intracoastal, and canal systems with their own hours and clearances in New York.',
		],
		detail: {
			kicker: 'The circuit',
			heading: 'What the route strings together',
			items: [
				{
					title: 'Great Lakes and the New York canals',
					body: 'Lake Michigan, Lake Erie and Lake Ontario, linked south and east by the New York Canal System and the Hudson River.',
				},
				{
					title: 'The Atlantic side',
					body: 'The Atlantic Ocean and the Atlantic Intracoastal Waterway, from the northeast down the seaboard to Florida.',
				},
				{
					title: 'Florida and the Keys',
					body: 'Around the peninsula, or straight across it on the Okeechobee Waterway if your air draft allows.',
				},
				{
					title: 'The Gulf',
					body: 'The Gulf of Mexico and the Gulf Intracoastal Waterway west to the Mississippi.',
				},
				{
					title: 'The inland rivers',
					body: 'The Mississippi, Ohio, Tennessee, Cumberland and Illinois systems, carrying you back north to the Lakes.',
				},
			],
		},
		figure: {
			image: imgRiverLock,
			alt: 'A river lock with its steel gates closed and concrete chamber walls',
			caption: 'Locks set the pace on the river sections of the Loop.',
		},
	},

	{
		slug: 'bahamas-crossing',
		name: 'Bahamas crossings',
		summary:
			'Florida to the islands and back — the Gulf Stream, the weather window, and the customs paperwork on both ends.',
		cardImage: imgBahamasBeach,
		cardImageAlt:
			'A shaded beach bar deck with a cable-spool table, palm trees and turquoise water beyond',
		metaTitle: 'Bahamas Yacht Delivery | Florida to the Islands by Captain',
		metaDescription:
			'Vessel relocation between Florida and the Bahamas. Gulf Stream timing, sea state, routes and distances, cruising permit fees, and clearing customs in both directions.',
		hero: {
			kicker: 'Bahamas crossings',
			heading: 'The Stream decides when you go.',
			lede: 'Relocating a vessel between Florida and the Bahamas is a short passage with a long list of conditions attached. The crossing itself is not the hard part — picking the day is, and so is the paperwork waiting at both ends.',
			image: imgBahamasBeach,
			imageAlt:
				'A shaded beach bar deck with a cable-spool table, palm trees and turquoise water beyond',
		},
		body: [
			'**The Gulf Stream** runs north off the east coast of Florida at 2.5 to 5.0 knots. That current is the whole problem: a north wind blowing against it stacks the water up into a short, steep, genuinely unpleasant chop, and a crossing that would be comfortable on Tuesday can be miserable on Wednesday for no other reason.',
			'**Sea state** is what we watch. You want less than two to four feet — and remember that significant wave height is an average, not a ceiling. Individual waves may be more than twice it.',
			'**Ships** are the other consideration. The approaches are busy with commercial traffic moving faster than it looks, and a crossing plan has to account for where the shipping lanes are and when you will be in them.',
		],
		facts: {
			heading: 'Bahamas cruising permit fees',
			note: 'Government fees change. Confirm current rates with Bahamas Customs before departure — these were the published figures on the previous site.',
			rows: [
				{ label: 'Not exceeding 34 ft', value: '$150 / 3 months · $300 / 12 months' },
				{ label: '34 – 100 ft', value: '$300 / 3 months · $600 / 12 months' },
				{ label: '100 – 150 ft', value: '$500 / 3 months · $1,000 / 12 months' },
				{ label: '150 – 200 ft', value: '$800 / 3 months · $1,600 / 12 months' },
				{ label: 'Exceeding 200 ft', value: '$1,000 / 3 months · $2,000 / 12 months' },
			],
		},
		detail: {
			kicker: 'Routes',
			heading: 'The usual crossings',
			intro: 'Distances are approximate and depend on your departure marina and the day’s routing.',
			items: [
				{
					title: 'Fort Lauderdale or Miami to Bimini',
					body: 'About 60 miles. The short hop, and the one most often used as a staging leg for everything further east.',
				},
				{
					title: 'To Freeport or Marsh Harbour',
					body: 'About 160 miles. A longer day — or an overnight, depending on the boat’s speed and the window.',
				},
				{
					title: 'What the permit covers',
					body: 'The cruising permit fee includes the fishing permit, attendance and transportation fees for both Bahamas Customs and Immigration officers, and re-entry within 90 days. Expect a customs officer travel fee of roughly $20–50 at some ports of entry.',
				},
			],
		},
		figure: {
			image: imgUsCustoms,
			alt: 'A U.S. Customs and Border Protection sign listing when vessels must report on arrival',
			caption:
				'Every vessel returning from a foreign port must report to U.S. Customs and Border Protection.',
		},
		warning: {
			heading: 'Reporting your return is not optional',
			body: 'Failure to report a vessel’s return to the United States is a federal crime carrying civil and criminal penalties — fines, imprisonment, and seizure and forfeiture of the vessel. Do private yachts have to clear customs coming back to our shores? Yes. Every time.',
		},
	},

	{
		slug: 'okeechobee-waterway',
		name: 'Okeechobee Waterway',
		summary:
			'The 154-mile canal route straight across Florida — five locks, and an air draft limit that decides everything.',
		cardImage: imgOkeechobeeMap,
		cardImageAlt: 'A map of the Okeechobee Waterway crossing the Florida peninsula',
		metaTitle: 'Okeechobee Waterway Delivery | Stuart to Fort Myers',
		metaDescription:
			'Yacht delivery across Florida on the Okeechobee Waterway. 154 miles, five locks, bridge clearances and the 49-foot Port Mayaca limit that decides whether you can cross.',
		hero: {
			kicker: 'Okeechobee Waterway',
			heading: 'Across Florida, if your air draft allows.',
			lede: 'The Okeechobee Waterway is a 154-mile inland route across the lower Florida peninsula, connecting the Atlantic at Stuart to the Gulf of Mexico at Cape Coral. It turns a long trip around the Keys into a short one — for the boats that fit.',
			image: imgOkeechobeeMap,
			imageAlt: 'A map of the Okeechobee Waterway crossing the Florida peninsula',
		},
		body: [
			'As a Florida resident, Captain James Lowe knows the state’s entire 1,300-mile coastline — the Keys, every navigable inlet, and the intracoastal network — and holds specialized expertise in this waterway in particular. If you want to move a vessel between Cape Coral on the Gulf and Stuart on the Atlantic, this is home ground.',
			'**Air draft is the deciding number.** Fixed bridges on the route carry vertical clearances of 54 feet or greater, but the Port Mayaca railroad lift bridge is the limiting structure at **49 feet**, and the lowest cable crossing has an authorised clearance of 56 feet. A sailboat that cannot get under Port Mayaca cannot cross Florida here, and the route becomes the Keys instead.',
			'**Five locks** control the passage, and they keep their own hours: 7:00 AM to 4:30 PM. That, more than distance, sets how the days break up.',
		],
		facts: {
			heading: 'The five locks, east to west',
			note: 'Lock phone numbers as published on the previous site — worth a call ahead for current status and any closures.',
			rows: [
				{ label: 'St. Lucie Lock & Dam — near Stuart', value: '772-287-2665 · 863-662-9148' },
				{
					label: 'Port Mayaca Lock & Dam — near Canal Point',
					value: '561-924-2858 · 863-662-9424',
				},
				{ label: 'Julian Keen Jr. Lock & Dam — Moore Haven', value: '863-946-0414 · 863-662-9533' },
				{ label: 'Ortona Lock & Dam — east of LaBelle', value: '863-675-0616 · 863-662-9846' },
				{
					label: 'W.P. Franklin Lock & Dam — east of Fort Myers',
					value: '239-694-5451 · 863-662-9908',
				},
			],
		},
		figure: {
			image: imgPortMayaca,
			alt: 'The Port Mayaca railroad lift bridge spanning the waterway',
			caption: 'Port Mayaca: 49 feet, and the number that decides whether you cross.',
		},
	},

	{
		slug: 'inland-rivers',
		name: 'Inland rivers',
		summary:
			'The Mississippi system and its tributaries — currents, tows, locks and very few fuel stops.',
		cardImage: imgRiverLock,
		cardImageAlt: 'A river lock with its steel gates closed and concrete chamber walls',
		metaTitle: 'Inland River Yacht Delivery | Mississippi, Ohio, Tennessee',
		metaDescription:
			'Yacht delivery on America’s navigable inland rivers — Mississippi, Ohio, Tennessee, Cumberland, Illinois and the Tenn-Tom. Currents, locks, tows and fuel planning.',
		hero: {
			kicker: 'Inland rivers',
			heading: 'The rivers are their own kind of delivery.',
			lede: 'From Minnesota to the Gulf of Mexico, the navigable inland river system reaches most of the middle of the country. Moving a pleasure boat through it has almost nothing in common with running the coast.',
			image: imgRiverLock,
			imageAlt: 'A river lock with its steel gates closed and concrete chamber walls',
		},
		body: [
			'The routes we run regularly are the Tennessee–Tombigbee Waterway, the Lower Mississippi from New Orleans up through Memphis toward Illinois, the Upper Mississippi as far as Minneapolis and St. Paul, and the Ohio, Tennessee and Illinois systems.',
			'**Current is constant.** Running upstream costs you speed all day, every day, and it changes the day count and therefore the estimate. Running downstream is faster but leaves less margin for error approaching locks and bridges.',
			'**Commercial traffic owns the river.** Tows pushing barge strings need enormous room to stop or turn, and a pleasure boat is expected to know that and stay out of the way. Wakes, blind bends and narrow channels all follow from it.',
			'**Fuel and anchorage are the planning problem.** Stops can be a long way apart, suitable anchorages are limited, and the hazards are the ones you cannot see — submerged logs, shifting bars, and debris after high water.',
		],
		figure: {
			image: imgLogInRiver,
			alt: 'A large waterlogged tree trunk floating half-submerged in a river',
			caption: 'Deadheads like this are the reason river running is a daylight activity.',
		},
	},

	{
		slug: 'gulf-big-bend-crossing',
		name: 'Gulf crossing, Florida’s Big Bend',
		summary:
			'The open-water shortcut across Florida’s Big Bend — and the one leg where you are properly offshore.',
		cardImage: imgBigBendChart,
		cardImageAlt:
			'A nautical chart of Florida’s Gulf coast showing a plotted magenta course across the Big Bend',
		metaTitle: 'Gulf Big Bend Crossing | Carrabelle to Tampa Bay by Captain',
		metaDescription:
			'Crossing Florida’s Big Bend in the Gulf of Mexico — Carrabelle to Crystal River, Tarpon Springs, Clearwater and Tampa. Distances, offshore exposure and emergency procedure.',
		hero: {
			kicker: 'Gulf crossing',
			heading: 'The one leg with no coastline to duck behind.',
			lede: 'Florida’s Big Bend has no intracoastal route. Getting between the Panhandle and the west coast means crossing open Gulf, and at some point on any route you choose you will be at least 65 miles offshore.',
			image: imgBigBendChart,
			imageAlt:
				'A nautical chart of Florida’s Gulf coast showing a plotted magenta course across the Big Bend',
		},
		body: [
			'Crossings depart from **Carrabelle, Florida** and make for Crystal River, Tarpon Springs, Clearwater or St. Petersburg and Tampa depending on the boat and the window.',
			'This is the passage where a lot of owners decide they want a professional aboard, and reasonably so. It is a long run in one hop, weather has nowhere to hide from you, and the boat needs to be genuinely ready — fuel calculated with margin, engines recently serviced, and safety gear that works rather than gear that is aboard.',
		],
		facts: {
			heading: 'Typical distances',
			note: 'Fuel-to-fuel, approximate, and dependent on your actual departure and arrival marinas.',
			rows: [
				{ label: 'Carrabelle → Tarpon Springs', value: '≈ 145 nautical miles' },
				{ label: 'Carrabelle → Clearwater', value: '≈ 154 nautical miles' },
				{ label: 'Carrabelle → Crystal River', value: '≈ 132 nautical miles' },
				{ label: 'Minimum offshore distance', value: '65+ miles, whichever route you take' },
			],
		},
		warning: {
			heading: 'If you need help offshore, do not call 911 first',
			body: 'Call the U.S. Coast Guard on VHF channel 16 or 22A. A 406 MHz satellite EPIRB is strongly recommended for this crossing — on this leg you are beyond the range where a cell phone is a safety plan.',
		},
		figure: {
			image: imgShipsAtAnchor,
			alt: 'Commercial ships at anchor in grey haze, with more vessels on the horizon',
			caption: 'Commercial traffic is part of the picture on any Gulf crossing.',
		},
	},

	{
		slug: 'florida',
		name: 'Florida',
		summary:
			'1,300 miles of coastline, every navigable inlet, and the state 90% of deliveries touch.',
		cardImage: imgSunsetGeorgetown,
		cardImageAlt: 'Sunset over a marina seen from a boat’s deck, with a piling and dock in view',
		metaTitle: 'Florida Yacht Delivery Captain | Gulf, Atlantic, Keys and the ICW',
		metaDescription:
			'Florida yacht delivery by a resident USCG 200-ton master. The Gulf and Atlantic coasts, the Straits, both Intracoastal Waterways, the St. Johns and the Okeechobee.',
		hero: {
			kicker: 'Florida',
			heading: 'Ninety percent of deliveries touch this state.',
			lede: 'Nearly every relocation we run starts in Florida, ends in Florida, or passes through it. As a Florida resident operating out of Port Canaveral and central Florida, this is the water Captain James Lowe knows best.',
			image: imgSunsetGeorgetown,
			imageAlt: 'Sunset over a marina seen from a boat’s deck, with a piling and dock in view',
		},
		body: [
			'The waters covered are the Gulf of Mexico, the Atlantic, the Straits of Florida, both the Gulf and Atlantic Intracoastal Waterways, the St. Johns River, the Suwannee, and the Okeechobee Waterway across the peninsula.',
			'**Shallow water is the constant.** Florida shoals quickly, and it shoals worst exactly where you most need depth — in the approaches to inlets, where the bottom moves between chart editions. Tidal awareness is not optional here, and inlet currents run hard enough to matter to a slow boat.',
			'**The ports are busy.** Ships in Florida ports travel at 25 to 30 knots, which is faster than most people expect and much faster than they can be avoided if you have left it late. Knowing where the traffic is and staying clear of it is routine work on this coast.',
			'The 1,300 miles of coastline include the Keys, every navigable inlet, and the intracoastal network that links them — plus the cross-state shortcut on the Okeechobee for boats whose air draft allows it.',
		],
		figure: {
			image: imgHelmView,
			alt: 'The view forward from a flybridge helm offshore, compass in the foreground and open water ahead',
			caption: 'A typical Florida day: flat water, a long way to go.',
		},
	},
];

export const passagesBySlug: Record<string, Passage> = Object.fromEntries(
	passages.map((p) => [p.slug, p]),
);
