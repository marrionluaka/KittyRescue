import * as React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";
import SlideItem from "./SlideItem";

const SlideList = ({ data, onComplete }) => {

    const renderSlides = () => {
        return data.map((slide, idx) => {
            return (
                <SlideItem key={idx} {...slide}>
                    { renderBtn(idx) }
                </SlideItem>
            );
        });
    };

    const renderBtn = (idx: number) => {
        if(idx === data.length - 1){
            return (
                <TouchableOpacity 
                    style={{
                        padding: "4%",
                        backgroundColor: "powderblue"
                    }}
                    onPress={() => onComplete()}
                >
                    <Text>Got it!</Text>
                </TouchableOpacity>
            );
        }
    };

    return (
        <ScrollView
            horizontal
            pagingEnabled
            style={{ flex: 1}}
            showsHorizontalScrollIndicator={false}
        >
            { renderSlides() }
        </ScrollView>
    );
}

export default SlideList;