'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CATEGORY_LABELS, getItemConfig } from '@/lib/checklist'
import { VERDICT_LABELS, scoreColor, scoreEmoji } from '@/lib/report-utils'

type Item = {
  id: number
  category: string
  label: string
  score: number | null
  notes: string | null
  photoUrls: string[]
  order: number
}

type Report = {
  id: string
  slug: string
  status: 'DRAFT' | 'PUBLISHED'
  clientName: string
  clientWa: string
  kosName: string
  kosAddress: string
  kosOwner: string
  kosOwnerContact: string
  price: string
  inspectionDate: string
  overallScore: number | null
  verdict: 'RECOMMENDED' | 'NEGOTIATE' | 'SKIP' | null
  summary: string | null
  redFlags: string[]
  hiddenGems: string[]
  coverPhotoUrl: string | null
  items: Item[]
}

export default function InspectPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [report, setReport] = useState<Report | null>(null)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [redFlagInput, setRedFlagInput] = useState('')
  const [hiddenGemInput, setHiddenGemInput] = useState('')
  const [uploadingItem, setUploadingItem] = useState<number | null>(null)
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetch(`/api/reports/${id}`)
      .then(r => r.json())
      .then((data: Report) => {
        setReport(data)
        if (data.items.length > 0) setActiveCategory(data.items[0].category)
      })
  }, [id])

  const autoSave = useCallback((updated: Report) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(async () => {
      setSaving(true)
      await fetch(`/api/reports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: updated.items,
          summary: updated.summary,
          redFlags: updated.redFlags,
          hiddenGems: updated.hiddenGems,
          coverPhotoUrl: updated.coverPhotoUrl,
        }),
      }).then(r => r.json()).then(saved => {
        setReport(prev => prev ? {
          ...prev,
          overallScore: saved.overallScore,
          verdict: saved.verdict,
        } : prev)
      })
      setSaving(false)
    }, 800)
  }, [id])

  function updateItem(itemId: number, patch: Partial<Item>) {
    setReport(prev => {
      if (!prev) return prev
      const updated = {
        ...prev,
        items: prev.items.map(i => i.id === itemId ? { ...i, ...patch } : i),
      }
      autoSave(updated)
      return updated
    })
  }

  async function uploadPhoto(itemId: number, file: File) {
    setUploadingItem(itemId)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        setReport(prev => {
          if (!prev) return prev
          const updated = {
            ...prev,
            items: prev.items.map(i =>
              i.id === itemId ? { ...i, photoUrls: [...i.photoUrls, data.url] } : i
            ),
          }
          autoSave(updated)
          return updated
        })
      }
    } finally {
      setUploadingItem(null)
    }
  }

  async function removePhoto(itemId: number, url: string) {
    setReport(prev => {
      if (!prev) return prev
      const updated = {
        ...prev,
        items: prev.items.map(i =>
          i.id === itemId ? { ...i, photoUrls: i.photoUrls.filter(u => u !== url) } : i
        ),
      }
      autoSave(updated)
      return updated
    })
  }

  function addTag(field: 'redFlags' | 'hiddenGems', value: string) {
    if (!value.trim() || !report) return
    const updated = { ...report, [field]: [...report[field], value.trim()] }
    setReport(updated)
    autoSave(updated)
    if (field === 'redFlags') setRedFlagInput('')
    else setHiddenGemInput('')
  }

  function removeTag(field: 'redFlags' | 'hiddenGems', idx: number) {
    if (!report) return
    const updated = { ...report, [field]: report[field].filter((_, i) => i !== idx) }
    setReport(updated)
    autoSave(updated)
  }

  async function publishReport() {
    if (!report) return
    if (!confirm(`Publish laporan untuk ${report.clientName}? WA notif akan dikirim.`)) return
    setPublishing(true)
    const res = await fetch(`/api/reports/${id}/publish`, { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      setReport(prev => prev ? { ...prev, status: 'PUBLISHED' } : prev)
      alert(`✅ Published!\nLink: ${data.reportUrl}`)
    } else {
      alert(data.error || 'Gagal publish')
    }
    setPublishing(false)
  }

  if (!report) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">Memuat...</div>
  }

  const categories = Array.from(new Set(report.items.map(i => i.category)))
  const activeItems = report.items.filter(i => i.category === activeCategory).sort((a, b) => a.order - b.order)
  const verdict = report.verdict ? VERDICT_LABELS[report.verdict] : null
  const reportUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bantukos.com'}/laporan/${report.slug}`

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => router.push('/admin')} className="text-gray-400 hover:text-white flex-shrink-0">
              ←
            </button>
            <div className="min-w-0">
              <p className="font-semibold text-white truncate text-sm">{report.kosName}</p>
              <p className="text-xs text-gray-400 truncate">{report.clientName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {saving && <span className="text-xs text-gray-500">Menyimpan...</span>}
            {report.overallScore !== null && (
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold" style={{ color: scoreColor(report.overallScore) }}>
                  {report.overallScore.toFixed(1)}
                </span>
                {verdict && (
                  <span className="text-xs px-2 py-0.5 rounded-full hidden sm:block"
                    style={{ backgroundColor: verdict.bg + '30', color: verdict.color }}>
                    {verdict.label}
                  </span>
                )}
              </div>
            )}
            {report.status === 'DRAFT' ? (
              <button
                onClick={publishReport}
                disabled={publishing}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
              >
                {publishing ? '...' : 'Publish'}
              </button>
            ) : (
              <a href={reportUrl} target="_blank"
                className="bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                Lihat →
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map(cat => {
            const items = report.items.filter(i => i.category === cat)
            // Untuk item INFO, dianggap "terisi" kalau notes sudah diisi.
            const scored = items.filter(i => {
              const cfg = getItemConfig(i.label)
              return cfg?.type === 'INFO' ? !!i.notes : i.score !== null
            }).length
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
                <span className="ml-1.5 text-xs opacity-70">{scored}/{items.length}</span>
              </button>
            )
          })}
        </div>

        {/* Checklist items */}
        <div className="space-y-3 mb-6">
          {activeItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              uploading={uploadingItem === item.id}
              onScore={score => updateItem(item.id, { score })}
              onNote={notes => updateItem(item.id, { notes })}
              onUpload={file => uploadPhoto(item.id, file)}
              onRemovePhoto={url => removePhoto(item.id, url)}
            />
          ))}
        </div>

        {/* Summary & Tags */}
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">📝 Ringkasan Inspektur</label>
            <textarea
              value={report.summary || ''}
              onChange={e => {
                const updated = { ...report, summary: e.target.value }
                setReport(updated)
                autoSave(updated)
              }}
              placeholder="Tulis kesimpulan keseluruhan kos ini..."
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 resize-none text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TagInput
              title="🚩 Red Flags"
              placeholder="mis. air bau, atap bocor..."
              color="red"
              tags={report.redFlags}
              input={redFlagInput}
              onInput={setRedFlagInput}
              onAdd={() => addTag('redFlags', redFlagInput)}
              onRemove={idx => removeTag('redFlags', idx)}
            />
            <TagInput
              title="💎 Hidden Gems"
              placeholder="mis. warung dekat, parkir luas..."
              color="green"
              tags={report.hiddenGems}
              input={hiddenGemInput}
              onInput={setHiddenGemInput}
              onAdd={() => addTag('hiddenGems', hiddenGemInput)}
              onRemove={idx => removeTag('hiddenGems', idx)}
              hint="Hanya untuk hal di luar checklist — seperti akses jalan mudah, tetangga tenang, pemilik sangat ramah. WiFi, AC, air dll sudah ada di checklist."
            />
          </div>

          {report.status === 'PUBLISHED' && (
            <div className="bg-gray-900 border border-green-800 rounded-xl p-4">
              <p className="text-sm text-green-400 font-medium mb-1">✅ Laporan Sudah Published</p>
              <a href={reportUrl} target="_blank"
                className="text-cyan-400 hover:text-cyan-300 text-sm break-all">
                {reportUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ItemCard({
  item, uploading, onScore, onNote, onUpload, onRemovePhoto
}: {
  item: Item
  uploading: boolean
  onScore: (s: number | null) => void
  onNote: (n: string) => void
  onUpload: (f: File) => void
  onRemovePhoto: (url: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const config = getItemConfig(item.label)
  const itemType = config?.type ?? 'SCALE'
  const binaryGood = config?.binaryGood ?? 'yes'

  // Untuk BINARY: tentukan score apa = jawaban "Ya" dan "Tidak"
  // binaryGood='yes' → "Ya"=5, "Tidak"=1. binaryGood='no' → "Ya"=1, "Tidak"=5
  const yesScore = binaryGood === 'yes' ? 5 : 1
  const noScore  = binaryGood === 'yes' ? 1 : 5

  return (
    <div className={`bg-gray-900 border rounded-xl overflow-hidden transition-colors ${
      item.score !== null || (itemType === 'INFO' && item.notes) ? 'border-gray-700' : 'border-gray-800'
    }`}>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white">{item.label}</p>
          {item.notes && (
            <p className="text-xs text-gray-500 truncate mt-0.5">{item.notes}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {item.photoUrls.length > 0 && (
            <span className="text-xs text-gray-500">📷{item.photoUrls.length}</span>
          )}
          {itemType === 'INFO'
            ? <InfoBadge filled={!!item.notes} />
            : itemType === 'BINARY'
              ? <BinaryBadge score={item.score} yesScore={yesScore} />
              : <ScoreBadge score={item.score} />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-800 px-4 py-3 space-y-3">
          {/* Input sesuai tipe item */}
          {itemType === 'SCALE' && (
            <div>
              <p className="text-xs text-gray-400 mb-2">Skor</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    onClick={() => onScore(item.score === s ? null : s)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                      item.score === s
                        ? 'text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                    style={item.score === s ? { backgroundColor: scoreColor(s), color: '#fff' } : {}}
                  >
                    {s}
                  </button>
                ))}
                {item.score !== null && (
                  <span className="self-center text-lg">{scoreEmoji(item.score)}</span>
                )}
              </div>
            </div>
          )}

          {itemType === 'BINARY' && (
            <div>
              <p className="text-xs text-gray-400 mb-2">Jawaban</p>
              <div className="flex gap-2">
                <button
                  onClick={() => onScore(item.score === yesScore ? null : yesScore)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    item.score === yesScore
                      ? (binaryGood === 'yes' ? 'bg-green-600 text-white' : 'bg-red-600 text-white')
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  ✓ Ya
                </button>
                <button
                  onClick={() => onScore(item.score === noScore ? null : noScore)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    item.score === noScore
                      ? (binaryGood === 'no' ? 'bg-green-600 text-white' : 'bg-red-600 text-white')
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  ✗ Tidak
                </button>
              </div>
            </div>
          )}

          {itemType === 'INFO' && (
            <p className="text-xs text-gray-500 -mb-1">
              📝 Item info — tulis isinya di catatan, tidak perlu beri nilai.
            </p>
          )}

          {/* Notes */}
          <div>
            <p className="text-xs text-gray-400 mb-1.5">Catatan</p>
            <textarea
              value={item.notes || ''}
              onChange={e => onNote(e.target.value)}
              placeholder="Catatan opsional..."
              rows={2}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          {/* Photos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400">Foto</p>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="text-xs text-cyan-400 hover:text-cyan-300 disabled:text-gray-600"
              >
                {uploading ? 'Uploading...' : '+ Tambah Foto'}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && onUpload(e.target.files[0])}
              />
            </div>
            {item.photoUrls.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {item.photoUrls.map(url => (
                  <div key={url} className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="w-16 h-16 object-cover rounded-lg" />
                    <button
                      onClick={() => onRemovePhoto(url)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return (
    <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-600 text-xs">–</span>
  )
  return (
    <span
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
      style={{ backgroundColor: scoreColor(score) }}
    >
      {score}
    </span>
  )
}

function BinaryBadge({ score, yesScore }: { score: number | null; yesScore: number }) {
  if (score === null) return (
    <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-600 text-xs">–</span>
  )
  const isYes = score === yesScore
  const isGood = score === 5  // 5 = jawaban baik, terlepas dari Ya/Tidak
  return (
    <span
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
      style={{ backgroundColor: isGood ? '#16a34a' : '#dc2626' }}
      title={isYes ? 'Ya' : 'Tidak'}
    >
      {isYes ? '✓' : '✗'}
    </span>
  )
}

function InfoBadge({ filled }: { filled: boolean }) {
  return (
    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
      filled ? 'bg-blue-900/60 text-blue-300' : 'bg-gray-800 text-gray-600'
    }`}>
      {filled ? '📝' : 'ℹ'}
    </span>
  )
}

function TagInput({
  title, placeholder, color, tags, input, onInput, onAdd, onRemove, hint
}: {
  title: string
  placeholder: string
  color: 'red' | 'green'
  tags: string[]
  input: string
  onInput: (v: string) => void
  onAdd: () => void
  onRemove: (i: number) => void
  hint?: string
}) {
  const colorClass = color === 'red'
    ? { bg: 'bg-red-900/30', text: 'text-red-300', border: 'border-red-800' }
    : { bg: 'bg-green-900/30', text: 'text-green-300', border: 'border-green-800' }

  return (
    <div className={`bg-gray-900 border ${colorClass.border} rounded-xl p-4`}>
      <p className={`text-sm font-medium text-gray-300 ${hint ? 'mb-1' : 'mb-3'}`}>{title}</p>
      {hint && <p className="text-xs text-gray-600 mb-3 leading-relaxed">{hint}</p>}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={e => onInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), onAdd())}
          placeholder={placeholder}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
        />
        <button
          onClick={onAdd}
          className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
        >
          +
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className={`flex items-center gap-1 px-2 py-1 ${colorClass.bg} ${colorClass.text} rounded-full text-xs`}>
            {tag}
            <button onClick={() => onRemove(i)} className="opacity-60 hover:opacity-100 ml-1">×</button>
          </span>
        ))}
      </div>
    </div>
  )
}
