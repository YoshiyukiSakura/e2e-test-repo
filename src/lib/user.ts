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
  password: string
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
  lastLogoutAt?: Date
}

/**
 * Input for creating a new user
 */
export interface CreateUserInput {
  name: string
  email: string
  password: string
}

/**
 * Input for logging in
 */
export interface LoginInput {
  email: string
  password: string
}

/**
 * Result of successful login
 */
export interface LoginResult {
  user: User
  token: string
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
      password: input.password,
      createdAt: now,
      updatedAt: now,
    }
    this.users.set(id, user)
    return user
  }

  /**
   * Login a user with email and password
   */
  login(input: LoginInput): LoginResult | undefined {
    const user = Array.from(this.users.values()).find(
      (u) => u.email === input.email && u.password === input.password
    )
    if (!user) {
      return undefined
    }
    user.lastLoginAt = new Date()
    user.updatedAt = new Date()
    const token = crypto.randomUUID()
    return { user, token }
  }

  /**
   * Logout a user by ID
   */
  async logout(userId: string): Promise<void> {
    const user = this.users.get(userId)
    if (!user) {
      return
    }
    user.lastLogoutAt = new Date()
    user.updatedAt = new Date()
  }

  /**
   * Get a user by ID
   */
  getUser(id: string): User | undefined {
    return this.users.get(id)
  }

  /**
   * Get a user by email
   */
  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find((u) => u.email === email)
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