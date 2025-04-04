import {Event} from "../services/types";

export function runTest(
    label: string,
    Impl: new () => { processEvent: (e: Event) => void },
    events: Event[]
): number {
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