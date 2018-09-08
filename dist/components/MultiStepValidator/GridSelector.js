"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const styles_1 = require("./styles");
const PreventDoubleClick_1 = require("../common/PreventDoubleClick");
const { playBtn, gridSize, gridTitle, playBtnText, gridContainer, gridTouchable, gridSizeContainer, gridThumbnailContiner } = styles_1.default;
const gridColors = {
    "4x4": "#FF598F",
    "6x6": "#FEA564"
};
const Btn = PreventDoubleClick_1.PreventDoubleClick(react_native_1.TouchableOpacity);
const GridSelector = ({ size = "Normal", push, title, subTitle, disabled, marginRight = false }) => {
    return (React.createElement(react_native_1.View, { style: [gridContainer, { paddingRight: marginRight ? 0 : 15 }] },
        React.createElement(Btn, { onPress: !!disabled ? () => { } : push, style: gridTouchable },
            React.createElement(react_native_1.View, { style: gridThumbnailContiner },
                React.createElement(react_native_1.Text, { style: [gridTitle, { backgroundColor: gridColors[title.replace(/ /g, '')] }] }, title)),
            React.createElement(react_native_1.View, { style: gridSizeContainer },
                React.createElement(react_native_1.Text, { style: gridSize }, size),
                React.createElement(react_native_1.Text, { style: { textAlign: "center", lineHeight: 25 } }, subTitle)),
            React.createElement(react_native_1.View, { style: playBtn },
                React.createElement(react_native_1.Text, { style: playBtnText }, "Play")))));
};
exports.default = GridSelector;
