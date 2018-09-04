import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // GridSelector Styles
    gridContainer: {
        flex: 1,
        justifyContent:"center",
        padding: 15,
        paddingTop: 45,
        paddingBottom: 40
    },

    gridTouchable: {
        flex: 1,
        backgroundColor:"#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 5
    },

    gridThumbnailContiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    gridTitle: {
        fontFamily: "riffic",
        borderRadius: 50,
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: "35%"
    },

    gridSizeContainer: { 
        flex: 1, 
        justifyContent: 'flex-start', 
        marginTop: "30%" 
    },

    gridSize: {
        textAlign: 'center',
        fontFamily: "riffic",
        fontSize: 15
    },

    playBtn: { 
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d1dce2"
    },

    playBtnText: {
        fontFamily: "riffic",
        color: "#fff",
        fontSize: 20
    },


    //PanelTile Styles
    panelIconContainer: {
        flex: 1 , 
        justifyContent: 'center',
        alignContent: 'center'
    },

    panelDisplayContainer: {
        flex: 3,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        justifyContent: 'center',
        alignContent: 'center'
    },

    panelDisplayText: {
        paddingLeft: 15,
        fontSize: 17,
        fontFamily: "riffic"
    }
});