/**
 * Rates, fees and the worked example.
 *
 * THE BUG THIS FILE FIXES: the old rates page listed current rates of
 * $435 captain / $240 deckhand / $58 provisions, then — directly beneath —
 * worked a full example at $365 / $175 / $35, arriving at $7,900. A prospect
 * reading down the page got a number roughly 20% below what the job actually
 * costs, which is the worst possible place for a stale figure.
 *
 * Everything below is recomputed at the CURRENT rates using the old page's own
 * method, which is preserved exactly:
 *
 *   crew/day      = captain + deckhand
 *   crew total    = crew/day x days aboard
 *   provisions    = per-diem x heads x (days aboard + travel days)
 *   travel pay    = one day at 50% of crew/day + one day at 100%
 *   travel costs  = transport to the vessel + transport home
 *
 * If a rate changes, change it in RATES and every figure on /rates —
 * the example, the totals and the speed table — recalculates from it.
 */

export const RATES = {
	captainPerDay: 435,
	deckhandPerDay: 240,
	provisionsPerPersonPerDay: 58,
} as const;

/** Deposit that reserves the calendar slot and commissions the crew. */
export const DEPOSIT_FRACTION = 1 / 3;

export const rateCards = [
	{
		role: 'Captain',
		amount: RATES.captainPerDay,
		unit: 'per day, starting',
		note: 'USCG 200-ton licensed master.',
	},
	{
		role: 'Deckhand',
		amount: RATES.deckhandPerDay,
		unit: 'per day, per hand',
		note: 'Trained professionals, employed by the captain.',
	},
	{
		role: 'Provisions',
		amount: RATES.provisionsPerPersonPerDay,
		unit: 'per person, per day',
		note: 'Food and water aboard. Varies with location.',
	},
] as const;

export const crewRequirements = [
	{
		vessel: 'Sailboats, any size',
		crew: 'Captain + 1 or more deckhands',
	},
	{
		vessel: 'Sailboats running 24 hours a day',
		crew: 'Captain + 2 or more deckhands',
	},
	{
		vessel: 'Sailboats over 65 ft, or very long passages',
		crew: 'Captain + 2 or more deckhands',
	},
	{
		vessel: 'Powerboats',
		crew: 'Captain + 1 or more deckhands, scaled up with size',
	},
] as const;

/** Costs passed through at cost — no mark-up is added to any of these. */
export const passThroughFees = [
	{
		title: 'Travel to and from the vessel',
		body: 'Round-trip transport by whatever is practical: rental car and fuel, train, airfare, bus, or rideshare. Priced from our base in central Florida to your departure point, and home again from the destination.',
	},
	{
		title: 'Crew travel pay',
		body: 'Based on the distance, the time the travel takes, and what transport is available in that area. Typically one day at half the crew’s daily rate and one at full.',
	},
	{
		title: 'Fuel, oil and consumables',
		body: 'At the owner’s expense. A credit card or fuel deposit is required if you will not be aboard — we need a way to pay for fuel and dockage in your absence.',
	},
	{
		title: 'Dockage',
		body: 'Passed straight through with nothing added. We do not run the boats around the clock, so we sleep aboard in marinas where no suitable anchorage is available.',
	},
	{
		title: 'Accommodation ashore',
		body: 'If the vessel has no proper berths, hotel costs and transport to and from lodging fall to the owner. Occasionally needed during travel to or from the boat as well.',
	},
	{
		title: 'Transit fees, port costs and sailing permits',
		body: 'At the owner’s expense, with no add-on.',
	},
] as const;

/* ─────────────────────────  the worked example  ───────────────────────── */

const EXAMPLE = {
	route: 'Near Norfolk, Virginia → South Florida',
	distanceNm: 800,
	speedKn: 7,
	hoursPerDay: 12,
	crew: { captains: 1, deckhands: 1 },
	travelDays: 2,
	transportToVessel: 550,
	transportHome: 300,
} as const;

const crewPerDay =
	EXAMPLE.crew.captains * RATES.captainPerDay + EXAMPLE.crew.deckhands * RATES.deckhandPerDay;
const heads = EXAMPLE.crew.captains + EXAMPLE.crew.deckhands;

/** Hours under way, then days, rounded up to whole days. */
const sailingHours = EXAMPLE.distanceNm / EXAMPLE.speedKn;
const daysAboard = Math.ceil(sailingHours / EXAMPLE.hoursPerDay);

const crewTotal = crewPerDay * daysAboard;
const provisionsTotal =
	RATES.provisionsPerPersonPerDay * heads * (daysAboard + EXAMPLE.travelDays);
/** One travel day at half rate, one at full — the old page's own convention. */
const travelPay = crewPerDay * 0.5 + crewPerDay;
const travelCosts = EXAMPLE.transportToVessel + EXAMPLE.transportHome;

const exampleTotal = crewTotal + provisionsTotal + travelPay + travelCosts;

const usd = (n: number) =>
	n.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: n % 1 === 0 ? 0 : 2,
		maximumFractionDigits: 2,
	});

export const workedExample = {
	...EXAMPLE,
	sailingHours: Math.round(sailingHours),
	daysAboard,
	crewPerDay,
	heads,
	lines: [
		{
			label: `Crew — ${daysAboard} days at ${usd(crewPerDay)}/day`,
			detail: `1 captain at ${usd(RATES.captainPerDay)} + 1 deckhand at ${usd(RATES.deckhandPerDay)}`,
			value: usd(crewTotal),
		},
		{
			label: `Provisions — ${heads} crew, ${daysAboard + EXAMPLE.travelDays} days`,
			detail: `${usd(RATES.provisionsPerPersonPerDay)} per person per day, including ${EXAMPLE.travelDays} travel days`,
			value: usd(provisionsTotal),
		},
		{
			label: `Crew travel pay — ${EXAMPLE.travelDays} days`,
			detail: 'One day at half the daily crew rate, one at full',
			value: usd(travelPay),
		},
		{
			label: 'Travel costs',
			detail: `${usd(EXAMPLE.transportToVessel)} out to the vessel, ${usd(EXAMPLE.transportHome)} home`,
			value: usd(travelCosts),
		},
	],
	total: usd(exampleTotal),
	deposit: usd(Math.round(exampleTotal * DEPOSIT_FRACTION)),
	balance: usd(exampleTotal - Math.round(exampleTotal * DEPOSIT_FRACTION)),
} as const;

/* ───────────────────  what boat speed does to the bill  ─────────────────── */

/**
 * The single most useful table on the site: the same 800 nm passage costed at
 * different cruising speeds. This is the argument for why the speed you give
 * us has to be honest — an optimistic knot is worth thousands of dollars.
 */
export const speedTable = [6, 7, 8, 10, 12].map((speed) => {
	const days = Math.ceil(EXAMPLE.distanceNm / speed / EXAMPLE.hoursPerDay);
	const total =
		crewPerDay * days +
		RATES.provisionsPerPersonPerDay * heads * (days + EXAMPLE.travelDays) +
		travelPay +
		travelCosts;
	return {
		speed: `${speed} kn`,
		days: `${days} days`,
		total: usd(Math.round(total)),
		isExample: speed === EXAMPLE.speedKn,
	};
});

export const paymentMethods = [
	'Cash in person',
	'Zelle',
	'Wire transfer',
	'Cash App',
	'Credit card',
	'Check',
] as const;

export const paymentTerms = [
	{
		title: 'Deposit',
		body: 'Roughly one third of the estimate reserves your slot on the calendar and commissions the crew. It must be paid in full no later than four days before departure.',
	},
	{
		title: 'Balance',
		body: 'Due on completion of the delivery, including travel and any pass-through expenses. Checks are not accepted for final payment unless agreed in advance.',
	},
	{
		title: 'Quoted at cash price',
		body: 'Estimates are quoted at the discounted cash rate. Wire transfer and Zelle are preferred for the deposit. Where a payment method carries a processing fee, that fee is added to the final bill — the amount is set by the provider, not by us.',
	},
	{
		title: 'Cancellation',
		body: 'If you cancel, 50% of the deposit is non-refundable. The captain may postpone for weather or an unsafe vessel, and every effort is made to reschedule on the same terms.',
	},
] as const;
