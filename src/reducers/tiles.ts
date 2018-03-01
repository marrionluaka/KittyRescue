import * as R from "ramda";

import data from "../dataTiles";

import { 
    NEW_GAME, 
    FLIP_TO_BACK,
    TILES_MATCHED,
    ADD_TO_MEMORY,
    INCREMENT_FLIPS,
    EMPTY_MEMORY
} from "../types";

import { 
    guid,
    shuffle,
    duplicateEl,
    prepareGridData,
    addTrapBasedOnLevelChosen
} from "../lib";
  
export default (function(){
    const initialState = {
        tiles:[],
        memory_tiles: [],
        tiles_flipped: 0
    };

    const _actions = {
        [NEW_GAME]: ({ gridSize, lvl }) => ({
            tiles: R.compose(
                    shuffle,
                    duplicateEl(guid),
                    addTrapBasedOnLevelChosen(lvl)
                )( prepareGridData(lvl, gridSize, data["grid"]) ),
            memory_tiles: [],
            tiles_flipped: 0
        }),

        [TILES_MATCHED]: (state, { src }) =>  
            Object.assign({}, state, {
                tiles: state.tiles.reduce((acc, tile) => {
                    if(tile.src === src) tile.isMatched = true;
                    acc.push(tile);
                    return acc;
                }, []),

                memory_tiles: [],
                tiles_flipped: state.tiles_flipped + 2
            })
        ,

        [FLIP_TO_BACK]: (state, { memoryTiles }) => {
            const findIndex  = idx => R.findIndex(R.propEq('id', idx))(state.tiles),
                  firstIdx   = findIndex(memoryTiles[0].id),
                  secondIdx  = findIndex(memoryTiles[1].id);

            return Object.assign({}, state, {
                tiles: R.compose(
                        R.update(secondIdx, Object.assign({}, state.tiles[secondIdx], { isFlipped: false })),
                        R.update
                    )(firstIdx, Object.assign({}, state.tiles[firstIdx], { isFlipped: false }), state.tiles),

                memory_tiles: []
            });
        },

        [ADD_TO_MEMORY]: (state, { tile }) => 
            Object.assign({}, state, {
                memory_tiles: [...state.memory_tiles, tile]
            })
    };

    return (state = initialState, action) => 
        !!_actions[action.type] ? action.type === NEW_GAME ?
            execute(NEW_GAME, action) : execute(action.type, state, action) : state;

    function execute(actionType: string, ...args: any[]){
        const _slice = Array.prototype.slice;
        return _actions[actionType].apply(null, _slice.call(arguments, 1));
    }

}());