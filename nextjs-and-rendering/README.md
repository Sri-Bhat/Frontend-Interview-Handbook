# Next.js and Rendering

Production-oriented Next.js (App Router) and rendering-strategy interview preparation for Senior Frontend, Staff/Lead and Frontend Architect roles. Verified against the official Next.js documentation (Next.js 16.x; docs updated through Nov 2026). Each file covers **one topic end-to-end**: concept, internals, code, real-world patterns, pitfalls, trade-offs, fundamentals Q&A and senior scenario Q&A with reasoning. File 09 is the **last-minute recall map**.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [Rendering strategies and hydration](01-rendering-strategies-and-hydration.md) | CSR/SSR/SSG/ISR, streaming, selective hydration, RSC, PPR, static vs dynamic rules, hydration mismatches, CWV per strategy, bots |
| 02 | [App Router fundamentals](02-app-router-fundamentals.md) | File conventions, layouts vs templates, dynamic/parallel/intercepting routes, composition rules, Link/router, async params, metadata, Pages vs App |
| 03 | [Caching and revalidation](03-caching-and-revalidation.md) | Cache Components (`use cache`, `cacheLife`, `cacheTag`, `updateTag`, `revalidateTag`), variants (remote/private), previous model, multi-instance |
| 04 | [Data fetching and mutations](04-data-fetching-and-mutations.md) | Server Component fetching, waterfalls, DAL/DTO, Server Actions, forms, optimistic UI, Route Handlers, `after()`, uploads |
| 05 | [Streaming, PPR and instant navigation](05-streaming-ppr-and-instant-navigation.md) | Suspense design, static shell/App Shell, push-down pattern, instant-navigation validation, Partial Prefetching, bots, infra |
| 06 | [Proxy, auth and security](06-proxy-auth-and-security.md) | `proxy.ts`, session design, authorization placement, Server Action/Route Handler security, CSP/XSS, env, image SSRF, patching |
| 07 | [Performance optimization](07-performance-optimization.md) | LCP/INP/CLS levers, `next/image` (v16), `next/font`, `next/script`, bundles, Turbopack, measurement and budgets |
| 08 | [Deployment, runtimes and operations](08-deployment-runtimes-and-operations.md) | Node/Docker/static/adapters, multi-instance caching, skew protection, CI/CD, observability, testing, 15 → 16 upgrade |
| 09 | [Recall map](09-nextjs-recall-map.md) | One-page mental model, diagrams, API table, 15 → 16 changes, defaults, mnemonics, rapid-fire, scripts |

## Suggested Order

1. **[01 Rendering](01-rendering-strategies-and-hydration.md)** → **[02 App Router](02-app-router-fundamentals.md)** (vocabulary).
2. **[03 Caching](03-caching-and-revalidation.md)** → **[05 Streaming/PPR](05-streaming-ppr-and-instant-navigation.md)** (the core of modern Next.js).
3. **[04 Data and mutations](04-data-fetching-and-mutations.md)** → **[06 Security](06-proxy-auth-and-security.md)**.
4. **[07 Performance](07-performance-optimization.md)** → **[08 Deployment/ops](08-deployment-runtimes-and-operations.md)**.
5. **[09 Recall map](09-nextjs-recall-map.md)** the day before and the hour before.

## Related Material

- React internals: [react/](../react/README.md) (especially [Server Components](../react/05-server-components-and-server-functions.md) and [concurrent React](../react/03-concurrent-react-suspense-and-transitions.md))
- TypeScript for React/APIs: [typescript/](../typescript/README.md)
- Architecture interviews: [system-design/](../system-design/README.md)
- Mobile counterpart: [react-native/](../react-native/README.md)

## Version Notes

- Verified directly against nextjs.org docs/blog on 2026-11-10: Cache Components (`use cache`, `cacheLife` profiles, `cacheTag`, `updateTag`, `revalidateTag(tag, 'max')`, `refresh`, remote/private variants), previous caching model, Instant Navigation guide (16.3), Partial Prefetching, Link and Image references (16.x), Server Actions/Data Security guidance, `proxy.js`, Route Handlers, Self-hosting guide, Next.js 16 upgrade guide, release/security blog index (latest minor seen: **16.4**, Oct 2026).
- *General knowledge, not re-verified here:* `next/font` and `next/script` option names, `@next/third-parties`, `output: 'standalone'`/Docker details, OpenTelemetry/`instrumentation` specifics, Server Component testing tool limitations, multi-zones/micro-frontends, framework comparison, CSP-nonce/dynamic-rendering interaction. Re-check these in the docs before relying on exact flags.
- Next.js evolves quickly (monthly security releases, frequent minors): confirm current behaviour for your project's installed version.
