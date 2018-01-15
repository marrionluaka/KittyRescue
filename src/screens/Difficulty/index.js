import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const Difficulty = ({ navigation }) => {
    const { data } = navigation.state.params;
    navigate = difficulty => navigation.navigate("GridSelector", difficulty);

    return(
        <View>
            <Text>Difficulty</Text>
            <TouchableOpacity 
                style={{
                    padding: "4%",
                    backgroundColor: "red"
                }}
                onPress={() => navigate({ 
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
                onPress={() => navigate({ 
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
                onPress={() => navigate({ 
                    data: Object.assign({}, data, {
                        difficulty: "hard"
                    })
                })}
            >
                <Text>Hard</Text>
            </TouchableOpacity>
        </View>
    );
};

export default  Difficulty;