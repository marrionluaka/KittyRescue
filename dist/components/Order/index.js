"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const R = require("ramda");
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const orderActions = require("../../actions/order");
const OrderTile_1 = require("./OrderTile");
const globals_1 = require("../../globals");
const styles_1 = require("./styles");
const Audio_1 = require("../../services/Audio");
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.currentPointer = (src) => {
            const { tiles, pointer } = this.props.order;
            return this.isValidPointer() ? tiles[pointer].src === src : 0;
        };
        this.isValidPointer = () => {
            const { tiles, pointer } = this.props.order;
            return pointer < tiles.length;
        };
        this.soundManager = pred => {
            return R.ifElse(pred, () => this.audioService.playSound("ding"), () => this.audioService.playSound("wrong"))(null);
        };
        this.audioService = new Audio_1.default();
        this.sorter = R.sortBy(R.prop("idx"));
    }
    componentWillMount() {
        const { initOrder, gridSize, difficulty } = this.props;
        initOrder(gridSize, difficulty);
    }
    componentWillReceiveProps(newProps) {
        const { initOrder, gridSize, difficulty } = newProps;
        const { alreadyMatchedTiles, tiles, pointer } = newProps.order;
        if (pointer === 0)
            return;
        // @ts-ignore: compile error
        let values = Object.values(alreadyMatchedTiles);
        if (!!values.length && this.isValidPointer()) {
            const orderMatched = this.sorter(values)[pointer - 1].orderMatched;
            this.soundManager(() => orderMatched);
            this.props.addPoints(orderMatched ? globals_1.MAX_SCORE : globals_1.MIN_SCORE);
            this.props.orderMatched(alreadyMatchedTiles);
        }
    }
    render() {
        const { tiles, pointer } = this.props.order;
        return (React.createElement(react_native_1.View, { style: styles_1.default.circle },
            React.createElement(react_native_1.View, { style: styles_1.default.innerCircle },
                React.createElement(react_native_1.Text, { style: styles_1.default.text }, "Target"),
                this.isValidPointer() ?
                    (React.createElement(OrderTile_1.default, Object.assign({}, tiles[pointer])))
                    : (React.createElement(OrderTile_1.default, Object.assign({}, tiles[tiles.length - 1]))))));
    }
}
const mapStateToProps = state => ({
    order: state.order
});
exports.default = react_redux_1.connect(mapStateToProps, orderActions)(Order);
