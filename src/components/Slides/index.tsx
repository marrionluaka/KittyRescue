import * as React from "react";
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import SlideItem from "./SlideItem";
import Dots from "./Dots";


export default class Test extends React.Component<{ data: any; onComplete: any; }> {
    state = {
        offset: 0
    }

    render(){
        const SCREEN_WIDTH = Dimensions.get("window").width;
        const { data , onComplete } = this.props;
    
        const renderSlides = (slide: any, index: number) => {
            return (
                <SlideItem 
                    key={slide.id} 
                    {...slide}
                    renderButton={() => {
                        var text = index === data.length - 1 ? "Let's Start" : "Skip";
                        return (
                            <TouchableOpacity
                                onPress={() => onComplete()}
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    backgroundColor: "rgba(125,125,125,.4)",
                                    width: "100%"
                                }}>
                                <Text style={{ 
                                    color: "#fff",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    paddingTop: "5%",
                                    paddingBottom: "5%",
                                    fontSize: 20
                                }}>{text.toLocaleUpperCase()}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    />
            );
        };

        return (
            <View style={{flex:1}}>
                <FlatList
                    horizontal
                    data={data}
                    renderItem={({item, index}) => renderSlides(item, index)}
                    style={{ flex: 1, position: "relative" }}
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled
                    pagingEnabled
                    onScroll={ e => {
                        if(e.nativeEvent.contentOffset.x % SCREEN_WIDTH === 0)
                            this.setState({ offset: e.nativeEvent.contentOffset.x })
                    } }
                />
                <Dots 
                    data={data} 
                    offset={this.state.offset}/>
            </View>
        );
    }
}