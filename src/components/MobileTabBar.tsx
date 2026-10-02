'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Home, Search, Key, Phone } from 'lucide-react'
import { AGENCY, whatsappLink } from '@/lib/data'
import { WhatsAppIcon } from './icons'

export default function MobileTabBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Property detail pages have their own sticky action bar
  if (pathname?.startsWith('/properties/')) return null

  const type = searchParams.get('type')
  const onProperties = pathname === '/properties'

  const tabs = [
    { label: 'Home', href: '/', Icon: Home, active: pathname === '/' },
    { label: 'Buy', href: '/properties?type=buy', Icon: Search, active: onProperties && type !== 'rent' },
    { label: 'Rent', href: '/properties?type=rent', Icon: Key, active: onProperties && type === 'rent' },
  ]

  return (
    <nav
      aria-label="Quick navigation"
      className="mobile-tabbar md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-black/5 shadow-[0_-8px_30px_-12px_rgba(11,26,44,0.25)] pb-[var(--safe-bottom)]"
    >
      <div className="grid grid-cols-5 h-16 px-1">
        {tabs.map(({ label, href, Icon, active }) => (
          <Link
            key={label}
            href={href}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
              active ? 'text-navy' : 'text-slate-400'
            }`}
          >
            <span className={`flex items-center justify-center w-12 h-7 rounded-full transition-colors ${active ? 'bg-gold/15' : ''}`}>
              <Icon size={19} strokeWidth={active ? 2.4 : 2} className={active ? 'text-gold-dark' : ''} />
            </span>
            {label}
          </Link>
        ))}
        <a
          href={AGENCY.phoneHref}
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-slate-400"
        >
          <span className="flex items-center justify-center w-12 h-7">
            <Phone size={19} />
          </span>
          Call
        </a>
        <a
          href={whatsappLink("Hi LuxeEstates! I'm looking for a property in Bengaluru.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-[#128C7E]"
        >
          <span className="flex items-center justify-center w-12 h-7 rounded-full bg-[#25D366]/15">
            <WhatsAppIcon size={19} />
          </span>
          WhatsApp
        </a>
      </div>
    </nav>
  )
}
