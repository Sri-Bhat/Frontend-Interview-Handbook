# DSA for Frontend Engineers — Document 5: Frontend-Specific Coding

> This document is a different shape than Documents 1 through 4. [HashMap](01-hashmap-pattern.md), [Sliding Window](02-sliding-window-pattern.md), [Two Pointers](03-two-pointers-pattern.md), and [Stack](04-stack-pattern.md) each taught one algorithmic trick reused across several classic problems. This one covers a *bucket* of small utility functions that show up constantly in frontend-specific interviews — because frontend code is full of timers, caches, and ad-hoc data wrangling. What unifies **Debounce**, **Throttle**, and **Memoize** is **closures**: each needs to remember something between calls (a timer ID, a flag, a cache) without a class or a global variable. The rest — **Deep Clone**, **Flatten Array**, **Group By**, **Remove Duplicates**, **Frequency Counter** — are data-transformation problems that mostly reuse techniques already covered elsewhere in this series: recursion and single-pass counting.

## Table of Contents

1. [Quick Summary — Frontend-Specific Coding](#quick-summary--frontend-specific-coding)
2. [Why This Is a Different Kind of Pattern](#why-this-is-a-different-kind-of-pattern)
3. [The Core Idea: Closures for Private State](#the-core-idea-closures-for-private-state)
4. [Problem 1: Debounce](#problem-1-debounce)
5. [Problem 2: Throttle](#problem-2-throttle)
6. [Problem 3: Memoize](#problem-3-memoize)
7. [Problem 4: Deep Clone](#problem-4-deep-clone)
8. [Problem 5: Flatten Array](#problem-5-flatten-array)
9. [Problem 6: Group By](#problem-6-group-by)
10. [Problem 7: Remove Duplicates](#problem-7-remove-duplicates)
11. [Problem 8: Frequency Counter](#problem-8-frequency-counter)
12. [The General Approach: How To Solve Any Frontend-Specific Coding Problem](#the-general-approach-how-to-solve-any-frontend-specific-coding-problem)
13. [Rapid-Fire Interview Q&A](#rapid-fire-interview-qa)
14. [Key Terms Glossary](#key-terms-glossary)
15. [Further Reading](#further-reading)

---

## Quick Summary — Frontend-Specific Coding

| Problem | Core technique | Complexity |
|---|---|---|
| Debounce | Closure-held timer ID; reset on every call, fire only after a pause | O(1) work per call |
| Throttle | Closure-held boolean flag; fire immediately, then ignore until cooldown ends | O(1) work per call |
| Memoize | Closure-held `Map` cache keyed by serialized arguments | O(1) average per call after the first |
| Deep Clone | Recursion: clone arrays/objects field-by-field, return primitives as-is | O(n) time/space |
| Flatten Array | Recursion: push primitives, recurse + spread into nested arrays | O(n) time/space |
| Group By | Single pass; build an object keyed by a computed group value | O(n) time, O(n) space |
| Remove Duplicates | `Set` for primitives; seen-keys `Set` + `filter` for objects | O(n) time, O(n) space |
| Frequency Counter | Single pass; `Map` counts occurrences by key | O(n) time, O(k) space |

---

## Why This Is a Different Kind of Pattern

These eight problems don't share one single algorithmic trick the way the previous four documents did. They're grouped because they're the "write a small utility function from scratch" questions that show up specifically in frontend interviews: Debounce for search-as-you-type inputs, Throttle for scroll/resize handlers, Memoize for avoiding expensive recomputation, Deep Clone for safely updating nested state, and Flatten/Group By/Remove Duplicates/Frequency Counter for everyday data wrangling. The first three share a real throughline (closures); the last five mostly reuse recursion and single-pass counting — techniques this series has already built up.

---

## The Core Idea: Closures for Private State

A closure is a function bundled together with references to the surrounding variables it was created alongside — its *lexical environment*. Once a function is returned from another function, it keeps access to that outer function's local variables even after the outer function has already finished running:

```js
function makeCounter() {
  let count = 0; // private state, invisible from outside this function

  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
```

`count` isn't a class field, and it isn't global — it only exists inside the closure `makeCounter()` created. This is exactly the mechanism Debounce, Throttle, and Memoize rely on: each returns a wrapper function that privately remembers a timer ID, a boolean flag, or a cache, across every call to the wrapper.

---

## Problem 1: Debounce

**Problem statement:** Implement `debounce(fn, delay)`, returning a new function. However many times the returned function is called, `fn` should only actually run once no new call has come in for `delay` milliseconds. Classic use case: a search-as-you-type input that shouldn't fire a request on every keystroke, only once the user pauses typing.

```text
Calls at t=0ms, t=100ms, t=200ms, with delay=300ms
Only the LAST call's timer survives → fn fires once, at t=500ms (200 + 300)
```

**Approach:** a closure holds a single `timeoutId`. Every call clears whatever timer is currently pending and starts a new one; `fn` only runs if a timer is ever allowed to finish uninterrupted.

```js
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

The returned wrapper is a regular `function`, not an arrow function, so it has its own `this` determined by how it's called (e.g. as an event handler, `this` is the element) — `fn.apply(this, args)` forwards that exact `this` through to `fn`. The `setTimeout` callback itself *is* an arrow function, so it inherits `this` from the wrapper rather than getting `globalThis` (the default for a non-arrow callback passed to `setTimeout()`).

**Trace:** calls at `t=0`, `t=100`, `t=200`, `delay=300`. `t=0`: nothing pending to clear; schedule fire at `t=300`. `t=100`: cancels the `t=300` timer; schedules a new one for `t=400`. `t=200`: cancels the `t=400` timer; schedules a new one for `t=500`. No further calls arrive, so the `t=500` timer fires and `fn` runs exactly once, with the arguments from the `t=200` call. ✓

**Complexity:** O(1) work per call (clear + reschedule one timer); `fn` runs at most once per burst of calls.

**Edge cases:**
- **Only one call ever happens** → nothing to clear, the timer simply fires after `delay`.
- **`delay = 0`** → still asynchronous, not immediate — `setTimeout(fn, 0)` is queued to run after the current call stack clears, never synchronously.
- **Common follow-up — "leading edge" debounce:** some use cases (e.g. a submit button) want the *first* call to fire immediately, then ignore a burst, rather than waiting for silence. That's a one-flag variation: track whether a timer is already pending; if not, call `fn` immediately and still schedule a timer to reset the flag.

---

## Problem 2: Throttle

**Problem statement:** Implement `throttle(fn, limit)` so `fn` executes at most once every `limit` milliseconds, no matter how many times the returned function is called — firing immediately on the first call, then ignoring calls until the cooldown passes. Classic use case: a scroll handler that shouldn't run expensive layout work on every single scroll event.

```text
Calls at t=0, 30, 60, 90, 120, 150ms, with limit=100ms
Fires at t=0 and t=120 only
```

**Approach:** a closure holds a boolean flag, `inThrottle`. On a call, if not currently throttled, run `fn` immediately and start a cooldown timer that clears the flag after `limit` ms. Any call made while the flag is set is silently dropped.

```js
function throttle(fn, limit) {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
```

**Trace:** `limit=100`, calls at `t=0,30,60,90,120,150`. `t=0`: not throttled → fire `fn`; set `inThrottle=true`; schedule reset at `t=100`. `t=30,60,90`: throttled → ignored. `t=100`: scheduled reset runs → `inThrottle=false`. `t=120`: not throttled → fire `fn`; set `inThrottle=true`; schedule reset at `t=220`. `t=150`: throttled → ignored. Result: `fn` fires at `t=0` and `t=120` only. ✓

**Complexity:** O(1) work per call.

**Edge cases:**
- **Calls stop entirely after the first one** → `fn` still only ran once; the pending reset timer simply does nothing observable when it fires.
- **Only one call ever happens** → fires immediately, same as any other first call.

**Debounce vs. Throttle — the #1 follow-up question:**

| | Debounce | Throttle |
|---|---|---|
| When does `fn` run? | Only after calls stop for `delay` ms | At most once every `limit` ms, while calls keep coming |
| First call | Delayed | Immediate (leading edge) |
| Best for | Search-as-you-type, resize-end, form validation | Scroll handlers, drag handlers, rate-limited API calls |
| Closure holds | A single `timeoutId`, reset every call | A boolean flag, reset by its own timer |

---

## Problem 3: Memoize

**Problem statement:** Implement `memoize(fn)`, wrapping an expensive, pure function so repeated calls with the same arguments return a cached result instead of recomputing it.

```text
const fastSquare = memoize((n) => n * n); // pretend n * n is expensive
fastSquare(5); // computes, caches, returns 25
fastSquare(5); // returns the cached 25 instantly, doesn't recompute
```

**Approach:** a closure holds a `Map` cache. Serialize the arguments into a single string key, check the cache before calling `fn`, and store the result after.

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

**Trace:** `fastSquare(5)` → key `"[5]"`, not cached → compute `25`, `cache.set("[5]", 25)`, return `25`. `fastSquare(5)` again → key `"[5]"`, cache hit → return `25` without recomputing. ✓

**Complexity:** O(1) average per call after the first (a `Map` lookup), versus recomputing every time.

**Edge cases / limitations of the `JSON.stringify` key:**
- **Key order matters for object arguments** — `fastFn({a: 1, b: 2})` and `fastFn({b: 2, a: 1})` are the "same" input logically, but stringify to different keys, so they'd incorrectly be treated as separate cache entries.
- **`NaN` and `null` collide** — confirmed directly from MDN's own example, `JSON.stringify([NaN, null, Infinity])` produces `'[null,null,null]'`. That means `memoizedFn(NaN)` and `memoizedFn(null)` generate the *identical* cache key (`"[null]"`) and would incorrectly share a cached result.
- **Functions, `undefined`, and symbols as arguments** are dropped or nulled by `JSON.stringify`, so calls with different function arguments could produce identical keys.
- Stating this limitation out loud, rather than silently assuming `JSON.stringify` is a perfect key, is exactly what separates a strong answer from an average one.

---

## Problem 4: Deep Clone

**Problem statement:** Implement `deepClone(value)`, returning a fully independent copy of a nested object/array — mutating the clone must never affect the original, however deeply nested the structure is. Afterward: discuss the limitations.

```text
const original = { a: 1, b: { c: 2, d: [3, 4] } };
const clone = deepClone(original);
clone.b.d.push(5);
original.b.d; // still [3, 4] — unaffected by the clone's mutation
```

**Approach:** recursion. Primitives (and `null`) are returned as-is — copying them is meaningless, since they're already immutable values. Arrays are cloned by recursively cloning each element. Plain objects are cloned by recursively cloning each own enumerable property.

```js
function deepClone(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  const result = {};
  for (const key in value) {
    if (Object.hasOwn(value, key)) {
      result[key] = deepClone(value[key]);
    }
  }
  return result;
}
```

`Object.hasOwn(value, key)` filters the `for...in` loop down to the object's own properties, skipping anything inherited through the prototype chain — the same guard used in [Document 1's HashMap problems](01-hashmap-pattern.md).

**Trace:** `{a: 1, b: {c: 2, d: [3, 4]}}` → loop keys `a`, `b`. `a`: `deepClone(1)` → `1` (primitive) → `result.a = 1`. `b`: `deepClone({c: 2, d: [3, 4]})` → recurse → loop keys `c`, `d`. `c`: `deepClone(2) = 2`. `d`: `deepClone([3, 4])` → `Array.isArray` true → `[3, 4].map(deepClone)` → a brand-new array `[3, 4]`. Returns a brand-new object `{c: 2, d: [3, 4]}` → `result.b = {c: 2, d: [3, 4]}`. Final clone has identical values, but every nested object/array is a distinct reference from the original — `clone.b.d.push(5)` only changes the clone's array. ✓

**Complexity:** O(n) time and space, where n is the total number of nested values (every value is visited and copied exactly once).

**Limitations (the part of this question interviewers usually care about most):**
- **Circular references** aren't handled — a self-referencing object would recurse forever and crash with a stack overflow. Fixing this requires tracking already-cloned objects in a `WeakMap` (original → clone) and reusing the existing clone if one's already in progress.
- **Special object types lose their identity.** `Date`, `RegExp`, `Map`, and `Set` all have `typeof value === 'object'`, so they fall into the "plain object" branch above — a `for...in` loop doesn't iterate a `Map`/`Set`'s entries at all (they aren't enumerable own properties), and a cloned `Date` would just become a plain `{}` with none of its `Date` methods.
- **Functions are not cloned, only referenced.** `typeof fn === 'function'`, not `'object'`, so a function hits the base case and is returned directly — shared between `original` and `clone`, not duplicated. This is usually the *desired* behavior, but worth stating explicitly.
- **The "quick trick" `JSON.parse(JSON.stringify(obj))` is even more limited**: it throws on circular references (rather than hanging), silently drops `undefined` values and functions entirely, and turns `Date` objects into plain ISO-format strings instead of preserving them in any form.
- **The modern built-in alternative is `structuredClone(obj)`** — confirmed via MDN, it natively supports circular references (its own example shows `clone.itself === clone` holding true after cloning a self-referencing object) and handles `Date`/`RegExp`/`Map`/`Set` correctly. Its limitation runs the other direction: it throws a `DataCloneError` on anything that isn't structured-cloneable at all — functions being the most common example — whereas the recursive version above silently shares the function reference instead of failing. Naming `structuredClone()` as "what I'd use in production today," after implementing the recursive version by hand, is usually exactly what the interviewer wants to hear.

---

## Problem 5: Flatten Array

**Problem statement:** Given a nested array, flatten it to a single level, regardless of nesting depth.

```text
Input:  [1, [2, [3, 4]], 5]
Output: [1, 2, 3, 4, 5]
```

**Approach:** recursion. Walk the array; for each item, if it's itself an array, recursively flatten it and spread the result in; otherwise push the item directly.

```js
function flattenArray(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
}
```

**Trace:** `[1, [2, [3, 4]], 5]` → `1`: push → `[1]`. `[2, [3, 4]]`: is an array → recurse: `2`: push; `[3, 4]`: is an array → recurse → `[3, 4]`; spread in → `[2, 3, 4]` → returned to the top level → spread into `result` → `[1, 2, 3, 4]`. `5`: push → `[1, 2, 3, 4, 5]`. ✓

**Complexity:** O(n) time and space, where n is the total number of elements across all nesting levels.

**Edge cases:**
- **Already-flat array** → every item hits the `else` branch, returns an equivalent (but new) array.
- **Empty nested arrays** (e.g. `[1, [], 2]`) → recursing into `[]` returns `[]`, spreading it in is a harmless no-op → correctly produces `[1, 2]`.

**Built-in alternative:** `arr.flat(Infinity)` does this in one call — confirmed via MDN, the `depth` parameter defaults to `1` but accepts `Infinity` to flatten arbitrarily deep nesting. Interviewers ask this question specifically to see the recursive version, but mentioning the built-in afterward shows awareness of the platform.

---

## Problem 6: Group By

**Problem statement:** Given an array of objects, group them by a key, returning an object whose keys are the group values and whose values are arrays of the matching items.

```text
Input:  [{name:"A",team:"frontend"},{name:"B",team:"backend"},{name:"C",team:"frontend"}]
Output: { frontend: [{name:"A",...}, {name:"C",...}], backend: [{name:"B",...}] }
```

**Approach:** single pass. For each item, compute its group key; start a new array for that key if it hasn't been seen yet; push the item in.

```js
function groupBy(items, keyFn) {
  const result = {};

  for (const item of items) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
}

// usage:
groupBy(people, (person) => person.team);
```

**Trace:** `A` (`team:"frontend"`): key not in `result` → `result.frontend = [A]`. `B` (`team:"backend"`): key not in `result` → `result.backend = [B]`. `C` (`team:"frontend"`): key already exists → `result.frontend = [A, C]`. Final: `{frontend: [A, C], backend: [B]}`. ✓ Matches the expected output exactly.

**Complexity:** O(n) time (one pass), O(n) space (every input item ends up in exactly one output array).

**Edge cases:**
- **Empty input array** → returns `{}`.
- **All items share the same key** → a single group containing every item.
- **Key function returns values that collide when coerced to a string** (e.g. keys `1` and `"1"`) → object keys are always strings, so both land in the same group — worth calling out with mixed-type keys.

**Built-in alternative:** `Object.groupBy(items, callbackFn)` — confirmed via MDN — does exactly this, with one notable difference: it returns a **null-prototype object** (no inherited `Object.prototype` methods) rather than a plain `{}`, a deliberate safety choice so a group name like `"toString"` can't collide with an inherited property. For keys that aren't strings, MDN points to a sibling `Map.groupBy()`, returning a `Map` instead so any value can be a group key.

---

## Problem 7: Remove Duplicates

**Problem statement:** Remove duplicate values from an array — first for primitives (numbers/strings), then for an array of objects where "duplicate" means matching properties, not matching reference.

**Primitives** are trivial — a `Set` only ever stores one copy of each distinct value:

```js
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
```

**Trace:** `[1, 2, 2, 3, 1, 4]` → `new Set(...)` collapses to `{1, 2, 3, 4}` (insertion order preserved) → spread → `[1, 2, 3, 4]`. ✓

**Objects are different:** two distinct object instances with identical-looking properties are not the same reference, so `new Set([...])` would keep both. The fix: track "seen" keys (a serialized form, or a stable unique field like `id`) and `filter()` down to only the first occurrence of each key.

```js
function removeDuplicateObjects(arr, keyFn = JSON.stringify) {
  const seen = new Set();

  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
```

**Trace:** `[{id:1,name:"A"},{id:2,name:"B"},{id:1,name:"A"}]`. Item 1: key not seen → keep, add to `seen`. Item 2: key not seen → keep, add. Item 3: identical stringified key to item 1 → already seen → drop. Result: `[{id:1,name:"A"},{id:2,name:"B"}]`. ✓

**Complexity:** O(n) time and space for both versions.

**Edge cases / limitations:**
- **The same `JSON.stringify` key-order gotcha from Memoize applies here** — `{id:1,name:"A"}` and `{name:"A",id:1}` are the same logical object but stringify to different keys, so they would NOT be deduplicated against each other with the default `keyFn`.
- **When a stable unique field exists** (like `id`), passing `keyFn = (item) => item.id` sidesteps the key-order problem entirely and is cheaper than stringifying the whole object.

---

## Problem 8: Frequency Counter

**Problem statement:** Count how many times each distinct value appears in a collection — the building block behind anagram checks, "first non-repeating element," "most frequent element," and many other variations. This is the same technique as [Document 1's Frequency of Elements problem](01-hashmap-pattern.md#problem-3-frequency-of-elements) — included here as a quick-reference recipe rather than repeated in full depth.

```js
function frequencyCounter(items) {
  const counts = new Map();

  for (const item of items) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }

  return counts;
}
```

**Trace:** `frequencyCounter(['a', 'b', 'a', 'c', 'b', 'a'])` → `a`→1, `b`→1, `a`→2, `c`→1, `b`→2, `a`→3. Final: `Map { a: 3, b: 2, c: 1 }`. ✓

**Complexity:** O(n) time, O(k) space, where k is the number of distinct values.

**Recognizing when this is the answer:** any problem asking "how many times does X appear," "which element appears most/least," or "are these two collections anagrams of each other" is almost always this one-pass counting loop — see Document 1 for five fully worked examples.

---

## The General Approach: How To Solve Any Frontend-Specific Coding Problem

1. **Decide if this is a "remember something between calls" problem or a "transform this data once" problem.** Debounce/Throttle/Memoize are the first kind — they need a closure holding private state that survives between separate calls to the returned function. Deep Clone/Flatten/Group By/Remove Duplicates/Frequency Counter are the second kind — one call processes the whole input and returns a finished result.
2. **For "remember between calls" problems, decide exactly what the private state is and how it resets:** a timer ID that gets cleared and replaced (Debounce), a boolean flag cleared by its own timer (Throttle), or a cache that only ever grows (Memoize).
3. **For recursive data-transformation problems (Deep Clone, Flatten), write the base case first:** what's the smallest input needing no recursion (a primitive; a non-array item)? Then handle the recursive case assuming the function already works on smaller/nested inputs.
4. **For single-pass data-transformation problems (Group By, Remove Duplicates, Frequency Counter), the real question is "what is my key?"** — once that's decided, the looping mechanics (build an object/Map/Set keyed by it) are nearly identical across all three.
5. **Whenever a key is generated by serializing a value** (`JSON.stringify` for Memoize's cache key or an object's dedup key), **state its limitations out loud**: key-order sensitivity for objects, and values like `NaN`/`null` or functions/`undefined` that collide or get silently dropped.
6. **Name the built-in alternative if one exists** (`structuredClone()`, `arr.flat(Infinity)`, `Object.groupBy()`) — interviewers are usually testing whether you can implement the mechanism by hand, but knowing the modern shortcut (and its own limitations) afterward is a strong signal.

---

## Rapid-Fire Interview Q&A

**Q: Why does debounce's returned function need to be a regular `function`, not an arrow function?**
A regular function has its own `this`, determined by how it's called at the call site — `fn.apply(this, args)` then forwards that exact `this` through. An arrow function would permanently capture `this` from wherever `debounce()` itself was defined, which is almost never what's wanted.

**Q: Why does throttle fire on the leading edge (immediately) while debounce fires on the trailing edge (after a pause)?**
They solve different problems. Throttle guarantees a maximum rate while calls keep coming — firing immediately and then enforcing a cooldown satisfies that. Debounce guarantees "wait until the user stops," which is only knowable in hindsight, after a gap has actually passed.

**Q: Why is `JSON.stringify(args)` a flawed cache key for memoize, and what's a better alternative for a single primitive argument?**
It's order-sensitive for object arguments and collapses distinct values like `NaN`/`null` to the same string. For a single primitive argument, using the value itself as a `Map` key — no stringification at all — sidesteps both problems.

**Q: Why does `deepClone` return functions by reference instead of cloning them?**
A function's `typeof` is `'function'`, not `'object'`, so it falls into the primitive/base-case branch and is returned directly — which is also the right behavior in practice, since functions aren't usually meant to be duplicated.

**Q: What's the key difference between the recursive `deepClone` and `structuredClone()`?**
`structuredClone()` natively supports circular references and built-in types like `Date`/`Map`/`Set`, but throws a `DataCloneError` on anything non-serializable, like functions. The hand-written recursive version does the opposite: it quietly shares function references instead of crashing, but has no circular-reference protection at all.

**Q: Why does `Object.groupBy()` return a null-prototype object instead of a plain `{}`?**
So a group name that happens to match an inherited property name (like `"toString"` or `"constructor"`) can't collide with or be shadowed by something already on `Object.prototype`.

**Q: Why can't a plain `Set` dedupe an array of objects with identical-looking properties?**
A `Set` only recognizes two values as duplicates if they're the exact same reference (or an identical primitive) — two separately created objects with matching properties are still two different references, so a `Set` keeps both.

---

## Key Terms Glossary

- **Closure** — a function bundled together with references to the surrounding variables it was created alongside (its lexical environment), letting it remember and modify that state across separate calls.
- **Leading edge / trailing edge** — whether a rate-limited function fires at the *start* of a burst of calls (leading, as in Throttle) or only *after* the burst ends (trailing, as in Debounce).
- **Memoization** — caching the result of a function call so a repeated call with the same arguments returns the cached value instead of recomputing it.
- **Structured clone algorithm** — the browser/JS-engine-native algorithm (exposed via `structuredClone()`) for deep-copying values, including circular references and built-in types like `Date`/`Map`/`Set`.
- **Null-prototype object** — an object created without inheriting from `Object.prototype` (e.g. via `Object.create(null)`, or returned by `Object.groupBy()`), so it has no inherited methods like `toString()` to accidentally collide with.

---

## Further Reading

- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN: structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)
- [MDN: JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [MDN: Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [MDN: Object.groupBy()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)
- [MDN: setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)
- [MDN: Object.hasOwn()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
