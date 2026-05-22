'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

type KosData = {
  id: number
  location: string
  price: string
  contact: string
  raw_text: string
  caption: string
  status: string
}

function extractKosName(data: KosData): string {
  // Ambil baris pertama caption / raw_text sebagai nama kos
  const text = data.caption || data.raw_text || ''
  const firstLine = text.split('\n').find(l => l.trim().length > 0) || ''
  // Potong kalau terlalu panjang
  return firstLine.slice(0, 60) || `Kos BK-${data.id}`
}

export default function NewReportPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [kosId, setKosId] = useState('')
  const [kosData, setKosData] = useState<KosData | null>(null)
  const [lookupState, setLookupState] = useState<'idle' | 'loading' | 'found' | 'notfound'>('idle')
  const [clientName, setClientName] = useState('')
  const [clientWa, setClientWa] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleKosIdChange(raw: string) {
    // Izinkan "BK-123" atau "123"
    const value = raw.replace(/[^0-9]/g, '')
    setKosId(value)
    setKosData(null)
    setLookupState('idle')

    if (!value) return

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => lookupKos(value), 600)
  }

  async function lookupKos(id: string) {
    setLookupState('loading')
    try {
      const res = await fetch(`/api/kos/${id}`)
      if (!res.ok) { setLookupState('notfound'); return }
      const data: KosData = await res.json()
      setKosData(data)
      setLookupState('found')
    } catch {
      setLookupState('notfound')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!kosData) { alert('Cari dulu kos berdasarkan ID'); return }
    if (!clientName.trim()) { alert('Nama klien wajib diisi'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientWa: clientWa.trim(),
          kosName: extractKosName(kosData),
          kosAddress: kosData.location,
          kosOwner: '',
          kosOwnerContact: kosData.contact || '',
          price: kosData.price || '',
          inspectionDate: new Date().toISOString(),
          kosDbId: kosData.id,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        alert(err.error || 'Gagal membuat laporan')
        return
      }
      const report = await res.json()
      router.push(`/admin/laporan/${report.id}`)
    } catch {
      alert('Gagal membuat laporan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push('/admin')}
            className="text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-1"
          >
            ← Kembali
          </button>
          <h1 className="text-xl font-bold text-white">Buat Laporan Baru</h1>
          <p className="text-gray-400 text-sm mt-1">Masukkan ID kos dari database Bantukos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Kos ID lookup */}
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">ID Kos</h2>
            <div className="relative">
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg overflow-hidden focus-within:border-cyan-500">
                <span className="px-3 text-gray-500 font-mono text-sm select-none">BK-</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={kosId}
                  onChange={e => handleKosIdChange(e.target.value)}
                  placeholder="contoh: 241"
                  className="flex-1 bg-transparent px-2 py-2.5 text-white placeholder-gray-600 focus:outline-none font-mono"
                />
                {lookupState === 'loading' && (
                  <span className="px-3 text-gray-500 text-xs">mencari...</span>
                )}
              </div>
            </div>

            {/* Hasil lookup */}
            {lookupState === 'found' && kosData && (
              <div className="mt-3 bg-cyan-950/40 border border-cyan-800/50 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 text-sm mt-0.5">✓</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{extractKosName(kosData)}</p>
                    <p className="text-gray-400 text-xs mt-0.5 truncate">📍 {kosData.location}</p>
                    <div className="flex flex-wrap gap-3 mt-1.5 text-xs">
                      {kosData.price && (
                        <span className="text-green-400">💰 {kosData.price}</span>
                      )}
                      {kosData.contact && (
                        <span className="text-gray-400">📞 {kosData.contact}</span>
                      )}
                      <span className={`${kosData.status === 'posted' ? 'text-green-400' : 'text-yellow-400'}`}>
                        ● {kosData.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {lookupState === 'notfound' && kosId && (
              <p className="mt-2 text-red-400 text-xs">Kos BK-{kosId} tidak ditemukan di database</p>
            )}
          </section>

          {/* Data Klien */}
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Data Klien</h2>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Nama Klien *</label>
              <input
                type="text"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Nama lengkap klien"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">WhatsApp Klien</label>
              <input
                type="text"
                value={clientWa}
                onChange={e => setClientWa(e.target.value)}
                placeholder="628xxxxxxxxxx"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </section>

          {/* Info otomatis */}
          {kosData && (
            <div className="text-xs text-gray-500 px-1 space-y-0.5">
              <p>✓ Detail kos diambil otomatis dari database BK-{kosData.id}</p>
              <p>✓ Tanggal inspeksi: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || lookupState !== 'found'}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-800 disabled:text-gray-600 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            {loading ? 'Membuat...' : 'Mulai Inspeksi →'}
          </button>
        </form>
      </div>
    </div>
  )
}
