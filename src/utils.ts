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

export function slugify_1715(text: string): string {
  return text.replace(/ /g, '-').toLowerCase()
}
