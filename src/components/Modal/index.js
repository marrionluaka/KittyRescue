import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        opacity: 0.5,
        zIndex: 99,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    }
});

class Modal extends Component {

    render(){
        return (
            <View style={styles.container}>
                
                    {this.props.children}
                
            </View>
        );
    }
}

export default Modal;