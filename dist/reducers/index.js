"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const life_1 = require("./life");
const order_1 = require("./order");
const score_1 = require("./score");
const tiles_1 = require("./tiles");
const timer_1 = require("./timer");
exports.default = redux_1.combineReducers({
    tilesState: tiles_1.default,
    order: order_1.default,
    score: score_1.default,
    timer: timer_1.default,
    life: life_1.default,
});
