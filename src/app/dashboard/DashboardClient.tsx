'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Users, TrendingUp, MessageCircle, Calendar, CheckCircle,
  Phone, Mail, ArrowUpRight, Filter, BarChart2,
  Home, Zap, ClipboardList, type LucideIcon,
} from 'lucide-react'
import type { Enquiry, Property } from '@/lib/data'
import { formatPrice } from '@/lib/data'

interface Props {
  enquiries: Enquiry[]
  properties: Property[]
}

const statusConfig: Record<string, { label: string; color: string; icon: LucideIcon }> = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: Zap },
  contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-700', icon: Phone },
  viewing_scheduled: { label: 'Viewing Scheduled', color: 'bg-purple-100 text-purple-700', icon: Calendar },
  closed: { label: 'Closed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
}

const typeConfig: Record<string, { label: string; color: string; icon: LucideIcon }> = {
  viewing: { label: 'Viewing', color: 'bg-purple-50 text-purple-600', icon: Calendar },
  whatsapp: { label: 'WhatsApp', color: 'bg-green-50 text-green-600', icon: MessageCircle },
  form: { label: 'Form', color: 'bg-blue-50 text-blue-600', icon: ClipboardList },
}

// Simple sparkline data
const WEEKLY_DATA = [3, 5, 4, 8, 6, 9, 12]
const MONTHLY_DATA = [18, 24, 21, 32, 28, 35, 42, 38, 45, 40, 48, 52]

function MiniChart({ data, color = '#C9A84C' }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 120
  const height = 40
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="opacity-80">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline
        points={`0,${height} ${points} ${width},${height}`}
        fill={`${color}20`}
        stroke="none"
      />
    </svg>
  )
}

function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-gold/20 rounded-t-md relative overflow-hidden group cursor-default"
            style={{ height: `${(v / max) * 100}px` }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gold-dark to-gold rounded-t-md transition-all duration-300"
              style={{ height: '100%' }}
            />
            <div className="absolute inset-0 flex items-start justify-center pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-bold">{v}</span>
            </div>
          </div>
          <span className="text-slate-400 text-xs">{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardClient({ enquiries, properties }: Props) {
  const [filter, setFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'properties'>('overview')

  const filteredEnquiries = filter === 'all'
    ? enquiries
    : enquiries.filter((e) => e.status === filter)

  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === 'new').length,
    viewings: enquiries.filter((e) => e.status === 'viewing_scheduled').length,
    closed: enquiries.filter((e) => e.status === 'closed').length,
    whatsapp: enquiries.filter((e) => e.type === 'whatsapp').length,
    formLeads: enquiries.filter((e) => e.type === 'form').length,
  }

  const conversionRate = Math.round((stats.closed / stats.total) * 100)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <div className="bg-navy text-white pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-0.5 bg-gold" />
                <span className="text-gold text-xs font-semibold uppercase tracking-widest">Admin Panel</span>
              </div>
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-1">Lead Dashboard</h1>
              <p className="text-white/60">October 2026 — All enquiries and analytics</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-outline-gold text-xs py-2.5 border-white/30 text-white hover:bg-white hover:text-navy">
                Export CSV
              </button>
              <Link href="/properties" className="btn-gold text-xs py-2.5">
                View Site <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Tab nav */}
          <div className="flex gap-1 mt-6 bg-white/10 rounded-xl p-1 w-full sm:w-fit overflow-x-auto">
            {([
              { key: 'overview', label: 'Overview' },
              { key: 'leads', label: 'Leads' },
              { key: 'properties', label: 'Properties' },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 sm:px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key ? 'bg-white text-navy shadow-sm' : 'text-white/70 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                {
                  label: 'Total Enquiries',
                  value: stats.total,
                  change: '+18%',
                  positive: true,
                  icon: Users,
                  color: 'text-blue-500',
                  bg: 'bg-blue-50',
                  sparkData: WEEKLY_DATA,
                  sparkColor: '#3B82F6',
                },
                {
                  label: 'New Leads',
                  value: stats.new,
                  change: '+3 today',
                  positive: true,
                  icon: Zap,
                  color: 'text-gold',
                  bg: 'bg-amber-50',
                  sparkData: [2, 3, 1, 4, 3, 5, 3],
                  sparkColor: '#C9A84C',
                },
                {
                  label: 'Viewings Scheduled',
                  value: stats.viewings,
                  change: 'This week',
                  positive: true,
                  icon: Calendar,
                  color: 'text-purple-500',
                  bg: 'bg-purple-50',
                  sparkData: [1, 0, 2, 1, 2, 3, 1],
                  sparkColor: '#8B5CF6',
                },
                {
                  label: 'Conversion Rate',
                  value: `${conversionRate}%`,
                  change: '+5% vs last month',
                  positive: true,
                  icon: TrendingUp,
                  color: 'text-green-500',
                  bg: 'bg-green-50',
                  sparkData: [10, 14, 12, 16, 15, 18, 17],
                  sparkColor: '#22C55E',
                },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 ${kpi.bg} rounded-xl flex items-center justify-center`}>
                      <kpi.icon size={20} className={kpi.color} />
                    </div>
                    <MiniChart data={kpi.sparkData} color={kpi.sparkColor} />
                  </div>
                  <div className="font-playfair text-3xl font-bold text-navy mb-1">{kpi.value}</div>
                  <div className="text-slate-500 text-sm">{kpi.label}</div>
                  <div className={`text-xs mt-1 font-medium ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {kpi.positive ? '↑' : '↓'} {kpi.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly enquiries bar chart */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-navy">Monthly Enquiries</h3>
                    <p className="text-slate-400 text-sm">2026 YTD</p>
                  </div>
                  <BarChart2 size={20} className="text-gold" />
                </div>
                <BarChart
                  data={MONTHLY_DATA}
                  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                />
              </div>

              {/* Lead sources donut */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-navy">Lead Sources</h3>
                    <p className="text-slate-400 text-sm">This month</p>
                  </div>
                  <TrendingUp size={20} className="text-gold" />
                </div>
                <div className="flex items-center gap-6">
                  {/* SVG donut */}
                  <svg viewBox="0 0 100 100" className="w-32 h-32 flex-shrink-0 -rotate-90">
                    {/* WhatsApp: 33% */}
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#22C55E" strokeWidth="20"
                      strokeDasharray="73 147" strokeDashoffset="0" />
                    {/* Form: 50% */}
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#3B82F6" strokeWidth="20"
                      strokeDasharray="110 110" strokeDashoffset="-73" />
                    {/* Viewing: 17% */}
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#8B5CF6" strokeWidth="20"
                      strokeDasharray="37 183" strokeDashoffset="-183" />
                  </svg>
                  <div className="space-y-3 text-sm flex-1">
                    {[
                      { label: 'Form Enquiry', value: `${stats.formLeads}`, pct: '50%', color: 'bg-blue-500' },
                      { label: 'WhatsApp', value: `${stats.whatsapp}`, pct: '33%', color: 'bg-green-500' },
                      { label: 'Viewing Request', value: `${stats.viewings}`, pct: '17%', color: 'bg-purple-500' },
                    ].map((src) => (
                      <div key={src.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${src.color}`} />
                          <span className="text-slate-600">{src.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-navy">{src.value}</span>
                          <span className="text-slate-400 text-xs">({src.pct})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick summary row */}
                <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: 'Avg. Response', value: '18 min', Icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Follow-ups', value: '94%', Icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Satisfied', value: '4.9/5', Icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className={`w-8 h-8 ${m.bg} rounded-lg flex items-center justify-center mx-auto mb-1.5`}>
                        <m.Icon size={16} className={m.color} strokeWidth={1.75} />
                      </div>
                      <div className="font-bold text-navy text-base">{m.value}</div>
                      <div className="text-slate-400 text-xs">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent leads preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="font-playfair text-lg font-semibold text-navy">Recent Enquiries</h3>
                <button onClick={() => setActiveTab('leads')} className="text-gold text-sm font-medium hover:underline">
                  View All →
                </button>
              </div>
              <div className="divide-y divide-slate-50">
                {enquiries.slice(0, 4).map((enq) => (
                  <EnquiryRow key={enq.id} enquiry={enq} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <Filter size={16} className="text-gold" />
              <span className="text-sm font-medium text-slate-500">Filter by status:</span>
              {['all', 'new', 'contacted', 'viewing_scheduled', 'closed'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    filter === s
                      ? 'bg-navy text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {s === 'all' ? 'All' : s.replace('_', ' ')}
                  {s !== 'all' && (
                    <span className="ml-1.5 bg-white/20 px-1.5 rounded text-xs">
                      {enquiries.filter((e) => e.status === s).length}
                    </span>
                  )}
                </button>
              ))}
              <span className="ml-auto text-sm text-slate-400">{filteredEnquiries.length} results</span>
            </div>

            {/* Enquiries table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Lead</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Property</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Source</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredEnquiries.map((enq) => {
                      const statusCfg = statusConfig[enq.status]
                      const typeCfg = typeConfig[enq.type]
                      const StatusIcon = statusCfg.icon
                      return (
                        <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-gold/40 flex items-center justify-center font-bold text-gold-dark text-sm">
                                {enq.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-navy text-sm">{enq.name}</div>
                                <div className="text-slate-400 text-xs">{enq.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-navy line-clamp-1 max-w-[180px]">{enq.propertyTitle}</div>
                            <div className="text-xs text-slate-400">#{enq.propertyId}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeCfg.color}`}>
                              {(() => { const TypeIcon = typeCfg.icon; return <TypeIcon size={11} /> })()}
                              {typeCfg.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500">{enq.date}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${statusCfg.color}`}>
                              <StatusIcon size={11} />
                              {statusCfg.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${enq.phone}`}
                                className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
                                title="Call"
                              >
                                <Phone size={14} className="text-green-600" />
                              </a>
                              <a
                                href={`mailto:${enq.email}`}
                                className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
                                title="Email"
                              >
                                <Mail size={14} className="text-blue-600" />
                              </a>
                              <a
                                href={`https://wa.me/${enq.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                                title="WhatsApp"
                              >
                                <MessageCircle size={14} className="text-emerald-600" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {properties.map((property) => {
                const propEnquiries = enquiries.filter((e) => e.propertyId === property.id)
                return (
                  <div key={property.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all">
                    <div className="relative h-40">
                      <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-white/90 text-navy text-xs font-semibold px-2.5 py-1 rounded-full">
                          {formatPrice(property.price, property.priceUnit)}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full capitalize">
                          {property.listingType === 'buy' ? 'Sale' : 'Rent'}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-navy text-sm mb-1 line-clamp-2">{property.title}</h3>
                      <p className="text-slate-400 text-xs mb-4">{property.location}</p>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center bg-slate-50 rounded-lg p-2">
                          <div className="font-bold text-navy text-lg">{propEnquiries.length}</div>
                          <div className="text-slate-400 text-xs">Enquiries</div>
                        </div>
                        <div className="text-center bg-slate-50 rounded-lg p-2">
                          <div className="font-bold text-navy text-lg">{propEnquiries.filter((e) => e.status === 'viewing_scheduled').length}</div>
                          <div className="text-slate-400 text-xs">Viewings</div>
                        </div>
                        <div className="text-center bg-slate-50 rounded-lg p-2">
                          <div className="font-bold text-navy text-lg">{propEnquiries.filter((e) => e.status === 'closed').length}</div>
                          <div className="text-slate-400 text-xs">Closed</div>
                        </div>
                      </div>
                      <Link
                        href={`/properties/${property.slug}`}
                        className="text-gold text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        View Property <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EnquiryRow({ enquiry }: { enquiry: Enquiry }) {
  const statusCfg = statusConfig[enquiry.status]
  const typeCfg = typeConfig[enquiry.type]
  const StatusIcon = statusCfg.icon
  const TypeIcon = typeCfg.icon

  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-gold/40 flex items-center justify-center font-bold text-gold-dark text-sm flex-shrink-0">
          {enquiry.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-navy text-sm truncate">{enquiry.name}</div>
          <div className="text-slate-400 text-xs truncate">{enquiry.propertyTitle}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
        <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeCfg.color}`}>
          <TypeIcon size={11} />
          {typeCfg.label}
        </span>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${statusCfg.color}`}>
          <StatusIcon size={11} />
          {statusCfg.label}
        </span>
        <span className="text-slate-400 text-xs hidden md:block">{enquiry.date}</span>
      </div>
    </div>
  )
}
