import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { mockDb } from '@/lib/mock-db'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('swaplive_token')?.value
  if (!token) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'Token invalide' }, { status: 401 })

  const user = mockDb.users.findById(payload.userId)
  if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

  return NextResponse.json({
    balance: user.subscription?.pointsBalance ?? 0,
    planSlug: user.subscription?.planSlug ?? 'free',
  })
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('swaplive_token')?.value
  if (!token) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'Token invalide' }, { status: 401 })

  const { consumed } = await req.json()
  const user = mockDb.users.findById(payload.userId)
  if (!user || !user.subscription) return NextResponse.json({ error: 'Pas d\'abonnement actif' }, { status: 400 })

  user.subscription.pointsBalance = Math.max(0, user.subscription.pointsBalance - consumed)

  return NextResponse.json({ balance: user.subscription.pointsBalance })
}
