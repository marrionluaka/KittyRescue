"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const styles_1 = require("./styles");
const images = {
    "fridge": require("../../img/cat-fridge-big.png"),
    "bite": require("../../img/dog.png"),
    "cart": require("../../img/cat-cart-big.png")
};
const SlideItem = ({ title, text, slideImg, children, renderButton }) => {
    const { container, slideText } = styles_1.default;
    return (React.createElement(react_native_1.ImageBackground, { source: require("../../img/pastel.png"), style: container },
        React.createElement(react_native_1.View, { style: {
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center'
            } },
            React.createElement(react_native_1.View, { style: {
                    borderWidth: 1,
                    borderColor: "#808080",
                    height: "85%",
                    width: "85%",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center"
                } },
                React.createElement(react_native_1.Image, { source: images[slideImg] }))),
        React.createElement(react_native_1.View, { style: {
                flex: 2,
                alignItems: 'flex-start',
                // marginTop: 30,
                paddingLeft: 20,
                paddingRight: 20
            } },
            React.createElement(react_native_1.View, null,
                React.createElement(react_native_1.Text, { style: {
                        color: "#808080",
                        fontFamily: "riffic",
                        paddingBottom: 5,
                        fontSize: 21,
                        textAlign: 'center'
                    } }, title),
                React.createElement(react_native_1.Text, { style: slideText }, text))),
        renderButton()));
};
exports.default = SlideItem;
