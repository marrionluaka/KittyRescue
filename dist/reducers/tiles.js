"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
const dataTiles_1 = require("../dataTiles");
const types_1 = require("../types");
const lib_1 = require("../lib");
const initialState = {
    tiles: {},
    memory_tiles: [],
    tiles_flipped: 0
};
const _actions = {
    [types_1.NEW_GAME]: ({ gridSize, lvl }) => ({
        tiles: R.compose(lib_1.convertToObj, lib_1.shuffle, lib_1.duplicateEl(lib_1.guid), lib_1.addTrapBasedOnLevelChosen(lvl))(lib_1.prepareGridData(lvl, gridSize, dataTiles_1.default["grid"])),
        tiles_flipped: 0,
        alreadyMatchedTiles: {}
    }),
    [types_1.ORDER_MATCHED]: (state, { alreadyMatchedTiles }) => {
        return Object.assign({}, state, { alreadyMatchedTiles });
    },
    [types_1.TILES_MATCHED]: (state, { tiles }) => {
        const idx1 = tiles[0].id;
        const idx2 = tiles[1].id;
        return Object.assign({}, state, { tiles: Object.assign({}, state.tiles, { [idx1]: Object.assign({}, state.tiles[idx1], { isMatched: true }), [idx2]: Object.assign({}, state.tiles[idx2], { isMatched: true }) }), tiles_flipped: state.tiles_flipped + 2 });
    }
};
exports.default = (state = initialState, action) => !!_actions[action.type] ? action.type === types_1.NEW_GAME ?
    execute(types_1.NEW_GAME, action) : execute(action.type, state, action) : state;
function execute(actionType, ...args) {
    const _slice = Array.prototype.slice;
    return _actions[actionType].apply(null, _slice.call(arguments, 1));
}
