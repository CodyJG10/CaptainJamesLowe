/**
 * The secondary services — everything except the flagship.
 *
 * Yacht delivery itself is NOT in here. It gets a bespoke top-level page at
 * /yacht-delivery: it is the primary keyword, the old site ranked on
 * /yacht_delivery.php, and a shorter URL is worth more than template reuse.
 * The six below share one template at /services/[slug].
 *
 * One entry propagates to: the footer services column, the /services hub grid,
 * the detail page, the related-services rail, and the quote form's job-type
 * checkboxes. Add an entry and all five update.
 */
import type { ImageMetadata } from 'astro';

import imgHelmTwilight from '../assets/cjl/stock/helm-compass-twilight.jpg';
import imgCheckRideForm from '../assets/cjl/site/insurance-check-ride-form.png';
import imgSeaRayHelm from '../assets/cjl/site/sea-ray-helm-station.jpg';
import imgTwinOutboards from '../assets/cjl/site/twin-outboards-offshore.jpg';
import imgWindIndicator from '../assets/cjl/site/wind-indicator.png';
import imgOffshoreWake from '../assets/cjl/site/offshore-wake-calm-day.jpg';
import imgForedeck from '../assets/cjl/stock/foredeck-coastal.jpg';
import imgMotorYachtWake from '../assets/cjl/stock/motor-yacht-underway-wake.jpg';
import imgHelmView from '../assets/cjl/site/helm-view-offshore.jpg';
import imgNoLand from '../assets/cjl/site/no-land-in-sight.jpg';

export interface Bullet {
	title: string;
	body: string;
}

export interface Service {
	slug: string;
	name: string;
	/** Short label for the quote form's job-type checkboxes. */
	formLabel: string;
	/** Card kicker on the hub grid. */
	cardKicker: string;
	/** Doubles as the hub card body and the detail hero's lede. */
	cardBody: string;
	cardImage: ImageMetadata;
	cardImageAlt: string;

	title: string;
	metaTitle: string;
	metaDescription: string;

	hero: {
		kicker: string;
		heading: string;
		lede: string;
		image: ImageMetadata;
		imageAlt: string;
	};

	/** Body paragraphs, set justified in the editorial measure. */
	overview: {
		heading: string;
		body: string[];
	};

	/** Optional bulleted detail block — curriculum, coverage, evaluation areas. */
	detail?: {
		kicker: string;
		heading: string;
		intro?: string;
		items: Bullet[];
	};

	/** Optional pull-quote or emphasis panel. */
	aside?: {
		heading: string;
		body: string;
	};

	cta: {
		heading: string;
		body: string;
	};

	/** Slugs of the two most relevant sibling services. */
	related: string[];
}

export const services: Service[] = [
	{
		slug: 'hands-on-training',
		name: 'Hands-on training',
		formLabel: 'Hands-On-Training',
		cardKicker: 'On your own boat',
		cardBody:
			'Boat handling, navigation, anchoring and systems — taught aboard your own vessel, in your own water, by the captain and a deckhand.',
		cardImage: imgHelmTwilight,
		cardImageAlt: 'A sailboat’s wheel and binnacle compass lit at twilight',
		title: 'Hands-on training',
		metaTitle: 'Boat Handling Training | Hands-On Instruction Aboard Your Own Vessel',
		metaDescription:
			'Private boat handling and navigation training aboard your own boat, taught by a USCG 200-ton master. Docking, anchoring, systems, weather and close-quarters work.',
		hero: {
			kicker: 'Hands-on training',
			heading: 'On your own boat, in your own water.',
			lede: 'Boat handling is the set of skills that move a vessel safely: controlling direction, managing speed, reading waves and current, docking and mooring, turning in tight water, trimming, and being ready when something goes wrong. Sometimes it is as simple as taking the boat from the slip to the fuel dock.',
			image: imgHelmTwilight,
			imageAlt: 'A sailboat’s wheel and binnacle compass lit at twilight',
		},
		overview: {
			heading: 'Training happens where you actually boat',
			body: [
				'We provide personalized training and vessel orientation directly onboard your own boat, and the crew travels to your homeport to do it. Every boat is different — the panel, the thrusters, the way she backs down in a crosswind — and instruction on someone else’s vessel does not transfer cleanly to yours.',
				'The ideal training scenario is a delivery. Owners are welcome to join us for all or part of a passage, and days of continuous running teach more than any afternoon at the dock can. New owners who ride along come off the boat genuinely able to run her.',
				'Training can also be extended into an insurance check ride, where the captain signs off that you are familiar with the installed systems and competent to handle the vessel.',
			],
		},
		detail: {
			kicker: 'Curriculum',
			heading: 'What gets covered',
			intro: 'Tailored to your vessel and your experience — a first-time owner and a seasoned boater on an unfamiliar boat need different days.',
			items: [
				{
					title: 'Basic navigation',
					body: 'Navigational aids and buoyage, chart reading, and working the GPS, chartplotter and the rest of the electronics actually fitted to your boat.',
				},
				{
					title: 'Handling and maneuvering',
					body: 'Docking, anchoring, and turning in tight water. Effective fender placement and the right way to tie a vessel in each situation.',
				},
				{
					title: 'Safety procedures',
					body: 'Emergency procedures, correct use of the safety equipment aboard, and the waterway regulations that apply where you run.',
				},
				{
					title: 'Rules of the road',
					body: 'A working understanding of boating law. For the full picture, take a captain’s course — this covers what you need to stay safe and legal.',
				},
				{
					title: 'Vessel systems orientation',
					body: 'Fuel tanks and filling, the electrical panel, the generator, switching between shore power and generator at the bus bar, engines, gear, sea cocks and strainers, fluid levels, and plumbing down to the sewage pump-out.',
				},
				{
					title: 'Weather and environment',
					body: 'Reading forecasts and understanding what weather does to your boat, so you can pick your days. A day on the water is not always better.',
				},
				{
					title: 'Communication equipment',
					body: 'VHF marine radio procedure, plus compasses and radar — the tools you need when the screens stop being enough.',
				},
			],
		},
		aside: {
			heading: 'Holding still is a skill too',
			body: 'Waiting on a bridge opening, a lock, or a busy fuel dock means keeping the boat stationary in wind, current and traffic. It is one of the most useful things a new owner can learn, and one of the least practiced. Training runs with two crew aboard: you stay at the wheel alongside the captain while the deckhand handles lines — which also lets your own first mate be trained on their half of docking and undocking at the same time.',
		},
		cta: {
			heading: 'Book training on your boat',
			body: 'Tell me the vessel, your homeport and what you want to be able to do by the end of it.',
		},
		related: ['insurance-check-rides', 'captain-for-hire'],
	},

	{
		slug: 'insurance-check-rides',
		name: 'Insurance check rides',
		formLabel: 'Insurance Check Ride',
		cardKicker: 'Underwriter sign-off',
		cardBody:
			'The documented evaluation your insurer asks for before a policy activates — conducted and signed off by a licensed USCG master.',
		cardImage: imgCheckRideForm,
		cardImageAlt: 'The printed captain’s sign-off form used for an insurance check ride',
		title: 'Insurance check rides',
		metaTitle: 'Insurance Check Ride | Captain’s Sign-Off for Boat Insurance',
		metaDescription:
			'USCG-licensed captain’s check ride and sign-off for marine insurers. Systems, safety gear, navigation and close-quarters handling evaluated and documented.',
		hero: {
			kicker: 'Check ride certification',
			heading: 'The sign-off your underwriter is waiting for.',
			lede: 'A check ride is an evaluation — and usually some training — requested by your insurance company. Underwriters routinely require both new boat owners and experienced owners taking on an unfamiliar or larger vessel to have a USCG-licensed captain verify familiarity and competence before a policy activates.',
			image: imgSeaRayHelm,
			imageAlt:
				'An enclosed flybridge helm with twin chartplotter screens, wheel and throttle levers, open water ahead',
		},
		overview: {
			heading: 'What you will be asked to demonstrate',
			body: [
				'The evaluation is practical, not academic. You will be asked to show a basic understanding of navigation; to operate the vessel safely in a channel and in close quarters, including docking; to know how the systems fitted to your boat work, how they are maintained and how the simple faults get fixed; and to know where the required safety equipment is and how to use it.',
				'Where something is not yet solid, it gets trained rather than failed. The point of the ride is to get you signed off and insured, and most owners need a few hours of focused work rather than a verdict.',
			],
		},
		detail: {
			kicker: 'Evaluated',
			heading: 'What the ride covers',
			items: [
				{
					title: 'Engine room',
					body: 'Raw-water thru-hull valves, sea strainers, fuel filters, oil levels, batteries, bilge pumps, generators and coolant systems.',
				},
				{
					title: 'Electrical panel',
					body: 'Switching between shore power and generator, and breaker operation.',
				},
				{
					title: 'Safety equipment',
					body: 'Life jackets, flare kits and fire extinguishers — location, condition and use.',
				},
				{
					title: 'VHF radio',
					body: 'Mayday procedure, calling for assistance, and getting a weather check.',
				},
				{
					title: 'Navigation',
					body: 'Paper and electronic charts, reading latitude and longitude, channel markers, radar, GPS and SSB operation.',
				},
				{
					title: 'Boat handling',
					body: 'Getting underway, backing, anchoring including storm anchoring, twin-screw work, bow thruster use, heavy weather technique, man overboard, running at night, and docking.',
				},
				{
					title: 'Rules of the road',
					body: 'Lights, right of way and whistle signals.',
				},
			],
		},
		cta: {
			heading: 'Get your check ride scheduled',
			body: 'Send the vessel details and what your insurer has asked for, and I will tell you what the ride will involve.',
		},
		related: ['hands-on-training', 'sea-trials'],
	},

	{
		slug: 'relief-captain',
		name: 'Relief captain',
		formLabel: 'Relief Captain',
		cardKicker: 'Owner-assisted passages',
		cardBody:
			'A professional aboard for your own passage — so you keep the helm and the trip, and someone experienced has the watch when it matters.',
		cardImage: imgOffshoreWake,
		cardImageAlt: 'A wide wake trailing astern on calm offshore water',
		title: 'Relief captain and owner-assisted deliveries',
		metaTitle: 'Relief Captain | Owner-Assisted Deliveries and Long Passages',
		metaDescription:
			'A USCG 200-ton master aboard your own passage — relief watches, close-quarters maneuvering and heavy weather experience for owner-assisted deliveries.',
		hero: {
			kicker: 'Relief captain',
			heading: 'Your passage, with a professional aboard.',
			lede: 'Perfect for owners who want an experienced professional on the boat during their own passages. I listen to what you want out of the trip, make sure you understand any limitations honestly, and work with you in detail through every phase of the planning.',
			image: imgNoLand,
			imageAlt:
				'The view forward over a boat’s bow rail and dinghy toward open water and distant channel markers',
		},
		overview: {
			heading: 'Two arrangements, depending on what you want',
			body: [
				'On an **owner-assisted delivery**, you take an active role: navigation, provisioning and standing watches alongside the crew. It is your boat and your trip, and you finish it knowing her far better than you did.',
				'As a **relief captain**, I temporarily take over the duties and responsibilities of the vessel’s captain — for a stretch of time off, for illness, or simply to get the boat moved. Additional professional crew can be supplied for the passage where the boat or the route calls for it.',
				'Either way you get close-quarters maneuvering in unfamiliar harbours and marinas, and someone aboard who has sailed in heavy weather before and is not learning on your boat.',
			],
		},
		cta: {
			heading: 'Planning an owner-assisted passage?',
			body: 'Tell me the route and the dates and we will work out what crew the trip actually needs.',
		},
		related: ['captain-for-hire', 'hands-on-training'],
	},

	{
		slug: 'captain-for-hire',
		name: 'Captain for hire',
		formLabel: 'Captain for Hire',
		cardKicker: 'By the day',
		cardBody:
			'A licensed master for the day — deliveries, sea trials, new-owner orientation, or an extra pair of experienced hands when you need them.',
		cardImage: imgTwinOutboards,
		cardImageAlt: 'Looking aft from the helm seat past twin outboards to the wake astern',
		title: 'Captain for hire',
		metaTitle: 'Captain for Hire | Licensed Boat Captain for Deliveries and Sea Trials',
		metaDescription:
			'Hire a USCG 200-ton licensed captain by the day — vessel relocations, sea trials for dealers and brokers, new-owner orientation, docking and navigation assistance.',
		hero: {
			kicker: 'Captain for hire',
			heading: 'A licensed master, for the day or the week.',
			lede: 'Dealers, brokers and owners hire a captain for all sorts of reasons that are not a full delivery. If you need a professional aboard and you are not sure which service it falls under, this is the one to ask about.',
			image: imgMotorYachtWake,
			imageAlt: 'A flybridge motor yacht underway on open water, throwing a wake',
		},
		overview: {
			heading: 'What that usually means',
			body: [
				'Most single-day captain work comes down to five things: training on navigation and handling; moving a boat from one place to another; assistance with docking, navigation or an emergency; running a sea trial for a prospective buyer; or an insurance check ride.',
				'Brokers and dealers form a steady share of this work. If you need a professional captain to go out on a sea trial with a potential buyer, or to show a new owner what the vessel can actually do, that is a normal week here.',
			],
		},
		aside: {
			heading: 'Note on single-day work',
			body: 'Sea trials and single-day captain jobs are restricted to central and south Florida. Anything further afield is quoted as a delivery, because the crew’s travel is the larger part of the cost.',
		},
		cta: {
			heading: 'Need a captain for a day?',
			body: 'Send the date, the vessel and the location and I will tell you straight away whether it is workable.',
		},
		related: ['sea-trials', 'relief-captain'],
	},

	{
		slug: 'sea-trials',
		name: 'Sea trials',
		formLabel: 'Sea Trial',
		cardKicker: 'Dealers and buyers',
		cardBody:
			'A professional captain aboard for a prospective buyer’s sea trial — an independent read on how the boat actually runs.',
		cardImage: imgForedeck,
		cardImageAlt: 'The foredeck of a motor yacht underway toward a green coastline',
		title: 'Sea trials',
		metaTitle: 'Sea Trial Captain | Independent Captain for Boat Sea Trials in Florida',
		metaDescription:
			'A USCG-licensed captain aboard for your sea trial. Independent evaluation of handling, systems and running condition for buyers, dealers and brokers in central and south Florida.',
		hero: {
			kicker: 'Sea trials',
			heading: 'Find out how she really runs, before you own her.',
			lede: 'A practical evaluation under way will surface concerns a survey at the dock cannot. If you are a dealer or broker who needs a professional captain aboard with a potential buyer, or a buyer who wants someone independent at the wheel, this is that job.',
			image: imgForedeck,
			imageAlt: 'The foredeck of a motor yacht underway toward a green coastline',
		},
		overview: {
			heading: 'What a sea trial is for',
			body: [
				'A sea trial is where the boat stops being a listing and starts being a machine. Engines under load, gear shifting properly, steering and thrusters doing what they should, the way she tracks and backs down, what the panel says when everything is running at once.',
				'For buyers, an independent captain aboard means someone whose only interest is what the boat does. For dealers and brokers, it means the trial is run competently and the buyer’s questions get answered by a licensed professional.',
				'If the boat is being bought to move somewhere else, the trial and the delivery are often quoted together — it is the same crew and the same trip.',
			],
		},
		aside: {
			heading: 'Service area',
			body: 'Sea trials are offered in central and south Florida. Outside that area the work is quoted as a delivery, since crew travel dominates the cost of a single day.',
		},
		cta: {
			heading: 'Booking a sea trial',
			body: 'Send the vessel, the marina and the date. Pre-purchase trials often pair with a delivery quote.',
		},
		related: ['captain-for-hire', 'insurance-check-rides'],
	},

	{
		slug: 'sailboat-delivery',
		name: 'Sailboat delivery',
		formLabel: 'Sailboat Delivery',
		cardKicker: 'Sail specifics',
		cardBody:
			'Sailing yachts move differently, take longer and expose the crew — which changes the crew, the schedule and the estimate.',
		cardImage: imgWindIndicator,
		cardImageAlt: 'A masthead wind direction and velocity indicator display',
		title: 'A sailboat delivery perspective',
		metaTitle: 'Sailboat Delivery Captain | Sailing Yacht Relocation by Licensed Master',
		metaDescription:
			'Sailing yacht deliveries by a USCG 200-ton master with auxiliary sail endorsement. Why sail passages differ from power, and what that means for crew, timing and cost.',
		hero: {
			kicker: 'Sailboat delivery',
			heading: 'Sail is a different delivery.',
			lede: 'Sailboat deliveries differ from motor vessel deliveries in ways that matter to your estimate. Speed, exposure, the crew a boat needs, and how comfortable those days actually are — none of it maps across from power.',
			image: imgWindIndicator,
			imageAlt: 'A masthead wind direction and velocity indicator display',
		},
		overview: {
			heading: 'What changes when there is a rig',
			body: [
				'**Speed sets everything.** A sailing vessel typically makes 5 to 7 knots. That single number drives the day count, and the day count drives the price. It is also why the boat speed you give me has to be honest rather than optimistic.',
				'**The crew is exposed.** Sail handling happens on deck in whatever the weather is doing, and there is more of it than a power delivery involves. Sailboats of any size take a captain plus at least one deckhand; running around the clock, or anything over 65 feet, takes a captain plus two or more.',
				'**Air draft becomes a constraint.** Mast height decides which bridges and overhead power lines you can pass beneath, and that reshapes the route long before departure. On the Okeechobee Waterway it is the deciding factor.',
				'We will always sail where sailing makes sense. But we are not sailing purists on a delivery — the engine runs when the engine gets the boat there, and the schedule is the point.',
			],
		},
		cta: {
			heading: 'Moving a sailing yacht?',
			body: 'Send her length, draft, air draft and honest cruising speed, and the route you have in mind.',
		},
		related: ['relief-captain', 'hands-on-training'],
	},
];

export const servicesBySlug: Record<string, Service> = Object.fromEntries(
	services.map((s) => [s.slug, s]),
);

/** Job-type options on the quote form — the six above plus the flagship. */
export const jobTypes = [
	'Yacht Delivery',
	...services.map((s) => s.formLabel),
] as const;

/** Photograph used by the /services hub hero. */
export { imgHelmView as servicesHubImage };
