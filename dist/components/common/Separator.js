"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const styles = react_native_1.StyleSheet.create({
    separator: {
        height: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "rgba(125,125,125, .4)"
    }
});
const Separator = () => (React.createElement(react_native_1.View, { style: styles.separator }));
exports.Separator = Separator;
