import { ShieldCheck, FileCheck2, Landmark, Handshake } from 'lucide-react'
import SectionHeader from './SectionHeader'

const stats = [
  { number: '2,400+', label: 'Verified listings' },
  { number: '1,200+', label: 'Families moved in' },
  { number: '₹450 Cr', label: 'Transactions closed' },
  { number: '4.9★', label: 'Google rating' },
]

const pillars = [
  {
    Icon: ShieldCheck,
    title: 'K-RERA registered',
    text: 'Every project cross-checked against the Karnataka RERA portal before it is listed.',
  },
  {
    Icon: FileCheck2,
    title: 'Title & Khata verified',
    text: 'In-house legal team reviews A-Khata, EC and 30-year title chain on resale homes.',
  },
  {
    Icon: Landmark,
    title: 'Home-loan desk',
    text: 'Pre-approved offers from SBI, HDFC & ICICI — sanction in as little as 72 hours.',
  },
  {
    Icon: Handshake,
    title: 'Zero-spam promise',
    text: 'One dedicated consultant. No call-centre follow-ups, no number sharing. Ever.',
  },
]

export default function StatsSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-navy">
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 w-[32rem] h-[32rem] rounded-full bg-navy-light/60 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <SectionHeader
              light
              eyebrow="Why LuxeEstates"
              title={<>18 years. One city. <em className="text-gold-gradient">Zero shortcuts.</em></>}
              subtitle="We only work in Bengaluru — so we know which streets flood in monsoon, which builders deliver on time, and which khata is clean."
            />

            <div className="grid grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10 reveal">
              {stats.map(({ number, label }) => (
                <div key={label} className="bg-navy p-5 sm:p-7">
                  <div className="font-playfair text-3xl sm:text-5xl font-medium text-white">{number}</div>
                  <div className="text-white/50 text-xs sm:text-sm mt-1.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:pt-4">
            {pillars.map(({ Icon, title, text }, i) => (
              <div
                key={title}
                className={`reveal delay-${(i % 2) * 100 + 100} flex sm:block gap-4 p-5 sm:p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-gold/40 transition-colors`}
              >
                <div className="w-11 h-11 rounded-2xl bg-gold/15 flex items-center justify-center shrink-0 sm:mb-5">
                  <Icon size={21} className="text-gold-light" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-[15px] sm:text-base">{title}</h3>
                  <p className="text-white/55 text-[13px] sm:text-sm leading-relaxed mt-1">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
