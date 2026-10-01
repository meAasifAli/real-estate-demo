'use client'

import { useState } from 'react'
import { X, Calendar, User, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react'
import type { Property } from '@/lib/data'

interface Props {
  property: Property
  onClose: () => void
}

export default function ViewingForm({ property, onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-navy px-5 py-5 sm:px-8 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={16} className="text-gold" />
            <span className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest">Book a Viewing</span>
          </div>
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-white">Schedule Your Visit</h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 truncate">{property.title}</p>
        </div>

        <div className="p-5 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-navy mb-2">Viewing Confirmed!</h3>
              <p className="text-slate-500 mb-6">
                Thank you, <strong>{form.name.split(' ')[0]}</strong>! Your viewing request has been received. 
                Our agent will confirm your appointment within 30 minutes.
              </p>
              <div className="bg-cream rounded-xl p-4 text-sm text-slate-600 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Date</span>
                  <span className="font-medium">{form.date}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Time</span>
                  <span className="font-medium">{form.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Property</span>
                  <span className="font-medium truncate max-w-[200px]">{property.title}</span>
                </div>
              </div>
              <button onClick={onClose} className="btn-gold w-full justify-center">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="input-premium input-with-icon"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="input-premium input-with-icon"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="input-premium input-with-icon"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Preferred Date</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Preferred Time</label>
                  <select
                    required
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                    className="input-premium"
                  >
                    <option value="">Select time</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>1:00 PM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                    <option>5:00 PM</option>
                    <option>6:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
                <textarea
                  placeholder="Additional notes or requirements..."
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="input-premium input-with-icon resize-none"
                />
              </div>

              {/* Property info */}
              <div className="bg-cream rounded-xl p-4 flex items-center gap-3">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <div className="font-medium text-navy text-sm line-clamp-1">{property.title}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{property.location}</div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full justify-center py-4"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Confirming...
                  </>
                ) : (
                  <>
                    <Calendar size={16} />
                    Confirm Viewing
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400">
                By submitting, you agree to our Privacy Policy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
