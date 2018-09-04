import * as React from 'react';
import {
    FlatList,
    View,
    Text,
    Image,
    Dimensions,
    Animated,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { 
    Card, 
    Button
 } from "react-native-elements";
import Icon from 'react-native-vector-icons/Entypo';

const FONT = "riffic";
const SPACING = {
    paddingTop: 15,
    paddingBottom: 15
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    popup:{
        backgroundColor: "rgba(255, 255, 255, .5)",
        borderRadius: 5,
        marginRight: 30,
        marginLeft: 30
    },
    img:{
        width: 92,
        height: 92
    },
    title_c:{
        backgroundColor: "rgba(229,172,173, 1)",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    title:{
        fontSize: 35,
        fontFamily: FONT,
        color: "#fff",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    points_c:{
        alignItems: "center",
        ...SPACING
    },
    separator:{
        height: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#ddd"
    },
    points:{
        fontFamily: FONT,
        fontSize: 30
    },
    metadata_c:{
        alignItems: "center",
        flexDirection: "row",
        ...SPACING
    },
    metadata:{
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    meta_title:{
        fontFamily: FONT,
        fontSize: 18
    },
    meta:{
        fontFamily: FONT
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

export default class Test extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const {
            container,
            popup,
            img,
            title_c,
            title,
            points_c,
            points,
            separator,
            metadata_c,
            metadata,
            meta_title,
            meta,
            btn_c,
            btn,
            btn_txt
        } = styles;
        return(
            <View style={container}>
                <View style={popup}>
                    <View style={title_c}>
                        <Text style={title}>Game Over!</Text>
                    </View>

                    <View style={points_c}>
                        <Image source={require("./img/cat-box.png")} style={img}/>
                        <Text style={points}>141 points!</Text>
                    </View>

                    <View style={separator}/>

                    <View style={metadata_c}>
                        <View style={metadata}>
                            <Text style={meta_title}>Accuracy</Text>
                            <Text style={meta}>55%</Text>
                        </View>

                        <View style={metadata}>
                            <Text style={meta_title}>Moves</Text>
                            <Text style={meta}>20</Text>
                        </View>

                        <View style={metadata}>
                            <Text style={meta_title}>Time</Text>
                            <Text style={meta}>0:11</Text>
                        </View>
                    </View>
                    <View style={btn_c}>
                        <TouchableOpacity style={[btn, { backgroundColor: "#a2b798", flexDirection: "row", marginRight: 0 }]}>
                            <Icon 
                                style={{ paddingRight: 3 }} 
                                name="cw" 
                                size={18} 
                                color="#fff"
                            />
                            <Text style={btn_txt}>Play again</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[btn, { backgroundColor: "#e25b45" }]}>
                            <Text style={btn_txt}>Exit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}