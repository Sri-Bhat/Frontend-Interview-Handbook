# DSA for Frontend Engineers — The Sliding Window Pattern

> Sliding Window is the natural second pattern after [HashMap](01-hashmap-pattern.md): it's for any problem about **contiguous** subarrays or substrings where a brute-force solution would keep re-scanning overlapping data. Instead of recomputing each window from scratch, you slide its boundaries and update its state incrementally. This document covers the core idea, the fixed-size vs variable-size distinction, two classic interview problems solved end-to-end, and a repeatable framework for recognizing this pattern on a new problem.

## Table of Contents

1. [Quick Summary — The Sliding Window Pattern](#quick-summary--the-sliding-window-pattern)
2. [Why Sliding Window Is Your Second Pattern](#why-sliding-window-is-your-second-pattern)
3. [The Core Idea: Fixed Window vs Variable Window](#the-core-idea-fixed-window-vs-variable-window)
4. [Sliding Window in JavaScript: What You Actually Need](#sliding-window-in-javascript-what-you-actually-need)
5. [Problem 1: Longest Substring Without Repeating Characters](#problem-1-longest-substring-without-repeating-characters)
6. [Problem 2: Maximum Sum Subarray of Size K](#problem-2-maximum-sum-subarray-of-size-k)
7. [The General Approach: How To Solve Any Sliding Window Problem](#the-general-approach-how-to-solve-any-sliding-window-problem)
8. [Rapid-Fire Interview Q&A](#rapid-fire-interview-qa)
9. [Key Terms Glossary](#key-terms-glossary)
10. [Further Reading](#further-reading)

---

## Quick Summary — The Sliding Window Pattern

| Signal in the problem statement | Window type | What you track |
|---|---|---|
| "subarray/substring of size **K**" (K given) | Fixed-size window | A running numeric aggregate (sum, count) |
| "**longest/shortest** subarray/substring such that…" | Variable-size window | A `Set`/`Map` of what's currently inside the window |
| "contains no repeating / at most K distinct characters" | Variable-size window | `Set` (existence) or `Map` (existence + count) |
| "maximum/minimum sum/average of contiguous elements" | Fixed-size (if size given) | A running sum, updated incrementally |

The one-sentence version: **whenever brute force would repeatedly re-scan overlapping contiguous ranges, maintain a moving window and update its state in O(1) per step instead of recomputing it from scratch.**

---

## Why Sliding Window Is Your Second Pattern

- It's a **natural extension of HashMap** (Document 1): most variable-size window problems use a `Set`/`Map` internally to answer "what's currently in my window?" in O(1) — the window decides *which* elements are in play, the map/set tracks *what's inside it*.
- It collapses a huge class of "contiguous subarray/substring" problems from **O(n²) or O(n·k) brute force down to O(n)**.
- There are exactly **two flavors** — fixed-size (the window length is given) and variable-size (the window grows/shrinks based on a condition) — and correctly identifying which flavor you're facing is most of the battle.

---

## The Core Idea: Fixed Window vs Variable Window

Brute force for "every contiguous subarray/substring" problems typically re-examines overlapping data from scratch: generating all O(n²) subarrays, or re-summing each fixed-size window independently (O(n·k)).

The sliding window insight: keep two pointers, `left` and `right`, that define a contiguous window. Moving `right` forward **expands** the window; moving `left` forward **shrinks** it. Because the window is contiguous, you can update its running total/contents in O(1) per step (add what just entered, remove what just left) instead of recomputing the whole window again.

```text
Brute force:       for each window start, recompute the whole window's sum/contents  →  O(n·k) or O(n²)
Sliding window:     maintain running state; add the incoming element, remove the outgoing one  →  O(n)
```

- **Fixed-size window** — the size `k` is given up front. Slide by exactly one step at a time: subtract the element leaving, add the element entering.
- **Variable-size window** — no fixed size. Grow the right edge until the window becomes invalid, then shrink the left edge until it's valid again, recording the best window seen along the way.

---

## Sliding Window in JavaScript: What You Actually Need

Just two pointers (plain variables), plus — only when the window's *contents* need tracking rather than a single number — a `Set` or `Map`, the exact same structures from Document 1.

| Window type | What moves | What you track | Example |
|---|---|---|---|
| Fixed-size | Both pointers move together, one step at a time | A running numeric aggregate | Maximum Sum Subarray of Size K |
| Variable-size | Right pointer expands; left pointer shrinks only when needed | A `Set`/`Map` of the window's contents | Longest Substring Without Repeating Characters |

---

## Problem 1: Longest Substring Without Repeating Characters

**Problem statement:** Given a string `s`, return the length of the longest substring that contains no repeating characters.

```text
Input:  s = "abcabcbb"
Output: 3                 // "abc"

Input:  s = "pwwkew"
Output: 3                 // "wke" — must be contiguous, so "pwke" doesn't count
```

**Brute force:** check every substring for uniqueness — O(n²) substrings, each taking up to O(n) to verify, so O(n³) naively.

**Sliding window approach (variable-size):** expand `right` one character at a time, adding each character to a `Set`. If the incoming character is already in the `Set` (a repeat), shrink from `left` — removing characters from the `Set` — until that repeat is gone. Record the window size after every expansion.

```js
function lengthOfLongestSubstring(s) {
  const windowChars = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (windowChars.has(s[right])) {
      windowChars.delete(s[left]);
      left++;
    }
    windowChars.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

**Complexity:** O(n) time — every character is added to and removed from the `Set` at most once across the *entire* run, even though the `while` loop can fire more than once per outer iteration. Space: O(min(n, alphabet size)) for the `Set`.

**Edge cases:**
- **Empty string** → loop never runs, correctly returns `0`.
- **All unique characters** (e.g. `"abcdef"`) → the `while` loop never triggers; the window grows to cover the whole string.
- **All identical characters** (e.g. `"aaaa"`) → the window collapses back to size `1` on every step; answer is `1`.
- **Optimization worth mentioning:** a `Map<char, lastIndex>` lets you jump `left` directly to `lastIndex + 1` instead of shrinking one character at a time, removing the inner `while` loop entirely — same O(n) complexity class, fewer operations in practice.

---

## Problem 2: Maximum Sum Subarray of Size K

**Problem statement:** Given an array of integers `arr` and a positive integer `k`, find the maximum sum achievable from any contiguous subarray of exactly `k` elements.

```text
Input:  arr = [2, 1, 5, 1, 3, 2], k = 3
Output: 9                            // the subarray [5, 1, 3]
```

**Brute force:** for every one of the `n - k + 1` starting positions, sum the next `k` elements from scratch — O(n·k) time.

**Sliding window approach (fixed-size):** compute the sum of the first window once. Then slide one step at a time: subtract the element leaving the window (the current leftmost), add the element entering it (the new rightmost) — each slide becomes O(1) instead of O(k).

```js
function maxSumSubarrayOfSizeK(arr, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;
  for (let end = k; end < arr.length; end++) {
    windowSum += arr[end] - arr[end - k]; // add incoming, remove outgoing
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

**Complexity:** O(n) time (one pass to build the first window, one more to slide it), O(1) extra space — no `Set`/`Map` needed here, since the window's entire "state" is a single running number.

**Edge cases:**
- **`arr.length < k`** → no valid window exists; decide explicitly whether to return `null`, `-Infinity`, or throw, since there's no universal convention.
- **`k === arr.length`** → only one possible window: the sum of the entire array.
- **Negative numbers** → work unchanged; the running sum absorbs negative contributions the same way as positive ones, with no special-casing needed.

---

## The General Approach: How To Solve Any Sliding Window Problem

1. **Confirm the elements are contiguous.** Sliding window only applies to a contiguous subarray/substring. If the problem allows picking a non-contiguous subset, this is the wrong pattern.
2. **Decide fixed vs variable size.**
   - Window size given explicitly (a `k` in the problem) → fixed-size window.
   - Window must grow/shrink to satisfy some condition ("longest/shortest such that…") → variable-size window.
3. **Fixed-size:** compute the first window's aggregate once, then slide one step at a time, updating it in O(1) — add what's entering, remove what's leaving — instead of recomputing.
4. **Variable-size:** expand `right` to grow the window. The moment it becomes invalid, shrink `left` until it's valid again. Record the best (longest/shortest/max/min) window seen after every expansion.
5. **Decide what window "state" to track.**
   - Just a number (sum, count) → a running variable is enough.
   - "What distinct things are currently inside the window" → `Set` (existence) or `Map` (existence + count), exactly like Document 1.
6. **State the complexity trade explicitly.** Brute force is typically O(n·k) or O(n²) because it recomputes each window from scratch; sliding window is O(n) because every element enters and leaves the window at most once.
7. **Check the shared edge cases:** window larger than the input, empty input, all-identical elements (a variable window may collapse to size 1 repeatedly), and negative numbers if you're summing.

Sliding Window frequently works *together* with the HashMap pattern from Document 1 — the window decides *which* elements are currently in play, and a `Map`/`Set` answers *what's inside it* in O(1).

---

## Rapid-Fire Interview Q&A

**Q: How do you tell a fixed-size from a variable-size sliding window problem?**
Fixed-size: the problem gives you an explicit window length (a `k`). Variable-size: the problem asks for the longest/shortest window satisfying some condition, with no size given.

**Q: Why is sliding window O(n) instead of O(n²) or O(n·k)?**
Every element enters and leaves the window at most once across the whole run, so the total work across all expansions and shrinks is bounded by `n` — even though that work is spread unevenly across iterations.

**Q: In "Longest Substring Without Repeating Characters," why use a `while` loop instead of a single `if` to shrink the window?**
A single repeat can require shrinking past one or more earlier characters that sit *before* the actual duplicate in the window, before that duplicate itself finally leaves and the window becomes valid again. A `while` handles this correctly; a one-time `if` would stop too early and leave a hidden duplicate inside the window.

**Q: What's the complexity of brute force vs sliding window for "Maximum Sum Subarray of Size K"?**
Brute force: O(n·k), re-summing every window. Sliding window: O(n) time, O(1) space, since the window update is a single subtraction and addition.

**Q: Can sliding window be used for non-contiguous selections?**
No — contiguity is the defining requirement. Non-contiguous subset problems need a different pattern entirely (e.g. dynamic programming, backtracking).

**Q: When do you reach for a `Map` instead of a `Set` inside a variable-size window?**
When you need more than "is this in the window" — e.g. "at most K **distinct** characters" problems need a count per character (to know when a character's count drops to zero and can be fully removed), not just presence.

---

## Key Terms Glossary

- **Sliding window** — maintaining a contiguous range over an array/string and incrementally updating its state as the window's boundaries move, instead of recomputing from scratch.
- **Fixed-size window** — a sliding window whose length is constant and given up front (a `k` in the problem).
- **Variable-size window** — a sliding window whose length grows/shrinks dynamically based on whether a condition currently holds.
- **Window invariant** — the condition that must stay true for the current window to be considered valid (e.g. "contains no repeating characters").
- **Two-pointer technique** — the broader family sliding window belongs to: maintaining indices that both move forward through the data, never backward.
- **Amortized complexity** — the average cost per operation across an entire sequence of operations, even if individual operations occasionally cost more (the inner `while` loop in Problem 1 can run several iterations in one step, but totals O(n) across the whole run).

---

## Further Reading

- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN: Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
