# JavaScript

Production-oriented interview preparation for Senior Frontend, Senior React, React Native, Tech Lead and Frontend Architect roles: language fundamentals, functions and closures, the object model, asynchronous JavaScript, modules and text processing, modern ECMAScript, DOM/browser APIs, and a large set of coding challenges and output-prediction puzzles. The folder contains **JavaScript only** and is organized by **level** — basic, medium, advanced, then coding — so you can read in order or jump to the tier you need. The two original documents that belong here (arrays/objects/syntax and the 20-question advanced Q&A) are **preserved in full**; the original frontend-utility coding set (debounce, throttle, memoize, deep clone and friends) is part of the DSA series and lives in [dsa-for-fe/05](../dsa-for-fe/05-frontend-specific-coding.md). Each document follows the repository template: verification note, TOC, TL;DR with diagram, concepts, pitfalls, fundamentals Q&A, senior scenario Q&A, cheat sheet, glossary and further reading (preserved originals keep their native layout with pitfalls and senior follow-ups added).

## Documents

| # | Level | Document | Focus |
|---|---|---|---|
| 01 | Basic | [Language Fundamentals: Types, Coercion and Equality](01-language-fundamentals-types-coercion-and-equality.md) | Primitives vs objects, `typeof`, numbers/`BigInt`/floating point, strings and Unicode, coercion rules, `==`/`===`/`Object.is`, truthiness, `var`/`let`/`const`, strict mode, pass-by-sharing, output-prediction puzzles |
| 02 | Basic | [Arrays, Objects, Collections and Modern Syntax](02-arrays-objects-collections-and-modern-syntax.md) | *(original)* array methods, `Object` statics, `Map`/`Set`, string methods, destructuring, spread/rest, `?.`, `??`; plus newer ES2022–ES2025 APIs, pitfalls, follow-ups |
| 03 | Medium | [Functions, Scope, Closures and `this`](03-functions-scope-closures-and-this.md) | Function forms, parameters, scope chain, closures (use cases, stale closures, leaks), complete `this` rules, `call`/`apply`/`bind`, HOFs, currying, composition, purity, recursion |
| 04 | Medium | [Prototypes, Classes and the Object Model](04-prototypes-classes-and-the-object-model.md) | Property descriptors, prototype chain, `new`, classes and `#private`, mixins and composition, `Symbol`s, `Proxy`/`Reflect`, weak references, prototype pollution |
| 05 | Advanced | [Asynchronous JavaScript: Event Loop, Promises and async/await](05-asynchronous-javascript-event-loop-promises-and-async-await.md) | Event loop (browser vs Node), callbacks, promises, combinators, `async`/`await`, `AbortController`, async patterns, streams/workers, scheduling, async errors |
| 06 | Advanced | [Modules, Iterators, Errors and Text Processing](06-modules-iterators-generators-errors-and-text-processing.md) | ESM vs CommonJS, barrels, dynamic import, iterators/generators/async generators, errors and `cause`, JSON, RegExp, dates and `Intl`, URLs/encoding |
| 07 | Advanced | [Modern ECMAScript and JavaScript in the Browser](07-modern-ecmascript-and-javascript-in-the-browser.md) | ES2015→ES2027 feature map (TC39-verified), shipping modern syntax safely, DOM essentials, events and delegation, browser APIs, performance and security-aware JS |
| 08 | Coding / Q&A | [Advanced Fundamentals and Coding: 20 Questions](08-advanced-fundamentals-and-coding.md) | *(original)* execution context, closures, event loop, `this`, prototypes, copying, `map`/`filter`/`reduce`, `Promise.all`, concurrency limiter, generators, GC, freezing, equality, race conditions; plus a "go deeper" table |
| 09 | Coding | [Coding Challenges, Polyfills and Output Prediction](09-coding-challenges-polyfills-and-output-prediction.md) | Full debounce/throttle, `call`/`apply`/`new`/`instanceof`, array/object utilities, `deepEqual`, get/set by path, promise utilities, mini-Promise, EventEmitter, LRU, store, 20-puzzle gauntlet |
| 10 | All | [Recall Map](10-javascript-recall-map.md) | One-page mental model, diagrams, decision tables, facts, mnemonics, rapid-fire Q&A, scripts, flags, checklist |

## Suggested Order

1. **Basic:** [01 Fundamentals](01-language-fundamentals-types-coercion-and-equality.md) → [02 Arrays, objects and syntax](02-arrays-objects-collections-and-modern-syntax.md).
2. **Medium:** [03 Functions and closures](03-functions-scope-closures-and-this.md) → [04 Object model](04-prototypes-classes-and-the-object-model.md).
3. **Advanced:** [05 Async](05-asynchronous-javascript-event-loop-promises-and-async-await.md) → [06 Modules, iterators, text](06-modules-iterators-generators-errors-and-text-processing.md) → [07 Modern ES and the browser](07-modern-ecmascript-and-javascript-in-the-browser.md).
4. **Coding practice:** [08 Advanced Q&A](08-advanced-fundamentals-and-coding.md) → [09 Challenges and puzzles](09-coding-challenges-polyfills-and-output-prediction.md); then the DSA-series utilities in [dsa-for-fe/05](../dsa-for-fe/05-frontend-specific-coding.md).
5. **[10 Recall Map](10-javascript-recall-map.md)** the day before and the hour before.

**Short on time?** Do 01 §12, 03 §12, 05 §13, 09 §11 (output-prediction rounds), then 08 and 10.

## Related Material

- Algorithm patterns (hash map, sliding window, two pointers, stack), the frontend-utility coding set (debounce, throttle, memoize, deep clone, group by) and array/linked-list problems: [dsa-for-fe/](../dsa-for-fe/01-hashmap-pattern.md) (including [05 Frontend-specific coding](../dsa-for-fe/05-frontend-specific-coding.md)), [dsa-topics/](../dsa-topics/01-array-problems.md)
- TypeScript on top of JavaScript semantics: [typescript/](../typescript/README.md)
- Event loop, engine, memory, DOM and storage internals: [browser-internals/](../browser-internals/README.md) (especially [04](../browser-internals/04-javascript-engine-event-loop-and-memory.md))
- React rendering, hooks and closures in components: [react/](../react/README.md)
- Debugging the bugs these documents warn about (async races, coercion, dates, modules): [debugging-scenarios/03](../debugging-scenarios/03-javascript-async-and-data-bugs.md)
- Main-thread performance and INP: [web-performance/04](../web-performance/04-javascript-main-thread-and-inp.md)
- Security of JS in the browser (XSS, Trusted Types, prototype pollution): [web-security/](../web-security/README.md)
- Writing tests for utilities and async code: [testing/02](../testing/02-unit-testing-and-test-doubles.md)

## Version Notes

Core language semantics (types, coercion, scope, closures, `this`, prototypes, promises, event loop, modules) are specified by **ECMAScript/HTML** and documented on **MDN**; they are stable. The **edition-by-edition feature map** was cross-checked against the **TC39 finished-proposals list (fetched 2026-11-26; "expected publication year" used as the edition label)**: ES2023 (change-array-by-copy, `findLast`, symbols as `WeakMap` keys), ES2024 (`Object.groupBy`/`Map.groupBy`, `Promise.withResolvers`, RegExp `v` flag, `ArrayBuffer` transfer/resizable, well-formed Unicode strings), ES2025 (`Set` methods, `Promise.try`, sync iterator helpers, `RegExp.escape`, import attributes/JSON modules, RegExp modifiers, duplicate named groups, `Float16Array`), ES2026-listed (`Error.isError`, `Array.fromAsync`, `Math.sumPrecise`, `Uint8Array` Base64, iterator sequencing, upsert, `JSON.parse` source-text access) and ES2027-listed (**Temporal**, **Explicit Resource Management**, further iterator helpers). **A "finished" proposal is not the same as "shipped everywhere": runtime support, polyfill/transpile availability, Node version thresholds (for example `require(esm)`), browser timer-throttling thresholds, scheduling APIs (`scheduler.yield`, `requestIdleCallback`), `AbortSignal.any`, stream async iteration and decorators are marked *(hedged)* and must be confirmed on MDN, caniuse and Node docs before use.** The preserved original documents (02, 08) were verified against MDN as noted in their headers. Interview framing, difficulty tiers and puzzle outputs are original to this handbook; run any snippet in your target runtime before relying on it.
