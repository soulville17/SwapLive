import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'swaplive_dev_secret_change_in_prod'
)

export interface JWTPayload {
  userId: string
  email: string
  role: 'USER' | 'ADMIN'
}

export async function verifyTokenEdge(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}
