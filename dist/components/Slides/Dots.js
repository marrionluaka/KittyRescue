"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Dots = ({ data, offset }) => {
    const SCREEN_WIDTH = react_native_1.Dimensions.get('window').width;
    return (React.createElement(react_native_1.View, { style: {
            flexDirection: "row",
            alignSelf: "center",
            position: "absolute",
            bottom: 95
        } }, data.map((el, idx) => {
        const backgroundColor = offset / SCREEN_WIDTH === idx ? "#333" : "rgba(0,0,0,.2)";
        return (React.createElement(react_native_1.View, { key: Math.random(), style: {
                width: 10,
                height: 10,
                borderRadius: 50,
                backgroundColor,
                padding: "1%",
                margin: 1
            } }));
    })));
};
exports.default = Dots;
