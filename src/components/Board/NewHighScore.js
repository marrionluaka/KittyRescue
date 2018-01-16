import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class NewHighScore extends Component {

    constructor(props){
        super(props);
    }

    state = {
        input: ""
    }
        
    render(){
        const { score, method, render } = this.props;
        return (
            <View>
                <Text>High Score!</Text>
                {render}
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({ input: text })}
                />
                
                <TouchableOpacity
                    onPress={() => method(this.state.input, score) }
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
};