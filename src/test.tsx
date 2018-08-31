import * as React from 'react';
import {
    FlatList,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';

interface IItem {
    name: string;
}

export default class Test extends React.Component {
    state = {
        offset: 0
    }

    render(){
        const SCREEN_WIDTH = Dimensions.get("window").width;

        const data = [
            { name: "Cristiano Ronaldo", key: 1 },
            { name: "Lionel Messi", key: 2 },
            { name: "Neymar", key: 3 },
            { name: "Mbappe", key: 4 }
        ];
    
        const renderItem = item => {
            return (
                <View 
                    key={item.key}
                    style={{
                        padding: "4%",
                        backgroundColor: "bisque",
                        flex: 1,
                        width: SCREEN_WIDTH
                    }}>
                    <Text>{item.name}</Text>
                </View>
            );
        };

        const renderDots = data => {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        position: "absolute",
                        bottom: 15
                    }}>
                    {
                        data.map((el, idx) => {
                            const backgroundColor = this.state.offset/SCREEN_WIDTH === idx ? "#333" : "rgba(0,0,0,.2)";

                            return(
                                <View
                                    key={Math.random()}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 50,
                                        backgroundColor,
                                        padding: "1%",
                                        margin: 1
                                    }}>
                                </View>
                            );
                        })
                    }
                </View>
            );
        }
    
        return (
            <View style={{flex:1}}>
                <FlatList
                    horizontal
                    data={data}
                    renderItem={({item}) => renderItem(item)}
                    style={{ flex: 1, position: "relative" }}
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled
                    pagingEnabled
                    onScroll={ e => {
                        if(e.nativeEvent.contentOffset.x % SCREEN_WIDTH === 0)
                            this.setState({ offset: e.nativeEvent.contentOffset.x })
                    } }
                />
                {
                    renderDots(data)
                }
            </View>
        );
    }
}