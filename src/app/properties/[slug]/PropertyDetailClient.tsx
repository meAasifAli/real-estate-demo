'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bed, Bath, Maximize2, MapPin, Car, Calendar, Building2, CheckCircle2,
  Phone, Share2, Heart, ChevronLeft, ChevronRight, Sofa,
  Star, Eye, ArrowRight, Train, Plane, ShoppingBag,
  Home, ClipboardList, Ruler, ShowerHead, ParkingSquare, Tag,
} from 'lucide-react'
import type { Property } from '@/lib/data'
import { formatPrice } from '@/lib/data'
import ViewingForm from '@/components/ViewingForm'

interface Props {
  property: Property
  related: Property[]
}

export default function PropertyDetailClient({ property, related }: Props) {
  const [activeImage, setActiveImage] = useState(0)
  const [showViewingForm, setShowViewingForm] = useState(false)
  const [isWishlist, setIsWishlist] = useState(false)

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in: ${property.title}. Can you provide more details?`
  )

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-gold transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-navy font-medium truncate">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image gallery */}
            <div>
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 bg-slate-100 mb-3 group">
                <img
                  src={property.images[activeImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {/* Navigation arrows */}
                <button
                  onClick={() => setActiveImage((i) => (i - 1 + property.images.length) % property.images.length)}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg opacity-90 sm:opacity-0 sm:group-hover:opacity-100 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} className="text-navy" />
                </button>
                <button
                  onClick={() => setActiveImage((i) => (i + 1) % property.images.length)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg opacity-90 sm:opacity-0 sm:group-hover:opacity-100 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} className="text-navy" />
                </button>
                {/* Photo count */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Eye size={12} />
                  {activeImage + 1} / {property.images.length}
                </div>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.badge && <span className="badge-premium">{property.badge}</span>}
                  <span className="px-2.5 py-1 rounded-full bg-white/90 text-navy text-xs font-semibold capitalize">
                    {property.listingType === 'buy' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsWishlist(!isWishlist)}
                    className="w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-all"
                  >
                    <Heart size={16} className={isWishlist ? 'text-red-500 fill-red-500' : 'text-slate-500'} />
                  </button>
                  <button className="w-9 h-9 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-all">
                    <Share2 size={16} className="text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === activeImage ? 'border-gold shadow-md' : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property header */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin size={16} className="text-gold" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-playfair text-3xl font-bold text-gold">
                    {formatPrice(property.price, property.priceUnit)}
                  </div>
                  <div className="text-slate-400 text-sm capitalize">{property.type}</div>
                </div>
              </div>

              {/* Quick stats chips */}
              <div className="flex flex-wrap gap-3">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-slate-100 text-sm font-medium text-navy shadow-sm">
                    <Bed size={15} className="text-gold" />
                    {property.bedrooms} Bedrooms
                  </div>
                )}
                <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-slate-100 text-sm font-medium text-navy shadow-sm">
                  <Bath size={15} className="text-gold" />
                  {property.bathrooms} Bathrooms
                </div>
                <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-slate-100 text-sm font-medium text-navy shadow-sm">
                  <Maximize2 size={14} className="text-gold" />
                  {property.area} sqft
                </div>
                {property.parking > 0 && (
                  <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-slate-100 text-sm font-medium text-navy shadow-sm">
                    <Car size={14} className="text-gold" />
                    {property.parking} Parking
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-slate-100 text-sm font-medium text-navy shadow-sm">
                    <Calendar size={14} className="text-gold" />
                    Built {property.yearBuilt}
                  </div>
                )}
                <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-slate-100 text-sm font-medium text-navy shadow-sm capitalize">
                  <Sofa size={14} className="text-gold" />
                  {property.furnished}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
              <h2 className="font-playfair text-2xl font-semibold text-navy mb-4">About This Property</h2>
              <div className="gold-divider mb-5" />
              <p className="text-slate-600 leading-relaxed text-base">{property.description}</p>
              {property.views && property.views.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {property.views.map((v) => (
                    <span key={v} className="flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full border border-gold/20">
                      <Eye size={12} className="text-gold" />
                      {v}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Features & amenities */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
              <h2 className="font-playfair text-2xl font-semibold text-navy mb-4">Features & Amenities</h2>
              <div className="gold-divider mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-gold shrink-0" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property details table */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
              <h2 className="font-playfair text-2xl font-semibold text-navy mb-4">Property Details</h2>
              <div className="gold-divider mb-6" />
              <DetailGrid property={property} />
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
              <h2 className="font-playfair text-2xl font-semibold text-navy mb-4">Location</h2>
              <div className="gold-divider mb-6" />
              <div className="map-placeholder rounded-xl overflow-hidden">
                <div className="text-center py-16">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin size={28} className="text-blue-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-slate-600 text-lg mb-2">{property.location}</h3>
                  <p className="text-slate-400 text-sm">Interactive map available in production</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    {[
                      { label: 'Namma Metro: 5 min', Icon: Train },
                      { label: 'Kempegowda Airport: 35 min', Icon: Plane },
                      { label: 'Tech Park / Mall: 10 min', Icon: ShoppingBag },
                    ].map(({ label, Icon }) => (
                      <div key={label} className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full text-sm text-slate-500 shadow-sm border border-slate-100">
                        <Icon size={13} className="text-gold" />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Sidebar */}
          <div className="space-y-6">
            {/* Price sticky card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
              <div className="font-playfair text-3xl font-bold text-gold mb-1">
                {formatPrice(property.price, property.priceUnit)}
              </div>
              <div className="text-slate-400 text-sm mb-6 capitalize">
                {property.listingType === 'buy' ? 'Purchase Price' : 'Rental Price'}
              </div>

              {/* Agent card */}
              <div className="flex items-center gap-3 p-4 bg-cream rounded-xl mb-6">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gold/30"
                />
                <div>
                  <div className="font-semibold text-navy">{property.agent.name}</div>
                  <div className="text-slate-500 text-xs">Senior Property Consultant</div>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className="text-gold fill-gold" />
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowViewingForm(true)}
                  className="btn-gold w-full justify-center py-3.5"
                >
                  <Calendar size={16} />
                  Schedule a Viewing
                </button>
                <a
                  href={`https://wa.me/${property.agent.whatsapp}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 rounded-md hover:bg-[#1ebe5d] transition-colors text-sm uppercase tracking-wider"
                >
                  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white">
                    <path d="M16.003 2.003C8.277 2.003 2 8.28 2 16.003c0 2.484.64 4.87 1.858 6.975L2.003 30l7.222-1.833A13.93 13.93 0 0016.003 30c7.723 0 13.997-6.277 13.997-14S23.726 2.003 16.003 2.003zm6.303 19.905c-.345-.173-2.044-1.007-2.361-1.122-.316-.114-.547-.172-.777.173-.23.346-.892 1.122-1.094 1.352-.2.23-.402.259-.748.086-.345-.173-1.456-.537-2.773-1.712-1.025-.915-1.717-2.044-1.918-2.39-.2-.346-.022-.533.15-.705.155-.154.345-.403.518-.605.173-.201.23-.345.345-.576.115-.23.058-.432-.029-.605-.086-.173-.777-1.872-1.065-2.563-.28-.672-.563-.58-.777-.59l-.662-.01a1.27 1.27 0 00-.92.43c-.316.346-1.208 1.18-1.208 2.879s1.237 3.338 1.41 3.569c.172.23 2.433 3.713 5.896 5.207.823.356 1.466.568 1.967.727.826.263 1.579.226 2.173.137.663-.1 2.044-.836 2.33-1.644.288-.807.288-1.5.202-1.644-.086-.144-.316-.23-.662-.403z" />
                  </svg>
                  WhatsApp Agent
                </a>
                <a
                  href={`tel:${property.agent.phone}`}
                  className="btn-outline-gold w-full justify-center py-3.5"
                >
                  <Phone size={16} />
                  Call Agent
                </a>
              </div>

              {/* Ref number */}
              <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                <span className="text-slate-400 text-xs">Ref: BLR-{property.id.split('-')[1]?.toUpperCase() || 'PROP'}</span>
              </div>
            </div>

            {/* Mortgage estimator */}
            {property.listingType === 'buy' && (
              <div className="bg-navy rounded-2xl p-6 text-white">
                <h3 className="font-playfair text-lg font-semibold mb-1">Mortgage Estimate</h3>
                <div className="gold-divider mb-4" />
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Property Price</span>
                    <span className="font-medium">{formatPrice(property.price, property.priceUnit)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">20% Down Payment</span>
                    <span className="font-medium text-gold">{formatPrice(property.price * 0.2, 'INR')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Est. Monthly</span>
                    <span className="font-semibold text-gold text-lg">
                      ₹{Math.round(property.price * 0.8 * 0.008678).toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                </div>
                <p className="text-white/40 text-xs mt-4">*Based on 8.5% rate over 20 years. Not financial advice.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Properties */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="gold-divider" />
                  <span className="text-gold text-sm font-semibold uppercase tracking-widest">Similar Properties</span>
                </div>
                <h2 className="font-playfair text-3xl font-bold text-navy">You May Also Like</h2>
              </div>
              <Link href="/properties" className="btn-outline-gold text-sm py-2.5 hidden sm:flex">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/properties/${p.slug}`}
                  className="property-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl"
                >
                  <div className="img-zoom h-48">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-playfair text-lg font-semibold text-navy mb-2 line-clamp-2">{p.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gold font-bold">{formatPrice(p.price, p.priceUnit)}</span>
                      <span className="text-slate-400 text-xs">{p.area} sqft</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Price</div>
            <div className="font-playfair text-lg font-bold text-gold leading-tight">
              {formatPrice(property.price, property.priceUnit)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${property.agent.whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm"
              aria-label="WhatsApp Agent"
            >
              <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white">
                <path d="M16.003 2.003C8.277 2.003 2 8.28 2 16.003c0 2.484.64 4.87 1.858 6.975L2.003 30l7.222-1.833A13.93 13.93 0 0016.003 30c7.723 0 13.997-6.277 13.997-14S23.726 2.003 16.003 2.003zm6.303 19.905c-.345-.173-2.044-1.007-2.361-1.122-.316-.114-.547-.172-.777.173-.23.346-.892 1.122-1.094 1.352-.2.23-.402.259-.748.086-.345-.173-1.456-.537-2.773-1.712-1.025-.915-1.717-2.044-1.918-2.39-.2-.346-.022-.533.15-.705.155-.154.345-.403.518-.605.173-.201.23-.345.345-.576.115-.23.058-.432-.029-.605-.086-.173-.777-1.872-1.065-2.563-.28-.672-.563-.58-.777-.59l-.662-.01a1.27 1.27 0 00-.92.43c-.316.346-1.208 1.18-1.208 2.879s1.237 3.338 1.41 3.569c.172.23 2.433 3.713 5.896 5.207.823.356 1.466.568 1.967.727.826.263 1.579.226 2.173.137.663-.1 2.044-.836 2.33-1.644.288-.807.288-1.5.202-1.644-.086-.144-.316-.23-.662-.403z" />
              </svg>
            </a>
            <button
              onClick={() => setShowViewingForm(true)}
              className="btn-gold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calendar size={14} />
              Book Viewing
            </button>
          </div>
        </div>
      </div>

      {/* Viewing Form Modal */}
      {showViewingForm && (
        <ViewingForm
          property={property}
          onClose={() => setShowViewingForm(false)}
        />
      )}
    </div>
  )
}

// ── Detail grid component using lucide icons ──────────────────────────────
function DetailGrid({ property }: { property: Property }) {
  type DetailItem = {
    label: string
    value: string
    Icon: React.ElementType
    iconBg: string
    iconColor: string
  }

  const items: DetailItem[] = [
    {
      label: 'Property Type',
      value: property.type,
      Icon: Home,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      label: 'Listing Type',
      value: property.listingType === 'buy' ? 'For Sale' : 'For Rent',
      Icon: Tag,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
    {
      label: 'Area',
      value: `${property.area} sqft`,
      Icon: Ruler,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    ...(property.bedrooms > 0
      ? [
          {
            label: 'Bedrooms',
            value: property.bedrooms.toString(),
            Icon: Bed,
            iconBg: 'bg-indigo-50',
            iconColor: 'text-indigo-500',
          },
        ]
      : []),
    {
      label: 'Bathrooms',
      value: property.bathrooms.toString(),
      Icon: ShowerHead,
      iconBg: 'bg-cyan-50',
      iconColor: 'text-cyan-500',
    },
    {
      label: 'Parking',
      value: property.parking.toString(),
      Icon: ParkingSquare,
      iconBg: 'bg-slate-50',
      iconColor: 'text-slate-500',
    },
    {
      label: 'Furnished',
      value: property.furnished,
      Icon: Sofa,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
    },
    ...(property.yearBuilt
      ? [
          {
            label: 'Year Built',
            value: property.yearBuilt.toString(),
            Icon: Calendar,
            iconBg: 'bg-green-50',
            iconColor: 'text-green-500',
          },
        ]
      : []),
    ...(property.floorNumber
      ? [
          {
            label: 'Floor',
            value: `${property.floorNumber} of ${property.totalFloors}`,
            Icon: Building2,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-500',
          },
        ]
      : []),
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map(({ label, value, Icon, iconBg, iconColor }) => (
        <div key={label} className="bg-cream rounded-xl p-4">
          <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center mb-2.5`}>
            <Icon size={16} className={iconColor} strokeWidth={1.75} />
          </div>
          <div className="text-slate-400 text-xs uppercase tracking-wider font-medium">{label}</div>
          <div className="text-navy font-semibold capitalize mt-0.5 text-sm">{value}</div>
        </div>
      ))}
    </div>
  )
}
