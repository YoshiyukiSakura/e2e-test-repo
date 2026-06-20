/**
 * E2E Test Repository - Main Entry Point
 *
 * This file is a target for automated E2E testing.
 * Claude will make simple modifications here during test runs.
 */

import { greet, formatDate, truncate_2134 } from './utils'
import { config } from './config'

function main() {
  console.log(greet(config.defaultName))
  console.log(`Current time: ${formatDate(new Date())}`)
  console.log(`Environment: ${config.environment}`)
  const sample = truncate_2134('Hello, E2E!', 5)
  if (sample !== 'Hello') {
    throw new Error(`truncate_2134 returned unexpected result: ${sample}`)
  }
  console.log(`truncate_2134 sample: ${sample}`)
  console.log(`timeout_2134: ${config.timeout_2134}`)
}

main()
