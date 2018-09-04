import { StyleSheet } from 'react-native';

const FONT = "riffic";

export default StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 99,
        flex: 1,
        justifyContent: "center",
    },
    popup:{
        backgroundColor: "rgba(255, 255, 255, .8)",
        borderRadius: 5,
        marginRight: 30,
        marginLeft: 30
    },
    title_c:{
        backgroundColor: "rgba(229,172,173, 1)",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    title_txt:{
        fontSize: 35,
        fontFamily: FONT,
        color: "#fff",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    btn_c:{
        flexDirection: "row"
    },
    btn:{
        flex: 1,
        padding: 20,
        margin: 10,
        borderRadius: 5
    },
    btn_txt:{
        fontFamily: FONT,
        fontSize: 15,
        color: "#fff",
        textAlign: "center"
    }
});