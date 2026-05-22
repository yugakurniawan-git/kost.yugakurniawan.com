import { NextRequest, NextResponse } from 'next/server'

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!
const API_KEY = process.env.CLOUDINARY_API_KEY!
const API_SECRET = process.env.CLOUDINARY_API_SECRET!

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = buffer.toString('base64')
  const dataUri = `data:${file.type};base64,${base64}`

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const folder = 'bantukos-reports'

  // Sign: folder=...&timestamp=...&upload_preset=... (sorted, no empty)
  const toSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`
  const { createHash } = await import('crypto')
  const signature = createHash('sha256').update(toSign).digest('hex')

  const uploadData = new FormData()
  uploadData.append('file', dataUri)
  uploadData.append('api_key', API_KEY)
  uploadData.append('timestamp', timestamp)
  uploadData.append('signature', signature)
  uploadData.append('folder', folder)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: uploadData,
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json({ url: data.secure_url })
}
