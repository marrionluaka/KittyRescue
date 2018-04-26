import * as R from "ramda";

import data from "../dataTiles";

import { 
    NEW_GAME, 
    FLIP_TO_BACK,
    TILES_MATCHED,
    ADD_TO_MEMORY,
    INCREMENT_FLIPS,
    EMPTY_MEMORY,
    ORDER_MATCHED
} from "../types";

import { 
    guid,
    shuffle,
    duplicateEl,
    convertToObj,
    prepareGridData,
    addTrapBasedOnLevelChosen
} from "../lib";

export interface ITilesState {
    tiles: any;
    memory_tiles: any[];
    tiles_flipped: number;
}

const initialState = {
    tiles:{},
    memory_tiles: [],
    tiles_flipped: 0
};

const _actions = {
    [NEW_GAME]: ({ gridSize, lvl }) => ({
        tiles: R.compose(
                convertToObj,
                shuffle,
                duplicateEl(guid),
                addTrapBasedOnLevelChosen(lvl)
            )( prepareGridData(lvl, gridSize, data["grid"]) ),
        tiles_flipped: 0,
        alreadyMatchedTiles: {}
    }),

    [ORDER_MATCHED]: (state, { alreadyMatchedTiles }) => {
        return {
            ...state,
            alreadyMatchedTiles
        }
    },

    [TILES_MATCHED]: (state, { tiles }) =>  
    {   
        const idx1 = tiles[0].id;
        const idx2 = tiles[1].id;

        return {
            ...state,
            tiles: {
                ...state.tiles,
                [idx1]: {
                    ...state.tiles[idx1],
                    isMatched: true
                },
                [idx2]: {
                    ...state.tiles[idx2],
                    isMatched: true
                }
            },
            tiles_flipped: state.tiles_flipped + 2
        };
    }
};

export default (state = initialState, action) => 
    !!_actions[action.type] ? action.type === NEW_GAME ?
        execute(NEW_GAME, action) : execute(action.type, state, action) : state;

function execute(actionType: string, ...args: any[]){
    const _slice = Array.prototype.slice;
    return _actions[actionType].apply(null, _slice.call(arguments, 1));
}