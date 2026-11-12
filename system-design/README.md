# Frontend System Design

Production-oriented frontend system design interview preparation for Senior Frontend, Staff/Lead, and Frontend Architect roles. Each case study follows the same template: requirements, estimates, architecture, data model, API/protocol, components/state, deep dives, performance, accessibility/i18n/security/observability, failure modes, testing, trade-offs, Q&A, cheat sheet.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [Framework](01-frontend-system-design-framework.md) | RADIO method, 45-minute timeline, rendering strategies, networking, caching, state, perf toolbox, resilience, numbers |
| 02 | [News Feed and Infinite Scroll](02-news-feed-and-infinite-scroll.md) | Cursor + snapshot pagination, virtualisation, scroll restoration, optimistic likes, impressions, `role="feed"` |
| 03 | [Autocomplete and Typeahead](03-autocomplete-and-typeahead-search.md) | Debounce/abort/stale guards, IME, LRU/prefix cache, trie, ARIA combobox |
| 04 | [Chat and Real-Time Messaging](04-chat-and-real-time-messaging.md) | WebSocket protocol, reconnect FSM, idempotency, seq/gap fill, outbox, presence, multi-tab |
| 05 | [Analytics Dashboard](05-analytics-dashboard.md) | Widget isolation, batched queries, SVG/Canvas/WebGL, downsampling, URL filters, time zones |
| 06 | [Design System and Component Library](06-design-system-and-component-library.md) | Tokens, theming, headless components, RSC-safe styling, overlays, versioning/codemods, governance |
| 07 | [Image Gallery and Media-Heavy UI](07-image-gallery-and-media-heavy-ui.md) | Responsive images, justified layout, LCP priority, placeholders, lightbox, uploads |
| 08 | [Collaborative Editor](08-collaborative-editor.md) | `contenteditable`/IME, OT vs CRDT vs central authority, presence, comments, undo, offline, history |
| 09 | [Recall Map](09-system-design-recall-map.md) | One-page mental model, diagrams, decision tables, extra prompts, numbers, mnemonics, scripts |

## Suggested Order

1. **[01 Framework](01-frontend-system-design-framework.md)** (the method used in every interview).
2. Case studies by likelihood: **02 Feed → 03 Autocomplete → 04 Chat → 05 Dashboard → 07 Gallery → 06 Design System → 08 Editor**.
3. **[09 Recall Map](09-system-design-recall-map.md)** the day before and the hour before.

## Related Material

- Web performance fundamentals behind the performance sections of every case study: [web-performance/](../web-performance/README.md)
- React internals and performance: [react/](../react/README.md) (virtualisation, transitions, Server Components, state/data fetching)
- TypeScript patterns for API boundaries and design systems: [typescript/](../typescript/README.md)
- Mobile counterpart: [react-native/](../react-native/README.md)

## Version Notes

Verified against MDN/web.dev (2026-11-10): `scheduler.yield()` (no Safari), `content-visibility: auto` (Baseline newly available), SSE connection limits, Popover API, `fetchpriority`, AVIF/JPEG XL support, DTCG token spec status, EditContext API (experimental, Chromium-only). Library defaults (TanStack Virtual/Query, Yjs, zod, cva) and a few emerging CSS features (e.g., anchor positioning) should be re-checked against current docs before relying on specifics.
