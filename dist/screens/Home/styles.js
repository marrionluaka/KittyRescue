"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
exports.styles = react_native_1.StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContent: {
        marginTop: 40,
        marginBottom: 27,
        position: "relative"
    },
    catText: {
        fontSize: 110,
        fontFamily: "riffic",
    },
    rescueText: {
        fontSize: 40,
        position: "absolute",
        bottom: "-15%",
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        zIndex: 9,
        textAlign: "center",
        fontFamily: "riffic",
    },
    catsContainer: {
        flexDirection: 'row',
        position: 'relative'
    },
    catBox: {
        position: 'absolute',
        width: react_native_1.Dimensions.get("window").width / 5,
        height: react_native_1.Dimensions.get("window").width / 5,
        right: 125,
        bottom: 20
    },
    catLady: {
        position: 'absolute',
        width: react_native_1.Dimensions.get("window").width / 4,
        height: react_native_1.Dimensions.get("window").width / 4,
        zIndex: 1,
        right: 70,
        bottom: 10
    },
    catFish: {
        zIndex: 2,
        width: react_native_1.Dimensions.get("window").width / 3.2,
        height: react_native_1.Dimensions.get("window").width / 3.2
    },
    catEyes: {
        position: 'absolute',
        width: react_native_1.Dimensions.get("window").width / 4,
        height: react_native_1.Dimensions.get("window").width / 4,
        zIndex: 1,
        left: 65,
        bottom: 10
    },
    catGift: {
        position: 'absolute',
        width: react_native_1.Dimensions.get("window").width / 5,
        height: react_native_1.Dimensions.get("window").width / 5,
        left: 125,
        bottom: 20
    }
});
