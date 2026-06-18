import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

const PUBLIC_PATHS = ['/', '/login', '/register', '/pricing', '/download', '/faq', '/api/auth/login', '/api/auth/register']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isPublic = PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith('/api/auth/'))
  if (isPublic) return NextResponse.next()

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/')) {
    const token = req.cookies.get('swaplive_token')?.value
    if (!token || !verifyToken(token)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
