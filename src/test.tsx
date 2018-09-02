import * as React from 'react';
import {
    FlatList,
    View,
    Text,
    Image,
    Dimensions,
    Animated
} from 'react-native';
import { 
    Card, 
    Button
 } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

const DATA = [
    { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
    // { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    // { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    // { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' }
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class Test extends React.Component {

    private readonly _animatedValue

    constructor(props){
        super(props);

        this._animatedValue = new Animated.Value(0);
    }
    
    renderCard(item, idx){

        let scale = this._animatedValue.interpolate({
			inputRange: [-1, 0, 1],
            outputRange: [1, 1.6, 1],
            extrapolate: 'clamp'
        });

        return (
            <Animated.View
                style={[
                    {
                        flex: 1,
                        flexDirection: "row"
                    },
                    { transform: [{ scale }] }
                ]}
            >
                <Card
                    key={item.id}
                    title={item.text}
                    image={{ uri: item.uri }}
                >
                    
                    <Text style={{ marginBottom: 10 }}>
                        Sup ma dudes!
                    </Text>

                    <Button 
                        backgroundColor="#ccc"
                        title="Buy Now!"
                        onPress={() => {}}
                    />
                </Card>
            </Animated.View>
        );
    }

    render() {
        return(
            <View >
                <View style={{ height: 150 }}>
                <AnimatedFlatList 
                    horizontal
                    scrollEventThrottle={16}
                    onScroll={
                        Animated.event(
                            [
                                {
                                    nativeEvent: 
                                    {
                                        contentOffset: 
                                        {
                                            x: this._animatedValue
                                        }
                                    }
                                }
                            ],
                            {
                                useNativeDriver: true
                            }
                        )
                    }
                    data={DATA}
                    renderItem={({item, index}) => this.renderCard(item, index)}
                    style={{ flex: 1, position: "relative" }}
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled
                    decelerationRate={0}
                    snapToInterval={200}
                    snapToAlignment={"center"}
                    pagingEnabled
                    keyExtractor={(item, i) => i}
                />
                </View>
            </View>
        );
    }
}