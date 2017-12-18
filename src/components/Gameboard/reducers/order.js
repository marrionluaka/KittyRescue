import { 
    TILES_MATCHED,
    FETCH_TILES
} from '../types';

import grid from '../dataTiles.json';

import { 
   shuffle,
   update
} from '../lib';

export default (order = [], action) => {
    if(action.type === FETCH_TILES)
        return shuffle(grid[action.lvl][action.gridSize]);

    if(action.type === TILES_MATCHED)
        return update(order.findIndex(o => o.src === action.src), { matched: action.src }, order);

    return order;
};