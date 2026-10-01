'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Star, Home, Key, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&h=1080&fit=crop&q=90',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1920&h=1080&fit=crop&q=90',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop&q=90',
]

export default function HeroSection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [budget, setBudget] = useState('any')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length)
        setTransitioning(false)
      }, 600)
    }, 5500)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (i: number) => {
    if (i === currentSlide) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(i)
      setTransitioning(false)
    }, 400)
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('type', activeTab)
    if (location) params.set('location', location)
    if (propertyType !== 'all') params.set('propertyType', propertyType)
    if (budget !== 'any') params.set('budget', budget)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[640px] sm:min-h-screen flex items-center overflow-hidden py-24 sm:py-28">

      {/* ── Background image layer (slides only here) ── */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === currentSlide && !transitioning ? 1 : 0 }}
        >
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay — always present, independent of slides */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Decorative side line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden lg:block" />

      {/* ── Static content — never changes, never reflows ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Trust pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white/10 border border-gold/30 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
          <Star size={13} className="text-gold fill-gold" />
          <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wide">
            Bengaluru&apos;s Premier Real Estate Agency
          </span>
        </div>

        {/* Fixed headline — responsive font sizes */}
        <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 sm:mb-5">
          Find Your{' '}
          <span className="text-gold-gradient">Dream Home</span>
        </h1>
        <p className="text-white/75 text-base sm:text-xl mb-6 sm:mb-10 max-w-xl leading-relaxed">
          Discover exceptional properties in Bengaluru&apos;s most prestigious communities — crafted for extraordinary living.
        </p>

        {/* Search card */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 shadow-2xl max-w-2xl">
          {/* Buy / Rent tabs */}
          <div className="flex mb-4 sm:mb-5 bg-slate-100 rounded-xl p-1 w-fit gap-1">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'buy'
                  ? 'bg-navy text-white shadow'
                  : 'text-slate-500 hover:text-navy'
              }`}
            >
              <Home size={14} />
              Buy
            </button>
            <button
              onClick={() => setActiveTab('rent')}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'rent'
                  ? 'bg-navy text-white shadow'
                  : 'text-slate-500 hover:text-navy'
              }`}
            >
              <Key size={14} />
              Rent
            </button>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="relative">
              <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              <input
                type="text"
                placeholder="Whitefield, Indiranagar, HSR..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="input-premium input-with-icon text-sm"
              />
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="input-premium text-sm"
            >
              <option value="all">All Types</option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="penthouse">Penthouse</option>
              <option value="commercial">Commercial</option>
            </select>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="input-premium text-sm"
            >
              <option value="any">Any Budget</option>
              {activeTab === 'buy' ? (
                <>
                  <option value="1.5cr">Up to ₹1.5 Cr</option>
                  <option value="3cr">₹1.5 Cr – ₹3 Cr</option>
                  <option value="5cr">₹3 Cr – ₹5 Cr</option>
                  <option value="5cr+">Above ₹5 Cr</option>
                </>
              ) : (
                <>
                  <option value="40k">Up to ₹40K/mo</option>
                  <option value="80k">₹40K – ₹80K/mo</option>
                  <option value="80k+">Above ₹80K/mo</option>
                </>
              )}
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="btn-gold w-full justify-center py-3.5 rounded-xl text-sm"
          >
            <Search size={16} />
            Search Properties
          </button>
        </div>

        {/* Bottom stats row — 3-col grid on mobile, flex on desktop */}
        <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-10 mt-8 sm:mt-12 border-t border-white/10 pt-5 sm:border-none sm:pt-0">
          {[
            { value: '2,400+', label: 'Properties Listed' },
            { value: '1,200+', label: 'Happy Clients' },
            { value: '₹450 Cr+', label: 'Transactions' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-playfair text-xl sm:text-2xl font-bold text-gold">{s.value}</div>
              <div className="text-white/55 text-xs sm:text-sm mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide dots — centred at bottom */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-400 ${
              i === currentSlide ? 'bg-gold w-8 h-1.5' : 'bg-white/40 w-3 h-1.5 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 z-10 hidden lg:flex flex-col items-center gap-3 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.2em] writing-mode-vertical">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
