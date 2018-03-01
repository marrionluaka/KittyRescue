import { 
    DECREASE_TIME,
    INVALIDATE_TIMER
} from "../types";

export const countdown = () => ({
    type: DECREASE_TIME
});

export const invalidateTimer = msg => ({
    type: INVALIDATE_TIMER,
    msg
});