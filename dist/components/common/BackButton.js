"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Feather_1 = require("react-native-vector-icons/Feather");
const styles = react_native_1.StyleSheet.create({
    backArrow: {
        marginTop: 15,
        marginLeft: 15
    }
});
const BackButton = ({ backHomeFn }) => {
    return (React.createElement(react_native_1.TouchableOpacity, { onPress: backHomeFn },
        React.createElement(Feather_1.default, { style: styles.backArrow, name: "arrow-left", size: 30, color: "#fff" })));
};
exports.BackButton = BackButton;
