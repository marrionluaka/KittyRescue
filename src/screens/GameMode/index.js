import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class GameMode extends Component {

    navigate = gameMode => this.props.navigation.navigate("Difficulty", { data: { gameMode } });

    render(){
        return(
            <View>
                <Text>GameMode</Text>
                <TouchableOpacity 
                    style={{
                        margin: "4%",
                        padding: 10,
                        backgroundColor: "#03A9F4"
                    }}
                    onPress={() => this.navigate("vsClock")}
                >
                    <Text>Vs Clock</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{
                        margin: "4%",
                        padding: 10,
                        backgroundColor: "#009688"
                    }}
                    onPress={() => this.navigate("accuracy")}
                >
                    <Text>Accuracy</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{
                        margin: "4%",
                        padding: 10,
                        backgroundColor: "#03A9F4"
                    }}
                    onPress={() => this.navigate("zen")}
                >
                    <Text>Zen/Classical</Text>
                </TouchableOpacity>
            </View>
        );
    }
}