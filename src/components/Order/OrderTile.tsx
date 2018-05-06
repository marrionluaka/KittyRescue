import * as React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

const OrderTile = ({ src }) => {
    return (
        
        <Text
            style={{
                fontSize: 20
            }}>{src}</Text>
    );
};

export default OrderTile;