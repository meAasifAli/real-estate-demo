'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Home, Key, ShieldCheck, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LOCALITIES } from '@/lib/data'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&h=1280&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1920&h=1280&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1280&fit=crop&q=80',
]

const QUICK_LOCALITIES = LOCALITIES.slice(0, 5)

export default function HeroSection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [budget, setBudget] = useState('any')
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (loc = location) => {
    const params = new URLSearchParams()
    params.set('type', activeTab)
    if (loc) params.set('location', loc)
    if (propertyType !== 'all') params.set('propertyType', propertyType)
    if (budget !== 'any') params.set('budget', budget)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative bg-navy">
      {/* ── Image stage ── */}
      <div className="relative min-h-[86svh] md:min-h-[100svh] flex flex-col justify-end overflow-hidden">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <img
              src={img}
              alt=""
              fetchPriority={i === 0 ? 'high' : 'low'}
              className={`w-full h-full object-cover ${i === currentSlide ? 'ken-burns' : ''}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 sm:pb-14 md:pb-44">
          <div className="inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 bg-white/10 border border-white/15 rounded-full mb-5 backdrop-blur-md">
            <span className="flex items-center gap-1 bg-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              <Star size={10} className="fill-white" /> 4.9
            </span>
            <span className="text-white/90 text-xs sm:text-sm font-medium">
              Trusted by 1,200+ Bengaluru families
            </span>
          </div>

          <h1 className="font-playfair text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[5.25rem] font-medium text-white max-w-4xl">
            Find a home that
            <br className="hidden sm:block" />{' '}
            <em className="text-gold-gradient not-italic sm:italic font-normal">feels like Bengaluru.</em>
          </h1>
          <p className="text-white/75 text-[15px] sm:text-lg mt-4 sm:mt-6 max-w-xl leading-relaxed">
            Handpicked villas, apartments and penthouses across Whitefield, Indiranagar, Koramangala and beyond —
            every title verified, every listing RERA-checked.
          </p>

          {/* Slide indicators */}
          <div className="flex items-center gap-1.5 mt-6 sm:mt-8">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Show image ${i + 1}`}
                className="py-2"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    i === currentSlide ? 'bg-gold w-8' : 'bg-white/35 w-4'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search card: overlaps the hero on all sizes ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-32">
        <div className="glass-card rounded-[28px] p-4 sm:p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] md:max-w-4xl">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="grid grid-cols-2 bg-cream-dark/70 rounded-full p-1 w-full sm:w-auto">
              {(['buy', 'rent'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeTab === t ? 'bg-navy text-white shadow-md' : 'text-slate-500'
                  }`}
                >
                  {t === 'buy' ? <Home size={15} /> : <Key size={15} />}
                  {t === 'buy' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <ShieldCheck size={14} className="text-emerald-600" /> 100% verified listings
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSearch()
            }}
            className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_auto] gap-2.5 sm:gap-3"
          >
            <div className="relative col-span-2 md:col-span-1">
              <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              <input
                type="text"
                placeholder="Locality, project or landmark"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-premium input-with-icon"
                aria-label="Location"
              />
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="input-premium"
              aria-label="Property type"
            >
              <option value="all">All types</option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="penthouse">Penthouse</option>
              <option value="commercial">Commercial</option>
            </select>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="input-premium"
              aria-label="Budget"
            >
              <option value="any">Any budget</option>
              {activeTab === 'buy' ? (
                <>
                  <option value="1.5cr">Up to ₹1.5 Cr</option>
                  <option value="3cr">₹1.5 – 3 Cr</option>
                  <option value="5cr">₹3 – 5 Cr</option>
                  <option value="5cr+">₹5 Cr +</option>
                </>
              ) : (
                <>
                  <option value="40k">Up to ₹40K</option>
                  <option value="80k">₹40K – 80K</option>
                  <option value="80k+">₹80K +</option>
                </>
              )}
            </select>
            <button type="submit" className="btn-gold col-span-2 md:col-span-1 rounded-2xl md:px-7 min-h-[48px]">
              <Search size={18} />
              Search
            </button>
          </form>

          <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <span className="text-xs font-semibold text-slate-400 shrink-0">Popular:</span>
            {QUICK_LOCALITIES.map((l) => (
              <button
                key={l.name}
                onClick={() => handleSearch(l.query)}
                className="chip shrink-0 min-h-0 py-1.5 text-xs"
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2 md:pb-6 bg-transparent">
        <dl className="grid grid-cols-3 gap-2 sm:gap-6 md:max-w-3xl">
          {[
            { value: '2,400+', label: 'Verified listings' },
            { value: '₹450 Cr+', label: 'Deals closed' },
            { value: '18 yrs', label: 'In Bengaluru' },
          ].map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-playfair text-2xl sm:text-3xl font-semibold text-white">{s.value}</dd>
              <dd className="text-white/50 text-[11px] sm:text-sm mt-0.5">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="h-8 md:h-10" />
    </section>
  )
}
