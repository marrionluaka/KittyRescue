import { StyleSheet } from "react-native";

export default StyleSheet.create({
    circle: { 
        position: "absolute",
        zIndex: 9,
        justifyContent: "center",
        width: 100,
        height: 100,
        borderRadius: 50,
        top: "20%",
        alignSelf: 'center'
    },
    innerCircle:{ 
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: "95%",
        height: "95%",
        borderWidth: 1,
        borderColor: "#fff"
        //backgroundColor: "#e5acad"
    },
    text: { 
        fontFamily: "riffic",
        color: "#fff",
        top: -6 
    }
});