import { combineReducers } from 'redux';
import tilesReducer from './tiles';
import orderReducer from './order';
import scoreReducer from './score';

export default combineReducers({
    tiles: tilesReducer,
    order: orderReducer,
    score: scoreReducer
});