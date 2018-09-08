"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const AbstractAnimator_1 = require("./AbstractAnimator");
class AnimatedText extends AbstractAnimator_1.Animator {
    constructor(props) {
        super(props);
        this.springValue = new react_native_1.Animated.Value(0);
    }
    componentDidMount() {
        this.animate({
            animatedProp: this.springValue,
            initialValue: 0,
            toValue: 20,
            duration: 300
        });
    }
    render() {
        return (React.createElement(react_native_1.Animated.Text, { style: [{ height: this.springValue }, this.props.styles] }, this.props.children));
    }
}
exports.AnimatedText = AnimatedText;
