import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const WA_NOTIFY_URL = process.env.WA_NOTIFY_URL || 'http://bantukos-wa-bot:3001/notify'

// POST /api/reports/[id]/publish — publish & kirim WA ke client
export async function POST(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const report = await prisma.report.findUnique({
    where: { id },
    include: { items: true },
  })
  if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (report.status === 'PUBLISHED') return NextResponse.json({ error: 'Sudah dipublish' }, { status: 400 })

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 hari
  const reportUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bantukos.com'}/laporan/${report.slug}`

  const updated = await prisma.report.update({
    where: { id },
    data: {
      status: 'PUBLISHED',
      publishedAt: new Date(),
      expiresAt,
    },
  })

  // Kirim notif WA ke client
  if (report.clientWa) {
    const wa = report.clientWa.replace(/\D/g, '').replace(/^0/, '62')
    const verdictEmoji = report.verdict === 'RECOMMENDED' ? '✅' : report.verdict === 'NEGOTIATE' ? '⚠️' : '❌'
    const message =
      `Halo *${report.clientName}*! 👋\n\n` +
      `Laporan inspeksi kos *${report.kosName}* sudah selesai!\n\n` +
      `${verdictEmoji} *Hasil:* ${
        report.verdict === 'RECOMMENDED' ? 'Direkomendasikan' :
        report.verdict === 'NEGOTIATE' ? 'Bisa Nego Dulu' : 'Sebaiknya Lewati'
      }\n` +
      `⭐ *Skor:* ${report.overallScore?.toFixed(1) ?? '-'}/5\n\n` +
      `📋 Baca laporan lengkap:\n${reportUrl}\n\n` +
      `_Laporan valid hingga ${expiresAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}_`

    try {
      await fetch(WA_NOTIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, targetWa: wa }),
      })
    } catch (e) {
      console.error('WA notify failed:', e)
      // Tidak gagalkan publish kalau WA error
    }
  }

  return NextResponse.json({ ...updated, reportUrl })
}
