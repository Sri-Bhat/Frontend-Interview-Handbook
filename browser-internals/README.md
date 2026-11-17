# Browser Internals

Production-oriented browser internals interview preparation for Senior Frontend, Staff/Lead and Frontend Architect roles: how browsers are built, how pages load and render, how JavaScript executes, where data lives, and how the security model works. Each file covers **one topic end-to-end**: concept, internals, code, pitfalls, trade-offs, fundamentals Q&A and senior scenario Q&A. File 08 is the **last-minute recall map**.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [Architecture, processes and site isolation](01-browser-architecture-processes-and-site-isolation.md) | Engines, multi-process model, renderer threads, input-to-pixels flow, Site Isolation, sandboxing, COOP/COEP/CORP, agents |
| 02 | [Navigation and page lifecycle](02-navigation-and-page-lifecycle.md) | URL → commit pipeline, DNS/TLS, caches/service workers, lifecycle events, script loading order, bfcache/Page Lifecycle, History and Navigation APIs |
| 03 | [Parsing, DOM, CSSOM, layout and paint](03-parsing-dom-cssom-layout-and-paint.md) | HTML parser, DOM/CSSOM, cascade and specificity, formatting contexts, stacking contexts, compositing, update-the-rendering |
| 04 | [JavaScript engine, event loop and memory](04-javascript-engine-event-loop-and-memory.md) | JIT tiers, hidden classes, tasks vs microtasks (ordering puzzles), workers, GC, leaks |
| 05 | [Storage and caching APIs](05-browser-storage-and-caching-apis.md) | Cookies, Web Storage, IndexedDB, Cache API, OPFS, quotas, persistence, eviction, partitioning |
| 06 | [Browser security model](06-browser-security-model.md) | Origin/site, SOP, CORS, SameSite/CSRF, XSS/CSP, clickjacking, postMessage, HSTS/SRI, isolation headers |
| 07 | [Events, DOM APIs and Web Components](07-events-dom-apis-and-web-components.md) | Event flow, delegation, pointer/keyboard/IME, observers, dialog/Popover, custom elements, Shadow DOM, fetch primer |
| 08 | [Recall map](08-browser-internals-recall-map.md) | One-page mental model, diagrams, decision tables, numbers, mnemonics, rapid-fire, scripts |

## Suggested Order

1. **[01 Architecture](01-browser-architecture-processes-and-site-isolation.md)** → **[02 Navigation](02-navigation-and-page-lifecycle.md)** → **[03 Rendering engine](03-parsing-dom-cssom-layout-and-paint.md)** (the pipeline).
2. **[04 JS engine and event loop](04-javascript-engine-event-loop-and-memory.md)** (the most-asked interview topic).
3. **[05 Storage](05-browser-storage-and-caching-apis.md)** → **[06 Security](06-browser-security-model.md)**.
4. **[07 Events and DOM APIs](07-events-dom-apis-and-web-components.md)**.
5. **[08 Recall map](08-browser-internals-recall-map.md)** the day before and the hour before.

## Related Material

- Performance consequences of these internals (metrics, loading, INP, CLS, delivery): [web-performance/](../web-performance/README.md)
- Framework-level rendering and security built on top: [nextjs-and-rendering/](../nextjs-and-rendering/README.md), [react/](../react/README.md)
- JavaScript language fundamentals (closures, `this`, prototypes, async): [js/03](../js/03-advanced-fundamentals-and-coding.md)
- Applying these in design interviews: [system-design/](../system-design/README.md)

## Version Notes

- Verified directly against MDN on 2026-11-12: **Same-origin policy** (modified Sep 2026) and **Storage quotas and eviction criteria** (modified Jan 2026) — origin rules, cross-origin access categories, cookie origin model, storage bucketing, best-effort vs persistent storage, per-engine quotas, eviction behaviour including Safari's 7-day proactive eviction.
- Verified earlier in this handbook (MDN/web.dev): bfcache and Speculation Rules behaviour, `scheduler.yield()` support (Chrome/Edge 129, Firefox 142, not Safari), `content-visibility` and Popover API status, INP/LCP main-thread guidance.
- *General knowledge, marked "(hedged)" in the files:* Chromium/Firefox/WebKit process model details and Site Isolation specifics, V8/SpiderMonkey/JavaScriptCore tier names, hidden-class and GC internals, cascade/specificity edge cases and newer CSS features, `SameSite` defaults and third-party-cookie status, CORS preflight caps, CSP/Trusted Types/Fetch Metadata support, Navigation API and Declarative Shadow DOM status, `ElementInternals` ARIA reflection, IndexedDB/OPFS support nuances.
- Browser behaviour changes quickly: re-check MDN/Baseline and engine release notes before relying on exact versions or limits.
