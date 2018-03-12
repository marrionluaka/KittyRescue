import * as React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({

});

const _createTiles = (list: any[]): any[] => {
    const { height } = Dimensions.get('window');

    return list.map(el => {
        return ( 
            <TouchableOpacity
                key={el.displayName}
                onPress={el.push}
                style={{ 
                    flexDirection: 'row'
                }}
            >
                <View style={{ 
                        flex: 1 , 
                        height: height/6.9,
                        backgroundColor: el.backgroundColor || "#03A9F4",
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                    <Text
                        style={{ 
                            textAlign: 'center',
                            color: "#fff"
                        }}
                    >{el.icon}</Text>
                </View>

                <View style={{ 
                        flex: 3,  
                        height: height/6.9,
                        borderBottomWidth: 1,
                        borderBottomColor: "#ddd",
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                    <Text style={{ 
                        paddingLeft: 15,
                        fontSize: 15,
                        fontWeight: '500'
                    }}
                    >{el.displayName}</Text>
                </View>
            </TouchableOpacity>
        ); 
    });
};
 
const PanelTile = (data) => _createTiles(data);

export default PanelTile;