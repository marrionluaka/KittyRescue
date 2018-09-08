"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const dataTiles_1 = require("../dataTiles");
const lib_1 = require("../lib");
const initialOrder = {
    tiles: [],
    alreadyMatchedTiles: null,
    pointer: 0
};
exports.default = (order = initialOrder, action) => {
    if (action.type === types_1.INIT_ORDER)
        return {
            tiles: lib_1.shuffle(lib_1.prepareGridData(action.lvl, action.gridSize, dataTiles_1.default["grid"])),
            pointer: 0,
            alreadyMatchedTiles: {}
        };
    if (action.type === types_1.TILES_MATCHED) {
        if (!!action.tiles[2])
            return order;
        let _matchedTile = action.tiles[0];
        let _updated = lib_1.update(order.tiles.findIndex(o => o.src === _matchedTile.src), { matched: _matchedTile.src }, order.tiles);
        let pointer = _updated.filter(tile => tile.matched).length;
        return {
            tiles: _updated,
            pointer,
            alreadyMatchedTiles: Object.assign({}, order.alreadyMatchedTiles, {
                [_matchedTile.src]: {
                    [_matchedTile.src]: _matchedTile.src,
                    orderMatched: _matchedTile.src === order.tiles[order.pointer].src,
                    idx: pointer
                }
            })
        };
    }
    return order;
};
