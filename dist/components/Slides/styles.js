"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
exports.default = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        width: react_native_1.Dimensions.get("window").width
    },
    slideText: {
        color: "#808080",
        textAlign: 'center',
        lineHeight: 25
    }
});
