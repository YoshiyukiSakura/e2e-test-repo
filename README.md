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

The `config.ts` file contains the following configuration options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultName` | string | `'World'` | Default name used in greetings |
| `environment` | string | `'development'` | Current environment |
| `version` | string | `'1.0.0'` | Application version |
| `timeout_2134` | number | `5000` | Timeout value in milliseconds |
| `features.logging` | boolean | `true` | Enable logging |
| `features.debug` | boolean | `false` | Enable debug mode |

## Utility Functions

### `truncate_2134(text: string, maxLen: number): string`

Truncates a string to the specified maximum length.

**Parameters:**
- `text` - The input string to truncate
- `maxLen` - Maximum length of the output string

**Returns:** The truncated string, or the original string if it's shorter than `maxLen`

**Example:**
```typescript
import { truncate_2134 } from './utils'

truncate_2134('Hello, World!', 5)  // Returns: 'Hello'
truncate_2134('Hi', 10)            // Returns: 'Hi'
truncate_2134('Test', -1)          // Returns: ''
```

## Cleanup

Test branches and PRs can be identified by the `[E2E-TEST]` prefix and cleaned up periodically.
