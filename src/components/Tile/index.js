import React, { PropTypes, Component } from 'react';

import { 
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
  } from 'react-native';

  export default class Tile extends Component{
    constructor(props){
        super(props);
    }

    tileFlipHandler = () => {
        this.props.tile.isFlipped = true; 
        this.props.onTileFlipped(this.props.tile);
    }

    tileGenerator = () => {
        const { tile, width, height, margin } = this.props;
        const _styles = {
            width, 
            height,
            margin
        };

        if(tile.isMatched){
            return (
                <View style={
                    Object.assign({}, _styles, { opacity: 0 })
                }>
                </View>
            )
        } else {
            return(
                <TouchableOpacity 
                style={
                    Object.assign({}, _styles, { backgroundColor: 'powderblue' })
                }
                onPress={this.tileFlipHandler}
                >
                    {
                        tile.isFlipped ? <Text>{tile.src} </Text> : null
                    }
                </TouchableOpacity>
            );
        }
    }

    render(){
        return this.tileGenerator();
    }
  }