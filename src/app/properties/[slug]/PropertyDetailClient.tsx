'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  Bed, Bath, Maximize2, MapPin, Car, Calendar, Building2, CheckCircle2,
  Phone, Share2, Heart, ChevronLeft, ChevronRight, Sofa, Star, ArrowLeft,
  Train, Plane, GraduationCap, Hospital, ShoppingBag, Images, BadgeCheck, ShieldCheck,
} from 'lucide-react'
import type { Property } from '@/lib/data'
import { formatPrice, whatsappLink } from '@/lib/data'
import ViewingForm from '@/components/ViewingForm'
import { PropertyCard } from '@/components/PropertyCard'
import { WhatsAppIcon } from '@/components/icons'

interface Props {
  property: Property
  related: Property[]
}

export default function PropertyDetailClient({ property, related }: Props) {
  const [activeImage, setActiveImage] = useState(0)
  const [showViewingForm, setShowViewingForm] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [shareMsg, setShareMsg] = useState('')
  const railRef = useRef<HTMLDivElement>(null)

  const isRent = property.listingType === 'rent'
  const waHref = whatsappLink(`Hi! I'm interested in "${property.title}" (Ref BLR-${refNo(property)}). Can you share more details?`, property.agent.whatsapp)
  const locality = property.location.replace(/,\s*Bengaluru$/i, '')
  const features = showAllFeatures ? property.features : property.features.slice(0, 6)

  const scrollTo = (i: number) => {
    const rail = railRef.current
    if (!rail) return
    const idx = (i + property.images.length) % property.images.length
    rail.scrollTo({ left: idx * rail.clientWidth, behavior: 'smooth' })
  }

  const onRailScroll = () => {
    const rail = railRef.current
    if (!rail) return
    setActiveImage(Math.round(rail.scrollLeft / rail.clientWidth))
  }

  const share = async () => {
    const data = { title: property.title, url: window.location.href }
    try {
      if (navigator.share) {
        await navigator.share(data)
      } else {
        await navigator.clipboard.writeText(data.url)
        setShareMsg('Link copied')
        setTimeout(() => setShareMsg(''), 2000)
      }
    } catch {
      /* user cancelled */
    }
  }

  const facts = [
    property.bedrooms > 0 && { Icon: Bed, value: `${property.bedrooms}`, label: 'Bedrooms' },
    { Icon: Bath, value: `${property.bathrooms}`, label: 'Baths' },
    { Icon: Maximize2, value: property.area, label: 'Sq. ft' },
    { Icon: Car, value: `${property.parking}`, label: 'Parking' },
  ].filter(Boolean) as { Icon: typeof Bed; value: string; label: string }[]

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* ── Gallery ── */}
      <div className="max-w-7xl mx-auto md:px-6 lg:px-8 md:pt-6">
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-gold-dark">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-gold-dark">Properties</Link>
          <span>/</span>
          <span className="text-navy font-medium truncate">{property.title}</span>
        </div>

        <div className="relative md:rounded-[28px] overflow-hidden bg-navy group">
          <div
            ref={railRef}
            onScroll={onRailScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar aspect-[4/3] md:aspect-[21/9]"
          >
            {property.images.map((img, i) => (
              <img
                key={img}
                src={img}
                alt={`${property.title} — photo ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover shrink-0 snap-center"
              />
            ))}
          </div>

          <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/40 to-transparent pointer-events-none" />

          {/* Top actions */}
          <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between">
            <Link
              href="/properties"
              aria-label="Back to properties"
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-navy shadow md:invisible"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="flex gap-2">
              <button
                onClick={share}
                aria-label="Share property"
                className="h-10 px-3 rounded-full bg-white/90 backdrop-blur flex items-center justify-center gap-1.5 text-navy text-sm font-semibold shadow"
              >
                <Share2 size={16} />
                {shareMsg && <span>{shareMsg}</span>}
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                aria-label={isSaved ? 'Remove from saved' : 'Save property'}
                aria-pressed={isSaved}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow"
              >
                <Heart size={17} className={isSaved ? 'text-rose-500 fill-rose-500' : 'text-navy'} />
              </button>
            </div>
          </div>

          {/* Desktop arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={() => scrollTo(activeImage - 1)}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 rounded-full items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} className="text-navy" />
              </button>
              <button
                onClick={() => scrollTo(activeImage + 1)}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 rounded-full items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next photo"
              >
                <ChevronRight size={20} className="text-navy" />
              </button>
            </>
          )}

          {/* Dots + counter */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5 pointer-events-none md:hidden">
            {property.images.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all ${i === activeImage ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`} />
            ))}
          </div>
          <div className="absolute bottom-4 right-4 bg-black/55 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Images size={13} />
            {activeImage + 1}/{property.images.length}
          </div>
        </div>

        {/* Desktop thumbnails */}
        <div className="hidden md:flex gap-3 mt-3">
          {property.images.map((img, i) => (
            <button
              key={img}
              onClick={() => scrollTo(i)}
              className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                i === activeImage ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* ── Main column ── */}
          <div className="lg:col-span-2">
            {/* Title card — overlaps gallery on mobile */}
            <div className="relative -mt-6 md:mt-6 bg-white md:bg-transparent rounded-t-[28px] md:rounded-none -mx-4 px-4 pt-6 pb-2 md:m-0 md:p-0">
              <div className="flex flex-wrap items-center gap-2">
                {property.badge && <span className="badge-premium">{property.badge}</span>}
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-dark">
                  {property.type} · {isRent ? 'For rent' : 'For sale'}
                </span>
              </div>
              <h1 className="font-playfair text-[1.75rem] leading-tight sm:text-4xl font-medium text-navy mt-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-2">
                <MapPin size={15} className="text-gold shrink-0" />
                {locality}
              </div>

              <div className="flex items-end justify-between gap-3 mt-5 lg:hidden">
                <div>
                  <div className="font-playfair text-3xl font-semibold text-navy">
                    {formatPrice(property.price, property.priceUnit)}
                  </div>
                  {!isRent && (
                    <div className="text-slate-500 text-xs mt-0.5">
                      ₹{pricePerSqft(property).toLocaleString('en-IN')} / sq.ft · EMI from ₹{emi(property.price * 0.8, 8.5, 20).toLocaleString('en-IN')}/mo
                    </div>
                  )}
                </div>
              </div>

              {/* Key facts */}
              <div className={`grid ${facts.length === 4 ? 'grid-cols-4' : 'grid-cols-3'} mt-5 bg-cream md:bg-white rounded-3xl divide-x divide-black/5 border border-black/5`}>
                {facts.map(({ Icon, value, label }) => (
                  <div key={label} className="py-4 text-center">
                    <Icon size={18} className="text-gold-dark mx-auto" strokeWidth={1.75} />
                    <div className="font-semibold text-navy mt-1.5 text-[15px]">{value}</div>
                    <div className="text-slate-400 text-[11px]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              <Card title="About this home">
                <p className={`text-slate-600 leading-relaxed text-[15px] ${expanded ? '' : 'line-clamp-4'}`}>
                  {property.description}
                </p>
                <button onClick={() => setExpanded(!expanded)} className="text-gold-dark font-semibold text-sm mt-2">
                  {expanded ? 'Show less' : 'Read more'}
                </button>
                {property.views && property.views.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {property.views.map((v) => (
                      <span key={v} className="px-3 py-1.5 bg-gold/10 text-gold-dark text-xs font-semibold rounded-full">
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </Card>

              <Card title="Amenities">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2 size={17} className="text-emerald-600 shrink-0" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                {property.features.length > 6 && (
                  <button
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="mt-4 w-full sm:w-auto btn-outline-gold min-h-[40px] py-2 text-sm"
                  >
                    {showAllFeatures ? 'Show fewer' : `Show all ${property.features.length} amenities`}
                  </button>
                )}
              </Card>

              <Card title="Details">
                <dl className="grid grid-cols-2 gap-x-6">
                  {[
                    ['Property type', property.type],
                    ['Listing', isRent ? 'For rent' : 'For sale'],
                    ['Super built-up', `${property.area} sq.ft`],
                    ['Furnishing', property.furnished],
                    property.yearBuilt && ['Year built', String(property.yearBuilt)],
                    property.floorNumber && ['Floor', `${property.floorNumber} of ${property.totalFloors}`],
                    !property.floorNumber && property.totalFloors && ['Floors', String(property.totalFloors)],
                    ['Reference', `BLR-${refNo(property)}`],
                  ]
                    .filter(Boolean)
                    .map((row) => {
                      const [k, v] = row as [string, string]
                      return (
                        <div key={k} className="py-3 border-b border-slate-100">
                          <dt className="text-slate-400 text-xs">{k}</dt>
                          <dd className="text-navy font-semibold text-sm capitalize mt-0.5">{v}</dd>
                        </div>
                      )
                    })}
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['RERA verified', 'Clear title', 'A-Khata'].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                      <BadgeCheck size={13} /> {t}
                    </span>
                  ))}
                </div>
              </Card>

              <Card title="Location & commute">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(property.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-placeholder relative block overflow-hidden"
                >
                  <div className="text-center">
                    <div className="relative mx-auto w-14 h-14">
                      <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping" />
                      <span className="relative w-14 h-14 rounded-full bg-navy flex items-center justify-center shadow-lg">
                        <MapPin size={24} className="text-gold-light" />
                      </span>
                    </div>
                    <div className="font-semibold text-navy mt-4 px-4">{locality}</div>
                    <div className="text-gold-dark text-sm font-semibold mt-1">Open in Google Maps →</div>
                  </div>
                </a>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4">
                  {[
                    { label: 'Metro station', time: '5 min', Icon: Train },
                    { label: 'KIA Airport', time: '45 min', Icon: Plane },
                    { label: 'Intl. schools', time: '8 min', Icon: GraduationCap },
                    { label: 'Hospital', time: '10 min', Icon: Hospital },
                    { label: 'Mall', time: '12 min', Icon: ShoppingBag },
                    { label: 'Tech park', time: '15 min', Icon: Building2 },
                  ].map(({ label, time, Icon }) => (
                    <div key={label} className="flex items-center gap-2.5 p-3 rounded-2xl bg-cream">
                      <Icon size={17} className="text-gold-dark shrink-0" strokeWidth={1.75} />
                      <div className="min-w-0">
                        <div className="text-navy font-semibold text-sm">{time}</div>
                        <div className="text-slate-500 text-[11px] truncate">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {!isRent && <EmiCalculator price={property.price} />}

              {/* Agent — mobile only (desktop shows it in sidebar) */}
              <div className="lg:hidden">
                <AgentCard property={property} waHref={waHref} onBook={() => setShowViewingForm(true)} />
              </div>
            </div>
          </div>

          {/* ── Sidebar (desktop) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4 mt-6">
              <div className="bg-white rounded-[28px] border border-black/5 shadow-[0_20px_50px_-25px_rgba(11,26,44,0.35)] p-6">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  {isRent ? 'Monthly rent' : 'Asking price'}
                </div>
                <div className="font-playfair text-4xl font-semibold text-navy mt-1">
                  {formatPrice(property.price, property.priceUnit)}
                </div>
                {!isRent && (
                  <div className="text-slate-500 text-sm mt-1">
                    ₹{pricePerSqft(property).toLocaleString('en-IN')} / sq.ft
                  </div>
                )}
                <div className="flex flex-col gap-2.5 mt-6">
                  <button onClick={() => setShowViewingForm(true)} className="btn-gold w-full">
                    <Calendar size={16} />
                    Book a site visit
                  </button>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                    <WhatsAppIcon size={18} />
                    WhatsApp agent
                  </a>
                  <a href={`tel:${property.agent.phone.replace(/\s/g, '')}`} className="btn-outline-gold w-full">
                    <Phone size={16} />
                    {property.agent.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-5 pt-5 border-t border-slate-100">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Zero brokerage on new launches
                </div>
              </div>
              <AgentCard property={property} waHref={waHref} compact />
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12 sm:mt-16 overflow-hidden">
            <div className="flex items-end justify-between mb-5 sm:mb-8">
              <div>
                <div className="eyebrow">Similar homes</div>
                <h2 className="font-playfair text-2xl sm:text-4xl font-medium text-navy mt-2">You may also like</h2>
              </div>
              <Link href="/properties" className="text-gold-dark text-sm font-semibold">See all →</Link>
            </div>
            <div className="snap-rail md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:m-0 md:p-0">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} className="w-[80vw] max-w-[320px] md:w-auto md:max-w-none" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile sticky action bar ── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-black/5 shadow-[0_-8px_30px_-12px_rgba(11,26,44,0.25)] px-4 pt-3 pb-safe">
        <div className="flex items-center gap-2.5 max-w-xl mx-auto">
          <a
            href={`tel:${property.agent.phone.replace(/\s/g, '')}`}
            className="w-12 h-12 rounded-2xl border border-[#E5E0D6] flex items-center justify-center text-navy shrink-0"
            aria-label="Call agent"
          >
            <Phone size={19} />
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0"
            aria-label="WhatsApp agent"
          >
            <WhatsAppIcon size={22} />
          </a>
          <button onClick={() => setShowViewingForm(true)} className="btn-gold flex-1 rounded-2xl min-h-[48px]">
            <Calendar size={17} />
            Book site visit
          </button>
        </div>
      </div>

      {showViewingForm && (
        <ViewingForm property={property} onClose={() => setShowViewingForm(false)} />
      )}
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function refNo(p: Property) {
  return p.id.split('-')[1]?.toUpperCase() || 'PROP'
}

function pricePerSqft(p: Property) {
  return Math.round(p.price / parseInt(p.area.replace(/,/g, '')))
}

function emi(principal: number, ratePct: number, years: number) {
  const r = ratePct / 12 / 100
  const n = years * 12
  return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
}

function formatINRShort(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2).replace(/\.?0+$/, '')} Cr`
  if (n >= 100000) return `₹${(n / 100000).toFixed(1).replace(/\.0$/, '')} L`
  return `₹${n.toLocaleString('en-IN')}`
}

// ── Sub-components ───────────────────────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-[28px] p-5 sm:p-7 border border-black/5">
      <h2 className="font-playfair text-xl sm:text-2xl font-medium text-navy mb-4">{title}</h2>
      {children}
    </section>
  )
}

function EmiCalculator({ price }: { price: number }) {
  const [downPct, setDownPct] = useState(20)
  const [years, setYears] = useState(20)
  const [rate, setRate] = useState(8.5)

  const loan = price * (1 - downPct / 100)
  const monthly = emi(loan, rate, years)

  return (
    <section className="bg-navy rounded-[28px] p-5 sm:p-7 text-white relative overflow-hidden">
      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-playfair text-xl sm:text-2xl font-medium">EMI calculator</h2>
            <p className="text-white/50 text-xs mt-1">Indicative only · partner banks: SBI, HDFC, ICICI</p>
          </div>
          <div className="text-right">
            <div className="font-playfair text-2xl sm:text-3xl font-semibold text-gold-light">
              ₹{monthly.toLocaleString('en-IN')}
            </div>
            <div className="text-white/50 text-xs">per month</div>
          </div>
        </div>

        <div className="space-y-5 mt-6">
          <Slider label="Down payment" value={`${downPct}% · ${formatINRShort(price * downPct / 100)}`} min={10} max={50} step={5} current={downPct} onChange={setDownPct} />
          <Slider label="Tenure" value={`${years} years`} min={5} max={30} step={1} current={years} onChange={setYears} />
          <Slider label="Interest rate" value={`${rate.toFixed(2)}%`} min={7.5} max={11} step={0.05} current={rate} onChange={setRate} />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/10 text-sm">
          <div>
            <div className="text-white/50 text-xs">Loan amount</div>
            <div className="font-semibold mt-0.5">{formatINRShort(loan)}</div>
          </div>
          <div>
            <div className="text-white/50 text-xs">Total interest</div>
            <div className="font-semibold mt-0.5">{formatINRShort(monthly * years * 12 - loan)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Slider({
  label, value, min, max, step, current, onChange,
}: {
  label: string; value: string; min: number; max: number; step: number; current: number; onChange: (n: number) => void
}) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm mb-2.5">
        <span className="text-white/60">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="range-gold"
        style={{
          background: `linear-gradient(90deg, var(--gold) ${((current - min) / (max - min)) * 100}%, rgba(255,255,255,0.15) 0)`,
        }}
      />
    </label>
  )
}

function AgentCard({
  property, waHref, onBook, compact = false,
}: {
  property: Property; waHref: string; onBook?: () => void; compact?: boolean
}) {
  return (
    <section className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/5">
      <div className="flex items-center gap-4">
        <img
          src={property.agent.image}
          alt={property.agent.name}
          className="w-16 h-16 rounded-2xl object-cover"
        />
        <div className="min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-dark">Listing consultant</div>
          <div className="font-playfair text-lg font-medium text-navy mt-0.5">{property.agent.name}</div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
            <Star size={12} className="text-gold fill-gold" />
            <span className="font-semibold text-navy">4.9</span> · 140+ homes sold
          </div>
        </div>
      </div>
      {!compact && (
        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm px-3">
            <WhatsAppIcon size={17} /> WhatsApp
          </a>
          <button onClick={onBook} className="btn-dark text-sm px-3">
            <Calendar size={16} /> Site visit
          </button>
        </div>
      )}
    </section>
  )
}
