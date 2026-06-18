// In-memory mock database for development (replace with Prisma + PostgreSQL in production)

export interface MockUser {
  id: string
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  username: string
  role: 'USER' | 'ADMIN'
  createdAt: string
  subscription: {
    planSlug: string
    pointsBalance: number
    status: string
    currentPeriodEnd: string
  } | null
}

// Persists in memory during dev server lifetime
const users: Map<string, MockUser> = new Map()

export const mockDb = {
  users: {
    findByEmail: (email: string) => {
      for (const user of users.values()) {
        if (user.email === email) return user
      }
      return null
    },
    findById: (id: string) => users.get(id) || null,
    create: (data: Omit<MockUser, 'id' | 'createdAt'>) => {
      const id = `user_${Date.now()}_${Math.random().toString(36).slice(2)}`
      const user: MockUser = { ...data, id, createdAt: new Date().toISOString() }
      users.set(id, user)
      return user
    },
    count: () => users.size,
  }
}
