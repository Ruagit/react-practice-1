import {Event} from "../services/types";

export function generateEvents(count: number): Event[] {
    const ids = ['A', 'B', 'C', 'D', 'E'];
    const base = 1000;
    const result: Event[] = [];

    for (let i = 0; i < count; i++) {
        result.push({
            id: ids[Math.floor(Math.random() * ids.length)],
            timestamp: base + i,
        });
    }

    return result;
}