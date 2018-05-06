import * as React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import styles from './styles';

const { 
    gridTitle,
    gridContainer,
    gridTouchable,
    gridThumbnailContiner
 } = styles;

const GridSelector = ({ size = "Normal" , push, thumbnail, title, marginRight = false }) => {
    const { height } = Dimensions.get('window');
    const ratio = 2.5;

    return (
        <View style={[ gridContainer, { marginRight: marginRight ? 0 : 5 }]}>
            <TouchableOpacity
                style={[ gridTouchable, { height: height/ratio }]}
                onPress={push}
            >
                <View style={gridThumbnailContiner}>
                    <Text>{thumbnail}</Text>
                </View>
                <View style={{
                    flex: 1, 
                    justifyContent: 'center'
                }}>
                    <Text style={gridTitle}>
                        {title}
                    </Text>
                    <Text style={{textAlign: 'center'}}>{size}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default GridSelector;