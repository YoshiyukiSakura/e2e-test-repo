/**
 * E2E Test Repository - Main Entry Point
 *
 * This file is a target for automated E2E testing.
 * Claude will make simple modifications here during test runs.
 */

import { greet, formatDate } from './utils'
import { config } from './config'

function main() {
  console.log(greet(config.defaultName))
  console.log(`Current time: ${formatDate(new Date())}`)
  console.log(`Environment: ${config.environment}`)
}

main()
