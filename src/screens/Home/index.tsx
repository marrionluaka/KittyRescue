import * as React from "react";

import {
    TouchableOpacity,
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet
} from "react-native";

import Pill from './Pill';
import { styles } from './styles';

interface IProps {
    navigation: any;
}

export default class Home extends React.Component<IProps, {}> {
    public static navigationOptions = { header: null };

    public render() {
        const { navigation } = this.props;
        const {
            imgBackground, 
            header, 
            container,
            headerContent,
            catText,
            rescueText,
            catsContainer,
            catBox,
            catLady,
            catFish,
            catEyes,
            catGift
        } = styles;

        return(
            <ImageBackground
                style={imgBackground}
                source={require("../../img/pastel.png")}
            >
                <View style={{
                    flex:1
                }}>
                    <View style={container}>
                        <View style={header}>
                            <View
                                style={headerContent}
                            >
                                <Text
                                    style={catText}
                                >
                                    Kitty
                                </Text>
                                <Text
                                    style={rescueText}
                                >Rescue</Text> 
                            </View>
                            <View
                                style={catsContainer}
                            >
                                <Image source={require("../../img/cat-box.png")} style={catBox}/>
                                <Image source={require("../../img/cat-lady.png")} style={catLady}/>
                                <Image source={require("../../img/cat-fish.png")} style={catFish}/>
                                <Image source={require("../../img/cat-eyes.png")} style={catEyes}/>
                                <Image source={require("../../img/cat-gift.png")} style={catGift}/>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 1 , justifyContent: 'flex-end'}}>
                        
                        <Pill 
                            title="Play"
                            subTitle="Start a new adventure!"
                            onNavigate={() => navigation.navigate("GameConfigurator")}/>

                        <Pill
                            title="How To Play"
                            subTitle="Learn to play the game!"
                            onNavigate={() => navigation.navigate("HowToPlay")}/>

                        <Pill
                            title="High Scores"
                            subTitle="See your best scores!" 
                            onNavigate={() => navigation.navigate("HighScores")}/>
                        
                    </View>

                    <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                        <Text>{'\u00A9'} {new Date().getFullYear()}</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
