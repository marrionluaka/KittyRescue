import * as React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import styles from './styles';

const { 
    panelDisplayText,
    panelIconContainer,
    panelDisplayContainer
 } = styles;

const _createTiles = (list: any[]): any[] => {
    return list.map(el => {
        return ( 
            <TouchableOpacity
                key={el.displayName}
                onPress={el.push}
                style={{ 
                    flexDirection: 'row',
                    flex: 1
                }}
            >
                <View style={[ panelIconContainer, {
                        backgroundColor: el.backgroundColor || "#03A9F4"
                    }]}>
                    <Text
                        style={{ 
                            textAlign: 'center'
                        }}
                    >{
                        Array.isArray(el.icon) ? (
                            el.icon.map((icon, idx) => <Text key={idx}>{icon}</Text>)
                        ) : el.icon
                    }</Text>
                </View>

                <View style={panelDisplayContainer}>
                    <Text style={panelDisplayText}
                    >{el.displayName}</Text>
                    <Text style={{
                        paddingLeft: 15
                    }}>{
                        !!el.subTitle && el.subTitle
                    }</Text>
                </View>
            </TouchableOpacity>
        ); 
    });
};
 
const PanelTile = (data) => _createTiles(data);

export default PanelTile;