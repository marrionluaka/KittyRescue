"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const lib_1 = require("../../lib");
const PreventDoubleClick = (WrappedComponent) => {
    class _PreventDoubleClick extends React.PureComponent {
        constructor() {
            super(...arguments);
            this.onPress = lib_1.debounce(() => this.props.onPress && this.props.onPress(), 300);
        }
        render() {
            return React.createElement(WrappedComponent, Object.assign({}, this.props, { onPress: this.onPress }));
        }
    }
    return _PreventDoubleClick;
};
exports.PreventDoubleClick = PreventDoubleClick;
