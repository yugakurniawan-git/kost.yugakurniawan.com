import { customAlphabet } from 'nanoid'

// Slug pendek yang mudah dibaca: "abc12"
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8)

export function generateSlug(): string {
  return nanoid()
}

export function calcOverallScore(items: { score: number | null }[]): number | null {
  const scored = items.filter(i => i.score !== null) as { score: number }[]
  if (!scored.length) return null
  return Math.round((scored.reduce((s, i) => s + i.score, 0) / scored.length) * 10) / 10
}

export function calcVerdict(score: number | null): 'RECOMMENDED' | 'NEGOTIATE' | 'SKIP' | null {
  if (score === null) return null
  if (score >= 3.8) return 'RECOMMENDED'
  if (score >= 2.5) return 'NEGOTIATE'
  return 'SKIP'
}

export const VERDICT_LABELS = {
  RECOMMENDED: { label: 'Direkomendasikan ✅', color: '#16a34a', bg: '#dcfce7' },
  NEGOTIATE:   { label: 'Bisa Nego Dulu ⚠️',  color: '#d97706', bg: '#fef3c7' },
  SKIP:        { label: 'Lewati ❌',            color: '#dc2626', bg: '#fee2e2' },
}

export function scoreColor(score: number): string {
  if (score >= 4) return '#16a34a'
  if (score >= 3) return '#d97706'
  return '#dc2626'
}

export function scoreEmoji(score: number): string {
  if (score >= 4.5) return '🌟'
  if (score >= 4) return '✅'
  if (score >= 3) return '⚠️'
  if (score >= 2) return '❌'
  return '💀'
}

// Harga pasar dari text parsing untuk perbandingan
export function parsePriceToNumber(price: string): number | null {
  if (!price) return null
  const t = price.toLowerCase()
  const num = parseFloat(t.replace(/[^\d.,]/g, '').replace(',', '.'))
  if (isNaN(num)) return null
  if (/juta|jt/.test(t)) return num * 1_000_000
  if (/ribu|rb|k/.test(t)) return num * 1_000
  return num > 1000 ? num : null
}

export function formatRupiah(n: number): string {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1).replace('.0', '')} jt`
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)} rb`
  return `Rp ${n}`
}
