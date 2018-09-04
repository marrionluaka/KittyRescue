import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

const Score = ({ score }) => score;

const mapStateToProps = state => ({
    score: state.score
});

export default connect(mapStateToProps)(Score);