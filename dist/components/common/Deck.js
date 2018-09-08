"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const styles = react_native_1.StyleSheet.create({
    cardStack: {
        position: 'absolute',
        width: "100%"
    }
});
class Deck extends React.Component {
    constructor(props) {
        super(props);
        this._SCREEN_WIDTH = react_native_1.Dimensions.get("window").width;
        this._SWIPE_THRESHOLD = .25 * this._SCREEN_WIDTH;
        this._SWIPE_OUT_DURATION = 250;
        this.state = { index: 0 };
        this._position = new react_native_1.Animated.ValueXY();
        this._panResponder = react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, { dx, dy }) => {
                this._position.setValue({ x: dx, y: 0 });
            },
            onPanResponderRelease: (e, { dx, dy }) => {
                switch (true) {
                    case dx > this._SWIPE_THRESHOLD:
                        this.forceSwipe('right');
                        break;
                    case dx < -this._SWIPE_THRESHOLD:
                        this.forceSwipe('left');
                        break;
                    default:
                        this.resetPosition();
                }
            }
        });
    }
    componentWillMount() {
        react_native_1.UIManager.setLayoutAnimationEnabledExperimental && react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
        react_native_1.LayoutAnimation.spring();
    }
    forceSwipe(direction) {
        react_native_1.Animated.timing(this._position, {
            toValue: { x: direction === 'right' ? this._SCREEN_WIDTH : -this._SCREEN_WIDTH, y: 0 },
            duration: this._SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }
    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this._position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
    }
    resetPosition() {
        react_native_1.Animated.spring(this._position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }
    renderCards() {
        if (this.state.index >= this.props.data.length)
            return this.props.renderNoMoreCard();
        return this.props.data.map((item, idx) => {
            if (idx < this.state.index)
                return null;
            if (idx === this.state.index) {
                return (React.createElement(react_native_1.Animated.View, Object.assign({ key: item.id, style: [this.getCardStyle(), styles.cardStack, { zIndex: idx * -1 }] }, this._panResponder.panHandlers), this.props.renderCard(item)));
            }
            return (React.createElement(react_native_1.Animated.View, { key: item.id, style: [styles.cardStack, { zIndex: idx * -1, top: 10 * (idx - this.state.index) }] }, this.props.renderCard(item)));
        }).reverse();
    }
    getCardStyle() {
        const { _position, _SCREEN_WIDTH } = this;
        const translateY = _position.x.interpolate({
            inputRange: [-_SCREEN_WIDTH * 1.5, 0, _SCREEN_WIDTH * 1.5],
            outputRange: [-30, 0, 30],
            extrapolate: 'clamp'
        });
        return Object.assign({}, this._position.getLayout(), { transform: [{ translateY }] });
    }
    render() {
        return (React.createElement(react_native_1.View, null, this.renderCards()));
    }
}
Deck.defaultProps = {
    onSwipeLeft: () => { },
    onSwipeRight: () => { },
    renderNoMoreCard: () => React.createElement(react_native_1.Text, null, "No more Cards")
};
exports.Deck = Deck;
