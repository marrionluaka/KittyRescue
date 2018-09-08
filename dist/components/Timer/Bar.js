"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const AbstractAnimator_1 = require("../common/AbstractAnimator");
const lib_1 = require("../../lib");
const styles = react_native_1.StyleSheet.create({
    progress_container: {
        borderColor: '#333',
        backgroundColor: '#ccc',
        position: 'relative'
    },
    progress_status: {
        color: '#fff',
        fontSize: 16,
        paddingTop: 1,
        paddingBottom: 1,
        fontFamily: "riffic",
        alignSelf: 'center',
        position: 'absolute',
        top: -1
    }
});
class Bar extends AbstractAnimator_1.Animator {
    constructor(props) {
        super(props);
        this.initialState = { progress: null };
        this.initialColors = ['rgb(199, 45, 50)', 'rgb(224, 150, 39)', 'rgb(101, 203, 25)'];
        this.state = this.initialState;
    }
    componentWillMount() {
        this.progress = new react_native_1.Animated.Value(0);
        this.getProgressStyles = this.getProgressStyles.bind(this);
    }
    componentWillReceiveProps(newProps) {
        // will happen only once 
        if (this.state.progress === null)
            this.initialVal = newProps.time;
        const prevVal = this.state.progress === null
            ? 100
            : lib_1.getPercentage(this.state.progress, this.initialVal);
        const nextVal = this.state.progress === null
            ? 100
            : lib_1.getPercentage(newProps.time, this.initialVal);
        this.animate({
            animatedProp: this.progress,
            initialValue: prevVal,
            toValue: nextVal,
            duration: 1000
        });
        this.setState({ progress: newProps.time });
    }
    componentWillUnmount() {
        this.setState(this.initialState);
    }
    getProgressStyles() {
        const { width } = react_native_1.Dimensions.get('window');
        const { colors } = this.props;
        const available_width = width - 2 - 6;
        const animated_width = this.progress.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [0, available_width / 2, available_width]
        });
        const animated_color = this.progress.interpolate({
            inputRange: [0, 50, 100],
            outputRange: !!colors ? colors : this.initialColors
        });
        return {
            height: 20,
            width: animated_width,
            backgroundColor: animated_color
        };
    }
    render() {
        const { colors } = this.props;
        const _style = this.state.progress === this.initialVal ? {
            height: 20,
            width: "100%",
            backgroundColor: !!colors ? colors[colors.length - 1] : this.initialColors[this.initialColors.length - 1]
        } : this.getProgressStyles();
        return (React.createElement(react_native_1.View, { style: {
                marginLeft: 1,
                marginRight: 1
            } },
            React.createElement(react_native_1.View, { style: styles.progress_container },
                React.createElement(react_native_1.Animated.View, { style: _style }),
                React.createElement(react_native_1.Text, { style: styles.progress_status }, this.props.children))));
    }
}
exports.default = Bar;
