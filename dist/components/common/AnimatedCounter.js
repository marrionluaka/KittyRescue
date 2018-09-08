"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const lib_1 = require("../../lib");
class AnimatedCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: this.props.counter
        };
        this.counterSetter = (val, counter) => this.setState({ counter: this.props.fn(val, counter) });
    }
    componentDidMount() {
        const { reducer, counter, firstAcc, secondAcc, frequency = 10, onComplete = () => { }, reset = () => { } } = this.props;
        setTimeout(() => {
            lib_1.animateCounter({
                fn: this.counterSetter,
                reducer,
                counter,
                firstAcc,
                secondAcc,
                frequency,
                onComplete,
                reset
            });
        }, 900);
    }
    render() {
        const _counter = !!this.props.render ? this.props.render(this.state.counter) : this.state.counter;
        return React.createElement(react_native_1.Text, null, _counter);
    }
}
exports.AnimatedCounter = AnimatedCounter;
