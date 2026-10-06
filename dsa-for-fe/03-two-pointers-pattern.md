# DSA for Frontend Engineers — Document 3: The Two Pointers Pattern

> Two Pointers is the natural sibling of [Sliding Window](02-sliding-window-pattern.md): both move two indices through the data instead of nesting a second loop, but Two Pointers comes in two distinct flavors — pointers that start at *opposite ends* and converge inward, and pointers that move in the *same direction* at different speeds to compact an array in place. Its headline feature compared to [HashMap](01-hashmap-pattern.md) and Sliding Window: many of these solutions need **zero extra data structures**, trading a sortedness requirement (or in-place mutation) for true O(1) space. This document covers both variants, five classic problems solved end-to-end, and a framework for recognizing which variant a new problem needs.

## Table of Contents

1. [Quick Summary — The Two Pointers Pattern](#quick-summary--the-two-pointers-pattern)
2. [Why Two Pointers Is Your Third Pattern](#why-two-pointers-is-your-third-pattern)
3. [The Core Idea: Opposite-Ends vs Same-Direction Pointers](#the-core-idea-opposite-ends-vs-same-direction-pointers)
4. [Two Pointers in JavaScript: What You Actually Need](#two-pointers-in-javascript-what-you-actually-need)
5. [Problem 1: Find Pair With Target Sum](#problem-1-find-pair-with-target-sum)
6. [Problem 2: Remove Duplicates From Sorted Array](#problem-2-remove-duplicates-from-sorted-array)
7. [Problem 3: Move Zeroes](#problem-3-move-zeroes)
8. [Problem 4: Valid Palindrome](#problem-4-valid-palindrome)
9. [Problem 5: Container With Most Water](#problem-5-container-with-most-water)
10. [The General Approach: How To Solve Any Two Pointers Problem](#the-general-approach-how-to-solve-any-two-pointers-problem)
11. [Rapid-Fire Interview Q&A](#rapid-fire-interview-qa)
12. [Key Terms Glossary](#key-terms-glossary)
13. [Further Reading](#further-reading)

---

## Quick Summary — The Two Pointers Pattern

| Signal in the problem statement | Pointer variant | What moves |
|---|---|---|
| "find a pair in a **sorted** array that…" | Opposite-ends | `left++` if the sum is too small, `right--` if too large |
| "palindrome" / compare a sequence from the outside in | Opposite-ends | both pointers move inward together on a match; skip invalid characters individually |
| "largest area / most water between two lines" | Opposite-ends (greedy) | always move the pointer at the smaller/limiting value |
| "remove / filter / compact an array in place" | Same-direction (fast-slow) | fast scans every element; slow marks the next write position |

The one-sentence version: **whenever you'd otherwise nest a second loop to search from the other end of sorted data, or shift array elements one at a time after a removal, two synchronized pointers usually replace it with O(n) time and O(1) space.**

---

## Why Two Pointers Is Your Third Pattern

- It **builds directly on Sliding Window** (Document 2) — both move two indices through data, but Two Pointers' opposite-ends variant converges inward rather than only ever expanding forward, and its fast-slow variant compacts an array in place rather than tracking a window's aggregate.
- Its headline feature versus Documents 1 and 2: many Two Pointers solutions need **no extra data structure at all** — true O(1) space, not just O(n) time. That's a strict space upgrade over HashMap's O(n) space, whenever the input is already sorted or can be mutated in place.
- It shows up constantly in two problem families: **pair-finding/comparison on sorted data**, and **in-place array mutation** (dedup, filter, reorder) without allocating a second array.

---

## The Core Idea: Opposite-Ends vs Same-Direction Pointers

"Two Pointers" actually covers two different techniques that share a name:

- **Opposite-ends (converging) pointers** — `left = 0`, `right = length - 1`, moving toward each other based on a comparison. Used for finding a pair, comparing a sequence against its own reverse (palindromes), or a greedy search for an optimal pair (container with most water). This variant typically **requires the data to be sorted** (or order-meaningful in some other way) for the "which pointer do I move" decision to actually be correct rather than a guess.
- **Same-direction (fast-slow) pointers** — both start near the beginning; `fast` scans every element, `slow` marks where the next *kept* element should be written. Used for in-place compaction: removing duplicates, filtering values, partitioning. Some fast-slow problems need sorted input for their comparison logic (Remove Duplicates); others don't care about input order at all (Move Zeroes).

```text
Brute force:               nested loop re-comparing pairs, or shifting the whole array after each removal  →  O(n²)
Two pointers (opposite):    move the pointer that can't possibly be part of a better answer                 →  O(n)
Two pointers (fast-slow):   fast visits every element once; slow only moves when an element is kept         →  O(n)
```

---

## Two Pointers in JavaScript: What You Actually Need

Just two index variables — often genuinely **no extra data structure**, which is the key difference from Documents 1 and 2 (both needed a `Map`/`Set` to track "what's been seen" or "what's in the window").

| Variant | Starting positions | Movement | Typical use |
|---|---|---|---|
| Opposite-ends | `left = 0`, `right = length - 1` | Move toward each other | Find Pair, Valid Palindrome, Container With Most Water |
| Same-direction (fast-slow) | Both at/near `0` | Both move forward; fast stays ahead of slow | Remove Duplicates, Move Zeroes |

---

## Problem 1: Find Pair With Target Sum

**Problem statement:** Given a **sorted** array of integers and a target sum, find a pair of elements that add up to the target.

```text
Input:  nums = [1, 2, 3, 4, 6], target = 6
Output: [2, 4]             // 2 + 4 === 6
```

This is the same conceptual problem as [Document 1's Two Sum](01-hashmap-pattern.md#problem-1-two-sum) — but because the array is already **sorted**, you can solve it with O(1) space instead of Document 1's O(n)-space `Map`.

**Brute force:** two nested loops checking every pair — O(n²) time.

**Two pointer approach (opposite-ends):** start `left` at the beginning and `right` at the end. If `nums[left] + nums[right]` is too small, the only way to increase it is to move `left` forward (every element to the right is `>=` the current one, since the array is sorted). If the sum is too large, move `right` backward.

```js
function findPairWithSum(sortedNums, target) {
  let left = 0;
  let right = sortedNums.length - 1;

  while (left < right) {
    const sum = sortedNums[left] + sortedNums[right];
    if (sum === target) {
      return [sortedNums[left], sortedNums[right]];
    }
    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return []; // no pair found
}
```

**Trace:** `[1,2,3,4,6]`, target `6` → `(1,6)`→sum `7` too big→`right--` → `(1,4)`→sum `5` too small→`left++` → `(2,4)`→sum `6` → match, returns `[2, 4]`.

**Complexity:** O(n) time, **O(1) space** (versus Document 1's O(n) time, O(n) space).

**Edge cases:**
- **Array must already be sorted** — if it isn't, either sort it first (O(n log n), which may erase the overall time advantage) or fall back to Document 1's HashMap approach.
- **If you do sort first**, the indices you find refer to positions in the *sorted* array, not the original — track original indices separately beforehand if the problem needs them. This is precisely why the HashMap approach (which needs no sorting) is preferable when original indices matter.
- **No pair found** → decide upfront whether to return `[]`, `null`, or throw.

---

## Problem 2: Remove Duplicates From Sorted Array

**Problem statement:** Given a **sorted** array, remove duplicates in place so each unique value appears only once, and return the count of unique values. The first *k* positions of the array should hold the unique values in order; anything beyond that doesn't matter.

```text
Input:  nums = [1, 1, 2, 2, 3]
Output: 3                      // nums now starts with [1, 2, 3, ...]
```

**Brute force:** shift every subsequent element left by one position each time a duplicate is found — O(n²) time in the worst case.

**Two pointer approach (fast-slow):** `insertPos` (slow) tracks where the next unique value should be written, starting at `1` (the first element is always unique by itself). `i` (fast) scans from index `1` onward; whenever `nums[i]` differs from the last *written* unique value, copy it to `nums[insertPos]` and advance `insertPos`.

```js
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let insertPos = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[insertPos - 1]) {
      nums[insertPos] = nums[i];
      insertPos++;
    }
  }

  return insertPos;
}
```

**Trace:** `[1,1,2,2,3]` → `i=1`: `nums[1]=1 === nums[0]=1` → skip. `i=2`: `nums[2]=2 !== nums[0]=1` → write → `[1,2,2,2,3]`, `insertPos=2`. `i=3`: `nums[3]=2 === nums[1]=2` → skip. `i=4`: `nums[4]=3 !== nums[1]=2` → write → `[1,2,3,2,3]`, `insertPos=3`. Returns `3`; first 3 elements are `[1,2,3]`. ✓

**Complexity:** O(n) time, O(1) extra space (in-place).

**Edge cases:**
- **Empty array** → guard and return `0` immediately.
- **Requires sorted input** — this is not optional. The algorithm only compares each element to the *immediately preceding unique* value, so it can only detect duplicates that are adjacent. On unsorted input like `[1, 2, 1]`, it silently returns the wrong count (`3`, as if all were unique) instead of erroring — always confirm sortedness before reaching for this exact technique.
- **All identical elements** (e.g. `[2,2,2,2]`) → `insertPos` never advances past `1`; correctly returns `1`.

---

## Problem 3: Move Zeroes

**Problem statement:** Given an array, move all zeroes to the end while preserving the relative order of the non-zero elements — in place.

```text
Input:  nums = [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

**Brute force:** repeatedly find a zero, shift everything after it left by one, and append a zero at the end — O(n²) time.

**Two pointer approach (fast-slow):** `insertPos` tracks where the next non-zero value should go. Scan with `i`; whenever `nums[i]` is non-zero, write it at `nums[insertPos]` and advance `insertPos`. Once the scan finishes, fill everything from `insertPos` to the end with `0`.

```js
function moveZeroes(nums) {
  let insertPos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos] = nums[i];
      insertPos++;
    }
  }
  for (let i = insertPos; i < nums.length; i++) {
    nums[i] = 0;
  }
}
```

**Trace:** `[0,1,0,3,12]` → non-zero pass writes `1,3,12` to positions `0,1,2` → `[1,3,12,3,12]`, `insertPos=3` → zero-fill from index `3` → `[1,3,12,0,0]`. ✓

**Complexity:** O(n) time (two linear passes), O(1) extra space.

**Edge cases:**
- **No zeroes** → `insertPos` ends at `length`; the zero-fill loop does nothing.
- **All zeroes** → `insertPos` stays `0`; the zero-fill loop rewrites every position to `0` (a harmless no-op).
- **Optimization worth mentioning:** a single-pass variant swaps `nums[insertPos]` and `nums[i]` instead of overwriting-then-refilling, avoiding the second loop entirely — same O(n) complexity class, but a nice "I know a cleaner version" detail to offer after the straightforward solution above.

---

## Problem 4: Valid Palindrome

**Problem statement:** Given a string, determine whether it reads the same forwards and backwards, considering only letters and digits and ignoring case.

```text
Input:  s = "A man, a plan, a canal: Panama"
Output: true

Input:  s = "race a car"
Output: false
```

**Brute force:** build a cleaned copy (strip non-alphanumeric characters, lowercase everything), reverse it, and compare to the original cleaned string — O(n) time, but **O(n) extra space** for the copies.

**Two pointer approach (opposite-ends):** walk `left` and `right` inward from both ends. Skip over any character that isn't alphanumeric. Compare the lowercase form of the two characters — if they ever differ, it's not a palindrome.

```js
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  const isAlphanumeric = (char) => /[a-z0-9]/i.test(char);

  while (left < right) {
    if (!isAlphanumeric(s[left])) {
      left++;
      continue;
    }
    if (!isAlphanumeric(s[right])) {
      right--;
      continue;
    }
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
```

**Trace:** `"race a car"` → `'r'`/`'r'` match → `'a'`/`'a'` match → `'c'`/`'c'` match → left lands on `'e'`, right skips the space to land on `'a'` → `'e'` vs `'a'` mismatch → returns `false`. ✓

**Complexity:** O(n) time, **O(1) extra space** — versus the brute force's O(n) space for building cleaned/reversed copies.

**Edge cases:**
- **Empty string or single character** → loop never runs (or exits immediately) → correctly returns `true`.
- **String with no alphanumeric characters at all** (e.g. `",,,"`) → both pointers skip everything and cross without ever comparing → returns `true` — a vacuous-truth edge case worth stating explicitly if asked.
- **Must handle both case-insensitivity and punctuation/whitespace skipping** — easy to implement only one and miss the other.

---

## Problem 5: Container With Most Water

**Problem statement:** Given an array of non-negative integers where each value is the height of a vertical line at that index, find two lines that, together with the x-axis, form a container holding the most water. Return the maximum amount of water it can hold.

```text
Input:  heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49                  // lines at index 1 (height 8) and index 8 (height 7): width 7 × height 7
```

**Brute force:** check every pair of lines and compute the area — O(n²) time.

**Two pointer approach (opposite-ends, greedy):** start `left` and `right` at both ends. At each step, compute the area (`width × shorter height`) and track the max. Then move the pointer at the **shorter** line inward — the container's capacity is capped by the shorter line, so moving the taller line's pointer can only shrink the width while the cap stays the same or gets worse; moving the shorter line's pointer is the only move that could possibly find a taller line and raise the cap.

```js
function maxArea(heights) {
  let left = 0;
  let right = heights.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const height = Math.min(heights[left], heights[right]);
    maxWater = Math.max(maxWater, width * height);

    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}
```

**Trace (abbreviated):** `[1,8,6,2,5,4,8,3,7]` → `(1,7)` width `8` height `1` → area `8`; move left past the `1` → `(8,7)` width `7` height `7` → area **`49`** (the max); every subsequent step produces a smaller area, so `49` is the final answer. ✓ (matches the well-known expected result)

**Complexity:** O(n) time (each pointer moves at most `n` times total), O(1) space — versus brute force's O(n²).

**Edge cases:**
- **Fewer than 2 heights** → loop condition `left < right` is false immediately, correctly returns `0` with no special-case guard needed.
- **All heights equal** → ties are broken by moving `right` (the `else` branch) in the solution above — an arbitrary but valid choice; moving `left` on ties would also reach the correct max, just via a different path.
- **A height of `0`** → produces an area of `0` for any pairing that includes it, handled naturally without special-casing.

---

## The General Approach: How To Solve Any Two Pointers Problem

1. **Decide: finding/comparing a pair, or compacting/filtering in place?** That answers which variant you need — opposite-ends for the former, fast-slow for the latter.
2. **For opposite-ends problems, confirm sortedness** (or sort first if the problem allows it). Sortedness is what makes "move `left` forward" or "move `right` backward" a *correct* deduction instead of a guess.
3. **Decide the movement rule for opposite-ends problems** — this is the crux of the whole pattern:
   - Comparing a sum against a target → move whichever pointer moves the sum toward the target (too small → `left++`; too large → `right--`).
   - Comparing values at both ends directly (palindromes) → advance both pointers together on a match; skip over invalid/irrelevant positions individually.
   - Optimizing a value capped by the smaller of two bounds (container problems) → always move the pointer at the *limiting* (smaller) value.
4. **For fast-slow problems:** `slow` always marks "the next position to write a kept element." `fast` scans every element once; whenever it finds something worth keeping, write it at `slow` and advance `slow`.
5. **State the complexity trade explicitly.** Brute force is typically O(n²) (nested loop, or re-shifting the array after every removal). Two pointers is O(n) time — and frequently **O(1) extra space**, unlike HashMap and Sliding Window, because the pointers themselves do the "remembering" a hash structure would otherwise need to do.
6. **Check the shared edge cases:** empty or single-element input, the pointer-crossing stopping condition (`left >= right`), and — specifically for opposite-ends problems — whether sortedness is actually guaranteed or merely assumed.

Two Pointers' opposite-ends variant is often "the HashMap problem from Document 1, but the input happens to be sorted" — recognizing when sortedness turns an O(n)-*space* solution into an O(1)-*space* one is one of the highest-value instincts in this whole series.

---

## Rapid-Fire Interview Q&A

**Q: What are the two variants of Two Pointers, and how do you tell them apart?**
Opposite-ends (converging): starts at both ends, moves inward, used for pair-finding/comparison. Same-direction (fast-slow): both start near the beginning and only move forward, used for in-place compaction.

**Q: Why does "Find Pair With Target Sum" require a sorted array, but "Move Zeroes" doesn't?**
"Find Pair" decides whether to move `left` or `right` by comparing the current sum to the target — that comparison is only meaningful if the array's order is known. "Move Zeroes" decides purely from each element's own value (zero or not), independent of any other element, so input order doesn't affect correctness — only output order, which must be *preserved*, not sorted.

**Q: Does "Remove Duplicates from Sorted Array" also require sorted input, even though it's a fast-slow problem?**
Yes — it only compares each element to the immediately preceding *unique* element, which only correctly detects duplicates if equal values are guaranteed to be adjacent. On unsorted input it silently returns a wrong answer rather than erroring.

**Q: In Container With Most Water, why move the pointer at the smaller height instead of the larger one?**
The container's capacity is capped by the shorter line. Moving the taller line's pointer can only reduce the width while the cap stays the same or worsens. Moving the shorter line's pointer is the only move that could possibly raise the cap.

**Q: What's the space-complexity difference between Document 1's HashMap Two Sum and this document's Find Pair?**
HashMap Two Sum: O(n) space, works on unsorted input, preserves original indices. Two-pointer Find Pair: O(1) space, but requires sorted input — and if you sort an unsorted array first, you lose the original indices unless you track them separately beforehand.

**Q: Is reusing the regular expression in `isAlphanumeric` safe to call repeatedly in a loop, like in Valid Palindrome?**
Yes here, because the regex has no `g`/`y` flag. A **global** regex (`/pattern/g`) is stateful — it remembers `lastIndex` between calls — so reusing the same global regex instance across unrelated calls can silently skip matches. Without `g`, every `.test()` call is independent.

---

## Key Terms Glossary

- **Opposite-ends (converging) pointers** — two indices starting at both ends of a structure, moving toward each other based on a comparison.
- **Same-direction (fast-slow) pointers** — two indices both moving forward through a structure; one (fast) scans every element, the other (slow) marks the next write position for a kept element.
- **In-place** — modifying a structure using only its own storage, without allocating a second structure proportional to the input size (O(1) extra space).
- **Greedy choice** — committing to the locally-optimal move at each step without reconsidering it later; correct here because it's provable that no better answer is ever lost by doing so (e.g. Container With Most Water).
- **Stateful regex** — a `RegExp` instance with the `g` or `y` flag, which remembers `lastIndex` between `.test()`/`.exec()` calls; reusing one across unrelated calls can cause silently wrong results.

---

## Further Reading

- [MDN: Math.min()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
- [MDN: Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
- [MDN: RegExp.prototype.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
- [MDN: String.prototype.toLowerCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
