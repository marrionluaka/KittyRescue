"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const reducers_1 = require("./reducers");
exports.default = redux_1.createStore(reducers_1.default);
