import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { mockDb } from '@/lib/mock-db'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('swaplive_token')?.value
    || req.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const payload = verifyToken(token)
  if (!payload) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
  }

  const user = mockDb.users.findById(payload.userId)
  if (!user) {
    return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })
  }

  return NextResponse.json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    role: user.role,
    subscription: user.subscription,
  })
}
