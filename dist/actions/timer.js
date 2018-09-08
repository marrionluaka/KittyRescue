"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.countdown = () => ({
    type: types_1.DECREASE_TIME
});
exports.invalidateTimer = msg => ({
    type: types_1.INVALIDATE_TIMER,
    msg
});
