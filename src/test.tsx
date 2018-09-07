import * as React from 'react';
import {
    FlatList,
    View,
    Text,
    Image,
    Dimensions,
    Animated,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { 
    Card, 
    Button
 } from "react-native-elements";
import Icon from 'react-native-vector-icons/Entypo';
const Sound = require('react-native-sound');

const FONT = "riffic";
const SPACING = {
    paddingTop: 15,
    paddingBottom: 15
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    }
});

export default class Test extends React.Component {
    private bite: any

    constructor(props){
        super(props);

        
        Sound.setCategory('Playback');

        this.bite = new Sound('bite.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
            // loaded successfully
            console.log('duration in seconds: ' + this.bite.getDuration() + 'number of channels: ' + this.bite.getNumberOfChannels());
        });
    }

    private play = () => {
        // Play the sound with an onEnd callback
        this.bite.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                // reset the player to its uninitialized state (android only)
                // this is the only option to recover after an error occured and use the player again
                this.bite.reset();
            }
        });
    }

    render() {
        const {
            container
        } = styles;
        return(
            <View style={container}>
                <TouchableOpacity onPress={this.play}>
                    <Text>Just a sound</Text>
                </TouchableOpacity>
            </View>
        );
    }
}