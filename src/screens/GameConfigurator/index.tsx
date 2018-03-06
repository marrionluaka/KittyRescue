import * as React from "react";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MultiStepValidator from '../../components/MultiStepValidator';
import Panel from '../../components/MultiStepValidator/Panel';

const GameConfigurator = ({ navigation }) => {
    const navigate = (data: any) => navigation.navigate("Game", { data });

    return(
        <MultiStepValidator
            activeBtn={({ pos, name }, showCurrent, selected) => {
                const _style = {
                    margin: "4%",
                    padding: 10,
                    backgroundColor: "#03A9F4",
                };

                const _ucfirst = (item: string) => item.charAt(0).toUpperCase() + item.slice(1);
                const _converToGrid = (item: number) => item === 8 ? "4x4" : "6x6";
                const _sanitize = (item) => !item ? null : isNaN(+item) ? _ucfirst(item) : _converToGrid(item);
                return (
                    <TouchableOpacity
                        style={_style}
                        onPress={showCurrent}
                    >
                        <Text style={{ textAlign: 'center'}}>{ name }</Text>
                        <Text style={{ textAlign: 'center'}}>{ _sanitize(selected) }</Text>
                    </TouchableOpacity>
                );
            }}
            inactiveBtn={({ name, pos }, currentPos) => {
                const _style = {
                    margin: "4%",
                    padding: 10,
                    backgroundColor: currentPos === pos ? "#03A9F4" : "#d3d3d3",
                };
                
                return (
                    <View style={_style}>
                        <Text>{ name }</Text>
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
                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#03A9F4",
                                }}
                                onPress={push.bind(null, "vsClock", showNext)}
                            >
                                <Text>Vs Clock</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#03A9F4",
                                }}
                                onPress={push.bind(null, "accuracy", showNext)}
                            >
                                <Text>Accuracy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#03A9F4",
                                }}
                                onPress={push.bind(null, "zen", skipTo.bind(null, 2))}
                            >
                                <Text>Zen/Classical</Text>
                            </TouchableOpacity>
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
                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#009688",
                                }}
                                onPress={push.bind(null, "easy", showNext)}
                            >
                                <Text>Easy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#009688",
                                }}
                                onPress={push.bind(null, "medium", showNext)}
                            >
                                <Text>Medium</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#009688",
                                }}
                                onPress={push.bind(null, "hard", showNext)}
                            >
                                <Text>Hard</Text>
                            </TouchableOpacity>
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

                    return (
                        <View>
                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#03A3F4",
                                }}
                                onPress={() => {
                                    push(FOUR_BY_FOUR, onComplete.bind(null, data => navigate(data)));
                                }}
                            >
                                <Text>4X4</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#03A3F4",
                                }}
                                onPress={() => push(SIX_BY_SIX, onComplete.bind(null, data => navigate(data)))}
                            >
                                <Text>6X6</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </MultiStepValidator>
    );
};

export default GameConfigurator;
