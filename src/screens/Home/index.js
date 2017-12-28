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

export default class Home extends Component {
    static navigationOptions = { header: null };
    
    render(){
        const { navigation } = this.props;

        return(
            <Container>
                <Body>
                    <Text>Home</Text>
                    <Content>
                        <Button 
                            bordered
                            onPress={() => navigation.navigate("GameMode")}
                        >
                            <Text>Play</Text>
                        </Button>

                        <Button 
                            bordered
                            onPress={() => navigation.navigate("HowToPlay")}
                        >
                            <Text>How To Play</Text>
                        </Button>
                    </Content>
                </Body>
            </Container>
        );
    }
}