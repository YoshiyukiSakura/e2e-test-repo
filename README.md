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

The project includes the following configuration options:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `defaultName` | string | 'World' | Default name for greetings |
| `environment` | string | 'development' | Current environment |
| `version` | string | '1.0.0' | Project version |
| `timeout_2134` | number | 5000 | Request timeout in milliseconds |
| `features.logging` | boolean | true | Enable logging feature |
| `features.debug` | boolean | false | Enable debug mode |

## Utility Functions

### truncate_2134

Truncates a string to a specified maximum length.

```typescript
import { truncate_2134 } from './utils'

// Basic usage
truncate_2134('Hello, World!', 5)  // Returns: 'Hello'

// Empty string
truncate_2134('', 5)  // Returns: ''

// MaxLen is 0
truncate_2134('Hello', 0)  // Returns: ''

// Negative maxLen
truncate_2134('Hello', -1)  // Returns: ''

// Text shorter than maxLen
truncate_2134('Hi', 10)  // Returns: 'Hi'
```

## Cleanup

Test branches and PRs can be identified by the `[E2E-TEST]` prefix and cleaned up periodically.
