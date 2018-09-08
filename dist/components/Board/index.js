"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const react_navigation_1 = require("react-navigation");
const Zen_1 = require("../Zen");
const Grid_1 = require("../Grid");
const Timer_1 = require("../Timer");
const Score_1 = require("../Score");
const Order_1 = require("../Order");
const Modal_1 = require("../Modal");
const NewHighScore_1 = require("../NewHighScore");
const common_1 = require("../common");
const lib_1 = require("../../lib");
const types_1 = require("../../types");
const scores_1 = require("../../queries/scores");
const tiles_1 = require("../../actions/tiles");
const order_1 = require("../../actions/order");
const styles_1 = require("./styles");
const MetaBox_1 = require("./MetaBox");
const Audio_1 = require("../../services/Audio");
const scoreReducer = (currentTime, currentAccuracy) => currentTime + currentAccuracy;
class Board extends React.Component {
    constructor(props) {
        super(props);
        this._moveCounterThreshold = 7;
        this.state = {
            gameEndMsg: null,
            moveCounter: 0
        };
        this.incrementMoveCounter = () => {
            this.setState({ moveCounter: this.state.moveCounter + 1 });
        };
        this.hasTimeElasped = (gameEndMsg, fn) => {
            this.setState({ gameEndMsg });
            if (fn)
                return fn(gameEndMsg);
        };
        this.renderTimer = (gridSize, difficulty) => {
            return (React.createElement(Timer_1.default, { hasTimeElasped: this.hasTimeElasped, difficulty: difficulty, gridSize: gridSize }));
        };
        this._backHome = () => {
            this.props.navigation.dispatch(react_navigation_1.NavigationActions.reset({
                index: 0,
                actions: [
                    react_navigation_1.NavigationActions.navigate({ routeName: "Home" }),
                ],
            }));
        };
        this.audioService = new Audio_1.default();
    }
    calcScore(score, time = 0, accuracy = 0) {
        return Math.floor(score + time + accuracy) - Math.floor(this.state.moveCounter / this._moveCounterThreshold);
    }
    ;
    render() {
        const { data } = this.props.navigation.state.params;
        const { score, timer, newGame, initOrder } = this.props;
        const { gameMode, difficulty, gridSize } = data;
        const isZenMode = () => gameMode === "zen";
        const { zen_s, info_c, points_c, points, img, metadata_c, metadata, meta, meta_title, ohNoes } = styles_1.default;
        return (React.createElement(react_native_1.ImageBackground, { style: { flex: 1 }, source: require("../../img/pastel.png") },
            React.createElement(Modal_1.default, { onPlayAgain: () => {
                    this.setState({ gameEndMsg: null, moveCounter: 0 }, () => {
                        initOrder(gridSize, difficulty);
                        newGame(gridSize, difficulty);
                    });
                }, onNavBack: this._backHome, title: this.state.gameEndMsg, isVisible: !!this.state.gameEndMsg },
                React.createElement(common_1.Maybe, { pred: isZenMode, render: () => (React.createElement(react_native_1.View, null,
                        React.createElement(react_native_1.Image, { source: require("../../img/cat-sleep.png"), style: img }))), renderAlt: () => {
                        const query = new scores_1.default(gameMode, difficulty, gridSize), 
                        // @ts-ignore: compile error
                        matchedTiles = Object.values(this.props.order.alreadyMatchedTiles).filter(x => x.orderMatched).length, totalTiles = this.props.order.tiles.length, accuracy = lib_1.getPercentage(matchedTiles, totalTiles), renderScore = (React.createElement(react_native_1.Text, { style: points },
                            React.createElement(common_1.AnimatedCounter, { fn: (val, counter) => val + counter, reducer: scoreReducer, counter: score, firstAcc: timer.time, secondAcc: accuracy }),
                            " points!")), finalScore = this.calcScore(score, timer.time, accuracy);
                        return (React.createElement(react_native_1.View, null,
                            React.createElement(react_native_1.View, { style: points_c },
                                this.state.gameEndMsg === types_1.CRUNCHED ?
                                    React.createElement(react_native_1.Image, { source: require("../../img/trap.png"), style: img }) :
                                    React.createElement(react_native_1.Image, { source: require("../../img/cat-box.png"), style: img }),
                                React.createElement(common_1.Maybe, { pred: () => this.state.gameEndMsg !== types_1.CRUNCHED && finalScore > 0, render: () => {
                                        if (query.isNewHighScore()) {
                                            this.audioService.playSound("win");
                                            return React.createElement(NewHighScore_1.default, { score: finalScore, method: query.insertScore, render: renderScore });
                                        }
                                        else if (query.isLowestScore(finalScore)) {
                                            this.audioService.playSound("win");
                                            return React.createElement(NewHighScore_1.default, { score: finalScore, method: query.updateScore, render: renderScore });
                                        }
                                        else {
                                            if (this.state.gameEndMsg === types_1.CRUNCHED)
                                                this.audioService.playSound("youLose");
                                            else
                                                this.audioService.playSound("gameOver");
                                            return renderScore;
                                        }
                                    }, renderAlt: () => (React.createElement(react_native_1.View, null,
                                        React.createElement(react_native_1.Text, { style: points }, "0 points!"),
                                        this.state.gameEndMsg !== types_1.TIMES_UP_MSG &&
                                            React.createElement(react_native_1.Text, { style: ohNoes }, "Oh Noes! It appears you've been bitten!"))) })),
                            React.createElement(common_1.Separator, null),
                            React.createElement(react_native_1.View, { style: metadata_c },
                                React.createElement(react_native_1.View, { style: metadata },
                                    React.createElement(react_native_1.Text, { style: meta_title }, "Accuracy"),
                                    React.createElement(common_1.Maybe, { pred: () => gameMode === "accuracy", render: () => (React.createElement(react_native_1.Text, { style: meta },
                                            React.createElement(common_1.AnimatedCounter, { fn: (val, counter) => val - counter, counter: accuracy, firstAcc: accuracy, render: accuracy => accuracy + "%" }))), renderAlt: () => React.createElement(react_native_1.Text, { style: meta }, "-") })),
                                React.createElement(react_native_1.View, { style: metadata },
                                    React.createElement(react_native_1.Text, { style: meta_title }, "Moves"),
                                    React.createElement(react_native_1.Text, { style: meta }, this.state.moveCounter)),
                                React.createElement(react_native_1.View, { style: metadata },
                                    React.createElement(react_native_1.Text, { style: meta_title }, "Time"),
                                    React.createElement(common_1.Maybe, { pred: () => gameMode === "vsClock", render: () => (React.createElement(react_native_1.Text, { style: meta },
                                            React.createElement(common_1.AnimatedCounter, { fn: (val, counter) => val - counter, counter: timer.time, firstAcc: timer.time, render: lib_1.formatTime }))), renderAlt: () => React.createElement(react_native_1.Text, { style: meta }, "-") })))));
                    } })),
            React.createElement(common_1.Maybe, { pred: isZenMode, render: Zen_1.default, renderAlt: () => {
                    return (React.createElement(react_native_1.View, { style: { flex: 1 } },
                        React.createElement(react_native_1.View, { style: info_c },
                            React.createElement(MetaBox_1.default, { title: "Moves" }, this.state.moveCounter),
                            React.createElement(react_native_1.View, { style: { flex: 3 } }),
                            React.createElement(MetaBox_1.default, { title: "Score" },
                                React.createElement(Score_1.default, { gameMode: gameMode, difficulty: difficulty }))),
                        React.createElement(Order_1.default, { difficulty: difficulty, gridSize: gridSize })));
                } }),
            React.createElement(react_native_1.View, { style: { flex: 3 } },
                gameMode === "vsClock" && this.renderTimer(gridSize, difficulty),
                React.createElement(Grid_1.default, Object.assign({}, data, { callback: this.hasTimeElasped, onTileFlipped: this.incrementMoveCounter })))));
    }
}
const mapStateToProps = state => ({
    timer: state.timer,
    score: state.score,
    order: state.order
});
const mapDispatchToProps = dispatch => {
    return {
        newGame: redux_1.bindActionCreators(tiles_1.newGame, dispatch),
        initOrder: redux_1.bindActionCreators(order_1.initOrder, dispatch)
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Board);
