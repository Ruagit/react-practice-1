import { Event } from "./types";

export class TopIdOptimizedWindow {
  // Currently there is a copy of naive implementation from top-id-naive-window.ts
  // The goal of the task is to optimize the naive implementation
  private readonly windowSize: number;
  private events: Event[] = [];

  constructor(windowSize: number = 300) {
    this.windowSize = windowSize;
  }

  public processEvent(event: Event): void {
    const filteredEvents: Event[] = [];
    const lowerBound = event.timestamp - this.windowSize;

    //this.events = this.events.filter((e) => e.timestamp >= lowerBound);

    for (const oneEvent of this.events) {
      if(event.timestamp >= lowerBound) {
        filteredEvents.push(oneEvent);
      }
    }

    filteredEvents.push(event);

    const eventsInWindow = filteredEvents;

    const count: Record<string, number> = {};

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
