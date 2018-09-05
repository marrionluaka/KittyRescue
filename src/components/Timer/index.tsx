import * as React from "react";
import { 
    View, 
    Text, 
    StyleSheet 
} from "react-native";
import { connect } from "react-redux";
import Bar from './Bar';

import { formatTime } from "../../lib";
import { timerLvls } from "../../globals";
import * as countdown from "../../actions/timer";
import { TIMES_UP_MSG } from "../../types";

interface IProps{
    gridSize: number;
    difficulty: string;
    countdown: any;
    timer: any;
    hasGameStarted: any;
    hasTimeElasped: any;
}

class Timer extends React.Component<IProps, { timerID: any }>{
    constructor(props){
        super(props);
    }

    state = {
        timerID: null
    }

    componentWillReceiveProps(prev){
        const _timer = timerLvls[this.props.gridSize][this.props.difficulty];

        if(prev.timer.time === _timer) 
            clearTimeout(this.state.timerID);

        if(prev.timer.hasGameStarted && prev.timer.time === _timer) 
            this.setState({ timerID: setInterval(this.props.countdown, 1000) });
    }

    componentDidUpdate(){
        if(this.props.timer.time === 0 || this.props.timer.invalidateTimer){
            this.props.hasTimeElasped(this.props.timer.invalidateTimer || TIMES_UP_MSG);
            clearTimeout(this.state.timerID);
        } 
    }

    componentWillUnmount(){
        clearTimeout(this.state.timerID);
    }

    render(){
        return(
            <View>
                <Bar
                    time={this.props.timer.time}
                    colors={["#e25b45","#febd3d","#a2b798"]}
                >
                    { formatTime(this.props.timer.time) }
                </Bar>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.timer
});

export default connect(mapStateToProps, countdown)(Timer);