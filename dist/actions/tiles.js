"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.newGame = (gridSize, lvl) => ({
    type: types_1.NEW_GAME,
    gridSize,
    lvl
});
exports.tilesMatched = tiles => ({
    type: types_1.TILES_MATCHED,
    tiles
});
exports.flipToBack = (isThereATrap) => ({
    type: types_1.FLIP_TO_BACK,
    isThereATrap
});
