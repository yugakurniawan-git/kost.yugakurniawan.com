import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calcOverallScore, calcVerdict } from '@/lib/report-utils'

// GET /api/reports/[id]
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const report = await prisma.report.findUnique({
    where: { id },
    include: { items: { orderBy: [{ category: 'asc' }, { order: 'asc' }] } },
  })
  if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(report)
}

// PATCH /api/reports/[id] — update field & item scores
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { items, redFlags, hiddenGems, summary, coverPhotoUrl, ...reportFields } = body

  // Update items kalau ada
  if (items && Array.isArray(items)) {
    for (const item of items) {
      await prisma.reportItem.update({
        where: { id: item.id },
        data: {
          score: item.score ?? null,
          notes: item.notes ?? null,
          photoUrls: item.photoUrls ?? [],
        },
      })
    }
  }

  // Hitung ulang overall score & verdict
  const allItems = await prisma.reportItem.findMany({ where: { reportId: id } })
  const overallScore = calcOverallScore(allItems)
  const verdict = calcVerdict(overallScore)

  const updated = await prisma.report.update({
    where: { id },
    data: {
      ...reportFields,
      redFlags: redFlags ?? undefined,
      hiddenGems: hiddenGems ?? undefined,
      summary: summary ?? undefined,
      coverPhotoUrl: coverPhotoUrl ?? undefined,
      overallScore: overallScore ?? undefined,
      verdict: verdict ?? undefined,
    },
    include: { items: { orderBy: [{ category: 'asc' }, { order: 'asc' }] } },
  })

  return NextResponse.json(updated)
}
