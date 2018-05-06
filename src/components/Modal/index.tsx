import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Modal
} from "react-native";
import score from "../../reducers/score";
import styles from './styles';

const { container } = styles;

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