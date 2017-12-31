import {
    NEW_GAME, 
    FLIP_TO_BACK,
    DECREASE_TIME,
    INVALIDATE_TIMER
} from "../types";

export default (timerOptions={}, action) => {

    if(action.type === NEW_GAME)
        return {
            time: 30,
            hasGameStarted: false
        };

    if(action.type === DECREASE_TIME)
        return Object.assign({}, timerOptions, {
            time: timerOptions.time - 1
        });
    
    if(action.type === INVALIDATE_TIMER)
        return Object.assign({}, timerOptions, {
            invalidateTimer: action.msg
        });
    
    if(action.type === FLIP_TO_BACK){
        const traps = action.memoryTiles.find( tile => tile.isTrap );

        if(!!traps && timerOptions.time > 0 && timerOptions.hasGameStarted) {
            return Object.assign({}, timerOptions, {
                time: timerOptions.time - 3 >= 0 ? timerOptions.time -=3 : 0
            });
        }

        return Object.assign({}, timerOptions, {
            hasGameStarted: true
        });
    }

    return timerOptions;
}