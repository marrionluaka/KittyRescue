"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const AbstractAnimator_1 = require("../common/AbstractAnimator");
class Panel extends AbstractAnimator_1.Animator {
    constructor(props) {
        super(props);
        this._offSetRightAnimated = new react_native_1.Animated.Value(0);
        this._opacityAnimated = new react_native_1.Animated.Value(0);
    }
    componentDidMount() {
        this.animate({
            animatedProp: this._offSetRightAnimated,
            initialValue: -100,
            toValue: 0,
            duration: 400
        });
        this.animate({
            animatedProp: this._opacityAnimated,
            initialValue: 0,
            toValue: 1,
            duration: 500
        });
    }
    render() {
        return (React.createElement(react_native_1.Animated.View, { style: {
                flex: 1,
                right: this._offSetRightAnimated,
                opacity: this._opacityAnimated
            } }, this.props.render(this.props.push, this.props.showNext, this.props.onComplete, this.props.skipTo)));
    }
}
exports.default = Panel;
