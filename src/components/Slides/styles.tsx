import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        width: Dimensions.get("window").width
    },

    slideText:{
        color: "#808080",
        textAlign: 'center',
        lineHeight: 25
    }
});