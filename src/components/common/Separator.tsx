import * as React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    separator:{
        height: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "rgba(125,125,125, .4)"
    }
});

const Separator = () => (<View style={styles.separator}/>);

export { Separator };