"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const globals_1 = require("../globals");
const initialTimerOptions = {
    time: null,
    hasGameStarted: null,
    invalidateTimer: null
};
exports.default = (timerOptions = initialTimerOptions, action) => {
    if (action.type === types_1.NEW_GAME)
        return {
            time: globals_1.timerLvls[action.gridSize][action.lvl],
            hasGameStarted: false
        };
    if (action.type === types_1.DECREASE_TIME)
        return Object.assign({}, timerOptions, {
            time: timerOptions.time - 1
        });
    if (action.type === types_1.INVALIDATE_TIMER)
        return Object.assign({}, timerOptions, {
            invalidateTimer: action.msg
        });
    if (action.type === types_1.ADD_POINTS) {
        if (timerOptions.time !== 0
            && timerOptions.hasGameStarted
            && action.amount > globals_1.MIN_SCORE)
            return Object.assign({}, timerOptions, {
                time: timerOptions.time + 3
            });
        return timerOptions;
    }
    if (action.type === types_1.FLIP_TO_BACK) {
        if (action.isThereATrap
            && timerOptions.time > 0
            && timerOptions.hasGameStarted
            && timerOptions.time - 3 >= 0) {
            return Object.assign({}, timerOptions, {
                time: timerOptions.time - 3
            });
        }
        if (!timerOptions.hasGameStarted)
            return Object.assign({}, timerOptions, {
                hasGameStarted: true
            });
        return timerOptions;
    }
    return timerOptions;
};
