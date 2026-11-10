# TypeScript Interview Handbook

Deep-dive guides for senior TypeScript interviews, verified against the TypeScript team's official release posts (5.8, 5.9, **6.0**, **7.0**; 7.1 beta noted). Each file covers **one topic end-to-end**: concept, internals, code, real-world use, pitfalls, performance, trade-offs, fundamentals Q&A and senior scenario Q&A with reasoning. File 06 is the **last-minute recall map**.

## Documents

| # | File | Covers |
|---|---|---|
| 01 | [01-type-system-fundamentals.md](01-type-system-fundamentals.md) | Structural typing, inference, `any`/`unknown`/`never`, unions and discriminated unions, `type` vs `interface`, enums vs literal unions, classes, utility types, declaration merging, soundness holes |
| 02 | [02-generics-and-advanced-types.md](02-generics-and-advanced-types.md) | Generics and constraints, `const`/`NoInfer`, inference, conditional types and `infer`, mapped and template literal types, recursion limits, variance, production patterns, type challenges |
| 03 | [03-narrowing-and-type-safety-patterns.md](03-narrowing-and-type-safety-patterns.md) | Control-flow narrowing, type guards/assertion functions, exhaustiveness, `satisfies`, runtime boundaries (zod), typed errors/Results, strictness flags, `using`, lint rules |
| 04 | [04-tsconfig-modules-and-tooling.md](04-tsconfig-modules-and-tooling.md) | tsconfig by project type, module systems and resolution, publishing `.d.ts`, project references, tooling, **5.x → 6.0 → 7.0 migration** (native compiler, new defaults, removals, API gap) |
| 05 | [05-typescript-with-react-and-apis.md](05-typescript-with-react-and-apis.md) | Typing React components/hooks/context, **React 19 type changes**, forms/Actions, TanStack Query, Redux/Zustand, React Native (navigation, TurboModule specs), Node/Express/ORMs, augmentation |
| 06 | [06-typescript-recall-map.md](06-typescript-recall-map.md) | Master mental model, Mermaid maps, mnemonics, rapid-fire recall, model answers, red flags |

## Suggested Order

1. **Foundations:** 01 → 03 (narrowing and boundaries are asked in every interview).
2. **Advanced types:** 02 (for senior/architect rounds and type-challenge exercises).
3. **Toolchain and modern TS:** 04 (very current: TS 6/7 changes).
4. **Applied:** 05 (React/RN/API typing).
5. **Day before:** 06 only.

## Related Material in This Repository

- React (web) deep dives: [react/README.md](../react/README.md), especially [component patterns](../react/07-component-patterns-and-architecture.md) and [state & data fetching](../react/06-state-management-and-data-fetching.md).
- React Native (Codegen/TurboModules): [react-native/03-native-integration.md](../react-native/03-native-integration.md).
- JavaScript fundamentals: [js/03-advanced-fundamentals-and-coding.md](../js/03-advanced-fundamentals-and-coding.md).

## Version Notes (verified 2026-11-10)

- **TypeScript 6.0** (Mar 2026) is the last release on the JavaScript codebase; defaults changed (`strict`, `types: []`, `rootDir`), many legacy options deprecated.
- **TypeScript 7.0** (mid 2026) is the native Go port (~8–12× faster full builds); it removes the 6.0-deprecated options and ships **without a stable programmatic API** (planned for 7.1) — tools such as typescript-eslint, Volar and Angular's tooling still use the TS 6 API (`@typescript/typescript6`).
- 5.x-era feature claims (5.0–5.7) are from the TypeScript release notes; 5.8, 5.9, 6.0 and 7.0 were verified directly against the team's announcement posts.
- Library facts (zod, TanStack Query v5, Redux Toolkit 2, Zustand 5, React Navigation 7) reflect those majors; confirm against current docs before quoting.
