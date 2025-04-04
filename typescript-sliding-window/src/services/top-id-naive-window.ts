import { Event } from './types';

export class TopIdNaiveWindow {
    private readonly windowSize: number;
    private readonly events: Event[] = [];

    constructor(windowSize: number = 300) {
        this.windowSize = windowSize;
    }

    public processEvent(event: Event): void {
        this.events.push(event);

        const lowerBound = event.timestamp - this.windowSize;
        const eventsInWindow = this.events.filter(e => e.timestamp >= lowerBound);

        const count: Record<string, number> = {};
        for (const e of eventsInWindow) {
            count[e.id] = (count[e.id] || 0) + 1;
        }

        let topId = '';
        let maxCount = 0;
        for (const [id, c] of Object.entries(count)) {
            if (c > maxCount || (c === maxCount && id < topId)) {
                topId = id;
                maxCount = c;
            }
        }

        // console.log(`At ${event.timestamp} → Top ID: ${topId} (${maxCount}x)`);
    }
}