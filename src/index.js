import { StackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import Home from './screens/Home';
import HowToPlay from './screens/HowToPlay';
import HighScores from './screens/HighScores';

import GameMode from './screens/GameMode';
import Difficulty from './screens/Difficulty';
import GridSelector from './screens/GridSelector';
import Game from './screens/Gameboard';

import HighScoresDetail from  './screens/HighScores/HighScoresDetail';

export default StackNavigator(
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
        HighScoresDetail: { screen: HighScoresDetail }
    }
);