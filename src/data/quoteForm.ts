/**
 * The quote form's option lists.
 *
 * Carried over from the old RackForms form, which despite its 2,884px iframe
 * asked exactly the right questions — the vessel spec it collects is what makes
 * an accurate estimate possible. Kept in data so the markup stays readable.
 */

export const US_STATES = [
	'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL',
	'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE',
	'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD',
	'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const;

const range = (from: number, to: number, step = 1) => {
	const out: number[] = [];
	if (from <= to) for (let n = from; n <= to; n += step) out.push(n);
	else for (let n = from; n >= to; n -= step) out.push(n);
	return out;
};

export const YEARS = [...range(new Date().getFullYear() + 1, 1960).map(String)];
export const LENGTHS = [...range(25, 120, 5).map((n) => `${n} ft`), '120+ ft'];
export const BEAMS = [...range(10, 30).map((n) => `${n} ft`), 'More than 30 ft'];
export const DRAFTS = [
	...range(25, 100, 5).map((n) => `${(n / 10).toFixed(1)} ft`),
	'10+ ft',
];

/**
 * Air draft. The annotated options are the ones that actually decide a route —
 * a boat that cannot clear Port Mayaca cannot cross Florida on the Okeechobee,
 * and 65 ft is the ICW ceiling. Labelling them here saves a phone call.
 */
export const BRIDGE_CLEARANCES = [
	'65+ ft — too tall for the ICW',
	'65 ft — ICW maximum',
	'64 ft',
	'62 ft',
	'60 ft',
	'58 ft',
	'55 ft — South Florida ICW maximum',
	'52 ft',
	'50 ft',
	'48 ft — Okeechobee maximum',
	'45 ft',
	'40 ft',
	'35 ft',
	'30 ft',
	'25 ft',
	'19 ft — Great Loop maximum',
	'15 ft',
	'10 ft or less',
];

export const FUEL_CAPACITIES = [
	'Under 50 gal', '50', '100', '150', '200', '300', '400', '500', '750', '1000', '1000+ gal',
];

export const FUEL_BURN = [
	'0.5', '1', '2', '3', '5', '8', '10', '15', '20', '25', '30', '40', '50', '60+',
];

export const SPEEDS = [...range(5, 30).map((n) => `${n} kn`), '30+ kn'];

/**
 * Equipment checks. "Only working equipment should be marked as yes" — the old
 * form's instruction, and a good one: gear that is aboard but dead is worse
 * than gear that is absent, because the crew plans around what you declare.
 */
export const EQUIPMENT: { name: string; label: string; required?: boolean }[] = [
	{ name: 'working_head', label: 'Working head', required: true },
	{ name: 'required_safety_gear', label: 'Required safety gear', required: true },
	{ name: 'spare_filters', label: 'Spare filters aboard', required: true },
	{ name: 'auto_pilot', label: 'Auto pilot', required: true },
	{ name: 'depth_sounder', label: 'Depth sounder', required: true },
	{ name: 'gps', label: 'GPS / chartplotter', required: true },
	{ name: 'vhf', label: 'VHF radio', required: true },
	{ name: 'radar', label: 'Radar' },
	{ name: 'ais', label: 'AIS', required: true },
	{ name: 'ssb_radio', label: 'SSB radio' },
	{ name: 'epirb', label: 'EPIRB' },
	{ name: 'life_raft', label: 'Life raft' },
	{ name: 'sart', label: 'SART' },
	{ name: 'generator', label: 'Generator', required: true },
	{ name: 'air_conditioning', label: 'Air conditioning', required: true },
	{ name: 'microwave', label: 'Microwave', required: true },
	{ name: 'solar_panels', label: 'Solar panels' },
	{ name: 'bow_thruster', label: 'Bow thruster', required: true },
	{ name: 'helm_weather_protected', label: 'Helm weather protected', required: true },
	// The old form asked this too. It is a real question — the crew lives
	// aboard for days — and it tells you something about the man.
	{ name: 'coffee_pot', label: 'Coffee pot' },
];

export const ACCOMMODATION = [
	'State rooms / full galley',
	'Bunks / no refrigeration',
	'None',
];

export const HEARD_ABOUT = ['Search engine', 'Referral', 'Social media', 'Returning client', 'Other'];
