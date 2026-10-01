import HeroSection from '@/components/home/HeroSection'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import StatsSection from '@/components/home/StatsSection'
import ServicesSection from '@/components/home/ServicesSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CTASection from '@/components/home/CTASection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LuxeEstates | Dubai\'s Premier Real Estate Agency',
  description: 'Discover premium properties in Dubai. Luxury villas, penthouses, and apartments. Schedule a viewing today.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}