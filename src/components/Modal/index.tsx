import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

import score from "../../reducers/score";
import styles from './styles';

const { 
    container, 
    popup,
    title_c,
    title_txt,
    btn_c,
    btn,
    btn_txt
} = styles;

const Popup = ({ isVisible, children, title, onPlayAgain, onNavBack }) => {
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

                    <View style={btn_c}>
                        <TouchableOpacity
                            onPress={onPlayAgain}
                            style={[btn, {
                                    backgroundColor: "#a2b798", 
                                    flexDirection: "row",
                                marginRight: 0 
                            }]}>
                            <Icon 
                                style={{ paddingRight: 3 }} 
                                name="cw" 
                                size={18} 
                                color="#fff"
                            />
                            <Text style={btn_txt}>Play again</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={onNavBack}
                            style={[btn, { backgroundColor: "#e25b45" }]}>
                            <Text style={btn_txt}>Exit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        </Modal>
    );
};

export default Popup;