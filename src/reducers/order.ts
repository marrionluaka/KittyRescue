import { 
    TILES_MATCHED,
    INIT_ORDER
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
    lvl?: string;
    gridSize?: number;
    tiles?: any[];
}

const initialOrder = {
    tiles: [],
    alreadyMatchedTiles: null,
    pointer: 0
}

export default (order: IOrder = initialOrder, action: IAction) => {
    if(action.type === INIT_ORDER)
        return {
            tiles: shuffle( prepareGridData(action.lvl, action.gridSize, data["grid"]) ),
            pointer: 0,
            alreadyMatchedTiles: {}
        };

    if(action.type === TILES_MATCHED){
        if(!!action.tiles[2]) return order;

        let _matchedTile = action.tiles[0];
        let _updated = update(
            order.tiles.findIndex(o => o.src === _matchedTile.src), 
            { matched: _matchedTile.src }, 
            order.tiles
        );
        let pointer =  _updated.filter(tile => tile.matched).length;

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