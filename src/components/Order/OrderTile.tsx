import * as React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

const OrderTile = ({
    tileMatched, 
    matched, 
    src, 
    currentPointer 
}) => {

    let _style = !!matched ? tileMatched(src) ? 'green' : 'red' : null;
    let _border = currentPointer(src) ? 1 : 0;
  
    return (
        <View
            style={{ padding: "4%", backgroundColor: _style, borderWidth: _border }}
        >
            <Text>{src}</Text>
        </View>
    );
};

export default OrderTile;