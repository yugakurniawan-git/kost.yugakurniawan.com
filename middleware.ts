import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USER = 'yugakurniawan'
const ADMIN_PASS = 'Cleoraviolyn0!'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const auth = req.headers.get('authorization') ?? ''
  if (auth.startsWith('Basic ')) {
    const [user, pass] = Buffer.from(auth.slice(6), 'base64').toString().split(':')
    if (user === ADMIN_USER && pass === ADMIN_PASS) return NextResponse.next()
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Bantukos Admin"' },
  })
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
