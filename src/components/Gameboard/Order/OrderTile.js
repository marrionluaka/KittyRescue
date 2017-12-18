import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class OrderTile extends Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate(){
        if(this.props.matched)
            this.props.onTileMatched(this.props.src);
    }

    render() {
        const { tileMatched, matched, src } = this.props;
        let _style = !!matched ? tileMatched(src) ? 'green' : 'red' : null;
      
        return (
            <View
                style={{ padding: "4%", backgroundColor: _style }}
            >
                <Text>{this.props.src}</Text>
            </View>
        );
    }
}