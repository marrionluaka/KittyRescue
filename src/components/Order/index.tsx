import * as React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
import { connect } from 'react-redux';

import * as orderActions from '../../actions/order';
import OrderTile from './OrderTile';

interface IProps {
    addPoints: any;
    order: any;
}

class Order extends React.Component<IProps, {}> {
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(prev, next){
        const { alreadyMatchedTiles } = prev.order;
        // @ts-ignore: compile error
        let values: any = Object.values(alreadyMatchedTiles);
        
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
        return pointer < Object.values(tiles).length;
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
                    Object.values(tiles).map((val, idx) => {
                        return (
                            <OrderTile 
                                key={idx}
                                {...val}
                                tileMatched={this.tileMatched}
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