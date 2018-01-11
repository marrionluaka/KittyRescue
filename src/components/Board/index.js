import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Grid from '../Grid';
import Timer from '../Timer';
import Score from '../Score';
import Order from '../Order';
import Popup from '../Modal';
import { Maybe } from '../common/Maybe';

import * as tileActions from '../../actions/tiles';

const Zen = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text>ZEN MODE</Text>
      </View>
    );
};

class Board extends Component{

    state = {
      gameEndMsg: null
    }

    hasTimeElasped = (gameEndMsg, fn) => {
        this.setState({ gameEndMsg });
        if(fn) return fn(gameEndMsg);
    };

    renderTimer = difficulty => {
      return (
        <Timer
          hasTimeElasped={this.hasTimeElasped} 
          difficulty={difficulty}
        />
      );
    }

    render(){
        const { data } = this.props.navigation.state.params;

        const { score, timer, newGame } = this.props;  

        const isZenMode = () => data.gameMode === "zen";

        return (

            <View style={{ flex: 1}}>

                <Popup
                    isVisible={!!this.state.gameEndMsg}
                    >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            padding: 30
                        }}
                    >
                        <Text>Title: {this.state.gameEndMsg}</Text>

                        <Maybe 
                            pred={isZenMode}
                            render={() => <Text>No Score</Text>}
                            renderAlt={() => {
                                return (
                                <View>
                                    {
                                    data.gameMode === "vsClock" ? <Text>Time: {timer.time}</Text> : null
                                    }
                                    <Text>Score: {score}</Text>
                                </View>
                                )
                            }}
                        />
                        
                        <TouchableOpacity onPress={() => {
                            this.setState({ gameEndMsg: null }, () => newGame(data.gridSize, data.difficulty) );
                        }}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Popup>
                
                <Maybe 
                    pred={isZenMode}
                    render={Zen}
                    renderAlt={() => {
                        const { gameMode, difficulty } = data;

                        return (
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                {
                                    gameMode === "vsClock" ? this.renderTimer(difficulty) : null
                                }
                                <Score 
                                    gameMode={gameMode}
                                    difficulty={difficulty}
                                />
                            </View>
                        );
                    }}
                />

                <Grid 
                    {...data} 
                    callback={this.hasTimeElasped}
                />

                <Maybe 
                    pred={isZenMode}
                    render={Zen}
                    renderAlt={() => {
                        return (
                            <View style={{ flex: 1 }}>
                                <Order />
                            </View>
                        );
                    }}
                />

            </View>
        );
    }
}

  const mapStateToProps = state => ({
    timer: state.timer,
    score: state.score
  });

  export default connect(mapStateToProps, tileActions)(Board);