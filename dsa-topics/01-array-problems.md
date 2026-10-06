# DSA Topic Handbook — Document 1: Array Problems

> This is a **separate, topic-organized handbook** — distinct from the pattern-based [`dsa-for-fe/`](../dsa-for-fe/01-hashmap-pattern.md) series. That series teaches one reusable technique per document (HashMap, Sliding Window, Two Pointers, Stack). This handbook is organized the way most interview prep lists are: by data structure/topic, covering the specific highest-value questions under each one. Array problems are usually the highest-value questions you'll get, so this is where the handbook starts. Several of these problems still lean on patterns already covered in the other series — cross-linked inline wherever that connection helps.

## Table of Contents

1. [Quick Summary — Array Problems](#quick-summary--array-problems)
2. [Problem 1: Maximum Subarray](#problem-1-maximum-subarray)
3. [Problem 2: Best Time to Buy/Sell Stock](#problem-2-best-timebuysell-stock)
4. [Problem 3: Merge Intervals](#problem-3-merge-intervals)
5. [Problem 4: Rotate Array](#problem-4-rotate-array)
6. [Problem 5: Product of Array Except Self](#problem-5-product-of-array-except-self)
7. [Recognizing Which Technique an Array Problem Needs](#recognizing-which-technique-an-array-problem-needs)
8. [Rapid-Fire Interview Q&A](#rapid-fire-interview-qa)
9. [Key Terms Glossary](#key-terms-glossary)
10. [Further Reading](#further-reading)

---

## Quick Summary — Array Problems

| Problem | Core technique | Complexity |
|---|---|---|
| Maximum Subarray | Running "extend-or-restart" sum (Kadane's Algorithm) | O(n) time, O(1) space |
| Best Time to Buy/Sell Stock | Running minimum price + running best profit | O(n) time, O(1) space |
| Merge Intervals | Sort by start, then a single merging pass | O(n log n) time, O(n) space |
| Rotate Array | Reverse the whole array, then reverse each half | O(n) time, O(1) space |
| Product of Array Except Self | Prefix products, then suffix products | O(n) time, O(1) extra space |

---

## Problem 1: Maximum Subarray

**Problem statement:** Given an array of integers (positive, negative, or zero), find the contiguous subarray with the largest sum, and return that sum.

```text
Input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6                      // subarray [4, -1, 2, 1]
```

**Brute force:** check the sum of every possible subarray — O(n²) (or O(n³) if you recompute each sum from scratch instead of extending the previous one).

**Approach (Kadane's Algorithm):** walk the array once, tracking two values: `currentSum` (the best sum of a subarray *ending at the current index*) and `maxSum` (the best sum seen anywhere so far). At each element, decide whether to extend the existing subarray (`currentSum + nums[i]`) or abandon it and start fresh at this element (`nums[i]` alone) — whichever is larger. This is the simplest example of a **1D dynamic programming** idea: the best answer ending *here* only depends on the best answer ending at the *previous* position, not on recomputing anything from scratch.

```js
function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

**Trace:** `[-2,1,-3,4,-1,2,1,-5,4]` → start `currentSum=maxSum=-2`. `1`: `currentSum=max(1,-2+1=-1)=1`, `maxSum=1`. `-3`: `currentSum=max(-3,1-3=-2)=-2`, `maxSum=1`. `4`: `currentSum=max(4,-2+4=2)=4`, `maxSum=4`. `-1`: `currentSum=max(-1,4-1=3)=3`, `maxSum=4`. `2`: `currentSum=max(2,3+2=5)=5`, `maxSum=5`. `1`: `currentSum=max(1,5+1=6)=6`, `maxSum=6`. `-5`: `currentSum=max(-5,6-5=1)=1`, `maxSum=6`. `4`: `currentSum=max(4,1+4=5)=5`, `maxSum=6`. Final `maxSum=6`. ✓

**Complexity:** O(n) time, O(1) space — versus brute force's O(n²)/O(n³).

**Edge cases:**
- **All-negative array** (e.g. `[-3,-1,-2]`) → the algorithm still works without a special case, because restarting at a single element is always allowed: it correctly returns `-1` (the largest single element), since adding more negative numbers can only make a subarray sum worse.
- **Empty array** → `nums[0]` is `undefined`; guard explicitly and decide what to return (there's no valid subarray).
- **Single-element array** → loop never runs, returns `nums[0]` directly.

---

## Problem 2: Best Time to Buy/Sell Stock

**Problem statement:** Given an array `prices` where `prices[i]` is the stock price on day `i`, find the maximum profit from buying on one day and selling on a *later* day (one transaction only). Return `0` if no profit is possible.

```text
Input:  prices = [7, 1, 5, 3, 6, 4]
Output: 5                      // buy at 1, sell at 6
```

**Brute force:** check every pair of buy/sell days — O(n²).

**Approach:** exactly the pattern this topic is known for — **track the minimum price seen so far, and the maximum profit so far**. Walking left to right, at each price ask "if I sold today, having bought at the lowest price I've seen up to now, what's my profit?" — then update the running minimum.

```js
function maxProfit(prices) {
  let minPrice = prices[0];
  let bestProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    bestProfit = Math.max(bestProfit, prices[i] - minPrice);
    minPrice = Math.min(minPrice, prices[i]);
  }

  return bestProfit;
}
```

**Trace:** `[7,1,5,3,6,4]` → `minPrice=7`, `bestProfit=0`. `1`: profit `1-7=-6` → `bestProfit=0`; `minPrice=1`. `5`: profit `5-1=4` → `bestProfit=4`; `minPrice=1`. `3`: profit `3-1=2` → `bestProfit=4`; `minPrice=1`. `6`: profit `6-1=5` → `bestProfit=5`; `minPrice=1`. `4`: profit `4-1=3` → `bestProfit=5`; `minPrice=1`. Final `bestProfit=5`. ✓

**Complexity:** O(n) time, O(1) space.

**Edge cases:**
- **Strictly decreasing prices** (e.g. `[7,6,4,3,1]`) → `bestProfit` never rises above `0`, correctly signaling "don't transact" rather than returning a negative number.
- **Empty or single-price array** → guard `prices[0]` for the empty case; a single price correctly returns `0` (loop never runs).

---

## Problem 3: Merge Intervals

**Problem statement:** Given an array of intervals `[start, end]`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the input ranges.

```text
Input:  intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
```

**Brute force:** repeatedly scan for any overlapping pair, merge it, and restart the scan until nothing changes — O(n²) or worse.

**Approach:** sort the intervals by start value, then make one pass, keeping a "current merged interval." If the next interval's start is `<=` the current merged interval's end, they overlap — extend the end to whichever is larger. Otherwise, the current merged interval is finished; push it and start a new one.

```js
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const result = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const lastMerged = result[result.length - 1];

    if (current[0] <= lastMerged[1]) {
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      result.push(current);
    }
  }

  return result;
}
```

The numeric comparator `(a, b) => a[0] - b[0]` is required here, not optional — `sort()`'s *default* order is lexicographic string order (covered in [js/01](../js/01-arrays-objects-collections-and-modern-syntax.md)), which would sort these intervals incorrectly.

**Trace:** `[[1,3],[2,6],[8,10],[15,18]]` is already sorted by start. `result=[[1,3]]`. `[2,6]`: `2 <= 3` → merge, extend end to `max(3,6)=6` → `result=[[1,6]]`. `[8,10]`: `8 <= 6`? no → push → `result=[[1,6],[8,10]]`. `[15,18]`: `15 <= 10`? no → push → `result=[[1,6],[8,10],[15,18]]`. ✓

**Complexity:** O(n log n) time (dominated by the sort), O(n) space (the sorted copy plus the result).

**Edge cases:**
- **Empty input** → returns `[]` immediately (guarded).
- **One interval fully inside another**, e.g. `[[1,4],[2,3]]` → `Math.max(4, 3) = 4` correctly keeps the larger end instead of shrinking it.
- **Touching intervals**, e.g. `[[1,3],[3,5]]` → this implementation treats a shared endpoint as overlapping (`3 <= 3` is true) and merges them to `[1,5]`. If your interviewer's definition of "overlapping" excludes touching endpoints, changing `<=` to `<` is the one-line fix.

---

## Problem 4: Rotate Array

**Problem statement:** Given an array, rotate it to the right by `k` steps, in place.

```text
Input:  nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
```

**Brute force:** rotate one step at a time, `k` times, shifting every element right by one and wrapping the last to the front — O(n·k).

**Approach (three reversals, O(1) space):** reverse the *entire* array, then reverse the first `k` elements, then reverse the remaining `n - k` elements. This reuses the opposite-ends reversal idea from [Document 3's Two Pointers](../dsa-for-fe/03-two-pointers-pattern.md) as a helper.

```js
function rotateArray(nums, k) {
  const n = nums.length;
  k = k % n;

  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);
}

function reverse(arr, left, right) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}
```

A simpler, less space-efficient alternative: slice off the last `k` elements and place them in front of the rest — easier to write, but O(n) extra space instead of O(1).

**Trace:** `[1,2,3,4,5,6,7]`, `k=3` (already `< n=7`, so `k % n` leaves it unchanged). Reverse whole array → `[7,6,5,4,3,2,1]`. Reverse first `k=3` elements (`[7,6,5]`) → `[5,6,7,4,3,2,1]`. Reverse remaining `n-k=4` elements (`[4,3,2,1]`, indices 3–6) → `[5,6,7,1,2,3,4]`. ✓ Matches the expected output exactly.

**Complexity:** O(n) time (three linear passes), O(1) extra space — versus O(n) space for the slice-based alternative.

**Edge cases:**
- **`k` larger than the array length** (e.g. `k=10` for a 7-element array) → `k % n` normalizes it (`10 % 7 = 3`) before any reversing happens.
- **`k = 0`** → reversing the whole array and then reversing it again (the third reversal covers the same full range when `k=0`) cancels out, correctly leaving the array unchanged.
- **Empty array** → `n = 0` makes `k % n` evaluate to `NaN`, but every comparison involving `NaN` (like `left < right` inside `reverse`) is `false`, so every reversal silently no-ops rather than crashing. Relying on this is fragile — an explicit `if (n === 0) return;` guard is clearer and recommended.

---

## Problem 5: Product of Array Except Self

**Problem statement:** Given an array `nums`, return an array `output` where `output[i]` is the product of every element in `nums` *except* `nums[i]` — without using division, in O(n) time.

```text
Input:  nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
```

**Brute force:** for each index, multiply every other element — O(n²). A tempting "optimization" (multiply everything, then divide by `nums[i]`) is disallowed here and also breaks if any element is `0`.

**Approach (prefix × suffix products):** make two passes. The first pass fills `output[i]` with the product of everything to its *left* (a running `prefix` product). The second pass, walking right to left, multiplies in the product of everything to its *right* (a running `suffix` product). No division, and no array except the required output.

```js
function productExceptSelf(nums) {
  const n = nums.length;
  const output = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    output[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    output[i] *= suffix;
    suffix *= nums[i];
  }

  return output;
}
```

**Trace:** `[1,2,3,4]` → prefix pass: `output[0]=1` (empty product), `prefix=1`; `output[1]=1`, `prefix=2`; `output[2]=2`, `prefix=6`; `output[3]=6`, `prefix=24`. After prefix pass: `output=[1,1,2,6]`. Suffix pass (right to left, `suffix` starts at `1`): `output[3] *= 1 = 6`, `suffix=4`; `output[2] *= 4 = 8`, `suffix=12`; `output[1] *= 12 = 12`, `suffix=24`; `output[0] *= 24 = 24`, `suffix=24`. Final `output=[24,12,8,6]`. ✓

**Complexity:** O(n) time (two linear passes), O(1) extra space, not counting the required output array.

**Edge cases:**
- **Array contains a single `0`** (e.g. `[1,2,0,4]`) → works correctly with no special-casing: tracing it through gives `[0,0,8,0]` (every index except the `0`'s own position ends up `0`, since their product still includes that `0`). This is exactly why prefix/suffix beats the "divide by `nums[i]`" shortcut, which would divide by zero here.
- **Two or more zeros** → every output entry becomes `0` (excluding one zero from the product still leaves at least one other zero in it).
- **Single-element array** → `output=[1]` — the "product of everything except itself" in a 1-element array is the empty product, `1`.

---

## Recognizing Which Technique an Array Problem Needs

1. **"Best/largest/smallest running value over one pass"** (subarray sum, best profit) → track the relevant running state as you scan. Decide whether the state can *reset* when it stops helping (Kadane's "extend or restart") or must *monotonically* track one thing (the running minimum price).
2. **Ranges or intervals that might overlap** → sort by start value first, then make a single pass comparing each interval only to its immediate predecessor.
3. **Reorder/shift elements by a fixed offset, in place** → look for a reversal-based or index-math trick (like [Two Pointers'](../dsa-for-fe/03-two-pointers-pattern.md) reversal) before reaching for a second array.
4. **"Everything except the current element," with an operation disallowed (like division)** → prefix/suffix running products (or sums), computed in two linear passes.
5. **Across all of the above:** name the brute-force complexity you're replacing (usually O(n²) or worse) before presenting the optimized solution — interviewers expect that comparison explicitly.

---

## Rapid-Fire Interview Q&A

**Q: In Kadane's Algorithm, why compare `nums[i]` against `currentSum + nums[i]` instead of always extending the subarray?**
Because once `currentSum` goes negative, adding it to any future element can only make that element's contribution *worse*, not better. Restarting fresh at the current element is always at least as good as dragging along a negative running sum.

**Q: Why does Best Time to Buy/Sell Stock track a running *minimum* instead of sorting the prices first?**
Sorting would destroy the day-order information — you can only sell *after* you buy, so the minimum must be the lowest price seen *before* the current day, not the lowest price anywhere in the array.

**Q: Why must Merge Intervals sort first?**
The merging pass only ever compares an interval to the *one immediately before it* in `result`. That's only a valid overlap check if intervals arrive in start order — otherwise an overlapping pair could be far apart in the array and never get compared.

**Q: Why is the three-reversal Rotate Array trick preferred over the slice-and-concatenate version?**
Both are O(n) time, but the three-reversal version uses O(1) extra space by rearranging the array in place, while slicing and concatenating allocates a second array of size `n`.

**Q: Why can't Product of Array Except Self just compute the total product and divide by `nums[i]`?**
The problem disallows division outright, and it would also break on any input containing a `0` (division by zero), which the prefix/suffix approach handles without any special-casing.

---

## Key Terms Glossary

- **Kadane's Algorithm** — the running "extend the current subarray, or restart at this element" technique for maximum-subarray-sum problems; the simplest common example of 1D dynamic programming.
- **Dynamic programming (DP)** — solving a problem by building its answer from the answers to smaller, overlapping subproblems, rather than recomputing from scratch each time.
- **Prefix product/sum** — a running product (or sum) of everything *before* the current index.
- **Suffix product/sum** — a running product (or sum) of everything *after* the current index.
- **In place** — modifying a structure using only its own storage, without allocating a second structure proportional to the input size.

---

## Further Reading

- [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [MDN: Array.prototype.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN: Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
- [MDN: Math.min()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
