'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ArrowRight, MapPin } from 'lucide-react'
import { AGENCY, LOCALITIES, whatsappLink } from '@/lib/data'
import { WhatsAppIcon } from './icons'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Buy', href: '/properties?type=buy' },
  { label: 'Rent', href: '/properties?type=rent' },
  { label: 'Dashboard', href: '/dashboard' },
]

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="LuxeEstates home">
      <span className="relative w-9 h-9 rounded-xl bg-linear-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
        <span className="text-white font-bold text-lg font-playfair leading-none">L</span>
      </span>
      <span className="leading-none">
        <span className={`block font-playfair text-lg sm:text-xl font-semibold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>
          LuxeEstates
        </span>
        <span className={`block text-[9px] font-semibold uppercase tracking-[0.28em] mt-1 ${light ? 'text-gold-light/80' : 'text-gold-dark'}`}>
          Bengaluru
        </span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const solid = !isHome || isScrolled

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          solid ? 'navbar-blur shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${solid ? 'h-16' : 'h-16 md:h-20'}`}>
            <Logo />

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const base = link.href.split('?')[0]
                const isActive = link.href === '/' ? pathname === '/' : link.label === 'Properties' && pathname?.startsWith(base)
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-medium hover-underline transition-colors ${
                      isActive ? 'text-gold-light' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a
                href={AGENCY.phoneHref}
                className="hidden lg:flex items-center gap-2 text-white/80 hover:text-gold-light text-sm font-medium transition-colors"
              >
                <Phone size={15} />
                {AGENCY.phone}
              </a>
              <Link href="/properties" className="btn-gold py-2.5 px-5 min-h-0 text-sm">
                Find Property
              </Link>
            </div>

            {/* Mobile actions */}
            <div className="flex md:hidden items-center gap-1">
              <a
                href={AGENCY.phoneHref}
                aria-label="Call us"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10"
              >
                <Phone size={19} />
              </a>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-navy animate-fade flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <Logo />
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <nav className="space-y-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="mobile-menu-open flex items-center justify-between py-3.5 border-b border-white/5 text-white"
                  style={{ animationDelay: `${i * 40}ms`, opacity: 0 }}
                >
                  <span className="font-playfair text-[1.75rem] font-medium">{link.label}</span>
                  <ArrowRight size={18} className="text-gold" />
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              <div className="eyebrow eyebrow-light mb-3">Popular localities</div>
              <div className="flex flex-wrap gap-2">
                {LOCALITIES.slice(0, 6).map((l) => (
                  <Link
                    key={l.name}
                    href={`/properties?location=${encodeURIComponent(l.query)}`}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm"
                  >
                    <MapPin size={12} className="text-gold" />
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 pb-safe border-t border-white/10 grid grid-cols-2 gap-3">
            <a href={AGENCY.phoneHref} className="btn-ghost-light">
              <Phone size={16} /> Call
            </a>
            <a
              href={whatsappLink("Hi LuxeEstates! I'm looking for a property in Bengaluru.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon size={18} /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  )
}
