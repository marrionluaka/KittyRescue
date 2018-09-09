import * as React from "react";
import * as R from 'ramda';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { IRecord } from "../../interfaces";
import { NoScores } from "./NoScores";
import ScoreQueries from "../../queries/scores";
import styles from './styles';
import { capitalizeFirstLetter, removeAt } from "../../lib";

const _getDifficulty = (mode: string, scores: any) => {
    const move2Last = R.curry(_moveToLast);

    return R.compose(
        Object.values,
        move2Last("hard"),
        R.compose( 
            R.groupBy( R.prop('difficulty') ),
            R.sortBy( R.prop('difficulty') )
        )
    )(scores);
};

const _moveToLast = (el: string, diff: any) => {
    const keys = Object.keys(diff),
          idx = keys.indexOf(el),
          sorted = removeAt(idx, keys).concat(keys.slice(idx, idx+1));
    
    return sorted.reduce((acc, key) => (acc[key] = diff[key]) && acc, {});
};

const HighScoresDetail = ({ gameMode, display, backHome }) => {
    const scores = ScoreQueries.fetchScore(gameMode);
    const res = _getDifficulty(gameMode, scores);

    const {
        tbl_c,
        row_c,
        grid_s,
        name_s,
        score_s,
        square,
        diff_text,
        separator,
        playNow,
        noScoreText
    } = styles;

    const winners = [
        "#C98910",
        "#A8A8A8",
        "#965A38"
    ];

    const gridColors = {
        "4x4": "#FF598F",
        "6x6": "#FEA564"
    };    
    
    return (
        <View style={{flex:1}}>
            {
                !!res.length ? res.map((diff: any[]) => {
                    return(
                        <View 
                            key={diff[0].id}
                            style={tbl_c}>
                            <Text style={diff_text}>
                                Difficulty: {capitalizeFirstLetter(diff[0].difficulty)}
                            </Text>
                            {
                                diff.map((record: IRecord, idx: number) => {
                                    return (
                                        <View key={record.id}>
                                            <View style={row_c}>

                                                <View style={{ flex: .5, justifyContent: "center" }}>
                                                    {
                                                        idx <= 2 ? (
                                                            <Icon 
                                                                style={{ marginLeft: -5 }}
                                                                name="trophy" 
                                                                size={20} 
                                                                color={winners[idx]}
                                                            />
                                                        ) : (
                                                            <Text style={{ fontSize: 16, fontFamily: "riffic" }}>{idx + 1 }</Text>
                                                        )
                                                    }
                                                </View>

                                                <View style={{ flex: 1, marginLeft: 5 }}>
                                                    <Text style={[grid_s, { backgroundColor: record.gridSize > 8 ? gridColors["6x6"] : gridColors["4x4"]}]}> 
                                                        {record.gridSize > 8 ? "6x6" : "4x4"} 
                                                    </Text>
                                                </View>

                                                <View style={{ flex: 4, justifyContent: "center" }}>
                                                    <Text style={name_s}>{record.name.trim()}</Text>
                                                </View>
                                                
                                                <View style={{ flex: 1, justifyContent: "center" }}>
                                                    <Text style={[score_s]}>{record.score}</Text>
                                                </View>
                                            </View>

                                            {
                                                diff.length-1 === idx ? null : (<View style={separator}></View>)
                                            }
                                        </View>
                                    );
                                })
                            }
                        </View>
                    )
                }) : (
                    <NoScores>
                        <View style={{ alignItems: "center" }}>
                            <Image source={require("../../img/cat-walk.png")} />
                        </View>
                        <Text style={[noScoreText, { paddingTop: "5%" }]}>
                            Unbelievable! There are no high scores yet.
                        </Text>

                        <Text style={[noScoreText, { paddingTop: "2%" }]}>
                            Play meow and be the very first on the leaderboard!
                        </Text>
                        <TouchableOpacity
                            style={playNow}
                            onPress={backHome}>
                            <Text style={[noScoreText,{ color: "#fff" }]}>Play Meow!</Text>
                        </TouchableOpacity>
                    </NoScores>
                )
            }
        </View>
    );
};

export default HighScoresDetail;