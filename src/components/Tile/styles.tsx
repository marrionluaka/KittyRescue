import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    flipCard: {
        position: "relative",
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        flex: 1
    },
    fronFace:{
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
    }
  });