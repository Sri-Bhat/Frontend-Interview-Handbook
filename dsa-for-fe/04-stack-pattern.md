# DSA for Frontend Engineers — Document 4: The Stack Pattern

> Stack is a different kind of pattern than the last two: [Sliding Window](02-sliding-window-pattern.md) and [Two Pointers](03-two-pointers-pattern.md) were both "two indices moving through an array" tricks that avoided a second data structure. Stack is the opposite move — it deliberately brings back a simple data structure, because the problem itself is structured around "the most recently seen unresolved thing" (an unmatched bracket, an unprocessed operand, a value waiting to be beaten by something bigger). JavaScript has no built-in `Stack` class, but arrays' `push()`/`pop()` give you one for free, exactly like `Map`/`Set` gave [Document 1](01-hashmap-pattern.md) its HashMap. This document covers bracket matching, the "monotonic stack" trick for next-greater-element queries, an O(1)-everything Min Stack design, and postfix expression evaluation — plus a framework for recognizing when a Stack is the right call.

## Table of Contents

1. [Quick Summary — The Stack Pattern](#quick-summary--the-stack-pattern)
2. [Why Stack Is Your Fourth Pattern](#why-stack-is-your-fourth-pattern)
3. [The Core Idea: Last-In-First-Out](#the-core-idea-last-in-first-out)
4. [Stack in JavaScript: What You Actually Need](#stack-in-javascript-what-you-actually-need)
5. [Problem 1: Valid Parentheses](#problem-1-valid-parentheses)
6. [Problem 2: Next Greater Element](#problem-2-next-greater-element)
7. [Problem 3: Min Stack](#problem-3-min-stack)
8. [Problem 4: Evaluate Postfix Expression](#problem-4-evaluate-postfix-expression)
9. [The General Approach: How To Solve Any Stack Problem](#the-general-approach-how-to-solve-any-stack-problem)
10. [Rapid-Fire Interview Q&A](#rapid-fire-interview-qa)
11. [Key Terms Glossary](#key-terms-glossary)
12. [Further Reading](#further-reading)

---

## Quick Summary — The Stack Pattern

| Signal in the problem statement | What it tells you | Core technique |
|---|---|---|
| "matching pairs" / "balanced" / "valid parentheses" | Each closer must resolve the most recently seen, still-unmatched opener | Push openers; pop-and-compare on closers |
| "next greater/smaller element relative to position" | Need the answer in one linear pass, not nested comparisons | Monotonic stack of indices |
| "design a structure with getMin()/getMax() in O(1)" | Need historical info available instantly, not recomputed on demand | A second stack running in lockstep with the first |
| "evaluate postfix / RPN expression" | Operands must wait until their operator shows up, in the right order | Numbers pushed; operators pop two and push the result |

The one-sentence version: **whenever a problem needs to remember "the most recent unresolved thing" and resolve it in last-in-first-out order, a Stack replaces what would otherwise be recursion or a nested loop, in O(n) time.**

---

## Why Stack Is Your Fourth Pattern

- It introduces a genuinely new data structure to the series, rather than another pointer/index trick layered onto an array — a contrast with Sliding Window and Two Pointers, which were both "two indices, different movement rules" over the same array.
- Like Documents 1 through 3, JavaScript needs no special syntax for it — arrays' `push()`/`pop()` *are* the stack, the same "no new tools, just a disciplined way of using what you already know" lesson as `Map`/`Set` were for HashMap.
- It shows up anywhere "matching", "undoing", or "resolving something in reverse-chronological order" appears: parsing/matching brackets, undo history, expression evaluation, and — in its "monotonic stack" variant — any "next element that satisfies some condition" query that would otherwise need nested loops.

---

## The Core Idea: Last-In-First-Out

A Stack only allows two operations at one end (the "top"): add an element (`push`), or remove the most recently added element (`pop`). That's **Last-In-First-Out (LIFO)** — the opposite of a Queue's First-In-First-Out (FIFO). Both operations are O(1), because nothing before the top ever needs to move.

A **monotonic stack** is the same structure used with one extra rule: before pushing a new value, pop off anything already on the stack that would break a chosen order (strictly increasing, or strictly decreasing). This turns an apparent nested loop (for each element, scan for its "next greater" partner) into a single pass, because every element is pushed exactly once and popped at most once:

```text
Brute force "next greater":   for each element, scan every element to its right     →  O(n²)
Monotonic stack:               each element is pushed once, popped at most once      →  O(n)
```

---

## Stack in JavaScript: What You Actually Need

| Operation | Array method | Complexity |
|---|---|---|
| Push (add to top) | `arr.push(value)` | O(1) |
| Pop (remove from top) | `arr.pop()` | O(1) |
| Peek (look at top without removing) | `arr.at(-1)` | O(1) |
| Is empty | `arr.length === 0` | O(1) |

Both `arr.pop()` and `arr.at(-1)` return `undefined` on an empty array rather than throwing — convenient, but it means a bug (one pop too many) fails silently instead of crashing. Add an explicit empty check if that distinction matters for correctness.

---

## Problem 1: Valid Parentheses

**Problem statement:** Given a string containing only the characters `(`, `)`, `{`, `}`, `[`, `]`, determine if the brackets are balanced — every opening bracket is closed by the same type of bracket, in the correct order.

```text
Input:  s = "({[]})"
Output: true
```

**Brute force:** repeatedly find and remove an innermost matched pair (e.g. `"()"`, `"{}"`, `"[]"`) from the string until no more can be removed, then check if the string is empty — O(n²) due to repeated scanning and string rebuilding.

**Stack approach:** push every opening bracket onto a stack. On a closing bracket, pop the stack and check that it matches the expected opener for that closer. A counter alone can't do this — it would only tell you *how many* of each bracket are unmatched, not in what *order* they must close, so something like `"([)]"` (one of each bracket, but incorrectly nested) would slip past a counter-based check. A stack enforces order because popping always returns the *most recently opened* bracket, which is exactly the one that must close next.

```js
function isValidParentheses(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

**Trace:** `"({[]})"` → `(` push → `[(]`. `{` push → `[(,{]`. `[` push → `[(,{,[]`. `]` closes: pop `[`, matches `pairs[']']` → ok, stack `[(,{]`. `}` closes: pop `{`, matches `pairs['}']` → ok, stack `[(]`. `)` closes: pop `(`, matches `pairs[')']` → ok, stack `[]`. End of string, `stack.length === 0` → `true`. ✓

**Complexity:** O(n) time (one pass), O(n) space (worst case, an all-opener string like `"((((("`).

**Edge cases:**
- **Empty string** → loop never runs, stack stays empty → returns `true` (vacuously balanced).
- **Closing bracket with nothing open**, e.g. `")"` → `stack.pop()` on an empty array returns `undefined`; `undefined !== pairs[')']` (`'('`) → correctly returns `false`, no crash.
- **Unmatched opener left over**, e.g. `"("` → stack ends with length `1`, not `0` → correctly returns `false`.
- This solution assumes the string contains **only** bracket characters (the classic framing of this problem, matching the example given). If other characters can appear, skip them explicitly rather than letting them fall through unhandled.

---

## Problem 2: Next Greater Element

**Problem statement:** Given an array of integers, for each element find the next element to its right that is strictly greater. If none exists, use `-1`.

```text
Input:  nums = [2, 1, 2, 4, 3]
Output: [4, 2, 4, -1, -1]
```

**Brute force:** for each element, scan every element to its right looking for the first greater one — O(n²).

**Stack approach (monotonic, decreasing):** keep a stack of *indices* whose "next greater" hasn't been found yet; the values at those indices stay in decreasing order from bottom to top. For each new element, pop off any index whose value is smaller than the current element (the current element *is* its next greater), recording the answer for each popped index. Then push the current index.

```js
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // indices; values stay in decreasing order, bottom to top

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] > nums[stack.at(-1)]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }

  return result;
}
```

**Trace:** `[2,1,2,4,3]` → `i=0`(2): stack empty, push → `[0]`. `i=1`(1): `1 > nums[0]=2`? no → push → `[0,1]`. `i=2`(2): `2 > nums[1]=1`? yes → pop `1`, `result[1]=2`, stack `[0]`; `2 > nums[0]=2`? no (not *strictly* greater) → push → `[0,2]`. `i=3`(4): `4 > nums[2]=2`? yes → pop `2`, `result[2]=4`, stack `[0]`; `4 > nums[0]=2`? yes → pop `0`, `result[0]=4`, stack `[]` → push → `[3]`. `i=4`(3): `3 > nums[3]=4`? no → push → `[3,4]`. End: indices `3` and `4` stay `-1` (already initialized). Final: `[4, 2, 4, -1, -1]`. ✓

**Complexity:** O(n) time — each index is pushed once and popped at most once, so the `while` loop runs at most `n` times total across the whole run, not per outer iteration. O(n) space for the stack and result.

**Edge cases:**
- **Empty array** → loop never runs, returns `[]`.
- **Strictly decreasing input** (e.g. `[5,4,3,2,1]`) → nothing is ever popped, every result stays `-1` — correct, since nothing to the right is ever greater.
- **Strictly increasing input** (e.g. `[1,2,3,4]`) → every element pops the one before it immediately; only the last index is left unresolved (`-1`).
- **Duplicate values** → the comparison is strict (`>`, not `>=`), so an equal value never resolves another equal value — only a genuinely larger one does.

---

## Problem 3: Min Stack

**Problem statement:** Design a stack that supports `push(val)`, `pop()`, `top()` (peek), and `getMin()` — all in O(1) time.

```text
push(-2); push(0); push(-3);
getMin(); // -3
pop();
top();    // 0
getMin(); // -2
```

**Brute force:** scan the entire stack to find the minimum every time `getMin()` is called — O(n) per call instead of O(1).

**Stack approach:** keep a second stack (`minStack`) in lockstep with the main one. Every `push` also pushes the *minimum so far* onto `minStack` — not just when a new minimum is found, but on **every single push** — so that popping the main stack and popping `minStack` together always leaves the correct previous minimum on top. (A single "current minimum" variable can't do this: once the minimum value is popped off, a plain variable has already forgotten what the previous minimum was.)

```js
class MinStack {
  #stack = [];
  #minStack = [];

  push(val) {
    this.#stack.push(val);
    const currentMin = this.#minStack.length === 0
      ? val
      : Math.min(val, this.#minStack.at(-1));
    this.#minStack.push(currentMin);
  }

  pop() {
    this.#minStack.pop();
    return this.#stack.pop();
  }

  top() {
    return this.#stack.at(-1);
  }

  getMin() {
    return this.#minStack.at(-1);
  }
}
```

**Trace:** `push(-2)`: `stack=[-2]`; `minStack` empty so `currentMin=-2` → `minStack=[-2]`. `push(0)`: `stack=[-2,0]`; `min(0,-2)=-2` → `minStack=[-2,-2]`. `push(-3)`: `stack=[-2,0,-3]`; `min(-3,-2)=-3` → `minStack=[-2,-2,-3]`. `getMin()` → `-3`. ✓ `pop()`: removes `-3` from both → `stack=[-2,0]`, `minStack=[-2,-2]`. `top()` → `0`. ✓ `getMin()` → `-2`. ✓ (All four expected results match.)

**Complexity:** O(1) time for every operation. O(n) space — two parallel stacks instead of one, still O(n) overall.

**Edge cases:**
- **Duplicate minimums** — e.g. pushing `-3` twice: `minStack` gets a `-3` entry for *each* push, so popping one `-3` still leaves the other `-3` on top of `minStack`, and `getMin()` keeps returning `-3` correctly until both copies are popped. This is precisely why `minStack` is updated on every push rather than conditionally.
- **Operations on an empty stack** — `pop()`, `top()`, and `getMin()` all return `undefined` rather than throwing (per `Array.prototype.pop()`/`at()` behavior); decide if that's acceptable or if it should throw a descriptive error instead.
- Uses private class fields (`#stack`, `#minStack`) so the two internal arrays can't be mutated from outside the class — a `TypeError` is thrown if external code tries to access `#stack` directly.

---

## Problem 4: Evaluate Postfix Expression

**Problem statement:** Given a postfix (Reverse Polish Notation) expression as an array of tokens — numbers and the operators `+ - * /` — evaluate it. In postfix, every operator comes *after* its operands, so no parentheses or precedence rules are needed.

```text
Input:  tokens = ["4", "13", "5", "/", "+"]
Output: 6                       // 4 + (13 / 5) = 4 + 2 = 6 (integer division, truncated)
```

**Brute force:** convert back to infix (inserting parentheses) and use a general expression parser — unnecessarily complex for something a stack solves directly in one pass.

**Stack approach:** push numbers onto the stack as they're seen. On an operator, pop the two most recent operands, apply the operator, and push the result back. Order matters for non-commutative operators (`-`, `/`): the **first** value popped is the right-hand operand (it appeared *second*, closer to the operator); the **second** value popped is the left-hand operand.

```js
function evaluatePostfix(tokens) {
  const stack = [];
  const operators = new Set(['+', '-', '*', '/']);

  for (const token of tokens) {
    if (operators.has(token)) {
      const b = stack.pop(); // right-hand operand (appeared second)
      const a = stack.pop(); // left-hand operand (appeared first)
      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(Math.trunc(a / b)); break;
      }
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop();
}
```

`operators.has(token)` checks for an *exact* match against the Set `{'+', '-', '*', '/'}` — so a negative-number token like `"-3"` is never mistaken for the `"-"` operator, because `"-3" !== "-"`. A substring check like `token.includes('-')` would get this wrong.

**Trace:** `["4","13","5","/","+"]` → push `4` → `[4]`. push `13` → `[4,13]`. push `5` → `[4,13,5]`. `/`: `b=pop()=5`, `a=pop()=13` → `push(Math.trunc(13/5)=Math.trunc(2.6)=2)` → `[4,2]`. `+`: `b=pop()=2`, `a=pop()=4` → `push(4+2=6)` → `[6]`. Return `stack.pop()` = `6`. ✓

A second trace confirming operand order matters: `["5","2","-"]` → push `5`, push `2` → `[5,2]`. `-`: `b=pop()=2`, `a=pop()=5` → `push(5-2=3)` → `[3]`. Returns `3` (correctly `5 - 2`, not `2 - 5`).

**Complexity:** O(n) time (single pass, each stack operation O(1)). O(n) space (the stack can hold up to roughly half the tokens in the worst case — still O(n)).

**Edge cases:**
- **Single-token expression** (e.g. `["5"]`) → pushes `5`, no operator seen, returns `5` directly.
- **Division by zero** (e.g. `"13 0 /"`) → produces `Infinity`; `Math.trunc(Infinity)` is still `Infinity` — worth guarding explicitly in production code, even though it's not a crash.
- **`Math.trunc()` truncates toward zero**, not toward negative infinity like `Math.floor()` — this matters for negative results: `Math.trunc(-2.6)` is `-2`, while `Math.floor(-2.6)` would be `-3`. Postfix/RPN evaluators conventionally truncate toward zero, so `Math.trunc()` is the correct choice here, not `Math.floor()`.

---

## The General Approach: How To Solve Any Stack Problem

1. **Identify which of the three Stack "modes" the problem needs:** a literal matching/undo stack (push openers, pop-and-check on closers), a monotonic stack (maintain increasing/decreasing order for "next greater/smaller" queries), or a design problem needing O(1) access to historical info (keep a second stack in lockstep).
2. **For matching/undo problems:** decide what goes on the stack (the opener itself? an index? a partial result?) and what triggers a pop (seeing the corresponding closer, or seeing something that "resolves" what's on top).
3. **For monotonic-stack problems:** decide the order — increasing for "next **smaller**", decreasing for "next **greater**" — and push *indices*, not values, whenever the answer needs to be written back at the original position.
4. **For "O(1) historical query" design problems:** keep a second stack that updates in lockstep with every push/pop of the first, rather than scanning the whole stack on each query.
5. **For expression evaluation:** classify each token with *exact* matching (e.g. `Set` membership), never a substring check — otherwise negative-number tokens or multi-character operators get misclassified.
6. **State the complexity.** A correct Stack solution is almost always O(n) time with O(n) worst-case space (the stack can hold up to the entire input) — compare that against whatever brute-force nested loop or re-scan it replaces.
7. **Check the shared edge cases:** empty input, popping/peeking an empty stack (JavaScript returns `undefined` instead of throwing — decide if that's acceptable or needs an explicit guard), and input that's never fully resolved by the end (leftover openers, leftover monotonic entries with no "next" found).

Where [Two Pointers](03-two-pointers-pattern.md) and [Sliding Window](02-sliding-window-pattern.md) used index math specifically to *avoid* an extra data structure, Stack deliberately brings one back — because the problem's own structure (nesting, chronology, monotonic order) maps directly onto last-in-first-out access.

---

## Rapid-Fire Interview Q&A

**Q: Why does Valid Parentheses need a stack instead of separate counters for each bracket type?**
Counters only tell you *how many* of each bracket are unmatched, not in what *order* they must close. `"([)]"` has exactly one of each bracket but is invalid — only a stack catches that, because popping always returns the most *recently* opened bracket, which is the one that must close next.

**Q: What makes a stack "monotonic", and why does that make Next Greater Element O(n) instead of O(n²)?**
It's kept in strictly increasing or decreasing order by popping off anything that would violate that order before pushing a new element. Because each element is pushed exactly once and popped at most once across the entire run, the total work is bounded by roughly `2n`, even though there's a `while` loop nested inside the `for` loop.

**Q: Why does Min Stack need a second stack instead of tracking one "current minimum" variable?**
A single variable can't recover after its value is popped — it has already overwritten whatever the previous minimum was. A parallel stack keeps the minimum-at-each-point-in-time, so popping both stacks together always leaves the correct previous minimum on top.

**Q: In Evaluate Postfix Expression, why does the order of popped operands matter?**
LIFO order means the first value popped is the operand that appeared *second* (closer to the operator), and the second value popped appeared *first*. Commutative operators (`+`, `*`) don't care, but `"5 2 -"` must compute `5 - 2`, not `2 - 5` — getting the pop order backwards silently flips the sign/result.

**Q: Does `arr.pop()` throw on an empty array?**
No — it returns `undefined`. Convenient (no try/catch needed), but it means popping one too many times fails silently instead of crashing, so add an explicit `.length === 0` check if that distinction matters.

---

## Key Terms Glossary

- **Stack** — a Last-In-First-Out (LIFO) data structure: the most recently added element is always the first one removed.
- **LIFO (Last-In-First-Out)** — the access order a Stack guarantees, as opposed to a Queue's FIFO (First-In-First-Out).
- **Monotonic stack** — a stack deliberately kept in increasing or decreasing order by popping off any element that would violate that order before pushing a new one.
- **Amortized O(1)** — an operation that isn't O(1) on every single call, but averages out to O(1) per call across the whole run (e.g. each element in a monotonic stack is pushed once and popped at most once).
- **Reverse Polish Notation (RPN) / postfix expression** — writing expressions so every operator follows its operands (`"2 1 +"` instead of `"2 + 1"`), removing the need for parentheses or precedence rules.
- **Private class field** — a class property declared with a `#` prefix (e.g. `#stack`), accessible only from inside the class body; accessing it from outside throws a `TypeError`.

---

## Further Reading

- [MDN: Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [MDN: Array.prototype.pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
- [MDN: Array.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
- [MDN: Math.trunc()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc)
- [MDN: Private elements (class fields)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties)
