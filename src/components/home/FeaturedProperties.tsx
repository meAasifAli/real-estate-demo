import Link from 'next/link'
import { PROPERTIES, formatPrice } from '@/lib/data'
import { Bed, Bath, Maximize2, MapPin, ArrowRight } from 'lucide-react'

export default function FeaturedProperties() {
  const featured = PROPERTIES.slice(0, 6)

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="reveal inline-flex items-center gap-2 mb-4">
            <div className="gold-divider" />
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">Featured</span>
            <div className="gold-divider" />
          </div>
          <h2 className="reveal font-playfair text-4xl sm:text-5xl font-bold text-navy mb-4">
            Exceptional Properties
          </h2>
          <p className="reveal text-slate-500 text-lg max-w-2xl mx-auto">
            Handpicked luxury homes and investments in Bengaluru&apos;s most prestigious communities
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featured.map((property, i) => (
            <Link
              key={property.id}
              href={`/properties/${property.slug}`}
              className={`property-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer reveal delay-${(i % 3) * 100 + 100}`}
            >
              {/* Image */}
              <div className="img-zoom relative h-56">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {property.badge && (
                    <span className="badge-premium">{property.badge}</span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-navy text-xs font-semibold capitalize">
                    {property.listingType === 'buy' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>

                {/* Price on image */}
                <div className="absolute bottom-3 right-3">
                  <span className="bg-navy/90 text-white text-sm font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    {formatPrice(property.price, property.priceUnit)}
                  </span>
                </div>

                {/* Property type chip */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/20 capitalize">
                    {property.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-playfair text-lg font-semibold text-navy mb-2 line-clamp-2 hover:text-gold transition-colors">
                  {property.title}
                </h3>

                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                  <MapPin size={14} className="text-gold flex-shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>

                {/* Features row */}
                <div className="flex items-center justify-between sm:justify-start sm:gap-5 py-3 border-t border-b border-slate-100 mb-4 text-xs sm:text-sm">
                  {property.bedrooms > 0 ? (
                    <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                      <Bed size={15} className="text-gold" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                      <Bed size={15} className="text-gold" />
                      <span>Studio</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                    <Bath size={15} className="text-gold" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                    <Maximize2 size={14} className="text-gold" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>

                {/* Agent + CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-gold/30"
                    />
                    <span className="text-xs text-slate-500 font-medium">{property.agent.name.split(' ')[0]}</span>
                  </div>
                  <span className="text-gold text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    View Details <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal">
          <Link href="/properties" className="btn-gold px-8 py-4 text-sm">
            View All Properties
            <ArrowRight size={16} />
          </Link>
          <p className="text-slate-400 text-sm mt-3">2,400+ properties available</p>
        </div>
      </div>
    </section>
  )
}
