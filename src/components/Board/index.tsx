import * as React from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput 
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import Zen from "../Zen";
import Grid from "../Grid";
import Timer from "../Timer";
import Score from "../Score";
import Order from "../Order";
import Popup from "../Modal";
import NewHighScore from "../NewHighScore";
import { 
    Maybe,
    AnimatedCounter 
} from "../common";

import { formatTime, getPercentage } from "../../lib";
import { GAME_OVER_MSG } from "../../types";
import ScoreQueries from "../../queries/scores";
import {newGame} from "../../actions/tiles";
import {initOrder} from "../../actions/order";

const scoreReducer = (currentTime, currentAccuracy) => currentTime + currentAccuracy;

class Board extends React.Component<{
    score: number;
    timer: any;
    newGame: any;
    initOrder: any;
    navigation: any;
    order: any;
}> {

    state = {
      gameEndMsg: null,
      moveCounter: 0
    }

    private incrementMoveCounter = () => {
        this.setState({ moveCounter: this.state.moveCounter + 1 });
    };

    private hasTimeElasped = (gameEndMsg, fn) => {
        this.setState({ gameEndMsg });
        if(fn) return fn(gameEndMsg);
    };

    private renderTimer = (gridSize, difficulty) => {
      return (
        <Timer
          hasTimeElasped={this.hasTimeElasped} 
          difficulty={difficulty}
          gridSize={gridSize}
        />
      );
    };

    private calcScore(score, time=0, accuracy=0){
        return Math.floor(score + time + accuracy);
    }

    render(){
        const { data } = this.props.navigation.state.params;

        const { score, timer, newGame, initOrder } = this.props;
        
        const { gameMode, difficulty, gridSize } = data;

        const isZenMode = () => gameMode === "zen";

        return (
            <View style={{ flex: 1}}>

                <Popup isVisible={!!this.state.gameEndMsg}>
                    <View
                        style={{
                            backgroundColor: "#fff",
                            padding: 30
                        }}>
                        <Text>Title: {this.state.gameEndMsg}</Text>

                        <Maybe 
                            pred={isZenMode}
                            render={() => <Text>No Score</Text>}
                            renderAlt={() => {
                                const query        = new ScoreQueries(gameMode, difficulty, gridSize),
                                      // @ts-ignore: compile error
                                      matchedTiles = Object.values(this.props.order.alreadyMatchedTiles).filter( x => x.isMatched).length,
                                      totalTiles   = this.props.order.tiles.length,
                                      accuracy     = getPercentage(matchedTiles, totalTiles),
                                      renderScore  = <AnimatedCounter 
                                                        fn={ (val, counter) => val + counter }
                                                        reducer={scoreReducer}
                                                        counter={score}
                                                        firstAcc={timer.time}
                                                        secondAcc={accuracy}
                                                    />

                                return (
                                    <View>
                                        {
                                            gameMode === "vsClock" ?
                                            this.state.gameEndMsg !== GAME_OVER_MSG ?
                                                <AnimatedCounter 
                                                    fn={ (val, counter) => val - counter }
                                                    counter={timer.time}
                                                    firstAcc={timer.time}
                                                    render={formatTime}
                                                /> : 
                                                <Text>Time: {formatTime(timer.time)}</Text> :
                                                null
                                        }

                                        {
                                            this.state.gameEndMsg !== GAME_OVER_MSG ?
                                                <AnimatedCounter 
                                                    fn={ (val, counter) => val - counter }
                                                    counter={accuracy}
                                                    firstAcc={accuracy}
                                                    render={accuracy => accuracy + "%"}
                                                /> : 
                                                <Text>Accuracy: {accuracy + "%"}</Text>
                                        }
                                        
                                        {
                                            this.state.gameEndMsg !== GAME_OVER_MSG ?
                                                query.isNewHighScore() ? 
                                                    <NewHighScore 
                                                        score={this.calcScore(score, timer.time, accuracy)}
                                                        method={query.insertScore}
                                                        render={renderScore}
                                                    /> :
                                                    query.isLowestScore(this.calcScore(score, timer.time, accuracy)) ?
                                                    <NewHighScore 
                                                        score={this.calcScore(score, timer.time, accuracy)}
                                                        method={query.updateScore}
                                                        render={renderScore}
                                                    /> :
                                                    renderScore :
                                                <Text>Score: {score}</Text>
                                        }
                                    </View>
                                )
                            }}
                        />
                        
                        <TouchableOpacity onPress={() => {
                            this.setState(
                                { gameEndMsg: null, moveCounter: 0 }, 
                                () => {
                                    initOrder(gridSize, difficulty);
                                    newGame(gridSize, difficulty);
                                } 
                            );
                        }}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Popup>
                
                <Maybe 
                    pred={isZenMode}
                    render={Zen}
                    renderAlt={() => {

                        return (
                            <View style={{ flex: 1 }}>
                                
                                {/* Turn into component */}
                                <View 
                                    style={{
                                        position: "relative",
                                        flexDirection: "row",
                                        backgroundColor: "powderblue",
                                        height: 75,
                                        margin: 5,
                                        borderRadius: 5
                                    }}>
                                    <View style={{ 
                                        flex: 2,  
                                        alignItems: "center",
                                        margin: 10,
                                        marginRight: 5,
                                        marginLeft: 5,
                                        borderRadius: 5,
                                        elevation: 1,
                                        paddingTop: 5
                                    }}>
                                        <Text>Moves</Text>
                                        <Text>{this.state.moveCounter}</Text>
                                        
                                    </View>

                                    <View style={{ flex: 3 }}></View>

                                    <View style={{ 
                                        flex: 2,  
                                        alignItems: "center",
                                        margin: 10,
                                        marginRight: 5,
                                        marginLeft: 5,
                                        borderRadius: 5,
                                        elevation: 1,
                                        paddingTop: 5
                                    }}>
                                        <Text>Score</Text>
                                        <Score 
                                            gameMode={gameMode}
                                            difficulty={difficulty}
                                        />
                                    </View>
                                </View>

                                <Order 
                                    difficulty={difficulty}
                                    gridSize={gridSize}
                                />

                                
                            </View>
                        );
                    }}
                />
                
                <View style={{ flex: 3 }}>
                    {
                        gameMode === "vsClock" ? this.renderTimer(gridSize, difficulty) : (
                            <View style={{
                                height: 20,
                                width: "100%",
                                backgroundColor: '#ccc',
                                marginLeft: 1,
                                marginRight:1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text>ZEN</Text>
                            </View>
                        )
                    }

                    <Grid 
                        {...data}
                        callback={this.hasTimeElasped}
                        onTileFlipped={this.incrementMoveCounter}
                    />
                </View>

            </View>
        );
    }
}

  const mapStateToProps = state => ({
    timer: state.timer,
    score: state.score,
    order: state.order
  });

  const mapDispatchToProps = dispatch => {
    return {
        newGame: bindActionCreators(newGame, dispatch),
        initOrder: bindActionCreators(initOrder, dispatch)
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Board);