# Web Security

Production-oriented web security interview preparation for Senior Frontend, Staff/Lead and Frontend Architect roles: threat modelling, XSS and Trusted Types, Content Security Policy, cookies/sessions/CSRF, OAuth and BFF architecture, headers/CORS/transport, supply-chain risk, and a catalogue of recurring frontend vulnerabilities. Each file covers **one topic end-to-end**: concept, mechanics, code, pitfalls, trade-offs, fundamentals Q&A and senior scenario Q&A. File 09 is the **last-minute recall map**.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [Threat model and OWASP Top 10 (2025)](01-frontend-threat-model-and-owasp-top-10.md) | Trust boundaries, attackers and assets, lightweight threat modelling, OWASP 2025 mapped to frontend work, secure SDLC |
| 02 | [XSS, Trusted Types and sanitisation](02-xss-trusted-types-and-sanitization.md) | XSS types, sources/sinks, React/Vue/Angular escape hatches, DOMPurify and the Sanitizer API, Trusted Types, SSR state injection |
| 03 | [Content Security Policy in depth](03-content-security-policy-in-depth.md) | Directives, strict CSP (nonce/hash/`strict-dynamic`), allow-list failures, rollout, reporting, Next.js/SPA deployment |
| 04 | [Cookies, sessions and CSRF](04-cookies-sessions-and-csrf.md) | Cookie attributes and prefixes, session lifecycle, CSRF defences, SameSite limits, third-party cookies |
| 05 | [Authentication and authorisation in the frontend](05-authentication-and-authorization-in-the-frontend.md) | RFC 10017 architectures (BFF), Auth Code + PKCE, tokens and storage, refresh/logout, RBAC/ABAC, IDOR, Next.js DAL, passkeys |
| 06 | [Security headers, CORS and transport](06-security-headers-cors-and-transport.md) | Baseline headers, CORS configuration and mistakes, HSTS/mixed content, Referrer/Permissions policies, COOP/COEP/CORP, caching |
| 07 | [Supply chain and third-party script security](07-supply-chain-and-third-party-script-security.md) | npm/CI/registry risks, dependency hygiene, GitHub Actions hardening, third-party scripts, SRI, SBOM/provenance, incident runbooks |
| 08 | [Secure patterns and vulnerability catalogue](08-secure-frontend-patterns-and-vulnerability-catalogue.md) | Open redirects, clickjacking, tabnabbing, `postMessage`, prototype pollution, DOM clobbering, SSRF, uploads, secrets, fail-closed errors, WebSockets, review checklist |
| 09 | [Recall map](09-web-security-recall-map.md) | One-page mental model, diagrams, decision tables, mnemonics, rapid-fire, scripts, checklist |

## Suggested Order

1. **[01 Threat model](01-frontend-threat-model-and-owasp-top-10.md)** — vocabulary and framing for every answer.
2. **[02 XSS](02-xss-trusted-types-and-sanitization.md)** → **[03 CSP](03-content-security-policy-in-depth.md)** (injection and its backstop).
3. **[04 Cookies and CSRF](04-cookies-sessions-and-csrf.md)** → **[05 Auth](05-authentication-and-authorization-in-the-frontend.md)** (credentials and architecture).
4. **[06 Headers and CORS](06-security-headers-cors-and-transport.md)** → **[07 Supply chain](07-supply-chain-and-third-party-script-security.md)**.
5. **[08 Secure patterns](08-secure-frontend-patterns-and-vulnerability-catalogue.md)** — the long tail interviewers probe.
6. **[09 Recall map](09-web-security-recall-map.md)** the day before and the hour before.

## Related Material

- Browser-level mechanics (same-origin policy, CORS basics, cookie scoping, process isolation, storage): [browser-internals/](../browser-internals/README.md), especially [06 Browser security model](../browser-internals/06-browser-security-model.md)
- Framework-level security (Server Actions, DAL, proxy, CSP/headers in Next.js): [nextjs-and-rendering/](../nextjs-and-rendering/README.md), especially [06 Proxy, auth and security](../nextjs-and-rendering/06-proxy-auth-and-security.md)
- React Server Components and Server Functions as public endpoints: [react/05](../react/05-server-components-and-server-functions.md)
- Third-party script performance and governance: [web-performance/06](../web-performance/06-images-fonts-media-and-third-parties.md)
- Applying these in design interviews (chat, collaborative editor, dashboards): [system-design/](../system-design/README.md)
- Mobile counterpart: [react-native/](../react-native/README.md)

## Version Notes

- Verified in Nov 2026: **OWASP Top 10:2025** category list (top10.owasp.org/2025); **MDN CSP guide** (Mar 2026), **MDN Using HTTP cookies** (Sep 2026) and **MDN HTML Sanitizer API** (Nov 2026: Chrome/Edge 146, Firefox 148, no Safari); **IETF RFC 10017 / BCP 212** (Aug 2026) "OAuth 2.0 for Browser-Based Applications", built on RFC 9700.
- Verified earlier in this handbook: same-origin policy and storage behaviour (MDN), Next.js Server Function/DAL/proxy security guidance, bfcache considerations.
- *General knowledge, marked "(hedged)" in the files:* framework escape-hatch details (React/Vue/Angular), mutation-XSS specifics, Trusted Types support matrix, CORS preflight caps, HSTS preload requirements, `Referrer-Policy`/`Permissions-Policy` details, COOP/COEP interactions, CHIPS/Storage Access/FedCM status, WebAuthn browser details, npm/pnpm/GitHub Actions hardening options and setting names, SBOM/provenance tooling, example attack incidents.
- Security guidance changes quickly: re-check OWASP, MDN, IETF and vendor docs before relying on exact versions, option names or support tables.
