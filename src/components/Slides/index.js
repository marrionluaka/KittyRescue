import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import SlideItem from './SlideItem';

export default class SlideList extends Component {

    renderSlides = () => {
        return this.props.data.map((slide, idx) => {
            return (
                <SlideItem key={idx} {...slide}>
                    { this.renderBtn(idx) }
                </SlideItem>
            );
        });
    }

    renderBtn = idx => {
        const { data, onComplete } = this.props;
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
    }

    render(){
        return (
            <ScrollView
                horizontal
                pagingEnabled
                style={{ flex: 1}}
                showsHorizontalScrollIndicator={false}
            >
                { this.renderSlides() }
            </ScrollView>
        );
    }
}