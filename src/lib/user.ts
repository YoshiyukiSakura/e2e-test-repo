/**
 * User types and service for E2E testing
 */

export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserInput {
  name: string
  email: string
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
}