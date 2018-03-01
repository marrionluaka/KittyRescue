import * as React from "react";
import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions
} from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("window").width
    },

    slideText:{
        fontSize: 30,
        color: "white"
    }
});

const SlideItem = ({ text, slideStyles, children }) => {
    const { container, slideText } = styles;
    return (
        <View style={[container, slideStyles ]}>
            <Text style={slideText}>{text}</Text>
            { children }
        </View>
    );
};

export default SlideItem;