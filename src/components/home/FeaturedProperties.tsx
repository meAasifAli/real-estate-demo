import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PROPERTIES } from '@/lib/data'
import { PropertyCard } from '@/components/PropertyCard'
import SectionHeader from './SectionHeader'

export default function FeaturedProperties() {
  const featured = PROPERTIES.slice(0, 6)

  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured listings"
          title="Homes worth the drive across Silk Board."
          subtitle="Handpicked this week by our consultants — inspected, documented and ready to view."
          href="/properties"
          linkLabel="View all properties"
        />

        {/* Swipe rail on mobile → grid on desktop */}
        <div className="snap-rail md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:m-0 md:p-0">
          {featured.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              className={`w-[82vw] max-w-[340px] md:w-auto md:max-w-none reveal delay-${(i % 3) * 100 + 100}`}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 reveal">
          <Link href="/properties" className="btn-dark w-full sm:w-auto px-8">
            Explore 2,400+ properties
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
