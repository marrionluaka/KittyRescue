import * as React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const GridSelector = ({ navigation }) => {
    const { data } = navigation.state.params;

    return(
        <View>
            <Text>GridSelector</Text>
            <TouchableOpacity
                style={{
                    padding: "4%",
                    backgroundColor: "red",
                }}
                onPress={() => navigation.navigate("Game", {
                    data: Object.assign({}, data, {
                        gridSize: 8,
                    }),
                })}
            >
                <Text>4x4</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    padding: "4%",
                    backgroundColor: "red",
                }}
                onPress={() => navigation.navigate("Game", {
                    data: Object.assign({}, data, {
                        gridSize: 18,
                    }),
                })}
            >
                <Text>6x6</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GridSelector;
