// Centralized mock data for the real estate demo
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
  priceUnit: string // 'AED', '/month', etc.
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
    name: 'Sophia Laurent',
    phone: '+971 50 123 4567',
    whatsapp: '971501234567',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80',
    title: 'Senior Property Consultant',
    deals: 140,
  },
  {
    name: 'Rahul Verma',
    phone: '+971 55 234 5678',
    whatsapp: '971552345678',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80',
    title: 'Luxury Villa Specialist',
    deals: 98,
  },
  {
    name: 'Aisha Al-Mansouri',
    phone: '+971 52 345 6789',
    whatsapp: '971523456789',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&q=80',
    title: 'Commercial Property Expert',
    deals: 75,
  },
]

export const PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    title: 'Opulent Palm Frond Villa with Private Pool',
    slug: 'opulent-palm-frond-villa',
    type: 'villa',
    listingType: 'buy',
    price: 18500000,
    priceUnit: 'AED',
    location: 'Palm Jumeirah, Dubai',
    city: 'Dubai',
    area: '8,400',
    bedrooms: 6,
    bathrooms: 7,
    parking: 4,
    badge: 'Exclusive',
    furnished: 'furnished',
    views: ['Sea View', 'Skyline View'],
    description:
      'An architectural marvel on the iconic Palm Jumeirah, this ultra-luxury villa offers unparalleled sea views and world-class amenities. Featuring an open-plan layout with soaring ceilings, bespoke Italian marble finishes, and a sprawling private garden with an infinity pool overlooking the Arabian Gulf.',
    features: [
      'Private infinity pool',
      'Smart home system',
      'Home cinema',
      'Wine cellar',
      'Gym & spa',
      'Private beach access',
      'Maid\'s quarters',
      'Rooftop terrace',
      'Italian marble flooring',
      'Chef\'s kitchen',
    ],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[0],
    yearBuilt: 2022,
    totalFloors: 3,
  },
  {
    id: 'prop-002',
    title: 'Sky-High Penthouse with 360° City Views',
    slug: 'sky-high-penthouse-burj-views',
    type: 'penthouse',
    listingType: 'buy',
    price: 12200000,
    priceUnit: 'AED',
    location: 'Downtown Dubai',
    city: 'Dubai',
    area: '5,200',
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    badge: 'Hot Deal',
    furnished: 'furnished',
    views: ['Burj Khalifa View', 'City View'],
    description:
      'Perched atop one of Downtown Dubai\'s most prestigious towers, this spectacular penthouse features sweeping 360-degree views of the Burj Khalifa, Dubai Fountain, and the Arabian Gulf. The double-height living area, wrap-around terrace, and bespoke finishes create an unmatched urban sanctuary.',
    features: [
      'Wrap-around terrace',
      'Private elevator',
      'Double-height ceilings',
      'Burj Khalifa view',
      'Smart home automation',
      'Rooftop plunge pool',
      'Designer kitchen',
      'Floor-to-ceiling glass',
      'Concierge service',
      'Valet parking',
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[1],
    yearBuilt: 2021,
    floorNumber: 62,
    totalFloors: 63,
  },
  {
    id: 'prop-003',
    title: 'Contemporary Golf Course Mansion',
    slug: 'contemporary-golf-course-mansion',
    type: 'villa',
    listingType: 'buy',
    price: 9800000,
    priceUnit: 'AED',
    location: 'Emirates Hills, Dubai',
    city: 'Dubai',
    area: '11,000',
    bedrooms: 7,
    bathrooms: 8,
    parking: 5,
    badge: 'New',
    furnished: 'unfurnished',
    views: ['Golf Course View', 'Lake View'],
    description:
      'Set within the exclusive Emirates Hills enclave, this contemporary masterpiece enjoys stunning views over the signature golf course. The expansive grounds feature a sports court, temperature-controlled pool, and lush landscaped gardens — a true estate for the connoisseur.',
    features: [
      'Golf course view',
      'Sports court',
      'Temperature-controlled pool',
      'Guest house',
      'Smart irrigation system',
      'Outdoor kitchen & BBQ',
      'Security gatehouse',
      'Library/study',
      'Walk-in wardrobes',
      'Solar panels',
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600047508788-786f3865b017?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[0],
    yearBuilt: 2023,
  },
  {
    id: 'prop-004',
    title: 'Luxury Marina View Apartment',
    slug: 'luxury-marina-view-apartment',
    type: 'apartment',
    listingType: 'rent',
    price: 28000,
    priceUnit: '/month',
    location: 'Dubai Marina',
    city: 'Dubai',
    area: '1,850',
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    furnished: 'furnished',
    views: ['Marina View'],
    description:
      'Stunning 3-bedroom apartment in the heart of Dubai Marina with breathtaking views of the marina walk. Fully furnished to the highest standard, with access to premium building amenities including an infinity pool, gym, and direct marina access.',
    features: [
      'Marina view',
      'Fully furnished',
      'Infinity pool access',
      'Gym & sauna',
      'Concierge',
      'Storage room',
      'High-speed internet',
      'Central A/C',
      'Built-in wardrobes',
      'Open-plan kitchen',
    ],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[2],
    yearBuilt: 2020,
    floorNumber: 28,
    totalFloors: 45,
  },
  {
    id: 'prop-005',
    title: 'Beachfront Studio – Minimal & Modern',
    slug: 'beachfront-studio-jbr',
    type: 'apartment',
    listingType: 'rent',
    price: 11000,
    priceUnit: '/month',
    location: 'JBR – Jumeirah Beach Residence',
    city: 'Dubai',
    area: '620',
    bedrooms: 0,
    bathrooms: 1,
    parking: 1,
    badge: 'New',
    furnished: 'furnished',
    views: ['Beach View', 'Sea View'],
    description:
      'Immaculate studio apartment steps from the beach with direct sea views and modern interiors. Perfect for professionals seeking a premium lifestyle in the vibrant JBR community.',
    features: [
      'Beach access',
      'Sea view',
      'Furnished',
      'Pool access',
      'Security 24/7',
      'Air conditioning',
      'High-speed WiFi',
      'Modern kitchen',
      'Walk to restaurants',
      'Metro nearby',
    ],
    images: [
      'https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[2],
    yearBuilt: 2019,
    floorNumber: 12,
    totalFloors: 40,
  },
  {
    id: 'prop-006',
    title: 'DIFC Flagship Office Space',
    slug: 'difc-flagship-office',
    type: 'commercial',
    listingType: 'rent',
    price: 95000,
    priceUnit: '/year',
    location: 'DIFC, Dubai',
    city: 'Dubai',
    area: '3,200',
    bedrooms: 0,
    bathrooms: 4,
    parking: 6,
    furnished: 'semi-furnished',
    views: ['City View'],
    description:
      'Grade-A office space in the prestigious Dubai International Financial Centre. This contemporary workspace offers a prestige address, flexible floor plan, and cutting-edge infrastructure ideal for financial firms, law practices, and corporate headquarters.',
    features: [
      'Grade-A specification',
      'Raised access floor',
      'Dropped ceilings',
      'BMS system',
      'Generator backup',
      'Executive washrooms',
      'Server room',
      'Meeting rooms',
      'Reception area',
      'DIFC license eligible',
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[2],
    yearBuilt: 2018,
    floorNumber: 22,
    totalFloors: 40,
  },
  {
    id: 'prop-007',
    title: 'Arabian Ranches Desert-Style Villa',
    slug: 'arabian-ranches-desert-villa',
    type: 'villa',
    listingType: 'buy',
    price: 6200000,
    priceUnit: 'AED',
    location: 'Arabian Ranches, Dubai',
    city: 'Dubai',
    area: '6,800',
    bedrooms: 5,
    bathrooms: 6,
    parking: 3,
    furnished: 'semi-furnished',
    views: ['Community View', 'Garden View'],
    description:
      'Inspired by Arabic architecture, this elegant 5-bedroom villa in Arabian Ranches 3 is a family sanctuary. Set in a tranquil gated community with 18-hole golf course, equestrian centre, and top-rated schools nearby.',
    features: [
      'Private pool',
      'Maid\'s room',
      'Study room',
      'Landscaped garden',
      'Community club access',
      'Golf course community',
      'Gated security',
      'Storage rooms',
      'Covered parking',
      'Central cooling',
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[1],
    yearBuilt: 2022,
  },
  {
    id: 'prop-008',
    title: 'Elegant 2BR – City Walk District',
    slug: 'elegant-2br-city-walk',
    type: 'apartment',
    listingType: 'rent',
    price: 18000,
    priceUnit: '/month',
    location: 'City Walk, Dubai',
    city: 'Dubai',
    area: '1,400',
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    furnished: 'furnished',
    views: ['City View'],
    badge: 'Hot Deal',
    description:
      'Stylish 2-bedroom apartment in the vibrant City Walk district. Surrounded by world-class dining, retail, and entertainment, this contemporary home offers the ultimate urban lifestyle experience.',
    features: [
      'Modern interiors',
      'City Walk access',
      'Gym & pool',
      'Pet-friendly',
      'Short-term available',
      'High floor',
      'Open-plan living',
      'Chef kitchen',
      'Balcony',
      'Storage unit',
    ],
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop&q=85',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&h=800&fit=crop&q=85',
    ],
    agent: AGENTS[0],
    yearBuilt: 2021,
    floorNumber: 18,
    totalFloors: 30,
  },
]

export function formatPrice(price: number, unit: string): string {
  if (unit === 'AED') {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(1)}M`
    }
    return `AED ${price.toLocaleString()}`
  }
  return `AED ${price.toLocaleString()}${unit}`
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
    name: 'James Morrison',
    email: 'james.morrison@email.com',
    phone: '+971 50 111 2222',
    propertyId: 'prop-001',
    propertyTitle: 'Opulent Palm Frond Villa',
    type: 'viewing',
    date: '2026-09-28',
    status: 'viewing_scheduled',
    message: 'Interested in scheduling a weekend viewing.',
  },
  {
    id: 'enq-002',
    name: 'Priya Sharma',
    email: 'priya.s@corporate.com',
    phone: '+971 55 333 4444',
    propertyId: 'prop-002',
    propertyTitle: 'Sky-High Penthouse',
    type: 'whatsapp',
    date: '2026-09-29',
    status: 'contacted',
    message: 'Wants to know about payment plans.',
  },
  {
    id: 'enq-003',
    name: 'Ahmed Al-Rashid',
    email: 'ahmed.r@gmail.com',
    phone: '+971 52 555 6666',
    propertyId: 'prop-004',
    propertyTitle: 'Luxury Marina View Apartment',
    type: 'form',
    date: '2026-09-30',
    status: 'new',
    message: 'Looking to rent from November 2026.',
  },
  {
    id: 'enq-004',
    name: 'Sarah Chen',
    email: 'sarah.chen@tech.io',
    phone: '+971 54 777 8888',
    propertyId: 'prop-003',
    propertyTitle: 'Contemporary Golf Course Mansion',
    type: 'viewing',
    date: '2026-09-27',
    status: 'new',
    message: 'Interested in buying. Can we discuss?',
  },
  {
    id: 'enq-005',
    name: 'Michael Burke',
    email: 'm.burke@finance.ae',
    phone: '+971 56 999 0000',
    propertyId: 'prop-006',
    propertyTitle: 'DIFC Flagship Office Space',
    type: 'form',
    date: '2026-09-26',
    status: 'closed',
    message: 'Needed for Q4 office expansion.',
  },
  {
    id: 'enq-006',
    name: 'Fatima Hassan',
    email: 'fatima.h@luxury.ae',
    phone: '+971 58 123 9876',
    propertyId: 'prop-007',
    propertyTitle: 'Arabian Ranches Desert-Style Villa',
    type: 'whatsapp',
    date: '2026-10-01',
    status: 'new',
    message: 'School year starting, need to move by October.',
  },
]
