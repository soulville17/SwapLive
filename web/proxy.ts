import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenEdge } from '@/lib/auth-edge'

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/api/auth/')) return NextResponse.next()

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/')) {
    const token = req.cookies.get('swaplive_token')?.value
    if (!token) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/login', req.url))
    }
    const payload = await verifyTokenEdge(token)
    if (!payload) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
