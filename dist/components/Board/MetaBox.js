"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const styles_1 = require("./styles");
const MetaBox = ({ children, title }) => {
    const { metaBox, metaTitle, metaText } = styles_1.default;
    return (React.createElement(react_native_1.View, { style: metaBox },
        React.createElement(react_native_1.Text, { style: metaTitle }, title),
        React.createElement(react_native_1.Text, { style: metaText }, children)));
};
exports.default = MetaBox;
