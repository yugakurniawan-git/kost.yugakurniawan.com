"use client"

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const WA_NUMBER = "6289506585454"

interface Listing {
  id: number
  location: string
  price: string
  type: string
  facilities: string[]
  source: string
  posted_at: string
  image_url: string
}

const TYPE_COLORS: Record<string, string> = {
  Studio: 'bg-purple-400/15 border-purple-400/30 text-purple-300',
  Kontrakan: 'bg-amber-400/15 border-amber-400/30 text-amber-300',
  Putri: 'bg-pink-400/15 border-pink-400/30 text-pink-300',
  Putra: 'bg-blue-400/15 border-blue-400/30 text-blue-300',
  Campur: 'bg-teal-400/15 border-teal-400/30 text-teal-300',
  Kos: 'bg-sky-400/15 border-sky-400/30 text-sky-300',
}

const AREAS = ['Semua', 'Denpasar', 'Kuta', 'Seminyak', 'Canggu', 'Jimbaran', 'Ubud', 'Sanur', 'Sesetan', 'Pemogan', 'Mengwi']

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [area, setArea] = useState('Semua')

  useEffect(() => {
    fetch('/listings.json')
      .then(r => r.json())
      .then((data: Listing[]) => { setListings(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return listings.filter(l => {
      const matchArea = area === 'Semua' || l.location.toLowerCase().includes(area.toLowerCase())
      const q = search.toLowerCase()
      const matchSearch = !q || l.location.toLowerCase().includes(q) || l.type.toLowerCase().includes(q) || l.facilities.some(f => f.toLowerCase().includes(q))
      return matchArea && matchSearch
    })
  }, [listings, search, area])

  const waText = encodeURIComponent(`Halo Bantu Kos! 👋\n\nSaya tertarik dengan listing kos yang ada di bantukos.com. Bisa bantu cek kondisi aslinya?\n\nTerima kasih 🙏`)

  return (
    <main className="min-h-screen relative overflow-hidden text-slate-200">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-[#080c14]/70 backdrop-blur-xl border-b border-white/10">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          Bantu <span className="text-slate-200">Kos</span>
        </Link>
        <ul className="hidden sm:flex gap-8 list-none m-0">
          <li><Link href="/#layanan" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Layanan</Link></li>
          <li><Link href="/#cara-kerja" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Cara Kerja</Link></li>
          <li><Link href="/listings" className="text-sky-400 text-sm font-semibold">Kos Tersedia</Link></li>
          <li><Link href="/#faq" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">FAQ</Link></li>
        </ul>
        <a href={`https://wa.me/${WA_NUMBER}?text=${waText}`} target="_blank">
          <Button className="bg-gradient-to-r from-sky-400 to-indigo-400 font-bold text-[#0a0f1a] rounded-lg">
            Tanya via WA
          </Button>
        </a>
      </nav>

      {/* HEADER */}
      <section className="relative z-10 pt-32 pb-12 px-4 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-sky-400/10 border border-sky-400/25 rounded-full px-4 py-1.5 text-xs font-semibold text-sky-400 mb-5">
          <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse"></span>
          Diperbarui dari grup Facebook & Mamikos
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-tight tracking-tight mb-4">
          Kos Tersedia di <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Bali</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-base">
          Listing dikumpulkan dari grup Facebook dan Mamikos. Tertarik? Minta kami cek kondisi aslinya sebelum kamu DP.
        </p>
      </section>

      {/* FILTERS */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Cari lokasi, fasilitas, tipe kos..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors [&>option]:bg-slate-900 min-w-[160px]"
            value={area}
            onChange={e => setArea(e.target.value)}
          >
            {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* LISTINGS GRID */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pb-24">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Memuat listing...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <div className="text-4xl mb-4">🔍</div>
            <p>Tidak ada listing yang sesuai filter.</p>
            <p className="text-sm mt-2">Coba ubah area atau kata kunci pencarian.</p>
          </div>
        ) : (
          <>
            <div className="text-sm text-slate-400 mb-5">{filtered.length} listing ditemukan</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(l => (
                <ListingCard key={l.id} listing={l} waNumber={WA_NUMBER} />
              ))}
            </div>
          </>
        )}

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-br from-sky-400/10 to-indigo-400/5 border border-sky-400/20 rounded-3xl p-8 md:p-12 text-center">
          <div className="text-3xl mb-4">🔍</div>
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3">Tertarik dengan salah satu listing?</h2>
          <p className="text-slate-400 max-w-md mx-auto mb-6 text-sm">
            Jangan langsung DP. Kami bisa datang ke lokasi, cek kondisi aslinya, dan kirim laporan video dalam 24 jam — hanya Rp 150.000.
          </p>
          <a href={`https://wa.me/${WA_NUMBER}?text=${waText}`} target="_blank">
            <Button size="lg" className="bg-gradient-to-r from-sky-400 to-indigo-400 font-bold text-[#0a0f1a] rounded-xl px-8">
              Minta Inspeksi via WhatsApp →
            </Button>
          </a>
        </div>
      </div>

      {/* FLOATING WA BUTTON */}
      <a href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
         className="fixed bottom-8 right-8 z-50 bg-emerald-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(16,185,129,0.6)] transition-all"
         target="_blank" title="Chat WhatsApp">
         💬
      </a>
    </main>
  )
}

function ListingCard({ listing, waNumber }: { listing: Listing; waNumber: string }) {
  const typeColor = TYPE_COLORS[listing.type] || TYPE_COLORS.Kos
  const waText = encodeURIComponent(
    `Halo Bantu Kos! 👋\n\nSaya tertarik dengan listing kos di *${listing.location}* harga *${listing.price}*.\n\nBisa minta dicek kondisi aslinya? Terima kasih 🙏`
  )

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-sky-400/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(56,189,248,0.07)] transition-all">
      {/* Photo */}
      {listing.image_url ? (
        <div className="relative w-full h-44 bg-white/5 overflow-hidden">
          <img
            src={listing.image_url}
            alt={`Kos di ${listing.location}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/60 to-transparent" />
          <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-sm ${typeColor}`}>
            {listing.type}
          </span>
          <span className="absolute top-3 right-3 text-xs text-slate-300 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
            {listing.source === 'mamikos' ? '📋 Mamikos' : '👥 Facebook'}
          </span>
        </div>
      ) : (
        <div className="w-full h-32 bg-white/[0.03] flex flex-col items-center justify-center gap-1 border-b border-white/10">
          <span className="text-3xl">🏠</span>
          <span className="text-xs text-slate-500">Foto belum tersedia</span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Badge row when no image */}
        {!listing.image_url && (
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${typeColor}`}>
              {listing.type}
            </span>
            <span className="text-xs text-slate-500">
              {listing.source === 'mamikos' ? '📋 Mamikos' : '👥 Facebook'}
            </span>
          </div>
        )}

        {/* Location */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-slate-400 text-sm">📍</span>
          <span className="font-semibold text-base">{listing.location}</span>
        </div>

        {/* Price */}
        <div className="text-sky-400 font-extrabold text-xl mb-4">{listing.price}</div>

        {/* Facilities */}
        {listing.facilities.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {listing.facilities.map(f => (
              <span key={f} className="text-xs bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-slate-400">
                {f}
              </span>
            ))}
          </div>
        ) : (
          <div className="mb-5 text-xs text-slate-500">Fasilitas: hubungi pemilik</div>
        )}

        {/* CTA */}
        <div className="mt-auto flex gap-2">
          <a
            href={`https://wa.me/${waNumber}?text=${waText}`}
            target="_blank"
            className="flex-1 bg-gradient-to-r from-sky-400 to-indigo-400 text-[#0a0f1a] font-bold rounded-xl py-2.5 text-sm text-center hover:opacity-90 transition-opacity"
          >
            Minta Dicek →
          </a>
        </div>

        <div className="text-xs text-slate-600 mt-3 text-right">{listing.posted_at}</div>
      </div>
    </div>
  )
}
