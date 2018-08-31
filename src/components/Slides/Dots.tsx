import * as React from 'react';
import {
    View,
    Dimensions
} from 'react-native';

const Dots = ({ data, offset }) => {
    const SCREEN_WIDTH = Dimensions.get('window').width;

    return (
        <View
            style={{
                flexDirection: "row",
                alignSelf: "center",
                position: "absolute",
                bottom: 95
            }}>
            {
                data.map((el, idx) => {
                    const backgroundColor = offset/SCREEN_WIDTH === idx ? "#333" : "rgba(0,0,0,.2)";

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
};

export default Dots;