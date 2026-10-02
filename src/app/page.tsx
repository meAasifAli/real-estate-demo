import HeroSection from '@/components/home/HeroSection'
import LocalitiesSection from '@/components/home/LocalitiesSection'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import StatsSection from '@/components/home/StatsSection'
import ServicesSection from '@/components/home/ServicesSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CTASection from '@/components/home/CTASection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "LuxeEstates | Bengaluru's Premium Real Estate Agency",
  description:
    'Verified villas, apartments and penthouses in Whitefield, Indiranagar, Koramangala, HSR Layout and across Bengaluru. Book a site visit today.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <LocalitiesSection />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
