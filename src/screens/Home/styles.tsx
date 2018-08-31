import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    imgBackground: {
        width: '100%', 
        height: '100%'
    },
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    header: {
        alignItems:'center', 
        justifyContent: 'center' 
    },
    headerContent:{
        marginTop: 40,
        marginBottom: 27,
        position: "relative"
    },
    catText:{
        fontSize: 110,
        fontFamily: "riffic",
    },
    rescueText:{
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
    catsContainer:{
        flexDirection: 'row',
        position: 'relative'
    },
    catBox:{
        position: 'absolute', 
        width: Dimensions.get("window").width/5, 
        height: Dimensions.get("window").width/5,
        right: 125,
        bottom: 20
    },
    catLady:{
        position: 'absolute', 
        width: Dimensions.get("window").width/4, 
        height: Dimensions.get("window").width/4,
        zIndex: 1,
        right: 70,
        bottom: 10
    },
    catFish:{
        zIndex: 2, 
        width: Dimensions.get("window").width/3.2, 
        height: Dimensions.get("window").width/3.2
    },
    catEyes:{
        position: 'absolute', 
        width: Dimensions.get("window").width/4, 
        height: Dimensions.get("window").width/4,
        zIndex: 1,
        left: 65,
        bottom: 10
    },
    catGift:{
        position: 'absolute', 
        width: Dimensions.get("window").width/5, 
        height: Dimensions.get("window").width/5,
        left: 125,
        bottom: 20
    }
});