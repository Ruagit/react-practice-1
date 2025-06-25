"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopIdOptimizedWindow = void 0;
class TopIdOptimizedWindow {
    constructor(windowSize = 300) {
        this.events = [];
        this.windowSize = windowSize;
    }
    processEvent(event) {
        const lowerBound = event.timestamp - this.windowSize;
        this.events = this.events.filter((e) => e.timestamp >= lowerBound);
        this.events.push(event);
        const eventsInWindow = this.events;
        const count = {};
        for (const e of eventsInWindow) {
            count[e.id] = (count[e.id] || 0) + 1;
        }
        let topId = "";
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
exports.TopIdOptimizedWindow = TopIdOptimizedWindow;
