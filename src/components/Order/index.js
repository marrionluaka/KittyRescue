import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
import { connect } from 'react-redux';

import * as orderActions from '../../actions/order';
import OrderTile from './OrderTile';

class Order extends Component {
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(prev, next){
        const { alreadyMatchedTiles } = prev.order;
        let values = Object.values(alreadyMatchedTiles);
        
        if(!!values.length && this.isValidPointer()) 
            this.props.addPoints(values[values.length - 1 || 0].isMatched ? 20 : 10)
    }

    tileMatched = src => {
        const { alreadyMatchedTiles } = this.props.order;
        return alreadyMatchedTiles[src] && alreadyMatchedTiles[src].isMatched;
    }

    currentPointer = src => {
        const { tiles, pointer } = this.props.order;
        return this.isValidPointer() ? tiles[pointer].src === src : 0;
    }

    isValidPointer = () => {
        const { tiles, pointer } = this.props.order;
        return pointer < tiles.length;
    }

    render(){
        const { tiles } = this.props.order;
        return(
            <View style={{ 
                    flex: 1, 
                    flexDirection: 'row',
                    flexWrap: "wrap", 
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}>
                {
                    tiles.map((val, idx) => {
                        return (
                            <OrderTile 
                                key={idx}
                                {...val}
                                tileMatched={this.tileMatched}
                                onTileMatched={this.orderMatched}
                                currentPointer={this.currentPointer}
                            />
                        );
                    } )
                }
            </View>
        );
    }
}

const mapStateToProps  = state => ({
    order: state.order
});

export default connect(mapStateToProps, orderActions)(Order);