# Security

## Baseline Controls

- Helmet security headers in the API.
- Next.js response headers for clickjacking, content sniffing and permissions policy.
- Strict CORS with credentials enabled for the configured frontend origin.
- ValidationPipe with whitelist and forbidden unknown fields.
- Rate limiting through Nest throttler.
- Secrets are read from environment variables and never committed.

## Next Security Sprint

- JWT access and refresh token rotation.
- HTTP-only, secure, same-site cookies.
- CSRF token strategy for state-changing dashboard operations.
- CSP with nonce support in Next.js.
- RBAC guards and audit logs for admin CMS.
