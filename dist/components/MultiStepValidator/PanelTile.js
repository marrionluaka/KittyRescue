"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const styles_1 = require("./styles");
const { panelDisplayText, panelIconContainer, panelDisplayContainer } = styles_1.default;
const _createTiles = (list) => {
    return list.map(el => {
        return (React.createElement(react_native_1.TouchableOpacity, { key: el.displayName, onPress: el.push, style: {
                flexDirection: 'row',
                flex: 1
            } },
            React.createElement(react_native_1.View, { style: [panelIconContainer, {
                        backgroundColor: el.backgroundColor || "#03A9F4"
                    }] },
                React.createElement(react_native_1.Text, { style: {
                        textAlign: 'center'
                    } }, Array.isArray(el.icon) ? (el.icon.map((icon, idx) => React.createElement(react_native_1.Text, { key: idx }, icon))) : el.icon)),
            React.createElement(react_native_1.View, { style: panelDisplayContainer },
                React.createElement(react_native_1.Text, { style: panelDisplayText }, el.displayName),
                React.createElement(react_native_1.Text, { style: {
                        paddingLeft: 15
                    } }, !!el.subTitle && el.subTitle))));
    });
};
const PanelTile = (data) => _createTiles(data);
exports.default = PanelTile;
