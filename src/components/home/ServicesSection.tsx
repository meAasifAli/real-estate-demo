import Link from 'next/link'
import {
  ArrowRight,
  Home,
  Key,
  TrendingUp,
  Briefcase,
  BarChart2,
  Settings,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Service {
  Icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  description: string
  href: string
  cardBg: string
  hoverBorder: string
}

const services: Service[] = [
  {
    Icon: Home,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Buy Property',
    description:
      "Find your perfect home from our curated selection of premium properties in Bengaluru's most sought-after locations.",
    href: '/properties?type=buy',
    cardBg: 'from-blue-50 to-indigo-50',
    hoverBorder: 'hover:border-blue-200',
  },
  {
    Icon: Key,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Rent Property',
    description:
      'Discover premium rental options from short-term furnished apartments to long-term luxury residences.',
    href: '/properties?type=rent',
    cardBg: 'from-amber-50 to-yellow-50',
    hoverBorder: 'hover:border-amber-200',
  },
  {
    Icon: TrendingUp,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Sell Your Property',
    description:
      "Maximise your property's value with our expert market knowledge, comprehensive marketing, and extensive buyer network.",
    href: '#contact',
    cardBg: 'from-emerald-50 to-green-50',
    hoverBorder: 'hover:border-emerald-200',
  },
  {
    Icon: Briefcase,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Commercial Real Estate',
    description:
      'Office spaces, retail units, and commercial plots in prime business districts tailored to your requirements.',
    href: '/properties?propertyType=commercial',
    cardBg: 'from-purple-50 to-violet-50',
    hoverBorder: 'hover:border-purple-200',
  },
  {
    Icon: BarChart2,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    title: 'Property Valuation',
    description:
      'Get an accurate market valuation from our certified experts backed by real-time data and comparable sales.',
    href: '#valuation',
    cardBg: 'from-rose-50 to-pink-50',
    hoverBorder: 'hover:border-rose-200',
  },
  {
    Icon: Settings,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    title: 'Property Management',
    description:
      'End-to-end property management services for landlords — tenant screening, rent collection, and maintenance.',
    href: '#management',
    cardBg: 'from-sky-50 to-cyan-50',
    hoverBorder: 'hover:border-sky-200',
  },
]

export default function ServicesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="reveal inline-flex items-center gap-2 mb-4">
            <div className="gold-divider" />
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              What We Offer
            </span>
            <div className="gold-divider" />
          </div>
          <h2 className="reveal font-playfair text-4xl sm:text-5xl font-bold text-navy mb-4">
            Our Services
          </h2>
          <p className="reveal text-slate-500 text-lg max-w-2xl mx-auto">
            From finding your dream home to managing your investment portfolio — we cover every
            aspect of real estate
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(
            (
              { Icon, iconBg, iconColor, title, description, href, cardBg, hoverBorder },
              i
            ) => (
              <Link
                key={title}
                href={href}
                className={`reveal delay-${(i % 3) * 100 + 100} group p-5 sm:p-7 rounded-2xl bg-gradient-to-br ${cardBg} border border-transparent ${hoverBorder} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
              >
                {/* Icon box */}
                <div
                  className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} className={iconColor} strokeWidth={1.75} />
                </div>

                <h3 className="font-playfair text-xl font-semibold text-navy mb-3 group-hover:text-gold transition-colors">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{description}</p>
                <span className="text-gold text-sm font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            )
          )}
        </div>

        {/* Agent team teaser */}
        <div className="mt-12 sm:mt-16 bg-navy rounded-3xl p-6 sm:p-10 reveal">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="gold-divider w-8" />
                <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                  Our Team
                </span>
              </div>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
                Expert Agents Ready to Help
              </h3>
              <p className="text-white/60 text-sm sm:text-base max-w-lg">
                Our multilingual team of certified real estate professionals has helped over 1,200
                clients find their perfect property in Bengaluru.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto shrink-0">
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop',
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop',
                  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=80&h=80&fit=crop',
                ].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="Agent"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-navy"
                  />
                ))}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gold border-2 border-navy flex items-center justify-center text-white text-xs font-bold">
                  +12
                </div>
              </div>
              <Link href="/properties" className="btn-gold justify-center text-sm py-3 px-6 whitespace-nowrap w-full sm:w-auto">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
