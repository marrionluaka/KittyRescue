import React from 'react';
import {
    View,
    Text
} from 'react-native';

import ScoreQueries from '../../queries/scores';

const HighScoresDetail = ({ navigation }) => {
    const { gameMode, nameDisplay } = navigation.state.params,
          scores = ScoreQueries.fetchScore(gameMode);

    return (
        <View>
             <Text>{nameDisplay}</Text>
            {
                !!scores.length && scores.map(record => {
                    return (
                        <View key={record.id}>
                            <Text>{record.name}</Text>
                            <Text>{record.score}</Text>
                            <Text>{record.difficulty}</Text>
                            <Text>{record.gridSize}</Text>
                        </View>
                    );
                })
            }
        </View>
    );
};

export default HighScoresDetail;