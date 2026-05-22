'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewReportPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    clientName: '',
    clientWa: '',
    kosName: '',
    kosAddress: '',
    kosOwner: '',
    kosOwnerContact: '',
    price: '',
    inspectionDate: new Date().toISOString().slice(0, 10),
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push('/admin')}
            className="text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-1"
          >
            ← Kembali
          </button>
          <h1 className="text-xl font-bold text-white">Buat Laporan Baru</h1>
          <p className="text-gray-400 text-sm mt-1">Isi data klien & kos yang akan diinspeksi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Data Klien</h2>
            <Field label="Nama Klien *" value={form.clientName} onChange={v => set('clientName', v)} required />
            <Field label="WhatsApp Klien" value={form.clientWa} onChange={v => set('clientWa', v)} placeholder="628xxxxxxxxxx" />
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Data Kos</h2>
            <Field label="Nama / Branding Kos *" value={form.kosName} onChange={v => set('kosName', v)} required />
            <Field label="Alamat Lengkap *" value={form.kosAddress} onChange={v => set('kosAddress', v)} required />
            <Field label="Nama Pemilik" value={form.kosOwner} onChange={v => set('kosOwner', v)} />
            <Field label="Kontak Pemilik" value={form.kosOwnerContact} onChange={v => set('kosOwnerContact', v)} />
            <Field label="Harga Kos (teks bebas)" value={form.price} onChange={v => set('price', v)} placeholder="mis. Rp 1.2jt/bulan, nego" />
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">Tanggal Inspeksi</h2>
            <input
              type="date"
              value={form.inspectionDate}
              onChange={e => set('inspectionDate', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:text-gray-400 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            {loading ? 'Membuat...' : 'Buat Laporan & Mulai Inspeksi →'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder, required
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
      />
    </div>
  )
}
