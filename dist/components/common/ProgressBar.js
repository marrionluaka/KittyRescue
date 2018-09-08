"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const AbstractAnimator_1 = require("../common/AbstractAnimator");
class ProgressBar extends AbstractAnimator_1.Animator {
    constructor(props) {
        super(props);
        this._widthAnimated = new react_native_1.Animated.Value(this.props.progress);
    }
    componentDidMount() {
        this.animate({
            animatedProp: this._widthAnimated,
            initialValue: this.props.progress,
            toValue: 100,
            duration: 500
        });
    }
    componentDidUpdate() {
        this.animate({
            animatedProp: this._widthAnimated,
            initialValue: this.props.seed(),
            toValue: 100,
            duration: 500
        });
    }
    render() {
        /** .interpolate() function helps us transpile our animation values into real style values */
        const width = this._widthAnimated.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', `${this.props.progress}%`]
        });
        return (React.createElement(react_native_1.View, { style: {
                width: '100%',
                backgroundColor: '#ddd'
            } },
            React.createElement(react_native_1.Animated.View, { style: {
                    width,
                    height: 5,
                    backgroundColor: this.props.color || "#03A9F4"
                } })));
    }
}
exports.ProgressBar = ProgressBar;
