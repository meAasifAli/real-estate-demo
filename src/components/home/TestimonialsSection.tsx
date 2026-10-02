import { Star, Quote, MapPin } from 'lucide-react'
import SectionHeader from './SectionHeader'

const testimonials = [
  {
    name: 'Deepak & Shweta Rao',
    role: 'Tech Executive & Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'Ramesh understood exactly what we wanted and found us the perfect Whitefield villa within two weeks. Seamless, transparent and genuinely premium.',
    location: 'Whitefield',
  },
  {
    name: 'Arvind Swaminathan',
    role: 'VP Engineering, relocated from Singapore',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    text: 'I was nervous about navigating Bengaluru from abroad. They ran video walkthroughs, handled the paperwork, and the Indiranagar penthouse exceeded every expectation.',
    location: 'Indiranagar',
  },
  {
    name: 'Meera Nambiar',
    role: 'NRI Investor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
    text: "Their micro-market data and title verification are unmatched. They're the only agency I trust for high-value property in Bengaluru.",
    location: 'Sarjapur Road',
  },
  {
    name: 'Sanjay Kulkarni',
    role: 'Fintech Founder',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    text: 'We needed a lake-facing home near HSR with good schools nearby. Five viewings in one Saturday, keys in three weeks.',
    location: 'HSR Layout',
  },
]

const platforms = [
  { platform: 'Google', rating: '4.9', reviews: '340+' },
  { platform: 'MagicBricks', rating: '4.9', reviews: '180+' },
  { platform: '99acres', rating: '4.8', reviews: '210+' },
]

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client stories"
          title="Bengaluru homeowners, in their words."
        />

        <div className="snap-rail lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:m-0 lg:p-0">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`reveal delay-${(i % 4) * 100 + 100} w-[80vw] max-w-[320px] lg:w-auto lg:max-w-none flex flex-col bg-white rounded-3xl p-5 sm:p-6 border border-black/5 shadow-[0_2px_12px_-4px_rgba(11,26,44,0.1)]`}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <Quote size={28} className="text-gold/20" />
              </div>
              <blockquote className="font-playfair text-[1.05rem] sm:text-lg text-navy leading-relaxed mt-4 flex-1">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} loading="lazy" className="w-11 h-11 rounded-full object-cover" />
                <div className="min-w-0">
                  <div className="font-semibold text-navy text-sm truncate">{t.name}</div>
                  <div className="text-slate-500 text-xs truncate">{t.role}</div>
                  <div className="flex items-center gap-1 text-gold-dark text-[11px] font-semibold mt-0.5">
                    <MapPin size={10} /> {t.location}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:flex sm:justify-center sm:gap-4 reveal">
          {platforms.map((r) => (
            <div
              key={r.platform}
              className="flex flex-col sm:flex-row items-center sm:gap-3 bg-white px-3 sm:px-6 py-3 sm:py-3.5 rounded-2xl border border-black/5 text-center sm:text-left"
            >
              <div className="font-playfair text-2xl font-semibold text-navy leading-none">{r.rating}</div>
              <div className="mt-1 sm:mt-0">
                <div className="hidden sm:flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} className="text-gold fill-gold" />
                  ))}
                </div>
                <div className="text-slate-500 text-[11px] sm:text-xs mt-0.5">
                  <span className="font-semibold text-navy">{r.platform}</span>
                  <span className="hidden sm:inline"> · {r.reviews} reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
