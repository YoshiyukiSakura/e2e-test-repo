/**
 * User types and service for E2E testing
 *
 * These types and service are targets for automated modifications.
 */

/**
 * Represents a user in the system
 */
export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Input for creating a new user
 */
export interface CreateUserInput {
  name: string
  email: string
}

/**
 * Input for updating an existing user
 */
export interface UpdateUserInput {
  name?: string
  email?: string
}

/**
 * Service for managing users
 */
export class UserService {
  private users: Map<string, User> = new Map()

  /**
   * Create a new user
   */
  createUser(input: CreateUserInput): User {
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

  /**
   * Get a user by ID
   */
  getUser(id: string): User | undefined {
    return this.users.get(id)
  }

  /**
   * Update an existing user
   */
  updateUser(id: string, input: UpdateUserInput): User | undefined {
    const user = this.users.get(id)
    if (!user) {
      return undefined
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