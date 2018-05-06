import * as React from "react";

import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
} from "react-native";
import styles from './styles';
import HighScoresDetail from './HighScoresDetail';

class HighScores extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        gameMode: "vsClock",
        display: "Vs Clock"
    };

    render() {
        const { header, content, tabs } = styles;
        return(
            <View style={{ flex: 1 }}>
                {/* Tabs */}
                <View style={{ flexDirection: "row"}}>

                    <TouchableOpacity 
                        style={[tabs, { backgroundColor: this.state.gameMode === "vsClock" ? "bisque" : "#ccc" }]}
                        onPress={() => { this.setState({ gameMode: "vsClock", display: "Vs Clock" }); }}>
                        <Text>Vs Clock</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity 
                        style={[tabs, { backgroundColor: this.state.gameMode === "accuracy" ? "bisque" : "#ccc" }]}
                        onPress={() => { this.setState({ gameMode: "accuracy", display: "Accuracy" }); }}>
                        <Text>Accuracy</Text>
                    </TouchableOpacity>
                </View>
    
                {/* Header */}
                <View style={header}>
                    <Text>{this.state.display}</Text>
                </View>
    
                {/* Content */}
                <ScrollView style={content}>
                    <HighScoresDetail 
                        gameMode={this.state.gameMode}
                        display={this.state.display}
                    />
                </ScrollView>
            </View>
        );
    }
};

export default HighScores;
