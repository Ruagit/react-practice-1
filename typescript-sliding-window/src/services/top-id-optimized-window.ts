import { Event } from './types';

interface Entry {
    id: string;
    timestamp: number;
}

/*
The optimized version is faster because:

1. It avoids recomputing everything from scratch

In the naive version:
	•	For every new event:
	•	It filters all events in the current time window
	•	It rebuilds the frequency count map from zero
	•	Then it finds the most frequent ID by iterating again

This results in O(n) complexity per event, where n is the number of events in the window.

⸻

In the optimized version:
	•	It maintains:
	•	A sliding array of events
	•	A Map<string, number> for frequency counts
	•	A cached currentTopId and maxCount
	•	When a new event is added:
	•	It increments the count for just that one ID
	•	When an old event is removed:
	•	It decrements the count for that ID
	•	If that ID was the top one, it recalculates top only when necessary

The result:
	•	Most operations are O(1)
	•	Full recalculation happens only when the top ID is deleted from the window
 */


export class TopIdOptimizedWindow {
    private readonly windowSize: number;
    private readonly events: Entry[] = [];
    private readonly countMap: Map<string, number> = new Map();
    private startIndex = 0;

    private currentTopId = '';
    private maxCount = 0;

    constructor(windowSize: number = 300) {
        this.windowSize = windowSize;
    }

    public processEvent(event: Event): void {
        const { id, timestamp } = event;

        this.events.push({ id, timestamp });
        this.countMap.set(id, (this.countMap.get(id) || 0) + 1);

        const newCount = this.countMap.get(id)!;
        if (
            newCount > this.maxCount ||
            (newCount === this.maxCount && id < this.currentTopId)
        ) {
            this.maxCount = newCount;
            this.currentTopId = id;
        }

        const lowerBound = timestamp - this.windowSize;

        while (
            this.startIndex < this.events.length &&
            this.events[this.startIndex].timestamp < lowerBound
            ) {
            const removed = this.events[this.startIndex++];
            const current = this.countMap.get(removed.id)! - 1;
            if (current <= 0) {
                this.countMap.delete(removed.id);
            } else {
                this.countMap.set(removed.id, current);
            }

            if (removed.id === this.currentTopId && current < this.maxCount) {
                this.recalculateTop();
            }
        }

         //console.log(`At ${timestamp} → Top ID: ${this.currentTopId} (${this.maxCount}x)`);
    }

    private recalculateTop() {
        this.currentTopId = '';
        this.maxCount = 0;
        for (const [id, count] of this.countMap.entries()) {
            if (
                count > this.maxCount ||
                (count === this.maxCount && id < this.currentTopId)
            ) {
                this.maxCount = count;
                this.currentTopId = id;
            }
        }
    }
}