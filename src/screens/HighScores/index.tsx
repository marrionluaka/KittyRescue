import * as React from "react";
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
} from "react-native";
import { NavigationActions } from "react-navigation";
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';
import HighScoresDetail from './HighScoresDetail';
import { BackButton } from '../../components/common/BackButton';

class HighScores extends React.Component<{ navigation: any }, {}>{
    private static navigationOptions = { header: null };

    constructor(props){
        super(props);
    }

    state = {
        gameMode: "vsClock",
        display: "Vs Clock"
    };

    _backHome = () => {
        this.props.navigation.dispatch(
            NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: "Home"}),
            ],
          })
        )
    }

    render() {
        const { 
            header, 
            content, 
            tabs,
            tabs_c,
            tabs_text,
            leaderboard_text
        } = styles;
        return(
            <ImageBackground 
                style={{ flex: 1 }}
                source={require("../../img/pastel.png")}
            >
                <BackButton backHomeFn={this._backHome}/>

                 {/* Header */}
                <View style={header} >
                    <Image source={require("../../img/cat-yarn.png")} />
                    <Text style={leaderboard_text}>{"leaderboard".toUpperCase()}</Text>
                    
                    {/* Tabs */}
                    <View style={tabs_c}>
                        <TouchableOpacity 
                            style={[tabs, { 
                                backgroundColor: this.state.gameMode === "vsClock" ? "#fff" : "transparent",
                            }]}
                            onPress={() => { this.setState({ gameMode: "vsClock", display: "Vs Clock" }); }}>
                            <Text style={[tabs_text, { color: this.state.gameMode === "vsClock" ? "#808080" : "#fff" }]}>Vs Clock</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[tabs, { 
                                backgroundColor: this.state.gameMode === "accuracy" ? "#fff" : "transparent"
                            }]}
                            onPress={() => { this.setState({ gameMode: "accuracy", display: "Accuracy" }); }}>
                            <Text style={[tabs_text, { color: this.state.gameMode === "accuracy" ? "#808080" : "#fff" }]}>Accuracy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
    
                {/* Content */}
                <View style={content}>
                    <ScrollView>
                        <HighScoresDetail 
                            gameMode={this.state.gameMode}
                            display={this.state.display}
                            backHome={this._backHome}
                        />
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
};

export default HighScores;
