"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.decreaseLife = () => ({
    type: types_1.DECREASE_LIFE
});
exports.increaseLife = () => ({
    type: types_1.INCREASE_LIFE
});
exports.stopTimer = () => ({
    type: types_1.STOP_TIMER
});
