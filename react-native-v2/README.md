# React Native

Production-oriented React Native interview preparation for Senior Frontend, Mobile, Tech Lead and Architect roles, consolidated into **one owner file per topic** (no repeated concepts across files): runtime and Hermes, the New Architecture, React internals on native, native modules, performance, startup and animations, UI/accessibility/i18n, lifecycle and background work, networking and offline, app architecture, mobile security, Expo/EAS/tooling, OTA and store releases, CI/CD, and senior scenarios. File 16 is the **last-minute recall map**. Version facts were verified against **React Native 0.88** and **Expo SDK 58** (Nov 2026).

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [JavaScript runtime, Hermes and the event loop](01-javascript-runtime-hermes-and-event-loop.md) | Engine vs runtime, Hermes V1, host APIs and timers, event loop, threads, blocked-JS behavior, closures/GC, concurrency vs parallelism |
| 02 | [Architecture: Bridge to the New Architecture](02-architecture-bridge-to-new-architecture.md) | Bridge problems, JSI, TurboModules, Codegen, Fabric (render/commit/mount), shadow tree, Yoga, threading scenarios, migration timeline (0.76 → 0.82 → 0.84) |
| 03 | [React internals and rendering in React Native](03-react-internals-and-rendering-in-react-native.md) | `setState` path, re-render triggers, reconciliation/Fiber, concurrent rendering, React vs Fabric phases, batching, effect timing, modern React features in RN |
| 04 | [Native modules, components and platform code](04-native-modules-components-and-platform-code.md) | TurboModules and Fabric components, Codegen in practice, JS↔native communication, threading, large data, Expo Modules, `Platform` and file extensions |
| 05 | [Performance: rendering, lists, images and memory](05-performance-rendering-lists-images-and-memory.md) | JS vs UI frame budgets, profiling flow, `memo`/`useMemo`/`useCallback`, FlatList/FlashList, images, memory leaks, cancellation, native-thread bottlenecks |
| 06 | [Startup, bundle size, Metro, animations and gestures](06-startup-bundle-animations-and-gestures.md) | Startup levers, bundle/app size, Metro, native driver, Animation Backend (0.85), Reanimated worklets, touch and gestures |
| 07 | [UI, styling, layout, accessibility and localization](07-ui-styling-layout-accessibility-and-localization.md) | Flexbox/Yoga, responsive layout, safe areas, edge-to-edge, theming/dark mode, a11y, i18n/RTL, platform conventions |
| 08 | [App lifecycle, background work, push, deep links and permissions](08-app-lifecycle-background-work-push-and-deep-links.md) | Startup sequence, Debug vs Release, `AppState`, timers in background, fault semantics, Headless JS/BGTaskScheduler, push, deep links, permissions, iOS 27 scene lifecycle |
| 09 | [Networking, storage and offline](09-networking-storage-and-offline.md) | `fetch` → XHR → native, CORS/TLS, API layer, refresh races, idempotency, storage choices, offline-first, real-time on mobile |
| 10 | [App architecture, state and navigation](10-app-architecture-state-and-navigation.md) | Feature-first structure, four kinds of state, Redux Toolkit/Zustand/TanStack Query, navigation and auth flows, error handling, testing layers |
| 11 | [Mobile security](11-mobile-security.md) | OAuth2/OIDC/PKCE, tokens and sessions, secure storage, pinning, deep-link security, integrity, logs/screens, encryption, secrets |
| 12 | [Expo, EAS, tooling and debugging](12-expo-eas-tooling-and-debugging.md) | Expo vs bare, CNG/config plugins, EAS services, React Native DevTools, troubleshooting playbook, upgrades, observability |
| 13 | [OTA updates and store releases](13-ota-updates-and-store-releases.md) | OTA mechanics and limits, runtime versions, staged rollout/rollback, policy, new-binary triggers, signing, store rollouts, incident playbooks |
| 14 | [CI/CD with GitHub Actions](14-ci-cd-with-github-actions.md) | Pipeline design, parallel iOS/Android jobs, signing secrets, environments and approvals, concurrency, caching, auditability |
| 15 | [Senior scenarios and mobile system design](15-senior-scenarios-and-system-design.md) | Answer framework, wealth-management/offline/chat/camera designs, migrations, brownfield, incidents, leadership questions |
| 16 | [Recall map](16-react-native-recall-map.md) | 60-second model, diagrams, decision tables, version facts, mnemonics, rapid-fire, scripts, checklist |

## Suggested Order

1. **[01 Runtime](01-javascript-runtime-hermes-and-event-loop.md)** → **[02 Architecture](02-architecture-bridge-to-new-architecture.md)** → **[03 React internals](03-react-internals-and-rendering-in-react-native.md)** → **[04 Native modules](04-native-modules-components-and-platform-code.md)** (the mechanics).
2. **[05 Performance](05-performance-rendering-lists-images-and-memory.md)** → **[06 Startup and animations](06-startup-bundle-animations-and-gestures.md)** → **[07 UI and accessibility](07-ui-styling-layout-accessibility-and-localization.md)**.
3. **[08 Lifecycle](08-app-lifecycle-background-work-push-and-deep-links.md)** → **[09 Networking and offline](09-networking-storage-and-offline.md)** → **[10 App architecture](10-app-architecture-state-and-navigation.md)** → **[11 Security](11-mobile-security.md)**.
4. **[12 Expo and tooling](12-expo-eas-tooling-and-debugging.md)** → **[13 Releases](13-ota-updates-and-store-releases.md)** → **[14 CI/CD](14-ci-cd-with-github-actions.md)**.
5. **[15 Senior scenarios](15-senior-scenarios-and-system-design.md)**, then **[16 Recall map](16-react-native-recall-map.md)** the day before and the hour before.

## What Moved Where (from the previous 17-file layout)

| Previous files | Now owned by |
|---|---|
| Architecture & Internals; Tier 2 (old vs new) | 02 (Hermes → 01, Fiber/effects → 03) |
| Tier 1 (JS/RN/native), Tier 5 (JS internals) | 01 |
| Tier 6 (React internals) | 03 |
| Native Integration; Tier 3 (native ↔ JS) | 04 |
| Performance; Tier 4 (performance internals) | 05 (bundle/startup/animations → 06) |
| Tier 7 (scenarios), Tier 9 (lifecycle) | 08 (Metro → 06) |
| Tier 8 (networking internals); networking and offline parts of App Architecture | 09 |
| App Architecture (structure, state, navigation, errors, testing) | 10 (security → 11, CI/CD → 13/14) |
| Tier 10 (OTA), Tier 11 (store releases) | 13 |
| Tier 12 (GitHub Actions) | 14 |
| Master recall map | 16 |
| New topics | 07 (UI/a11y/i18n), 12 (Expo/EAS/tooling), 15 (scenarios), plus Hermes V1, New-Architecture-only migration, Animation Backend, Expo Modules, iOS 27 scene lifecycle, edge-to-edge |

## Related Material

- React fundamentals and hooks behind RN rendering: [react/](../react/README.md); typed APIs and Strict TypeScript migration: [typescript/](../typescript/README.md)
- Web counterparts: performance [web-performance/](../web-performance/README.md), security [web-security/](../web-security/README.md), protocols and resilience [networking-and-apis/](../networking-and-apis/README.md), browser engine [browser-internals/](../browser-internals/README.md)
- Test strategy and RN testing practice: [testing/](../testing/README.md) (see [testing/08 §6](../testing/08-testing-in-practice-tdd-architecture-mobile-and-ai.md#6-testing-react-native-apps)); mobile system-design framing: [system-design/](../system-design/README.md)

## Version Notes

- Verified in Nov 2026 against **reactnative.dev** (versions page and posts 0.80–0.88) and **expo.dev** (changelog, SDK 58): latest React Native **0.88**; Expo SDK **58** (RN 0.88, iOS 27); New Architecture **only** since 0.82; **Hermes V1 default** since 0.84 (no JIT yet); legacy components removed from 0.84; **Animation Backend** (0.85); Jest preset package (0.85); edge-to-edge Android 15+ (0.86); **Strict TypeScript API default, Node 22+, AGP 9, Kotlin 2.0+** and removals of `InteractionManager`, `Touchable*`, `Modal animated`, `StatusBar` background props (0.87); web-based event dispatching, variable fonts, iOS SceneDelegate, `ArrayBuffer` TurboModules, experimental SwiftPM (0.88); Expo Router stable data loaders/SSR/middleware/native tabs, Expo Modules 2.0 beta, R8 default, `balanced` fingerprint, EAS Observe GA, EAS Workflows concurrency.
- Earlier-verified items reused: OAuth browser/native guidance (RFC 10017/BCP 212, RFC 9700), Apple App Store Review Guideline 3.3.2 and Google Play's VM/limited-API exception, TanStack Query defaults, React Native security guide, GitHub Actions behavior.
- *General knowledge, marked "(hedged)" in the files:* Reanimated/Worklets/Gesture Handler internals, FlashList/MMKV/NetInfo details, Android/iOS lifecycle callback names, background-execution budgets, Apple phased-release schedule, Detox/Maestro/Appium comparisons, vendor SDK behavior, Fastlane lane names, runner labels and action SHAs.
- Tooling and platform versions change quickly: re-check release notes before relying on exact option names, flags or support claims.
