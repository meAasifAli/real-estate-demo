import Link from 'next/link'
import { ArrowUpRight, Home, Key, TrendingUp, Briefcase, BarChart2, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AGENTS, AGENCY } from '@/lib/data'
import SectionHeader from './SectionHeader'

interface Service {
  Icon: LucideIcon
  title: string
  description: string
  href: string
}

const services: Service[] = [
  {
    Icon: Home,
    title: 'Buy a home',
    description: 'Curated villas and apartments, site visits arranged around your schedule.',
    href: '/properties?type=buy',
  },
  {
    Icon: Key,
    title: 'Rent',
    description: 'Furnished and semi-furnished homes near your office or school.',
    href: '/properties?type=rent',
  },
  {
    Icon: TrendingUp,
    title: 'Sell',
    description: 'Pricing backed by real registration data and a 6,000+ buyer network.',
    href: '#contact',
  },
  {
    Icon: Briefcase,
    title: 'Commercial',
    description: 'Grade-A offices and retail on ORR, Whitefield and Electronic City.',
    href: '/properties?propertyType=commercial',
  },
  {
    Icon: BarChart2,
    title: 'Valuation',
    description: 'A free, data-backed valuation report within 48 hours.',
    href: '#contact',
  },
  {
    Icon: Settings,
    title: 'NRI management',
    description: 'Tenant screening, rent collection and upkeep while you are abroad.',
    href: '#contact',
  },
]

export default function ServicesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What we do"
          title="Everything property, under one roof."
          subtitle="From your first site visit to registration at the sub-registrar's office."
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {services.map(({ Icon, title, description, href }, i) => (
            <Link
              key={title}
              href={href}
              className={`reveal delay-${(i % 3) * 100 + 100} group relative p-4 sm:p-7 rounded-3xl bg-cream border border-transparent hover:border-gold/40 hover:bg-white hover:shadow-[0_20px_50px_-25px_rgba(11,26,44,0.35)] transition-all duration-300`}
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white group-hover:bg-navy flex items-center justify-center shadow-sm transition-colors">
                  <Icon size={20} className="text-gold-dark group-hover:text-gold-light transition-colors" strokeWidth={1.75} />
                </div>
                <ArrowUpRight size={18} className="text-slate-300 group-hover:text-gold transition-colors" />
              </div>
              <h3 className="font-playfair text-lg sm:text-2xl font-medium text-navy mt-4 sm:mt-6">{title}</h3>
              <p className="text-slate-500 text-[13px] sm:text-sm leading-relaxed mt-1.5 line-clamp-3">{description}</p>
            </Link>
          ))}
        </div>

        {/* Team strip */}
        <div className="mt-10 sm:mt-14 rounded-[28px] bg-navy p-5 sm:p-10 reveal relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10 justify-between">
            <div>
              <div className="eyebrow eyebrow-light">Your consultants</div>
              <h3 className="font-playfair text-2xl sm:text-3xl font-medium text-white mt-2">
                Speak to a human, not a call centre.
              </h3>
              <p className="text-white/55 text-sm sm:text-base mt-2 max-w-lg">
                Kannada, Tamil, Telugu, Hindi, Malayalam & English — our consultants speak your language.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {AGENTS.map((a) => (
                    <img
                      key={a.name}
                      src={a.image}
                      alt={a.name}
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover border-[3px] border-navy"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-gold border-[3px] border-navy flex items-center justify-center text-white text-xs font-bold">
                    +12
                  </div>
                </div>
                <div className="text-xs text-white/60 leading-tight">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online now
                  </div>
                  Avg. reply in 4 min
                </div>
              </div>
              <a href={AGENCY.phoneHref} className="btn-gold w-full md:w-auto">
                Talk to a consultant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
