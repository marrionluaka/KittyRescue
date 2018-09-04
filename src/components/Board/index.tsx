import * as React from "react";
import { 
    View, 
    Text,  
    TextInput, 
    ImageBackground,
    Image
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { NavigationActions } from "react-navigation";

import Zen from "../Zen";
import Grid from "../Grid";
import Timer from "../Timer";
import Score from "../Score";
import Order from "../Order";
import Popup from "../Modal";
import NewHighScore from "../NewHighScore";
import { 
    Maybe,
    AnimatedCounter, 
    Separator
} from "../common";

import { formatTime, getPercentage } from "../../lib";
import { GAME_OVER_MSG } from "../../types";
import ScoreQueries from "../../queries/scores";
import {newGame} from "../../actions/tiles";
import {initOrder} from "../../actions/order";
import styles from "./styles";
import MetaBox from "./MetaBox";

const scoreReducer = (currentTime, currentAccuracy) => currentTime + currentAccuracy;

class Board extends React.Component<{
    score: number;
    timer: any;
    newGame: any;
    initOrder: any;
    navigation: any;
    order: any;
}> {

    private readonly _moveCounterThreshold: number = 7

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
        return Math.floor(score + time + accuracy) - Math.floor(this.state.moveCounter/this._moveCounterThreshold);
    };

    private _backHome = () => {
        this.props.navigation.dispatch(
            NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: "Home"}),
            ],
          })
        )
    };

    render(){
        const { data } = this.props.navigation.state.params;

        const { score, timer, newGame, initOrder } = this.props;
        
        const { gameMode, difficulty, gridSize } = data;

        const isZenMode = () => gameMode === "zen";

        const { 
            zen_s, 
            info_c,
            points_c,
            points,
            img,
            metadata_c,
            metadata,
            meta,
            meta_title
        } = styles;

        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require("../../img/pastel.png")}
            >
                <Popup 
                    onPlayAgain={() => {
                        this.setState(
                            { gameEndMsg: null, moveCounter: 0 }, 
                            () => {
                                initOrder(gridSize, difficulty);
                                newGame(gridSize, difficulty);
                            } 
                        );
                    }}
                    onNavBack={this._backHome}
                    title={this.state.gameEndMsg}
                    isVisible={!!this.state.gameEndMsg}>
                    <Maybe 
                        pred={isZenMode}
                        render={() => (
                            <View>
                                <Image source={require("../../img/cat-sleep.png")} style={img}/>
                            </View>
                        )}
                        renderAlt={() => {
                            const query        = new ScoreQueries(gameMode, difficulty, gridSize),
                                    // @ts-ignore: compile error
                                    matchedTiles = Object.values(this.props.order.alreadyMatchedTiles).filter( x => x.isMatched).length,
                                    totalTiles   = this.props.order.tiles.length,
                                    accuracy     = getPercentage(matchedTiles, totalTiles),
                                    renderScore  = (
                                        <Text style={points}>
                                            <AnimatedCounter 
                                                    fn={ (val, counter) => val + counter }
                                                    reducer={scoreReducer}
                                                    counter={score}
                                                    firstAcc={timer.time}
                                                    secondAcc={accuracy}
                                                /> points!
                                        </Text>
                                    ),
                                    finalScore = this.calcScore(score, timer.time, accuracy);

                            return (
                                <View>
                                    <View style={points_c}>
                                        <Image source={require("../../img/cat-box.png")} style={img}/>
                                        {
                                            this.state.gameEndMsg !== GAME_OVER_MSG && finalScore > 0 ?
                                                query.isNewHighScore() ? 
                                                    <NewHighScore 
                                                        score={finalScore}
                                                        method={query.insertScore}
                                                        render={renderScore}
                                                    /> :
                                                    query.isLowestScore(finalScore) ?
                                                    <NewHighScore 
                                                        score={finalScore}
                                                        method={query.updateScore}
                                                        render={renderScore}
                                                    /> :
                                                    renderScore : <Text style={points}>{score} points!</Text> 
                                        }
                                    </View>

                                    <Separator />

                                    <View style={metadata_c}>
                                        <View style={metadata}>
                                            <Text style={meta_title}>Accuracy</Text>
                                            {
                                                gameMode === "accuracy" ?
                                                    this.state.gameEndMsg !== GAME_OVER_MSG ?
                                                        (<Text style={meta}>
                                                            <AnimatedCounter 
                                                                fn={ (val, counter) => val - counter }
                                                                counter={accuracy}
                                                                firstAcc={accuracy}
                                                                render={accuracy => accuracy + "%"}
                                                            />
                                                        </Text>) : 
                                                        <Text style={meta}>{accuracy + "%"}</Text> : 
                                                        <Text style={meta}>-</Text>
                                            }
                                        </View>

                                        <View style={metadata}>
                                            <Text style={meta_title}>Moves</Text>
                                            <Text style={meta}>{this.state.moveCounter}</Text>
                                        </View>

                                        <View style={metadata}>
                                            <Text style={meta_title}>Time</Text>
                                            {
                                                gameMode === "vsClock" ?
                                                this.state.gameEndMsg !== GAME_OVER_MSG ?
                                                    (<Text style={meta}>
                                                        <AnimatedCounter 
                                                            fn={ (val, counter) => val - counter }
                                                            counter={timer.time}
                                                            firstAcc={timer.time}
                                                            render={formatTime}
                                                        />
                                                    </Text>) : 
                                                    <Text style={meta}>{formatTime(timer.time)}</Text> :
                                                    <Text style={meta}>-</Text>
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </Popup>
                
                <Maybe 
                    pred={isZenMode}
                    render={Zen}
                    renderAlt={() => {

                        return (
                            <View style={{ flex: 1 }}>
                                <View 
                                    style={info_c}>
                                    <MetaBox title="Moves">
                                        {this.state.moveCounter}
                                    </MetaBox>

                                    <View style={{ flex: 3 }}></View>

                                    <MetaBox title="Score">
                                        <Score 
                                            gameMode={gameMode}
                                            difficulty={difficulty}
                                        />
                                    </MetaBox>
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
                        gameMode === "vsClock" && this.renderTimer(gridSize, difficulty) 
                    }

                    <Grid 
                        {...data}
                        callback={this.hasTimeElasped}
                        onTileFlipped={this.incrementMoveCounter}
                    />
                </View>

            </ImageBackground>
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