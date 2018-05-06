import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

const Score = ({ score }) => {
    return(
        <View style={{ flex: 1, alignItems: "center"}}>
            <Text>{score}</Text>
        </View>
    );
};

const mapStateToProps = state => ({
    score: state.score
});

export default connect(mapStateToProps)(Score);