# JavaScript Interview Handbook — Document 1: Arrays, Objects, Collections & Modern Syntax Must-Knows

> Core must-know JavaScript: the Array methods you'll use in every coding interview, `Object`/`Map`/`Set` collections, the key String methods, and the modern syntax (destructuring, spread, rest, optional chaining, nullish coalescing) that shows up in almost every code sample you'll be asked to read or write.

## Table of Contents

1. [Quick Summary — Array Methods Cheat Sheet](#quick-summary--array-methods-cheat-sheet)
2. [Array Methods](#array-methods)
   - [map()](#map)
   - [filter()](#filter)
   - [reduce()](#reduce)
   - [find()](#find)
   - [some()](#some)
   - [every()](#every)
   - [sort()](#sort)
   - [flat()](#flat)
   - [flatMap()](#flatmap)
3. [Object Methods](#object-methods)
   - [Object.keys / Object.values / Object.entries](#objectkeys--objectvalues--objectentries)
4. [Map](#map-collection)
5. [Set](#set-collection)
6. [Map vs Set vs Object Cheat Sheet](#map-vs-set-vs-object-cheat-sheet)
7. [String Methods](#string-methods)
   - [split()](#split)
   - [join() — actually an Array method](#join--actually-an-array-method)
   - [includes()](#includes)
   - [substring()](#substring)
   - [slice()](#slice)
   - [slice() vs substring() Cheat Sheet](#slice-vs-substring-cheat-sheet)
8. [Destructuring](#destructuring)
9. [Spread](#spread)
10. [Rest](#rest)
11. [Spread vs Rest Cheat Sheet](#spread-vs-rest-cheat-sheet)
12. [Optional Chaining (?.)](#optional-chaining-)
13. [Nullish Coalescing (??)](#nullish-coalescing-)
14. [Rapid-Fire Interview Q&A](#rapid-fire-interview-qa)
15. [Key Terms Glossary](#key-terms-glossary)
16. [Further Reading](#further-reading)

---

## Quick Summary — Array Methods Cheat Sheet

| Method | Mutates original? | Returns | Short-circuits? | One-liner |
|---|---|---|---|---|
| `map()` | No | New array, **same** length | No | Transforms every element |
| `filter()` | No | New array, **≤** length | No | Keeps elements that pass a test |
| `reduce()` | No (you can choose to mutate the accumulator yourself) | A single accumulated value | No | Folds the array into one value |
| `find()` | No | First matching element, or `undefined` | Yes — stops at first match | "Give me the first match" |
| `some()` | No | `boolean` | Yes — stops at first `true` | "Does at least one match?" |
| `every()` | No | `boolean` | Yes — stops at first `false` | "Do *all* match?" |
| `sort()` | **Yes** | Reference to the **same** array, sorted | No | Sorts in place — default order is **string** order |
| `flat(depth = 1)` | No | New (shallow-copied) array | No | Flattens nested arrays by `depth` levels |
| `flatMap()` | No | New array | No | `map()` immediately followed by `flat(1)`, slightly more efficient |

The single most common interview trap in this table: **`sort()` is the only one of these that mutates the original array**, and its default comparator sorts by converting elements to strings — so `[1, 30, 4, 21, 100000].sort()` gives `[1, 100000, 21, 30, 4]`, **not** the numerically-sorted `[1, 4, 21, 30, 100000]` you'd expect. Always pass a compare function for numbers: `arr.sort((a, b) => a - b)`.

---

## Array Methods

### map()

Transforms every element and returns a **new array of the same length**. Does not mutate the original.

```js
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);
// doubled: [2, 4, 6]
// nums is untouched: [1, 2, 3]
```

Use `map()` when you need one output value for every input value. If you need to drop or add items, `map()` is the wrong tool — reach for `filter()` or `flatMap()` instead.

### filter()

Returns a **new array** containing only the elements for which the callback returns a truthy value. Length is `≤` the original. Does not mutate.

```js
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter((n) => n % 2 === 0);
// evens: [2, 4]
```

### reduce()

Runs a "reducer" callback over every element, carrying an **accumulator** forward, and returns a single final value. Signature: `reduce(callbackFn, initialValue)`.

```js
const total = [15, 16, 17].reduce((acc, cur) => acc + cur, 0);
// total: 48
```

Two edge cases that are genuinely tested in interviews:

- **No `initialValue` + empty array → throws `TypeError`.** `[].reduce((a, b) => a + b)` throws. `[].reduce((a, b) => a + b, 0)` safely returns `0`.
- **No `initialValue` + array of 1 element → the callback never runs**, and that single element is returned directly.

```js
[1, 100].reduce((a, b) => Math.max(a, b));       // 100 — callback runs once (for index 1)
[50].reduce((a, b) => Math.max(a, b));            // 50  — callback never runs
[].reduce((a, b) => Math.max(a, b), 1);           // 1   — callback never runs
[].reduce((a, b) => Math.max(a, b));              // TypeError: Reduce of empty array with no initial value
```

`reduce()` is powerful but easy to overuse. MDN itself recommends simpler alternatives when they exist: `flat()` to flatten, `flatMap()` to add/remove items while mapping, `Set` + `Array.from()` to dedupe, `some()`/`every()`/`find()` to search (they short-circuit; `reduce()` doesn't). Also watch out for an easy-to-miss performance trap: spreading the accumulator into a **new** object/array on every iteration (`{ ...acc, [key]: val }`) turns an O(N) reduce into O(N²) — mutate the accumulator in place instead when performance matters.

### find()

Returns the **first** element for which the callback is truthy, or `undefined` if none match. Short-circuits — stops iterating as soon as it finds a match.

```js
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const user = users.find((u) => u.id === 2);
// user: { id: 2 }
```

### some()

Returns `true` if **at least one** element passes the test, `false` otherwise. Short-circuits on the first `true`. **Returns `false` for an empty array** (there's nothing to satisfy the condition).

```js
[1, 2, 3].some((n) => n > 2); // true
[].some((n) => n > 2);        // false
```

### every()

Returns `true` only if **all** elements pass the test. Short-circuits on the first `false`. **Returns `true` for an empty array** — this is "vacuous truth" (mathematically, every element of an empty set trivially satisfies any condition), and it's a classic interview gotcha.

```js
[2, 4, 6].every((n) => n % 2 === 0); // true
[].every((n) => n % 2 === 0);        // true  <- easy to get wrong
```

### sort()

**Mutates the array in place** and also returns a reference to that same (now-sorted) array. This is the one array method in this list that genuinely mutates.

```js
const arr = [3, 1, 4, 1, 5];
const sorted = arr.sort((a, b) => a - b);
console.log(arr);    // [1, 1, 3, 4, 5] — original mutated!
console.log(sorted); // [1, 1, 3, 4, 5] — same array reference
```

**Default sort order is string/Unicode order, not numeric.** Without a compare function, elements are converted to strings and compared by UTF-16 code unit:

```js
const nums = [1, 30, 4, 21, 100000];
nums.sort();
// [1, 100000, 21, 30, 4]  <- string order, NOT the numeric [1, 4, 21, 30, 100000]
```

Always supply `(a, b) => a - b` for ascending numeric sort.

`sort()` has been **guaranteed stable** since ES2019 (equal elements keep their relative order). If you need a non-mutating sort, use `toSorted()` (newer engines) or copy first: `[...arr].sort(...)`.

```js
// Non-mutating sort
const original = [3, 1, 2];
const sortedCopy = [...original].sort((a, b) => a - b);
// original is untouched: [3, 1, 2]
```

### flat()

Returns a **new array** with nested sub-arrays flattened up to `depth` levels. Default `depth` is **1**. Does not mutate. `flat(Infinity)` fully flattens any depth.

```js
[1, 2, [3, 4]].flat();              // [1, 2, 3, 4]        (depth 1, default)
[1, [2, [3, [4]]]].flat(2);         // [1, 2, 3, [4]]       (depth 2)
[1, [2, [3, [4]]]].flat(Infinity);  // [1, 2, 3, 4]          (fully flattened)
```

### flatMap()

Equivalent to `map(callbackFn)` followed by `flat(1)`, but implemented slightly more efficiently as a single pass. Useful whenever your mapper needs to return zero, one, or multiple items per input element (which plain `map()` can't do without leaving nested arrays behind).

```js
const sentences = ["hello world", "foo"];
sentences.flatMap((s) => s.split(" "));
// ["hello", "world", "foo"]

// Removing items while mapping: return [] to drop, [x] to keep, [x, y] to expand
[5, -3, 4, -1].flatMap((n) => (n < 0 ? [] : [n]));
// [5, 4]
```

---

## Object Methods

### Object.keys / Object.values / Object.entries

All three operate on an object's **own, enumerable, string-keyed** properties only (inherited/prototype properties are excluded; `Symbol` keys are excluded).

```js
const user = { id: 42, name: "Ada", active: true };

Object.keys(user);    // ["id", "name", "active"]
Object.values(user);  // [42, "Ada", true]
Object.entries(user); // [["id", 42], ["name", "Ada"], ["active", true]]
```

**Ordering gotcha:** property order is *not* always insertion order. Keys that look like non-negative integers are listed first, in **ascending numeric order**, *before* any string keys (which follow insertion order):

```js
const obj = { 100: "a", 2: "b", 7: "c" };
Object.keys(obj); // ['2', '7', '100'] — numeric order, not insertion order!
```

A common pattern combining all three with destructuring and iteration:

```js
for (const [key, value] of Object.entries(user)) {
  console.log(`${key} = ${value}`);
}
```

---

## Map {#map-collection}

`Map` holds key-value pairs where a **key can be any value** — object, function, or primitive — not just a string (unlike plain objects, whose keys are coerced to strings or symbols).

```js
const map = new Map();
map.set("a", 1);
map.set({ x: 1 }, "object key works too");

map.get("a");  // 1
map.has("a");  // true
map.size;      // 2
map.delete("a");
```

Key facts worth memorizing:

- **Insertion order is preserved** and is the order used during iteration (`for...of`, `.forEach()`, spreading).
- **Key equality uses SameValueZero**, which means `NaN` is treated as equal to itself as a key (even though `NaN !== NaN`), and `+0`/`-0` are treated as the same key.
- `map.size` is an O(1) property; for a plain object you'd have to do `Object.keys(obj).length`.
- `Map` is directly iterable (`for (const [k, v] of map)`); plain objects are not.
- A common bug: setting properties directly on a `Map` instance (`myMap.foo = 'bar'`) does **not** interact with the Map's data at all — it just sets a regular object property. Always use `.set()`/`.get()`.

```js
const kvArray = [["key1", "value1"], ["key2", "value2"]];
const fromArray = new Map(kvArray);   // Array -> Map
const backToArray = [...fromArray];   // Map -> Array
```

---

## Set {#set-collection}

`Set` stores **unique values** of any type — the most common real-world use is deduplicating an array.

```js
const numbers = [2, 13, 4, 4, 2, 13, 5];
const unique = [...new Set(numbers)];
// [2, 13, 4, 5]
```

Key facts:

- Like `Map`, uses **SameValueZero** equality — `NaN` is equal to itself in a `Set`, so `new Set([NaN, NaN]).size === 1`.
- **Insertion order is preserved** during iteration.
- `set.has(value)` is on average faster than `Array.prototype.includes()` for checking membership once the collection is non-trivially large.
- Modern `Set` also has mathematical set operations built in: `.union()`, `.intersection()`, `.difference()`, `.symmetricDifference()`, `.isSubsetOf()`, `.isSupersetOf()`, `.isDisjointFrom()` — useful to know these exist, even if less commonly asked.

---

## Map vs Set vs Object Cheat Sheet

| | `Map` | `Set` | `Object` |
|---|---|---|---|
| Stores | Key → value pairs | Unique values | Key → value pairs |
| Key/value types | Any value as key | Any value as a member | String or Symbol keys only |
| Order | Insertion order | Insertion order | Mostly insertion order, **except** integer-like keys sort first |
| Size | `.size` property | `.size` property | `Object.keys(obj).length` |
| Directly iterable | Yes | Yes | No (`for...in` or `Object.keys/values/entries`) |
| Accidental prototype collisions | No | N/A | Yes (mitigated with `Object.create(null)`) |
| JSON serialization | Not native | Not native | Native (`JSON.stringify`) |

---

## String Methods

### split()

Splits a string into an **array** of substrings using a separator.

```js
"a,b,c".split(",");   // ["a", "b", "c"]
"hello".split("");    // ["h", "e", "l", "l", "o"]
```

### join() — actually an Array method

**Important correction worth stating out loud in an interview:** `join()` is defined on `Array.prototype`, **not** `String.prototype`. It's grouped with `split()` here because the two are natural inverses — `split()` turns a string into an array, `join()` turns an array back into a string — but there is no such thing as `someString.join()`.

```js
["a", "b", "c"].join(",");  // "a,b,c"
["a", "b", "c"].join("");   // "abc"

"a,b,c".split(",").join("-"); // "a-b-c" — round trip through an array
```

### includes()

Case-sensitive check for whether a substring exists within a string. Returns a `boolean`. (Array also has an `.includes()` for checking membership — same name, different target type.)

```js
"Hello World".includes("World"); // true
"Hello World".includes("world"); // false — case-sensitive
```

### substring()

Extracts characters between `indexStart` and `indexEnd` (exclusive of `indexEnd`).

- If `indexStart > indexEnd`, the two arguments are **swapped** — it still returns a string, never empty due to ordering.
- Negative or `NaN` arguments are **clamped to `0`**.

```js
"Mozilla".substring(1, 3);  // "oz"
"Mozilla".substring(3, 1);  // "oz"  <- arguments swapped, same result
"Mozilla".substring(-5, 2); // "Mo"  <- negative clamped to 0
```

### slice()

Also extracts a substring between two indexes, but handles negative numbers completely differently from `substring()`.

- Negative indexes count **backwards from the end** of the string.
- If `indexEnd <= indexStart` after normalizing, it returns an **empty string** (no swapping).

```js
"Mozilla".slice(1, 3);   // "oz"   — same as substring here
"Mozilla".slice(3, 1);   // ""     <- empty string, NOT swapped
"Mozilla".slice(-5, 2);  // ""     <- -5 normalizes to index 2, so start === end
"Mozilla".slice(-5, -2); // "zil"  <- both negative, counted from the end
```

### slice() vs substring() Cheat Sheet

| Scenario | `substring(5, 2)` | `slice(5, 2)` |
|---|---|---|
| `start > end` | **Swaps** args → same as `(2, 5)` | Returns `""` (no swap) |
| Negative index | **Clamped** to `0` | Counts backward from string end |
| Which to reach for | Rarely — `slice()` covers almost every real use case | Default choice for substring extraction |

The same `slice()`/`substring()` distinction also applies to **`Array.prototype.slice()`** (arrays only have `slice`, not `substring` — don't mix them up).

---

## Destructuring

Unpacks values from arrays or properties from objects into distinct variables, mirroring the shape of the literal on the left-hand side of an assignment.

```js
// Array destructuring — position-based
const [first, second] = ["one", "two"];

// Skipping elements
const [, , third] = ["a", "b", "c"];
// third: "c"

// Object destructuring — name-based
const { id, name } = { id: 42, name: "Ada" };

// Renaming while destructuring
const { id: userId } = { id: 42 };
// userId: 42

// Default values — used only when the property is undefined (NOT when it's null)
const { count = 0 } = {};           // count: 0
const { count: c2 = 0 } = { count: null }; // c2: null, default NOT applied

// Nested destructuring
const { address: { city } } = { address: { city: "NYC" } };

// Function parameter destructuring with a default for the whole object
function draw({ size = "big", coords = { x: 0, y: 0 } } = {}) { /* ... */ }
draw(); // works — the `= {}` lets you call with zero arguments
```

Swapping two variables without a temp variable:

```js
let a = 1, b = 2;
[a, b] = [b, a];
// a: 2, b: 1
```

**Gotcha:** destructuring `null` or `undefined` always throws a `TypeError`, even with an empty pattern — `const {} = null` throws.

---

## Spread

The `...` syntax **expands** an iterable (array, string, `Map`, `Set`, etc.) into individual elements/arguments/properties. Three places it's valid: function call arguments, array literals, object literals.

```js
// Function call arguments
Math.max(...[1, 5, 3]); // 5

// Array literal — copying and merging
const arr = [1, 2, 3];
const copy = [...arr];            // shallow copy
const merged = [...arr, ...[4, 5]]; // [1, 2, 3, 4, 5]

// Object literal — copying and merging (properties win left-to-right, last wins)
const obj1 = { foo: "bar", x: 42 };
const obj2 = { foo: "baz", y: 13 };
const mergedObj = { ...obj1, ...obj2 }; // { foo: "baz", x: 42, y: 13 }
```

Important nuance: spread is a **shallow copy only** — it copies one level deep. Nested objects/arrays are still shared by reference:

```js
const a = [[1], [2]];
const b = [...a];
b[0].push(99);
console.log(a[0]); // [1, 99] — the inner array is shared, not deep-copied!
```

Spread vs `Object.assign()`: spread never triggers setters and can't mutate an existing object (it always creates something new); `Object.assign(target, ...)` mutates `target` in place and does trigger setters.

---

## Rest

The `...` syntax in a **binding position** (destructuring pattern or function parameter list) does the opposite of spread: it **collects** multiple remaining values into a single array.

```js
// Rest in array destructuring
const [first, ...others] = [1, 2, 3, 4];
// first: 1, others: [2, 3, 4]

// Rest in object destructuring
const { id, ...rest } = { id: 1, name: "Ada", active: true };
// rest: { name: "Ada", active: true }

// Rest parameters in a function
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6
```

Rest parameters vs the old `arguments` object — four real differences worth quoting:

1. `arguments` is **not** a real array (no `.map()`/`.sort()` directly); a rest parameter **is** a real `Array`.
2. Rest parameters only capture the *extra* args not already bound to named parameters; `arguments` contains **all** arguments.
3. The rest parameter array never updates if a named parameter is reassigned; in non-strict mode, `arguments` indices used to stay in sync with simple named parameters.
4. `arguments` has no such restriction, but a rest parameter **must be the last parameter** and there can only be **one** per function — `function f(...a, b)` is a syntax error.

---

## Spread vs Rest Cheat Sheet

They use the exact same `...` token, which is why they're constantly confused in interviews — the distinguishing factor is **position**, not syntax:

| | Spread | Rest |
|---|---|---|
| Position | Right-hand side / call site — inside `[...]`, `{...}`, or a function **call** | Left-hand side / binding — inside a destructuring pattern or a function **definition**'s last parameter |
| Direction | **Expands** one iterable into many elements | **Collects** many elements into one array |
| Example | `fn(...args)`, `[...arr, 4]` | `const [a, ...rest] = arr`, `function f(a, ...rest) {}` |

---

## Optional Chaining (?.)

Accesses a property, array index, or calls a function — and if the reference immediately before `?.` is `null` or `undefined`, the whole expression **short-circuits to `undefined`** instead of throwing.

```js
const user = { profile: { name: "Ada" } };

user.profile?.name;        // "Ada"
user.settings?.theme;      // undefined — no error, even though `settings` doesn't exist
user.doStuff?.();          // undefined — safe call, even if `doStuff` doesn't exist
user.list?.[0];            // undefined — safe computed/array access
```

Key behaviors:

- **Short-circuits the entire remaining chain**, not just the next property: `a?.b.c.d` — if `a` is nullish, `b`, `c`, and `d` are never evaluated at all (no `TypeError` even though `.c` would normally throw on `undefined.c`).
- If the thing *before* `?.` exists but is not a function, calling it with `?.()` still throws a normal `TypeError` — optional chaining only guards against `null`/`undefined`, not "wrong type."
- **Cannot be assigned to** — `obj?.prop = 1` is a `SyntaxError`.

---

## Nullish Coalescing (??)

Returns the right-hand operand **only when** the left-hand operand is `null` or `undefined` — and that's the entire point of this operator versus `||`.

```js
const count = 0;
const text = "";

count || 42;  // 42  <- wrong! 0 is falsy, so || overrides it even though 0 is a valid value
count ?? 42;  // 0   <- correct! 0 is not nullish, so it's kept

text || "default"; // "default" <- wrong if "" is a valid value
text ?? "default"; // ""        <- correct
```

Use `??` whenever `0`, `''`, `false`, or `NaN` are legitimate values you don't want accidentally replaced by a fallback — `||` only checks truthiness (any falsy value triggers the fallback), `??` only checks nullishness.

**Gotcha:** you cannot mix `??` directly with `&&` or `||` without parentheses — `null || undefined ?? "foo"` is a `SyntaxError`. You must write `(null || undefined) ?? "foo"`.

The two operators are commonly combined — optional chaining to safely reach a value, nullish coalescing to supply a default if that value turns out to be missing:

```js
function printCity(customer) {
  console.log(customer?.address?.city ?? "Unknown city");
}
printCity({ address: { city: "Paris" } }); // "Paris"
printCity({});                             // "Unknown city"
```

---

## Rapid-Fire Interview Q&A

**Q: Does `map()` mutate the original array?**
No. It always returns a new array. Only `sort()` (among the methods in this doc) mutates in place.

**Q: What's the real difference between `find()` and `filter()`?**
`find()` returns the first **matching element itself** (or `undefined`); `filter()` returns a **new array** of all matching elements (possibly empty).

**Q: Why does `[10, 1, 2].sort()` not give `[1, 2, 10]`?**
Because without a compare function, `sort()` converts elements to strings and compares them lexicographically — `"10" < "2"` in string order. Always pass `(a, b) => a - b` for numeric sorts.

**Q: What does `flat()` do with no arguments?**
Flattens exactly **one level deep** (default `depth` is `1`), not fully — use `flat(Infinity)` to fully flatten unknown depths.

**Q: What's the difference between `flatMap()` and `.map().flat()`?**
Functionally identical (`flatMap` = `map` + `flat(1)`), but `flatMap()` does it in a single pass and is slightly more efficient.

**Q: Why would you use `Map` instead of a plain object?**
Keys can be any type (not just strings/symbols), guaranteed insertion-order iteration, an O(1) `.size`, no accidental prototype-chain key collisions, and better performance for frequent additions/removals.

**Q: Does `Set` preserve insertion order?**
Yes — both `Map` and `Set` iterate in insertion order, unlike plain objects (which sort integer-like keys first).

**Q: Is `NaN === NaN`? Then why can you store `NaN` as a `Map`/`Set` key reliably?**
`NaN === NaN` is `false`, but `Map`/`Set` use the **SameValueZero** algorithm for equality, which treats `NaN` as equal to itself. So `new Set([NaN, NaN]).size === 1`.

**Q: What's the key difference between `slice()` and `substring()` with out-of-order or negative arguments?**
`substring()` **swaps** `start`/`end` if `start > end` and **clamps** negative values to `0`. `slice()` never swaps (returns `""` if the range is invalid after normalizing) and treats negative indexes as counting backward from the end of the string.

**Q: Where does `join()` actually live — `Array` or `String`?**
`Array.prototype.join()`. There is no `String.prototype.join`.

**Q: `reduce()` without an initial value on an empty array — what happens?**
Throws a `TypeError`. Always pass an `initialValue` when the array could be empty.

**Q: Does `every()` return `true` or `false` for an empty array? What about `some()`?**
`every([]) === true` (vacuous truth — nothing violates the condition). `some([]) === false` (nothing satisfies it either).

**Q: Spread and rest use identical `...` syntax — how do you tell them apart?**
By position: on the right-hand side / in a call (`fn(...args)`, `[...arr]`) it's **spread** (expanding). On the left-hand side / in a parameter list (`const [a, ...rest] = arr`, `function f(...args)`) it's **rest** (collecting).

**Q: Does spread deep-copy nested objects/arrays?**
No — spread (and `Object.assign()`) only do a **shallow** copy. Nested objects/arrays are still shared by reference between the original and the copy.

**Q: What does optional chaining return if the object itself is `null`, versus if a deep property is simply missing?**
Both cases return `undefined` without throwing — `a?.b.c` short-circuits the *entire* remaining chain the moment `a` is found to be nullish.

**Q: Why prefer `??` over `||` for default values?**
`||` falls through on **any** falsy value (`0`, `''`, `false`, `NaN`, `null`, `undefined`), which incorrectly overrides legitimate falsy values. `??` only falls through on `null`/`undefined`.

**Q: Can you write `a ?? b || c` or `a || b ?? c`?**
No — mixing `??` with `&&`/`||` without explicit parentheses is a `SyntaxError`. Write `(a ?? b) || c` or similar.

**Q: Does destructuring a default value trigger on `null`?**
No — defaults only apply when the value is exactly `undefined` (missing or explicitly `undefined`), not when it's `null`.

---

## Key Terms Glossary

- **Mutating method** — modifies the original array/object in place (e.g. `sort()`, `push()`, `splice()`). Most array iteration methods in this doc are **non-mutating** and return a new array instead.
- **Shallow copy** — a copy where top-level properties/elements are duplicated, but nested objects/arrays are still shared by reference with the original. Spread syntax and `Object.assign()` both produce shallow copies.
- **Iterable** — any object implementing the iteration protocol (`[Symbol.iterator]`), allowing it to be used in `for...of`, spread, and destructuring. Arrays, strings, `Map`, and `Set` are iterable; plain objects are not.
- **SameValueZero** — the equality algorithm `Map` and `Set` use for key/value comparison; identical to `===` except it treats `NaN` as equal to itself.
- **Short-circuit evaluation** — stopping evaluation as soon as the result is already determined (`find`/`some`/`every` stop early; `||`/`&&`/`??` skip evaluating their right side when unnecessary).
- **Truthy / Falsy** — JavaScript's rules for how non-boolean values behave in a boolean context. The only falsy values are `false, 0, -0, 0n, "", null, undefined, NaN` — everything else is truthy.
- **Nullish** — specifically `null` or `undefined` only (a narrower category than falsy) — the exact condition `?.` and `??` both check for.
- **Accumulator** — the running "carried forward" value in `reduce()`, passed from one callback invocation to the next.
- **Callback function** — a function passed as an argument to another function (e.g., the function you pass to `map`, `filter`, `reduce`, etc.), to be invoked by that function.
- **Rest element/property** — the collected leftover values at the end of a destructuring pattern or parameter list, bound to a single array (array destructuring/parameters) or object (object destructuring).

---

## Further Reading

- [MDN: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [MDN: Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [MDN: Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [MDN: Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [MDN: Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [MDN: Array.prototype.flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
- [MDN: Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN: String.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
- [MDN: String.prototype.substring()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)
- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [MDN: Optional chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN: Nullish coalescing operator (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
