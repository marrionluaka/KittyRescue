import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';

import * as countdown from '../../actions/timer';

class Timer extends Component{
    constructor(props){
        super(props);
    }

    state = {
        timerID: null
    }

    componentWillReceiveProps(prev){
        if(prev.timer.time === 30) 
            clearTimeout(this.state.timerID);

        if(prev.timer.hasGameStarted && prev.timer.time === 30) 
            this.setState({ timerID: setInterval(this.props.countdown, 1000) });
    }

    componentDidUpdate(){
        if(this.props.timer.time === 0 || this.props.timer.invalidateTimer){
            this.props.hasTimeElasped(this.props.timer.invalidateTimer || "Times Up!");
            clearTimeout(this.state.timerID);
        } 
    }

    componentWillUnmount(){
        clearTimeout(this.state.timerID);
    }

    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center'}}>
                <Text>Timer</Text>
                <Text>
                     {this.props.timer.time}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.timer
});

export default connect(mapStateToProps, countdown)(Timer);