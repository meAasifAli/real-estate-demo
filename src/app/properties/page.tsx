import type { Metadata } from 'next'
import PropertiesClient from './PropertiesClient'
import { PROPERTIES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Properties | LuxeEstates Dubai',
  description: 'Browse premium properties for sale and rent in Dubai. Luxury villas, penthouses, and apartments.',
}

export default function PropertiesPage() {
  return <PropertiesClient properties={PROPERTIES} />
}
