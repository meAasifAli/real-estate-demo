'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowUpRight } from 'lucide-react'
import type { Property } from '@/lib/data'
import { formatPrice } from '@/lib/data'

function shortLocation(location: string) {
  // "ECC Road, Whitefield, Bengaluru" → "ECC Road, Whitefield"
  return location.replace(/,\s*Bengaluru$/i, '')
}

function SaveButton({ className = '' }: { className?: string }) {
  const [saved, setSaved] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setSaved((s) => !s)}
      aria-label={saved ? 'Remove from saved' : 'Save property'}
      aria-pressed={saved}
      className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm active:scale-90 transition-transform ${className}`}
    >
      <Heart size={16} className={saved ? 'text-rose-500 fill-rose-500' : 'text-navy'} strokeWidth={2} />
    </button>
  )
}

export function PropertyCard({
  property,
  className = '',
  imageClass = 'aspect-[4/3]',
}: {
  property: Property
  className?: string
  imageClass?: string
}) {
  const isRent = property.listingType === 'rent'

  return (
    <article className={`property-card group relative bg-white rounded-3xl overflow-hidden border border-black/5 shadow-[0_2px_12px_-4px_rgba(11,26,44,0.12)] ${className}`}>
      <Link href={`/properties/${property.slug}`} className="block">
        <div className={`img-zoom relative ${imageClass} bg-cream-dark`}>
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-navy/0 to-navy/10" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pr-14">
            {property.badge && <span className="badge-premium">{property.badge}</span>}
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-navy text-[11px] font-semibold">
              {isRent ? 'For Rent' : 'For Sale'}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <div>
              <div className="text-white/70 text-[10px] font-semibold uppercase tracking-[0.14em] capitalize">
                {property.type}
              </div>
              <div className="font-playfair text-white text-2xl font-semibold leading-none mt-1">
                {formatPrice(property.price, property.priceUnit)}
              </div>
            </div>
            <span className="w-9 h-9 rounded-full bg-white/15 border border-white/30 backdrop-blur flex items-center justify-center text-white group-hover:bg-gold group-hover:border-gold transition-colors">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="font-playfair text-[1.075rem] sm:text-lg font-semibold text-navy leading-snug line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 text-[13px] mt-1">
            <MapPin size={13} className="text-gold shrink-0" />
            <span className="truncate">{shortLocation(property.location)}</span>
          </div>

          <div className="mt-3.5 pt-3.5 border-t border-slate-100 grid grid-cols-3 gap-2 text-[13px] text-slate-600">
            <span className="flex items-center gap-1.5">
              <Bed size={15} className="text-slate-400" />
              {property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'Open'}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath size={15} className="text-slate-400" />
              {property.bathrooms} Bath
            </span>
            <span className="flex items-center gap-1.5 justify-end">
              <Maximize2 size={13} className="text-slate-400" />
              {property.area}
              <span className="text-slate-400 -ml-0.5">ft²</span>
            </span>
          </div>
        </div>
      </Link>

      <SaveButton className="absolute top-3 right-3" />
    </article>
  )
}

export function PropertyListCard({ property }: { property: Property }) {
  return (
    <article className="property-card group relative bg-white rounded-3xl overflow-hidden border border-black/5 shadow-[0_2px_12px_-4px_rgba(11,26,44,0.12)]">
      <Link href={`/properties/${property.slug}`} className="flex">
        <div className="img-zoom relative w-32 sm:w-72 shrink-0 bg-cream-dark">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {property.badge && (
            <span className="badge-premium absolute top-2 left-2 sm:top-3 sm:left-3 text-[9px] sm:text-[10px]">
              {property.badge}
            </span>
          )}
        </div>
        <div className="p-3.5 sm:p-6 flex-1 min-w-0 flex flex-col">
          <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {property.type} · {property.listingType === 'rent' ? 'Rent' : 'Sale'}
          </div>
          <h3 className="font-playfair text-[15px] sm:text-xl font-semibold text-navy leading-snug line-clamp-2 mt-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm mt-1">
            <MapPin size={12} className="text-gold shrink-0" />
            <span className="truncate">{shortLocation(property.location)}</span>
          </div>
          <p className="hidden sm:block text-slate-500 text-sm line-clamp-2 mt-3">{property.description}</p>
          <div className="mt-auto pt-2.5 flex items-end justify-between gap-2">
            <div className="font-playfair text-lg sm:text-2xl font-semibold text-navy leading-none">
              {formatPrice(property.price, property.priceUnit)}
            </div>
            <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] sm:text-sm text-slate-500">
              <span className="flex items-center gap-1"><Bed size={13} />{property.bedrooms || '–'}</span>
              <span className="flex items-center gap-1"><Bath size={13} />{property.bathrooms}</span>
              <span className="hidden sm:flex items-center gap-1"><Maximize2 size={12} />{property.area} ft²</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
