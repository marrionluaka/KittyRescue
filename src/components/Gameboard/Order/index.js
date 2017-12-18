import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
import { connect } from 'react-redux';

import { orderActions } from '../actions/order';
import OrderTile from './OrderTile';

class Order extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.setState({ hashTile: {} });
    }

    state = {
        hashTile: {},
        pointer: 0,
        tileMatched: () => false
    }

    orderMatched = src => {
        const { hashTile } = this.state;
        const { order } = this.props;

        if(!hashTile[src]){
            this.setState({ 
                hashTile: Object.assign({}, hashTile, {
                     [src]: {
                        src,
                        isMatched: src === this.props.order[this.getLastPointer(this.state.hashTile)].src
                     },
                     count: this.state.pointer += 1
                }), 

                tileMatched: src => { 
                    return this.state.hashTile[src] ? 
                        this.state.hashTile[src].isMatched : 
                        src === this.props.order[this.state.hashTile.count].src;
                }
            });
        }
    }

    getLastPointer = hash => {
        var matched = Object.values(hash);
        return matched.length === 0 ? 0 : matched.length - 1;
    }

    render(){
        return(
            <View style={{ 
                    flex: 1, 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}>
                {
                    this.props.order.map((val, idx) => {
                        return (
                            <OrderTile 
                                key={idx}
                                {...val}
                                tileMatched={this.state.tileMatched}
                                onTileMatched={this.orderMatched}
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