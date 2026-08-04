/**
 * The 22 questions owners actually ask, carried over from the old FAQ page.
 *
 * Grouped so /faq reads as sections rather than one undifferentiated list, and
 * tagged so individual pages can pull the subset that belongs to them (the
 * rates page wants the money questions; the delivery page wants the logistics).
 *
 * These also generate the FAQPage schema, which is why the answers are written
 * to stand alone — a rich result shows the answer without the question's
 * surrounding context.
 */

export type FaqTopic = 'booking' | 'vessel' | 'passage' | 'money';

export interface Faq {
	q: string;
	a: string;
	topic: FaqTopic;
}

export const faqs: Faq[] = [
	/* ── booking ── */
	{
		topic: 'booking',
		q: 'How do I book a delivery?',
		a: 'Start with the delivery form. The vessel and route details on it are what let us chart distances and stops and calculate transit time, so an estimate is not possible without them. Once it is in, call (727) 236-1385 and we will talk it through.',
	},
	{
		topic: 'booking',
		q: 'What happens to the information I submit?',
		a: 'It is kept private and used only to produce your estimate. It is never sold or shared. A deposit is required to get on the schedule.',
	},
	{
		topic: 'booking',
		q: 'What is the difference between a quotation and an estimate?',
		a: 'We can quote you a daily rate for crew — that number is firm. We can only estimate the total number of days a voyage will take, because that depends on weather, the boat and the water.',
	},
	{
		topic: 'booking',
		q: 'What if the weather turns right when my block of time comes up?',
		a: 'Inclement weather typically resolves within a few days, and there are built-in buffer days in the schedule for exactly this. The captain may postpone for weather or for an unsafe vessel, and we make every effort to reschedule on the same terms.',
	},
	{
		topic: 'booking',
		q: 'Where will you deliver?',
		a: 'To marinas and private docks along the U.S. East and Gulf coasts, the inland rivers, the Intracoastal Waterways, the Great Lakes, Florida, the Bahamas, the Caribbean and other ports.',
	},

	/* ── vessel ── */
	{
		topic: 'vessel',
		q: 'What types of boat do you deliver?',
		a: 'For long distances, sailboats over 27 feet and powerboats over 30 feet, and any larger vessel of either kind. Sailing yachts, motor yachts, powerboats, cruisers, trawlers, sportfishermen and commercial vessels.',
	},
	{
		topic: 'vessel',
		q: 'Does the vessel need insurance?',
		a: 'Yes — and check that the existing policy covers operation by a licensed master captain. Not all of them do.',
	},
	{
		topic: 'vessel',
		q: 'Does the vessel need documentation aboard?',
		a: 'Yes. Documentation and/or state registration must be aboard, along with a letter appointing Captain James Lowe as the owner’s agent.',
	},
	{
		topic: 'vessel',
		q: 'Does the vessel need towing cover?',
		a: 'It is a good idea. An existing Sea Tow or BoatU.S. membership is worth having before the boat leaves the dock.',
	},
	{
		topic: 'vessel',
		q: 'What condition should the vessel be in?',
		a: 'As well maintained as possible. The engines need to be in good running order and recently serviced, with a few spare parts aboard.',
	},
	{
		topic: 'vessel',
		q: 'What electronics does she need?',
		a: 'A working depth sounder, a GPS or chartplotter, and a working VHF radio, at minimum.',
	},
	{
		topic: 'vessel',
		q: 'What else has to be on board?',
		a: 'All USCG-required safety equipment: current fire extinguishers, life jackets, and life rafts where required. Safety gear that is aboard but expired does not count.',
	},
	{
		topic: 'vessel',
		q: 'How do I know how much fuel I need?',
		a: 'Multiply the engine hours by the gallons-per-hour burn rate. If you are not sure of your GPH, say so on the form rather than guessing — fuel planning drives the stops.',
	},

	/* ── passage ── */
	{
		topic: 'passage',
		q: 'Can the owner come along?',
		a: 'Yes. Owners are more than welcome to join the relocation, and so is family. Riding along is also the best training you will ever get on your own boat.',
	},
	{
		topic: 'passage',
		q: 'How many crew are on a delivery?',
		a: 'A minimum of one captain and one deckhand, scaling up with the size of the vessel and the demands of the passage. There are normally two people up and on watch at almost all times.',
	},
	{
		topic: 'passage',
		q: 'Can I provide my own deckhand?',
		a: 'No. Our deckhands are trained professionals and employees of Captain James Lowe. Crew selection is a safety decision, not a cost-saving one.',
	},
	{
		topic: 'passage',
		q: 'How many hours a day do you run?',
		a: 'We start at the crack of dawn and aim for at least 10 to 12 hours of travel each day. In winter the days are shorter and we are limited to daylight hours, which lengthens the trip.',
	},
	{
		topic: 'passage',
		q: 'What route will you use?',
		a: 'Whichever route is safest for the boat and the conditions. The captain reserves the right to alter course and route at any time in the interest of safety.',
	},
	{
		topic: 'passage',
		q: 'What happens if there is a mechanical problem?',
		a: 'Mechanical concerns are handled case by case, and we will fix it on the spot where that is possible. Delays for repairs are charged at the agreed daily rate.',
	},
	{
		topic: 'passage',
		q: 'On a sailboat, do you sail or motor?',
		a: 'We sail wherever sailing makes sense. But we are not sailing purists on a delivery — you can be sure the engine is running when the engine is what gets your boat there.',
	},
	{
		topic: 'passage',
		q: 'Why does it take a boat so long to get there?',
		a: 'A sailboat makes about 7 knots — roughly eight miles an hour, about the speed of a bicycle on a park trail. Picture riding a bike from Norfolk to Fort Lauderdale, stopping every night, and you have the shape of it.',
	},
	{
		topic: 'passage',
		q: 'Do you track the vessel?',
		a: 'Vessel tracking was discontinued because it was not being used — most owners already have tracking on their own vessels. You will get regular progress updates from the captain either way.',
	},

	/* ── money ── */
	{
		topic: 'money',
		q: 'What costs extra, beyond the crew’s daily rate?',
		a: 'Everything the boat itself incurs: fuel, marina and dockage fees, repairs, crew travel, provisions aboard, and tips for marina dockhands. These are passed through at cost with no mark-up added.',
	},
	{
		topic: 'money',
		q: 'Do private yachts have to clear U.S. Customs coming home?',
		a: 'Yes. Every vessel returning from a foreign port must report to U.S. Customs and Border Protection. Failure to report is a federal crime carrying fines, imprisonment, and seizure and forfeiture of the vessel.',
	},
];

export const faqSections: { topic: FaqTopic; heading: string; blurb: string }[] = [
	{
		topic: 'booking',
		heading: 'Booking and scheduling',
		blurb: 'How a job gets on the calendar, and what happens when the weather has other ideas.',
	},
	{
		topic: 'vessel',
		heading: 'Your vessel',
		blurb: 'What the boat needs to have, be, and carry before she leaves the dock.',
	},
	{
		topic: 'passage',
		heading: 'On passage',
		blurb: 'Crew, hours, routing, and what a day actually looks like out there.',
	},
	{
		topic: 'money',
		heading: 'Costs and customs',
		blurb: 'What is billed on top of the daily rate, and the paperwork on the way home.',
	},
];

export const faqsByTopic = (topic: FaqTopic) => faqs.filter((f) => f.topic === topic);

/** FAQPage schema for whichever subset a page displays. */
export const faqSchema = (items: Faq[]) => ({
	'@type': 'FAQPage',
	mainEntity: items.map((f) => ({
		'@type': 'Question',
		name: f.q,
		acceptedAnswer: { '@type': 'Answer', text: f.a },
	})),
});
