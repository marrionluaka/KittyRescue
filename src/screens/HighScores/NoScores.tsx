import * as React from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from './styles';

export const NoScores = ({ children }) => {
    return (
        <View style={styles.noScore}>
            {children}
        </View>
    );
};