"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const ProgressBar_1 = require("../common/ProgressBar");
const common_1 = require("../common");
class MultiStepValidator extends React.Component {
    constructor(props) {
        super(props);
        this._order = [];
        this.panels = React.Children.toArray(this.props.children);
        this.ONE_HUNDRED_PERCENT = 100;
        this._loadingPercentage = this.ONE_HUNDRED_PERCENT / this.panels.length;
        this._panelBg = ["#b3ddd1", "#f5b994", "#d1dce2"];
        this.state = {
            item: "None",
            panel: 0,
            data: {},
            progress: 0
        };
        this.push = (key, value, callback = () => { }) => {
            this.setState({
                progress: this.state.progress === this.ONE_HUNDRED_PERCENT
                    ? this.state.progress
                    : this.state.progress + this._loadingPercentage,
                data: Object.assign({}, this.state.data, {
                    [key]: value
                })
            }, callback);
        };
        this.showNext = (panel) => {
            if (panel < this.panels.length - 1)
                this.setState({ panel: panel + 1 });
        };
        this.disable = (data, current) => {
            const values = Object.keys(data)
                .slice(current)
                .reduce((acc, val) => {
                acc[val] = null;
                return acc;
            }, {});
            return Object.assign({}, data, values);
        };
        this.showCurrent = (panel) => {
            return this.setState({
                progress: panel === 0 ?
                    this.state.progress * panel
                    : this.state.progress === this.ONE_HUNDRED_PERCENT
                        ? this.state.progress - (this._loadingPercentage * (panel + 1))
                        : this.state.progress - this._loadingPercentage,
                panel: panel,
                data: this.disable(this.state.data, panel)
            });
        };
        this.onComplete = callback => {
            callback(this.state.data);
        };
        this._renderSteps = (step) => {
            const current = !this.state.data[step.key] ?
                this.props.inactiveBtn(step, this.state.panel) : step.pos <= this.state.panel ?
                this.props.activeBtn(step, this.showCurrent.bind(this, step.pos), this.state.data[step.key], step.pos === this.panels.length - 1) : null;
            return (React.createElement(react_native_1.View, { style: { flex: 1 }, key: step.pos }, current));
        };
        this.skipTo = (panel) => {
            return this.setState({
                panel,
                progress: this.state.progress + this._loadingPercentage
            });
        };
        this._prepareChildrenData = (child, idx) => {
            this._order.length < this.panels.length && this._order.push({
                name: child.props.name,
                key: child.props.propKey,
                pos: idx
            });
            return React.cloneElement(child, {
                showNext: this.showNext.bind(this, idx),
                push: this.push.bind(this, child.props.propKey),
                onComplete: this.onComplete,
                skipTo: this.skipTo
            });
        };
    }
    render() {
        let items = React.Children.map(this.props.children, this._prepareChildrenData);
        return (React.createElement(react_native_1.View, { style: { flex: 1 } },
            React.createElement(react_native_1.View, { style: { flex: 1.8, backgroundColor: this._panelBg[this.state.panel] } },
                React.createElement(common_1.BackButton, { backHomeFn: this.props.backHomeFn }),
                React.createElement(react_native_1.View, { style: {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    } },
                    React.createElement(react_native_1.View, { style: { flex: 1, justifyContent: "center", alignItems: "center" } },
                        React.createElement(react_native_1.Image, { source: this.props.bannersSrc[this.state.panel] })),
                    React.createElement(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'flex-end'
                        } }, this._order.map(this._renderSteps)))),
            React.createElement(ProgressBar_1.ProgressBar, { color: "#8ba753", progress: this.state.progress, seed: () => this.state.panel * this._loadingPercentage }),
            React.createElement(react_native_1.View, { style: { flex: 2 } }, items[this.state.panel])));
    }
}
exports.default = MultiStepValidator;
