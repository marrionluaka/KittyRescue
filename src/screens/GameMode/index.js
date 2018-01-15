import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const GameMode = ({ navigation }) => {
    navigate = gameMode => navigation.navigate("Difficulty", { data: { gameMode } });

    return(
        <View>
            <Text>GameMode</Text>
            <TouchableOpacity 
                style={{
                    margin: "4%",
                    padding: 10,
                    backgroundColor: "#03A9F4"
                }}
                onPress={() => navigate("vsClock")}
            >
                <Text>Vs Clock</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{
                    margin: "4%",
                    padding: 10,
                    backgroundColor: "#009688"
                }}
                onPress={() => navigate("accuracy")}
            >
                <Text>Accuracy</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{
                    margin: "4%",
                    padding: 10,
                    backgroundColor: "#03A9F4"
                }}
                onPress={() => 
                    navigation.navigate("GridSelector", { data: { gameMode: "zen" } })
                }
            >
                <Text>Zen/Classical</Text>
            </TouchableOpacity>
        </View>
    );
}

export default  GameMode;