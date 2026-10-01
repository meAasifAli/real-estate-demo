import { Building2, Users, BadgeDollarSign, Award, ShieldCheck } from 'lucide-react'

const stats = [
  {
    number: '2,400+',
    label: 'Properties Listed',
    description: "Across Bengaluru's prime locations",
    Icon: Building2,
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-300',
  },
  {
    number: '1,200+',
    label: 'Happy Clients',
    description: 'Satisfied buyers and renters',
    Icon: Users,
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-300',
  },
  {
    number: '₹450 Cr+',
    label: 'Total Transactions',
    description: 'In sales & rental volume',
    Icon: BadgeDollarSign,
    iconBg: 'bg-gold/20',
    iconColor: 'text-gold-light',
  },
  {
    number: '18+',
    label: 'Years Experience',
    description: 'Trusted since 2008',
    Icon: Award,
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-300',
  },
]

const certs = [
  'Karnataka RERA Registered',
  'ISO 9001:2015',
  'Top Agency Award 2025',
  'Verified Property Titles',
]

export default function StatsSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&h=600&fit=crop&q=60)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/88" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="reveal inline-flex items-center gap-2 mb-4">
            <div className="gold-divider" />
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Our Track Record
            </span>
            <div className="gold-divider" />
          </div>
          <h2 className="reveal font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
            Numbers That Speak
          </h2>
          <p className="reveal text-white/60 text-lg max-w-xl mx-auto">
            A legacy of excellence built on trust, expertise, and outstanding results
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map(({ number, label, description, Icon, iconBg, iconColor }, i) => (
            <div
              key={label}
              className={`reveal delay-${i * 100 + 100} group text-center p-4 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-gold/30 transition-all duration-300`}
            >
              {/* Icon circle */}
              <div className={`w-11 h-11 sm:w-14 sm:h-14 ${iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-5 group-hover:scale-110 transition-transform`}>
                <Icon size={22} className={`${iconColor} sm:w-[26px] sm:h-[26px]`} strokeWidth={1.5} />
              </div>
              <div className="font-playfair text-2xl sm:text-4xl font-bold text-gold mb-1 sm:mb-2">
                {number}
              </div>
              <div className="text-white font-semibold mb-1 text-xs sm:text-base">{label}</div>
              <div className="text-white/50 text-[11px] sm:text-sm line-clamp-1 sm:line-clamp-none">{description}</div>
            </div>
          ))}
        </div>

        {/* Certifications row */}
        <div className="mt-14 flex flex-wrap justify-center gap-6 reveal">
          {certs.map((cert) => (
            <div key={cert} className="flex items-center gap-2 text-white/60">
              <ShieldCheck size={14} className="text-gold flex-shrink-0" />
              <span className="text-sm font-medium">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
