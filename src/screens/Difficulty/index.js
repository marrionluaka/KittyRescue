import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class Difficulty extends Component {
    navigate = difficulty => this.props.navigation.navigate("GridSelector", difficulty);

    render(){
        const { navigation } = this.props;
        const { data } = navigation.state.params;
        return(
            <View>
                <Text>Difficulty</Text>
                <TouchableOpacity 
                    style={{
                        padding: "4%",
                        backgroundColor: "red"
                    }}
                    onPress={() => this.navigate({ 
                        data: Object.assign({}, data, {
                            difficulty: "easy"
                        })
                    })}
                >
                    <Text>Easy</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{
                        padding: "4%",
                        backgroundColor: "red"
                    }}
                    onPress={() => this.navigate({ 
                        data: Object.assign({}, data, {
                            difficulty: "medium"
                        })
                    })}
                >
                    <Text>Medium</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{
                        padding: "4%",
                        backgroundColor: "red"
                    }}
                    onPress={() => this.navigate({ 
                        data: Object.assign({}, data, {
                            difficulty: "hard"
                        })
                    })}
                >
                    <Text>Hard</Text>
                </TouchableOpacity>
            </View>
        );
    }
}