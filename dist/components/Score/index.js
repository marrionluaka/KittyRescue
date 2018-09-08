"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const Score = ({ score }) => score;
const mapStateToProps = state => ({
    score: state.score
});
exports.default = react_redux_1.connect(mapStateToProps)(Score);
