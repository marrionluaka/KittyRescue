import * as React from "react";
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";
import MultiStepValidator from '../../components/MultiStepValidator';
import Panel from '../../components/MultiStepValidator/Panel';
import PanelTile from '../../components/MultiStepValidator/PanelTile';
import GridSelector from '../../components/MultiStepValidator/GridSelector';
import { AnimatedText } from '../../components/common/AnimatedText';

const GameConfigurator = ({ navigation }) => {

    const navigate = (data: any) => {
        setTimeout(() =>{
            navigation.navigate("Game", { data });
        }, 500);
    };

    const _commonBtnStyles= { // move to stylesheet
        padding: 10,
        borderRightWidth: 1,
        borderRightColor: "#ddd"
    };

    return(
        <MultiStepValidator
            bannersSrc={["Image 1", "Image 2", "Image 3"]}
            activeBtn={({ pos, name }, showCurrent, selected, isLast) => {
                const onPress = isLast ? () => {} : showCurrent;
                const _ucfirst = (item: string) => {
                    return item.replace(/([A-Z])/g, ' $1')
                    .replace(/^./, function(str){ return str.toUpperCase(); });
                };
                const _converToGrid = (item: number) => item === 8 ? "4x4" : "6x6";
                const _sanitize = (item) => !item ? null : isNaN(+item) ? _ucfirst(item) : _converToGrid(item);
                return (
                    <TouchableOpacity
                        style={_commonBtnStyles}
                        onPress={onPress}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold'}}>{ name }</Text>
                        <AnimatedText 
                            styles={{ 
                                color: "#03A9F4",
                                textAlign: 'center'
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
                                    color: currentPos === pos ? "#333" : "#ccc",
                                    fontWeight: currentPos === pos ? 'bold': 'normal'
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
                        <View>
                            {PanelTile([
                                    { 
                                        icon: "I",
                                        displayName: "Vs Clock",
                                        backgroundColor: "#3fbcbd",
                                        push: push.bind(null, "vsClock", showNext)
                                    },
                                    { 
                                        icon: "A",
                                        displayName: "Accuracy",
                                        backgroundColor: "#d66d93",
                                        push: push.bind(null, "accuracy", showNext)
                                    },
                                    { 
                                        icon: "O",
                                        displayName: "Zen",
                                        backgroundColor: "#7d4b82",
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
                        <View>
                            {PanelTile([
                                    { 
                                        icon: "I",
                                        displayName: "Easy",
                                        backgroundColor: "#eb8f88",
                                        push: push.bind(null, "easy", showNext)
                                    },
                                    { 
                                        icon: "A",
                                        displayName: "Medium",
                                        backgroundColor: "#7d4b82",
                                        push: push.bind(null, "medium", showNext)
                                    },
                                    { 
                                        icon: "O",
                                        displayName: "Hard",
                                        backgroundColor: "#eacb5f",
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
                    const FOUR_BY_FOUR = 8,
                            SIX_BY_SIX   = 18;
                    
                    const { height } = Dimensions.get('window');
                    const ratio = 2.5;
                    
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <GridSelector 
                                push={() => push(FOUR_BY_FOUR, onComplete.bind(null, data => navigate(data)))}
                                thumbnail="[   ]"
                                title="4x4"
                                marginRight
                                size="Normal"
                            />

                            <GridSelector 
                                push={() => push(SIX_BY_SIX, onComplete.bind(null, data => navigate(data)))}
                                thumbnail="[   ]"
                                title="6x6"
                                size="Large"
                            />
                        </View>
                    );
                }}
            />
        </MultiStepValidator>
    );
    
};

export default GameConfigurator;
