import {
    NEW_GAME, 
    FLIP_TO_BACK,
    DECREASE_TIME,
    INVALIDATE_TIMER,
    ADD_POINTS
} from "../types";

import { timerLvls, MIN_SCORE } from "../globals";

export interface ITimerOptions {
    time: number;
    hasGameStarted: boolean;
    invalidateTimer?: string;
}

export interface IAction {
    type: string;
    gridSize?: number;
    lvl?: string;
    msg?: string;
    isThereATrap?: boolean;
    amount?: number;
}

const initialTimerOptions = {
    time: null,
    hasGameStarted: null,
    invalidateTimer: null
};

export default (timerOptions: ITimerOptions = initialTimerOptions, action: IAction) => {

    if(action.type === NEW_GAME)
        return {
            time: timerLvls[action.gridSize][action.lvl],
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
    
    if(action.type === ADD_POINTS){
        if(timerOptions.time !== 0 
            && timerOptions.hasGameStarted 
            && action.amount > MIN_SCORE)
            return Object.assign({}, timerOptions, {
                time: timerOptions.time + 3
            });

        return timerOptions;
    }

    if(action.type === FLIP_TO_BACK){
        if(action.isThereATrap 
            && timerOptions.time > 0 
            && timerOptions.hasGameStarted
            && timerOptions.time - 3 >= 0) {
            return Object.assign({}, timerOptions, {
                time: timerOptions.time - 3 
            });
        }

        if(!timerOptions.hasGameStarted)
            return Object.assign({}, timerOptions, {
                hasGameStarted: true
            });

        return timerOptions;
    }

    return timerOptions;
}