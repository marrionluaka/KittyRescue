"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const globals_1 = require("../globals");
const initialState = {
    lives: 20,
};
exports.default = (state = initialState, action) => {
    if (action.type === types_1.NEW_GAME)
        return Object.assign({}, state, {
            isNewGame: true
        });
    if (action.type === types_1.INCREASE_LIFE)
        return Object.assign({}, state, {
            lives: state.lives < globals_1.MAX_LIVES ? state.lives + 1 : state.lives
        });
    if (action.type === types_1.DECREASE_LIFE)
        return Object.assign({}, state, {
            lives: state.lives > 0 ? state.lives - 1 : state.lives,
            isNewGame: false,
            hasTimerStarted: true
        });
    if (action.type === types_1.STOP_TIMER)
        return Object.assign({}, state, {
            hasTimerStarted: false
        });
    return state;
};
