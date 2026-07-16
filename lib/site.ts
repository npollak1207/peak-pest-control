export const site = {
  name: "Peak Pest Control",
  cityShort: "Reno",
  phone: "(775) 446-6199",
  phoneHref: "tel:+17754466199",
  email: "info@peakpestreno.com",
  googleReviewUrl: "https://share.google/ur2X7vlYxxE7uvPwi",
  license: "NV LIC #7162",
  street: "1455 Deming Way Unit #26",
  city: "Sparks",
  state: "NV",
  zip: "89431",
  address: "1455 Deming Way Unit #26, Sparks, NV 89431",
  hours: "Mon–Thu 8am–5pm · Fri 8am–12pm · Sat–Sun closed",
  url: "https://peakpestreno.com",
  geo: { lat: 39.5497, lng: -119.7215 },
  // --- SEO / structured data ---
  priceRange: "$$",
  logo: "/peak-logo.png",
  image: "/images/team.jpg", // real photo used for LocalBusiness/OG imagery
  // Google Business Profile Place ID. Used by lib/rating.ts to pull the live
  // rating from the Places API (needs GOOGLE_PLACES_API_KEY set in the env).
  googlePlaceId: "ChIJ1QUOWORRyoARbxLPYuQBUg4",
  // Fallback Google rating, shown when the live Places API fetch is unavailable
  // (no API key, network error). Keep it roughly in sync with Google.
  rating: { value: "4.8", count: 696 },
  // Public social & review profiles, linked from the footer.
  social: {
    instagram: "https://www.instagram.com/peakpestreno/",
    facebook: "https://www.facebook.com/peakpestreno",
  },
  // Profiles that prove this is the same business (helps Google connect the
  // site to your Google Business Profile). Add Yelp/BBB URLs here as they go live.
  sameAs: [
    "https://share.google/ur2X7vlYxxE7uvPwi",
    "https://www.instagram.com/peakpestreno/",
    "https://www.facebook.com/peakpestreno",
  ],
  // Paste the token from Google Search Console (URL-prefix property) here to
  // verify ownership, e.g. "abc123...". Leave blank until you have it.
  googleSiteVerification: "",
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Pests", href: "/pests" },
  { label: "About", href: "/about" },
  { label: "Service Area", href: "/service-areas" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Local landing pages. County/ZIP data is real; copy is regional/high-desert accurate.
export type ServiceArea = {
  slug: string;
  name: string;
  county: string;
  zips: string[];
  blurb: string;
  about: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "reno",
    name: "Reno",
    county: "Washoe County",
    zips: ["89501", "89502", "89503", "89506", "89509", "89511", "89512", "89519", "89521", "89523"],
    blurb: "From Midtown to the far northwest suburbs, we keep Reno homes and businesses protected year-round.",
    about: "Reno is the largest city in northern Nevada and the heart of Washoe County. From Midtown and the Old Southwest to Somersett and the northwest valleys, homes here face ants, spiders, rodents, and the occasional scorpion, especially where neighborhoods back up to open desert or the Truckee River.",
  },
  {
    slug: "sparks",
    name: "Sparks",
    county: "Washoe County",
    zips: ["89431", "89434", "89436", "89441"],
    blurb: "Our home base. We know Sparks neighborhoods, and the pests that come with them, inside and out.",
    about: "Sparks is our home base in Washoe County, just east of Reno. We know its neighborhoods, from Victorian Square and the Marina to Wingfield Springs, and the rodents, ants, and spiders that come with the area's mix of established and fast-growing developments.",
  },
  {
    slug: "carson-city",
    name: "Carson City",
    county: "Carson City",
    zips: ["89701", "89703", "89705", "89706"],
    blurb: "Trusted pest control for Nevada's capital, from historic downtown to the newer developments.",
    about: "Nevada's capital sits in the Eagle Valley at the base of the Sierra. Carson City's blend of historic downtown homes and newer subdivisions sees everything from spiders and ants to rodents pushing indoors as the seasons change.",
  },
  {
    slug: "spanish-springs",
    name: "Spanish Springs",
    county: "Washoe County",
    zips: ["89436", "89441"],
    blurb: "Protecting the growing Spanish Springs valley from ants, spiders, rodents, and desert pests.",
    about: "Spanish Springs is one of the fastest-growing communities in Washoe County, just north of Sparks. New construction on the desert's edge means homes here regularly deal with ants, spiders, crickets, and rodents looking for a way in.",
  },
  {
    slug: "sun-valley",
    name: "Sun Valley",
    county: "Washoe County",
    zips: ["89433"],
    blurb: "Dependable, affordable pest control for Sun Valley homes and rentals.",
    about: "Sun Valley is an unincorporated Washoe County community tucked between Reno and Sparks. Its mix of manufactured and single-family homes benefits from affordable, dependable pest control for ants, spiders, and rodents.",
  },
  {
    slug: "cold-springs",
    name: "Cold Springs",
    county: "Washoe County",
    zips: ["89508"],
    blurb: "Serving the Cold Springs community with same-day service and a satisfaction guarantee.",
    about: "Cold Springs sits in the high desert of northwest Washoe County along US-395. Homes backing up to open range and sagebrush commonly see rodents, spiders, and seasonal insect invaders.",
  },
  {
    slug: "dayton",
    name: "Dayton",
    county: "Lyon County",
    zips: ["89403"],
    blurb: "Keeping Dayton homes near the Carson River free of rodents, spiders, and seasonal invaders.",
    about: "Dayton is a historic town in Lyon County along the Carson River, southeast of the Reno metro. Riverside and desert-edge properties here face rodents, spiders, ants, and occasional wasps.",
  },
  {
    slug: "fernley",
    name: "Fernley",
    county: "Lyon County",
    zips: ["89408"],
    blurb: "Reliable pest and rodent control for Fernley households and local businesses.",
    about: "Fernley is a growing Lyon County city east of Sparks along I-80. Its mix of homes, farms, and warehouses sees rodents, spiders, ants, and wasps throughout the year.",
  },
  {
    slug: "gardnerville",
    name: "Gardnerville",
    county: "Douglas County",
    zips: ["89410", "89460"],
    blurb: "Carson Valley pest control built for Gardnerville's rural and residential properties.",
    about: "Gardnerville anchors the Carson Valley in Douglas County. Its rural and residential properties near ranchland and the Sierra foothills commonly deal with rodents, spiders, ants, and wasps around eaves and outbuildings.",
  },
  {
    slug: "minden",
    name: "Minden",
    county: "Douglas County",
    zips: ["89423"],
    blurb: "Protecting Minden homes and the surrounding Carson Valley with eco-friendly treatments.",
    about: "Minden, the Douglas County seat, sits alongside Gardnerville in the scenic Carson Valley. Homes here see the usual high-desert pests, rodents, spiders, and ants, plus wasps around eaves and sheds.",
  },
  {
    slug: "silver-springs",
    name: "Silver Springs",
    county: "Lyon County",
    zips: ["89429"],
    blurb: "Straightforward, guaranteed pest control for the Silver Springs area.",
    about: "Silver Springs is a Lyon County community at the junction of US-50 and Alt-95. Its open, high-desert setting means rodents, spiders, and seasonal insects are common concerns for local homes.",
  },
  {
    slug: "virginia-city",
    name: "Virginia City",
    county: "Storey County",
    zips: ["89440"],
    blurb: "Pest and rodent control for historic Virginia City homes and businesses on the Comstock.",
    about: "Virginia City is the historic heart of Storey County on the Comstock Lode. Older homes and businesses here are especially prone to rodents and spiders that exploit gaps in aging construction.",
  },
];

export const faqs = [
  {
    q: "What products do you use around kids and pets?",
    a: "We use EPA-registered products, applied precisely per label and only where pests travel, not where your family plays. We're happy to walk you through exactly what we use, along with any dry times and re-entry guidance, before treating.",
  },
  {
    q: "How fast can you come out?",
    a: "In most cases, same day. Call before noon and we'll do our best to get a technician to you that afternoon. Otherwise we'll almost always have you scheduled within a day or two.",
  },
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. Our recurring service keeps you protected year-round, but you're never locked in. You can pause or cancel anytime. We'd rather earn your business every visit.",
  },
  {
    q: "What does the guarantee actually cover?",
    a: "If pests come back between your scheduled visits, so do we. We'll re-treat your property free of charge. No trip fees, no arguing, no extra invoice.",
  },
  {
    q: "What areas do you serve?",
    a: "We're based in Sparks and cover Reno, Sparks, Carson City, Spanish Springs, Sun Valley, and communities across northern Nevada. Not sure if you're in our zone? Give us a call and we'll let you know.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Absolutely. Peak is fully licensed and insured in Nevada (license #7162). You'll always get a professional, background-checked technician at your door.",
  },
];

// Services. Each entry powers a card on the homepage/hub AND its own
// /services/[slug] detail page.
export type ServiceItem = {
  slug: string;
  title: string; // full name, e.g. "Residential Pest Control"
  desc: string; // one-line card blurb
  icon: string;
  intro: string; // detail-page hero subtitle
  about: string; // regional paragraph
  includes: string[]; // what the service covers
  goodFor: string[]; // who it's a fit for
};

export const services: ServiceItem[] = [
  {
    slug: "residential",
    title: "Residential Pest Control",
    desc: "Year-round protection that keeps your home a no-fly, no-crawl zone for the whole family.",
    icon: "home",
    intro:
      "Comprehensive pest control that keeps your Reno or Sparks home protected in every season.",
    about:
      "Your home is the one place pests should never feel welcome. Our residential program puts a protective barrier around your house, treats the interior trouble spots, and adapts to what northern Nevada throws at you each season, ants and spiders in summer, rodents and box elder bugs as it cools. Every visit is backed by our re-treatment guarantee, so if something slips through, we come back free.",
    includes: [
      "Interior treatment of kitchens, baths, and entry points",
      "Exterior barrier around the foundation and eaves",
      "De-webbing and wasp-nest knockdown",
      "Free re-treats between scheduled visits",
    ],
    goodFor: [
      "Homeowners who want year-round prevention",
      "Families with kids and pets",
      "Homes backing up to open desert or the river",
      "Anyone tired of one-off treatments that don't last",
    ],
  },
  {
    slug: "commercial",
    title: "Commercial Pest Control",
    desc: "Discreet, scheduled service that protects your reputation and passes inspections.",
    icon: "building",
    intro:
      "Discreet, documented pest control that protects your customers, your staff, and your reputation.",
    about:
      "For a business, a single pest sighting can cost you a customer, or a health score. Peak provides scheduled, low-profile commercial service for restaurants, offices, retail, and warehouses across the Reno-Sparks area, with the documentation you need for inspections and audits. We work around your hours so service never interrupts your business.",
    includes: [
      "Scheduled service around your business hours",
      "Inspection-ready documentation and service logs",
      "Interior, exterior, and dock/receiving coverage",
      "A dedicated technician who knows your site",
    ],
    goodFor: [
      "Restaurants, cafes, and food service",
      "Offices, retail, and property managers",
      "Warehouses and distribution centers",
      "Any business that faces health inspections",
    ],
  },
  {
    slug: "rodent-control",
    title: "Rodent Control",
    desc: "Trapping, exclusion, and sealing to evict mice and rats, and keep them out for good.",
    icon: "rodent",
    intro:
      "Trapping, exclusion, and sealing that evicts mice and rats, and keeps the next ones out.",
    about:
      "When the high desert cools, mice and rats push into Reno and Sparks homes through gaps as small as a dime. Real rodent control isn't just traps, it's finding and sealing the entry points so the problem doesn't come back. We inspect, exclude, trap, and monitor until the activity is gone.",
    includes: [
      "Full inspection for entry points and runways",
      "Sealing and exclusion of gaps and voids",
      "Strategic trapping and baiting program",
      "Follow-up monitoring until they're gone",
    ],
    goodFor: [
      "Homes hearing scratching in walls or attics",
      "Garages, crawl spaces, and older houses",
      "Properties near fields, the river, or open range",
      "Anyone who's found droppings or gnaw marks",
    ],
  },
  {
    slug: "ant-control",
    title: "Ant Control",
    desc: "Targeted treatments that wipe out the colony at the source, not just the scouts you see.",
    icon: "ant",
    intro:
      "Colony-level ant control that stops the trail at the source, not just the scouts on your counter.",
    about:
      "Ants are the #1 call we get in Reno and Sparks. Spraying the ones you see rarely works, the colony just makes more. We identify the species, bait the workers so they carry treatment back to the nest, and break the trail at your foundation.",
    includes: [
      "Species ID and nest/entry-point inspection",
      "Targeted baits, applied per label, that reach the colony",
      "Exterior perimeter treatment",
      "Free re-treats if the trail returns",
    ],
    goodFor: [
      "Kitchens and baths with recurring ant trails",
      "Homes with pavement or odorous house ants",
      "Properties near older trees (carpenter ants)",
      "Anyone whose store-bought sprays aren't holding",
    ],
  },
  {
    slug: "spider-control",
    title: "Spider Control",
    desc: "Knock down webs and the insects that feed them for cleaner corners and eaves.",
    icon: "spider",
    intro:
      "Web knockdown plus insect control, because spiders come inside chasing other bugs.",
    about:
      "Northern Nevada's dry climate is prime spider country. The vast majority are harmless nuisance spiders, but the black widow, the one spider of real medical concern in our area, does turn up in garages, woodpiles, and meter boxes. Heavy webbing anywhere also signals a bigger insect problem underneath. We de-web, treat harborage, and cut off the food source so they don't come back.",
    includes: [
      "De-webbing of eaves, corners, and entryways",
      "Treatment of cracks, voids, and harborage",
      "Reduction of the insects spiders feed on",
      "Exterior barrier to intercept wanderers",
    ],
    goodFor: [
      "Homes with webbing in eaves and garages",
      "Properties seeing widow or wolf spiders",
      "Late-summer and fall spider surges",
      "Anyone uneasy about spiders indoors",
    ],
  },
  {
    slug: "wasps-hornets",
    title: "Wasp & Hornet Control",
    desc: "Safe nest removal and prevention around eaves, decks, and play areas.",
    icon: "wasp",
    intro:
      "Safe nest removal and preventive treatment around eaves, decks, and play areas.",
    about:
      "Warm Reno-Sparks summers bring paper wasps to eaves and aggressive yellow jackets to yards and ground nests. A disturbed nest can send dozens of stinging insects at once, so removal is best left to the right gear and approach. We remove nests safely and treat the spots most likely to be rebuilt.",
    includes: [
      "Locating nests, including hidden and ground nests",
      "Safe treatment and removal with proper protection",
      "Knockdown of accessible nests",
      "Preventive eave treatment to stop rebuilds",
    ],
    goodFor: [
      "Nests under eaves, soffits, or in shrubs",
      "Yellow jackets around patios or trash areas",
      "Homes with kids, pets, or allergy concerns",
      "Late-summer stinging-insect activity",
    ],
  },
  {
    slug: "insect-control",
    title: "Insect Control",
    desc: "Roaches, earwigs, silverfish, crickets, a defensive barrier around your property.",
    icon: "bug",
    intro:
      "A defensive barrier against the roaches, earwigs, silverfish, and crickets of the high desert.",
    about:
      "Beyond ants and spiders, the valley sees roaches in warm damp spots, earwigs and silverfish chasing moisture, and crickets pushing in every fall. We treat the harborage and entry points and set a seasonal perimeter so the general bug pressure stays outside where it belongs.",
    includes: [
      "Perimeter and foundation barrier treatment",
      "Targeted treatment of cracks and harborage",
      "Entry-point sealing around doors and vents",
      "Seasonal timing ahead of fall pushes",
    ],
    goodFor: [
      "Roaches in kitchens, baths, or drains",
      "Earwigs and silverfish near moisture",
      "Fall cricket invasions of garages and basements",
      "Homes wanting broad, year-round coverage",
    ],
  },
  {
    slug: "weed-control",
    title: "Weed Control",
    desc: "Pre- and post-emergent treatments to keep rock, gravel, and beds clean all season.",
    icon: "weed",
    intro:
      "Pre- and post-emergent weed treatment that keeps rock, gravel, and beds clean all season.",
    about:
      "Weeds take over Reno and Sparks landscaping fast, especially in rock and gravel where they're a pain to pull. Our weed program combines pre-emergent, to stop seeds before they sprout, with post-emergent to knock down what's already up, timed for the high-desert season. It pairs perfectly with our recurring pest plans.",
    includes: [
      "Pre-emergent to stop weeds before they sprout",
      "Post-emergent knockdown of existing weeds",
      "Rock, gravel, bed, and hardscape coverage",
      "Seasonal timing for lasting results",
    ],
    goodFor: [
      "Rock and gravel yards that weed over fast",
      "Homeowners tired of hand-pulling",
      "Landscaping beds and hardscape edges",
      "Anyone bundling weed with pest control",
    ],
  },
];

// Recurring service plans. All billed monthly, no long-term contract.
export type Plan = {
  name: string;
  tagline: string;
  price: number; // dollars per month
  cadence: string; // service frequency
  features: string[];
  featured?: boolean;
  cta: string;
};

export const plans: Plan[] = [
  {
    name: "Pest Control",
    tagline: "Year-round protection against the pests that come with high-desert living.",
    price: 65,
    cadence: "Quarterly service",
    features: [
      "Interior & exterior treatment every quarter",
      "Ants, spiders, roaches, crickets, wasps & more",
      "Full exterior barrier around your foundation",
      "Free re-treats if pests return between visits",
      "No contract, cancel anytime",
    ],
    cta: "Get started",
  },
  {
    name: "Pest + Weed",
    tagline: "Our most popular plan, more frequent visits plus weed control for a clean yard.",
    price: 125,
    cadence: "Bi-monthly service",
    features: [
      "Everything in Pest Control",
      "Service every other month for a stronger barrier",
      "Pre- & post-emergent weed control",
      "Keeps rock, gravel & beds weed-free all season",
      "Free re-treats between visits",
    ],
    featured: true,
    cta: "Get started",
  },
  {
    name: "Complete Property",
    tagline: "Total protection for your home, yard, and landscape in one plan.",
    price: 170,
    cadence: "Bi-monthly service",
    features: [
      "Everything in Pest + Weed",
      "Tree & shrub treatment to protect your landscape",
      "Guards ornamentals against damaging insects",
      "Full-property care from foundation to canopy",
      "Free re-treats between visits",
    ],
    cta: "Get started",
  },
];

export const pillars = [
  {
    n: "01",
    title: "Local & Trusted",
    desc: "We live, work, and raise our families in northern Nevada. Your neighbors are our customers.",
  },
  {
    n: "02",
    title: "Eco-Conscious Products",
    desc: "EPA-registered treatments applied precisely per label, tough on pests and targeted where they travel.",
  },
  {
    n: "03",
    title: "Same-Day Service",
    desc: "See a pest today? Call before noon and we'll do our best to be out the same day.",
  },
  {
    n: "04",
    title: "Locally Owned",
    desc: "Owned and operated right here in northern Nevada, with the accountability you'd expect from a neighbor.",
  },
];

// Pest library. Each entry powers its own /pests/[slug] landing page.
export type Pest = {
  slug: string;
  name: string;
  icon: string;
  blurb: string; // one-line summary for cards
  season: string; // when they're most active in northern NV
  risk: "Low" | "Moderate" | "High"; // severity shown in the hero facts panel
  activeMonths: number[]; // months (1-12) of typical peak activity in northern NV
  size: string; // typical size, short (fits a field-notes panel row)
  hideout: string; // where they hide, short (fits a field-notes panel row)
  diy: string; // why DIY falls short, short (fits a field-notes panel row)
  service: string; // slug of the Peak service that treats this pest
  intro: string; // hero subtitle
  about: string; // regional paragraph
  signs: string[]; // signs of an infestation
  risks: string; // why it matters
  treatment: string[]; // how Peak treats it
};

export const pests: Pest[] = [
  {
    slug: "ants",
    name: "Ants",
    icon: "ant",
    blurb: "The #1 call we get, pavement, odorous house, and carpenter ants invading Reno & Sparks kitchens.",
    season: "Spring through early fall",
    risk: "Moderate",
    activeMonths: [3, 4, 5, 6, 7, 8, 9],
    size: "1.5–13 mm",
    hideout: "Wall voids & slab cracks",
    diy: "Sprays miss the colony",
    service: "ant-control",
    intro: "Ants are the most common pest we treat in Reno and Sparks. We track them back to the nest and stop the trail at the source.",
    about:
      "When the high-desert heat sets in, ants march indoors looking for water and food, which is why Reno and Sparks kitchens light up with trails every spring and summer. The valley sees pavement ants along driveways and foundations, odorous house ants around sinks and pantries, and destructive carpenter ants where homes back up to older trees or damp wood. Spraying the ones you see rarely works; the colony keeps producing more.",
    signs: [
      "Trails of ants along counters, baseboards, or window sills",
      "Small piles of dirt or sand between pavers and foundation cracks",
      "Ants swarming pet food, sweets, or a leaky faucet",
      "Faint sawdust piles near wood trim (a carpenter ant sign)",
    ],
    risks:
      "Most valley ants are a nuisance and can contaminate food, but carpenter ants tunnel through structural wood and can cause real damage if they're left alone for a season or two.",
    treatment: [
      "Inspect to identify the species and find the nest and entry points",
      "Apply targeted baits, per label, that workers carry back to the colony",
      "Treat the exterior perimeter to break the trail at the foundation",
      "Follow up and re-treat free between visits if they return",
    ],
  },
  {
    slug: "spiders",
    name: "Spiders",
    icon: "spider",
    blurb: "From harmless cellar spiders to hobo and wolf spiders drawn indoors across the high desert.",
    season: "Late summer into fall",
    risk: "Low",
    activeMonths: [7, 8, 9, 10, 11],
    size: "3–15 mm body",
    hideout: "Eaves, corners & garages",
    diy: "Webs come right back",
    service: "spider-control",
    intro: "Northern Nevada's dry climate is prime spider territory. We knock down webs and cut off the insects they hunt.",
    about:
      "The Reno-Sparks high desert is ideal spider habitat, dry, warm, and full of the insects spiders feed on. Most of what you'll find around the home is harmless (cellar and orb-weaver spiders), but hobo and wolf spiders regularly wander indoors, especially as nights cool in late summer and fall. Because spiders come inside chasing other bugs, real control means treating the whole pest picture, not just the webs.",
    signs: [
      "Webbing in corners, eaves, garages, and window wells",
      "Egg sacs tucked into sheltered corners and storage areas",
      "Spiders appearing indoors as the weather cools",
      "A general increase in other insects (their food source)",
    ],
    risks:
      "The vast majority of northern Nevada spiders are harmless, but bites can still cause reactions, and heavy webbing around a home is a sign of a larger insect problem underneath.",
    treatment: [
      "De-web eaves, corners, and entryways during service",
      "Treat cracks, voids, and harborage where spiders hide",
      "Reduce the insect population they rely on for food",
      "Set an exterior barrier to keep them from coming back in",
    ],
  },
  {
    slug: "black-widows",
    name: "Black Widows",
    icon: "widow",
    blurb: "The one venomous spider common in the Reno area, found in garages, woodpiles, and window wells.",
    season: "Warm months, hiding year-round",
    risk: "High",
    activeMonths: [4, 5, 6, 7, 8, 9, 10],
    size: "8–13 mm body",
    hideout: "Woodpiles, sheds & walls",
    diy: "Risky to disturb",
    service: "spider-control",
    intro: "Black widows are the venomous spider we actually see in northern Nevada. We treat their hiding spots directly and safely.",
    about:
      "Black widows are the one genuinely dangerous spider that's common around Reno, Sparks, and Carson City. They like dark, undisturbed spots, garages, sheds, woodpiles, window wells, crawl spaces, and the underside of patio furniture and BBQs. You'll recognize the glossy black body and red hourglass, and a messy, extremely strong web. Because they hide in exactly the places people reach into, they're worth taking seriously.",
    signs: [
      "Glossy black spiders with a red hourglass marking underneath",
      "Irregular, unusually strong webbing low to the ground",
      "Round, papery egg sacs in sheltered corners",
      "Activity in garages, sheds, woodpiles, and window wells",
    ],
    risks:
      "Black widow venom is medically significant, bites can cause severe pain, cramping, and illness, and are especially risky for children, seniors, and pets. These are a pest to treat, not to ignore.",
    treatment: [
      "Inspect and directly treat known harborage spots",
      "Remove webs and egg sacs where they're accessible",
      "Apply targeted product into cracks, voids, and shelters",
      "Set an exterior barrier and check back on a schedule",
    ],
  },
  {
    slug: "cockroaches",
    name: "Cockroaches",
    icon: "roach",
    blurb: "German and Oriental roaches hiding in warm, moist spots inside Reno & Sparks homes and businesses.",
    season: "Year-round indoors",
    risk: "High",
    activeMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    size: "12–30 mm",
    hideout: "Drains & warm appliances",
    diy: "Foggers scatter them",
    service: "insect-control",
    intro: "Roaches breed fast and hide in warmth and moisture. We hit the harborage and break the reproduction cycle.",
    about:
      "Cockroaches survive northern Nevada's dry climate by living where it's warm and moist, kitchens, bathrooms, behind appliances, and in drains. German roaches spread quickly indoors and are common in multi-unit housing and restaurants, while Oriental roaches come up through drains and cluster in basements and crawl spaces. A few roaches can become an infestation in weeks, so speed and thoroughness matter.",
    signs: [
      "Roaches scattering when you turn on a light at night",
      "Pepper-like droppings in cabinets, drawers, and along edges",
      "A musty, oily odor in heavily infested areas",
      "Egg cases (oothecae) behind appliances and in cracks",
    ],
    risks:
      "Cockroaches contaminate food and surfaces, spread bacteria, and are a leading trigger for asthma and allergies, a real health concern, especially for kids.",
    treatment: [
      "Inspect to find harborage, moisture sources, and entry points",
      "Apply gel baits and targeted treatments into cracks and voids",
      "Break the breeding cycle with a follow-up schedule",
      "Recommend simple moisture and sanitation fixes to keep them out",
    ],
  },
  {
    slug: "mice-and-rats",
    name: "Mice & Rats",
    icon: "rodent",
    blurb: "House mice and roof rats squeezing into garages, attics, and walls when the weather turns.",
    season: "Fall and winter (peak)",
    risk: "High",
    activeMonths: [1, 2, 9, 10, 11, 12],
    size: "6–24 cm + tail",
    hideout: "Attics, walls & garages",
    diy: "Traps miss entry points",
    service: "rodent-control",
    intro: "Rodents move indoors as northern Nevada cools. We seal the entry points and knock down the population.",
    about:
      "As the high desert cools each fall, house mice and rats push into Reno and Sparks homes looking for warmth, food, and water. Garages, attics, crawl spaces, and wall voids are the usual targets, and homes near open fields, the river, or older neighborhoods see the most pressure. A mouse only needs a gap the size of a dime, so real control is as much about sealing the home as it is about trapping.",
    signs: [
      "Droppings along walls, in cabinets, or in the garage",
      "Gnaw marks on food packaging, wood, or wiring",
      "Scratching or scurrying sounds in walls and ceilings at night",
      "Nests of shredded paper, insulation, or fabric",
    ],
    risks:
      "Rodents contaminate food, spread disease, and chew wiring, a genuine fire hazard, while multiplying quickly if the entry points aren't sealed.",
    treatment: [
      "Inspect to locate entry points, runways, and nesting areas",
      "Seal and exclude gaps so new rodents can't get back in",
      "Set a strategic trapping and baiting program",
      "Monitor and re-service until the activity is gone",
    ],
  },
  {
    slug: "wasps-and-hornets",
    name: "Wasps & Hornets",
    icon: "wasp",
    blurb: "Paper wasps and yellow jackets nesting under eaves, in bushes, and around Reno backyards.",
    season: "Late spring through fall",
    risk: "Moderate",
    activeMonths: [5, 6, 7, 8, 9, 10],
    size: "12–25 mm",
    hideout: "Eaves & ground nests",
    diy: "High sting risk",
    service: "wasps-hornets",
    intro: "Stinging nests near doors and eaves are a summer hazard. We remove them safely and treat so they don't rebuild.",
    about:
      "Warm Reno-Sparks summers bring paper wasps to eaves and doorways, aggressive yellow jackets to yards, trash areas, and ground nests, and bald-faced hornets that build large gray paper nests in trees and on structures. Nests grow all season and are most active, and most defensive, in late summer and fall. Because a disturbed nest can send dozens of stinging insects at once, removal is a job worth handling with the right gear and approach.",
    signs: [
      "Paper nests under eaves, in soffits, or in shrubs",
      "Wasps repeatedly flying to the same spot on the house",
      "Yellow jackets around trash cans, drinks, or ground holes",
      "Increased stinging activity near doors and patios",
    ],
    risks:
      "Stings are painful and can be dangerous for anyone with an allergy. Yellow jackets in particular defend their nests aggressively and can sting repeatedly.",
    treatment: [
      "Locate nests, including hidden voids and ground nests",
      "Treat and remove nests safely with proper protection",
      "Knock down accessible nests and treat rebuild-prone areas",
      "Add preventive eave treatment to discourage new nests",
    ],
  },
  {
    slug: "earwigs",
    name: "Earwigs",
    icon: "earwig",
    blurb: "Moisture-loving 'pincher bugs' slipping in from mulch, gardens, and damp foundation lines.",
    season: "Spring and summer",
    risk: "Low",
    activeMonths: [4, 5, 6, 7, 8, 9],
    size: "12–20 mm",
    hideout: "Mulch & damp foundations",
    diy: "Needs moisture fixes too",
    service: "insect-control",
    intro: "Earwigs follow moisture indoors. We treat the damp perimeter and entry points where they gather.",
    about:
      "Earwigs, the ones with the pincers, thrive wherever there's moisture, which around Reno and Sparks means irrigated flower beds, mulch, and damp foundation lines. They feed on plants at night and slip indoors through door sweeps and foundation gaps, turning up in bathrooms, kitchens, and basements. They don't harm people, but nobody wants to find them in the house.",
    signs: [
      "Reddish-brown insects with pincers near sinks and drains",
      "Earwigs in damp mulch, under pots, or along the foundation",
      "Chewed, ragged holes in garden and ornamental plants",
      "Clusters after watering or a warm, humid stretch",
    ],
    risks:
      "Earwigs are mostly a nuisance, they don't spread disease and rarely pinch hard enough to break skin, but large numbers indoors signal excess moisture around the home.",
    treatment: [
      "Treat the foundation perimeter and damp harborage areas",
      "Seal and treat entry points like door sweeps and gaps",
      "Advise on drainage and mulch fixes to cut moisture",
      "Set a seasonal barrier to keep them outside",
    ],
  },
  {
    slug: "silverfish",
    name: "Silverfish",
    icon: "silverfish",
    blurb: "Teardrop-shaped insects that feed on paper and starch in bathrooms, closets, and storage.",
    season: "Year-round indoors",
    risk: "Low",
    activeMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    size: "12–19 mm",
    hideout: "Humid storage & plumbing",
    diy: "Hard-to-reach harborage",
    service: "insect-control",
    intro: "Silverfish hide in dark, humid storage areas and damage paper and fabric. We treat their harborage directly.",
    about:
      "Silverfish are the wriggly, silvery, teardrop-shaped insects that turn up in bathrooms, closets, basements, and boxes of stored paper. Even in dry northern Nevada they find the humid micro-spots they need, under sinks, in cabinets, and around plumbing. They feed on starches, paper, glue, and fabric, so they'll quietly damage books, photos, and stored clothing over time.",
    signs: [
      "Silvery, fish-shaped insects in sinks, tubs, or closets",
      "Yellowish stains and small scales on paper or fabric",
      "Irregular holes or grazed surfaces on books and boxes",
      "Activity in dark, humid storage and around plumbing",
    ],
    risks:
      "Silverfish don't bite or spread disease, but they damage paper, books, wallpaper, and stored fabrics, and a growing population points to a moisture issue.",
    treatment: [
      "Inspect storage, plumbing, and humid areas for harborage",
      "Treat cracks, voids, and hiding spots directly",
      "Recommend humidity and storage changes to remove their habitat",
      "Follow up to confirm the population is knocked down",
    ],
  },
  {
    slug: "crickets",
    name: "Crickets",
    icon: "cricket",
    blurb: "House and field crickets chirping their way into garages and basements as nights cool.",
    season: "Late summer into fall",
    risk: "Low",
    activeMonths: [7, 8, 9, 10],
    size: "16–25 mm",
    hideout: "Garages & window wells",
    diy: "Wears off fast",
    service: "insect-control",
    intro: "Crickets wander in from the desert and yard, especially in fall. We treat the perimeter and entry points.",
    about:
      "Field and house crickets are a classic late-summer nuisance across the Reno-Sparks valley. They breed in yards, fields, and mulch, then move toward warmth as nights cool, collecting in garages, basements, and along foundations. Beyond the nonstop chirping, they'll chew on fabric and paper, and large numbers draw in the spiders and other pests that eat them.",
    signs: [
      "Persistent chirping from the garage, basement, or walls",
      "Crickets gathering along foundations and in window wells",
      "Chewed spots on fabric, paper, or stored items",
      "A jump in cricket numbers as fall sets in",
    ],
    risks:
      "Crickets don't threaten health, but they damage fabric and paper, and a heavy population becomes a food source that attracts spiders and other predators indoors.",
    treatment: [
      "Treat the exterior perimeter and foundation harborage",
      "Seal and treat entry points around doors and vents",
      "Reduce yard and mulch harborage next to the home",
      "Set a seasonal barrier ahead of the fall push",
    ],
  },
  {
    slug: "scorpions",
    name: "Scorpions",
    icon: "scorpion",
    blurb: "Nevada desert scorpions hiding in block walls, garages, and rocky landscaping.",
    season: "Warm months, active at night",
    risk: "Moderate",
    activeMonths: [4, 5, 6, 7, 8, 9, 10],
    size: "35–75 mm",
    hideout: "Block walls & rock beds",
    diy: "Shelters out of reach",
    service: "insect-control",
    intro: "Yes, northern Nevada has scorpions. We treat the cracks and harborage where they hide and hunt.",
    about:
      "Scorpions are part of high-desert life around Reno, Sparks, and Carson City, most commonly the northern scorpion (Paruroctonus boreus), which shelters by day in block walls, rock landscaping, garages, and under debris, then hunts insects at night. Homes on the valley's edges and in newer developments cut into the desert see them most. They glow under UV light, which is one way we confirm activity during an inspection.",
    signs: [
      "Scorpions spotted at night, especially after warm days",
      "Activity in block walls, rock beds, and cinder blocks",
      "Sightings in garages, on patios, or along the foundation",
      "Other insects present, their prey, around the home",
    ],
    risks:
      "Northern Nevada's common scorpions deliver a painful, bee-like sting that's rarely dangerous to healthy adults, but reactions can be serious for children, seniors, and pets.",
    treatment: [
      "Inspect harborage (walls, rock, debris), including with UV light",
      "Treat cracks, voids, and block walls where they shelter",
      "Reduce the insect prey they come to hunt",
      "Set an exterior barrier and advise on landscape changes",
    ],
  },
  {
    slug: "box-elder-bugs",
    name: "Box Elder Bugs",
    icon: "beetle",
    blurb: "Black-and-red bugs that swarm sunny walls and pile up at windows in fall.",
    season: "Fall (and warm winter days)",
    risk: "Low",
    activeMonths: [9, 10, 11],
    size: "11–14 mm",
    hideout: "Sunny walls & windows",
    diy: "Timing is everything",
    service: "insect-control",
    intro: "Box elder bugs cluster on warm walls and push inside for winter. We treat before they gather.",
    about:
      "Box elder bugs, black with orange-red markings, are a familiar fall sight across Reno and Sparks, massing on sunny south- and west-facing walls before working their way indoors to overwinter. They breed on box elder, maple, and ash trees, then move to homes as temperatures drop, collecting around windows, siding, and attics. They don't bite or breed indoors, but they show up in frustrating numbers.",
    signs: [
      "Clusters of black-and-red bugs on sunny exterior walls",
      "Bugs gathering at windows, doors, and siding in fall",
      "Insects appearing indoors on warm winter days",
      "Nearby box elder, maple, or ash trees",
    ],
    risks:
      "Box elder bugs are harmless, they don't bite, sting, or damage the home, but their sheer numbers are a nuisance and their droppings can stain surfaces and fabrics.",
    treatment: [
      "Time an exterior treatment before the fall gathering",
      "Treat sunny walls, eaves, and entry points they use",
      "Seal gaps around windows, siding, and the foundation",
      "Follow up to keep overwintering numbers down",
    ],
  },
  {
    slug: "wolf-spiders",
    name: "Wolf Spiders",
    icon: "spider",
    blurb: "Large, fast ground spiders that wander in from the desert, alarming but rarely harmful.",
    season: "Late summer into fall",
    risk: "Low",
    activeMonths: [7, 8, 9, 10, 11],
    size: "10–35 mm body",
    hideout: "Ground-level entry points",
    diy: "More wander in",
    service: "spider-control",
    intro: "Wolf spiders are big, fast, and unsettling to find indoors. We treat entry points and their insect prey.",
    about:
      "Wolf spiders are the large, hairy, fast-moving spiders that make people jump when one darts across the floor. They don't build webs, they hunt on the ground, so they wander in from desert landscaping, garages, and ground-level doors, especially in late summer and fall around Reno and Sparks. They look intimidating, but they're not aggressive and prefer to flee.",
    signs: [
      "Large, fast spiders running along floors and walls",
      "Sightings near ground-level doors, garages, and basements",
      "No organized web (they're active hunters)",
      "More activity as the weather cools in fall",
    ],
    risks:
      "Wolf spiders are not dangerous, a bite is rare and no worse than a bee sting, but their size and speed are alarming, and their presence means other insects are around to hunt.",
    treatment: [
      "Treat entry points, garages, and ground-level harborage",
      "Reduce the insect prey drawing them inside",
      "Seal gaps around doors and the foundation",
      "Set an exterior barrier to intercept wanderers",
    ],
  },
];

// Singular "… Control" label per pest. Plural pest names ("Ants", "Mice & Rats")
// read wrong in front of "Control" ("Ants Control"), so we keep an explicit,
// grammatical variant for titles, headings, and meta ("Ant Control").
const CONTROL_NAMES: Record<string, string> = {
  ants: "Ant",
  spiders: "Spider",
  "black-widows": "Black Widow",
  cockroaches: "Cockroach",
  "mice-and-rats": "Mouse & Rat",
  "wasps-and-hornets": "Wasp & Hornet",
  earwigs: "Earwig",
  silverfish: "Silverfish",
  crickets: "Cricket",
  scorpions: "Scorpion",
  "box-elder-bugs": "Box Elder Bug",
  "wolf-spiders": "Wolf Spider",
};

export const pestControlName = (p: Pest) => CONTROL_NAMES[p.slug] ?? p.name;

export type Step = { n: string; title: string; desc: string };

export const steps: Step[] = [
  {
    n: "1",
    title: "Free Inspection",
    desc: "We walk your property, identify the pests and entry points, and give you an honest quote, no pressure.",
  },
  {
    n: "2",
    title: "Custom Treatment Plan",
    desc: "You get a plan built for your property and the season, using the right products for northern Nevada pests.",
  },
  {
    n: "3",
    title: "Precise Service",
    desc: "A licensed tech treats the interior, exterior, and problem areas, then tells you exactly what they did.",
  },
  {
    n: "4",
    title: "Ongoing Protection",
    desc: "We check back on a schedule and re-treat free between visits if anything comes back.",
  },
];

// Weed control follows a different process than pest work (exterior-only,
// seasonally timed), so its detail page overrides the generic steps above.
export const weedSteps: Step[] = [
  {
    n: "1",
    title: "Free Inspection",
    desc: "We walk your property, map the areas under the most weed pressure, and give you an honest quote, no pressure.",
  },
  {
    n: "2",
    title: "Seasonal Plan",
    desc: "You get a plan timed to the high-desert season, using the right pre- and post-emergent products for northern Nevada weeds.",
  },
  {
    n: "3",
    title: "Targeted Treatment",
    desc: "We treat rock, gravel, beds, and hardscape outdoors, pre-emergent to stop new weeds and post-emergent to knock down what's already up.",
  },
  {
    n: "4",
    title: "Ongoing Protection",
    desc: "We time follow-ups through the season and re-treat between visits if weeds break through.",
  },
];

export type Review = {
  quote: string;
  name: string;
  place: string;
  topics?: string[]; // pest/service slugs the review mentions (for page matching)
};

export const reviews: Review[] = [
  {
    quote:
      "Peak pest control has been the best pest control company in Northern Nevada that I have found. They offer lots of services and tailored them to my family's needs. The technician Cody came out and was very informative and answered any questions I had.",
    name: "Maria A.",
    place: "Google review",
    topics: ["residential"],
  },
  {
    quote:
      "I love how they respond promptly, usually within the week. Their service gets rid of all my creepy crawlers. I just added weed control and I am thrilled with my results. Devan my service tech is very professional and answers all of my questions.",
    name: "Jan H.",
    place: "Google review",
    topics: ["weed-control", "insect-control"],
  },
  {
    quote:
      "We have both pest control and weed control services through Peak, and we couldn't be happier. Our technician, Devon, consistently provides exceptional customer service and does a thorough, professional job.",
    name: "Will M.",
    place: "Google review",
    topics: ["weed-control", "commercial"],
  },
  {
    quote:
      "Codie from Peak Pest Control was excellent! He was courteous, professional, and took the time to explain my “pesky” situation in simple, easy-to-understand terms. Knowledgeable and reassuring throughout.",
    name: "Cathy T.",
    place: "Google review",
  },
  {
    quote:
      "Devan takes time to explain why mice are getting in our garage. We had an increase in ant activity this week and Devan was here in 24 hours and sprayed the problem areas. He is respectable and professional. I recommend this company!",
    name: "Julie C.",
    place: "Google review",
    topics: ["mice-and-rats", "rodent-control", "ants", "ant-control"],
  },
  {
    quote:
      "I found Ali very easy and helpful to work with. She helped me understand exactly what she was doing and also how the chemicals may affect my animals. She explained what I could expect and anything to be concerned about.",
    name: "Christopher C.",
    place: "Google review",
    topics: ["residential"],
  },
  {
    quote:
      "Peak Pest Control technicians do a thorough job, communicate well with the homeowner and respect the property. We find their work thorough and complete and we highly recommend.",
    name: "Tom Z.",
    place: "Google review",
  },
  {
    quote:
      "Jacob is a wonderful tech. He is very polite, professional and friendly. We are happy to have such a great employee come to our home and complete our pest control service.",
    name: "William A.",
    place: "Google review",
  },
  {
    quote:
      "Ally was very professional and informative about the service being provided today. She was very attentive, paying close attention, and conducted herself in a highly professional manner. She truly is a great asset to your company!",
    name: "Mary W.",
    place: "Google review",
    topics: ["commercial"],
  },
  {
    quote:
      "I like this company. They are terrific in terms of notification, thoroughness of home inspection for pests, and politeness. I'm very pleased with all aspects of the business delivery.",
    name: "Phyllis L.",
    place: "Google review",
  },
  {
    quote:
      "Ally was very nice, professional, thorough and quick. Very happy with the results! They come quarterly.",
    name: "Michelle K.",
    place: "Google review",
    topics: ["residential"],
  },
  {
    quote:
      "Five-star, outstanding service from Jake for rodent control and my first weed control. I'm in a brand-new neighborhood with homes still being built, and Peak has been responsive every time.",
    name: "Julie A.",
    place: "Google review",
    topics: ["rodent-control", "mice-and-rats", "weed-control"],
  },
  {
    quote:
      "Everyone at Peak Pest Control is amazing. No matter which technician comes out to our home, they are all very friendly and helpful. Thank you so much!",
    name: "Karen M.",
    place: "Google review",
    topics: ["residential"],
  },
  {
    quote:
      "In all the years we've been with Peak, I've never seen anyone inspect and brush so thoroughly, not just spray. I was very happy to see Ally do such great work!",
    name: "Terine H.",
    place: "Google review",
  },
  {
    quote:
      "Devan explained what product he was using for ant control and how it worked. I appreciated how polite and friendly he was.",
    name: "Steve S.",
    place: "Google review",
    topics: ["ants", "ant-control"],
  },
  {
    quote:
      "If I could give 100,000 stars I would! Gabe, Mikayla, and Devan took great care of us and we're already seeing progress against the ants. Fair pricing, fast scheduling, and friendly service.",
    name: "Caileigh S.",
    place: "Google review",
    topics: ["ants", "ant-control"],
  },
  {
    quote:
      "Peak always comes out as soon as there's an issue, which isn't often thanks to how good a job they do. Devan treated for ants, spiders, and wasps, on time and professional.",
    name: "Michael O.",
    place: "Google review",
    topics: ["ants", "spiders", "wasps-and-hornets", "wasps-hornets"],
  },
  {
    quote:
      "Jacob is an excellent technician, explaining what he does and why. He even gave advice on which bushes and trees attract certain insects. Informative and experienced.",
    name: "Cynthia J.",
    place: "Google review",
  },
  {
    quote:
      "Best pest control company I have ever worked with. Peak took great care of my ants and my place.",
    name: "Bella A.",
    place: "Google review",
    topics: ["ants", "ant-control"],
  },
  {
    quote:
      "Heather was friendly and listened to my concerns. Even happier that she reported no activity at the bait stations and traps. Win-win!",
    name: "Sheryl B.",
    place: "Google review",
    topics: ["mice-and-rats", "rodent-control"],
  },
  {
    quote:
      "We had a small problem with black widows in the summer and Peak came out and treated our house. They did a wonderful job and we haven't had any problems with spiders since.",
    name: "Rachel R.",
    place: "Google review",
    topics: ["black-widows", "spiders", "spider-control"],
  },
  {
    quote:
      "Kelly was very thorough removing old wasp nests and treating for spiders and ants. She even walked through the snow to reach the perimeter of our yard.",
    name: "Madelyn S.",
    place: "Google review",
    topics: ["wasps-and-hornets", "wasps-hornets", "spiders", "ants"],
  },
  {
    quote:
      "Technician John was professional and thorough. I haven't seen ants or rodents since treatment, and spider activity has dropped drastically. Well worth the cost.",
    name: "Susan O.",
    place: "Google review",
    topics: ["ants", "mice-and-rats", "spiders"],
  },
  {
    quote:
      "Orion took care of our pest control and rodent issue very efficiently and took the time to explain the process. Their office staff are pleasant and professional too.",
    name: "Betty K.",
    place: "Google review",
    topics: ["mice-and-rats", "rodent-control"],
  },
  {
    quote:
      "Codie and his assistant Ashley offered outstanding service. Codie has extensive knowledge of pest and weed control and patiently explained both post- and pre-emergent weed treatment.",
    name: "Greg S.",
    place: "Google review",
    topics: ["weed-control"],
  },
  {
    quote:
      "Devan consistently knocks service out of the park. Always on time, professional, great communication, and he follows through to make sure we're happy and bug-free. Best in town by a long shot.",
    name: "Cash M.",
    place: "Google review",
    topics: ["commercial"],
  },
  {
    quote:
      "Devan has been courteous, professional, and has done a great job getting rid of the rodents and spiders.",
    name: "Joe N.",
    place: "Google review",
    topics: ["mice-and-rats", "rodent-control", "spiders", "spider-control"],
  },
  {
    quote:
      "Hashim did a phenomenal job based on our needs. He was professional, thorough, and a pleasure to work with.",
    name: "Scott N.",
    place: "Google review",
    topics: ["commercial"],
  },
  {
    quote:
      "Love this company! Highly recommend. We've had many pest companies, but Peak is the best. Great value and service.",
    name: "Leslie S.",
    place: "Google review",
    topics: ["commercial"],
  },
];

export const areas = [
  "Reno",
  "Sparks",
  "Carson City",
  "Spanish Springs",
  "Sun Valley",
  "Cold Springs",
  "Dayton",
  "Fernley",
  "Gardnerville",
  "Minden",
  "Silver Springs",
  "Virginia City",
];
