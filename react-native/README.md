# React Native Interview Prep Handbook

A personal collection of React Native interview-prep notes: 4 deep-dive reference documents, a 12-tier Q&A series, and one consolidated recall map.

## Documents (deep-dive reference)

| File | Covers |
|---|---|
| [01-architecture-and-internals.md](01-architecture-and-internals.md) | Old Bridge vs New Architecture, JSI, TurboModules, Fabric, Codegen, React Fiber/reconciliation, rendering pipeline & threading, Hermes |
| [02-performance.md](02-performance.md) | Frame budget, rerenders, `memo`/`useMemo`/`useCallback`, FlatList tuning, memory leaks, image optimization, bundle/startup size |
| [03-native-integration.md](03-native-integration.md) | Native Modules vs Native Components, TurboModules/Fabric Components, platform-specific code, Codegen |
| [04-app-architecture-and-production-concerns.md](04-app-architecture-and-production-concerns.md) | App/folder architecture, state management, networking, security, navigation, offline-first, error handling, testing, CI/CD |

## Tiers (interview Q&A, one topic per tier)

| Tier | Topic |
|---|---|
| [1](05-tire1-must-know-js-rn-native.md) | JS, RN and native basics (event loop, timers, Hermes scope) |
| [2](06-tire2-old-vs-new-architecture.md) | Old vs New Architecture deep drill |
| [3](07-tire3-native-js-communication.md) | Native ↔ JS communication |
| [4](08-tire4-performance-internals.md) | Performance internals |
| [5](09-tire5-javascript-internals.md) | JavaScript internals (GC, closures, concurrency) |
| [6](10-tire6-react-internals-in-react-native.md) | React internals in React Native (Fiber, reconciliation, effects) |
| [7](11-tire7-communication-and-architecture-scenarios.md) | Communication & architecture scenarios |
| [8](12-tire8-networking-internals.md) | Networking internals (fetch/XHR, CORS, TLS) |
| [9](13-tire9-native-app-lifecycle.md) | Native app lifecycle (boot, Metro, foreground/background) |
| [10](14-tire10-ota-and-release-architecture.md) | OTA & release architecture |
| [11](15-tire11-app-store-play-store-release.md) | App Store / Play Store release |
| [12](16-tire12-github-actions-cicd.md) | GitHub Actions / CI-CD |

## Recall Map

[17-master-mental-model-recall-map.md](17-master-mental-model-recall-map.md) — a diagram-first mental model tying all 16 files above into one picture, for quick recall before an interview (not a substitute for reading the docs themselves).

## Suggested order

Read Documents 1–4 first for the mechanics, work through Tiers 1–12 for Q&A-style practice, then use the recall map to refresh everything quickly before an interview.
