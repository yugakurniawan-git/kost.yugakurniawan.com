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

  useEffect(() => {
    fetch('/api/reports')
      .then(r => r.json())
      .then(data => { setReports(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

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
        ) : reports.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Belum ada laporan</p>
            <p className="text-sm mt-2">Klik "Buat Laporan" untuk mulai inspeksi</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map(r => {
              const verdict = r.verdict ? VERDICT_LABELS[r.verdict] : null
              const date = new Date(r.inspectionDate).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric'
              })
              return (
                <Link
                  key={r.id}
                  href={`/admin/laporan/${r.id}`}
                  className="block bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-white truncate">{r.kosName}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            r.status === 'PUBLISHED'
                              ? 'bg-green-900/50 text-green-400'
                              : 'bg-yellow-900/50 text-yellow-400'
                          }`}
                        >
                          {r.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1 truncate">{r.kosAddress}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Klien: <span className="text-gray-300">{r.clientName}</span>
                        {' · '}Inspeksi: <span className="text-gray-300">{date}</span>
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
            })}
          </div>
        )}
      </div>
    </div>
  )
}
