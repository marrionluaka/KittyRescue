"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
const styles_1 = require("./styles");
const HighScoresDetail_1 = require("./HighScoresDetail");
const BackButton_1 = require("../../components/common/BackButton");
class HighScores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameMode: "vsClock",
            display: "Vs Clock"
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
        const { header, content, tabs, tabs_c, tabs_text, leaderboard_text } = styles_1.default;
        return (React.createElement(react_native_1.ImageBackground, { style: { flex: 1 }, source: require("../../img/pastel.png") },
            React.createElement(BackButton_1.BackButton, { backHomeFn: this._backHome }),
            React.createElement(react_native_1.View, { style: header },
                React.createElement(react_native_1.Image, { source: require("../../img/cat-yarn.png") }),
                React.createElement(react_native_1.Text, { style: leaderboard_text }, "leaderboard".toUpperCase()),
                React.createElement(react_native_1.View, { style: tabs_c },
                    React.createElement(react_native_1.TouchableOpacity, { style: [tabs, {
                                backgroundColor: this.state.gameMode === "vsClock" ? "#fff" : "transparent",
                            }], onPress: () => { this.setState({ gameMode: "vsClock", display: "Vs Clock" }); } },
                        React.createElement(react_native_1.Text, { style: [tabs_text, { color: this.state.gameMode === "vsClock" ? "#808080" : "#fff" }] }, "Vs Clock")),
                    React.createElement(react_native_1.TouchableOpacity, { style: [tabs, {
                                backgroundColor: this.state.gameMode === "accuracy" ? "#fff" : "transparent"
                            }], onPress: () => { this.setState({ gameMode: "accuracy", display: "Accuracy" }); } },
                        React.createElement(react_native_1.Text, { style: [tabs_text, { color: this.state.gameMode === "accuracy" ? "#808080" : "#fff" }] }, "Accuracy")))),
            React.createElement(react_native_1.View, { style: content },
                React.createElement(react_native_1.ScrollView, null,
                    React.createElement(HighScoresDetail_1.default, { gameMode: this.state.gameMode, display: this.state.display, backHome: this._backHome })))));
    }
}
HighScores.navigationOptions = { header: null };
;
exports.default = HighScores;
