import * as React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const MetaBox = ({ children , title}) => {
    const { metaBox, metaTitle, metaText } = styles;
    return(
        <View style={metaBox}>
            <Text style={metaTitle}>{title}</Text>
            <Text style={metaText}>{ children }</Text>
        </View>
    );
};

export default MetaBox;