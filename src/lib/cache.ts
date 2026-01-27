/**
 * Cache Service for E2E testing
 *
 * This service provides caching functionality.
 */

export class CacheService {
  private cache: Map<string, unknown>

  constructor() {
    this.cache = new Map()
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key) as T | undefined
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, value)
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }
}

export const cacheService = new CacheService()