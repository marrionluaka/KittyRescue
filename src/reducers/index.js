import { combineReducers } from 'redux';
import tilesReducer from './tiles';
import orderReducer from './order';
import scoreReducer from './score';
import timerReducer from './timer';

export default combineReducers({
    tiles: tilesReducer,
    order: orderReducer,
    score: scoreReducer,
    timer: timerReducer
});