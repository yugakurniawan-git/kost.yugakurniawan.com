import { NextRequest, NextResponse } from 'next/server'

const WA_BOT_URL = process.env.WA_NOTIFY_URL?.replace('/notify', '') || 'http://bantukos-wa-bot:3001'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  try {
    const res = await fetch(`${WA_BOT_URL}/kos/${id}`, { next: { revalidate: 0 } })
    const data = await res.json()
    if (!res.ok) return NextResponse.json({ error: 'Kos tidak ditemukan' }, { status: 404 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Gagal menghubungi database kos' }, { status: 502 })
  }
}
