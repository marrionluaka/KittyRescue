"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.addPoints = (amount) => ({
    type: types_1.ADD_POINTS,
    amount
});
exports.orderMatched = (alreadyMatchedTiles) => ({
    type: types_1.ORDER_MATCHED,
    alreadyMatchedTiles
});
exports.initOrder = (gridSize, lvl) => ({
    type: types_1.INIT_ORDER,
    gridSize,
    lvl
});
