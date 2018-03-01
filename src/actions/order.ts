import { 
    ADD_POINTS 
} from "../types";

export const addPoints = amount => ({
    type: ADD_POINTS,
    amount
});