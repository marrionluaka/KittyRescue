import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    tabs_c:{
        flexDirection: "row", 
        backgroundColor: "rgba(0,0,0,.2)",
        borderRadius: 25
    },

    tabs: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: "7%",
        paddingRight: "7%",
        paddingTop: 1,
        paddingBottom: 1,
        margin: 1,
        borderRadius: 25
    },

    tabs_text: {
        color: "#fff"
    },
    
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    content: {
        flex: 3
    },

    leaderboard_text:{
        paddingTop: 5,
        paddingBottom: 10,
        fontSize: 20,
        letterSpacing:30,
        fontFamily: "riffic"
    },

    // Details
    tbl_c:{ 
        flex: 1, 
        marginTop: 10, 
        // paddingLeft: 5,
        // paddingRight: 5,
        paddingBottom: 5,
        backgroundColor: "#fff",
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        marginBottom: 15
    },
    row_c:{
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        padding: "2%",
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,

        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,  
        // elevation: 1
    },
    diff_text:{
        fontFamily: "riffic",
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 18,
        paddingLeft: 10,
        backgroundColor: "rgba(128,128,128,.4)",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        color: "#fff"
    },
    square:{
        flex: 1,
    },
    grid_s: {
        fontFamily: "riffic",
        borderRadius: 50,
        paddingTop: 11, 
        paddingBottom: 11,
        textAlign: "center",
        color: "#fff",
        fontSize: 16
    },
    name_s: {
        fontFamily: "riffic",
        padding: 10,
        fontSize: 18,
        lineHeight: 18
    },
    score_s: {
        fontSize: 18,
        alignSelf: "flex-end",
        fontFamily: "riffic"
    },
    separator:{
        flex: 1,
        height: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#f2f2f2"
    },
    noScore:{
        flex: 1,
        marginTop: "8%",
        marginRight: "5%",
        marginLeft: "5%",
        justifyContent: "center",
        //alignItems: "center"
    },
    noScoreText: {
        textAlign: "center",
        fontFamily: "riffic",
        fontSize: 15
    },
    playNow:{
        marginTop: "5%",
        padding: 15,
        borderRadius: 25,
        backgroundColor: "rgba(128,128,128,.4)"
    }
  });