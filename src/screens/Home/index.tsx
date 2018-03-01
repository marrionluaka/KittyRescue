import * as React from "react";

import {
    TouchableOpacity,
    View,
} from "react-native";

import {
    Body,
    Button,
    Container,
    Content,
    Text,
} from "native-base";

interface IProps {
    navigation: any;
}

export default class Home extends React.Component<IProps, {}> {
    public static navigationOptions = { header: null };

    public render() {
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

                        <Button
                            bordered
                            onPress={() => navigation.navigate("HighScores")}
                        >
                            <Text>High Scores</Text>
                        </Button>
                    </Content>
                </Body>
            </Container>
        );
    }
}
