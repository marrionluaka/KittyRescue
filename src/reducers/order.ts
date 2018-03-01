import { 
    TILES_MATCHED,
    NEW_GAME
} from "../types";

import data from "../dataTiles";

import { 
   prepareGridData,
   shuffle,
   update
} from "../lib";

interface IOrder {
    tiles: any;
    alreadyMatchedTiles: any;
    pointer: number;
}

interface IAction {
    type: string;
    lvl: string;
    gridSize: number;
    src: string;
}

const initialOrder = {
    tiles: null,
    alreadyMatchedTiles: null,
    pointer: 0
}

export default (order: IOrder = initialOrder, action: IAction) => {
    if(action.type === NEW_GAME)
        return {
            tiles: shuffle( prepareGridData(action.lvl, action.gridSize, data["grid"]) ),
            pointer: 0,
            alreadyMatchedTiles: {}
        };

    if(action.type === TILES_MATCHED){
        let _updated = update(order.tiles.findIndex(o => o.src === action.src), { matched: action.src }, order.tiles);
        let pointer =  _updated.filter( tile => tile.matched).length;

        return {
            tiles: _updated,
            pointer,
            alreadyMatchedTiles: Object.assign({}, order.alreadyMatchedTiles, {
                [action.src]: {
                    [action.src]: action.src,
                    isMatched: action.src === order.tiles[order.pointer].src
                }
            })
        };
    }

    return order;
};