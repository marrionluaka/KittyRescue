import * as React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

const OrderTile = ({ src }) => {
    return (
        <View
            style={{ padding: "4%" }}
        >
            <Text>{src}</Text>
        </View>
    );
};

export default OrderTile;