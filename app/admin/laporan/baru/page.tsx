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
  const text = data.caption || data.raw_text || ''
  const firstLine = text.split('\n').find(l => l.trim().length > 0) || ''
  return firstLine.slice(0, 60) || `Kos BK-${data.id}`
}

export default function NewReportPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [kosId, setKosId] = useState('')
  const [lookupState, setLookupState] = useState<'idle' | 'loading' | 'found' | 'notfound'>('idle')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [clientName, setClientName] = useState('')
  const [clientWa, setClientWa] = useState('')
  const [kosName, setKosName] = useState('')
  const [kosAddress, setKosAddress] = useState('')
  const [kosOwnerContact, setKosOwnerContact] = useState('')
  const [price, setPrice] = useState('')
  const [kosDbId, setKosDbId] = useState<number | null>(null)

  function handleKosIdChange(raw: string) {
    const value = raw.replace(/[^0-9]/g, '')
    setKosId(value)
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
      setKosName(extractKosName(data))
      setKosAddress(data.location || '')
      setKosOwnerContact(data.contact || '')
      setPrice(data.price || '')
      setKosDbId(data.id)
      setLookupState('found')
    } catch {
      setLookupState('notfound')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!kosName.trim()) { alert('Nama kos wajib diisi'); return }
    if (!clientName.trim()) { alert('Nama klien wajib diisi'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientWa: clientWa.trim(),
          kosName: kosName.trim(),
          kosAddress: kosAddress.trim(),
          kosOwner: '',
          kosOwnerContact: kosOwnerContact.trim(),
          price: price.trim(),
          inspectionDate: new Date().toISOString(),
          ...(kosDbId ? { kosDbId } : {}),
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
          <p className="text-gray-400 text-sm mt-1">Isi ID kos jika ada di database, atau input manual langsung</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Kos ID lookup (opsional) */}
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-1">ID Kos <span className="text-gray-600 font-normal normal-case">(opsional)</span></h2>
            <p className="text-xs text-gray-500 mb-3">Jika kos ada di database Bantukos, isi ID-nya untuk auto-fill</p>
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
              {lookupState === 'found' && (
                <span className="px-3 text-cyan-400 text-xs">✓ ditemukan</span>
              )}
            </div>
            {lookupState === 'notfound' && kosId && (
              <p className="mt-2 text-yellow-500 text-xs">BK-{kosId} tidak ditemukan — isi detail kos secara manual di bawah</p>
            )}
          </section>

          {/* Detail Kos */}
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Detail Kos</h2>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Nama Kos *</label>
              <input
                type="text"
                value={kosName}
                onChange={e => setKosName(e.target.value)}
                placeholder="Kos Melati / nama kos"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Alamat</label>
              <input
                type="text"
                value={kosAddress}
                onChange={e => setKosAddress(e.target.value)}
                placeholder="Jl. Mawar No. 5, Kota"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1.5">Harga</label>
                <input
                  type="text"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="Rp 1.500.000/bln"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1.5">Kontak Pemilik</label>
                <input
                  type="text"
                  value={kosOwnerContact}
                  onChange={e => setKosOwnerContact(e.target.value)}
                  placeholder="628xxxxxxxxxx"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
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

          <p className="text-xs text-gray-600 px-1">
            ✓ Tanggal inspeksi: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <button
            type="submit"
            disabled={loading || !kosName.trim() || !clientName.trim()}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-800 disabled:text-gray-600 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            {loading ? 'Membuat...' : 'Mulai Inspeksi →'}
          </button>
        </form>
      </div>
    </div>
  )
}
