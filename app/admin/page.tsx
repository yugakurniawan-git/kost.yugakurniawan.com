'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { VERDICT_LABELS } from '@/lib/report-utils'

type ReportSummary = {
  id: string
  slug: string
  status: 'DRAFT' | 'PUBLISHED'
  clientName: string
  kosName: string
  kosAddress: string
  overallScore: number | null
  verdict: 'RECOMMENDED' | 'NEGOTIATE' | 'SKIP' | null
  inspectionDate: string
  createdAt: string
  publishedAt: string | null
}

export default function AdminPage() {
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<string | null>(null)
  const [filterDate, setFilterDate] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    fetch('/api/reports')
      .then(r => r.json())
      .then(data => { setReports(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const drafts = reports.filter(r => r.status === 'DRAFT')

  const published = reports.filter(r => {
    if (r.status !== 'PUBLISHED') return false
    if (filterName && !r.kosName.toLowerCase().includes(filterName.toLowerCase())) return false
    if (filterDate && r.publishedAt) {
      const pub = new Date(r.publishedAt).toISOString().slice(0, 10)
      if (pub !== filterDate) return false
    }
    return true
  })

  async function handleSync() {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch('/api/reports/sync-sheet', { method: 'POST' })
      const data = await res.json()
      if (res.ok) setSyncResult(`${data.synced} laporan berhasil disinkronkan ke Google Sheets`)
      else setSyncResult(`Gagal: ${data.error ?? 'Unknown error'}`)
    } catch {
      setSyncResult('Gagal menghubungi server')
    } finally {
      setSyncing(false)
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  function ReportCard({ r }: { r: ReportSummary }) {
    const verdict = r.verdict ? VERDICT_LABELS[r.verdict] : null
    return (
      <Link
        href={`/admin/laporan/${r.id}`}
        className="block bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-white truncate">{r.kosName}</span>
            </div>
            <p className="text-gray-400 text-sm mt-1 truncate">{r.kosAddress}</p>
            <p className="text-gray-500 text-xs mt-1">
              Klien: <span className="text-gray-300">{r.clientName}</span>
              {' · '}Inspeksi: <span className="text-gray-300">{formatDate(r.inspectionDate)}</span>
              {r.publishedAt && (
                <> {' · '}Publish: <span className="text-gray-300">{formatDate(r.publishedAt)}</span></>
              )}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            {r.overallScore !== null && (
              <div className="text-2xl font-bold text-white">{r.overallScore.toFixed(1)}</div>
            )}
            {verdict && (
              <div
                className="text-xs px-2 py-0.5 rounded-full mt-1"
                style={{ backgroundColor: verdict.bg + '40', color: verdict.color }}
              >
                {verdict.label}
              </div>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Bantukos Admin</h1>
            <p className="text-gray-400 text-sm mt-1">Laporan Inspeksi Kos</p>
          </div>
          <Link
            href="/admin/laporan/baru"
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            + Buat Laporan
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Memuat...</div>
        ) : (
          <>
            {/* DRAFT section */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
                Sedang Berjalan
                <span className="text-gray-500 text-sm font-normal">({drafts.length})</span>
              </h2>
              {drafts.length === 0 ? (
                <p className="text-gray-600 text-sm py-4">Tidak ada inspeksi yang sedang berjalan.</p>
              ) : (
                <div className="space-y-3">
                  {drafts.map(r => <ReportCard key={r.id} r={r} />)}
                </div>
              )}
            </section>

            {/* PUBLISHED section */}
            <section>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
                <h2 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                  Sudah Selesai
                  <span className="text-gray-500 text-sm font-normal">({published.length})</span>
                </h2>
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  {syncing ? 'Menyinkronkan...' : '↑ Sync ke Sheets'}
                </button>
              </div>

              {syncResult && (
                <div className={`text-sm px-4 py-2 rounded-lg mb-3 ${syncResult.startsWith('Gagal') ? 'bg-red-900/40 text-red-400' : 'bg-green-900/40 text-green-400'}`}>
                  {syncResult}
                </div>
              )}

              <div className="flex gap-3 mb-4 flex-wrap">
                <input
                  type="text"
                  placeholder="Filter nama kos..."
                  value={filterName}
                  onChange={e => setFilterName(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg px-3 py-2 w-56 placeholder-gray-500 focus:outline-none focus:border-gray-500"
                />
                <input
                  type="date"
                  value={filterDate}
                  onChange={e => setFilterDate(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
                />
                {(filterName || filterDate) && (
                  <button
                    onClick={() => { setFilterName(''); setFilterDate('') }}
                    className="text-gray-400 hover:text-gray-200 text-sm px-2"
                  >
                    Reset filter
                  </button>
                )}
              </div>

              {published.length === 0 ? (
                <p className="text-gray-600 text-sm py-4">
                  {filterName || filterDate ? 'Tidak ada laporan yang cocok dengan filter.' : 'Belum ada laporan yang dipublish.'}
                </p>
              ) : (
                <div className="space-y-3">
                  {published.map(r => <ReportCard key={r.id} r={r} />)}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}
