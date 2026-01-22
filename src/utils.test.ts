import { truncate_2134 } from './utils'
import { config } from './config'

describe('truncate_2134', () => {
  it('should return original text when length is within limit', () => {
    expect(truncate_2134('Hi', 10)).toBe('Hi')
  })

  it('should truncate text when exceeding maxLength', () => {
    expect(truncate_2134('Hello World', 5)).toBe('Hello...')
  })

  it('should handle empty string', () => {
    expect(truncate_2134('', 5)).toBe('')
  })
})

describe('config', () => {
  it('should have timeout_2134 defined', () => {
    expect(config.timeout_2134).toBeDefined()
    expect(typeof config.timeout_2134).toBe('number')
  })

  it('should have timeout_2134 equal to 30000', () => {
    expect(config.timeout_2134).toBe(30000)
  })
})