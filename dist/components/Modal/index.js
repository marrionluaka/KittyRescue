"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Entypo_1 = require("react-native-vector-icons/Entypo");
const styles_1 = require("./styles");
const { container, popup, title_c, title_txt, btn_c, btn, btn_txt } = styles_1.default;
const Popup = ({ isVisible, children, title, onPlayAgain, onNavBack }) => {
    return (React.createElement(react_native_1.Modal, { transparent: true, animationType: "fade", visible: isVisible, onRequestClose: () => { } },
        React.createElement(react_native_1.View, { style: styles_1.default.container },
            React.createElement(react_native_1.View, { style: popup },
                React.createElement(react_native_1.View, { style: title_c },
                    React.createElement(react_native_1.Text, { style: title_txt }, title)),
                children,
                React.createElement(react_native_1.View, { style: btn_c },
                    React.createElement(react_native_1.TouchableOpacity, { onPress: onPlayAgain, style: [btn, {
                                backgroundColor: "#a2b798",
                                flexDirection: "row",
                                marginRight: 0
                            }] },
                        React.createElement(Entypo_1.default, { style: { paddingRight: 3 }, name: "cw", size: 18, color: "#fff" }),
                        React.createElement(react_native_1.Text, { style: btn_txt }, "Play again")),
                    React.createElement(react_native_1.TouchableOpacity, { onPress: onNavBack, style: [btn, { backgroundColor: "#e25b45" }] },
                        React.createElement(react_native_1.Text, { style: btn_txt }, "Exit")))))));
};
exports.default = Popup;
