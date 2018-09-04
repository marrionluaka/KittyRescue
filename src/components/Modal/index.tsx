import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Modal
} from "react-native";
import score from "../../reducers/score";
import styles from './styles';

const { 
    container, 
    popup,
    title_c,
    title_txt
} = styles;

const Popup = ({ isVisible, children, title }) => {
    return (
        <Modal 
            transparent
            animationType="fade"
            visible={isVisible}
            onRequestClose={() => {}}
        >
            <View style={styles.container}>
                <View style={popup}>
                    <View style={title_c}>
                        <Text style={title_txt}>{title}</Text>
                    </View>
                    {children}
                </View>
            </View>
            
        </Modal>
    );
};

export default Popup;