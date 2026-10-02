import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel = 'View all',
  light = false,
  center = false,
}: {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  href?: string
  linkLabel?: string
  light?: boolean
  center?: boolean
}) {
  return (
    <div className={`flex items-end justify-between gap-4 mb-7 sm:mb-12 ${center ? 'flex-col items-center text-center' : ''}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        <div className={`reveal eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</div>
        <h2
          className={`reveal font-playfair text-[1.9rem] leading-[1.1] sm:text-5xl font-medium mt-3 ${
            light ? 'text-white' : 'text-navy'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`reveal text-[15px] sm:text-lg mt-3 leading-relaxed ${light ? 'text-white/60' : 'text-slate-500'}`}>
            {subtitle}
          </p>
        )}
      </div>
      {href && !center && (
        <Link
          href={href}
          className={`reveal shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold ${
            light ? 'text-gold-light' : 'text-gold-dark'
          } hover:gap-2.5 transition-all`}
        >
          <span className="hidden sm:inline">{linkLabel}</span>
          <span className="sm:hidden">See all</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}
