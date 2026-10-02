'use client'

import { useEffect, useMemo, useState } from 'react'
import { X, Calendar, CheckCircle2, Video, Home as HomeIcon } from 'lucide-react'
import type { Property } from '@/lib/data'
import { formatPrice } from '@/lib/data'

interface Props {
  property: Property
  onClose: () => void
}

const SLOTS = ['10:00 AM', '11:30 AM', '1:00 PM', '3:00 PM', '4:30 PM', '6:00 PM']

function nextDays(count: number) {
  const days: { iso: string; dow: string; day: number; month: string }[] = []
  const d = new Date()
  for (let i = 0; i < count; i++) {
    const x = new Date(d)
    x.setDate(d.getDate() + i + 1)
    days.push({
      iso: x.toISOString().split('T')[0],
      dow: i === 0 ? 'Tmrw' : x.toLocaleDateString('en-IN', { weekday: 'short' }),
      day: x.getDate(),
      month: x.toLocaleDateString('en-IN', { month: 'short' }),
    })
  }
  return days
}

export default function ViewingForm({ property, onClose }: Props) {
  const days = useMemo(() => nextDays(10), [])
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: days[0].iso,
    time: '',
    mode: 'in-person' as 'in-person' | 'video',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.time) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1100))
    setLoading(false)
    setSubmitted(true)
  }

  const selectedDay = days.find((d) => d.iso === form.date)

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true" aria-label="Book a site visit">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm animate-fade" onClick={onClose} />

      <div className="relative bg-white w-full sm:max-w-lg rounded-t-[28px] sm:rounded-[28px] shadow-2xl max-h-[92svh] flex flex-col animate-sheet sm-pop">
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />

        {/* Header */}
        <div className="flex items-start gap-3 px-5 sm:px-7 pt-4 sm:pt-6 pb-4 border-b border-slate-100">
          <img src={property.images[0]} alt="" className="w-14 h-14 rounded-2xl object-cover shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-dark">Book a site visit</div>
            <div className="font-playfair text-lg font-medium text-navy leading-snug line-clamp-1">{property.title}</div>
            <div className="text-slate-500 text-xs">{formatPrice(property.price, property.priceUnit)}</div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-cream flex items-center justify-center text-navy shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 sm:px-7 py-5">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={34} className="text-emerald-600" />
              </div>
              <h3 className="font-playfair text-2xl font-medium text-navy">You&apos;re booked in!</h3>
              <p className="text-slate-500 text-sm mt-2 mb-6">
                Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}. {property.agent.name.split(' ')[0]} will confirm on WhatsApp within 30 minutes.
              </p>
              <div className="bg-cream rounded-2xl p-4 text-sm text-left space-y-2 mb-6">
                <Row k="When" v={`${selectedDay?.dow} ${selectedDay?.day} ${selectedDay?.month}, ${form.time}`} />
                <Row k="Type" v={form.mode === 'video' ? 'Video walkthrough' : 'In-person visit'} />
                <Row k="Consultant" v={property.agent.name} />
              </div>
              <button onClick={onClose} className="btn-dark w-full">Done</button>
            </div>
          ) : (
            <form id="viewing-form" onSubmit={handleSubmit} className="space-y-5">
              {/* Visit mode */}
              <div className="grid grid-cols-2 gap-2 bg-cream p-1 rounded-2xl">
                {([
                  { key: 'in-person', label: 'In person', Icon: HomeIcon },
                  { key: 'video', label: 'Video call', Icon: Video },
                ] as const).map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, mode: key }))}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      form.mode === key ? 'bg-white text-navy shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    <Icon size={15} /> {label}
                  </button>
                ))}
              </div>

              {/* Date strip */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.16em] mb-2.5">Pick a day</div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 sm:-mx-7 sm:px-7">
                  {days.map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, date: d.iso }))}
                      className={`shrink-0 w-[60px] py-2.5 rounded-2xl border text-center transition-all ${
                        form.date === d.iso ? 'bg-navy border-navy text-white' : 'bg-white border-[#E5E0D6] text-navy'
                      }`}
                    >
                      <div className={`text-[10px] font-semibold uppercase ${form.date === d.iso ? 'text-gold-light' : 'text-slate-400'}`}>{d.dow}</div>
                      <div className="text-lg font-semibold leading-tight">{d.day}</div>
                      <div className={`text-[10px] ${form.date === d.iso ? 'text-white/60' : 'text-slate-400'}`}>{d.month}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.16em] mb-2.5">Pick a time</div>
                <div className="grid grid-cols-3 gap-2">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, time: s }))}
                      className={`chip justify-center ${form.time === s ? 'chip-active' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="input-premium"
                />
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy font-semibold pointer-events-none">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="Mobile number"
                    pattern="[0-9 ]{10,11}"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="input-premium pl-14"
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {!submitted && (
          <div className="px-5 sm:px-7 pt-3 pb-safe sm:pb-6 border-t border-slate-100">
            <button
              type="submit"
              form="viewing-form"
              disabled={loading || !form.time}
              className="btn-gold w-full rounded-2xl min-h-[52px]"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Confirming…
                </>
              ) : (
                <>
                  <Calendar size={17} />
                  {form.time ? `Confirm ${selectedDay?.dow} ${selectedDay?.day}, ${form.time}` : 'Select a time slot'}
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">Free · No obligation · We never share your number</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{k}</span>
      <span className="font-semibold text-navy text-right">{v}</span>
    </div>
  )
}
