import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

function FacebookIcon({ size = 15, strokeWidth = 1.5, className }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 15, strokeWidth = 1.5, className }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 15, strokeWidth = 1.5, className }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ size = 15, strokeWidth = 1.5, className }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "LuxeEstates | Premium Real Estate",
  description:
    "Discover exceptional properties with LuxeEstates — your trusted partner for premium homes, villas, and commercial spaces.",
  keywords: "luxury real estate, premium properties, buy home, rent apartment, villa, commercial space",
  openGraph: {
    title: "LuxeEstates | Premium Real Estate",
    description: "Discover exceptional properties crafted for extraordinary living.",
    type: "website",
  },
};

const socialLinks = [
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: LinkedinIcon, label: "LinkedIn" },
  { Icon: YoutubeIcon, label: "YouTube" },
];

const contactDetails = [
  { Icon: MapPin, text: "42 Skyline Boulevard, Business Bay, Dubai" },
  { Icon: Phone, text: "+971 4 567 8900" },
  { Icon: Mail, text: "hello@luxeestates.ae" },
  { Icon: Clock, text: "Mon–Sat: 9 AM – 7 PM" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col antialiased bg-white text-navy font-inter">
        <Navbar />
        <main className="flex-1">{children}</main>

        {/* ── Footer ── */}
        <footer className="bg-navy text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

              {/* Brand */}
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-base font-playfair">L</span>
                  </div>
                  <span className="font-playfair text-xl font-semibold text-white tracking-wide">
                    LuxeEstates
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Crafting exceptional real estate experiences for discerning clients since 2008.
                  Your dream property awaits.
                </p>
                {/* Social icons */}
                <div className="flex gap-3">
                  {socialLinks.map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="w-9 h-9 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:border-gold hover:text-gold transition-colors"
                    >
                      <Icon size={15} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div>
                <h4 className="font-playfair text-lg font-semibold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-3">
                  {[
                    { label: "Properties", href: "/properties" },
                    { label: "Buy", href: "/properties?type=buy" },
                    { label: "Rent", href: "/properties?type=rent" },
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Contact", href: "#contact" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-gold text-sm transition-colors hover-underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Property types */}
              <div>
                <h4 className="font-playfair text-lg font-semibold mb-6 text-white">Property Types</h4>
                <ul className="space-y-3">
                  {[
                    "Luxury Villas",
                    "Apartments",
                    "Penthouses",
                    "Commercial",
                    "Plots & Land",
                    "New Developments",
                  ].map((type) => (
                    <li key={type}>
                      <Link
                        href="/properties"
                        className="text-slate-400 hover:text-gold text-sm transition-colors hover-underline"
                      >
                        {type}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-playfair text-lg font-semibold mb-6 text-white">Contact Us</h4>
                <ul className="space-y-4">
                  {contactDetails.map(({ Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <Icon
                        size={15}
                        className="text-gold flex-shrink-0 mt-0.5"
                        strokeWidth={1.75}
                      />
                      <span className="text-slate-400 text-sm leading-snug">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                © 2026 LuxeEstates. All rights reserved.
              </p>
              <div className="flex gap-6">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-slate-500 hover:text-gold text-sm transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        <WhatsAppFloat />
        <ScrollAnimationProvider />
      </body>
    </html>
  );
}
