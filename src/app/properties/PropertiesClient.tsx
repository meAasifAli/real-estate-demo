'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Bed, Bath, Maximize2, MapPin, Search, X, ArrowRight,
  Home, Key, LayoutGrid, List, SlidersHorizontal,
} from 'lucide-react'
import type { Property } from '@/lib/data'
import { formatPrice } from '@/lib/data'

interface Props {
  properties: Property[]
}

export default function PropertiesClient({ properties }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'all',
    propertyType: searchParams.get('propertyType') || 'all',
    location: searchParams.get('location') || '',
    minBeds: searchParams.get('minBeds') || '0',
    sort: 'default',
  })
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filtered = properties.filter((p) => {
    if (filters.type !== 'all' && p.listingType !== filters.type) return false
    if (filters.propertyType !== 'all' && p.type !== filters.propertyType) return false
    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (parseInt(filters.minBeds) > 0 && p.bedrooms < parseInt(filters.minBeds)) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (filters.sort === 'price-asc') return a.price - b.price
    if (filters.sort === 'price-desc') return b.price - a.price
    if (filters.sort === 'area-desc') return parseInt(b.area.replace(/,/g, '')) - parseInt(a.area.replace(/,/g, ''))
    return 0
  })

  const activeFiltersCount = [
    filters.type !== 'all',
    filters.propertyType !== 'all',
    filters.location !== '',
    filters.minBeds !== '0',
  ].filter(Boolean).length

  const clearFilters = () => {
    setFilters({ type: 'all', propertyType: 'all', location: '', minBeds: '0', sort: 'default' })
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="bg-navy pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-gold" />
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Properties</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-3">
            Premium Properties
          </h1>
          <p className="text-white/60 text-lg">
            {sorted.length} properties found {filters.location && `in ${filters.location}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-5 mb-6 sm:mb-8 sticky top-20 z-40">
          {/* ── MOBILE VIEW: Compact Search + Filter Drawer Trigger + View Toggle ── */}
          <div className="sm:hidden flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              <input
                type="text"
                placeholder="Search location..."
                value={filters.location}
                onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                className="input-premium input-with-icon py-2 text-sm w-full"
              />
            </div>

            {/* Filter Drawer Trigger Button */}
            <button
              onClick={() => setShowFilters(true)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all shrink-0 ${
                activeFiltersCount > 0
                  ? 'bg-navy text-gold border-gold'
                  : 'bg-cream text-navy border-slate-200'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* View Mode Toggle */}
            <div className="flex gap-0.5 bg-slate-100 rounded-lg p-1 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-navy' : 'text-slate-400'}`}
                aria-label="Grid view"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-navy' : 'text-slate-400'}`}
                aria-label="List view"
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* ── DESKTOP VIEW: Two-Row Horizontal Layout ── */}
          <div className="hidden sm:flex flex-col gap-4">
            {/* ROW 1: Search + Listing Type Tabs + View Mode Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search location, community, or title..."
                  value={filters.location}
                  onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                  className="input-premium input-with-icon py-2.5 text-sm w-full"
                />
              </div>

              <div className="flex gap-1 bg-slate-100 rounded-lg p-1 shrink-0">
                {(['all', 'buy', 'rent'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilters((f) => ({ ...f, type: t }))}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      filters.type === t ? 'bg-navy text-white shadow-sm' : 'text-slate-500 hover:text-navy'
                    }`}
                  >
                    {t === 'all' && 'All'}
                    {t === 'buy' && <><Home size={13} />Buy</>}
                    {t === 'rent' && <><Key size={13} />Rent</>}
                  </button>
                ))}
              </div>

              <div className="flex gap-1 bg-slate-100 rounded-lg p-1 shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-navy' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-navy' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* ROW 2: Property Type + Bedrooms + Sort Dropdowns + Clear Action */}
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters((f) => ({ ...f, propertyType: e.target.value }))}
                className="input-premium py-2.5 text-sm w-full"
              >
                <option value="all">All Property Types</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="penthouse">Penthouse</option>
                <option value="commercial">Commercial</option>
              </select>

              <select
                value={filters.minBeds}
                onChange={(e) => setFilters((f) => ({ ...f, minBeds: e.target.value }))}
                className="input-premium py-2.5 text-sm w-full"
              >
                <option value="0">Any Bedrooms</option>
                <option value="1">1+ Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>

              <select
                value={filters.sort}
                onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
                className="input-premium py-2.5 text-sm w-full"
              >
                <option value="default">Default Sort</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="area-desc">Size: Largest First</option>
              </select>

              <div className="flex items-center justify-between md:justify-end gap-3">
                {activeFiltersCount > 0 ? (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <X size={14} />
                    Reset ({activeFiltersCount})
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 font-medium hidden md:inline">
                    {sorted.length} {sorted.length === 1 ? 'property' : 'properties'} found
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE FILTER BOTTOM DRAWER SHEET ── */}
        {showFilters && (
          <div className="sm:hidden fixed inset-0 z-100 flex flex-col justify-end">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowFilters(false)}
            />

            {/* Drawer Sheet */}
            <div className="relative bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 z-10 animate-in slide-in-from-bottom duration-300">
              {/* Grab handle */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-gold" />
                  <h3 className="font-playfair text-xl font-bold text-navy">Filter Properties</h3>
                </div>
                <div className="flex items-center gap-3">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-red-500 font-semibold uppercase tracking-wider hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-navy"
                    aria-label="Close filters"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Filter Content */}
              <div className="space-y-5">
                {/* Listing Type (Buy / Rent / All) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Listing Type
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
                    {(['all', 'buy', 'rent'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setFilters((f) => ({ ...f, type: t }))}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                          filters.type === t
                            ? 'bg-navy text-white shadow-sm'
                            : 'text-slate-600 hover:text-navy'
                        }`}
                      >
                        {t === 'all' && 'All'}
                        {t === 'buy' && <><Home size={14} />Buy</>}
                        {t === 'rent' && <><Key size={14} />Rent</>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Property Type
                  </label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters((f) => ({ ...f, propertyType: e.target.value }))}
                    className="input-premium py-3 text-sm w-full rounded-xl"
                  >
                    <option value="all">All Property Types</option>
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Bedrooms
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Any Beds', value: '0' },
                      { label: '1+ Beds', value: '1' },
                      { label: '2+ Beds', value: '2' },
                      { label: '3+ Beds', value: '3' },
                      { label: '4+ Beds', value: '4' },
                      { label: '5+ Beds', value: '5' },
                    ].map((bed) => (
                      <button
                        key={bed.value}
                        onClick={() => setFilters((f) => ({ ...f, minBeds: bed.value }))}
                        className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          filters.minBeds === bed.value
                            ? 'bg-navy text-white border-navy shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-gold'
                        }`}
                      >
                        {bed.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sort}
                    onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
                    className="input-premium py-3 text-sm w-full rounded-xl"
                  >
                    <option value="default">Default Sort</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="area-desc">Size: Largest First</option>
                  </select>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowFilters(false)}
                  className="btn-gold w-full justify-center py-3.5 rounded-xl text-sm font-semibold shadow-lg"
                >
                  Show {sorted.length} {sorted.length === 1 ? 'Property' : 'Properties'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {sorted.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Search size={28} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <h3 className="font-playfair text-2xl font-semibold text-navy mb-2">No Properties Found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your filters to see more results</p>
            <button onClick={clearFilters} className="btn-gold">Clear All Filters</button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'
                : 'flex flex-col gap-5'
            }
          >
            {sorted.map((property, i) =>
              viewMode === 'grid' ? (
                <GridCard key={property.id} property={property} />
              ) : (
                <ListCard key={property.id} property={property} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function GridCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="property-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer"
    >
      <div className="img-zoom relative h-56">
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {property.badge && <span className="badge-premium">{property.badge}</span>}
          <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-navy text-xs font-semibold capitalize">
            {property.listingType === 'buy' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-navy/90 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
            {formatPrice(property.price, property.priceUnit)}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/20 capitalize">
            {property.type}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-playfair text-lg font-semibold text-navy mb-2 line-clamp-2 hover:text-gold transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
          <MapPin size={14} className="text-gold shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>
        <div className="flex items-center justify-between sm:justify-start sm:gap-5 py-3 border-t border-b border-slate-100 mb-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 text-slate-600 text-sm">
            <Bed size={15} className="text-gold" />
            <span>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Studio'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 text-sm">
            <Bath size={15} className="text-gold" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 text-sm">
            <Maximize2 size={14} className="text-gold" />
            <span>{property.area} sqft</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={property.agent.image} alt={property.agent.name} className="w-8 h-8 rounded-full object-cover border-2 border-gold/30" />
            <span className="text-xs text-slate-500 font-medium">{property.agent.name.split(' ')[0]}</span>
          </div>
          <span className="text-gold text-sm font-semibold flex items-center gap-1">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}

function ListCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="property-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl flex flex-col sm:flex-row cursor-pointer border border-slate-100"
    >
      <div className="img-zoom relative w-full sm:w-72 h-48 sm:h-auto shrink-0">
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex gap-2">
          {property.badge && <span className="badge-premium">{property.badge}</span>}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-playfair text-xl font-semibold text-navy hover:text-gold transition-colors line-clamp-2">
              {property.title}
            </h3>
            <span className="bg-navy text-white text-sm font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0">
              {formatPrice(property.price, property.priceUnit)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
            <MapPin size={14} className="text-gold" />
            <span>{property.location}</span>
          </div>
          <p className="text-slate-500 text-sm line-clamp-2 mb-4">{property.description}</p>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-5">
            <div className="flex items-center gap-1.5 text-slate-600 text-sm">
              <Bed size={14} className="text-gold" />
              <span>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Studio'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 text-sm">
              <Bath size={14} className="text-gold" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 text-sm">
              <Maximize2 size={13} className="text-gold" />
              <span>{property.area} sqft</span>
            </div>
          </div>
          <span className="text-gold text-sm font-semibold flex items-center gap-1">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
