"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const globals_1 = require("../../globals");
const lib_1 = require("../../lib");
const common_1 = require("../common");
const lifeActions = require("../../actions/life");
const _timeThreshold = 60, _frequency = 1000;
class Life extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (this.props.lifeOptions.isNewGame)
            this.props.decreaseLife();
    }
    componentWillReceiveProps(props) {
        if (props.lifeOptions.isNewGame)
            props.decreaseLife();
    }
    render() {
        return (React.createElement(react_native_1.View, { style: { backgroundColor: "red" } },
            !this.props.lifeOptions.hasTimerStarted &&
                this.props.lifeOptions.lives < globals_1.MAX_LIVES ?
                React.createElement(common_1.AnimatedCounter, { fn: (val, counter) => val - counter, counter: _timeThreshold, firstAcc: _timeThreshold, frequency: _frequency, onComplete: () => {
                        this.props.increaseLife();
                        this.props.stopTimer();
                    }, reset: counter => this.props.lifeOptions.lives < globals_1.MAX_LIVES, render: lib_1.formatTime }) : null,
            React.createElement(react_native_1.Text, null, this.props.lifeOptions.lives)));
    }
}
const mapStateToProps = state => ({
    lifeOptions: state.life
});
exports.default = react_redux_1.connect(mapStateToProps, lifeActions)(Life);
