import * as React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';

import styles from './styles';
import { PreventDoubleClick } from "../common/PreventDoubleClick";

const { 
    playBtn,
    gridSize,
    gridTitle,
    playBtnText,
    gridContainer,
    gridTouchable,
    gridSizeContainer,
    gridThumbnailContiner
 } = styles;

 const gridColors = {
    "4x4": "#FF598F",
    "6x6": "#FEA564"
};

const Btn = PreventDoubleClick(TouchableOpacity);

const GridSelector = ({ 
    size = "Normal" , 
    push, 
    title, 
    subTitle,
    disabled,
    marginRight = false }) => {

    return (
        <View style={[ gridContainer, { paddingRight: marginRight ? 0 : 15 } ]}>

            <Btn onPress={!!disabled ? () => {} : push} style={gridTouchable}>
                <View style={gridThumbnailContiner}>
                    <Text style={[gridTitle, { backgroundColor: gridColors[title.replace(/ /g, '')] }]}>{title}</Text>
                </View>

                <View style={gridSizeContainer}>
                    <Text style={gridSize}>{size}</Text>
                    <Text style={{ textAlign: "center", lineHeight: 25 }}>{subTitle}</Text>
                </View>

                <View style={playBtn}>
                    <Text style={playBtnText}>Play</Text>
                </View>
            </Btn>
        </View>
    );
};

export default GridSelector;