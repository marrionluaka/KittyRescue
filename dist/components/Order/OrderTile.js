"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const OrderTile = ({ src }) => {
    return (React.createElement(react_native_1.Image, { source: src, style: { width: 50, height: 50 } }));
};
exports.default = OrderTile;
