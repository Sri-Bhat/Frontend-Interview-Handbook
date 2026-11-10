# React Interview Handbook (Web)

Deep-dive guides for senior React interviews, verified against the official react.dev documentation (React 19.x; latest stable **19.3** at the time of writing). Each file covers **one topic end-to-end**: concept, internals, code, use cases, pitfalls, performance, trade-offs, fundamentals Q&A and senior scenario Q&A with reasoning. File 09 is the **last-minute recall map**.

## Documents

| # | File | Covers |
|---|---|---|
| 01 | [01-rendering-model-and-reconciliation.md](01-rendering-model-and-reconciliation.md) | Trigger/render/commit, purity and Strict Mode, state snapshots and batching, reconciliation and keys, Fiber and lanes, commit phases, events, controlled/uncontrolled, refs, portals |
| 02 | [02-hooks-deep-dive.md](02-hooks-deep-dive.md) | How hooks work internally, `useState`/`useReducer`, effects, "you might not need an effect", `useEffectEvent`, refs, memoization hooks, context, `useSyncExternalStore`, stale closures, custom hooks, coding-round hooks |
| 03 | [03-concurrent-react-suspense-and-transitions.md](03-concurrent-react-suspense-and-transitions.md) | Concurrent rendering, `useTransition`, `useDeferredValue`, Suspense and data patterns, Error Boundaries, streaming SSR and selective hydration, `Activity`, `ViewTransition` |
| 04 | [04-react-19-and-beyond.md](04-react-19-and-beyond.md) | React 19/19.2/19.3: Actions, form actions, `useActionState`, `useOptimistic`, `use`, ref/context changes, metadata, PPR, Compiler 1.0, 18 → 19 migration |
| 05 | [05-server-components-and-server-functions.md](05-server-components-and-server-functions.md) | RSC mental model, `'use client'`/`'use server'`, payload, serialization, composition, Server Functions, security (Dec 2025 RSC advisories), caching |
| 06 | [06-state-management-and-data-fetching.md](06-state-management-and-data-fetching.md) | State taxonomy, Context/reducer, Redux Toolkit/Zustand/Jotai/XState, TanStack Query, mutations and optimistic updates, pagination, URL/form state, offline/auth refresh |
| 07 | [07-component-patterns-and-architecture.md](07-component-patterns-and-architecture.md) | Composition, controlled APIs, compound/headless components, polymorphic typing, modals and a11y, lazy loading, design systems, folder architecture, UI coding-round components |
| 08 | [08-react-performance-optimization.md](08-react-performance-optimization.md) | Profiling method and tools, re-render control, `memo` hooks, React Compiler, virtualisation, bundle size, memory leaks, INP debugging |
| 09 | [09-react-recall-map.md](09-react-recall-map.md) | Master mental model, Mermaid maps, mnemonics, rapid-fire recall, model answers, red flags |

## Suggested Order

1. **First pass (mechanics):** 01 → 02 → 03.
2. **Modern React:** 04 → 05.
3. **Application design:** 06 → 07 → 08.
4. **Day before the interview:** 09 only, then drill the weak spots.

## Related Material in This Repository

- React Native internals and performance: [react-native/](../react-native/README.md) (Tier 6 covers React internals in RN).
- JavaScript fundamentals used heavily here (closures, event loop, async): [js/03-advanced-fundamentals-and-coding.md](../js/03-advanced-fundamentals-and-coding.md).

## Version Notes

- Claims marked **[19.x]** are version-sensitive. Verified sources: react.dev blog posts for [19](https://react.dev/blog/2024/12/05/react-19), [19.2](https://react.dev/blog/2025/10/01/react-19-2), [19.3](https://react.dev/blog/2026/09/09/react-19-3), the [19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), [Compiler v1.0](https://react.dev/blog/2025/10/07/react-compiler-1) and the RSC security advisories.
- Library-specific defaults (TanStack Query v5, Redux Toolkit, Zustand v5) reflect those major versions; confirm against current library docs before quoting in an interview.
