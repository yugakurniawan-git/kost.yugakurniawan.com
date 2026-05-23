import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/report-utils'
import { CHECKLIST_ITEMS } from '@/lib/checklist'

const WA_NOTIFY_URL = process.env.WA_NOTIFY_URL || 'http://bantukos-wa-bot:3001/notify'

// GET /api/reports — list semua report (admin)
export async function GET() {
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, slug: true, status: true,
      clientName: true, kosName: true, kosAddress: true,
      overallScore: true, verdict: true,
      inspectionDate: true, createdAt: true, publishedAt: true,
    },
  })
  return NextResponse.json(reports)
}

// POST /api/reports — buat report baru (draft)
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { clientName, clientWa, kosName, kosAddress, kosOwner,
          kosOwnerContact, price, inspectionDate } = body

  if (!clientName || !kosName || !kosAddress) {
    return NextResponse.json({ error: 'clientName, kosName, kosAddress wajib diisi' }, { status: 400 })
  }

  const slug = generateSlug()

  const report = await prisma.report.create({
    data: {
      slug,
      clientName, clientWa: clientWa || '',
      kosName, kosAddress,
      kosOwner: kosOwner || '',
      kosOwnerContact: kosOwnerContact || '',
      price: price || '',
      inspectionDate: inspectionDate ? new Date(inspectionDate) : new Date(),
      items: {
        create: CHECKLIST_ITEMS.map(item => ({
          category: item.category,
          label: item.label,
          order: item.order,
        })),
      },
    },
    include: { items: true },
  })

  // Kirim notif WA: inspeksi sedang berjalan, laporan menyusul
  if (report.clientWa) {
    const wa = report.clientWa.replace(/\D/g, '').replace(/^0/, '62')
    const message =
      `Halo *${report.clientName}*! 👋\n\n` +
      `Tim Bantukos sudah mulai inspeksi kos *${report.kosName}* hari ini 📋\n\n` +
      `Kami akan datang ke lokasi, rekam video walk-through, cek fasilitas, ` +
      `dan susun laporan jujur. Estimasi laporan siap dalam 24 jam.\n\n` +
      `Kamu akan dapat notifikasi WA lagi dengan link laporan begitu selesai. ` +
      `Tetap stand-by ya! 🙏`

    try {
      await fetch(WA_NOTIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, targetWa: wa }),
      })
    } catch (e) {
      console.error('WA notify (create) failed:', e)
    }
  }

  return NextResponse.json(report, { status: 201 })
}
