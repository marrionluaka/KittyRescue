import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal
} from 'react-native';
import score from '../../reducers/score';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 99,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

const Popup = ({ isVisible, children }) => {
    return (
        <Modal 
            transparent
            animationType="fade"
            visible={isVisible}
            onRequestClose={() => {}}
        >
            <View style={styles.container}>
                {children}
            </View>
            
        </Modal>
    );
};

export default Popup;