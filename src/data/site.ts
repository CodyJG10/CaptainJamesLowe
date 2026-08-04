/**
 * Single source of truth for the business's identity and contact details.
 *
 * Nothing here may be duplicated into a component. The old site hardcoded the
 * phone number into all 40 pages and it drifted; every consumer imports from
 * this file so a change lands everywhere at once.
 */

export const site = {
	name: 'Captain James Lowe',
	legalName: 'Captain James Lowe Yacht Delivery Services',
	shortName: 'CJL Yacht Delivery',
	license: 'USCG 200-Ton Licensed Master',

	tagline: 'You got a boat, you need to move it — I’m your guy.',
	description:
		'Year-round yacht delivery, relief captain work and hands-on boat handling training by a USCG 200-ton licensed master. Sail and power, moved over the water under their own bottom.',

	url: 'https://www.captainjameslowe.com',

	phoneDisplay: '(727) 236-1385',
	phoneHref: 'tel:+17272361385',
	phoneE164: '+1-727-236-1385',

	/**
	 * No email address was published anywhere on the old site — every route to
	 * the captain went through a form. Left empty deliberately; fill it in and
	 * the footer and LocalBusiness schema will pick it up automatically.
	 * TODO(launch): confirm a public inbox with James.
	 */
	email: '',

	/**
	 * Base of operations.
	 *
	 * TODO(launch): the old site claimed four different bases — a PO Box in
	 * Christmas FL (JSON-LD), a check-mailing address in Bonifay FL (payments
	 * page), Port Canaveral (Florida page), and "central Florida" (rates page).
	 * Christmas FL is central Florida and matches the structured data, so it is
	 * used here as the single truth. Confirm with James before launch.
	 */
	baseLabel: 'Central Florida',
	address: {
		locality: 'Christmas',
		region: 'FL',
		postalCode: '32709',
		country: 'US',
	},

	/** Published on the old site as open 7 days, 06:00–20:00. */
	hours: { opens: '06:00', closes: '20:00' },

	/** USCG Mariner Reference Number, published on the bio page. */
	marinerRef: '2874024',

	socials: {
		facebook: 'https://www.facebook.com/YachtDeliveryService',
		instagram: 'https://www.instagram.com/capt.james.lowe/',
		tiktok: 'https://www.tiktok.com/@1captain4u',
		linkedin: 'https://www.linkedin.com/in/captainjameslowe',
	},

	/**
	 * Google Business Profile URL — paste post-launch and it joins `sameAs`.
	 * e.g. 'https://maps.google.com/?cid=XXXXXXXXXXXX'
	 */
	googleProfileUrl: '',

	/** GA4 measurement ID. The old site had no analytics at all. */
	gaMeasurementId: '',
} as const;

/**
 * Formspree endpoint for the delivery quote form.
 *
 * TODO(launch): create the form and paste its ID. Formspree only accepts
 * submissions from domains allowed on the form, and `_next` redirects to the
 * production /success page — so the end-to-end test has to run on the live
 * domain, not localhost.
 *
 * NOTE: the quote form offers document and photo uploads (the old RackForms
 * one did). File uploads require a **paid** Formspree plan. If James stays on
 * the free tier, set `ALLOW_UPLOADS` to false and the form swaps them for a
 * line telling clients to email documents after submitting.
 */
export const FORMSPREE_FORM_ID = 'YOUR_FORM_ID';
export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
export const ALLOW_UPLOADS = false;

/** Every external profile we can point structured data at. */
export const sameAs: string[] = [
	site.socials.facebook,
	site.socials.instagram, // the old site's JSON-LD omitted Instagram
	site.socials.tiktok,
	site.socials.linkedin,
	...(site.googleProfileUrl ? [site.googleProfileUrl] : []),
];

/** Primary navigation — consumed by Header and the footer's site column. */
export const nav = [
	{ label: 'Yacht delivery', href: '/yacht-delivery' },
	{ label: 'Services', href: '/services' },
	{ label: 'Deliveries', href: '/deliveries' },
	{ label: 'Rates', href: '/rates' },
	{ label: 'Where we go', href: '/service-area' },
	{ label: 'FAQ', href: '/faq' },
	{ label: 'Capt. James', href: '/captain' },
] as const;
