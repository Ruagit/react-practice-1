"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEvents = generateEvents;
function generateEvents(count) {
    const ids = ['A', 'B', 'C', 'D', 'E'];
    const base = 1000;
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push({
            id: ids[Math.floor(Math.random() * ids.length)],
            timestamp: base + i,
        });
    }
    return result;
}
