import * as React from "react";
import { groupBy } from 'ramda';
import {
    Text,
    View,
} from "react-native";

import { IRecord } from "../../interfaces";
import ScoreQueries from "../../queries/scores";

const HighScoresDetail = ({ gameMode, display }) => {
    const scores = ScoreQueries.fetchScore(gameMode);
    const byDifficulty = groupBy((user: any) => user.difficulty);
    const res = Object.values(byDifficulty(scores));
    
    return (
        <View>
             <Text>{display}</Text>
            {
                !!res.length && res.map((diff: any[]) => {
                    return diff.map((record: IRecord) => {
                        return (
                            <View key={record.id}>
                                <Text>{record.name}</Text>
                                <Text>{record.score}</Text>
                                <Text>{record.difficulty}</Text>
                                <Text>{record.gridSize}</Text>
                            </View>
                        );
                    });
                })
            }
        </View>
    );
};

export default HighScoresDetail;
