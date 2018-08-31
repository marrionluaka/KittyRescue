import * as React from "react";
import {
    View,
    Image,
    StyleSheet
} from "react-native";

const OrderTile = ({ src }) => {
    return (
        <Image source={src} style={{ width: 45, height: 45 }}/>
    );
};

export default OrderTile;