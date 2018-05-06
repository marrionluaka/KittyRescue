import * as React from "react";
import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions
} from "react-native";
import styles from './styles';

const SlideItem = ({ text, slideStyles, children }) => {
    const { container, slideText } = styles;
    return (
        <View style={[container, slideStyles, { 
                width: Dimensions.get("window").width 
            } 
        ]}>
            <Text style={slideText}>{text}</Text>
            { children }
        </View>
    );
};

export default SlideItem;