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

## Cleanup

Test branches and PRs can be identified by the `[E2E-TEST]` prefix and cleaned up periodically.
