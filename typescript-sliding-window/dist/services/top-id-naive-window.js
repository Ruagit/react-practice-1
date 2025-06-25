"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopIdNaiveWindow = void 0;
class TopIdNaiveWindow {
    constructor(windowSize = 300) {
        this.events = [];
        this.windowSize = windowSize;
    }
    processEvent(event) {
        this.events.push(event);
        const lowerBound = event.timestamp - this.windowSize;
        const eventsInWindow = this.events.filter(e => e.timestamp >= lowerBound);
        const count = {};
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
exports.TopIdNaiveWindow = TopIdNaiveWindow;
