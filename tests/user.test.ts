import { describe, it, expect } from 'vitest'
import { UserService } from '../src/lib/user'

describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with lastLoginAt undefined initially', async () => {
      const service = new UserService()
      const user = await service.createUser({
        name: 'Test User',
        email: 'test@example.com',
      })

      expect(user.name).toBe('Test User')
      expect(user.email).toBe('test@example.com')
      expect(user.lastLoginAt).toBeUndefined()
    })

    it('should create a user with password hash', async () => {
      const service = new UserService()
      const user = await service.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })

      expect(user.passwordHash).toBeDefined()
      expect(user.passwordHash).not.toBe('password123')
    })
  })

  describe('login', () => {
    it('should return null for non-existent user', async () => {
      const service = new UserService()
      const result = await service.login({
        email: 'notexists@example.com',
        password: 'password123',
      })

      expect(result).toBeNull()
    })

    it('should return null for wrong password', async () => {
      const service = new UserService()
      await service.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'correctpassword',
      })

      const result = await service.login({
        email: 'test@example.com',
        password: 'wrongpassword',
      })

      expect(result).toBeNull()
    })

    it('should return user and token for correct credentials', async () => {
      const service = new UserService()
      await service.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })

      const result = await service.login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result).not.toBeNull()
      expect(result!.user.name).toBe('Test User')
      expect(result!.user.email).toBe('test@example.com')
      expect(result!.token).toBeDefined()
    })

    it('should update lastLoginAt on successful login', async () => {
      const service = new UserService()
      await service.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })

      // Initial login
      const beforeLogin = new Date()
      const result1 = await service.login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result1!.user.lastLoginAt).toBeDefined()
      expect(result1!.user.lastLoginAt!.getTime()).toBeGreaterThanOrEqual(beforeLogin.getTime())

      // Second login - should update lastLoginAt
      const beforeSecondLogin = new Date()
      const result2 = await service.login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result2!.user.lastLoginAt!.getTime()).toBeGreaterThanOrEqual(beforeSecondLogin.getTime())
    })

    it('should return different tokens for each login', async () => {
      const service = new UserService()
      await service.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })

      const result1 = await service.login({
        email: 'test@example.com',
        password: 'password123',
      })

      const result2 = await service.login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result1!.token).not.toBe(result2!.token)
    })
  })
})