# E2E Test Repository

This is a simple test repository for Seedbed + Farmer E2E testing.

**DO NOT USE FOR PRODUCTION**

## Purpose

- Provides a simple codebase for automated testing
- Farmer will create PRs against this repo during E2E tests
- All changes should be prefixed with `[E2E-TEST]`

## Structure

```
src/
  index.ts       - Main entry point
  utils.ts       - Utility functions (test targets)
  config.ts      - Configuration (test targets)
```

## Configuration

`src/config.ts` exports a `config` object used by the sample entrypoint.

- `defaultName`: default name used by `greet`
- `environment`: current runtime environment label
- `version`: current app version string
- `timeout_2134`: timeout value (milliseconds) for E2E test flows
- `features.logging`: enable logging
- `features.debug`: enable debug mode

## Utilities

`truncate_2134` truncates a string to a maximum length.

```ts
import { truncate_2134 } from './utils'

const result = truncate_2134('Hello, E2E!', 5)
// result === 'Hello'
```

## Cleanup

Test branches and PRs can be identified by the `[E2E-TEST]` prefix and cleaned up periodically.
