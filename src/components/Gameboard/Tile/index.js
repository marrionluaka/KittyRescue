import React, { PropTypes, Component } from 'react';

import { 
    View, 
    Text,
    Image,
    StyleSheet
  } from 'react-native';

  const styles = StyleSheet.create({
    box:{
      margin: '1%',
      backgroundColor: 'powderblue'
    }
  });

  export default class Tile extends Component{

    render(){
        return(
            <View style={[styles.box, {
                 width: this.props.width, 
                 height: this.props.height
            }]}>
                <Text>{this.props.tile.value} </Text>
            </View>
        );
    }
  }