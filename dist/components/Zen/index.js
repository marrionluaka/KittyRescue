"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Zen = () => {
    return (React.createElement(react_native_1.View, { style: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        } },
        React.createElement(react_native_1.Text, { style: {
                fontFamily: "riffic",
                fontSize: 30,
                color: "#fff",
                padding: 20,
                paddingTop: 30,
                paddingBottom: 30,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#fff"
            } }, "ZEN")));
};
exports.default = Zen;
