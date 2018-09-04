import * as React from "react";
import {
    View,
    Image,
    StyleSheet
} from "react-native";

const OrderTile = ({ src }) => {
    return (
        <Image source={src} style={{ width: 50, height: 50 }}/>
    );
};

export default OrderTile;