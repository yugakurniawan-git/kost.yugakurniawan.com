import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { prisma } from '@/lib/prisma'
import { VERDICT_LABELS } from '@/lib/report-utils'

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1UrTecJzi0s8jePWvUJ3sGxDTs7c2q_PFzFhSvWFsVrI'
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const PRIVATE_KEY = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY ?? '').replace(/\\n/g, '\n')

export async function POST(_: NextRequest) {
  if (!CLIENT_EMAIL || !PRIVATE_KEY) {
    return NextResponse.json({ error: 'Google Sheets env vars tidak dikonfigurasi' }, { status: 503 })
  }

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: CLIENT_EMAIL, private_key: PRIVATE_KEY },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const reports = await prisma.report.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true, slug: true, clientName: true, clientWa: true,
      kosName: true, kosAddress: true, price: true,
      overallScore: true, verdict: true, publishedAt: true,
      inspectionDate: true, summary: true,
    },
  })

  const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://bantukos.com'

  const rows = reports.map(r => [
    r.publishedAt ? new Date(r.publishedAt).toLocaleDateString('id-ID') : '-',
    r.clientName,
    r.clientWa,
    r.kosName,
    r.kosAddress,
    r.price,
    r.overallScore?.toFixed(1) ?? '-',
    r.verdict ? VERDICT_LABELS[r.verdict as keyof typeof VERDICT_LABELS]?.label ?? r.verdict : '-',
    `${SITE}/laporan/${r.slug}`,
    r.summary ?? '',
  ])

  const header = [
    'Tanggal Publish', 'Nama Klien', 'WA Klien', 'Nama Kos', 'Alamat',
    'Harga', 'Skor', 'Verdict', 'Link Laporan', 'Ringkasan'
  ]

  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: 'Laporan Inspeksi!A1',
    valueInputOption: 'RAW',
    requestBody: { values: [header, ...rows] },
  })

  return NextResponse.json({ synced: rows.length })
}
