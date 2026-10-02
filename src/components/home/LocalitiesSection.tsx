import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { LOCALITIES } from '@/lib/data'
import SectionHeader from './SectionHeader'

export default function LocalitiesSection() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Explore Bengaluru"
          title={<>Every neighbourhood, <em className="text-gold-dark">known by heart.</em></>}
          subtitle="Live micro-market pricing across the city's most sought-after localities."
          href="/properties"
          linkLabel="Browse all localities"
        />

        <div className="snap-rail lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:m-0 lg:p-0">
          {LOCALITIES.map((l, i) => (
            <Link
              key={l.name}
              href={`/properties?location=${encodeURIComponent(l.query)}`}
              className={`group relative w-[44vw] max-w-[220px] lg:w-auto lg:max-w-none aspect-[3/4] rounded-3xl overflow-hidden bg-navy reveal delay-${(i % 4) * 100 + 100}`}
            >
              <img
                src={l.image}
                alt={l.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/30 to-transparent" />
              <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center text-white group-hover:bg-gold group-hover:border-gold transition-colors">
                <ArrowUpRight size={15} />
              </span>
              <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-5">
                <div className="font-playfair text-white text-xl sm:text-2xl font-medium leading-tight">{l.name}</div>
                <div className="text-white/60 text-[11px] sm:text-xs mt-1 line-clamp-1">{l.tagline}</div>
                <div className="mt-2.5 inline-flex items-baseline gap-1 rounded-full bg-white/10 backdrop-blur px-2.5 py-1 border border-white/15">
                  <span className="text-gold-light text-xs font-bold">{l.pricePerSqft}</span>
                  <span className="text-white/50 text-[10px]">/ sq.ft</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
