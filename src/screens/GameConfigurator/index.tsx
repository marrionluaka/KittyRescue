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
        <MultiStepValidator>
            <Panel
                name="Game Mode"
                propKey="gameMode"
                render={(push, showNext) => {
                    return (
                        <View>
                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#03A9F4",
                                }}
                                onPress={push.bind(null, "Vs Clock", showNext)}
                            >
                                <Text>Vs Clock</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#03A9F4",
                                }}
                                onPress={push.bind(null, "Accuracy", showNext)}
                            >
                                <Text>Accuracy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#03A9F4",
                                }}
                                onPress={push.bind(null, "Zen", showNext)}
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
                    return (
                        <View>
                            <TouchableOpacity
                                style={{
                                    margin: "4%",
                                    padding: 10,
                                    backgroundColor: "#03A3F4",
                                }}
                                onPress={() => {
                                    push(8, onComplete.bind(null, data => navigate(data)));
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
                                onPress={() => push(18, onComplete.bind(null, data => navigate(data)))}
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
