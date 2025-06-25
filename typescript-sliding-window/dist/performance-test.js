"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const top_id_naive_window_1 = require("./services/top-id-naive-window");
const top_id_optimized_window_1 = require("./services/top-id-optimized-window");
const generate_events_1 = require("./utils/generate-events");
const run_test_1 = require("./utils/run-test");
const events = (0, generate_events_1.generateEvents)(100000);
(0, run_test_1.runTest)('Naive', top_id_naive_window_1.TopIdNaiveWindow, events);
(0, run_test_1.runTest)('Optimized', top_id_optimized_window_1.TopIdOptimizedWindow, events);
