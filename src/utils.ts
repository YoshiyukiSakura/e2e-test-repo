/**
 * Utility functions for E2E testing
 *
 * These functions are targets for automated modifications.
 */

export function greet(name: string): string {
  return `Hello, ${name}!`
}

export function formatDate(date: Date): string {
  return date.toISOString()
}

export function add(a: number, b: number): number {
  return a + b
}

export function multiply(a: number, b: number): number {
  return a * b
}

export function truncate_1358(text: string, maxLen: number): string {
  return text.slice(0, maxLen)
}

export function truncate_1355(text: string, maxLen: number): string {
  return text.slice(0, maxLen)
}
