import * as React from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput 
} from "react-native";
import { connect } from "react-redux";

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

import { formatTime } from "../../lib";
import { GAME_OVER_MSG } from "../../types";
import ScoreQueries from "../../queries/scores";
import * as tileActions from "../../actions/tiles";

const scoreReducer = (currentTime, currentAccuracy) => currentTime + currentAccuracy;

class Board extends React.Component<{
    score: number;
    timer: any;
    newGame: any;
    navigation: any;
    order: any;
}> {

    state = {
      gameEndMsg: null
    }

    hasTimeElasped = (gameEndMsg, fn) => {
        this.setState({ gameEndMsg });
        if(fn) return fn(gameEndMsg);
    };

    renderTimer = (gridSize, difficulty) => {
      return (
        <Timer
          hasTimeElasped={this.hasTimeElasped} 
          difficulty={difficulty}
          gridSize={gridSize}
        />
      );
    };

    getPercentage(accuracy){
        return Math.floor(accuracy * 100);
    }

    calcScore(score, time=0, accuracy=0){
        return Math.floor(score + time + accuracy);
    }

    render(){
        const { data } = this.props.navigation.state.params;

        const { score, timer, newGame } = this.props;
        
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
                                      accuracy     = this.getPercentage(matchedTiles / totalTiles),
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
                            this.setState({ gameEndMsg: null }, () => newGame(gridSize, difficulty) );
                        }}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Popup>
                
                <Maybe 
                    pred={isZenMode}
                    render={Zen}
                    renderAlt={() => {
                        const { gameMode, difficulty, gridSize } = data;

                        return (
                            <View style={{ flex: 1 }}>
                                <Score 
                                    gameMode={gameMode}
                                    difficulty={difficulty}
                                />
                                {
                                    gameMode === "vsClock" ? this.renderTimer(gridSize, difficulty) : null
                                }
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
    score: state.score,
    order: state.order
  });

  export default connect(mapStateToProps, tileActions)(Board);