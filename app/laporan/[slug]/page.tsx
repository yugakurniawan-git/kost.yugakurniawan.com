export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CATEGORY_LABELS } from '@/lib/checklist'
import { VERDICT_LABELS, scoreColor, scoreEmoji, formatRupiah, parsePriceToNumber } from '@/lib/report-utils'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const report = await prisma.report.findUnique({ where: { slug } })
  if (!report) return { title: 'Laporan tidak ditemukan' }
  return {
    title: `Laporan Inspeksi ${report.kosName} — Bantukos`,
    description: `Laporan inspeksi kos ${report.kosName} di ${report.kosAddress}. Skor: ${report.overallScore?.toFixed(1) ?? '-'}/5`,
  }
}

export default async function LaporanPage({ params }: Props) {
  const { slug } = await params
  const report = await prisma.report.findUnique({
    where: { slug },
    include: { items: { orderBy: [{ category: 'asc' }, { order: 'asc' }] } },
  })

  if (!report) notFound()
  if (report.status !== 'PUBLISHED') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="text-lg font-semibold">Laporan belum tersedia</p>
          <p className="text-sm mt-2">Laporan sedang diproses oleh tim Bantukos</p>
        </div>
      </div>
    )
  }

  const verdict = report.verdict ? VERDICT_LABELS[report.verdict as keyof typeof VERDICT_LABELS] : null
  const categories = Array.from(new Set(report.items.map(i => i.category)))
  const priceNum = parsePriceToNumber(report.price)

  const categoryScores = categories.map(cat => {
    const items = report.items.filter(i => i.category === cat && i.score !== null)
    const avg = items.length ? items.reduce((s, i) => s + i.score!, 0) / items.length : null
    return { cat, avg, count: items.length, total: report.items.filter(i => i.category === cat).length }
  })

  const allPhotos = report.items.flatMap(i => i.photoUrls).slice(0, 9)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Cover */}
      <div className="bg-gray-900 text-white px-6 pt-10 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-cyan-400 text-sm font-medium mb-1">Laporan Inspeksi Kos</p>
              <h1 className="text-2xl font-bold leading-tight">{report.kosName}</h1>
              <p className="text-gray-400 text-sm mt-1">{report.kosAddress}</p>
            </div>
            {verdict && (
              <div
                className="flex-shrink-0 px-4 py-2 rounded-xl text-center"
                style={{ backgroundColor: verdict.bg + '25', border: `1px solid ${verdict.color}40` }}
              >
                <div className="text-3xl font-black" style={{ color: verdict.color }}>
                  {report.overallScore?.toFixed(1) ?? '–'}
                </div>
                <div className="text-xs mt-0.5" style={{ color: verdict.color }}>{verdict.label}</div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <InfoCell label="Klien" value={report.clientName} />
            <InfoCell label="Tanggal Inspeksi" value={
              new Date(report.inspectionDate).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
              })
            } />
            {report.price && <InfoCell label="Harga Kos" value={report.price} />}
            {report.kosOwner && <InfoCell label="Pemilik" value={report.kosOwner} />}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* Summary */}
        {report.summary && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>📝</span> Ringkasan Inspektur
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{report.summary}</p>
          </section>
        )}

        {/* Red flags & Hidden gems */}
        {(report.redFlags.length > 0 || report.hiddenGems.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.redFlags.length > 0 && (
              <section className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <h2 className="font-semibold text-red-700 mb-3">🚩 Yang Perlu Diperhatikan</h2>
                <ul className="space-y-1.5">
                  {(report.redFlags as string[]).map((f, i) => (
                    <li key={i} className="text-red-700 text-sm flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0">•</span>{f}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {report.hiddenGems.length > 0 && (
              <section className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <h2 className="font-semibold text-green-700 mb-3">💎 Hidden Gems</h2>
                <ul className="space-y-1.5">
                  {(report.hiddenGems as string[]).map((g, i) => (
                    <li key={i} className="text-green-700 text-sm flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0">•</span>{g}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* Score per category */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">📊 Skor per Kategori</h2>
          <div className="space-y-3">
            {categoryScores.map(({ cat, avg, count, total }) => (
              <div key={cat}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{CATEGORY_LABELS[cat] || cat}</span>
                  <span className="text-sm font-semibold" style={avg ? { color: scoreColor(avg) } : {}}>
                    {avg ? `${avg.toFixed(1)} ${scoreEmoji(avg)}` : `–`}
                    <span className="text-xs text-gray-400 font-normal ml-1">({count}/{total})</span>
                  </span>
                </div>
                {avg !== null && (
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(avg / 5) * 100}%`, backgroundColor: scoreColor(avg) }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Photo gallery */}
        {allPhotos.length > 0 && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">📷 Foto Inspeksi</h2>
            <div className="grid grid-cols-3 gap-2">
              {allPhotos.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={url} alt="" className="w-full aspect-square object-cover rounded-xl" />
              ))}
            </div>
          </section>
        )}

        {/* Detail checklist */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">📋 Detail Inspeksi</h2>
          <div className="space-y-6">
            {categories.map(cat => {
              const items = report.items.filter(i => i.category === cat).sort((a, b) => a.order - b.order)
              return (
                <div key={cat}>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    {CATEGORY_LABELS[cat] || cat}
                  </h3>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700">{item.label}</p>
                          {item.notes && (
                            <p className="text-xs text-gray-500 mt-0.5">{item.notes}</p>
                          )}
                          {item.photoUrls.length > 0 && (
                            <div className="flex gap-1.5 mt-2 flex-wrap">
                              {item.photoUrls.map((url, i) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img key={i} src={url} alt="" className="w-12 h-12 object-cover rounded-lg" />
                              ))}
                            </div>
                          )}
                        </div>
                        {item.score !== null ? (
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                            style={{ backgroundColor: scoreColor(item.score) }}
                          >
                            {item.score}
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                            –
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-400">
            Laporan ini dibuat oleh{' '}
            <a href="https://bantukos.com" className="text-cyan-600 font-medium">Bantukos</a>
            {report.expiresAt && (
              <> · Valid hingga {new Date(report.expiresAt).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}</>
            )}
          </p>
          <a
            href="https://wa.me/6285190810100"
            className="inline-flex items-center gap-2 mt-3 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
          >
            💬 Tanya via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-white mt-0.5">{value}</p>
    </div>
  )
}
