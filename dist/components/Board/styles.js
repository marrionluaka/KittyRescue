"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const FONT = "riffic";
const SPACING = {
    paddingTop: 15,
    paddingBottom: 15
};
exports.default = react_native_1.StyleSheet.create({
    info_c: {
        position: "relative",
        flexDirection: "row",
        height: 75,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    zen_s: {
        height: 20,
        width: "100%",
        backgroundColor: '#ccc',
        marginLeft: 1,
        marginRight: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    metaBox: {
        flex: 2,
        alignItems: "center",
        margin: 10,
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#e5acad",
        paddingTop: 5
    },
    metaTitle: {
        fontFamily: "riffic",
        color: "#fff",
    },
    metaText: {
        fontFamily: "riffic",
        color: "#fff",
        fontSize: 25
    },
    // Popup
    img: {
        width: 92,
        height: 92,
        alignSelf: "center"
    },
    points_c: Object.assign({ marginLeft: 20, marginRight: 20 }, SPACING),
    points: {
        textAlign: "center",
        fontFamily: FONT,
        fontSize: 30
    },
    metadata_c: Object.assign({ alignItems: "center", flexDirection: "row" }, SPACING),
    metadata: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    meta_title: {
        fontFamily: FONT,
        fontSize: 18
    },
    meta: {
        fontFamily: FONT
    },
    ohNoes: {
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
        fontFamily: FONT,
        fontSize: 13
    }
});
