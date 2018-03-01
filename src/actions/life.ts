import { 
    STOP_TIMER,
    DECREASE_LIFE, 
    INCREASE_LIFE 
} from "../types";

export const decreaseLife = () => ({
    type: DECREASE_LIFE    
});

export const increaseLife = () => ({
    type: INCREASE_LIFE
});

export const stopTimer = () => ({
    type: STOP_TIMER
});