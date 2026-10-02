import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { AGENCY, whatsappLink } from '@/lib/data'
import { WhatsAppIcon } from '@/components/icons'

const contactItems = [
  { Icon: Phone, title: 'Call us', detail: AGENCY.phone, sub: AGENCY.hours, href: AGENCY.phoneHref },
  { Icon: Mail, title: 'Email', detail: AGENCY.email, sub: 'Reply within 2 hours', href: `mailto:${AGENCY.email}` },
  {
    Icon: MapPin,
    title: 'Visit our office',
    detail: 'Prestige Tech Park, ORR',
    sub: 'Marathahalli – Sarjapur Road',
    href: 'https://maps.google.com/?q=Prestige+Tech+Park+Bengaluru',
  },
]

export default function CTASection() {
  return (
    <section className="section-padding bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] reveal bg-navy">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1600&h=900&fit=crop&q=75"
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-navy via-navy/85 to-navy/30" />

          <div className="relative z-10 px-5 pt-40 pb-6 sm:p-14 md:py-20 max-w-2xl">
            <div className="eyebrow eyebrow-light">Free consultation</div>
            <h2 className="font-playfair text-[2rem] leading-[1.1] sm:text-5xl font-medium text-white mt-3">
              Tell us what you&apos;re looking for. We&apos;ll shortlist it by tonight.
            </h2>
            <p className="text-white/65 text-[15px] sm:text-lg mt-4 leading-relaxed">
              Share your budget, locality and must-haves on WhatsApp — a consultant will send you 5 verified matches within hours.
            </p>
            <div className="grid sm:flex gap-3 mt-7">
              <a
                href={whatsappLink("Hi LuxeEstates! I'd like a free consultation. My budget is ___ and I'm looking in ___.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-7"
              >
                <WhatsAppIcon size={18} />
                Chat on WhatsApp
              </a>
              <Link href="/properties" className="btn-ghost-light px-7">
                Browse properties
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
          {contactItems.map(({ Icon, title, detail, sub, href }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="reveal group flex items-center gap-4 p-4 sm:p-6 bg-cream rounded-3xl border border-transparent hover:border-gold/40 hover:bg-white transition-all"
            >
              <div className="w-12 h-12 bg-white group-hover:bg-navy rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors">
                <Icon size={20} className="text-gold-dark group-hover:text-gold-light transition-colors" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</div>
                <div className="text-navy font-semibold text-[15px] truncate mt-0.5">{detail}</div>
                <div className="text-slate-400 text-xs mt-0.5">{sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
