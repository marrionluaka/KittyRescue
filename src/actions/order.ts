import { 
    ADD_POINTS,
    INIT_ORDER,
    ORDER_MATCHED
} from "../types";

export const addPoints = (amount: number) => ({
    type: ADD_POINTS,
    amount
});

export const orderMatched = (alreadyMatchedTiles: any) => ({
    type: ORDER_MATCHED,
    alreadyMatchedTiles
});

export const initOrder = (gridSize: number, lvl: string) => ({
    type: INIT_ORDER,
    gridSize,
    lvl
});