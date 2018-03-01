import * as React from "react";
import { StackNavigator } from "react-navigation";
import getSlideFromRightTransition from "react-navigation-slide-from-right-transition";
import { Provider } from "react-redux";
import store from "./store";

import Difficulty from "./screens/Difficulty";
import Game from "./screens/Gameboard";
import GameMode from "./screens/GameMode";
import GridSelector from "./screens/GridSelector";
import HighScores from "./screens/HighScores";
import HighScoresDetail from "./screens/HighScores/HighScoresDetail";
import Home from "./screens/Home";
import HowToPlay from "./screens/HowToPlay";

const App = StackNavigator(
    {
        // Main Screens
        Home: { screen: Home },
        HowToPlay: { screen: HowToPlay },
        HighScores: { screen: HighScores },

        // Game Screens
        GameMode: { screen:  GameMode },
        Difficulty: { screen: Difficulty },
        GridSelector: { screen:  GridSelector },
        Game: { screen:  Game },

        // High Scores Screens
        HighScoresDetail: { screen: HighScoresDetail },
    },
);

export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
