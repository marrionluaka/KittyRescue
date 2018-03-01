import * as React from "react";
import {
    Text,
    View
} from "react-native";
import { connect } from "react-redux";

import { MAX_LIVES } from "../../globals";

import { 
    animateCounter,
    formatTime 
} from "../../lib";

import { AnimatedCounter } from "../common"
import * as lifeActions from "../../actions/life";

const _timeThreshold = 60,
      _frequency = 1000;

class Life extends React.Component<{
    lifeOptions: any;
    decreaseLife: any;
    increaseLife: any;
    stopTimer: any;
}, {}> {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        if(this.props.lifeOptions.isNewGame) 
            this.props.decreaseLife();
    }

    componentWillReceiveProps(props){
        if(props.lifeOptions.isNewGame) 
            props.decreaseLife();
    }

    render(){
        return (
            <View style={{ backgroundColor: "red"}}>
                {
                    !this.props.lifeOptions.hasTimerStarted &&
                        this.props.lifeOptions.lives < MAX_LIVES ? 
                        <AnimatedCounter 
                            fn={ (val, counter) => val - counter }
                            counter={_timeThreshold}
                            firstAcc={_timeThreshold}
                            frequency={_frequency}
                            onComplete={() => {
                                this.props.increaseLife();
                                this.props.stopTimer();
                            }}
                            reset={counter => this.props.lifeOptions.lives < MAX_LIVES}
                            render={formatTime}
                        /> : null
                }
                <Text>
                    {this.props.lifeOptions.lives}
                </Text>
                {/* <Heart 
                    live={this.state.live}
                /> */}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    lifeOptions: state.life
});


export default connect(mapStateToProps, lifeActions)(Life);