"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const AbstractAnimator_1 = require("../common/AbstractAnimator");
const styles_1 = require("./styles");
class Tile extends AbstractAnimator_1.Animator {
    constructor(props) {
        super(props);
        this._FOUR_BY_FOUR = 8;
        this.tileFlipHandler = () => {
            this.props.onTileFlipped(this.props.tile, this);
        };
        this.getMatchedTile = (pred) => {
            const size = this._is4x4 ? 48 : 24;
            const _matched = pred()
                ? React.createElement(react_native_1.Image, { source: require('../../img/greencheck.png'), style: { width: size, height: size } })
                :
                    React.createElement(react_native_1.Image, { source: require('../../img/redx.png'), style: { width: size, height: size } });
            return _matched;
        };
        this.tileGenerator = (frontAnimatedStyle, backAnimatedStyle, frontOpacity, backOpacity) => {
            const { tile, matchedTiles, isZenMode, zenSound } = this.props;
            const { flipCard, frontFace, backFace, overlay, card_c, gloss } = styles_1.default;
            const animatedDimensions = { width: "100%", height: "100%" };
            const size = this._is4x4 ? 72 : 48;
            if (tile.isMatched) {
                return (React.createElement(react_native_1.View, { style: [{ position: 'relative' }, flipCard] },
                    React.createElement(react_native_1.ImageBackground, { source: tile.src, style: { width: size, height: size } },
                        React.createElement(react_native_1.View, { style: overlay }, isZenMode() ? (zenSound("ding") && null) : this.getMatchedTile(() => matchedTiles[tile.src] && matchedTiles[tile.src].orderMatched)))));
            }
            return (React.createElement(react_native_1.View, { style: flipCard },
                React.createElement(react_native_1.Animated.View, { style: [frontFace, frontAnimatedStyle, frontOpacity] },
                    React.createElement(react_native_1.TouchableOpacity, { style: [gloss, card_c], onPress: () => this.tileFlipHandler() },
                        React.createElement(react_native_1.Image, { source: require("../../img/cat-yarn.png"), style: {
                                width: 15,
                                height: 15,
                                padding: "25%"
                            } }))),
                React.createElement(react_native_1.Animated.View, { style: [backFace, backAnimatedStyle, backOpacity] },
                    React.createElement(react_native_1.View, { style: [gloss, card_c] },
                        React.createElement(react_native_1.Image, { source: tile.src, style: { width: size, height: size } })))));
        };
        this.flipToFront = this.flipToFront.bind(this);
        this.flipToBack = this.flipToBack.bind(this);
        this._is4x4 = props.gridSize === this._FOUR_BY_FOUR;
    }
    componentWillMount() {
        this._rotationAnimated = new react_native_1.Animated.Value(0);
        this._value = 0;
        this._rotationAnimated.addListener(({ value }) => {
            this._value = value;
        });
        this._frontInterpolate = this._rotationAnimated.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        });
        this._backInterpolate = this._rotationAnimated.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        });
        this._frontOpacity = this._rotationAnimated.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        });
        this._backOpacity = this._rotationAnimated.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        });
    }
    flipToFront() {
        react_native_1.Animated.spring(this._rotationAnimated, {
            toValue: 180,
            friction: 8,
            tension: 10
        }).start();
    }
    flipToBack() {
        react_native_1.Animated.spring(this._rotationAnimated, {
            toValue: 0,
            friction: 8,
            tension: 10
        }).start();
        react_native_1.Animated.timing(this._rotationAnimated, {
            toValue: 0,
            duration: 400,
            easing: react_native_1.Easing.linear
        }).start();
    }
    render() {
        const frontAnimatedStyle = {
            transform: [
                { rotateY: this._frontInterpolate }
            ]
        };
        const backAnimatedStyle = {
            transform: [
                { rotateY: this._backInterpolate }
            ]
        };
        const frontOpacity = {
            opacity: this._frontOpacity
        };
        const backOpacity = {
            opacity: this._backOpacity
        };
        return this.tileGenerator(frontAnimatedStyle, backAnimatedStyle, frontOpacity, backOpacity);
    }
}
exports.default = Tile;
