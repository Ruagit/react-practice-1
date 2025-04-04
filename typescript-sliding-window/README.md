# Task: Most Frequent ID in a Sliding Time Window

## 🚀 Setup & Run Instructions

### Prerequisites

Make sure you have **Node.js v22+** installed
```bash
  node -v
```
Install dependencies
```bash
  npm install
```
Run Performance test
```bash
  npm start
```

## Problem Description

You are processing a stream of events represented as objects:

```ts
interface Event {
  id: string;
  timestamp: number; // in seconds
}
```

Your task is to implement a system that tracks the most frequently occurring `id` within a **sliding window of the last N seconds** (e.g., 300 seconds = 5 minutes).

For every incoming event, you must:
- Include it in the current window.
- Remove any events that fall **outside** the window (`timestamp < current - N`).
- Determine which `id` is now the most frequent **within the current window**.

If multiple IDs have the same frequency, return the one that is **lexicographically smaller** (e.g., `"A"` before `"B"`).

You already have naive implementation in `services/top-id-naive-window.ts` .

## You should implement:
1. **An optimized version that is significantly faster (modify `services/top-id-optimized-window.ts`)**
2. **Confirm that it works correctly by running performance tests**
```
npm run performance-test
```

## Input Example

Given a window size of 300 seconds:

```ts
Event { id: "A", timestamp: 100 }  → Top: A
Event { id: "B", timestamp: 120 }  → Top: A (tie, but A < B)
Event { id: "A", timestamp: 150 }  → Top: A
Event { id: "B", timestamp: 420 }  → Top: B (event A from 100 is out of window)
```

## ✨ Requirements

### Optimized Implementation
- Use an efficient **sliding window** data structure.
- Update a frequency map **incrementally** as you add/remove events.
- Track the current top ID efficiently (optionally cache it).

## 💡 Bonus (Optional)

- Modify the solution to support returning **top N most frequent IDs**
- Handle **out-of-order events** (events not sorted by timestamp)
- Track not just the most frequent ID, but also **how often it appeared**

## Evaluation Criteria

| Category              | Weight |
|-----------------------|--------|
| Correctness           | 40%    |
| Performance           | 30%    |
| Code Quality          | 20%    |
| Bonus Features        | 10%    |

---

Good luck!
