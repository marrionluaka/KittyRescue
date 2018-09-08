"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const Bar_1 = require("./Bar");
const lib_1 = require("../../lib");
const globals_1 = require("../../globals");
const countdown = require("../../actions/timer");
const types_1 = require("../../types");
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerID: null
        };
    }
    componentWillReceiveProps(prev) {
        const _timer = globals_1.timerLvls[this.props.gridSize][this.props.difficulty];
        if (prev.timer.time === _timer)
            clearTimeout(this.state.timerID);
        if (prev.timer.hasGameStarted && prev.timer.time === _timer)
            this.setState({ timerID: setInterval(this.props.countdown, 1000) });
    }
    componentDidUpdate() {
        if (this.props.timer.time === 0 || this.props.timer.invalidateTimer) {
            this.props.hasTimeElasped(this.props.timer.invalidateTimer || types_1.TIMES_UP_MSG);
            clearTimeout(this.state.timerID);
        }
    }
    componentWillUnmount() {
        clearTimeout(this.state.timerID);
    }
    render() {
        return (React.createElement(react_native_1.View, null,
            React.createElement(Bar_1.default, { time: this.props.timer.time, colors: ["#e25b45", "#febd3d", "#a2b798"] }, lib_1.formatTime(this.props.timer.time))));
    }
}
const mapStateToProps = state => ({
    timer: state.timer
});
exports.default = react_redux_1.connect(mapStateToProps, countdown)(Timer);
