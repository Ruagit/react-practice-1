import { TopIdNaiveWindow } from './services/top-id-naive-window';
import { TopIdOptimizedWindow } from './services/top-id-optimized-window';
import {generateEvents} from "./utils/generate-events";
import {runTest} from "./utils/run-test";

const events = generateEvents(100_000);

runTest('Naive', TopIdNaiveWindow, events);
runTest('Optimized', TopIdOptimizedWindow, events);