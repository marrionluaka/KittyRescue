import { combineReducers } from 'redux';
import tilesStateReducer from './tiles';
import orderReducer from './order';
import scoreReducer from './score';
import timerReducer from './timer';

export default combineReducers({
    tilesState: tilesStateReducer,
    order: orderReducer,
    score: scoreReducer,
    timer: timerReducer
});