"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Sound = require('react-native-sound');
const FONT = "riffic";
const SPACING = {
    paddingTop: 15,
    paddingBottom: 15
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    }
});
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.play = () => {
            // Play the sound with an onEnd callback
            this.bite.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                }
                else {
                    console.log('playback failed due to audio decoding errors');
                    // reset the player to its uninitialized state (android only)
                    // this is the only option to recover after an error occured and use the player again
                    this.bite.reset();
                }
            });
        };
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
    render() {
        const { container } = styles;
        return (React.createElement(react_native_1.View, { style: container },
            React.createElement(react_native_1.TouchableOpacity, { onPress: this.play },
                React.createElement(react_native_1.Text, null, "Just a sound"))));
    }
}
exports.default = Test;
