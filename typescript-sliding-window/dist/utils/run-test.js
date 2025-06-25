"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTest = runTest;
function runTest(label, Impl, events) {
    const instance = new Impl();
    const start = performance.now();
    for (const e of events) {
        instance.processEvent(e);
    }
    const end = performance.now();
    const duration = end - start;
    console.log(`${label}: ${events.length} events in ${duration.toFixed(2)}ms`);
    return duration;
}
