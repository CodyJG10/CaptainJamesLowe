/**
 * Where the boats go.
 *
 * On the old site this content sat in the footer of all 40 pages — several
 * thousand words of state-by-state keyword text, byte-identical everywhere.
 * Search engines read sitewide boilerplate as boilerplate; repeating it 40
 * times did not make it 40 times more relevant, it made every page look
 * thinner. It lives once here and renders once, at /service-area, where it is
 * genuinely useful to somebody deciding whether we cover their port.
 *
 * Copy is carried over and cleaned up — the original had "Vessel relocaions
 * Maryland", "Virgini Vessel Relocation" and "intercostal" throughout.
 */

export interface Area {
	/** Region name, used as the heading and the search key. */
	name: string;
	/** Grouping for the directory. */
	group: 'State' | 'Coast & region' | 'International';
	/** Waterways worked in this region. */
	waters: string;
	/** Ports, towns and islands — the terms people actually search. */
	places: string[];
}

export const areas: Area[] = [
	/* ───────────────────────── states ───────────────────────── */
	{
		name: 'Alabama',
		group: 'State',
		waters: 'Alabama Gulf Coast, Mobile River and the Tombigbee River, with access to northern Alabama via the Tennessee River.',
		places: ['Mobile', 'Florence', 'Pickwick Lake'],
	},
	{
		name: 'Connecticut',
		group: 'State',
		waters: 'Long Island Sound and the Connecticut River.',
		places: ['Greenwich', 'Stamford', 'Darien', 'Norwalk', 'Westport', 'Fairfield', 'Bridgeport'],
	},
	{
		name: 'Delaware',
		group: 'State',
		waters: 'The Atlantic coast, Delaware Bay, and up the Delaware River into Pennsylvania.',
		places: ['Lewes', 'Rehoboth Beach', 'Dewey Beach', 'Bethany Beach', 'Fenwick Island'],
	},
	{
		name: 'Florida',
		group: 'State',
		waters: 'Gulf to Atlantic in both directions — across the state on the Okeechobee Waterway, or south of the Keys through the Florida Straits.',
		places: [
			'Clearwater', 'Daytona Beach', 'Destin', 'Fort Lauderdale', 'Fort Walton Beach',
			'Islamorada', 'Jacksonville', 'Key Largo', 'Key West', 'Marathon', 'Naples',
			'Palm Beach', 'Panama City', 'Pensacola', 'Port Canaveral', 'Sarasota',
			'St. Augustine', 'St. Petersburg', 'Stuart', 'Tampa', 'West Palm Beach',
		],
	},
	{
		name: 'Georgia',
		group: 'State',
		waters: 'The Atlantic Ocean and the Atlantic Intracoastal Waterway, plus the Tennessee River to Guntersville.',
		places: ['Brunswick', 'Darien', 'Jekyll Island', 'St. Simons Island', 'Savannah', 'Tybee Island'],
	},
	{
		name: 'Illinois',
		group: 'State',
		waters: 'From Lake Michigan to the Mississippi system, covering the Illinois River and the Chicago Sanitary Canal.',
		places: ['Chicago', 'Alton', 'Grafton', 'LaSalle', 'Ottawa', 'Peoria', 'Peru'],
	},
	{
		name: 'Kentucky',
		group: 'State',
		waters: 'The Mississippi, Ohio and Tennessee rivers, and Kentucky Lake.',
		places: ['Augusta', 'Carrollton', 'Frankfort', 'Henderson', 'Owensboro', 'Paducah', 'Warsaw'],
	},
	{
		name: 'Louisiana',
		group: 'State',
		waters: 'The Mississippi River, Lake Pontchartrain, the Gulf coastline, the Intracoastal Waterway and the canals.',
		places: [
			'New Orleans', 'Baton Rouge', 'Abbeville', 'Covington', 'Grand Isle', 'Houma',
			'Lafayette', 'Lake Charles', 'Morgan City', 'Port Fourchon', 'Thibodaux', 'Venice',
		],
	},
	{
		name: 'Maine',
		group: 'State',
		waters: 'The Atlantic coast and Maine’s coastal waterways.',
		places: ['Bar Harbor', 'Bath', 'Belfast', 'Castine', 'Kennebunkport', 'Kittery', 'Portland', 'Rockland', 'York'],
	},
	{
		name: 'Maryland',
		group: 'State',
		waters: 'Chesapeake Bay and its Potomac and Patuxent rivers.',
		places: ['Annapolis', 'Baltimore', 'Cambridge', 'Chesapeake Beach', 'Chestertown', 'Crisfield', 'Washington DC'],
	},
	{
		name: 'Massachusetts',
		group: 'State',
		waters: 'Boston Harbor, Cape Cod Bay and the Atlantic coastline.',
		places: [
			'Boston', 'Chatham', 'Hyannis', 'Provincetown', 'Gloucester', 'Edgartown',
			'Oak Bluffs', 'Vineyard Haven', 'Nantucket', 'Newburyport', 'Plymouth', 'Rockport', 'Salem',
		],
	},
	{
		name: 'Michigan',
		group: 'State',
		waters: 'Lake Michigan and Lake Huron, the Detroit River, Lake St. Clair and Saginaw Bay.',
		places: [
			'Detroit', 'Alpena', 'Bay City', 'Charlevoix', 'Grand Haven', 'Holland', 'Ludington',
			'Mackinaw City', 'Manistee', 'Marquette', 'Monroe', 'Muskegon', 'Petoskey',
			'Port Huron', 'Saugatuck', 'Sault Ste. Marie', 'Traverse City',
		],
	},
	{
		name: 'Mississippi',
		group: 'State',
		waters: 'The Mississippi Gulf Coast, the Mississippi River and the Tennessee–Tombigbee Waterway.',
		places: ['Biloxi', 'Gulfport', 'Natchez', 'Pascagoula', 'Vicksburg'],
	},
	{
		name: 'Missouri',
		group: 'State',
		waters: 'The Missouri River and the Upper Mississippi.',
		places: ['St. Louis', 'Jefferson City', 'Kansas City', 'St. Charles', 'St. Joseph'],
	},
	{
		name: 'New Hampshire',
		group: 'State',
		waters: 'The Atlantic coast and the Piscataqua River.',
		places: ['Dover', 'Hampton', 'Portsmouth'],
	},
	{
		name: 'New Jersey',
		group: 'State',
		waters: 'The Delaware River, the Hudson River and the Atlantic coastline.',
		places: [
			'Atlantic City', 'Cape May', 'Hoboken', 'Jersey City', 'Ocean City',
			'Perth Amboy', 'Red Bank', 'Toms River', 'Trenton', 'Weehawken',
		],
	},
	{
		name: 'New York',
		group: 'State',
		waters: 'The Hudson and East rivers, Long Island Sound, the Atlantic coast, the New York Canal System, Lake Ontario, Lake Erie, the St. Lawrence River and Lake Champlain.',
		places: [
			'New York City', 'Albany', 'Buffalo', 'Montauk', 'Southampton', 'Greenport',
			'Niagara Falls', 'Oswego', 'Poughkeepsie', 'Rochester', 'Syracuse', 'Troy',
		],
	},
	{
		name: 'North Carolina',
		group: 'State',
		waters: 'The Atlantic coastline and intracoastal waterways, including the Alligator River, Pamlico Sound, the Neuse River and Albemarle Sound.',
		places: [
			'Bath', 'Beaufort', 'Belhaven', 'Coinjock', 'Edenton', 'Elizabeth City', 'Manteo',
			'Morehead City', 'New Bern', 'Oriental', 'Outer Banks', 'Southport', 'Swansboro',
			'Washington', 'Wilmington',
		],
	},
	{
		name: 'Rhode Island',
		group: 'State',
		waters: 'Narragansett Bay and the Rhode Island coast.',
		places: [
			'Newport', 'Block Island', 'Bristol', 'Charlestown', 'Jamestown', 'Narragansett',
			'North Kingstown', 'Providence', 'Westerly',
		],
	},
	{
		name: 'South Carolina',
		group: 'State',
		waters: 'The Atlantic coastline and intracoastal waterways.',
		places: [
			'Charleston', 'Beaufort', 'Bluffton', 'Edisto Beach', 'Folly Beach', 'Georgetown',
			'Hilton Head Island', 'Mount Pleasant', 'Myrtle Beach', 'Pawleys Island',
		],
	},
	{
		name: 'Tennessee',
		group: 'State',
		waters: 'The Cumberland, Mississippi and Tennessee rivers, and Kentucky Lake.',
		places: ['Chattanooga', 'Clarksville', 'Knoxville', 'Memphis', 'Nashville'],
	},
	{
		name: 'Texas',
		group: 'State',
		waters: 'The Texas Gulf coast and its bays.',
		places: [
			'Houston', 'Galveston', 'Corpus Christi', 'Kemah', 'Port Aransas', 'Port Isabel',
			'Rockport', 'Seabrook', 'South Padre Island', 'Victoria',
		],
	},
	{
		name: 'Vermont',
		group: 'State',
		waters: 'Lake Champlain.',
		places: ['Burlington'],
	},
	{
		name: 'Virginia',
		group: 'State',
		waters: 'Chesapeake Bay, the intracoastal waterways and the Atlantic coastline.',
		places: [
			'Norfolk', 'Cape Charles', 'Chesapeake', 'Hampton', 'Newport News', 'Portsmouth',
			'Tangier Island', 'Virginia Beach', 'Williamsburg', 'Yorktown',
		],
	},

	/* ────────────────── coasts, rivers and regions ────────────────── */
	{
		name: 'U.S. Atlantic East Coast',
		group: 'Coast & region',
		waters: 'The full seaboard, offshore or inside on the Atlantic Intracoastal Waterway.',
		places: [
			'Maine', 'New Hampshire', 'Massachusetts', 'Rhode Island', 'Connecticut', 'New York',
			'New Jersey', 'Pennsylvania', 'Delaware', 'Maryland', 'Virginia', 'North Carolina',
			'South Carolina', 'Georgia', 'Florida',
		],
	},
	{
		name: 'U.S. Gulf Coast',
		group: 'Coast & region',
		waters: 'Offshore or via the Gulf Intracoastal Waterway.',
		places: ['Texas', 'Louisiana', 'Mississippi', 'Alabama', 'Florida'],
	},
	{
		name: 'Navigable U.S. inland rivers',
		group: 'Coast & region',
		waters: 'The full Mississippi system, upper and lower, from Minnesota to the Gulf of Mexico.',
		places: [
			'Mississippi River', 'Tombigbee', 'Tennessee River', 'Ohio River',
			'Missouri River', 'Illinois River', 'Cumberland River',
		],
	},
	{
		name: 'The Great Lakes',
		group: 'Coast & region',
		waters: 'Lake Michigan, Lake Huron, Lake Erie and Lake Ontario, reached via the rivers or the New York canals.',
		places: ['Chicago', 'Detroit', 'Buffalo', 'Cleveland', 'Milwaukee', 'Traverse City'],
	},

	/* ───────────────────── international ───────────────────── */
	{
		name: 'The Bahamas',
		group: 'International',
		waters: 'Crossings between Florida and the islands, and inter-island deliveries.',
		places: [
			'Abaco Islands', 'Acklins Island', 'Andros Island', 'Bimini Islands', 'Cat Island',
			'Crooked Island', 'Eleuthera', 'Exuma Islands', 'Freeport', 'Grand Bahama',
			'Inagua Islands', 'Long Island', 'Mayaguana', 'Nassau', 'New Providence', 'San Salvador',
		],
	},
	{
		name: 'The Caribbean',
		group: 'International',
		waters: 'Deliveries to and from the islands, including captain-for-hire work in the Lesser Antilles.',
		places: ['St. Maarten', 'Puerto Rico', 'U.S. Virgin Islands', 'British Virgin Islands', 'Turks & Caicos'],
	},
	{
		name: 'Canada',
		group: 'International',
		waters: 'The Great Lakes, the St. Lawrence River and the Canadian sections of the Great Loop.',
		places: ['Ontario', 'Quebec', 'Trent–Severn Waterway', 'Rideau Canal'],
	},
];

export const areaGroups = ['State', 'Coast & region', 'International'] as const;

export const areaCount = areas.length;

/** Every searchable term, flattened — powers the filter on /service-area. */
export const searchIndex = areas.map((a) => ({
	name: a.name,
	haystack: [a.name, a.waters, ...a.places].join(' ').toLowerCase(),
}));
