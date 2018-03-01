import {
    DECREASE_LIFE,
    INCREASE_LIFE,
    NEW_GAME,
    STOP_TIMER,
} from "../types";

import { MAX_LIVES } from "../globals";

const initialState = {
    lives: 20,
};

export default (state = initialState, action) => {

    if (action.type === NEW_GAME)
        return Object.assign({}, state, {
            isNewGame: true
        });

    if (action.type === INCREASE_LIFE)
        return Object.assign({}, state, {
            lives: state.lives < MAX_LIVES ? state.lives + 1 : state.lives
        });
    
    if (action.type === DECREASE_LIFE)
        return Object.assign({}, state, {
            lives: state.lives > 0 ? state.lives - 1 : state.lives,
            isNewGame: false,
            hasTimerStarted: true
        });

    if (action.type === STOP_TIMER)
        return Object.assign({}, state, {
            hasTimerStarted: false
        });
    
    return state;
}