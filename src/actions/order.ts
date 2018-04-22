import { 
    ADD_POINTS,
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