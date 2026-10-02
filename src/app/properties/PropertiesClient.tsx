'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X, LayoutGrid, List, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import type { Property } from '@/lib/data'
import { LOCALITIES } from '@/lib/data'
import { PropertyCard, PropertyListCard } from '@/components/PropertyCard'

interface Props {
  properties: Property[]
}

type Filters = {
  type: string
  propertyType: string
  location: string
  minBeds: string
  budget: string
  sort: string
}

const DEFAULT_FILTERS: Filters = {
  type: 'all',
  propertyType: 'all',
  location: '',
  minBeds: '0',
  budget: 'any',
  sort: 'default',
}

const PROPERTY_TYPES = [
  { value: 'all', label: 'All types' },
  { value: 'villa', label: 'Villas' },
  { value: 'apartment', label: 'Apartments' },
  { value: 'penthouse', label: 'Penthouses' },
  { value: 'commercial', label: 'Commercial' },
]

const BUDGETS: Record<string, { label: string; min: number; max: number }> = {
  '1.5cr': { label: 'Up to ₹1.5 Cr', min: 0, max: 15000000 },
  '3cr': { label: '₹1.5 – 3 Cr', min: 15000000, max: 30000000 },
  '5cr': { label: '₹3 – 5 Cr', min: 30000000, max: 50000000 },
  '5cr+': { label: '₹5 Cr +', min: 50000000, max: Infinity },
  '40k': { label: 'Up to ₹40K/mo', min: 0, max: 40000 },
  '80k': { label: '₹40K – 80K/mo', min: 40000, max: 80000 },
  '80k+': { label: '₹80K+/mo', min: 80000, max: Infinity },
}

const SORTS = [
  { value: 'default', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
  { value: 'area-desc', label: 'Largest first' },
]

// Remount (and re-seed filters) when the URL query changes, e.g. via the tab bar or navbar
export default function PropertiesClient({ properties }: Props) {
  const searchParams = useSearchParams()
  return <PropertiesView key={searchParams.toString()} properties={properties} searchParams={searchParams} />
}

function PropertiesView({ properties, searchParams }: Props & { searchParams: URLSearchParams }) {
  const [filters, setFilters] = useState<Filters>(() => ({
    ...DEFAULT_FILTERS,
    type: searchParams.get('type') || 'all',
    propertyType: searchParams.get('propertyType') || 'all',
    location: searchParams.get('location') || '',
    minBeds: searchParams.get('minBeds') || '0',
    budget: searchParams.get('budget') || 'any',
  }))
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    document.body.style.overflow = showFilters ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showFilters])

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }))

  const filtered = properties.filter((p) => {
    if (filters.type !== 'all' && p.listingType !== filters.type) return false
    if (filters.propertyType !== 'all' && p.type !== filters.propertyType) return false
    if (filters.location) {
      const q = filters.location.toLowerCase()
      if (!p.location.toLowerCase().includes(q) && !p.title.toLowerCase().includes(q)) return false
    }
    if (parseInt(filters.minBeds) > 0 && p.bedrooms < parseInt(filters.minBeds)) return false
    const budget = BUDGETS[filters.budget]
    if (budget) {
      const isRentBudget = filters.budget.endsWith('k') || filters.budget.endsWith('k+')
      if (isRentBudget !== (p.listingType === 'rent')) return false
      if (p.price < budget.min || p.price > budget.max) return false
    }
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
    filters.budget !== 'any',
  ].filter(Boolean).length

  const clearFilters = () => setFilters(DEFAULT_FILTERS)

  const heading =
    filters.type === 'rent' ? 'Homes for rent' : filters.type === 'buy' ? 'Homes for sale' : 'All properties'

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="bg-navy pt-24 pb-6 sm:pt-32 sm:pb-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow eyebrow-light">Bengaluru · {sorted.length} {sorted.length === 1 ? 'listing' : 'listings'}</div>
          <h1 className="font-playfair text-[2rem] sm:text-5xl font-medium text-white mt-2">
            {heading}
            {filters.location && <span className="text-gold-gradient"> in {filters.location}</span>}
          </h1>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 bg-cream/90 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              <input
                type="search"
                placeholder="Search locality or project"
                value={filters.location}
                onChange={(e) => set('location', e.target.value)}
                className="input-premium input-with-icon rounded-full min-h-[44px] py-2.5"
                aria-label="Search by location"
              />
            </div>

            <button
              onClick={() => setShowFilters(true)}
              className={`relative flex items-center gap-2 h-11 px-4 rounded-full border text-sm font-semibold transition-all shrink-0 ${
                activeFiltersCount > 0 ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-[#E5E0D6]'
              }`}
              aria-label="Open filters"
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:static w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-1 bg-white border border-[#E5E0D6] rounded-full p-1 shrink-0">
              {(['grid', 'list'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  aria-label={`${mode} view`}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    viewMode === mode ? 'bg-navy text-white' : 'text-slate-400 hover:text-navy'
                  }`}
                >
                  {mode === 'grid' ? <LayoutGrid size={16} /> : <List size={16} />}
                </button>
              ))}
            </div>
          </div>

          {/* Quick chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {(['all', 'buy', 'rent'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilters((f) => ({ ...f, type: t, budget: 'any' }))}
                className={`chip ${filters.type === t ? 'chip-active' : ''}`}
              >
                {t === 'all' ? 'Buy & Rent' : t === 'buy' ? 'Buy' : 'Rent'}
              </button>
            ))}
            <span className="w-px h-6 bg-black/10 shrink-0 mx-1" />
            {PROPERTY_TYPES.slice(1).map((pt) => (
              <button
                key={pt.value}
                onClick={() => set('propertyType', filters.propertyType === pt.value ? 'all' : pt.value)}
                className={`chip ${filters.propertyType === pt.value ? 'chip-active' : ''}`}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Result meta row */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-navy">{sorted.length}</span> {sorted.length === 1 ? 'property' : 'properties'}
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="ml-2 text-gold-dark font-semibold hover:underline">
                Clear all
              </button>
            )}
          </p>
          <div className="relative flex items-center gap-1.5 text-sm text-navy font-semibold">
            <ArrowUpDown size={14} className="text-gold" />
            <select
              value={filters.sort}
              onChange={(e) => set('sort', e.target.value)}
              className="appearance-none bg-transparent pr-1 outline-none cursor-pointer"
              aria-label="Sort properties"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-16 sm:py-24 bg-white rounded-3xl border border-black/5">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-5">
              <Search size={26} className="text-gold" strokeWidth={1.75} />
            </div>
            <h3 className="font-playfair text-2xl font-medium text-navy mb-2">No matches yet</h3>
            <p className="text-slate-500 mb-6 px-6">Try a nearby locality, or loosen a filter or two.</p>
            <div className="flex flex-wrap justify-center gap-2 px-4 mb-6">
              {LOCALITIES.slice(0, 4).map((l) => (
                <button key={l.name} onClick={() => setFilters({ ...DEFAULT_FILTERS, location: l.query })} className="chip">
                  {l.name}
                </button>
              ))}
            </div>
            <button onClick={clearFilters} className="btn-dark">Reset filters</button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sorted.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:gap-5">
            {sorted.map((property) => (
              <PropertyListCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      {/* ── Filter sheet (bottom sheet on mobile, side drawer on desktop) ── */}
      {showFilters && (
        <div className="fixed inset-0 z-[70] flex flex-col justify-end sm:flex-row sm:justify-end">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm animate-fade" onClick={() => setShowFilters(false)} />

          <div className="relative bg-white rounded-t-[28px] sm:rounded-none sm:w-[420px] sm:h-full max-h-[88svh] sm:max-h-none flex flex-col shadow-2xl animate-sheet">
            <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100">
              <h3 className="font-playfair text-2xl font-medium text-navy">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="w-9 h-9 rounded-full bg-cream flex items-center justify-center text-navy"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-7">
              <FilterGroup label="Looking to">
                <div className="grid grid-cols-3 gap-1 bg-cream p-1 rounded-full">
                  {(['all', 'buy', 'rent'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilters((f) => ({ ...f, type: t, budget: 'any' }))}
                      className={`py-2.5 rounded-full text-sm font-semibold transition-all ${
                        filters.type === t ? 'bg-navy text-white shadow' : 'text-slate-500'
                      }`}
                    >
                      {t === 'all' ? 'Any' : t === 'buy' ? 'Buy' : 'Rent'}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label="Property type">
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((pt) => (
                    <button
                      key={pt.value}
                      onClick={() => set('propertyType', pt.value)}
                      className={`chip ${filters.propertyType === pt.value ? 'chip-active' : ''}`}
                    >
                      {pt.label}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label="Budget">
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => set('budget', 'any')} className={`chip ${filters.budget === 'any' ? 'chip-active' : ''}`}>
                    Any
                  </button>
                  {Object.entries(BUDGETS)
                    .filter(([key]) => {
                      const isRent = key.includes('k')
                      return filters.type === 'all' || (filters.type === 'rent') === isRent
                    })
                    .map(([key, b]) => (
                      <button
                        key={key}
                        onClick={() => set('budget', key)}
                        className={`chip ${filters.budget === key ? 'chip-active' : ''}`}
                      >
                        {b.label}
                      </button>
                    ))}
                </div>
              </FilterGroup>

              <FilterGroup label="Bedrooms">
                <div className="grid grid-cols-6 gap-1.5">
                  {['0', '1', '2', '3', '4', '5'].map((b) => (
                    <button
                      key={b}
                      onClick={() => set('minBeds', b)}
                      className={`h-11 rounded-2xl border text-sm font-semibold transition-all ${
                        filters.minBeds === b ? 'bg-navy text-white border-navy' : 'bg-white border-[#E5E0D6] text-slate-600'
                      }`}
                    >
                      {b === '0' ? 'Any' : `${b}+`}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label="Popular localities">
                <div className="flex flex-wrap gap-2">
                  {LOCALITIES.map((l) => (
                    <button
                      key={l.name}
                      onClick={() => set('location', filters.location === l.query ? '' : l.query)}
                      className={`chip ${filters.location === l.query ? 'chip-active' : ''}`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label="Sort by">
                <div className="grid grid-cols-2 gap-2">
                  {SORTS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => set('sort', s.value)}
                      className={`chip justify-center ${filters.sort === s.value ? 'chip-active' : ''}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </FilterGroup>
            </div>

            <div className="px-5 sm:px-6 pt-3 pb-safe border-t border-slate-100 flex gap-3">
              <button onClick={clearFilters} className="btn-outline-gold flex-1 sm:flex-none">
                Reset
              </button>
              <button onClick={() => setShowFilters(false)} className="btn-gold flex-[2]">
                Show {sorted.length} {sorted.length === 1 ? 'home' : 'homes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.16em] mb-3">{label}</div>
      {children}
    </div>
  )
}
