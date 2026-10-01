'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Deepak & Shweta Rao',
    role: 'Tech Executive & Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    text: "LuxeEstates made our dream of owning a Whitefield villa a reality. Ramesh understood exactly what we wanted and found us the perfect property within two weeks. The entire process was seamless, transparent, and truly premium. We couldn't be happier.",
    property: 'Oakwood Serenade Luxury Villa',
    country: 'IN',
    countryLabel: 'Whitefield, Bengaluru',
  },
  {
    name: 'Arvind Swaminathan',
    role: 'VP of Engineering',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    rating: 5,
    text: "As an executive relocating from Singapore, I was nervous about navigating Bengaluru's luxury market. The team at LuxeEstates guided me through every step. I found a beautiful Indiranagar penthouse that exceeded my expectations.",
    property: 'The Grand Azure Sky Penthouse',
    country: 'IN',
    countryLabel: 'Indiranagar, Bengaluru',
  },
  {
    name: 'Meera Nambiar',
    role: 'NRI Investor, Singapore',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
    rating: 5,
    text: "I've transacted multiple premium properties through LuxeEstates over the years. Their micro-market intelligence, title verification, and client support are unmatched. They are the only agency I trust for high-value properties in Bengaluru.",
    property: 'Prestige Green Meadows Garden Villa',
    country: 'SG',
    countryLabel: 'Sarjapur Road, Bengaluru',
  },
  {
    name: 'Sanjay Kulkarni',
    role: 'Fintech Founder',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 5,
    text: "We relocated our core leadership team and needed a serene, lake-facing residence near HSR Layout with good international schools nearby. The team arranged viewings and helped us secure the perfect apartment.",
    property: 'Sovereign Heights Lakeview Apartment',
    country: 'IN',
    countryLabel: 'HSR Layout, Bengaluru',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const changeSlide = useCallback((newIndex: number) => {
    setIsFading(true)
    setTimeout(() => {
      setCurrent(newIndex)
      setIsFading(false)
    }, 280)
  }, [])

  const next = useCallback(() => {
    changeSlide((current + 1) % testimonials.length)
  }, [current, changeSlide])

  const prev = useCallback(() => {
    changeSlide((current - 1 + testimonials.length) % testimonials.length)
  }, [current, changeSlide])

  // Auto-play interval (5.5 seconds)
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      next()
    }, 5500)

    return () => clearInterval(timer)
  }, [isPaused, next])

  const t = testimonials[current]

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="reveal inline-flex items-center gap-2 mb-4">
            <div className="gold-divider" />
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Testimonials
            </span>
            <div className="gold-divider" />
          </div>
          <h2 className="reveal font-playfair text-4xl sm:text-5xl font-bold text-navy mb-4">
            What Our Clients Say
          </h2>
          <p className="reveal text-slate-500 text-lg max-w-xl mx-auto">
            Don&apos;t just take our word for it — hear from our satisfied clients
          </p>
        </div>

        {/* Card with auto-play & pause on hover */}
        <div className="max-w-4xl mx-auto reveal">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 relative overflow-hidden transition-all duration-300"
          >
            {/* Subtle top indicator bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
              <div
                key={current}
                className={`h-full bg-gold transition-all duration-300 ${isPaused ? 'opacity-50' : 'animate-timer'}`}
                style={{
                  animation: isPaused ? 'none' : 'autoProgress 5.5s linear forwards',
                }}
              />
            </div>

            {/* Decorative quote mark */}
            <Quote
              size={64}
              className="absolute top-6 right-8 text-gold/10 pointer-events-none"
              strokeWidth={1}
            />

            {/* Animated content container */}
            <div
              className={`transition-opacity duration-300 ${
                isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-playfair text-xl sm:text-2xl text-navy leading-relaxed mb-8 italic min-h-27.5 sm:min-h-22.5">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author row */}
              <div className="flex items-center justify-between flex-wrap gap-5">
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold/30 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-navy">{t.name}</span>
                      {/* Country badge */}
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-xs font-medium tracking-wide">
                        {t.countryLabel}
                      </span>
                    </div>
                    <div className="text-slate-500 text-sm mt-0.5">{t.role}</div>
                    <div className="text-gold text-xs font-medium mt-1 flex items-center gap-1">
                      <MapPinIcon />
                      {t.property}
                    </div>
                  </div>
                </div>

                {/* Navigation controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-gold hover:text-gold transition-all text-slate-400"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => changeSlide(i)}
                        aria-label={`Testimonial ${i + 1}`}
                        className={`rounded-full transition-all duration-300 h-1.5 ${
                          i === current ? 'bg-gold w-6' : 'bg-slate-200 w-2.5 hover:bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-gold hover:text-gold transition-all text-slate-400"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform ratings */}
        <div className="flex flex-wrap justify-center gap-5 mt-12 reveal">
          {[
            { platform: 'Google Reviews', rating: '4.9', reviews: '340+' },
            { platform: 'Trustpilot', rating: '4.8', reviews: '210+' },
            { platform: 'MagicBricks', rating: '4.9', reviews: '180+' },
          ].map((r) => (
            <div
              key={r.platform}
              className="flex items-center gap-3 bg-white px-6 py-3.5 rounded-xl shadow-sm border border-slate-100"
            >
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-navy text-lg">{r.rating}</span>
                  <div className="flex gap-0.5 ml-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} className="text-gold fill-gold" />
                    ))}
                  </div>
                </div>
                <div className="text-slate-400 text-xs">
                  {r.reviews} reviews on {r.platform}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Inline tiny MapPin to avoid importing lucide just for one icon
function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold"
    >
      <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
