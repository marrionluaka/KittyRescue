import * as React from "react";

import {
    TouchableOpacity,
    View,
    Text
} from "react-native";

interface IProps {
    navigation: any;
}

export default class Home extends React.Component<IProps, {}> {
    public static navigationOptions = { header: null };

    public render() {
        const { navigation } = this.props;

        return(
            <View style={{
                flex:1
            }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                    <Text>Header</Text>
                </View>

                <View style={{ 
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    
                    <TouchableOpacity
                        style={{
                            padding: "8%",
                            borderWidth: 1,
                            width: "75%",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => navigation.navigate("GameConfigurator")}
                    >
                        <Text>Play</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            padding: "8%",
                            marginTop: 15,
                            borderWidth: 1,
                            width: "75%",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => navigation.navigate("HowToPlay")}
                    >
                        <Text>How To Play</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            padding: "8%",
                            marginTop: 15,
                            borderWidth: 1,
                            width: "75%",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => navigation.navigate("HighScores")}
                    >
                        <Text>High Scores</Text>
                    </TouchableOpacity>
                    
                </View>

                <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                    <Text>Copyright 2018</Text>
                </View>
            </View>
        );
    }
}
