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
  console.log(`Timeout: ${config.timeout_2134}`)
  console.log(`Truncated: ${truncate_2134('Hello World', 5)}`)
}

main()
