# DSA for Frontend Engineers — The HashMap Pattern

> The HashMap (hash table) is usually the very first *pattern* taught in coding interview prep, because a huge share of "can you optimize this?" questions boil down to the same trick: trade a bit of memory for a lookup structure so you stop re-scanning the same data again and again. This document covers the core idea, how to reach for `Map` / `Set` / `Object` in JavaScript, five classic interview problems solved end-to-end, and a repeatable framework for recognizing this pattern on a problem you've never seen before.

## Table of Contents

1. [Quick Summary — The HashMap Pattern](#quick-summary--the-hashmap-pattern)
2. [Why HashMap Is Your First Pattern](#why-hashmap-is-your-first-pattern)
3. [The Core Idea: Trading Space for Time](#the-core-idea-trading-space-for-time)
4. [HashMap in JavaScript: Object vs Map vs Set](#hashmap-in-javascript-object-vs-map-vs-set)
5. [Problem 1: Two Sum](#problem-1-two-sum)
6. [Problem 2: First Non-Repeating Character](#problem-2-first-non-repeating-character)
7. [Problem 3: Frequency of Elements](#problem-3-frequency-of-elements)
8. [Problem 4: Find Duplicates](#problem-4-find-duplicates)
9. [Problem 5: Intersection of Two Arrays](#problem-5-intersection-of-two-arrays)
10. [The General Approach: How To Solve Any HashMap Problem](#the-general-approach-how-to-solve-any-hashmap-problem)
11. [Rapid-Fire Interview Q&A](#rapid-fire-interview-qa)
12. [Key Terms Glossary](#key-terms-glossary)
13. [Further Reading](#further-reading)

---

## Quick Summary — The HashMap Pattern

| Signal in the problem statement | Structure to reach for | Why it works |
|---|---|---|
| "Does X exist?" / "Have I seen X before?" | `Set` | O(1) average membership check instead of O(n) scanning |
| "How many times does X occur?" | `Map<value, count>` | O(1) average increment/lookup per element, one pass |
| "Find a pair/complement that satisfies a condition" | `Map<value, index>` | O(1) complement lookup turns an O(n²) nested loop into O(n) |
| "First / only element with some property" | `Map` built in pass 1, read in pass 2 | You need information about the *whole* collection before you can answer for any single element |
| "What's common / different between two collections?" | `Set` (plus a second `Set` for the result) | O(1) cross-collection lookup instead of nested-loop comparison |

The one-sentence version: **whenever your brute-force solution's inner loop is "search for something in the rest of the data," a hash-based structure almost always turns that search into an O(1) lookup.**

---

## Why HashMap Is Your First Pattern

Interview prep is usually organized around *patterns* — reusable strategies that, once recognized, solve a large family of problems rather than one specific problem. HashMap (hash table) is typically pattern #1 because:

- It has the **highest "problems solved per hour studied" ratio** of any pattern — an enormous number of "optimize this" interview questions reduce to the same core trick.
- It's a **direct upgrade path** from the brute-force solution most people find naturally: instead of nesting a second loop to search, you build a lookup structure as you go.
- It **shows up as a building block inside other patterns** (sliding window, two pointers, graph traversal visited-sets, memoization) — so understanding it well pays off even in problems that aren't "HashMap problems" on the surface.

If you can reliably spot *when* to reach for a `Map`/`Set` and *what* to store in it, you've covered a large fraction of "easy" and "medium" interview questions before learning anything else.

---

## The Core Idea: Trading Space for Time

A hash table maps **keys to values** by computing a hash of the key and using it to jump (close to) directly to the right storage bucket — rather than scanning every element to find a match. That gives:

- **Average O(1)** time for insert, lookup, and delete.
- **O(n) extra space** to store the keys/values.
- **Worst-case O(n)** lookup if many keys collide into the same bucket, but this is rare with modern engines' hashing and is treated as O(1) average in interviews unless you're specifically asked about worst-case guarantees.

The transformation you're looking for in almost every one of these problems:

```text
Brute force:            for each element, loop over the rest of the array to compare  →  O(n²) time, O(1) space
HashMap optimization:    for each element, look it up in a map built as you go         →  O(n) time,  O(n) space
```

You are **not** making the algorithm "smarter" — you're pre-paying with memory so that a repeated search becomes a single lookup.

---

## HashMap in JavaScript: Object vs Map vs Set

JavaScript doesn't have a single thing literally named "HashMap" — you build this pattern with `Map`, `Set`, or a plain `Object`:

| | `Object` | `Map` | `Set` |
|---|---|---|---|
| Stores | key → value | key → value | unique values only |
| Key types | String or Symbol only | **Any** value, including objects/NaN | N/A (values can be any type) |
| Existence check | `Object.hasOwn(obj, key)` | `map.has(key)` | `set.has(value)` |
| Count / size | `Object.keys(obj).length` | `map.size` | `set.size` |
| Iteration order | Insertion order, **except** integer-like keys sort first | Guaranteed insertion order | Guaranteed insertion order |
| Prototype-pollution risk | Yes (`"constructor"`, `"toString"` etc. are inherited keys) — mitigate with `Object.create(null)` or `Object.hasOwn()` | No | No |

**Default recommendation for interviews: reach for `Map` (for key→value pattern problems) or `Set` (for existence-only problems) first.** They're explicit about what they are, have no accidental-key-collision foot-guns, and interviewers rarely penalize you for not using a plain object — using `Map`/`Set` correctly is usually read as a positive signal, not a negative one.

---

## Problem 1: Two Sum

**Problem statement:** Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. You may assume each input has exactly one valid answer, and you cannot use the same array element twice.

```text
Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]            // because nums[0] + nums[1] === 2 + 7 === 9
```

**Brute force:** two nested loops checking every pair — O(n²) time, O(1) space.

**HashMap approach:** walk the array once. For each number, compute its *complement* (`target - nums[i]`). If that complement is already in the map, you've found your pair — return immediately. Otherwise, record the current number's index in the map and keep going.

```js
function twoSum(nums, target) {
  const seenIndexByValue = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seenIndexByValue.has(complement)) {
      return [seenIndexByValue.get(complement), i];
    }
    seenIndexByValue.set(nums[i], i);
  }
  return []; // no valid pair found
}
```

**Complexity:** O(n) time, O(n) space.

**Edge cases:**
- **Duplicate values**, e.g. `nums = [3, 3]`, `target = 6` → checking the complement *before* inserting the current value means a number only pairs with an *earlier occurrence* of itself, never with itself in the same iteration.
- **Negative numbers and zero** work automatically — `Map` keys can be any value, with no special-casing needed.
- **No valid pair** — decide up front whether to return `[]`, `null`, or throw; the problem's "exactly one solution guaranteed" framing means this branch is mostly defensive.

---

## Problem 2: First Non-Repeating Character

**Problem statement:** Given a string `s`, return the index of the first character that appears exactly once. If every character repeats, return `-1`.

```text
Input:  s = "loveleetcode"
Output: 2                 // 'v' is the first character that appears exactly once
```

**Brute force:** for each character, scan the whole string counting its occurrences — O(n²) time.

**HashMap approach:** this one genuinely needs **two passes**, because you can't know whether the *first* character is unique until you've seen the *whole* string.

1. **Pass 1** — build a frequency map of every character.
2. **Pass 2** — walk the string again in order, and return the index of the first character whose count is `1`.

```js
function firstUniqChar(s) {
  const counts = new Map();
  for (const char of s) {
    counts.set(char, (counts.get(char) || 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (counts.get(s[i]) === 1) return i;
  }
  return -1;
}
```

**Complexity:** O(n) time (two linear passes is still O(n), not O(n²)). Space is O(k) where k is the number of distinct characters — often treated as O(1) for a fixed alphabet (e.g. lowercase a–z), but O(n) in the general/Unicode case.

**Edge cases:**
- **Empty string** → return `-1` immediately (no characters to check).
- **Every character repeats** (e.g. `"aabb"`) → falls through to `-1`.
- **Case sensitivity** — `'A'` and `'a'` are different map keys by default; clarify with the interviewer if the problem means case-insensitive uniqueness.

---

## Problem 3: Frequency of Elements

**Problem statement:** Given an array of elements, return the frequency (occurrence count) of every distinct element. A common follow-up: also return the most frequent element.

```text
Input:  [1, 2, 2, 3, 3, 3]
Output: Map { 1 → 1, 2 → 2, 3 → 3 }     // most frequent: 3
```

**Approach:** a single pass building `Map<element, count>`. For the "most frequent" follow-up, track a running max *while building* the map — no second pass required.

```js
function elementFrequency(items) {
  const frequency = new Map();
  for (const item of items) {
    frequency.set(item, (frequency.get(item) || 0) + 1);
  }
  return frequency;
}

function mostFrequent(items) {
  const frequency = elementFrequency(items);
  let best = null;
  let bestCount = 0;
  for (const [item, count] of frequency) {
    if (count > bestCount) {
      best = item;
      bestCount = count;
    }
  }
  return best;
}
```

**Complexity:** O(n) time, O(k) space (k = number of distinct elements).

**Edge cases:**
- **Empty array** → empty map; `mostFrequent` returns `null`.
- **Ties** — using strict `>` (not `>=`) means the *first* element to reach the maximum count keeps the title, since `Map` iterates in insertion order. If the problem wants "all elements tied for most frequent," collect every item matching `bestCount` instead of just one.

---

## Problem 4: Find Duplicates

**Problem statement:** Given an array, return every element that appears more than once — each duplicate reported only once, regardless of how many extra times it repeats.

```text
Input:  [1, 2, 3, 2, 4, 3, 5]
Output: [2, 3]
```

**Approach:** keep two `Set`s while making a single pass — one for values already `seen`, one for confirmed `duplicates`. If a value is already in `seen` when you encounter it again, it belongs in `duplicates`.

```js
function findDuplicates(items) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of items) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  return [...duplicates];
}
```

**Complexity:** O(n) time, O(n) space worst case (e.g. every element is unique).

**Edge cases:**
- **No duplicates** → returns `[]`.
- **One value repeated many times** → still appears only once in the output, because `duplicates` is a `Set`.
- **Output order** follows the order values were *confirmed as duplicates*, not necessarily their original array order — call this out if the problem requires a specific output order.
- **Bonus/follow-up:** if the array is constrained to values in range `[1, n]` (a common twist), there's an O(1)-extra-space trick using the array itself as a hash table (negating values at visited indexes) — worth mentioning you know it exists, but the `Set`-based version above is the general-purpose answer to lead with.

---

## Problem 5: Intersection of Two Arrays

**Problem statement:** Given two arrays, return their intersection — the unique elements present in **both** arrays. Each element should appear only once in the result, regardless of how many times it's repeated in either input.

```text
Input:  nums1 = [1, 2, 2, 1], nums2 = [2, 2]
Output: [2]
```

**Approach:** convert the first array to a `Set` (this also dedupes it for free). Walk the second array; any element found in the first `Set` gets added to a `result` `Set` (which dedupes the output automatically too).

```js
function intersection(nums1, nums2) {
  const firstSet = new Set(nums1);
  const result = new Set();
  for (const num of nums2) {
    if (firstSet.has(num)) {
      result.add(num);
    }
  }
  return [...result];
}
```

**Complexity:** O(n + m) time (n, m = lengths of the two arrays), O(n) space for `firstSet`.

**Edge cases:**
- **No overlap** → `[]`.
- **Either array empty** → `[]`.
- **Duplicates inside either input** never produce duplicates in the output — both `firstSet` and `result` are `Set`s.
- **Watch for the "Intersection II" variant**, a different (and very commonly confused) problem: it keeps duplicates up to the *minimum shared frequency* between the two arrays (e.g. `[1,2,2,1]` ∩ `[2,2]` → `[2,2]`), which needs a frequency `Map` instead of a plain `Set`. Always confirm with the interviewer whether duplicates in the result matter.

---

## The General Approach: How To Solve Any HashMap Problem

A repeatable framework for a HashMap-shaped problem you haven't seen before:

1. **State the brute force out loud first**, even though you won't write it. Most of these problems have an obvious O(n²) nested-loop or O(n log n) sort-then-scan solution. Naming it shows you *can* solve the problem, and gives you the baseline you're about to improve on.
2. **Find the repeated search.** If your brute force's inner loop is "search for X in the rest of the array/string," that's the tell — a linear search is almost always replaceable by an O(1) hash lookup.
3. **Decide what to store.**
   - Need existence only ("have I seen this?") → `Set`.
   - Need existence **plus** extra info (index, first-seen position) → `Map` with that info as the value.
   - Need a running count → `Map<value, count>`, incrementing with `map.get(x) || 0`.
4. **Decide: one pass or two?**
   - If the answer only depends on elements *before* the current one (Two Sum's complement), a **single pass** works — check, then insert, in the same loop iteration.
   - If the answer needs information about the **entire** collection before you can evaluate any single element (First Non-Repeating Character), you need **two passes**: build the map, then read it.
5. **State the complexity trade explicitly.** Say out loud: "this turns an O(n²) problem into O(n) time at the cost of O(n) space." That trade-off statement is frequently exactly what the interviewer is listening for.
6. **Check the shared edge cases:** empty input, no match found, all-duplicate input — and if your keys are objects rather than primitives, whether you need reference equality (the default, via `Map`/`Set`'s `SameValueZero` comparison) or value equality (requires keying by a derived primitive, e.g. `JSON.stringify(obj)` or a composite string, since two distinct object instances with identical contents are never equal to a `Map`/`Set`).

HashMap is the first of several reusable interview patterns (others include Two Pointers, Sliding Window, and Fast/Slow Pointers) — the same "spot the signal, pick the structure, state the trade-off" muscle you build here transfers directly to those.

---

## Rapid-Fire Interview Q&A

**Q: Why is HashMap considered the "first" pattern to learn?**
Because an unusually large share of "optimize this" interview problems reduce to the same trick: replace a repeated linear search with an O(1) hash lookup, at the cost of O(n) space.

**Q: How do you decide between `Set` and `Map` for a given problem?**
`Set`: you only need "have I seen this?" `Map`: you need to remember something *about* what you've seen — an index, a count, a first-seen position.

**Q: What's the actual complexity trade a hash table makes?**
Average O(1) lookup/insert/delete, at the cost of O(n) extra space — versus O(n) lookup and O(1) extra space for scanning a plain array.

**Q: Is HashMap lookup *guaranteed* O(1)?**
Only on average. Worst case is O(n) if many keys collide into the same bucket — rare in practice with modern engines, and treated as O(1) average unless the interviewer specifically asks about worst-case guarantees.

**Q: In Two Sum, why check for the complement *before* inserting the current number into the map?**
So a single element can't pair with itself — it can only pair with an *earlier* occurrence of the same value, which is only possible if that value legitimately appears more than once.

**Q: What's the difference between "Find Duplicates" and the classic "Contains Duplicate" problem?**
"Contains Duplicate" only needs one boolean answer, so it can short-circuit and return `true` the instant *any* repeat is found. "Find Duplicates" needs the complete list of every duplicate value, so it can't stop early.

**Q: What's the difference between "Intersection of Two Arrays" and "Intersection of Two Arrays II"?**
Plain intersection returns each shared value once (`Set`-based). The "II" variant keeps duplicates up to the minimum frequency shared between both arrays (frequency-`Map`-based) — always ask which one is wanted.

**Q: Why prefer `Map`/`Set` over a plain `Object` for this pattern in modern JavaScript?**
`Map`/`Set` accept any key type, guarantee insertion-order iteration, have an explicit `.size`, and can't be accidentally broken by a data value that collides with an inherited `Object.prototype` key name (e.g. `"constructor"`, `"toString"`).

---

## Key Terms Glossary

- **Hash table / HashMap** — a data structure mapping keys to values via a hash function, giving average O(1) insert/lookup/delete.
- **Hash collision** — when two different keys hash to the same bucket; handled internally by the engine, and the reason worst-case lookup is O(n) even though average case is O(1).
- **Time–space trade-off** — spending extra memory (a hash table) to reduce time complexity (avoiding repeated linear scans).
- **Brute force** — the naive, usually O(n²) or worse, first-pass solution to a problem; always worth stating before you optimize.
- **SameValueZero** — the equality algorithm `Map`, `Set`, and `Array.prototype.includes()` use for comparing keys/values; identical to `===` except it treats `NaN` as equal to itself.
- **Frequency map** — a `Map`/`Object` recording how many times each distinct value occurs in a collection; the backbone of Problems 2 and 3 above.
- **Complement** — in a sum-pair problem, the value that, added to the current element, equals the target (`target - nums[i]`).

---

## Further Reading

- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN: Object.hasOwn()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
- [MDN: Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- [MDN: Equality comparisons and sameness (SameValueZero)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)
