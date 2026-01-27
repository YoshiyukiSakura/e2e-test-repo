import { describe, it, expect } from 'vitest'
import { UserService, User } from '../src/lib/user'

describe('UserService', () => {
  describe('createUser', () => {
    it('should create a new user with correct properties', () => {
      const service = new UserService()
      const user = service.createUser({
        name: 'John Doe',
        email: 'john@example.com',
      })

      expect(user).toBeDefined()
      expect(user.id).toBeDefined()
      expect(user.name).toBe('John Doe')
      expect(user.email).toBe('john@example.com')
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
})