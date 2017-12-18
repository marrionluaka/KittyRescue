import R from 'ramda';

import grid from '../dataTiles.json';

import { 
    FETCH_TILES, 
    FLIP_TO_BACK,
    TILES_MATCHED
} from '../types';

import { 
    guid,
    shuffle,
    duplicateEl,
    addTrapBasedOnLevelChosen
} from '../lib';
  
export default (function(){
    const _actions = {
        "FETCH_TILES": (tiles, { gridSize, lvl }) => 
            R.compose(
                shuffle,
                duplicateEl(guid),
                addTrapBasedOnLevelChosen(lvl)
            )(grid[lvl][gridSize])
        ,

        "TILES_MATCHED": (tiles, action) => { // TODO: To be refactored
            return tiles.reduce((acc, tile) => {
                if(tile.src === action.src) tile.isMatched = true;
                acc.push(tile);
                return acc;
            }, []);
        },

        "FLIP_TO_BACK": (tiles, { memoryTiles }) => {
            const findIndex  = idx => R.findIndex(R.propEq('id', idx))(tiles),
                  firstIdx   = findIndex(memoryTiles[0].id),
                  secondIdx  = findIndex(memoryTiles[1].id);

            return R.compose(
                R.update(secondIdx, Object.assign({}, tiles[secondIdx], { isFlipped: false })),
                R.update
            )(firstIdx, Object.assign({}, tiles[firstIdx], { isFlipped: false }), tiles);
        }
    };

    function execute(actionType){
        const _slice = Array.prototype.slice;
        return _actions[actionType].apply(null, _slice.call(arguments, 1));
    }

    return (tiles=[], action) => {

        if(action.type === FETCH_TILES)
            return execute(FETCH_TILES, tiles, action);
        
        if(action.type === TILES_MATCHED)
            return execute(TILES_MATCHED, tiles, action);

        if(action.type === FLIP_TO_BACK)
            return execute(FLIP_TO_BACK, tiles, action);
        
        return tiles;
    };
}());