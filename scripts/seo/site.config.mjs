// Single source of truth for every page's head, social preview and structured data.
// Adding a listing: add one entry to PAGES, then run `node scripts/seo/build.mjs`.

export const ORIGIN = 'https://blueoceanluxury.co.za';

export const SITE = {
  name: 'Blue Ocean Realty',
  legalName: 'Blue Ocean Realty (Pty) Ltd',
  locale: 'en_ZA',
  telephone: '+27695224226',
  email: 'info@blueoceanluxury.co.za',
  logo: '/assets/branding/blue-ocean-logo.png',
  defaultImage: '/assets/properties/55-hawaan-drive/images/house-06.jpg',
  address: {
    streetAddress: 'Suite 6, 66 Adelaide Tambo Drive',
    addressLocality: 'Durban North',
    addressRegion: 'KwaZulu-Natal',
    postalCode: '4051',
    addressCountry: 'ZA',
  },
  areaServed: ['KwaZulu-Natal', 'Umhlanga', 'Durban North', 'La Lucia Ridge', 'Westville', 'Riverhorse Valley', 'Ballito', 'Hilton'],
  // Profiles that describe this business. Add the Google Business Profile / Maps CID URL here once it exists.
  sameAs: [
    'https://www.blueoceanrealty.co.za/',
    'https://www.instagram.com/rohanrealty.co.za',
    'https://www.facebook.com/share/1Gdn6cE84s/',
    'https://www.tiktok.com/@rohanrealty.co.za',
  ],
  people: {
    rohan: {
      name: 'Rohan Ramlall',
      jobTitle: 'Candidate Property Practitioner',
      telephone: '+27695224226',
      image: '/assets/agent/rohan-ramlall-portrait.webp',
      sameAs: ['https://www.instagram.com/rohanrealty.co.za', 'https://www.tiktok.com/@rohanrealty.co.za'],
    },
    benjamin: {
      name: 'Benjamin Govindraj',
      jobTitle: 'Principal Property Practitioner',
      telephone: '+27736910478',
    },
  },
};

const RES = { name: 'Residential', path: '/residential' };
const COM = { name: 'Commercial', path: '/commercial' };

// kind: home | hub | about | contact | legal | residential | commercial
// offer.mode: sale (price in ZAR) | lease (price per m2 per month, basis gross|nett)
export const PAGES = [
  {
    file: 'index.html', path: '/', kind: 'home',
    title: 'Luxury Homes and Commercial Property in KZN | Blue Ocean',
    description: 'Luxury estate homes in Umhlanga and Izinga, plus offices and retail space to let across KwaZulu-Natal. Private viewings with Rohan Ramlall.',
    image: '/assets/properties/55-hawaan-drive/images/house-06.jpg',
  },
  {
    file: 'residential.html', path: '/residential', kind: 'hub', crumbs: [RES],
    title: 'Luxury Houses for Sale in Umhlanga | Blue Ocean Realty',
    description: 'Estate homes for sale in Hawaan Forest Estate, Izinga Park and Sera Bella, Umhlanga, from R8,995,000 to R28,000,000. Book a private viewing.',
    image: '/assets/properties/5-nightjar-close/images/photo_01_384268194.jpg',
    listings: ['5-nightjar-close.html', '40-idwala-circle.html', '55-hawaan-drive.html', '12-sera-bella.html', '6-sera-bella.html'],
  },
  {
    file: 'commercial.html', path: '/commercial', kind: 'hub', crumbs: [COM],
    title: 'Offices, Retail and Development Land in KZN | Blue Ocean',
    description: 'Office space to let at Glass House Office Park and The Glades in La Lucia Ridge, Westville and Congella, retail in Hilton and development land in Umhlanga Ridge.',
    image: '/assets/properties/commercial/glass-house-b5/1.jpg',
    listings: ['glass-house-building-1.html', 'glass-house-building-5.html', 'the-glades-office-park.html', '7-the-boulevard.html', 'dunlop-house.html', 'the-avenues-centre.html', 'urban-corner.html'],
  },
  {
    file: 'about.html', path: '/about', kind: 'about', crumbs: [{ name: 'About', path: '/about' }],
    title: 'About Rohan Ramlall | Blue Ocean Realty, Durban North',
    description: 'Rohan Ramlall sells and lets luxury homes and commercial property across KZN for Blue Ocean Realty, Durban North. Sole and open mandates welcome.',
    image: '/assets/agent/rohan-ramlall-portrait.webp',
  },
  {
    file: 'contact.html', path: '/contact', kind: 'contact', crumbs: [{ name: 'Contact', path: '/contact' }],
    title: 'Contact Blue Ocean Realty | Book a Private Viewing',
    description: 'WhatsApp or call +27 69 522 4226, email info@blueoceanluxury.co.za, or visit Suite 6, 66 Adelaide Tambo Drive, Durban North.',
  },
  {
    file: 'privacy-policy.html', path: '/privacy-policy', kind: 'legal', crumbs: [{ name: 'Privacy policy', path: '/privacy-policy' }],
    title: 'Privacy Policy and POPIA Notice | Blue Ocean Realty',
    description: 'How Blue Ocean Realty (Pty) Ltd collects, uses and protects personal information under POPIA, and how to exercise your rights.',
  },
  {
    file: 'cookie-policy.html', path: '/cookie-policy', kind: 'legal', crumbs: [{ name: 'Cookie policy', path: '/cookie-policy' }],
    title: 'Cookie Policy | Blue Ocean Realty',
    description: 'Which cookies blueoceanluxury.co.za uses, why, and how to accept, reject or change your choice at any time.',
  },
  {
    file: '404.html', path: '/404', kind: 'legal', noindex: true,
    title: 'Page Not Found | Blue Ocean Realty',
    description: 'This page has moved or the listing is no longer available. Browse current homes for sale and commercial space to let in KwaZulu-Natal.',
  },
  {
    file: 'terms-and-conditions.html', path: '/terms-and-conditions', kind: 'legal', crumbs: [{ name: 'Terms of use', path: '/terms-and-conditions' }],
    title: 'Terms of Use and Listing Disclaimers | Blue Ocean Realty',
    description: 'Terms of use for blueoceanluxury.co.za, including listing accuracy (E&OE), pricing and intellectual property.',
  },
  {
    file: 'statutory-disclosure.html', path: '/statutory-disclosure', kind: 'legal', crumbs: [{ name: 'Statutory disclosure', path: '/statutory-disclosure' }],
    title: 'Statutory Disclosure and PPRA | Blue Ocean Realty',
    description: 'PPRA registration, candidate practitioner supervision and complaints procedure for Blue Ocean Realty (Pty) Ltd.',
  },

  // Residential listings
  {
    file: '5-nightjar-close.html', path: '/5-nightjar-close', kind: 'residential', crumbs: [RES],
    title: '5 Nightjar Close, Hawaan Forest Estate | R28,000,000',
    description: '5-bedroom, 5.5-bathroom house on a 2,195 m² double stand in Hawaan Forest Estate, Umhlanga. Asking R28,000,000. Book a private viewing.',
    image: '/assets/properties/5-nightjar-close/images/photo_01_384268194.jpg',
    listing: {
      name: '5 Nightjar Close, Hawaan Forest Estate', type: 'SingleFamilyResidence',
      street: '5 Nightjar Close, Hawaan Forest Estate', locality: 'Umhlanga', postalCode: '4319',
      geo: [-29.707741, 31.088143], beds: 5, baths: 5.5, lot: 2195,
      offer: { mode: 'sale', price: 28000000 }, datePosted: '2026-08-05',
    },
  },
  {
    file: '40-idwala-circle.html', path: '/40-idwala-circle', kind: 'residential', crumbs: [RES],
    title: '40 Idwala Circle, Izinga Park, Umhlanga | R25,000,000',
    description: '600 m² house on a 1,079 m² stand in Izinga Park, Umhlanga: 5 en-suite bedrooms, cinema room, pool, 24-hour guarded estate. Asking R25,000,000.',
    image: '/assets/properties/40-idwala-circle/images/photo_01_389426148.jpg',
    listing: {
      name: '40 Idwala Circle, Izinga Park', type: 'SingleFamilyResidence',
      street: '40 Idwala Circle, Izinga Park', locality: 'Umhlanga', postalCode: '4319',
      geo: [-29.707876, 31.084745], beds: 5, baths: 6, floor: 600, lot: 1079,
      offer: { mode: 'sale', price: 25000000 },
    },
  },
  {
    file: '55-hawaan-drive.html', path: '/55-hawaan-drive', kind: 'residential', crumbs: [RES],
    title: '55 Hawaan Drive, Hawaan Forest Estate | R19,995,000',
    description: '770 m² 4-bedroom house in Hawaan Forest Estate, Umhlanga, with Victron solar and 15,000 L rainwater filtration. Asking R19,995,000.',
    image: '/assets/properties/55-hawaan-drive/images/house-01.jpg',
    listing: {
      name: '55 Hawaan Drive, Hawaan Forest Estate', type: 'SingleFamilyResidence',
      street: '55 Hawaan Drive, Hawaan Forest Estate', locality: 'Umhlanga Rocks', postalCode: '4319',
      beds: 4, baths: 4.5, floor: 770,
      offer: { mode: 'sale', price: 19995000 },
    },
  },
  {
    file: '12-sera-bella.html', path: '/12-sera-bella', kind: 'residential', crumbs: [RES],
    title: '12 Sera Bella, Izinga Ridge | New 5-Bed Home R9,575,000',
    description: 'New 481 m² 5-bedroom, 4-bathroom home in Sera Bella, Izinga Ridge, Umhlanga. No transfer duty payable. Asking R9,575,000.',
    image: '/assets/properties/12-sera-bella/images/hero.jpg',
    listing: {
      name: '12 Sera Bella, Izinga Ridge', type: 'SingleFamilyResidence',
      street: '12 Sera Bella, Mahogany Drive', locality: 'Izinga Ridge, Umhlanga', postalCode: '4319',
      beds: 5, baths: 4, floor: 481, noTransferDuty: true,
      offer: { mode: 'sale', price: 9575000 },
    },
  },
  {
    file: '6-sera-bella.html', path: '/6-sera-bella', kind: 'residential', crumbs: [RES],
    title: 'Unit 6 Sera Bella, Izinga Ridge | New 5-Bed Home R8,995,000',
    description: 'New 440 m² 5-bedroom, 4-bathroom freestanding home at 61 Mahogany Drive, Izinga Ridge. No transfer duty, a saving of about R767,000. R8,995,000.',
    image: '/assets/properties/6-sera-bella/images/photo-01.jpg',
    listing: {
      name: 'Unit 6 Sera Bella, Izinga Ridge', type: 'SingleFamilyResidence',
      street: 'Unit 6 Sera Bella, 61 Mahogany Drive', locality: 'Izinga Ridge, Umhlanga', postalCode: '4319',
      beds: 5, baths: 4, floor: 440, noTransferDuty: true,
      offer: { mode: 'sale', price: 8995000 },
    },
  },

  // Commercial listings. Figures mirror each page's hero stat cards (checked 2026-11-20).
  {
    file: 'glass-house-building-1.html', path: '/glass-house-building-1', kind: 'commercial', crumbs: [COM],
    title: '235 m² Office to Let, Glass House Office Park, La Lucia',
    description: '235 m² ground-floor office to let at Glass House Building 1, 30-34 Meridian Drive, La Lucia Ridge. R175/m² gross, backup power. Available now.',
    image: '/assets/properties/commercial/glass-house-b1/1.jpg',
    listing: {
      name: 'Glass House Building 1, Glass House Office Park', use: 'Office',
      street: '30-34 Meridian Drive, Glass House Office Park', locality: 'La Lucia Ridge', postalCode: '4051',
      floor: 235, offer: { mode: 'lease', price: 175, basis: 'gross' },
    },
  },
  {
    file: 'glass-house-building-5.html', path: '/glass-house-building-5', kind: 'commercial', crumbs: [COM],
    title: '1,678 m² Office to Let, Glass House Building 5, La Lucia',
    description: '1,678.58 m² first-floor office to let at Glass House Building 5, La Lucia Ridge. R160/m² nett, 69 parking bays, full backup infrastructure.',
    image: '/assets/properties/commercial/glass-house-b5/1.jpg',
    listing: {
      name: 'Glass House Building 5, Glass House Office Park', use: 'Office',
      street: '30-34 Meridian Drive, Glass House Office Park', locality: 'La Lucia Ridge', postalCode: '4051',
      floor: 1678.58, parking: 69, offer: { mode: 'lease', price: 160, basis: 'nett' },
    },
  },
  {
    file: 'the-glades-office-park.html', path: '/the-glades-office-park', kind: 'commercial', crumbs: [COM],
    title: '992 m² Standalone Office to Let, The Glades, La Lucia',
    description: '992.13 m² standalone office building to let at The Glades Office Park, Armstrong Avenue, La Lucia Ridge. R185/m² gross, 50 parking bays.',
    image: '/assets/properties/commercial/the-glades/1.jpg',
    listing: {
      name: 'The Glades Office Park, Armstrong Avenue', use: 'Office',
      street: 'Armstrong Avenue, The Glades Office Park', locality: 'La Lucia Ridge', postalCode: '4051',
      floor: 992.13, parking: 50, offer: { mode: 'lease', price: 185, basis: 'gross' },
    },
  },
  {
    file: '7-the-boulevard.html', path: '/7-the-boulevard', kind: 'commercial', crumbs: [COM],
    title: '134 m² Office to Let, Westway Office Park, Westville',
    description: '134.10 m² first-floor office to let at 7 The Boulevard, Westway Office Park, Westville. R148/m² gross. Available immediately.',
    image: '/assets/properties/commercial/7-boulevard-westway/1.jpg',
    listing: {
      name: '7 The Boulevard, Westway Office Park', use: 'Office',
      street: '7 The Boulevard, Westway Office Park', locality: 'Westville', postalCode: '3629',
      floor: 134.1, offer: { mode: 'lease', price: 148, basis: 'gross' },
    },
  },
  {
    file: 'dunlop-house.html', path: '/dunlop-house', kind: 'commercial', crumbs: [COM],
    title: '760 m² Office to Let, Dunlop House, Congela, Durban',
    description: '760 m² second-floor office to let at Dunlop House, 265 Sydney Road, Congela, Durban. R85/m² gross. Available immediately.',
    image: '/assets/properties/commercial/dunlop-house/1.jpg',
    listing: {
      name: 'Dunlop House, 265 Sydney Road', use: 'Office',
      street: '265 Sydney Road, Congela', locality: 'Durban', postalCode: '4001',
      floor: 760, offer: { mode: 'lease', price: 85, basis: 'gross' },
    },
  },
  {
    file: 'the-avenues-centre.html', path: '/the-avenues-centre', kind: 'commercial', crumbs: [COM],
    title: '209 m² Retail Shop to Let, The Avenues Centre, Hilton',
    description: '209 m² retail and commercial space to let at The Avenues Centre, Hilton, KZN Midlands. R200/m² gross. Available immediately.',
    image: '/assets/properties/commercial/the-avenues-hilton/1.jpg',
    listing: {
      name: 'The Avenues Centre, Hilton', use: 'Retail',
      street: 'The Avenues Centre', locality: 'Hilton', postalCode: '3245',
      floor: 209, offer: { mode: 'lease', price: 200, basis: 'gross' },
    },
  },
  {
    file: 'urban-corner.html', path: '/urban-corner', kind: 'commercial', crumbs: [COM],
    title: '4,831 m² Development Land for Sale, Umhlanga Ridge',
    description: '4,831 m² development site with 8,213 m² of bulk on the corner of Park Way and Twilight Drive, Umhlanga Ridge. R33,000,000 excluding VAT.',
    image: '/assets/properties/commercial/urban-corner/1.png',
    listing: {
      name: 'Urban Corner, Umhlanga Ridge', use: 'Development land',
      street: 'Corner of Park Way and Twilight Drive', locality: 'Umhlanga Ridge', postalCode: '4319',
      lot: 4831, bulk: 8213, offer: { mode: 'sale', price: 33000000, vatNote: 'excluding VAT' },
    },
  },
];
