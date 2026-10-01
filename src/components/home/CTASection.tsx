import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

const contactItems = [
  {
    Icon: Phone,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Call Us',
    detail: '+971 4 567 8900',
    sub: 'Mon–Sat, 9 AM – 7 PM',
    href: 'tel:+97145678900',
  },
  {
    Icon: Mail,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Email Us',
    detail: 'hello@luxeestates.ae',
    sub: 'Reply within 2 hours',
    href: 'mailto:hello@luxeestates.ae',
  },
  {
    Icon: MapPin,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Visit Our Office',
    detail: '42 Skyline Blvd, Business Bay',
    sub: 'By appointment only',
    href: '#',
  },
]

export default function CTASection() {
  return (
    <section className="section-padding bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main CTA banner */}
        <div
          className="relative overflow-hidden rounded-3xl reveal"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1920&h=700&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/96 via-navy/80 to-navy/20" />

          <div className="relative z-10 p-6 sm:p-14 max-w-2xl">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="gold-divider w-8" />
              <span className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest">
                Get Started
              </span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="text-white/70 text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Schedule a consultation with our experts today. Whether you&apos;re buying, selling,
              or renting — we guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Link href="/properties" className="btn-gold justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-sm w-full sm:w-auto">
                Browse Properties
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/971501234567?text=Hello%2C%20I%27d%20like%20to%20schedule%20a%20consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-md hover:bg-[#1ebe5d] transition-all text-sm uppercase tracking-wider w-full sm:w-auto"
              >
                <MessageCircle size={17} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Contact strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">
          {contactItems.map(({ Icon, iconBg, iconColor, title, detail, sub, href }) => (
            <a
              key={title}
              href={href}
              className="reveal group flex items-start gap-4 p-6 bg-cream rounded-2xl border border-slate-100 hover:border-gold/40 hover:shadow-md transition-all"
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
              >
                <Icon size={20} className={iconColor} strokeWidth={1.75} />
              </div>
              <div>
                <div className="font-semibold text-navy group-hover:text-gold transition-colors text-sm">
                  {title}
                </div>
                <div className="text-navy/80 text-sm font-medium mt-0.5">{detail}</div>
                <div className="text-slate-400 text-xs mt-0.5">{sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
