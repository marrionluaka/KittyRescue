import React, { PropTypes, Component } from 'react';

import { 
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
  } from 'react-native';

  const styles = StyleSheet.create({
    box:{
      margin: '1%'
    }
  });

  export default class Tile extends Component{
    constructor(props){
        super(props);
    }

    tileFlipHandler = () => {
        this.props.tile.isFlipped = true; 
        this.props.onTileFlipped(this.props.tile);
    }

    tileGenerator = () => {
        const { tile, width, height } = this.props;
        const _styles = [styles.box, {
            width: width, 
            height: height
        }];

        if(tile.isMatched){
            return (
                <View style={
                    [..._styles, { opacity: 0 }]
                }>
                </View>
            )
        } else {
            return(
                <TouchableOpacity 
                style={
                    [{ backgroundColor: 'powderblue'}, ..._styles]
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