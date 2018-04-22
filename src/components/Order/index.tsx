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
import {
    MIN_SCORE,
    MAX_SCORE
} from '../../globals';

interface IProps {
    addPoints: any;
    order: any;
    orderMatched: any;
}

class Order extends React.Component<IProps, {}> {
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(prev, next){
        const { alreadyMatchedTiles } = prev.order;
        // @ts-ignore: compile error
        let values: any = Object.values(alreadyMatchedTiles);
        
        if(!!values.length && this.isValidPointer()){
            this.props.addPoints(values[values.length - 1 || 0].orderMatched ? MAX_SCORE : MIN_SCORE);
            this.props.orderMatched(alreadyMatchedTiles);
        }
    }

    currentPointer = (src: string): boolean | number => {
        const { tiles, pointer } = this.props.order;
        return this.isValidPointer() ? tiles[pointer].src === src : 0;
    }

    isValidPointer = (): boolean => {
        const { tiles, pointer } = this.props.order;
        return pointer < tiles.length;
    }

    render(){
        const { tiles, pointer } = this.props.order;
        return(
            <View style={{ 
                    flex: 1, 
                    flexDirection: 'row',
                    flexWrap: "wrap", 
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}>
                {
                    this.isValidPointer() ?
                    (<OrderTile 
                        {...tiles[pointer]}
                    />) : null
                }
            </View>
        );
    }
}

const mapStateToProps  = state => ({
    order: state.order
});

export default connect(mapStateToProps, orderActions)(Order);