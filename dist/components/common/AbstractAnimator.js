"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class Animator extends React.Component {
    animate({ animatedProp, initialValue, toValue, duration, easing = 'linear' }) {
        animatedProp.setValue(initialValue);
        react_native_1.Animated.timing(animatedProp, {
            toValue,
            duration,
            easing: react_native_1.Easing[easing]
        }).start();
    }
}
exports.Animator = Animator;
