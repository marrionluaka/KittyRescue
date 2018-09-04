import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    flipCard: {
        position: "relative",
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        flex: 1
    },
    frontFace:{
        zIndex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        overflow: "hidden"
    },
    backFace:{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        overflow: "hidden"
    },
    overlay:{
        position:'absolute',
        top:0,
        right:0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gloss:{
        borderRadius: 5,
        borderWidth: 5,
        borderColor: "#fff",
        backgroundColor:"rgba(250,250,250,.4)"
    },
    card_c:{
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    }
  });