import React, { Component } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Text,
    Body
} from 'native-base';

const HighScores = ({ navigation }) => {
    
    const navigateTo = (gameMode, nameDisplay) => {
        navigation.navigate("HighScoresDetail",{ 
            gameMode,
            nameDisplay
        });
    };

    return(
        <Container>
            <Body>
                <Text>High Scores</Text>
                <Content>
                    <Button 
                        bordered
                        onPress={() => navigateTo("vsClock", "Vs Clock")}
                    >
                        <Text>Vs Clock</Text>
                    </Button>

                    <Button 
                        bordered
                        onPress={() => navigateTo("accuracy", "Accuracy")}
                    >
                        <Text>Accuracy</Text>
                    </Button>

                </Content>
            </Body>
        </Container>
    );
};

export default HighScores;