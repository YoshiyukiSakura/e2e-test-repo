/**
 * User types and service for E2E testing
 */

export interface User {
  id: string
  name: string
  email: string
  passwordHash?: string
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

export interface CreateUserInput {
  name: string
  email: string
  password?: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface UpdateUserInput {
  name?: string
  email?: string
}

export class UserService {
  private users: Map<string, User> = new Map()

  async createUser(input: CreateUserInput): Promise<User> {
    const id = crypto.randomUUID()
    const now = new Date()
    const user: User = {
      id,
      name: input.name,
      email: input.email,
      passwordHash: input.password ? await this.hashPassword(input.password) : undefined,
      createdAt: now,
      updatedAt: now,
    }
    this.users.set(id, user)
    return user
  }

  async getUser(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
    const user = this.users.get(id)
    if (!user) {
      return null
    }
    const updatedUser: User = {
      ...user,
      name: input.name ?? user.name,
      email: input.email ?? user.email,
      updatedAt: new Date(),
    }
    this.users.set(id, updatedUser)
    return updatedUser
  }

  async login(input: LoginInput): Promise<{ user: User; token: string } | null> {
    const user = Array.from(this.users.values()).find((u) => u.email === input.email)
    if (!user || !user.passwordHash) {
      return null
    }

    const isValid = await this.verifyPassword(input.password, user.passwordHash)
    if (!isValid) {
      return null
    }

    // Update lastLoginAt
    const now = new Date()
    const updatedUser: User = {
      ...user,
      lastLoginAt: now,
      updatedAt: now,
    }
    this.users.set(user.id, updatedUser)

    const token = await this.generateToken(user.id)
    return { user: updatedUser, token }
  }

  private async hashPassword(password: string): Promise<string> {
    // Simple hash for E2E testing - use a real library in production
    const encoder = new TextEncoder()
    const data = encoder.encode(password + 'salt')
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  }

  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await this.hashPassword(password)
    return passwordHash === hash
  }

  private async generateToken(userId: string): Promise<string> {
    const payload = JSON.stringify({ userId, timestamp: Date.now(), nonce: crypto.randomUUID() })
    const encoder = new TextEncoder()
    const data = encoder.encode(payload)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  }
}