import * as React from "react";
import {
    Text,
    View,
} from "react-native";

import { IRecord } from "../../interfaces";
import ScoreQueries from "../../queries/scores";

const HighScoresDetail = ({ navigation }) => {
    const { gameMode, nameDisplay } = navigation.state.params;
    const scores = ScoreQueries.fetchScore(gameMode);

    return (
        <View>
             <Text>{nameDisplay}</Text>
            {
                !!scores.length && scores.map((record: IRecord) => {
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
