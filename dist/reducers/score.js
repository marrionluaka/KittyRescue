"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.default = (score = 0, action) => {
    if (action.type === types_1.NEW_GAME)
        return 0;
    if (action.type === types_1.ADD_POINTS)
        return score += action.amount;
    if (action.type === types_1.FLIP_TO_BACK) {
        if (action.isThereATrap && score > 0)
            return score - 3 >= 0 ? score -= 3 : 0;
    }
    return score;
};
