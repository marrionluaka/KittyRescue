import { combineReducers } from 'redux';
import tilesReducer from './tiles';
import orderReducer from './order';

export default combineReducers({
    tiles: tilesReducer,
    order: orderReducer
});