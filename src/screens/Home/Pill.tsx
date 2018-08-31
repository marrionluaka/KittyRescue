import * as React from 'react';
import { 
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    btn: {
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '8%',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(128,128,128,.5)',
        marginBottom: '5%',
        marginLeft: '6%',
        marginRight: '6%',
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 50
    },
    title:{
        fontWeight: 'bold', 
        fontSize: 17
    },
    subTitle: {
        fontSize: 12, 
        marginTop: -5
    },
    arrowContainer:{ 
        flex: 1, 
        alignItems: 'flex-end',
        marginRight: '3%',
        justifyContent: 'center'
    },
    arrow:{
        padding: '1%',
        paddingLeft: '14%',
        paddingRight: '10%',
        borderWidth: 1,
        borderColor: "rgba(128,128,128,.7)",
        borderRadius: 50,
        fontWeight: 'bold'
    }
});

const Pill = ({ 
    title,
    subTitle,
    onNavigate
}) => {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={onNavigate}
        >
            <View style={{ flexDirection: 'row'}}>
                <View style={{ flex: 2, justifyContent: 'center'}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>

                <View style={styles.arrowContainer}>
                    <Icon 
                        style={styles.arrow} 
                        name="angle-right" 
                        size={30} 
                        color="rgba(128,128,128,.7)"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Pill;