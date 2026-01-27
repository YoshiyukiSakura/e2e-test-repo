import { describe, it, expect } from 'vitest'
import { UserService, User } from '../src/lib/user'

describe('UserService', () => {
  describe('createUser', () => {
    it('should create a new user with correct properties', () => {
      const service = new UserService()
      const user = service.createUser({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      })

      expect(user).toBeDefined()
      expect(user.id).toBeDefined()
      expect(user.name).toBe('John Doe')
      expect(user.email).toBe('john@example.com')
      expect(user.password).toBe('password123')
      expect(user.createdAt).toBeInstanceOf(Date)
      expect(user.updatedAt).toBeInstanceOf(Date)
    })
  })

  describe('getUser', () => {
    it('should return user when id exists', () => {
      const service = new UserService()
      const created = service.createUser({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      })

      const user = service.getUser(created.id)

      expect(user).toBeDefined()
      expect(user?.id).toBe(created.id)
      expect(user?.name).toBe('Jane Doe')
    })

    it('should return undefined when user does not exist', () => {
      const service = new UserService()

      const user = service.getUser('non-existent-id')

      expect(user).toBeUndefined()
    })
  })

  describe('updateUser', () => {
    it('should update user name', () => {
      const service = new UserService()
      const created = service.createUser({
        name: 'Original Name',
        email: 'original@example.com',
        password: 'password123',
      })

      const updated = service.updateUser(created.id, {
        name: 'Updated Name',
      })

      expect(updated).toBeDefined()
      expect(updated?.name).toBe('Updated Name')
      expect(updated?.email).toBe('original@example.com')
    })

    it('should update user email', () => {
      const service = new UserService()
      const created = service.createUser({
        name: 'Test User',
        email: 'old@example.com',
        password: 'password123',
      })

      const updated = service.updateUser(created.id, {
        email: 'new@example.com',
      })

      expect(updated).toBeDefined()
      expect(updated?.name).toBe('Test User')
      expect(updated?.email).toBe('new@example.com')
    })

    it('should return undefined when user does not exist', () => {
      const service = new UserService()

      const updated = service.updateUser('non-existent-id', {
        name: 'New Name',
      })

      expect(updated).toBeUndefined()
    })
  })

  describe('login', () => {
    it('should return user and token with correct credentials', () => {
      const service = new UserService()
      service.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'correct-password',
      })

      const result = service.login({
        email: 'test@example.com',
        password: 'correct-password',
      })

      expect(result).toBeDefined()
      expect(result?.user.name).toBe('Test User')
      expect(result?.user.email).toBe('test@example.com')
      expect(result?.token).toBeDefined()
      expect(result?.user.lastLoginAt).toBeInstanceOf(Date)
    })

    it('should update lastLoginAt on successful login', () => {
      const service = new UserService()
      service.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })

      service.login({
        email: 'test@example.com',
        password: 'password123',
      })

      const user = service.getUserByEmail('test@example.com')
      expect(user?.lastLoginAt).toBeDefined()
    })

    it('should return undefined with wrong password', () => {
      const service = new UserService()
      service.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'correct-password',
      })

      const result = service.login({
        email: 'test@example.com',
        password: 'wrong-password',
      })

      expect(result).toBeUndefined()
    })

    it('should return undefined with non-existent email', () => {
      const service = new UserService()

      const result = service.login({
        email: 'nonexistent@example.com',
        password: 'password123',
      })

      expect(result).toBeUndefined()
    })
  })
})