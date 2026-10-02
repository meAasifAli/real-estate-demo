import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react'
import { AGENCY, LOCALITIES } from '@/lib/data'
import { Logo } from './Navbar'
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from './icons'

const socialLinks = [
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: LinkedinIcon, label: 'LinkedIn' },
  { Icon: YoutubeIcon, label: 'YouTube' },
]

const quickLinks = [
  { label: 'All Properties', href: '/properties' },
  { label: 'Buy a Home', href: '/properties?type=buy' },
  { label: 'Rent a Home', href: '/properties?type=rent' },
  { label: 'Commercial', href: '/properties?propertyType=commercial' },
  { label: 'Agent Dashboard', href: '/dashboard' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white pb-mobile-nav relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Logo />
            <p className="text-white/55 text-sm leading-relaxed mt-5 max-w-sm">
              Bengaluru&apos;s trusted advisors for premium homes, villas and commercial spaces since 2008.
              RERA-registered, title-verified, end-to-end.
            </p>
            <div className="flex gap-2.5 mt-5">
              {socialLinks.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon size={16} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-light mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Localities */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-light mb-4">Localities</h4>
            <ul className="space-y-2.5">
              {LOCALITIES.slice(0, 5).map((l) => (
                <li key={l.name}>
                  <Link
                    href={`/properties?location=${encodeURIComponent(l.query)}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-light mb-4">Visit or call</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                {AGENCY.address}
              </li>
              <li>
                <a href={AGENCY.phoneHref} className="flex items-center gap-3 text-white/80 hover:text-gold-light">
                  <Phone size={16} className="text-gold shrink-0" />
                  {AGENCY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${AGENCY.email}`} className="flex items-center gap-3 text-white/80 hover:text-gold-light">
                  <Mail size={16} className="text-gold shrink-0" />
                  {AGENCY.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Clock size={16} className="text-gold shrink-0" />
                {AGENCY.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex items-start gap-2">
            <ShieldCheck size={14} className="text-gold shrink-0 mt-px" />
            <span>K-RERA Agent Reg. No. {AGENCY.rera}</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>© 2026 LuxeEstates</span>
            <a href="#" className="hover:text-gold-light">Privacy</a>
            <a href="#" className="hover:text-gold-light">Terms</a>
            <a href="#" className="hover:text-gold-light">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
