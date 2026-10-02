import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PROPERTIES, getPropertyBySlug, formatPrice } from '@/lib/data'
import PropertyDetailClient from './PropertyDetailClient'

export async function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<'/properties/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const property = getPropertyBySlug(slug)
  if (!property) return { title: 'Property Not Found' }
  return {
    title: `${property.title} | LuxeEstates`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.substring(0, 160),
      images: [{ url: property.images[0] }],
    },
  }
}

export default async function PropertyDetailPage(props: PageProps<'/properties/[slug]'>) {
  const { slug } = await props.params
  const property = getPropertyBySlug(slug)
  if (!property) notFound()

  // Related properties (same type, exclude current)
  const others = PROPERTIES.filter((p) => p.id !== property.id)
  const related = [
    ...others.filter((p) => p.type === property.type),
    ...others.filter((p) => p.type !== property.type && p.listingType === property.listingType),
  ].slice(0, 3)

  return <PropertyDetailClient property={property} related={related} />
}
