import { combineReducers } from "redux";

import lifeReducer from "./life";
import orderReducer from "./order";
import scoreReducer from "./score";
import tilesStateReducer from "./tiles";
import timerReducer from "./timer";

export default combineReducers({
    tilesState: tilesStateReducer,
    order: orderReducer,
    score: scoreReducer,
    timer: timerReducer,
    life: lifeReducer,
});
