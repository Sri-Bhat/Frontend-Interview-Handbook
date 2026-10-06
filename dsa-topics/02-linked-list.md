# DSA Topic Handbook : Linked List Essentials

> Kept intentionally short: Linked List questions usually show up less often than Array, Hashing, or String questions in frontend interviews. Two problems — reversing a list, and detecting a cycle — cover most of what actually gets asked. If your interviewer leans heavily into DSA, treat this as a starting point rather than the full picture.

## Table of Contents

1. [Quick Summary — Linked List Essentials](#quick-summary--linked-list-essentials)
2. [Representing a Linked List in JavaScript](#representing-a-linked-list-in-javascript)
3. [Problem 1: Reverse Linked List](#problem-1-reverse-linked-list)
4. [Problem 2: Detect Cycle](#problem-2-detect-cycle)
5. [Recognizing Linked List Problems](#recognizing-linked-list-problems)
6. [Rapid-Fire Interview Q&A](#rapid-fire-interview-qa)
7. [Key Terms Glossary](#key-terms-glossary)
8. [Further Reading](#further-reading)

---

## Quick Summary — Linked List Essentials

| Signal | Technique | Complexity |
|---|---|---|
| "reverse the list" | Three pointers (`prev`, `curr`, `next`), re-pointing one link at a time | O(n) time, O(1) space |
| "does this list loop back on itself?" | Two pointers at different speeds — slow moves 1 step, fast moves 2 | O(n) time, O(1) space |

---

## Representing a Linked List in JavaScript

There's no built-in linked list type — a node is just a small class holding a value and a reference to the next node:

```js
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

A list is a chain of these starting from a `head` reference; the last node's `next` is `null`.

---

## Problem 1: Reverse Linked List

**Problem statement:** Given the head of a singly linked list, reverse it and return the new head.

```text
Input:  1 → 2 → 3 → 4
Output: 4 → 3 → 2 → 1
```

**Approach:** walk the list once with three pointers: `prev` (starts `null`), `curr` (starts at `head`), and a temporary `nextNode`. At each step, save `curr.next` *before* overwriting it, point `curr.next` back to `prev`, then advance both `prev` and `curr`. Saving `curr.next` first is essential — overwriting the link before saving it would strand the rest of the list with no way to reach it.

```js
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }

  return prev;
}
```

**Trace:** `1→2→3→4→null`. `prev=null, curr=1`: save `nextNode=2`, `1.next=null`, `prev=1`, `curr=2`. `prev=1, curr=2`: save `nextNode=3`, `2.next=1`, `prev=2`, `curr=3`. `prev=2, curr=3`: save `nextNode=4`, `3.next=2`, `prev=3`, `curr=4`. `prev=3, curr=4`: save `nextNode=null`, `4.next=3`, `prev=4`, `curr=null` → loop ends. Return `prev=4`. Walking from `4`: `4→3→2→1→null`. ✓ Matches exactly.

**Complexity:** O(n) time, O(1) space.

**Edge cases:**
- **Empty list** (`head = null`) → loop never runs, returns `null` — correctly "reverses" an empty list into an empty list.
- **Single node** → loop runs once, `next` stays `null`, returns the same node unchanged — correct, since reversing one element is a no-op.

---

## Problem 2: Detect Cycle

**Problem statement:** Given the head of a linked list, determine whether it contains a cycle — some node's `next` eventually points back to a node already visited, instead of ending at `null`.

**Approach (Floyd's Cycle Detection — "tortoise and hare"):** two pointers, `slow` moving 1 step at a time and `fast` moving 2. If there's a cycle, `fast` eventually laps `slow` and they land on the same node. If there's no cycle, `fast` (or `fast.next`) hits `null` first.

```js
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}
```

**Trace (cyclic):** nodes `A→B→C→D→B` (D loops back to B). `slow=A,fast=A`. Step 1: `slow=B`, `fast=C` (not equal). Step 2: `slow=C`, `fast=B` (not equal). Step 3: `slow=D`, `fast=D` → equal → returns `true`. ✓

**Trace (no cycle):** `A→B→C→null`. Step 1: `slow=B`, `fast=C` (not equal). Loop check: `fast.next` is `null` → loop exits → returns `false`. ✓ (The `fast.next !== null` check prevents ever reading `.next` off of `null`.)

**Complexity:** O(n) time, O(1) space — versus a `Set`-based "have I seen this node?" approach (see [Document 1's HashMap pattern](../dsa-for-fe/01-hashmap-pattern.md)), which is also O(n) time but O(n) *space*.

**Edge cases:**
- **Empty list** (`head = null`) → loop condition fails immediately, returns `false`.
- **Single node, no self-loop** → `fast.next` is `null`, loop never executes, returns `false`.
- **Single node pointing to itself** → loop runs once, `slow` and `fast` both land back on the same node, correctly returns `true`.

---

## Recognizing Linked List Problems

1. **Changing the direction of links** (reverse all or part of a list) → walk once with `prev`/`curr`/`next`, saving the forward link before overwriting it.
2. **Detecting a cycle, a midpoint, or "the Nth node from the end"** → two pointers at different speeds — the linked-list-specific cousin of [Document 3's Two Pointers](../dsa-for-fe/03-two-pointers-pattern.md).
3. **A `Set` of visited nodes** solves most of these too, trading O(n) space for simpler code — know both, but lead with the O(1)-space pointer trick.

---

## Rapid-Fire Interview Q&A

**Q: Why save `curr.next` into a temporary variable before reversing the link?**
Once `curr.next` is overwritten to point backward, the original forward link is gone — without saving it first, there'd be no way to reach the rest of the list to keep reversing it.

**Q: Why does the fast pointer move 2 steps instead of 3 or more?**
Moving 2 steps keeps the gap between `fast` and `slow` shrinking by exactly 1 node per iteration once both are inside the cycle, guaranteeing they meet. Any fixed step size larger than `slow`'s would eventually work too, but 2 is the simplest choice.

**Q: What's the trade-off between the two-pointer cycle check and a `Set`-based one?**
`Set`-based: O(n) space, store every visited node, check membership each step. Two-pointer (Floyd's): O(1) space, same O(n) time — the preferred solution whenever it's available.

---

## Key Terms Glossary

- **Node** — one element of a linked list, holding a value and a reference to the next node.
- **Head** — the first node of a linked list; the entry point for traversal.
- **Cycle** — a list where a node's `next` eventually points back to an earlier node instead of ending in `null`.
- **Floyd's Cycle Detection (tortoise and hare)** — the fast/slow two-pointer technique for detecting a cycle in O(1) space.

---

## Further Reading

- [MDN: Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
