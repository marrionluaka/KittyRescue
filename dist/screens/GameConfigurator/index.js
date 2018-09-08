"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Feather_1 = require("react-native-vector-icons/Feather");
const react_navigation_1 = require("react-navigation");
const MultiStepValidator_1 = require("../../components/MultiStepValidator");
const Panel_1 = require("../../components/MultiStepValidator/Panel");
const PanelTile_1 = require("../../components/MultiStepValidator/PanelTile");
const GridSelector_1 = require("../../components/MultiStepValidator/GridSelector");
const AnimatedText_1 = require("../../components/common/AnimatedText");
const lib_1 = require("../../lib");
class GameConfigurator extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { alreadyCalled: false };
        this._push = (grid, push, onComplete) => {
            if (this.state.alreadyCalled)
                return;
            this.setState({
                alreadyCalled: true
            }, () => push(grid, onComplete.bind(null, data => this._navigate(data))));
        };
        this._navigate = (data) => {
            setTimeout(() => {
                this.props.navigation.navigate("Game", { data });
            }, 500);
        };
        this._backHome = () => {
            this.props.navigation.dispatch(react_navigation_1.NavigationActions.reset({
                index: 0,
                actions: [
                    react_navigation_1.NavigationActions.navigate({ routeName: "Home" }),
                ],
            }));
        };
    }
    render() {
        const _commonBtnStyles = {
            padding: 10
        };
        const { _navigate } = this;
        return (React.createElement(MultiStepValidator_1.default, { backHomeFn: this._backHome, bannersSrc: [
                require("../../img/cat-hungry.png"),
                require("../../img/cat-food-hearts.png"),
                require("../../img/cat-cage.png")
            ], activeBtn: ({ pos, name }, showCurrent, selected, isLast) => {
                const onPress = isLast ? () => { } : showCurrent;
                const _converToGrid = (item) => item === 8 ? "4x4" : "6x6";
                const _sanitize = (item) => !item ? null : isNaN(+item) ? lib_1.capitalizeFirstLetter(item) : _converToGrid(item);
                return (React.createElement(react_native_1.TouchableOpacity, { style: _commonBtnStyles, onPress: onPress },
                    React.createElement(react_native_1.Text, { style: { textAlign: 'center', fontFamily: 'riffic', color: "#615f5c" } }, name),
                    React.createElement(AnimatedText_1.AnimatedText, { styles: {
                            color: "#808080",
                            textAlign: 'center',
                            fontFamily: 'riffic',
                            fontSize: 12
                        } }, _sanitize(selected))));
            }, inactiveBtn: ({ name, pos }, currentPos) => {
                return (React.createElement(react_native_1.View, { style: _commonBtnStyles },
                    React.createElement(react_native_1.Text, { style: {
                            textAlign: 'center',
                            color: currentPos === pos ? "#615f5c" : "#aaa",
                            fontFamily: 'riffic'
                        } }, name)));
            } },
            React.createElement(Panel_1.default, { name: "Game Mode", propKey: "gameMode", render: (push, showNext, _, skipTo) => {
                    return (React.createElement(react_native_1.View, { style: { flex: 1 } }, PanelTile_1.default([
                        {
                            icon: React.createElement(Feather_1.default, { name: "clock", size: 20, color: "#fff" }),
                            displayName: "Vs Clock",
                            subTitle: "Battle it out vs the clock!",
                            backgroundColor: "#7d4b82",
                            push: push.bind(null, "vsClock", showNext)
                        },
                        {
                            icon: React.createElement(Feather_1.default, { name: "target", size: 20, color: "#fff" }),
                            displayName: "Accuracy",
                            subTitle: "Measure how accurate you are!",
                            backgroundColor: "#d66d93",
                            push: push.bind(null, "accuracy", showNext)
                        },
                        {
                            icon: React.createElement(Feather_1.default, { name: "box", size: 20, color: "#fff" }),
                            displayName: "Zen",
                            subTitle: "Classic stress free game.",
                            backgroundColor: "#3fbcbd",
                            push: push.bind(null, "zen", skipTo.bind(null, 2))
                        }
                    ])));
                } }),
            React.createElement(Panel_1.default, { name: "Difficulty", propKey: "difficulty", render: (push, showNext) => {
                    return (React.createElement(react_native_1.View, { style: { flex: 1 } }, PanelTile_1.default([
                        {
                            icon: React.createElement(Feather_1.default, { name: "star", size: 20, color: "#fff" }),
                            displayName: "Easy",
                            backgroundColor: "#aed4d5",
                            subTitle: "Get a feel for the game!",
                            push: push.bind(null, "easy", showNext)
                        },
                        {
                            icon: [
                                React.createElement(Feather_1.default, { name: "star", size: 20, color: "#fff" }),
                                React.createElement(Feather_1.default, { name: "star", size: 20, color: "#fff" })
                            ],
                            displayName: "Medium",
                            subTitle: "Challenge yourself!",
                            backgroundColor: "#f9cc88",
                            push: push.bind(null, "medium", showNext)
                        },
                        {
                            icon: [
                                React.createElement(Feather_1.default, { name: "star", size: 20, color: "#fff" }),
                                React.createElement(Feather_1.default, { name: "star", size: 20, color: "#fff" }),
                                React.createElement(Feather_1.default, { name: "star", size: 20, color: "#fff" })
                            ],
                            displayName: "Hard",
                            subTitle: "Go beyond your limits!",
                            backgroundColor: "#fd475d",
                            push: push.bind(null, "hard", showNext)
                        }
                    ])));
                } }),
            React.createElement(Panel_1.default, { name: "Grid Size", propKey: "gridSize", render: (push, showNext, onComplete) => {
                    const FOUR_BY_FOUR = 8, SIX_BY_SIX = 18;
                    return (React.createElement(react_native_1.View, { style: { flex: 1, flexDirection: 'row' } },
                        React.createElement(GridSelector_1.default, { push: () => this._push(FOUR_BY_FOUR, push, onComplete), title: "4 x 4", subTitle: "Standard size.", marginRight: true, size: "Normal", disabled: this.state.alreadyCalled }),
                        React.createElement(GridSelector_1.default, { push: () => this._push(SIX_BY_SIX, push, onComplete), title: "6 x 6", subTitle: "Complex size.", size: "Large", disabled: this.state.alreadyCalled })));
                } })));
    }
}
GameConfigurator.navigationOptions = { header: null };
exports.default = GameConfigurator;
