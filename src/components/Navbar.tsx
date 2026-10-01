'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Buy', href: '/properties?type=buy' },
  { label: 'Rent', href: '/properties?type=rent' },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navBg = isOpen || !isHome || isScrolled
    ? 'navbar-blur shadow-lg bg-navy/95'
    : 'bg-transparent'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-gold-dark to-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-base font-playfair">L</span>
            </div>
            <span className="font-playfair text-xl font-semibold text-white tracking-wide">
              LuxeEstates
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== '/' && pathname?.startsWith(link.href.split('?')[0]))
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium hover-underline transition-colors ${
                    isActive ? 'text-gold' : 'text-white/85 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+919845012345"
              className="flex items-center gap-1.5 text-white/80 hover:text-gold text-sm font-medium transition-colors"
            >
              <Phone size={15} />
              <span>+91 98450 12345</span>
            </a>
            <Link
              href="/properties"
              className="btn-gold text-xs py-2.5 px-5"
            >
              Find Property
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mobile-menu-open bg-navy/98 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="px-4 py-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 px-4 text-white/90 hover:text-gold hover:bg-white/5 rounded-xl transition-all font-medium text-base"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10 space-y-3">
              <a
                href="tel:+919845012345"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-white/20 text-white font-medium text-sm hover:border-gold hover:text-gold transition-colors"
              >
                <Phone size={15} />
                Call +91 98450 12345
              </a>
              <Link
                href="/properties"
                className="btn-gold w-full justify-center text-sm py-3.5 rounded-xl"
              >
                Find Property
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
