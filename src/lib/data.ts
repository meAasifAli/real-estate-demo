// Centralized mock data for the Bangalore real estate demo
// In production, this would come from a database or CMS

export type PropertyType = 'villa' | 'apartment' | 'penthouse' | 'commercial' | 'plot'
export type ListingType = 'buy' | 'rent'

export interface Property {
  id: string
  title: string
  slug: string
  type: PropertyType
  listingType: ListingType
  price: number
  priceUnit: string // 'INR', '/month', etc.
  location: string
  city: string
  area: string // in sq ft
  bedrooms: number
  bathrooms: number
  parking: number
  description: string
  features: string[]
  images: string[] // Unsplash URLs
  badge?: string // 'New', 'Hot Deal', 'Exclusive'
  agent: {
    name: string
    phone: string
    whatsapp: string
    image: string
  }
  coordinates?: { lat: number; lng: number }
  yearBuilt?: number
  floorNumber?: number
  totalFloors?: number
  furnished: 'furnished' | 'semi-furnished' | 'unfurnished'
  views?: string[]
}

export const AGENTS = [
  {
    name: 'Ramesh Kumar',
    phone: '+91 98450 12345',
    whatsapp: '919845012345',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80',
    title: 'Senior Property Consultant',
    deals: 140,
  },
  {
    name: 'Pooja Hegde',
    phone: '+91 98860 23456',
    whatsapp: '919886023456',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80',
    title: 'Luxury Villa Specialist',
    deals: 98,
  },
  {
    name: 'Karthik Sundaram',
    phone: '+91 99000 34567',
    whatsapp: '919900034567',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
    title: 'Commercial Property Expert',
    deals: 75,
  },
]

export const PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    title: 'Oakwood Serenade Luxury Villa with Private Pool',
    slug: 'oakwood-serenade-luxury-villa',
    type: 'villa',
    listingType: 'buy',
    price: 34500000,
    priceUnit: 'INR',
    location: 'ECC Road, Whitefield, Bengaluru',
    city: 'Bengaluru',
    area: '4,850',
    bedrooms: 5,
    bathrooms: 5,
    parking: 3,
    badge: 'Exclusive',
    furnished: 'furnished',
    views: ['Garden View', 'Clubhouse View'],
    description:
      'A bespoke triplex luxury villa nestled in a premium gated enclave in Whitefield. Features double-height living areas, Italian marble flooring, a landscaped private terrace garden, dedicated home theatre room, and smart home automation. Situated 10 minutes from ITPL and prestigious international schools.',
    features: [
      'Private swimming pool',
      'Smart home automation',
      'Home theatre room',
      'Private terrace lawn',
      'Clubhouse & gym',
      '100% power backup',
      'Maid\'s quarters',
      'Italian marble flooring',
      'Designer modular kitchen',
      '24/7 gated security',
    ],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[1],
    yearBuilt: 2024,
    totalFloors: 3,
  },
  {
    id: 'prop-002',
    title: 'The Grand Azure Sky Penthouse with Panoramic Views',
    slug: 'the-grand-azure-sky-penthouse',
    type: 'penthouse',
    listingType: 'buy',
    price: 48000000,
    priceUnit: 'INR',
    location: '100ft Road, Indiranagar, Bengaluru',
    city: 'Bengaluru',
    area: '4,200',
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    badge: 'Hot Deal',
    furnished: 'furnished',
    views: ['City Skyline', 'Canopy Views'],
    description:
      'An exceptional duplex penthouse overlooking the lush tree-lined avenues of Indiranagar. Boasts a 360-degree panoramic skyline view, private plunge pool on the terrace, floor-to-ceiling soundproof glass, and an ultra-modern Poggenpohl kitchen with Miele appliances.',
    features: [
      'Private plunge pool',
      'Floor-to-ceiling glazing',
      'German modular kitchen',
      'Direct private elevator',
      'Concierge services',
      'Temperature controlled AC',
      '3 dedicated car parks',
      'Wine chiller',
      'Hardwood teak floors',
      'Sonos integrated sound',
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[0],
    yearBuilt: 2023,
    floorNumber: 22,
    totalFloors: 24,
  },
  {
    id: 'prop-003',
    title: 'Prestige Green Meadows Garden Villa',
    slug: 'prestige-green-meadows-garden-villa',
    type: 'villa',
    listingType: 'buy',
    price: 52000000,
    priceUnit: 'INR',
    location: 'Sarjapur Road, Bengaluru',
    city: 'Bengaluru',
    area: '5,600',
    bedrooms: 5,
    bathrooms: 6,
    parking: 3,
    badge: 'Exclusive',
    furnished: 'semi-furnished',
    views: ['Landscaped Park', 'Clubhouse View'],
    description:
      'Set across an elite 40-acre gated ecosystem on Sarjapur Road, this Spanish-inspired luxury villa offers 5 lavish ensuite bedrooms, a private lawn with gazebo, domestic staff quarters, and world-class sporting amenities including tennis and squash courts.',
    features: [
      'Private gazebo & lawn',
      'Spanish architecture',
      'Solar power backup',
      'Tennis & squash courts',
      'Kids play zone',
      'Separate servant quarters',
      'Double car garage',
      'Walk-in wardrobes',
      'Swimming pool access',
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[1],
    yearBuilt: 2023,
    totalFloors: 2,
  },
  {
    id: 'prop-004',
    title: 'Sovereign Heights Lakeview Apartment',
    slug: 'sovereign-heights-lakeview-apartment',
    type: 'apartment',
    listingType: 'buy',
    price: 18500000,
    priceUnit: 'INR',
    location: 'Sector 2, HSR Layout, Bengaluru',
    city: 'Bengaluru',
    area: '2,150',
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    badge: 'Hot Deal',
    furnished: 'semi-furnished',
    views: ['Agara Lake View', 'Greenery'],
    description:
      'A serene lake-facing luxury residence in prime HSR Layout. Offering expansive sunlit living spaces, cross-ventilation, wooden flooring in master bedroom, premium bath fittings, and uninterrupted views of Agara Lake with seamless connectivity to Koramangala and Outer Ring Road.',
    features: [
      'Lake-facing balconies',
      'Wooden flooring in master bed',
      'High-speed elevators',
      'Gymnasium & yoga deck',
      'Rainwater harvesting',
      'Video door security',
      'Covered car parking',
      'Intercom facility',
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[0],
    yearBuilt: 2024,
    floorNumber: 14,
    totalFloors: 18,
  },
  {
    id: 'prop-005',
    title: 'The Silicon Park Commercial Tower',
    slug: 'the-silicon-park-commercial-tower',
    type: 'commercial',
    listingType: 'buy',
    price: 145000000,
    priceUnit: 'INR',
    location: 'Phase 1, Electronic City, Bengaluru',
    city: 'Bengaluru',
    area: '12,500',
    bedrooms: 0,
    bathrooms: 6,
    parking: 15,
    badge: 'Exclusive',
    furnished: 'semi-furnished',
    views: ['Tech Campus View'],
    description:
      'Grade-A commercial office space situated in Electronic City Phase 1. Designed for tech enterprises and GCC global capability centres with large open-plan floor plates, central air-conditioning, high-speed fiber connectivity, and multi-tier security.',
    features: [
      'Grade-A tech park building',
      '100% DG power backup',
      'Central HVAC system',
      '15 reserved car bays',
      'Cafeteria & food court',
      'Auditorium facility',
      '24/7 security & CCTV',
      'High-speed passenger lifts',
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[2],
    yearBuilt: 2022,
    floorNumber: 5,
    totalFloors: 12,
  },
  {
    id: 'prop-006',
    title: 'Northstar Luxury Residences near Airport Expressway',
    slug: 'northstar-luxury-residences',
    type: 'apartment',
    listingType: 'buy',
    price: 26000000,
    priceUnit: 'INR',
    location: 'Bellary Road, Hebbal, Bengaluru',
    city: 'Bengaluru',
    area: '2,800',
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    furnished: 'semi-furnished',
    views: ['Hebbal Lake', 'Flyover Skyline'],
    description:
      'Ultra-spacious 4 BHK luxury apartment in North Bengaluru’s premier connectivity hub Hebbal. Enjoys 25-minute direct access to Kempegowda International Airport, private elevator lobby, double-glazed soundproof windows, and clubhouse amenities.',
    features: [
      'Airport expressway access',
      'Hebbal lake views',
      'Infinity edge rooftop pool',
      'Squash court & fitness gym',
      'EV charging stations',
      'Double height entrance lobby',
      'Children play park',
      'Round the clock security',
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[0],
    yearBuilt: 2023,
    floorNumber: 16,
    totalFloors: 26,
  },
  {
    id: 'prop-007',
    title: 'Yelahanka Green Groves Premium Villa',
    slug: 'yelahanka-green-groves-villa',
    type: 'villa',
    listingType: 'rent',
    price: 65000,
    priceUnit: '/month',
    location: 'Judicial Layout, Yelahanka, Bengaluru',
    city: 'Bengaluru',
    area: '3,200',
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    furnished: 'semi-furnished',
    views: ['Green Belt View'],
    badge: 'New',
    description:
      'Sprawling independent villa for rent in peaceful Judicial Layout, Yelahanka. Surrounded by organic green canopy, featuring open courtyards, terrace garden, modular woodwork, and convenient proximity to international schools and the airport corridor.',
    features: [
      'Private garden lawn',
      'Modular kitchen with chimney',
      'Terrace sit-out area',
      'Covered parking for 2 cars',
      'Borewell & Kaveri water',
      'Solar water heating',
      'Pet friendly compound',
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[1],
    yearBuilt: 2022,
    totalFloors: 2,
  },
  {
    id: 'prop-008',
    title: 'Koramangala Elite Suites – 80ft Road',
    slug: 'koramangala-elite-suites',
    type: 'apartment',
    listingType: 'rent',
    price: 85000,
    priceUnit: '/month',
    location: '4th Block, Koramangala, Bengaluru',
    city: 'Bengaluru',
    area: '1,800',
    bedrooms: 3,
    bathrooms: 3,
    parking: 1,
    furnished: 'furnished',
    views: ['City View'],
    badge: 'Hot Deal',
    description:
      'Fully furnished luxury 3 BHK apartment in Bengaluru’s startup heartland, Koramangala 4th Block. Walking distance to premier cafes, co-working hubs, and restaurants with designer furniture, high-speed WiFi, and 100% power backup.',
    features: [
      'Fully furnished designer decor',
      'High-speed WiFi ready',
      '100% DG power backup',
      'Dedicated car parking',
      'Modular kitchen with appliances',
      'Walking distance to 80ft Road',
      'Round-the-clock security',
    ],
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[0],
    yearBuilt: 2023,
    floorNumber: 4,
    totalFloors: 6,
  },
]

export function formatPrice(price: number, unit: string): string {
  if (unit === '/month') {
    return `₹${price.toLocaleString('en-IN')}/mo`
  }
  if (price >= 10000000) {
    const cr = (price / 10000000).toFixed(2).replace(/\.00$/, '')
    return `₹${cr} Cr`
  }
  if (price >= 100000) {
    const lakhs = (price / 100000).toFixed(1).replace(/\.0$/, '')
    return `₹${lakhs} Lakhs`
  }
  return `₹${price.toLocaleString('en-IN')}`
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug)
}

export function filterProperties(params: {
  type?: string
  listingType?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  location?: string
  propertyType?: string
}): Property[] {
  return PROPERTIES.filter((p) => {
    if (params.listingType && p.listingType !== params.listingType) return false
    if (params.bedrooms && params.bedrooms > 0 && p.bedrooms < params.bedrooms) return false
    if (params.location && !p.location.toLowerCase().includes(params.location.toLowerCase())) return false
    if (params.propertyType && params.propertyType !== 'all' && p.type !== params.propertyType) return false
    return true
  })
}

// Lead/Enquiry types for the dashboard
export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  propertyId: string
  propertyTitle: string
  type: 'viewing' | 'whatsapp' | 'form'
  date: string
  status: 'new' | 'contacted' | 'viewing_scheduled' | 'closed'
  message?: string
}

export const ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@techcorp.in',
    phone: '+91 98451 22334',
    propertyId: 'prop-001',
    propertyTitle: 'Oakwood Serenade Luxury Villa',
    type: 'viewing',
    date: '2026-10-01',
    status: 'new',
    message: 'Interested in scheduling a weekend site visit with family.',
  },
  {
    id: 'enq-002',
    name: 'Priya Menon',
    email: 'priya.menon@fintech.co',
    phone: '+91 98862 33445',
    propertyId: 'prop-003',
    propertyTitle: 'Prestige Green Meadows Garden Villa',
    type: 'whatsapp',
    date: '2026-09-30',
    status: 'contacted',
    message: 'Inquiring about SBI approved home loan plan & possession date.',
  },
  {
    id: 'enq-003',
    name: 'Arjun Rao',
    email: 'arjun.rao99@gmail.com',
    phone: '+91 99003 44556',
    propertyId: 'prop-004',
    propertyTitle: 'Sovereign Heights Lakeview Apartment',
    type: 'viewing',
    date: '2026-09-30',
    status: 'viewing_scheduled',
    message: 'Site visit confirmed for Sunday 3:00 PM.',
  },
  {
    id: 'enq-004',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@globalventures.uk',
    phone: '+44 7911 123456',
    propertyId: 'prop-002',
    propertyTitle: 'The Grand Azure Sky Penthouse',
    type: 'whatsapp',
    date: '2026-09-29',
    status: 'contacted',
    message: 'NRI investor based in London. Ready to transfer token advance post virtual tour.',
  },
  {
    id: 'enq-005',
    name: 'Vikram Reddy',
    email: 'vikram@reddycapital.in',
    phone: '+91 98455 66778',
    propertyId: 'prop-005',
    propertyTitle: 'The Silicon Park Commercial Tower',
    type: 'form',
    date: '2026-09-28',
    status: 'contacted',
    message: 'Need 12,000 sqft floor plate for enterprise IT expansion.',
  },
  {
    id: 'enq-006',
    name: 'Siddharth Patel',
    email: 'siddharth.p@startupstudio.io',
    phone: '+91 97412 88990',
    propertyId: 'prop-008',
    propertyTitle: 'Koramangala Elite Suites',
    type: 'whatsapp',
    date: '2026-09-27',
    status: 'closed',
    message: 'Rental agreement signed for 24 months. Security deposit received.',
  },
  {
    id: 'enq-007',
    name: 'Deepika Iyer',
    email: 'deepika.iyer@healthcorp.com',
    phone: '+91 96118 77665',
    propertyId: 'prop-006',
    propertyTitle: 'Northstar Luxury Residences',
    type: 'viewing',
    date: '2026-09-26',
    status: 'new',
    message: 'Relocating from Mumbai next month. Wants 4 BHK close to airport expressway.',
  },
]

// ── Agency contact (single source of truth) ───────────────────────────────
export const AGENCY = {
  name: 'LuxeEstates',
  phone: '+91 98450 12345',
  phoneHref: 'tel:+919845012345',
  whatsapp: '919845012345',
  email: 'hello@luxeestates.in',
  address: 'Level 4, Prestige Tech Park, Outer Ring Road, Bengaluru 560103',
  hours: 'Mon–Sat, 9 AM – 7 PM',
  rera: 'PRM/KA/RERA/1251/309/AG/2024',
}

export function whatsappLink(text: string, number: string = AGENCY.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}

// ── Bengaluru micro-markets ────────────────────────────────────────────────
export interface Locality {
  name: string
  query: string
  tagline: string
  pricePerSqft: string
  image: string
}

export const LOCALITIES: Locality[] = [
  {
    name: 'Whitefield',
    query: 'Whitefield',
    tagline: 'IT corridor · Gated villas',
    pricePerSqft: '₹9,800',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop&q=75',
  },
  {
    name: 'Indiranagar',
    query: 'Indiranagar',
    tagline: 'Café culture · Metro access',
    pricePerSqft: '₹18,500',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=800&fit=crop&q=75',
  },
  {
    name: 'Koramangala',
    query: 'Koramangala',
    tagline: 'Startup hub · Premium rentals',
    pricePerSqft: '₹17,200',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=800&fit=crop&q=75',
  },
  {
    name: 'HSR Layout',
    query: 'HSR',
    tagline: 'Lake views · Family friendly',
    pricePerSqft: '₹13,400',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop&q=75',
  },
  {
    name: 'Sarjapur Road',
    query: 'Sarjapur',
    tagline: 'Top schools · New launches',
    pricePerSqft: '₹8,900',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=800&fit=crop&q=75',
  },
  {
    name: 'Hebbal',
    query: 'Hebbal',
    tagline: 'Airport link · Lake front',
    pricePerSqft: '₹12,600',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=800&fit=crop&q=75',
  },
  {
    name: 'Yelahanka',
    query: 'Yelahanka',
    tagline: 'Green belt · Independent homes',
    pricePerSqft: '₹7,800',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=800&fit=crop&q=75',
  },
  {
    name: 'Electronic City',
    query: 'Electronic City',
    tagline: 'Commercial · High rental yield',
    pricePerSqft: '₹6,400',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop&q=75',
  },
]
