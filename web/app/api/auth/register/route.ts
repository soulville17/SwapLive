import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, signToken } from '@/lib/auth'
import { mockDb } from '@/lib/mock-db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, firstName, lastName } = body

    if (!email || !password || !firstName) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Mot de passe trop court (min 8 caractères)' }, { status: 400 })
    }

    const existing = mockDb.users.findByEmail(email)
    if (existing) {
      return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)
    const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + Date.now().toString(36)

    const user = mockDb.users.create({
      email,
      passwordHash,
      firstName,
      lastName: lastName || '',
      username,
      role: 'USER',
      subscription: {
        planSlug: 'free',
        pointsBalance: 200,
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      },
    })

    const token = await signToken({ userId: user.id, email: user.email, role: user.role })

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role: user.role,
        subscription: user.subscription,
      },
      token,
    }, { status: 201 })

    response.cookies.set('swaplive_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
