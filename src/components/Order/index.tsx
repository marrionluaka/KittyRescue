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
    initOrder: any;
    gridSize: number;
    difficulty: string;
}

class Order extends React.Component<IProps, {}> {
    constructor(props){
        super(props)
    }

    componentWillMount(){
        const { initOrder, gridSize, difficulty } = this.props;
        initOrder(gridSize, difficulty);
    }

    componentWillReceiveProps(newProps){
        const {
            initOrder,
            gridSize,
            difficulty
        } = newProps;

        const { 
            alreadyMatchedTiles,
            tiles,
            pointer
        } = newProps.order;

        if(pointer === 0) return;

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
                    position: "absolute",
                    zIndex: 9,
                    padding:"5%",
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    top: 5,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'powderblue'
                }}>
                <Text style={{ top: -15 }}>Target</Text>
                {
                    this.isValidPointer() ?
                    (<OrderTile {...tiles[pointer]} />) 
                    : (<OrderTile {...tiles[tiles.length - 1]} />)
                }
            </View>
        );
    }
}

const mapStateToProps  = state => ({
    order: state.order
});

export default connect(mapStateToProps, orderActions)(Order);