# Testing

## Strategy

- Unit tests for pure use cases and domain behavior.
- Supertest integration tests for API modules.
- Vitest for shared utilities and application logic.
- Playwright for critical user journeys and accessibility checks.

## Quality Bar

Every new feature should ship with tests matching its risk: a small pure function needs a focused unit test; auth, CMS writes and analytics require integration and end-to-end coverage.
