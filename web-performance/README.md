# Web Performance

Production-oriented web performance interview preparation for Senior Frontend, Staff/Lead and Frontend Architect roles. Framework-agnostic fundamentals (browser pipeline, network, caching, rendering, memory, media, third parties) plus measurement, debugging and governance. Each file covers **one topic end-to-end**: concept, internals, code, patterns, pitfalls, trade-offs, fundamentals Q&A and senior scenario Q&A. File 08 is the **last-minute recall map**.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [Metrics and measurement](01-performance-metrics-and-measurement.md) | Core Web Vitals, sub-parts, field vs lab, CrUX/RUM, Performance APIs, `web-vitals`, percentiles, bfcache/prerender/SPA caveats, SLOs |
| 02 | [Critical rendering path and loading](02-critical-rendering-path-and-loading-performance.md) | Preload scanner, render-blocking CSS/JS, `fetchpriority`, resource hints, Early Hints, LCP playbook, TTFB |
| 03 | [Network, caching and delivery](03-network-caching-and-delivery.md) | HTTP/2/3, compression, `Cache-Control`, CDN keys, Service Workers, Speculation Rules, bfcache |
| 04 | [JavaScript, main thread and INP](04-javascript-main-thread-and-inp.md) | Event loop, long tasks, yielding, workers, bundles, hydration, event handling, INP workflow |
| 05 | [Rendering, animation, CLS and memory](05-rendering-layout-animation-and-cls.md) | Pipeline, property costs, layout thrashing, animation, scrolling, CLS, leaks, GPU/layers |
| 06 | [Images, fonts, media, third parties](06-images-fonts-media-and-third-parties.md) | Formats, `srcset/sizes`, lazy/priority, image CDN, web fonts, video, third-party governance |
| 07 | [Debugging, budgets and culture](07-performance-debugging-budgets-and-culture.md) | Methodology, DevTools playbook, scenarios, budgets, CI, alerts, canaries, culture, interview answer structure |
| 08 | [Recall map](08-web-performance-recall-map.md) | One-page mental model, decision trees, numbers, mnemonics, rapid-fire, scripts |

## Suggested Order

1. **[01 Metrics](01-performance-metrics-and-measurement.md)** (shared vocabulary and method).
2. **[02 Loading](02-critical-rendering-path-and-loading-performance.md)** → **[03 Delivery](03-network-caching-and-delivery.md)** (LCP/TTFB).
3. **[04 JS and INP](04-javascript-main-thread-and-inp.md)** → **[05 Rendering and CLS](05-rendering-layout-animation-and-cls.md)**.
4. **[06 Assets and third parties](06-images-fonts-media-and-third-parties.md)** → **[07 Debugging and culture](07-performance-debugging-budgets-and-culture.md)**.
5. **[08 Recall map](08-web-performance-recall-map.md)** the day before and the hour before.

## Related Material

- Next.js-specific performance (image/font/script, PPR, instant navigation): [nextjs-and-rendering/](../nextjs-and-rendering/README.md), especially [07 performance](../nextjs-and-rendering/07-performance-optimization.md)
- React rendering performance: [react/08](../react/08-react-performance-optimization.md) and [react/03](../react/03-concurrent-react-suspense-and-transitions.md)
- Performance in design interviews: [system-design/](../system-design/README.md)
- Mobile counterpart: [react-native/](../react-native/README.md)

## Version Notes

- Verified directly against web.dev and MDN on 2026-11-12: Core Web Vitals definitions/thresholds and lifecycle, LCP sub-part methodology and optimisation guidance (updated Mar 2025), INP sub-parts and optimisation guidance (updated Sep 2025), bfcache (updated Oct 2026), Speculation Rules API (MDN, modified Sep 2026; experimental, Chromium-only in practice).
- Verified earlier in this handbook (MDN/web.dev, 2026-11-10): `scheduler.yield()` support, `content-visibility: auto` status, `fetchpriority` and AVIF/JPEG XL support, SSE connection limits.
- *General knowledge, marked "(hedged)" in the files:* TTFB/FCP "good" thresholds, CLS session-window details and poor threshold, Long Animation Frames API, `isInputPending`/`scheduler.postTask`/`requestIdleCallback` availability, Early Hints and `Save-Data`/client hints support, Brotli/zstd/compression-dictionary details, HTTP/2 Server Push removal, CDN and Service Worker behaviours, DevTools panel names, Lighthouse CI settings and CPU/network throttling heuristics, scroll-driven animations/View Transitions support, `measureUserAgentSpecificMemory`.
- Browser support for newer APIs changes quickly: re-check MDN/Baseline before relying on exact versions.
