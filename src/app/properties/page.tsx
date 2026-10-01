import { Suspense } from 'react'
import type { Metadata } from 'next'
import PropertiesClient from './PropertiesClient'
import { PROPERTIES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Properties | LuxeEstates Dubai',
  description: 'Browse premium properties for sale and rent in Dubai. Luxury villas, penthouses, and apartments.',
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center pt-32 pb-16">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium text-sm">Loading properties...</p>
          </div>
        </div>
      }
    >
      <PropertiesClient properties={PROPERTIES} />
    </Suspense>
  )
}
