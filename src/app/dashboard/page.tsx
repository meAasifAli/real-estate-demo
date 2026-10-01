import type { Metadata } from 'next'
import DashboardClient from './DashboardClient'
import { ENQUIRIES, PROPERTIES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Lead Dashboard | LuxeEstates',
  description: 'Manage enquiries, track leads, and view property analytics.',
}

export default function DashboardPage() {
  return <DashboardClient enquiries={ENQUIRIES} properties={PROPERTIES} />
}
