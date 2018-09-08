"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_navigation_1 = require("react-navigation");
const react_redux_1 = require("react-redux");
const store_1 = require("./store");
const Gameboard_1 = require("./screens/Gameboard");
const GameConfigurator_1 = require("./screens/GameConfigurator");
const HighScores_1 = require("./screens/HighScores");
const HighScoresDetail_1 = require("./screens/HighScores/HighScoresDetail");
const Home_1 = require("./screens/Home");
const HowToPlay_1 = require("./screens/HowToPlay");
const App = react_navigation_1.StackNavigator({
    // Main Screens
    Home: { screen: Home_1.default },
    HowToPlay: { screen: HowToPlay_1.default },
    HighScores: { screen: HighScores_1.default },
    // Game Screens
    GameConfigurator: { screen: GameConfigurator_1.default },
    Game: { screen: Gameboard_1.default },
    //Test: { screen: Test },
    // High Scores Screens
    HighScoresDetail: { screen: HighScoresDetail_1.default },
});
exports.default = () => {
    return (React.createElement(react_redux_1.Provider, { store: store_1.default },
        React.createElement(App, null)));
};
