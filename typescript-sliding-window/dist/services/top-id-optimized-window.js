"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopIdOptimizedWindow = void 0;
class TopIdOptimizedWindow {
    constructor(windowSize = 300) {
        this.events = [];
        this.windowSize = windowSize;
    }
    processEvent(event) {
        const filteredEvents = [];
        const lowerBound = event.timestamp - this.windowSize;
        //this.events = this.events.filter((e) => e.timestamp >= lowerBound);
        for (const oneEvent of this.events) {
            if (event.timestamp >= lowerBound) {
                filteredEvents.push(oneEvent);
            }
        }
        filteredEvents.push(event);
        const eventsInWindow = filteredEvents;
        const count = {};
        for (const e of eventsInWindow) {
            count[e.id] = (count[e.id] || 0) + 1;
        }
        let topId = "";
        let maxCount = 0;
        for (const item in count) {
            if (count[item] > maxCount || (count[item] === maxCount && item < topId)) {
                topId = item;
                maxCount = count[item];
            }
        }
        // console.log(`At ${event.timestamp} → Top ID: ${topId} (${maxCount}x)`);
    }
}
exports.TopIdOptimizedWindow = TopIdOptimizedWindow;
