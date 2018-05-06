import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // GridSelector Styles
    gridContainer: {
        flex: 1,
        marginTop: 15,
        margin: 5
    },

    gridTouchable: {
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1.0,
        shadowRadius: 5,
        elevation: 2
    },

    gridThumbnailContiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },

    gridTitle: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
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
        fontSize: 15,
        fontWeight: '500'
    }
});