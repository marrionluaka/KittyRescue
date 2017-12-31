import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class GridSelector extends Component {

    render(){
        const { navigation } = this.props;
        const { data } = navigation.state.params;
        return(
            <View>
                <Text>GridSelector</Text>
                <TouchableOpacity 
                    style={{
                        padding: "4%",
                        backgroundColor: "red"
                    }}
                    onPress={() => navigation.navigate("Game", { 
                        data: Object.assign({}, data, {
                            gridSize: 8
                        })
                    })}
                >
                    <Text>4x4</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={{
                        padding: "4%",
                        backgroundColor: "red"
                    }}
                    onPress={() => navigation.navigate("Game", { 
                        data: Object.assign({}, data, {
                            gridSize: 18
                        })
                    })}
                >
                    <Text>6x6</Text>
                </TouchableOpacity>
            </View>
        );
    }
}