# Networking & APIs

Production-oriented networking and API interview preparation for Senior Frontend, Staff/Lead and Frontend Architect roles: HTTP semantics and protocol versions, the Fetch API, REST design and consumption, API styles (GraphQL, tRPC, gRPC, Server Actions), real-time transports, resilience (timeouts, retries, offline), API client architecture and contracts, and network debugging. Each file covers **one topic end-to-end**: concept, mechanics, code, pitfalls, trade-offs, fundamentals Q&A and senior scenario Q&A. File 09 is the **last-minute recall map**.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [HTTP semantics and protocol versions](01-http-semantics-and-protocol-versions.md) | Methods (safe/idempotent/cacheable, `QUERY`), status codes, headers, negotiation/`Vary`, conditional requests, redirects, HTTP/1.1 vs 2 vs 3 (QUIC) |
| 02 | [Fetch API and browser networking](02-fetch-api-and-browser-networking.md) | Request/Response, error semantics, `AbortController`, streaming, uploads/progress, beacons/`keepalive`, cache option, XHR vs wrappers, fetch on the server/Next.js, Resource Timing |
| 03 | [REST API design and consumption](03-rest-api-design-and-consumption.md) | Resource modelling, idempotency keys, RFC 9457 problem details, versioning, cursor pagination, rate limiting, uploads and long-running operations, bulk/partial responses, OpenAPI |
| 04 | [GraphQL, tRPC, gRPC and API styles](04-graphql-trpc-grpc-and-api-styles.md) | GraphQL schema/cache/security, tRPC, gRPC/gRPC-Web/Connect, Server Actions, BFF/gateways, how to choose |
| 05 | [Real-time: polling, SSE, WebSockets, WebTransport, WebRTC](05-real-time-communication-websockets-sse-webtransport.md) | Transport selection, SSE mechanics, WebSocket lifecycle, WebTransport (Baseline 2026), resync/dedupe, scaling, security, multi-tab |
| 06 | [Resilience, retries, timeouts and offline](06-resilience-retries-timeouts-and-offline.md) | Failure taxonomy, timeouts/deadlines, backoff + jitter, circuit breakers, stale data, offline-first outbox, optimistic mutations, fault testing |
| 07 | [API client architecture and contracts](07-api-client-architecture-and-contracts.md) | Layered client, runtime validation (zod), error normalisation, auth refresh, OpenAPI codegen, MSW, contract tests, tracing/observability |
| 08 | [Network debugging and troubleshooting](08-network-debugging-and-troubleshooting.md) | DevTools Network panel, timing/waterfalls, curl recipes, proxies/captures, symptom catalogue, CORS/cookie/cache/real-time debugging, playbooks |
| 09 | [Recall map](09-networking-and-apis-recall-map.md) | One-page mental model, diagrams, decision tables, numbers, mnemonics, rapid-fire, scripts, checklist |

## Suggested Order

1. **[01 HTTP semantics](01-http-semantics-and-protocol-versions.md)** → **[02 Fetch API](02-fetch-api-and-browser-networking.md)** (the foundation).
2. **[03 REST design](03-rest-api-design-and-consumption.md)** → **[04 API styles](04-graphql-trpc-grpc-and-api-styles.md)** (contracts and choices).
3. **[06 Resilience](06-resilience-retries-timeouts-and-offline.md)** → **[07 API client architecture](07-api-client-architecture-and-contracts.md)** (production-grade clients).
4. **[05 Real-time](05-real-time-communication-websockets-sse-webtransport.md)** (when push/streaming is needed).
5. **[08 Debugging](08-network-debugging-and-troubleshooting.md)** (what interviewers probe in scenarios).
6. **[09 Recall map](09-networking-and-apis-recall-map.md)** the day before and the hour before.

## Related Material

- CORS, cookie, auth-loop and cache-staleness scenarios: [debugging-scenarios/06](../debugging-scenarios/06-network-api-auth-and-caching-scenarios.md)
- Delivery/performance side of the network (compression, CDN, caching strategy, bfcache, speculative loading): [web-performance/03](../web-performance/03-network-caching-and-delivery.md)
- Navigation-time networking (DNS, TLS, redirects, lifecycle): [browser-internals/02](../browser-internals/02-navigation-and-page-lifecycle.md); storage and caching APIs: [browser-internals/05](../browser-internals/05-browser-storage-and-caching-apis.md)
- Security of APIs and clients (CORS, CSRF, auth/BFF, headers, SSRF, WebSocket hijacking): [web-security/](../web-security/README.md)
- Query/state libraries on top of the network layer: [react/06](../react/06-state-management-and-data-fetching.md); Server Components, Server Actions, route handlers: [nextjs-and-rendering/04](../nextjs-and-rendering/04-data-fetching-and-mutations.md)
- Applying these in design interviews (chat protocols, feeds, dashboards, collaborative editing): [system-design/](../system-design/README.md)
- Mobile counterpart: [react-native/](../react-native/README.md)

## Version Notes

- Verified in Nov 2026: **MDN HTTP request methods** (Sep 2026: safe/idempotent/cacheable table including `QUERY`; `POST`/`PATCH` conditionally cacheable) and **MDN WebTransport API** (Nov 2026: Baseline 2026 newly available — Chrome/Edge 97, Firefox 114, Safari 26.4; HTTP/3 and QUIC properties; per-engine option support such as `protocols` and `headers`).
- Verified earlier in this handbook: HTTP caching and delivery behaviour (web.dev/MDN), SSE connection limits, bfcache interactions with open connections, Next.js `fetch`/caching/streaming/self-hosting notes, IETF RFC 10017 browser-OAuth guidance used for auth-client design.
- *General knowledge, marked "(hedged)" in the files:* status-code and header edge cases, RFC 9457 and idempotency/rate-limit header draft status, `AbortSignal.any/timeout` and `fetchLater` support, upload streaming (`duplex`), GraphQL/Apollo/Relay/tRPC/gRPC library behaviours and names, WebSocket protocol details and `WebSocketStream`, WebRTC internals, Web/Background Sync support, backoff formulas and SRE patterns, OpenAPI/zod/MSW/Pact tooling names, DevTools UI labels, curl flags and proxy tooling.
- Network tooling and library versions change quickly: re-check MDN compatibility tables and official docs before relying on exact versions, option names or support claims.
