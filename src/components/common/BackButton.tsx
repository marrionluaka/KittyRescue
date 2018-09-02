import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
    backArrow:{
        marginTop: 15,
        marginLeft: 15
    }
})

const BackButton = ({ backHomeFn }) => {
    return(
        <TouchableOpacity
            onPress={backHomeFn}
        >
            <Icon 
                style={styles.backArrow}
                name="arrow-left" 
                size={30} 
                color="#fff"
            />
        </TouchableOpacity>
    );
};

export { BackButton };