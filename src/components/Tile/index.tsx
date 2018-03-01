import * as React from "react";

import { 
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
  } from "react-native";

  interface IProps {
    tile: any;
    onTileFlipped: any;
    width: number;
    height: number;
    margin: number;
  }

  export default class Tile extends React.Component<IProps, {}>{
    constructor(props){
        super(props);
    }

    private tileFlipHandler = () => {
        this.props.tile.isFlipped = true; 
        this.props.onTileFlipped(this.props.tile);
    }

    private tileGenerator = () => {
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

    public render(){
        return this.tileGenerator();
    }
  }