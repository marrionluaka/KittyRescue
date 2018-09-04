import * as React from "react";
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { NavigationActions } from "react-navigation";

import MultiStepValidator from '../../components/MultiStepValidator';
import Panel from '../../components/MultiStepValidator/Panel';
import PanelTile from '../../components/MultiStepValidator/PanelTile';
import GridSelector from '../../components/MultiStepValidator/GridSelector';
import { AnimatedText } from '../../components/common/AnimatedText';
import { BackButton } from "../../components/common";
import { capitalizeFirstLetter } from "../../lib";

export default class GameConfigurator extends React.Component<{ navigation: any }>{
    private static navigationOptions = { header: null };

    state = { alreadyCalled: false };

    private _push = (grid: number, push: any, onComplete: any) => {
        if(this.state.alreadyCalled) return;

        this.setState({
            alreadyCalled: true
        }, () => push(grid, onComplete.bind(null, data => this._navigate(data))));
    };

    private _navigate = (data: any) => {
        setTimeout(() =>{
            this.props.navigation.navigate("Game", { data });
        }, 500);
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

    public render(){
        const _commonBtnStyles= { // move to stylesheet
            padding: 10
        };

        const { _navigate } = this;
    
        return(
            <MultiStepValidator
                backHomeFn={this._backHome}
                bannersSrc={[
                    require("../../img/cat-hungry.png"), 
                    require("../../img/cat-food-hearts.png"), 
                    require("../../img/cat-cage.png")
                ]}
                activeBtn={({ pos, name }, showCurrent, selected, isLast) => {
                    const onPress = isLast ? () => {} : showCurrent;
                    const _converToGrid = (item: number) => item === 8 ? "4x4" : "6x6";
                    const _sanitize = (item) => !item ? null : isNaN(+item) ? capitalizeFirstLetter(item) : _converToGrid(item);
                    
                    return (
                        <TouchableOpacity
                            style={_commonBtnStyles}
                            onPress={onPress}
                        >
                            <Text style={{ textAlign: 'center', fontFamily: 'riffic', color:"#615f5c" }}>{ name }</Text>
                            <AnimatedText 
                                styles={{ 
                                    color: "#808080",
                                    textAlign: 'center',
                                    fontFamily: 'riffic',
                                    fontSize: 12
                                }}>
                                { _sanitize(selected) }
                            </AnimatedText>
                        </TouchableOpacity>
                    );
                }}
                inactiveBtn={({ name, pos }, currentPos) => {
                    return (
                        <View style={_commonBtnStyles}>
                            <Text 
                                style={{
                                        textAlign: 'center',
                                        color: currentPos === pos ? "#615f5c" : "#aaa",
                                        fontFamily: 'riffic'
                                }}>
                                { name }
                            </Text>
                        </View>
                    );
                }}
            >
                <Panel
                    name="Game Mode"
                    propKey="gameMode"
                    render={(push, showNext, _, skipTo) => {
                        
                        return (
                            <View style={{ flex: 1 }}>
                                {PanelTile([
                                        { 
                                            icon: <Icon 
                                                name="clock" 
                                                size={20} 
                                                color="#fff"
                                            />,
                                            displayName: "Vs Clock",
                                            subTitle: "Battle it out vs the clock!",
                                            backgroundColor: "#7d4b82",
                                            push: push.bind(null, "vsClock", showNext)
                                        },
                                        { 
                                            icon: <Icon 
                                                name="target" 
                                                size={20} 
                                                color="#fff"
                                            />,
                                            displayName: "Accuracy",
                                            subTitle: "Measure how accurate you are!",
                                            backgroundColor: "#d66d93",
                                            push: push.bind(null, "accuracy", showNext)
                                        },
                                        { 
                                            icon: <Icon 
                                                name="box" 
                                                size={20} 
                                                color="#fff"
                                            />,
                                            displayName: "Zen",
                                            subTitle: "Classic stress free game.",
                                            backgroundColor: "#3fbcbd",
                                            push: push.bind(null, "zen", skipTo.bind(null, 2))
                                        }
                                    ]) 
                                }
                            </View>
                        );
                    }}
                />
                
                <Panel 
                    name="Difficulty"
                    propKey="difficulty"
                    render={ (push, showNext) =>{
                        return (
                            <View style={{ flex: 1}}>
                                {PanelTile([
                                        { 
                                            icon: <Icon 
                                                name="star" 
                                                size={20} 
                                                color="#fff"
                                            />,
                                            displayName: "Easy",
                                            backgroundColor: "#aed4d5",
                                            subTitle: "Get a feel for the game!",
                                            push: push.bind(null, "easy", showNext)
                                        },
                                        { 
                                            icon: [
                                                <Icon 
                                                    name="star" 
                                                    size={20} 
                                                    color="#fff"
                                                />,
                                                <Icon 
                                                    name="star" 
                                                    size={20} 
                                                    color="#fff"
                                                />
                                            ],
                                            displayName: "Medium",
                                            subTitle: "Challenge yourself!",
                                            backgroundColor: "#f9cc88",
                                            push: push.bind(null, "medium", showNext)
                                        },
                                        { 
                                            icon: [
                                                <Icon 
                                                    name="star" 
                                                    size={20} 
                                                    color="#fff"
                                                />,
                                                <Icon 
                                                    name="star" 
                                                    size={20} 
                                                    color="#fff"
                                                />,
                                                <Icon 
                                                    name="star" 
                                                    size={20} 
                                                    color="#fff"
                                                />
                                            ],
                                            displayName: "Hard",
                                            subTitle: "Go beyond your limits!",
                                            backgroundColor: "#fd475d",
                                            push: push.bind(null, "hard", showNext)
                                        }
                                    ]) 
                                }
                            </View>
                        );
                    }}
                />
    
                <Panel
                    name="Grid Size"
                    propKey="gridSize"
                    render={ (push, showNext, onComplete) =>{
                        const FOUR_BY_FOUR = 8, SIX_BY_SIX = 18;
                        
                        return (
                            <View style={{ flex:1, flexDirection: 'row' }}>
                                <GridSelector 
                                    push={() => this._push(FOUR_BY_FOUR, push, onComplete)}
                                    title="4 x 4"
                                    subTitle="Standard size."
                                    marginRight
                                    size="Normal"
                                    disabled={this.state.alreadyCalled}
                                />
    
                                <GridSelector 
                                    push={() => this._push(SIX_BY_SIX, push, onComplete)}
                                    title="6 x 6"
                                    subTitle="Complex size."
                                    size="Large"
                                    disabled={this.state.alreadyCalled}
                                />
                            </View>
                        );
                    }}
                />
            </MultiStepValidator>
        );
    }
}