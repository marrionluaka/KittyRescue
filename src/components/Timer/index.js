import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';

import * as countdown from '../../actions/timer';

class Timer extends Component{
    constructor(props){
        super(props);
    }

    state = {
        timerID: null
    }

    componentWillReceiveProps(prev){
        if(!this.isTimerNeeded()) return null;
        
        if(prev.timer.time === 30){
            clearTimeout(this.state.timerID);
        }

        if(prev.timer.hasGameStarted && prev.timer.time === 30){
            this.setState({ timerID: setInterval(this.props.countdown, 1000) });
        }
    }

    componentDidUpdate(){
        if(this.isTimerNeeded() && this.props.timer.time === 0) clearTimeout(this.state.timerID);
    }

    componentWillUnmount(){
        clearTimeout(this.state.timerID);
    }

    isTimerNeeded = () => this.props.gameMode === "vsClock";

    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center'}}>
                <Text>Timer</Text>
                <Text>
                    {
                        this.isTimerNeeded() ? this.props.timer.time : <Icon name="500px" color={"black"} size={25} />
                    }
                </Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.timer
});

export default connect(mapStateToProps, countdown)(Timer);