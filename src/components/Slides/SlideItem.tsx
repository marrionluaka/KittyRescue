import * as React from "react";
import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    ImageBackground,
    Image
} from "react-native";
import styles from './styles';

const images = {
    "fridge": require("../../img/cat-fridge-big.png"),
    "bite": require("../../img/dog.png"),
    "cart": require("../../img/cat-cart-big.png")
};

const SlideItem = ({ 
        title, 
        text, 
        slideImg, 
        children,
        renderButton
    }) => {
    const { container, slideText } = styles;
    return (
        <ImageBackground 
            source={require("../../img/pastel.png")}
            style={container}>
            <View style={{
                    flex:3,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#808080",
                        height: "85%",
                        width: "85%",
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image source={images[slideImg]} />
                    </View>
            </View>

            <View style={{
                    flex:2,
                    alignItems: 'flex-start',
                   // marginTop: 30,
                    paddingLeft: 20,
                    paddingRight: 20
                }}>
                <View>
                    <Text style={{ 
                        color: "#808080", 
                        fontFamily: "riffic",
                        paddingBottom: 5,
                        fontSize: 21,
                        textAlign: 'center'
                    }}>{title}</Text>
                    <Text style={slideText}>{text}</Text>
                </View>
            </View>
            {renderButton()}
        </ImageBackground>
    );
};

export default SlideItem;