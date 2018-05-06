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
    const { height } = Dimensions.get('window');
    const ratio = 6.58;

    return list.map(el => {
        return ( 
            <TouchableOpacity
                key={el.displayName}
                onPress={el.push}
                style={{ 
                    flexDirection: 'row'
                }}
            >
                <View style={[ panelIconContainer, { 
                        height: height/ratio,
                        backgroundColor: el.backgroundColor || "#03A9F4"
                    }]}>
                    <Text
                        style={{ 
                            textAlign: 'center',
                            color: "#fff"
                        }}
                    >{el.icon}</Text>
                </View>

                <View style={[ panelDisplayContainer, { height: height/ratio }]}>
                    <Text style={panelDisplayText}
                    >{el.displayName}</Text>
                </View>
            </TouchableOpacity>
        ); 
    });
};
 
const PanelTile = (data) => _createTiles(data);

export default PanelTile;