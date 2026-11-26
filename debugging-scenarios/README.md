# Debugging Scenarios

Production-oriented interview preparation for Senior Frontend, Tech Lead and Frontend Architect roles: how to debug methodically and how to narrate that process in an interview. Covers the hypothesis-driven method, the DevTools/Node/editor/Playwright toolkit, catalogues of JavaScript/async/data bugs, React and Next.js scenarios (hydration, caching, async request APIs, Server Actions), browser/storage/environment bugs, network/auth/caching decision trees, production incidents and root-cause analysis, and build/TypeScript/dependency/CI debugging. Scenario sections follow *symptom → hypotheses → investigation → root cause → fix → prevention*. Each document follows the repository template: verification note, TOC, TL;DR with diagram, concepts and scenarios, pitfalls, fundamentals Q&A, senior scenario Q&A, cheat sheet, glossary and further reading.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [Methodology and Interview Approach](01-debugging-methodology-and-interview-approach.md) | Debugging loop, repro and environment parity, bisecting, hypotheses, reading errors, instrumentation, flaky bugs, triage, bug reports, answer template |
| 02 | [Toolkit: DevTools, Node and Editors](02-debugging-toolkit-devtools-node-and-editors.md) | Panels, breakpoints/logpoints/overrides, console utilities, memory and performance workflows, framework devtools, Node inspector, VS Code and Playwright, remote/mobile, source maps, proxies |
| 03 | [JavaScript, Async and Data Bugs](03-javascript-async-and-data-bugs.md) | `this`, closures, promises and races, coercion, floats, dates/time zones, mutation, modules, events/timers/leaks, regex/JSON, defensive patterns |
| 04 | [React and Next.js Debugging Scenarios](04-react-and-nextjs-debugging-scenarios.md) | Render loops, stale state, keys, effects and cleanup, hydration, dev vs prod, RSC boundaries, caching/revalidation, async request APIs, Server Actions and digests, proxy/auth |
| 05 | [Browser Compatibility, Storage and Environment Bugs](05-browser-compatibility-storage-and-environment-bugs.md) | Safari/iOS, engine differences, third-party cookies and partitioning, WebViews, forms/IME/autofill, service workers and bfcache, locale, extensions, enterprise networks |
| 06 | [Network, API, Auth and Caching Scenarios](06-network-api-auth-and-caching-scenarios.md) | CORS, cookies, 401 loops and refresh races, layer-by-layer staleness, status/timeouts/retries, payload contracts, real-time and GraphQL scenarios |
| 07 | [Production Incidents, Observability and RCA](07-production-incidents-observability-and-root-cause-analysis.md) | Incident lifecycle, telemetry, blank pages and chunk errors, "only some users", rollbacks and flags, third parties, security incidents, blameless postmortems, runbooks |
| 08 | [Build Tooling, TypeScript, Dependency and CI Debugging](08-build-tooling-typescript-dependency-and-ci-debugging.md) | Install/lockfile/peer errors, Node and ESM/CJS, TypeScript 6/7 issues, bundler/env var/HMR, monorepo caches, CI-only failures, supply-chain regressions |
| 09 | [Recall Map](09-debugging-recall-map.md) | One-page mental model, maps, decision tables, numbers, mnemonics, rapid-fire Q&A, scripts, flags, checklist |

## Suggested Order

1. **[01 Methodology](01-debugging-methodology-and-interview-approach.md) → [02 Toolkit](02-debugging-toolkit-devtools-node-and-editors.md)** — the method and the instruments.
2. **[03 JavaScript bugs](03-javascript-async-and-data-bugs.md) → [04 React/Next.js](04-react-and-nextjs-debugging-scenarios.md)** — the most commonly asked coding-round and scenario material.
3. **[05 Browser/environment](05-browser-compatibility-storage-and-environment-bugs.md) → [06 Network/auth/caching](06-network-api-auth-and-caching-scenarios.md)** — "works on my machine" and "only some users".
4. **[07 Production incidents](07-production-incidents-observability-and-root-cause-analysis.md) → [08 Build/TypeScript/CI](08-build-tooling-typescript-dependency-and-ci-debugging.md)** — senior and lead-level scenarios.
5. **[09 Recall Map](09-debugging-recall-map.md)** the day before and the hour before.

## Related Material

- Leading incidents, postmortem culture and behavioral stories about failure: [leadership/](../leadership/README.md)
- Network debugging playbook (DevTools Network panel, curl recipes): [networking-and-apis/08](../networking-and-apis/08-network-debugging-and-troubleshooting.md)
- Performance debugging, DevTools profiling, budgets: [web-performance/07](../web-performance/07-performance-debugging-budgets-and-culture.md)
- CSS and layout debugging playbook: [html-and-css/08](../html-and-css/08-html-css-coding-round-and-debugging-scenarios.md)
- Flakiness taxonomy and CI testing: [testing/07](../testing/07-flakiness-ci-and-non-functional-testing.md); Playwright tracing: [testing/04](../testing/04-end-to-end-testing-with-playwright.md)
- CI/CD troubleshooting playbook: [ci-cd-web/08](../ci-cd-web/08-cicd-scenarios-and-troubleshooting.md)
- React rendering, hooks and performance: [react/](../react/README.md); Next.js caching, runtime and deployment: [nextjs-and-rendering/](../nextjs-and-rendering/README.md)
- Event loop, storage and service workers: [browser-internals/](../browser-internals/README.md); cookies, CSRF and auth: [web-security/](../web-security/README.md)
- Observability architecture: [frontend-architecture/04](../frontend-architecture/04-cross-cutting-concerns-architecture.md)
- React Native debugging tools: [react-native/12](../react-native/12-expo-eas-tooling-and-debugging.md)
- TypeScript configuration and tooling: [typescript/04](../typescript/04-tsconfig-modules-and-tooling.md)

## Version Notes

Language, HTTP, cookie and browser-engine semantics are standards-based and stable. Reused verified items: **React 19.x** (StrictMode double invocation, Actions, `useOptimistic`, `useEffectEvent`), **Next.js 16** (async request APIs, Cache Components, `proxy.ts`, Turbopack default), **TypeScript 6.0/7.0** (changed defaults, deprecated options removed in 7.0, native compiler, `@typescript/typescript6` for tools needing the TS 6 API), **Playwright 1.65** (trace viewer, UI mode), and **React Native DevTools** replacing remote Chrome debugging. A check of Chrome's "What's new in DevTools" page returned no usable release details, so **DevTools panel names, menu paths and newer features, vendor privacy policies (Safari ITP, third-party cookie handling, CHIPS), exact error messages and diagnostic codes, Node feature-version thresholds (for example `require(esm)`), CDN/vendor cache semantics, and SaaS observability product features are marked *(hedged)*** and should be re-checked against current documentation.
